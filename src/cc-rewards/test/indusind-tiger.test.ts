import { describe, it, expect } from 'vitest';
import { CREDIT_CARDS } from '../data/cards';
import { SPEND_TARGETS } from '../data/spend-targets';
import { calculateReward } from '../engine';

describe('IndusInd Bank Tiger Credit Card', () => {
  const tigerCard = CREDIT_CARDS.find((c) => c.id === 'indusind-tiger')!;

  it('is properly registered in CREDIT_CARDS', () => {
    expect(tigerCard).toBeDefined();
    expect(tigerCard.name).toBe('Tiger');
    expect(tigerCard.bank).toBe('IndusInd');
  });

  describe('Data-Driven Multiplier Ladder & Redemption Architecture', () => {
    it('has data-driven spendMultiplierLadder configuration', () => {
      const ladder = tigerCard.spendMultiplierLadder;
      expect(ladder).toBeDefined();
      expect(ladder?.tiers).toBeDefined();
      if (!ladder?.tiers) return;
      expect(ladder.tiers).toHaveLength(4);
      expect(ladder.tiers[0]?.multiplier).toBe(1);
      expect(ladder.tiers[1]?.multiplier).toBe(2);
      expect(ladder.tiers[2]?.multiplier).toBe(4);
      expect(ladder.tiers[3]?.multiplier).toBe(6);
    });

    it('has data-driven redemptionInfo configuration', () => {
      expect(tigerCard.redemptionInfo).toBeDefined();
      expect(tigerCard.redemptionInfo!.cashValueInr).toBe(0.4);
      expect(tigerCard.redemptionInfo!.monthlyCashCapPoints).toBe(5000);
      expect(tigerCard.redemptionInfo!.monthlyCashCapInr).toBe(2000);
    });
  });

  describe('Base Reward Calculation & Notes', () => {
    it('calculates 0.40% base return and attaches data-driven ladder notes', () => {
      const swiggyTarget = SPEND_TARGETS.find((t) => t.id === 'swiggy')!;
      const res = calculateReward(tigerCard, swiggyTarget, 1000);
      expect(res.isExcluded).toBe(false);
      expect(res.effectiveRatePercentage).toBe(0.4);
      expect(res.grossRewardInr).toBe(4);
      expect(res.pointsEarned).toBe(10); // 1 RP per ₹100

      const hasMultiplier = res.notes.some((n) => n.includes('Spend Multiplier:'));
      const hasRedemption = res.notes.some((n) => n.includes('Cash Redemption:'));
      expect(hasMultiplier).toBe(true);
      expect(hasRedemption).toBe(true);
    });

    it('enforces minimum transaction threshold of ₹100', () => {
      const swiggyTarget = SPEND_TARGETS.find((t) => t.id === 'swiggy')!;
      const res = calculateReward(tigerCard, swiggyTarget, 50);
      expect(res.isExcluded).toBe(true);
      expect(res.grossRewardInr).toBe(0);
      expect(res.notes.some((n) => n.includes('Minimum spend'))).toBe(true);
    });
  });

  describe('Multiplier Ladder Exclusions (Rent, Utilities, Insurance, Govt, Education)', () => {
    it('earns 0.40% base on utilities but suppresses the spend multiplier note', () => {
      const utilTarget = SPEND_TARGETS.find((t) => t.id === 'category-utilities')!;
      const res = calculateReward(tigerCard, utilTarget, 2000);
      expect(res.isExcluded).toBe(false);
      expect(res.effectiveRatePercentage).toBe(0.4);
      expect(res.grossRewardInr).toBe(8);

      const hasMultiplier = res.notes.some((n) => n.includes('Spend Multiplier:'));
      expect(hasMultiplier).toBe(false);
    });
  });

  describe('Fuel Exclusion & Surcharge Waiver', () => {
    it('excludes fuel spend from rewards and includes 1% fuel surcharge waiver note', () => {
      const fuelTarget = SPEND_TARGETS.find((t) => t.id === 'category-fuel')!;
      const res = calculateReward(tigerCard, fuelTarget, 1500);
      expect(res.isExcluded).toBe(true);
      expect(res.grossRewardInr).toBe(0);
      expect(res.notes.some((n) => n.includes('1% fuel surcharge waiver'))).toBe(true);
    });
  });

  describe('Benefits & Privileges', () => {
    it('has discounted 1.50% forex markup fee', () => {
      expect(tigerCard.forexMarkupPercentage).toBe(1.5);
    });

    it('provides BookMyShow movie benefit up to ₹500 every 6 months', () => {
      expect(tigerCard.movieBenefit).toBeDefined();
      expect(tigerCard.movieBenefit!.maxDiscountPerTicketInr).toBe(500);
      expect(tigerCard.movieBenefit!.monthlyQuota).toContain('1 ticket every 6 months');
    });

    it('provides unconditional domestic and international lounge visits', () => {
      expect(tigerCard.loungeBenefit).toBeDefined();
      expect(tigerCard.loungeBenefit!.spendCondition.required).toBe(false);
      expect(tigerCard.loungeBenefit!.domesticVisits).toContain('8 per calendar year');
    });

    it('provides complimentary golf games and lessons via Apexlynx', () => {
      expect(tigerCard.golfBenefit).toBeDefined();
      expect(tigerCard.golfBenefit!.gamesPerQuarter).toBe(1);
      expect(tigerCard.golfBenefit!.lessonsPerQuarter).toBe(1);
      expect(tigerCard.golfBenefit!.bookingUrl).toBe('https://indusindgolf.apexlynx.net/');
    });
  });
});
