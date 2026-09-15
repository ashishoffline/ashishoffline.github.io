import { CreditCard, EngineResult, RewardRule, SpendChannel, SpendGroup, SpendTarget } from './types';

export function calculateReward(card: CreditCard, target: SpendTarget, amountInr: number): EngineResult {
  if (amountInr <= 0) {
    return {
      card,
      grossRewardInr: 0,
      effectiveRatePercentage: 0,
      pointsEarned: 0,
      notes: ['Enter an amount to see reward returns.'],
      isExcluded: false,
      isCapped: false,
      isBest: false,
    };
  }

  const parentCategoryId = target.group === SpendGroup.POPULAR_MERCHANTS ? target.categoryTargetId : undefined;

  // 1. Direct exclusion list (checked first for fast exit on flat exclusions):
  const isTargetInExclusionList = Boolean(
    card.excludedCategories?.some(
      (ex) =>
        ex === target.id ||
        (parentCategoryId && ex === parentCategoryId)
    )
  );

  const notes: string[] = [];
  let matchedRule: RewardRule | undefined;
  let isExcluded = false;
  let isCapped = false;
  let effectiveRatePercentage = 0;
  let monthlyCapInr: number | undefined;
  let transactionCapInr: number | undefined;

  if (isTargetInExclusionList) {
    // Immediate fast exit for flat exclusions
    isExcluded = true;
    effectiveRatePercentage = 0;
    notes.push('Excluded from rewards: Transactions under this category do not earn reward points or coins.');
  } else {
    // 2. Rule match hierarchy:
    // Priority 1: Exact target match (e.g. specific merchant 'amazon' or exact category 'category-dining')
    // Priority 2: Parent category match (e.g. 'swiggy' inherits from 'category-dining')
    matchedRule =
      card.rules.find((r) => r.targetId === target.id) ??
      card.rules.find((r) => parentCategoryId && r.targetId === parentCategoryId);

    if (matchedRule) {
      // Specific rule matched (accelerated, partner, or custom zero-reward/fee/waiver rule)
      if (matchedRule.ratePercentage === 0) {
        isExcluded = true;
        effectiveRatePercentage = 0;
      } else {
        effectiveRatePercentage = matchedRule.ratePercentage;
        monthlyCapInr = matchedRule.monthlyCapInr;
        transactionCapInr = matchedRule.transactionCapInr;

        const minSpend = matchedRule.minTransactionInr ?? card.minTransactionInr;
        if (minSpend && amountInr < minSpend) {
          isExcluded = true;
          effectiveRatePercentage = 0;
          notes.push(`⚠️ Minimum spend of ₹${minSpend} required to earn rewards on this card.`);
        }
      }

      if (matchedRule.notes) {
        notes.push(matchedRule.notes);
      }
    } else {
      // 3. Fallback to channel-specific base rate (online vs offline POS)
      if (target.channel === SpendChannel.OFFLINE) {
        effectiveRatePercentage = card.offlineBaseRatePercentage;
        monthlyCapInr = card.offlineMonthlyCapInr;
        notes.push(
          card.onlineBaseRatePercentage === card.offlineBaseRatePercentage
            ? `Standard base rate of ${card.offlineBaseRatePercentage}% applies.`
            : `Standard offline POS base rate of ${card.offlineBaseRatePercentage}% applies.`
        );
      } else {
        // SpendChannel.ONLINE or SpendChannel.OMNICHANNEL
        effectiveRatePercentage = card.onlineBaseRatePercentage;
        monthlyCapInr = card.onlineMonthlyCapInr;
        notes.push(
          card.onlineBaseRatePercentage === card.offlineBaseRatePercentage
            ? `Standard base rate of ${card.onlineBaseRatePercentage}% applies.`
            : `Standard online base rate of ${card.onlineBaseRatePercentage}% applies.`
        );
      }

      if (card.minTransactionInr && amountInr < card.minTransactionInr) {
        isExcluded = true;
        effectiveRatePercentage = 0;
        notes.push(`⚠️ Minimum spend of ₹${card.minTransactionInr} required to earn rewards on this card.`);
      }
    }
  }

  // Data-driven spend multiplier ladder note (if card has spendMultiplierLadder and category is eligible)
  if (!isExcluded && card.spendMultiplierLadder) {
    const isExcludedFromMultiplier = card.spendMultiplierLadder.excludedCategories?.some(
      (ex) => ex === target.id || (parentCategoryId && ex === parentCategoryId)
    );
    if (!isExcludedFromMultiplier) {
      notes.push(`📈 Spend Multiplier: ${card.spendMultiplierLadder.summary}`);
    }
  }

  // Data-driven redemption info note (if defined on card)
  if (!isExcluded && card.redemptionInfo?.summary) {
    notes.push(card.redemptionInfo.summary);
  }

  // Apply card-level combinedMonthlyCapInr if defined and stricter than channel cap
  if (card.combinedMonthlyCapInr !== undefined) {
    if (monthlyCapInr === undefined || card.combinedMonthlyCapInr < monthlyCapInr) {
      monthlyCapInr = card.combinedMonthlyCapInr;
    }
  }

  let grossRewardInr = (amountInr * effectiveRatePercentage) / 100;

  // Handle transaction caps
  if (transactionCapInr && grossRewardInr > transactionCapInr) {
    grossRewardInr = transactionCapInr;
    isCapped = true;
    notes.push(`Reward capped at ₹${transactionCapInr.toLocaleString('en-IN')} per transaction.`);
  }

  // Handle monthly cap indication and ceiling
  if (monthlyCapInr && grossRewardInr > monthlyCapInr) {
    grossRewardInr = monthlyCapInr;
    isCapped = true;
    notes.push(`⚠️ Reward capped at monthly ceiling of ₹${monthlyCapInr.toLocaleString('en-IN')}.`);
  }

  let forexMarkupFeeInr: number | undefined;
  let netBenefitInr: number | undefined;

  if (target.id === 'forex-international') {
    if (card.forexMarkupPercentage === 0) {
      forexMarkupFeeInr = 0;
      notes.push('✈️ Zero Forex Markup (0% fee): Zero fee charged on foreign currency spends, saving the standard ~3.5% + 18% GST markup.');
    } else {
      const markupFee = (amountInr * card.forexMarkupPercentage) / 100;
      const totalFee = markupFee * 1.18; // 18% GST on forex markup fee
      forexMarkupFeeInr = Math.round(totalFee * 100) / 100;
      notes.push(`🌐 Forex Markup Fee: ${card.forexMarkupPercentage}% + 18% GST = ₹${forexMarkupFeeInr.toLocaleString('en-IN')} fee.`);
    }
    netBenefitInr = Math.round((grossRewardInr - forexMarkupFeeInr) * 100) / 100;
  }

  const pointsEarned = card.pointConversionInr > 0 ? Math.round(grossRewardInr / card.pointConversionInr) : 0;

  return {
    card,
    grossRewardInr: Math.round(grossRewardInr * 100) / 100,
    effectiveRatePercentage,
    pointsEarned,
    matchedRule,
    notes,
    isExcluded,
    isCapped,
    isBest: false,
    forexMarkupFeeInr,
    netBenefitInr,
  };
}

