import { SpendChannel, SpendGroup, SpendTarget } from '../types';

export const SPEND_TARGETS: SpendTarget[] = [
  // --- Popular Merchants ---
  {
    id: 'swiggy',
    label: 'Swiggy (Food Delivery & Dineout)',
    group: SpendGroup.POPULAR_MERCHANTS,
    channel: SpendChannel.ONLINE,
    categoryTargetId: 'category-dining',
  },
  {
    id: 'swiggy-instamart',
    label: 'Swiggy Instamart (Quick Commerce & Groceries)',
    group: SpendGroup.POPULAR_MERCHANTS,
    channel: SpendChannel.ONLINE,
    categoryTargetId: 'category-groceries',
  },
  {
    id: 'zomato',
    label: 'Zomato (Food Delivery / Dining Out)',
    group: SpendGroup.POPULAR_MERCHANTS,
    channel: SpendChannel.ONLINE,
    categoryTargetId: 'category-dining',
  },
  {
    id: 'amazon',
    label: 'Amazon India (Shopping / Pay)',
    group: SpendGroup.POPULAR_MERCHANTS,
    channel: SpendChannel.ONLINE,
    categoryTargetId: 'general-online',
  },
  {
    id: 'flipkart',
    label: 'Flipkart (Shopping)',
    group: SpendGroup.POPULAR_MERCHANTS,
    channel: SpendChannel.ONLINE,
    categoryTargetId: 'general-online',
  },
  {
    id: 'blinkit',
    label: 'Blinkit (Quick Commerce)',
    group: SpendGroup.POPULAR_MERCHANTS,
    channel: SpendChannel.ONLINE,
    categoryTargetId: 'category-groceries',
  },
  {
    id: 'zepto',
    label: 'Zepto (Quick Commerce)',
    group: SpendGroup.POPULAR_MERCHANTS,
    channel: SpendChannel.ONLINE,
    categoryTargetId: 'category-groceries',
  },
  {
    id: 'bigbasket',
    label: 'BigBasket (Groceries / Tata)',
    group: SpendGroup.POPULAR_MERCHANTS,
    channel: SpendChannel.ONLINE,
    categoryTargetId: 'category-groceries',
  },
  {
    id: 'tata-neu',
    label: 'Tata Neu (1mg / Croma / Air India / Qmin)',
    group: SpendGroup.POPULAR_MERCHANTS,
    channel: SpendChannel.ONLINE,
    categoryTargetId: 'general-online',
  },
  {
    id: 'airtel',
    label: 'Airtel Thanks (Mobile / DTH / Broadband)',
    group: SpendGroup.POPULAR_MERCHANTS,
    channel: SpendChannel.ONLINE,
    categoryTargetId: 'category-utilities',
  },
  {
    id: 'myntra',
    label: 'Myntra (Fashion)',
    group: SpendGroup.POPULAR_MERCHANTS,
    channel: SpendChannel.ONLINE,
    categoryTargetId: 'general-online',
  },
  {
    id: 'uber',
    label: 'Uber (Rides & Travel)',
    group: SpendGroup.POPULAR_MERCHANTS,
    channel: SpendChannel.ONLINE,
    categoryTargetId: 'category-travel',
  },
  {
    id: 'ola',
    label: 'Ola (Rides & Cabs)',
    group: SpendGroup.POPULAR_MERCHANTS,
    channel: SpendChannel.ONLINE,
    categoryTargetId: 'category-travel',
  },
  {
    id: 'makemytrip',
    label: 'MakeMyTrip (Flights, Hotels & Holidays)',
    group: SpendGroup.POPULAR_MERCHANTS,
    channel: SpendChannel.ONLINE,
    categoryTargetId: 'category-travel',
  },
  {
    id: 'scapia-travel',
    label: 'Scapia App (Travel: Flights, Hotels, Buses & Trains)',
    group: SpendGroup.POPULAR_MERCHANTS,
    channel: SpendChannel.ONLINE,
    categoryTargetId: 'category-travel',
  },
  {
    id: 'bookmyshow',
    label: 'BookMyShow (Movies & Events)',
    group: SpendGroup.POPULAR_MERCHANTS,
    channel: SpendChannel.ONLINE,
    categoryTargetId: 'category-movies',
  },

  // --- Categories with 4-Digit MCC Codes & Common Spends ---
  {
    id: 'forex-international',
    label: 'Forex & International Spends (Foreign Currency)',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.OMNICHANNEL,
  },
  {
    id: 'credit-card-bill-payment',
    label: 'Credit Card Bill Payments (Cred, CheQ, Mobikwik, Bank BillPay)',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.ONLINE,
    mccs: ['6012'],
  },
  {
    id: 'bank-charges-fees',
    label: 'Card Charges & Fees (Annual fee, late payment fee, finance charges, GST)',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.OFFLINE,
  },
  {
    id: 'category-cash-withdrawal',
    label: 'ATM Cash Withdrawals & Cash Advances',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.OFFLINE,
    mccs: ['6010', '6011', '6050'],
  },
  {
    id: 'emi-transactions',
    label: 'EMI Transactions & Conversions (Merchant EMI / Post-Purchase EMI)',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.OMNICHANNEL,
  },
  {
    id: 'category-fuel',
    label: 'Fuel, Petrol Pumps & EV Charging Stations',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.OFFLINE,
    mccs: ['5541', '5542', '5172', '5983', '5552'],
  },
  {
    id: 'category-rent',
    label: 'Rental Payments, Property Management & Real Estate Fees',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.ONLINE,
    mccs: ['6513', '7012', '7349'],
  },
  {
    id: 'category-wallet',
    label: 'Prepaid Wallet Loading & Stored Value Cards (Paytm, Mobikwik, Amazon Pay)',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.ONLINE,
    mccs: ['6540'],
  },
  {
    id: 'category-education',
    label: 'Education, Schools, Colleges & Childcare',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.ONLINE,
    mccs: ['8211', '8220', '8241', '8244', '8249', '8299', '8351'],
  },
  {
    id: 'category-government',
    label: 'Government Services, Taxes, Fines & Postal Charges',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.ONLINE,
    mccs: ['9211', '9222', '9223', '9311', '9399', '9402', '9405', '9950'],
  },
  {
    id: 'category-insurance',
    label: 'Insurance Premiums: Life, Health, Motor & General',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.ONLINE,
    mccs: ['6300', '5960'],
  },
  {
    id: 'category-jewelry',
    label: 'Jewelry, Watches, Precious Stones, Metals & Antiques',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.OMNICHANNEL,
    mccs: ['5944', '5094', '5932', '5937'],
  },
  {
    id: 'category-gambling',
    label: 'Gambling, Betting, Lotteries & Casino Gaming',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.ONLINE,
    mccs: ['7995'],
  },
  {
    id: 'category-fastag',
    label: 'Tolls, Bridge Fees & FASTag Recharges',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.ONLINE,
    mccs: ['4784'],
  },
  {
    id: 'category-investments',
    label: 'Security Brokers, Mutual Funds & Stock Trading',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.ONLINE,
    mccs: ['6211'],
  },
  {
    id: 'category-collection-agencies',
    label: 'Collection Agencies & Debt Recovery',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.OMNICHANNEL,
    mccs: ['7322'],
  },
  {
    id: 'category-charity',
    label: 'Charitable & Social Service Organizations',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.ONLINE,
    mccs: ['8398', '8641'],
  },
  {
    id: 'category-religious',
    label: 'Religious Organizations & Places of Worship',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.ONLINE,
    mccs: ['8661'],
  },
  {
    id: 'category-wire-transfer',
    label: 'Money Transfers & Wire Remittances',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.ONLINE,
    mccs: ['4829'],
  },
  {
    id: 'category-b2b',
    label: 'Business-to-Business (B2B) & Commercial Spends',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.OMNICHANNEL,
    mccs: [
      '7399', '7311', '7372', '5045', '5047', '5065', '5072', '5111',
      '5013', '2741', '5137', '5192', '5193', '5131', '7361', '5085',
      '7333', '5039', '7379', '5021', '5199', '5122', '5099', '5198',
      '5139', '7829', '7395', '5051', '5046', '5169', '7375', '5074',
      '8734', '5044', '2842', '2791',
    ],
  },
  {
    id: 'category-wholesale-clubs',
    label: 'Wholesale Clubs & Bulk Cash-and-Carry (e.g. Metro)',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.OFFLINE,
    mccs: ['5300'],
  },
  {
    id: 'category-hospital',
    label: 'Hospitals & Inpatient Healthcare Centers',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.OMNICHANNEL,
    mccs: ['8062'],
  },
  {
    id: 'category-healthcare-clinics',
    label: 'Doctors, Dentists, Opticians & Specialized Clinics',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.OMNICHANNEL,
    mccs: ['8011', '8021', '8043', '8099'],
  },
  {
    id: 'category-transit',
    label: 'Local Commuter Transit, Metro Rail & City Buses',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.OMNICHANNEL,
    mccs: ['4111'],
  },
  {
    id: 'category-railways',
    label: 'Railways & Passenger Trains (IRCTC)',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.ONLINE,
    mccs: ['4112'],
  },
  {
    id: 'category-crypto',
    label: 'Cryptocurrency & Virtual Currency Exchanges',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.ONLINE,
    mccs: ['6051'],
  },
  {
    id: 'category-gift-cards',
    label: 'Gift Cards, Brand Vouchers & Prepaid Codes (Gyftr, Woohoo)',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.ONLINE,
    mccs: ['5947', '5816'],
  },
  {
    id: 'category-utilities',
    label: 'Utility Bills: Electricity, Water, Gas, Telecom & Cable TV',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.ONLINE,
    mccs: ['4900', '4814', '4816', '4899'],
  },
  {
    id: 'category-groceries',
    label: 'Supermarkets, Groceries, Bakeries & Liquor Stores',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.OFFLINE,
    mccs: ['5411', '5422', '5441', '5451', '5462', '5499', '5921'],
  },
  {
    id: 'category-dining',
    label: 'Dining Places, Restaurants, Bars & Caterers',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.OFFLINE,
    mccs: ['5811', '5812', '5813'],
  },
  {
    id: 'category-fast-food',
    label: 'Fast Food Restaurants & Quick Service Cafes',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.OMNICHANNEL,
    mccs: ['5814'],
  },
  {
    id: 'category-travel',
    label: 'Travel Bookings: Flights, Hotels, Cabs & Holidays',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.ONLINE,
    mccs: ['4511', '4722', '7011', '4121'],
  },
  {
    id: 'category-movies',
    label: 'Movie Theatres, Cinema & Live Entertainment',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.ONLINE,
    mccs: ['7832', '7922'],
  },
  {
    id: 'general-online',
    label: 'General Online Shopping (Other eCommerce)',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.ONLINE,
    mccs: ['5399', '5311', '5651'],
  },
  {
    id: 'general-pos',
    label: 'General Offline POS Swipes (Retail / In-store)',
    group: SpendGroup.CATEGORIES,
    channel: SpendChannel.OFFLINE,
    mccs: ['5311', '5651', '5331'],
  },
];

/**
 * Dynamically builds the user-facing display label for a spend target.
 * For categories with MCC codes, it dynamically appends '(MCC xxxx, yyyy)'
 * so the `mccs` array is the single source of truth without duplication.
 */
export function getSpendTargetDisplayLabel(target: SpendTarget, forceShowMcc: boolean = false): string {
  if (target.group === SpendGroup.CATEGORIES && target.mccs && target.mccs.length > 0) {
    if (forceShowMcc || target.mccs.length <= 8) {
      return `${target.label} (MCC ${target.mccs.join(', ')})`;
    }
    return `${target.label} (MCC ${target.mccs.slice(0, 6).join(', ')}, +${target.mccs.length - 6} more)`;
  }
  return target.label;
}

/**
 * Extracts a clean short title for card ranking headers.
 */
export function getSpendTargetShortTitle(target: SpendTarget): string {
  return target.label.split('(')[0].trim();
}


