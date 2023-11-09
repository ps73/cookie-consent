import type {
  CookieCategories,
  CookieConsent,
  CookieConsentSettings,
  CookieSettings,
  SavedObj,
  UsedCats,
} from '@/types/settings';
import { map, atom, computed, action } from 'nanostores';

type Store = {
  settings: CookieConsentSettings | null;
  categories: UsedCats;
};

// state
export const openedCat = atom<string | null>(null);
export const activatedCats = map<SavedObj>({
  Functional: true,
});
export const activatedCoks = map<SavedObj>({});
export const showPanel = atom(false);
export const view = atom<'h' | 'd'>('h');
export const store = map<Store>({
  settings: null,
  categories: [],
});
export const cookies = atom<CookieSettings[]>([]);

// getter
export const cookiesByCat = (cat: CookieCategories | string) =>
  cookies.get().filter((co) => co.category === cat);
export const isCatOpen = (cat: string) => computed(openedCat, (c) => c === cat);

// mutations
export const setAcCat = (cat: CookieCategories | string, val: boolean) => {
  activatedCats.setKey(cat, val);
};
export const setAcCok = (cok: string, val: boolean) => {
  activatedCoks.setKey(cok, val);
};
export const changeView = (v: 'h' | 'd') => {
  view.set(v);
};
export const openCat = (cat: string) => {
  openedCat.get() === cat ? openedCat.set(null) : openedCat.set(cat);
};
export const openPanel = action(showPanel, 'openPanel', () => {
  if (showPanel.get() === false) {
    showPanel.set(true);
  }
});
export const hidePanel = action(showPanel, 'hidePanel', () => {
  if (showPanel.get() === true) {
    showPanel.set(false);
  }
});

// methods
export const catIsActive = (cat: CookieCategories | string) => {
  let a = true;
  const c = cookiesByCat(cat);
  c.forEach(({ name }) => {
    if (!activatedCoks.get()[name]) a = false;
  });
  return a;
};

/**
 * @description nanostores based store for cookie consent
 */
export const consentStore = map<CookieConsent>({
  all: false,
  cookies: {},
  acceptedAt: null,
});