export function rankCards(
  cards: CreditCard[],
  target: SpendTarget,
  amountInr: number,
  selectedIds: string[]
): EngineResult[] {
  // Filter only cards the user has selected in their wallet
  const activeCards = cards.filter((c) => selectedIds.includes(c.id));

  // Compute returns for all active cards
  const results = activeCards.map((card) => calculateReward(card, target, amountInr));

  // Sort: For forex-international, sort by highest netBenefitInr (or lowest markup fee).
  // For other targets, sort by highest grossRewardInr, then highest effectiveRatePercentage.
  results.sort((a, b) => {
    if (target.id === 'forex-international') {
      const netA = a.netBenefitInr ?? (a.grossRewardInr - (a.forexMarkupFeeInr || 0));
      const netB = b.netBenefitInr ?? (b.grossRewardInr - (b.forexMarkupFeeInr || 0));
      if (netB !== netA) {
        return netB - netA;
      }
      return a.card.forexMarkupPercentage - b.card.forexMarkupPercentage;
    }

    if (b.grossRewardInr !== a.grossRewardInr) {
      return b.grossRewardInr - a.grossRewardInr;
    }
    return b.effectiveRatePercentage - a.effectiveRatePercentage;
  });

  // Mark the top card as best
  if (results.length > 0) {
    if (target.id === 'forex-international') {
      const top = results[0];
      const second = results[1];
      if (!second || (top.netBenefitInr ?? 0) > (second.netBenefitInr ?? 0)) {
        top.isBest = true;
      }
    } else if (results[0].grossRewardInr > 0 && !results[0].isExcluded) {
      results[0].isBest = true;
    }
  }

  return results;
}

