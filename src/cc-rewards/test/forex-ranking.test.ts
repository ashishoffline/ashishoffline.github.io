import { describe, it, expect } from 'vitest';
import { CREDIT_CARDS } from '../data/cards';
import { SPEND_TARGETS } from '../data/spend-targets';
import { rankCards } from '../engine';

describe('Forex Markup Ranking & Fee Calculations', () => {
  const forexTarget = SPEND_TARGETS.find((t) => t.id === 'forex-international')!;

  it('ranks cards by lowest forex markup fee on international transactions', () => {
    const activeIds = ['bobcard-scapia', 'indusind-tiger', 'hsbc-live-plus'];
    const ranked = rankCards(CREDIT_CARDS, forexTarget, 10000, activeIds);

    expect(ranked).toHaveLength(3);

    // #1 Best Recommendation: Scapia (0% Markup)
    expect(ranked[0].card.id).toBe('bobcard-scapia');
    expect(ranked[0].isBest).toBe(true);
    expect(ranked[0].card.forexMarkupPercentage).toBe(0);
    expect(ranked[0].forexMarkupFeeInr).toBe(0);

    // #2 IndusInd Tiger (1.50% Markup)
    expect(ranked[1].card.id).toBe('indusind-tiger');
    expect(ranked[1].card.forexMarkupPercentage).toBe(1.5);
    expect(ranked[1].forexMarkupFeeInr).toBe(177); // 10000 * 1.5% * 1.18 GST = 177

    // #3 HSBC Live+ (1.99% Markup)
    expect(ranked[2].card.id).toBe('hsbc-live-plus');
    expect(ranked[2].card.forexMarkupPercentage).toBe(1.99);
    expect(ranked[2].forexMarkupFeeInr).toBeCloseTo(234.82, 2); // 10000 * 1.99% * 1.18 GST = 234.82
  });
});

