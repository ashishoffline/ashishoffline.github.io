import { describe, it, expect } from 'vitest';
import { CREDIT_CARDS } from '../data/cards';
import { CreditCard } from '../types';

describe('Airport Lounge Access Sorting Order', () => {
  function sortLoungeCards(cards: CreditCard[]): CreditCard[] {
    return [...cards].sort((a, b) => {
      const loungeA = a.loungeBenefit!;
      const loungeB = b.loungeBenefit!;

      // 1. Unconditional cards first
      if (loungeA.spendCondition.required !== loungeB.spendCondition.required) {
        return loungeA.spendCondition.required ? 1 : -1;
      }

      // 2. Lower spend threshold first
      const threshA = loungeA.spendCondition.thresholdInr ?? 0;
      const threshB = loungeB.spendCondition.thresholdInr ?? 0;
      if (threshA !== threshB) {
        return threshA - threshB;
      }

      // 3. Alphabetical tiebreaker
      return a.name.localeCompare(b.name);
    });
  }

  it('ranks unconditional lounge cards ahead of conditional spend cards', () => {
    const loungeCards = CREDIT_CARDS.filter((c) => c.loungeBenefit !== null);
    const sorted = sortLoungeCards(loungeCards);

    expect(sorted).toHaveLength(3);

    // Unconditional cards come first
    expect(sorted[0].loungeBenefit!.spendCondition.required).toBe(false);
    expect(sorted[1].loungeBenefit!.spendCondition.required).toBe(false);

    // Conditional cards come after
    expect(sorted[2].loungeBenefit!.spendCondition.required).toBe(true);
    expect(sorted[2].id).toBe('bobcard-scapia');
  });
});

