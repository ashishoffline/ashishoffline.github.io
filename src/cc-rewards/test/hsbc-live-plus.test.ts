import { describe, it, expect } from 'vitest';
import { CREDIT_CARDS } from '../data/cards';
import { SPEND_TARGETS } from '../data/spend-targets';
import { calculateReward } from '../engine';

describe('HSBC Live+ Credit Card', () => {
  const hsbcCard = CREDIT_CARDS.find((c) => c.id === 'hsbc-live-plus')!;

  it('is properly registered in CREDIT_CARDS', () => {
    expect(hsbcCard).toBeDefined();
    expect(hsbcCard.name).toBe('Live+');
    expect(hsbcCard.bank).toBe('HSBC');
  });

  describe('10% Accelerated Categories (Food Delivery, Dining, Groceries, Utilities, Shopping)', () => {
    const acceleratedCases = [
      { targetId: 'swiggy', amt: 1000, expectedCashback: 100 },
      { targetId: 'zomato', amt: 600, expectedCashback: 60 },
      { targetId: 'category-dining', amt: 2500, expectedCashback: 250 },
      { targetId: 'category-fast-food', amt: 500, expectedCashback: 50 },
      { targetId: 'swiggy-instamart', amt: 800, expectedCashback: 80 },
      { targetId: 'blinkit', amt: 1200, expectedCashback: 120 },
      { targetId: 'zepto', amt: 750, expectedCashback: 75 },
      { targetId: 'bigbasket', amt: 2000, expectedCashback: 200 },
      { targetId: 'category-groceries', amt: 3000, expectedCashback: 300 },
      { targetId: 'category-utilities', amt: 1500, expectedCashback: 150 },
      { targetId: 'airtel', amt: 999, expectedCashback: 99.9 },
      { targetId: 'general-online', amt: 2000, expectedCashback: 200 },
      { targetId: 'tata-neu', amt: 3000, expectedCashback: 300 },
      { targetId: 'general-pos', amt: 4000, expectedCashback: 400 },
    ];

    acceleratedCases.forEach(({ targetId, amt, expectedCashback }) => {
      it(`earns 10% on ${targetId} (₹${amt} -> ₹${expectedCashback})`, () => {
        const target = SPEND_TARGETS.find((t) => t.id === targetId)!;
        const res = calculateReward(hsbcCard, target, amt);
        expect(res.isExcluded).toBe(false);
        expect(res.effectiveRatePercentage).toBe(10);
        expect(res.grossRewardInr).toBe(expectedCashback);
        expect(res.isCapped).toBe(false);
      });
    });

    it('enforces the ₹1,200 monthly shared cap on 10% accelerated spends', () => {
      const swiggyTarget = SPEND_TARGETS.find((t) => t.id === 'swiggy')!;
      const res = calculateReward(hsbcCard, swiggyTarget, 15000);
      expect(res.isExcluded).toBe(false);
      expect(res.grossRewardInr).toBe(1200);
      expect(res.isCapped).toBe(true);
      expect(res.notes.some((n) => n.includes('monthly ceiling'))).toBe(true);
    });
  });

  describe('1.5% Base Cashback Fallback (Amazon, Flipkart, Travel, General)', () => {
    const fallbackCases = [
      { targetId: 'amazon', amt: 2000, expectedCashback: 30 },
      { targetId: 'flipkart', amt: 4000, expectedCashback: 60 },
      { targetId: 'myntra', amt: 1000, expectedCashback: 15 },
      { targetId: 'uber', amt: 500, expectedCashback: 7.5 },
      { targetId: 'makemytrip', amt: 5000, expectedCashback: 75 },
      { targetId: 'category-railways', amt: 2000, expectedCashback: 30 },
      { targetId: 'category-religious', amt: 1000, expectedCashback: 15 },
      { targetId: 'category-healthcare-clinics', amt: 2000, expectedCashback: 30 },
    ];

    fallbackCases.forEach(({ targetId, amt, expectedCashback }) => {
      it(`earns 1.5% base return on ${targetId}`, () => {
        const target = SPEND_TARGETS.find((t) => t.id === targetId)!;
        const res = calculateReward(hsbcCard, target, amt);
        expect(res.isExcluded).toBe(false);
        expect(res.effectiveRatePercentage).toBe(1.5);
        expect(res.grossRewardInr).toBe(expectedCashback);
      });
    });
  });

  describe('Excluded Categories & Surcharge Waiver', () => {
    const excludedTargetIds = [
      'category-fuel',
      'category-rent',
      'category-wallet',
      'category-education',
      'category-government',
      'category-insurance',
      'category-jewelry',
      'category-gambling',
      'category-fastag',
      'category-investments',
      'category-collection-agencies',
      'category-charity',
      'category-wire-transfer',
      'category-b2b',
      'category-wholesale-clubs',
      'category-hospital',
      'category-transit',
      'category-crypto',
      'category-cash-withdrawal',
      'credit-card-bill-payment',
      'bank-charges-fees',
      'emi-transactions',
      'forex-international',
    ];

    excludedTargetIds.forEach((targetId) => {
      it(`excludes ${targetId} from earning rewards (0%)`, () => {
        const target = SPEND_TARGETS.find((t) => t.id === targetId)!;
        const res = calculateReward(hsbcCard, target, 2000);
        expect(res.isExcluded).toBe(true);
        expect(res.grossRewardInr).toBe(0);
      });
    });

    it('returns fuel spend as 0% with 1% surcharge waiver note', () => {
      const fuelTarget = SPEND_TARGETS.find((t) => t.id === 'category-fuel')!;
      const res = calculateReward(hsbcCard, fuelTarget, 2000);
      expect(res.isExcluded).toBe(true);
      expect(res.grossRewardInr).toBe(0);
      expect(res.notes.some((n) => n.includes('1% fuel surcharge waiver'))).toBe(true);
    });
  });

  describe('Benefits & Privileges', () => {
    it('provides BookMyShow BOGO Saturday movie tickets (up to ₹250)', () => {
      expect(hsbcCard.movieBenefit).toBeDefined();
      expect(hsbcCard.movieBenefit!.maxDiscountPerTicketInr).toBe(250);
      expect(hsbcCard.movieBenefit!.offerType).toBe('BOGO');
    });

    it('provides unconditional domestic lounge visits (2/year)', () => {
      expect(hsbcCard.loungeBenefit).toBeDefined();
      expect(hsbcCard.loungeBenefit!.spendCondition.required).toBe(false);
    });
  });
});
