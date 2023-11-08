export type CookieCategories = 'Functional' | 'Analytics' | 'Marketing' | 'Preferences';
export type CookieCategoriesObj = Record<CookieCategories | string, string>;
export type SavedObj = Record<string, boolean>;
export type UsedCats = { label: string; name: string }[];

export type CookieSettings = {
  id: string;
  name: string;
  category: CookieCategories | string;
  domain?: string;
  cookieName?: string;
  description?: string;
  retentionPeriod?: string;
  dataController?: string;
  privacy?: string;
  wildcardMatch?: 0 | 1 | boolean;
};

export type PanelPosition = 'bc' | 'br' | 'bl' | 'cc' | 'tr' | 'tl' | 'tc' | undefined;

export type CookieConsentSettings = {
  id?: string | null;
  content: {
    title: string;
    paragraph: string;
    categories: string;
    services: string;
    links: [label: string, href: string][];
    more: string;
    moreShort: string;
    less: string;
    save: string;
    disallow: string;
    allow: string;
    cookies: {
      name: string;
      description: string;
      retention: string;
      dataController: string;
      domain: string;
      privacySettings: string;
      notAvailable: string;
      yes?: string;
      no?: string;
      multiple?: string;
    };
  };
  categories: CookieCategoriesObj;
  cookies: CookieSettings[];
  style?: {
    position?: PanelPosition;
    hideScroll?: boolean;
    sameButtonColor?: boolean;
  };
  updatedAt?: number;
};

export type SavedCookieSettings = {
  id: string | null;
  acok: SavedObj | null;
  aall: boolean | null;
  sAt: number | null;
};
