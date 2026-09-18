import { describe, it, expect } from 'vitest';
import { CREDIT_CARDS } from '../data/cards';
import { SPEND_TARGETS } from '../data/spend-targets';
import { calculateReward } from '../engine';

describe('Scapia Bank of Baroda Credit Card', () => {
  const scapiaCard = CREDIT_CARDS.find((c) => c.id === 'bobcard-scapia')!;

  it('is properly registered in CREDIT_CARDS', () => {
    expect(scapiaCard).toBeDefined();
    expect(scapiaCard.name).toBe('Scapia');
    expect(scapiaCard.bank).toBe('BOBCARD');
  });

  describe('Reward Accrual Rates', () => {
    it('earns 2.0% base reward in Scapia Coins on general online spends', () => {
      const amazonTarget = SPEND_TARGETS.find((t) => t.id === 'amazon')!;
      const res = calculateReward(scapiaCard, amazonTarget, 1000);
      expect(res.isExcluded).toBe(false);
      expect(res.effectiveRatePercentage).toBe(2.0);
      expect(res.grossRewardInr).toBe(20);
      expect(res.pointsEarned).toBe(100); // 100 Scapia Coins = ₹20
    });

    it('earns 4.0% accelerated rewards on Scapia App travel bookings', () => {
      const travelTarget = SPEND_TARGETS.find((t) => t.id === 'scapia-travel')!;
      const res = calculateReward(scapiaCard, travelTarget, 5000);
      expect(res.isExcluded).toBe(false);
      expect(res.effectiveRatePercentage).toBe(4.0);
      expect(res.grossRewardInr).toBe(200);
      expect(res.pointsEarned).toBe(1000); // 1,000 Scapia Coins = ₹200
    });

    it('enforces minimum transaction threshold of ₹20', () => {
      const amazonTarget = SPEND_TARGETS.find((t) => t.id === 'amazon')!;
      const res = calculateReward(scapiaCard, amazonTarget, 15);
      expect(res.isExcluded).toBe(true);
      expect(res.grossRewardInr).toBe(0);
      expect(res.notes.some((n) => n.includes('Minimum spend'))).toBe(true);
    });
  });

  describe('Zero Forex Markup Feature', () => {
    it('has 0% forex markup fee', () => {
      expect(scapiaCard.forexMarkupPercentage).toBe(0);
    });
  });

  describe('Excluded Categories & Surcharge Waiver', () => {
    const excludedTargetIds = [
      'forex-international',
      'credit-card-bill-payment',
      'bank-charges-fees',
      'category-cash-withdrawal',
      'category-wallet',
      'emi-transactions',
      'category-rent',
      'category-utilities',
      'category-education',
      'category-government',
      'category-crypto',
      'category-gift-cards',
      'category-insurance',
    ];

    excludedTargetIds.forEach((targetId) => {
      it(`excludes ${targetId} from earning Scapia coins (0%)`, () => {
        const target = SPEND_TARGETS.find((t) => t.id === targetId)!;
        const res = calculateReward(scapiaCard, target, 2500);
        expect(res.isExcluded).toBe(true);
        expect(res.grossRewardInr).toBe(0);
      });
    });

    it('returns fuel spend as 0% with 1% surcharge waiver note', () => {
      const fuelTarget = SPEND_TARGETS.find((t) => t.id === 'category-fuel')!;
      const res = calculateReward(scapiaCard, fuelTarget, 1500);
      expect(res.isExcluded).toBe(true);
      expect(res.grossRewardInr).toBe(0);
      expect(res.notes.some((n) => n.includes('1% fuel surcharge waiver'))).toBe(true);
    });
  });

  describe('Lounge Privileges', () => {
    it('requires ₹20,000 monthly spend for unlimited domestic lounge visits', () => {
      expect(scapiaCard.loungeBenefit).toBeDefined();
      expect(scapiaCard.loungeBenefit!.spendCondition.required).toBe(true);
      expect(scapiaCard.loungeBenefit!.spendCondition.thresholdInr).toBe(20000);
      expect(scapiaCard.loungeBenefit!.domesticVisits).toBe('Unlimited');
    });
  });
});

