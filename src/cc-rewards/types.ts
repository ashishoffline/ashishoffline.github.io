export const NetworkType = {
  VISA: 'Visa',
  MASTERCARD: 'Mastercard',
  RUPAY: 'RuPay',
  AMEX: 'Amex',
  DINERS_CLUB: 'Diners Club',
} as const;
export type NetworkType = (typeof NetworkType)[keyof typeof NetworkType];

export const BankType = {
  HDFC: 'HDFC',
  ICICI: 'ICICI',
  AXIS: 'Axis',
  SBI: 'SBI',
  BOBCARD: 'BOBCARD',
  HSBC: 'HSBC',
  FEDERAL: 'Federal',
  TATA_NEU: 'Tata Neu',
  AMEX: 'Amex',
  INDUSIND: 'IndusInd',
  IDFC: 'IDFC',
  KOTAK: 'Kotak',
  OTHER: 'Other',
} as const;
export type BankType = (typeof BankType)[keyof typeof BankType];

export const SpendGroup = {
  POPULAR_MERCHANTS: 'Popular Merchants',
  CATEGORIES: 'Categories (MCC)',
} as const;
export type SpendGroup = (typeof SpendGroup)[keyof typeof SpendGroup];

export const SpendChannel = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  OMNICHANNEL: 'omnichannel',
} as const;
export type SpendChannel = (typeof SpendChannel)[keyof typeof SpendChannel];

export interface BaseSpendTarget {
  id: string; // Semantic identifier (e.g. 'swiggy', 'category-fuel', 'category-utilities')
  label: string;
  channel: SpendChannel;
}

export interface MerchantSpendTarget extends BaseSpendTarget {
  group: typeof SpendGroup.POPULAR_MERCHANTS;
  categoryTargetId: string; // Semantic ID of parent category target (e.g. 'category-dining' for swiggy)
}

export interface CategorySpendTarget extends BaseSpendTarget {
  group: typeof SpendGroup.CATEGORIES;
  mccs?: string[]; // All applicable 4-digit MCC codes (e.g. ['5541', '5542', '5172'])
}

export type SpendTarget = MerchantSpendTarget | CategorySpendTarget;

export interface RewardRule {
  targetId: string; // Matches SpendTarget.id (e.g. 'swiggy' or 'category-utilities') or a specific MCC code
  ratePercentage: number; // Reward return in % (e.g. 10 for 10% cashback)
  monthlyCapInr?: number; // Monthly cashback or points value ceiling in INR
  transactionCapInr?: number; // Per-transaction cashback cap in INR
  minTransactionInr?: number; // Minimum transaction amount to unlock accelerated rate
  notes?: string; // Explanation of conditions/caps/waivers
}

export const MoviePlatform = {
  BOOKMYSHOW: 'BookMyShow',
  PVR: 'PVR',
  INOX: 'INOX',
  PAYTM_MOVIES: 'Paytm Movies',
  MULTIPLE: 'Multiple',
  OTHER: 'Other',
} as const;
export type MoviePlatform = (typeof MoviePlatform)[keyof typeof MoviePlatform];

export const MovieOfferType = {
  BOGO: 'BOGO',
  DISCOUNT: 'Discount',
  CASHBACK: 'Cashback',
  FLAT_OFF: 'Flat Off',
} as const;
export type MovieOfferType = (typeof MovieOfferType)[keyof typeof MovieOfferType];

export interface MovieBenefit {
  platform: MoviePlatform;
  offerType: MovieOfferType;
  description: string;
  monthlyQuota?: string; // E.g. "2 free tickets / month (up to ₹500 each)"
  maxDiscountPerTicketInr?: number;
  conditions?: string;
  bookingUrl?: string;
}

