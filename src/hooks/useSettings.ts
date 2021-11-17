import C from 'js-cookie';
import { E_NO_SET, S_ALL, S_COO, S_ID, S_S } from '@/constants';
import type {
  CookieConsentSettings,
  SavedCookieSettings,
  SavedObj,
  UsedCats,
} from '@/types/settings';
import { activatedCats, activatedCoks, cookies, openPanel, setAcCok, store } from '@/store';
import debug from '@/utils/debug';

type SaveParams = {
  all: boolean;
  cookies: SavedObj;
};

// utils
const error = (e: string) => {
  return new Error(e);
};
const gi = C.get;
const si = C.set;
const ri = C.remove;
const { parse, stringify } = JSON;

function getSettings(): CookieConsentSettings | null {
  const s: HTMLScriptElement | null = document.querySelector('script[data-cc-settings]');
  if (s?.textContent) {
    return parse(s.textContent);
  }
  if (window.CC_SETTINGS) {
    return window.CC_SETTINGS;
  }
  return null;
}

function getSaved(): SavedCookieSettings {
  const i = gi(S_ID) || null;
  const aco = gi(S_COO);
  const aal = gi(S_ALL);
  const s = gi(S_S);
  return {
    id: i,
    acok: aco ? parse(aco) : null,
    aall: typeof aal === 'string' ? aal === 'true' : null,
    sAt: s ? Number(s) : null,
  };
}
// utils end

export function useSettings() {
  const ss = getSaved();
  const cs = getSettings();
  if (!cs) throw error(E_NO_SET);
  const usedCats: UsedCats = [];
  cs.cookies.forEach(
    (c) =>
      usedCats.findIndex((ca) => ca.name === c.category) === -1 &&
      usedCats.push({ name: c.category, label: cs.categories[c.category] }),
  );
  store.set({
    settings: cs,
    categories: usedCats,
  });
  cookies.set(cs.cookies);
  debug.log('SETTINGS:', cs);
  debug.log('SAVED:', ss);
  if (
    (ss.sAt && cs.updatedAt && cs.updatedAt > ss.sAt) ||
    (ss.id && cs.id && ss.id !== cs.id) ||
    (ss.acok === null && ss.aall === null && !ss.sAt)
  ) {
    if (ss.sAt || ss.id) reset(); // old cookie settings will be removed
    openPanel();
    return true;
  }
  if (ss.acok) {
    Object.keys(ss.acok).forEach((key) => {
      setAcCok(key, ss.acok?.[key] || false);
    });
  }
  inject({
    all: ss.aall || false,
    cookies: ss.acok || {},
  });
  return false;
}

export function reset() {
  ri(S_ID);
  ri(S_ALL);
  ri(S_COO);
  ri(S_S);
  debug.log('RESET DONE. RELOAD.');
  window.location.reload();
}

export function reopen() {
  openPanel();
}

export function save(p: SaveParams, disallow = false) {
  const exp = { expires: disallow ? 14 : 365 };
  const { settings } = store.get();
  const { all, cookies } = p;
  if (!settings) throw error(E_NO_SET);
  if (settings.id) si(S_ID, settings.id, exp);
  si(S_S, Date.now().toString(), exp);
  if (all) {
    si(S_ALL, 'true', exp);
    const st = store.get();
    st.categories.forEach(({ name }) => {
      activatedCats.setKey(name, true);
    });
    st.settings?.cookies.forEach((cok) => {
      activatedCoks.setKey(cok.name, true);
    });
    si(S_COO, stringify(activatedCoks.get()), exp);
  } else if (cookies) {
    si(S_COO, stringify(cookies), exp);
  }
}

export function loadScript(url: string) {
  const head = document.getElementsByTagName('head')[0];
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  script.onload = () => {
    debug.log('loaded script');
  };
  head.appendChild(script);
}

export function inject(p: SaveParams) {
  let s: NodeListOf<HTMLScriptElement>;
  let sl: Array<HTMLScriptElement> = [];
  if (p.all) {
    s = document.querySelectorAll('script[data-cc]');
    sl = Array.from(s);
    debug.log('INJECT:', 'all');
  } else {
    Object.keys(p.cookies).forEach((key) => {
      debug.log('INJECT:', key);
      if (p.cookies[key]) {
        s = document.querySelectorAll(`script[data-cc="${key}"]`);
        sl = [...sl, ...Array.from(s)];
      }
    });
  }
  sl.forEach((script) => {
    if (script.textContent) {
      script.type = 'text/javascript';
      if (eval) eval(script.textContent);
      else if (window.execScript) window.execScript(script.textContent);
    } else if (script.src) {
      // script.l;
      loadScript(script.src);
    }
  });
  window.ccReopen = function () {
    reopen();
  };
  window.ccReset = function () {
    reset();
  };
}
