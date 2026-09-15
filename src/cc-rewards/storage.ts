import { CreditCard } from './types';

const STORAGE_KEY_SELECTED_CARDS = 'ashish_cc_selected_cards';

export function getSelectedCardIds(allCards: CreditCard[]): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SELECTED_CARDS);
    if (!raw) {
      // Default to all cards selected
      return allCards.map((c) => c.id);
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      const validIds = allCards.map((c) => c.id);
      const filtered = parsed.filter((id) => typeof id === 'string' && validIds.includes(id));
      return filtered.length > 0 ? filtered : allCards.map((c) => c.id);
    }
  } catch (e) {
    console.warn('Could not read saved cards from localStorage:', e);
  }
  return allCards.map((c) => c.id);
}

export function saveSelectedCardIds(ids: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_SELECTED_CARDS, JSON.stringify(ids));
  } catch (e) {
    console.warn('Could not save selected cards to localStorage:', e);
  }
}