export const LoungeAccessMethod = {
  DIRECT_CARD_SWIPE: 'Direct Card Swipe',
  VOUCHER_QR_CODE: 'Voucher / QR Code',
  PRIORITY_PASS: 'Priority Pass',
  DREAMFOLKS: 'DreamFolks',
  DINERS_CLUB: 'Diners Club',
  OTHER: 'Other',
} as const;
export type LoungeAccessMethod = (typeof LoungeAccessMethod)[keyof typeof LoungeAccessMethod];

export interface LoungeBenefit {
  domesticVisits: string; // E.g. "2 per calendar quarter" or "Unlimited"
  internationalVisits: string; // E.g. "4 per calendar year via Priority Pass" or "None"
  spendCondition: {
    required: boolean;
    description: string; // E.g. "Spend ₹10,000 in previous calendar quarter" or "No spend required"
    thresholdInr?: number;
  };
  accessMethod: LoungeAccessMethod;
  loungeListUrl?: string; // Link to official eligible lounge list
  voucherPortalUrl?: string; // Link to generate voucher/QR code (e.g. Dreamfolks)
  notes?: string;
}

export interface GolfBenefit {
  gamesPerQuarter: number;
  lessonsPerQuarter?: number;
  description: string;
  bookingUrl?: string;
  spendCondition?: {
    required: boolean;
    description: string;
    thresholdInr?: number;
  };
  notes?: string;
}

export interface SpendMultiplierTier {
  minSpendInr: number;
  maxSpendInr?: number;
  multiplier: number;
  effectiveRatePercentage?: number;
  label?: string;
}

export interface SpendMultiplierLadder {
  period: 'anniversary_year' | 'calendar_year' | 'quarter';
  summary: string;
  tiers?: SpendMultiplierTier[];
  excludedCategories?: string[]; // categories/MCCs excluded from accelerated multiplier tiers
}

export interface RedemptionInfo {
  cashValueInr?: number;
  monthlyCashCapPoints?: number;
  monthlyCashCapInr?: number;
  summary: string;
}

export interface CreditCard {
  id: string;
  name: string;
  bank: BankType;
  network: NetworkType;
  // Channel-specific base rates:
  onlineBaseRatePercentage: number; // Base rate on online transactions (e.g. 5% for SBI Cashback, 2% for Scapia)
  offlineBaseRatePercentage: number; // Base rate on offline POS / in-store swipes (e.g. 1% for SBI Cashback, 2% for Scapia)
  forexMarkupPercentage: number; // Forex markup fee in % (e.g. 0 for Scapia, 1.99 for HSBC Live+, 3.5 for standard cards)

  // Flexible capping structures:
  onlineMonthlyCapInr?: number; // Ceiling on online base cashback/rewards (e.g. ₹5,000 for SBI Cashback)
  offlineMonthlyCapInr?: number; // Ceiling on offline base cashback/rewards (if bank has separate offline cap)
  combinedMonthlyCapInr?: number; // Shared ceiling across both online and offline base spends

  pointConversionInr: number; // Value of 1 Reward Point in INR (e.g. 1.0, 0.25, etc.)
  minTransactionInr?: number; // Minimum transaction value in INR to earn rewards
  excludedCategories?: string[]; // Array of targetId or category/MCC strings excluded from earning rewards (0%)
  rules: RewardRule[];
  spendMultiplierLadder?: SpendMultiplierLadder;
  redemptionInfo?: RedemptionInfo;
  movieBenefit: MovieBenefit | null;
  loungeBenefit: LoungeBenefit | null;
  golfBenefit: GolfBenefit | null;
  cardPageUrl?: string;
  badge?: string;
}

export interface EngineResult {
  card: CreditCard;
  grossRewardInr: number;
  effectiveRatePercentage: number;
  pointsEarned: number;
  matchedRule?: RewardRule;
  notes: string[];
  isExcluded: boolean;
  isCapped: boolean;
  isBest: boolean;
  forexMarkupFeeInr?: number; // Forex markup fee charged on international transactions (including 18% GST)
  netBenefitInr?: number; // Net financial value: grossRewardInr - (forexMarkupFeeInr || 0)
}

