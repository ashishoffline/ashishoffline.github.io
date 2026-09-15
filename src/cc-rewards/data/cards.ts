import {
  BankType,
  CreditCard,
  LoungeAccessMethod,
  MovieOfferType,
  MoviePlatform,
  NetworkType,
} from '../types';

export const CREDIT_CARDS: CreditCard[] = [
  {
    id: 'bobcard-scapia',
    name: 'Scapia Bank of Baroda Credit Card',
    bank: BankType.BOBCARD,
    network: NetworkType.VISA,
    badge: 'Zero Forex & Travel',
    cardPageUrl: 'https://www.scapia.cards/',
    onlineBaseRatePercentage: 2.0, // 10% in Scapia Coins on online spends (5 coins = ₹1 => 2.0%)
    offlineBaseRatePercentage: 2.0, // 10% in Scapia Coins on offline POS swipes (5 coins = ₹1 => 2.0%)
    forexMarkupPercentage: 0, // 0% Forex markup fee on foreign currency transactions
    pointConversionInr: 0.2, // 1 Scapia Coin = ₹0.20 (5 coins = ₹1)
    minTransactionInr: 20, // Min transaction of ₹20 on Visa (or ₹500 on RuPay variant)
    excludedCategories: [
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
    ],
    rules: [
      {
        targetId: 'scapia-travel',
        ratePercentage: 4.0, // 20% in Scapia Coins = 20 coins / ₹100 = ₹4 / ₹100 = 4.0%
        notes: '20% Scapia Coins on all travel bookings via Scapia app (Flights, Hotels, Buses, Trains). 5 Coins = ₹1.',
      },
      {
        targetId: 'category-fuel',
        ratePercentage: 0,
        notes: 'Fuel transactions earn 0 Scapia Coins. ⛽ 1% fuel surcharge waiver for transactions between ₹400 and ₹5,000 (max ₹500/month).',
      },
    ],
    movieBenefit: null,
    loungeBenefit: {
      domesticVisits: 'Unlimited',
      internationalVisits: 'Airport Privileges (Dining & Spa)',
      spendCondition: {
        required: true,
        thresholdInr: 20000,
        description: 'Spend ₹20,000 in previous billing cycle/month across Visa/Mastercard and RuPay cards to unlock unlimited domestic lounge access for the next billing cycle.',
      },
      accessMethod: LoungeAccessMethod.VOUCHER_QR_CODE,
      loungeListUrl: 'https://www.scapia.cards/',
      voucherPortalUrl: 'https://www.scapia.cards/',
      notes: 'Generate entry QR code directly via the Scapia App. Also unlocks up to ₹1,000 airport dining/spa/shopping voucher on ₹20k spend, and up to ₹2,000 international terminal rewards on ₹40k flight bookings.',
    },
    golfBenefit: null,
  },
  {
    id: 'hsbc-live-plus',
    name: 'HSBC Live+ Credit Card',
    bank: BankType.HSBC,
    network: NetworkType.VISA,
    badge: '10% Dining, Grocery & Shopping',
    cardPageUrl: 'https://www.hsbc.bank.in/credit-cards/products/live-plus/',
    onlineBaseRatePercentage: 1.5,
    offlineBaseRatePercentage: 1.5,
    forexMarkupPercentage: 1.99, // 1.99% Forex markup fee (reduced forex rate)
    pointConversionInr: 1.0, // Direct statement cashback credited automatically within 45 days
    excludedCategories: [
      'category-rent',
      'category-wallet',
      'category-b2b',
      'category-wholesale-clubs',
      'category-education',
      'category-government',
      'category-insurance',
      'category-jewelry',
      'category-gambling',
      'category-fastag',
      'category-cash-withdrawal',
      'category-investments',
      'category-collection-agencies',
      'category-charity',
      'category-wire-transfer',
      'category-hospital',
      'category-transit',
      'category-crypto',
      'credit-card-bill-payment',
      'bank-charges-fees',
      'emi-transactions',
      'forex-international',
    ],
    rules: [
      {
        targetId: 'category-dining',
        ratePercentage: 10.0,
        monthlyCapInr: 1200,
        notes: '10% accelerated cashback on dining, food delivery, and restaurants (Swiggy, Zomato, standalone dining). Shared cap of ₹1,200/month across all 10% categories.',
      },
      {
        targetId: 'category-fast-food',
        ratePercentage: 10.0,
        monthlyCapInr: 1200,
        notes: '10% accelerated cashback on fast food and cafes. Shared cap of ₹1,200/month across all 10% categories.',
      },
      {
        targetId: 'category-groceries',
        ratePercentage: 10.0,
        monthlyCapInr: 1200,
        notes: '10% accelerated cashback on groceries & supermarkets (Swiggy Instamart, Blinkit, Zepto, BigBasket). Shared cap of ₹1,200/month across all 10% categories.',
      },
      {
        targetId: 'category-utilities',
        ratePercentage: 10.0,
        monthlyCapInr: 1200,
        notes: '10% accelerated cashback on utility bill payments (electricity, water, gas, broadband). Shared cap of ₹1,200/month across all 10% categories.',
      },
      {
        targetId: 'general-online',
        ratePercentage: 10.0,
        monthlyCapInr: 1200,
        notes: '10% accelerated cashback on online shopping (apparel, department stores, retail brands, other eCommerce). Shared cap of ₹1,200/month across all 10% categories.',
      },
      {
        targetId: 'general-pos',
        ratePercentage: 10.0,
        monthlyCapInr: 1200,
        notes: '10% accelerated cashback on in-store retail shopping (department stores, clothing stores). Shared cap of ₹1,200/month across all 10% categories.',
      },
      {
        targetId: 'amazon',
        ratePercentage: 1.5,
        notes: 'Shopping on Amazon earns 1.5% cashback (explicitly excluded by HSBC from the 10% accelerated shopping rate).',
      },
      {
        targetId: 'flipkart',
        ratePercentage: 1.5,
        notes: 'Shopping on Flipkart earns 1.5% cashback (explicitly excluded by HSBC from the 10% accelerated shopping rate).',
      },
      {
        targetId: 'myntra',
        ratePercentage: 1.5,
        notes: 'Shopping on Myntra earns 1.5% base cashback (Note: Limited-time 10% launch offer was valid until 31 October 2026).',
      },
      {
        targetId: 'category-fuel',
        ratePercentage: 0,
        notes: 'Fuel transactions earn 0% cashback. ⛽ 1% fuel surcharge waiver for transactions between ₹400 and ₹4,000 (max ₹250/month).',
      },
    ],
    movieBenefit: {
      platform: MoviePlatform.BOOKMYSHOW,
      offerType: MovieOfferType.BOGO,
      description: 'Buy 1 Get 1 Free on movie tickets booked on Saturdays via the BookMyShow app (up to ₹250 off per ticket, 1 ticket/month). Plus 10% off live event tickets up to ₹1,000/month.',
      monthlyQuota: '1 free BOGO ticket / month (up to ₹250)',
      maxDiscountPerTicketInr: 250,
      conditions: 'Booking must be processed on a Saturday on BookMyShow. Valid for tickets of any day of the week.',
      bookingUrl: 'https://in.bookmyshow.com/',
    },
    loungeBenefit: {
      domesticVisits: '2 per calendar year (1 visit every 6 calendar months)',
      internationalVisits: '1 per calendar year via Thriwe',
      spendCondition: {
        required: false,
        description: 'Complimentary access without spend criteria.',
      },
      accessMethod: LoungeAccessMethod.DIRECT_CARD_SWIPE,
      loungeListUrl: 'https://www.hsbc.bank.in/content/dam/hsbc/in/documents/in-participating-airport-lounges.pdf',
      voucherPortalUrl: 'https://hsbcliveplus.thriwe.com/',
      notes: 'Domestic visits via Visa Airport Lounge program (1 visit per 6-month period). International access via dedicated Thriwe portal.',
    },
    golfBenefit: null,
  },
  {
    id: 'indusind-tiger',
    name: 'IndusInd Bank Tiger Credit Card',
    bank: BankType.INDUSIND,
    network: NetworkType.VISA,
    badge: '1.5% Forex & Up to 6X Rewards',
    cardPageUrl: 'https://www.indusind.bank.in/in/en/personal/cards/credit-card/tiger-credit-card.html',
    onlineBaseRatePercentage: 0.4, // 1 RP per ₹100 spent (1 RP = ₹0.40 cash credit => 0.40% return)
    offlineBaseRatePercentage: 0.4, // 1 RP per ₹100 spent (1 RP = ₹0.40 cash credit => 0.40% return)
    forexMarkupPercentage: 1.5, // Discounted 1.50% Forex markup fee on international transactions
    pointConversionInr: 0.4, // 1 Reward Point = ₹0.40 (Cash credit against statement balance / IndusMoments vouchers)
    minTransactionInr: 100, // Earn 1 RP on every ₹100 spent
    excludedCategories: [
      'credit-card-bill-payment',
      'bank-charges-fees',
      'category-cash-withdrawal',
      'category-wallet',
      'emi-transactions',
    ],
    rules: [
      {
        targetId: 'category-fuel',
        ratePercentage: 0,
        notes: 'Fuel transactions do not accrue reward points. ⛽ 1% fuel surcharge waiver for transactions between ₹400 and ₹4,000.',
      },
    ],
    spendMultiplierLadder: {
      period: 'anniversary_year',
      summary: '1X (0.40%) up to ₹1L | 2X (0.80%) on ₹1L–₹2.5L | 4X (1.60%) on ₹2.5L–₹5L | 6X (2.40%) on >₹5L/year (excludes fuel, rent, utilities, insurance, govt & education).',
      tiers: [
        { minSpendInr: 0, maxSpendInr: 100000, multiplier: 1, effectiveRatePercentage: 0.4, label: 'Up to ₹1,00,000' },
        { minSpendInr: 100001, maxSpendInr: 250000, multiplier: 2, effectiveRatePercentage: 0.8, label: '₹1,00,001 – ₹2,50,000' },
        { minSpendInr: 250001, maxSpendInr: 500000, multiplier: 4, effectiveRatePercentage: 1.6, label: '₹2,50,001 – ₹5,00,000' },
        { minSpendInr: 500001, multiplier: 6, effectiveRatePercentage: 2.4, label: 'Above ₹5,00,000' },
      ],
      excludedCategories: [
        'category-rent',
        'category-utilities',
        'category-insurance',
        'category-government',
        'category-education',
      ],
    },
    redemptionInfo: {
      cashValueInr: 0.4,
      monthlyCashCapPoints: 5000,
      monthlyCashCapInr: 2000,
      summary: 'Cash Redemption: 1 RP = ₹0.40 statement credit (max 5,000 RP / ₹2,000/mo) or brand vouchers / Krisflyer airmiles.',
    },
    movieBenefit: {
      platform: MoviePlatform.BOOKMYSHOW,
      offerType: MovieOfferType.DISCOUNT,
      description: '1 complimentary movie ticket up to ₹500 on BookMyShow every 6 months in a calendar year (2 free tickets/year, up to ₹1,000 total annual movie value).',
      monthlyQuota: '1 ticket every 6 months (up to ₹500)',
      maxDiscountPerTicketInr: 500,
      conditions: 'Unlocked automatically via BIN validation under "Credit Card Offers" at BookMyShow checkout (no coupon code required). Max 2 complimentary tickets per calendar year.',
      bookingUrl: 'https://in.bookmyshow.com/',
    },
    loungeBenefit: {
      domesticVisits: '8 per calendar year (2 visits per calendar quarter)',
      internationalVisits: '2 per calendar year via Priority Pass',
      spendCondition: {
        required: false,
        description: 'Complimentary domestic & international access without spend criteria.',
      },
      accessMethod: LoungeAccessMethod.DIRECT_CARD_SWIPE,
      loungeListUrl: 'https://www.indusind.bank.in/content/dam/indusind-corporate/Other/Airport-Lounge-Access-Program.pdf',
      voucherPortalUrl: 'https://www.prioritypass.com/en/airport-lounges',
      notes: 'Domestic access via Visa Airport Lounge program (2 visits/quarter). International access via complimentary Priority Pass membership (2 visits/year).',
    },
    golfBenefit: {
      gamesPerQuarter: 1,
      lessonsPerQuarter: 1,
      description: '1 complimentary golf game or lesson per calendar quarter (4 complimentary games/lessons per year).',
      bookingUrl: 'https://indusindgolf.apexlynx.net/',
      spendCondition: {
        required: false,
        description: 'Complimentary without spend criteria.',
      },
      notes: 'Bookings managed via Apexlynx across leading picturesque golf clubs in India.',
    },
  },
];


