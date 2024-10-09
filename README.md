# simpler-cookie-consent

A serverless cookie-consent tool.

## Installation

### NPM

```bash
npm install simpler-cookie-consent
```

Add following div somewhere to your dom or inside a component:
```html
<div id="cc"></div>
```

```ts
import type { CookieConsent, CookieConsentSettings } from 'simpler-cookie-consent';
import { mount, reopen, reset, setSettings, getConsent, consentStore, hasConsent, setDebugLogs, setConsent } from 'simpler-cookie-consent';

import 'simpler-cookie-consent/styles.css';

const mySettings: CookieConsentSettings = {
  //...
};
setSettings(mySettings); // will update settings

mount(); // mounts initial consent management, will open panel if no consent was given or settings were changed
reopen(); // will reopen panel with saved consent settings
reset(); // will reset all consent settings and reload page
getConsent(); // will return current consent settings
setDebugLogs(true); // will enable debug logs
hasConsent('Google Analytics').get(); // will return nanostores computed boolean if consent was given for this service
setConsent('Google Analytics'); // will set consent for this service and inject scripts

// listen to cookie changes via event listener
window.addEventListener('cc-inject', (e: any) => {
  console.log('cc-inject', e.detail as CookieConsent);
});

// or subscribe to store changes
const unsubscribe = consentStore.subscribe((c: CookieConsent) => {
  console.log('consent-change', c);
});
// to unsubscribe
unsubscribe();

// or subscribe for specific service
const unsubscribe1 = hasConsent('Google Analytics').subscribe((c: boolean) => {
  console.log('consent-change', c);
});
// to unsubscribe
unsubscribe1();
```

#### Typescript usage

If you want to use window methods you have to extend Window interface with the following:

```ts
import type { GlobalCookieConsent } from 'simpler-cookie-consent';

declare global {
  interface Window extends GlobalCookieConsent {}
}
```

### CDN

```html
<link href="https://cdn.jsdelivr.net/npm/simpler-cookie-consent@latest/dist/style.css" rel="stylesheet">
<div id="cc"></div>
<script async src="https://cdn.jsdelivr.net/npm/simpler-cookie-consent@latest/dist/simpler-cookie-consent.umd.js" onload="window.mountCookieConsent()"></script>
```

## Configuration

[Have a look at this cookie database](https://github.com/jkwakman/Open-Cookie-Database/blob/master/open-cookie-database.csv) if you need help to find the right information for your cookies.

Always use category key "Functional" for essential cookies which are necessary for the website to function properly.

> [!IMPORTANT]  
> Every time you change something inside the array `settings.cookies` you should change `settings.updatedAt` to! Use milliseconds timestamp or growing number. This will automatically check if the settings were changed and will reopen the panel for users that already gave their consent before the changes were made.

### JavaScript

```js
window.CC_SETTINGS = {
  "id": "c81723892",
  "categories": {
    "Functional": "Essenziell",
    "Analytics": "Statistiken",
    "Marketing": "Marketing"
  },
  "content": {
    "title": "Cookie Einstellungen",
    "paragraph": "Diese Seite nutzt Website-Technologien von Dritten, um ihre Dienste anzubieten und diese stetig zu verbessern.",
    "categories": "Kategorien",
    "services": "Services",
    "links": [["Impressum", "/impressum", "_self"], ["Datenschutzerklärung", "/datenschutz", "_blank"]],
    "more": "Mehr anzeigen",
    "moreShort": "Mehr",
    "less": "Weniger anzeigen",
    "save": "Einstellungen speichern",
    "disallow": "Ablehnen",
    "allow": "Alles akzeptieren",
    "cookies": {
      "name": "Cookie",
      "description": "Beschreibung",
      "retention": "Speicherdauer",
      "dataController": "Verarbeitendes Unternehmen",
      "domain": "Domain",
      "privacySettings": "Datenschutz",
      "notAvailable": "Keine Angabe",
      "yes": "Ja",
      "no": "Nein",
      "multiple": "Verwendet mehrere Cookies"
    }
  },
  "style": {
    "position": "tl",
    "hideScroll": true,
    "sameButtonColor": true
  },
  "cookies": [
    {
      "id": "custom1",
      "name": "Cookie Consent Settings",
      "category": "Functional",
      "cookieName": "_cc_s, _cc_i, _cc_acoo, _cc_aall",
      "domain": "Diese Website",
      "description": "Settings to inject cookies automatically after revisit until cookies were changed",
      "retentionPeriod": "1 year",
      "dataController": "Diese Website",
      "wildcardMatch": false
    },
    {
      "id": "256c18e8-d881-11e9-8a34-2a2ae2dbcce4",
      "name": "Google Analytics",
      "category": "Analytics",
      "cookieName": "_ga",
      "domain": "google-analytics.com (3rd party) or advertiser's website domain (1st party)",
      "description": "ID used to identify users",
      "retentionPeriod": "2 years",
      "dataController": "Google",
      "privacy": "https://privacy.google.com/take-control.html",
      "wildcardMatch": false
    },
    {
      "id": "256c1ae6-d881-11e9-8a34-2a2ae2dbcce4",
      "name": "Google Analytics",
      "category": "Analytics",
      "cookieName": "_gid",
      "domain": "google-analytics.com (3rd party) or advertiser's website domain (1st party)",
      "description": "ID used to identify users for 24 hours after last activity",
      "retentionPeriod": "24 hours",
      "dataController": "Google",
      "privacy": "https://privacy.google.com/take-control.html",
      "wildcardMatch": false
    },
    {
      "id": "0d249cd5-ae35-4dbb-ad00-d5ca46948619",
      "name": "Facebook",
      "category": "Marketing",
      "cookieName": "_fbp",
      "domain": "facebook.com (3rd party)",
      "description": "Used by Facebook to deliver a series of advertisement products such as real time bidding from third party advertisers",
      "retentionPeriod": "4 months",
      "dataController": "Facebook",
      "privacy": "https://www.facebook.com/about/privacy/",
      "wildcardMatch": false
    },
    {
      "id": "f6f65358-15e8-4dcc-9014-13ae87d0e880",
      "name": "Google reCAPTCHA",
      "category": "Functional",
      "cookieName": "_GRECAPTCHA",
      "domain": "google.com",
      "description": "Google reCAPTCHA sets a necessary cookie (_GRECAPTCHA) when executed for the purpose of providing its risk analysis.",
      "retentionPeriod": "179 days",
      "dataController": "Google",
      "privacy": "https://privacy.google.com/take-control.html",
      "wildcardMatch": false
    }
  ],
  "updatedAt": 1
};
```

### DOM

```html
<script type="application/json" data-cc-settings>
  {
    "id": "c81723892",
    "categories": {
      "Functional": "Essenziell",
      "Analytics": "Statistiken",
      "Marketing": "Marketing"
    },
    "content": {
      "title": "Cookie Einstellungen",
      "paragraph": "Diese Seite nutzt Website-Technologien von Dritten, um ihre Dienste anzubieten und diese stetig zu verbessern.",
      "categories": "Kategorien",
      "services": "Services",
      "links": [["Impressum", "/impressum", "_self"], ["Datenschutzerklärung", "/datenschutz", "_blank"]],
      "more": "Mehr anzeigen",
      "moreShort": "Mehr",
      "less": "Weniger anzeigen",
      "save": "Einstellungen speichern",
      "disallow": "Ablehnen",
      "allow": "Alles akzeptieren",
      "cookies": {
        "name": "Cookie",
        "description": "Beschreibung",
        "retention": "Speicherdauer",
        "dataController": "Verarbeitendes Unternehmen",
        "domain": "Domain",
        "privacySettings": "Datenschutz",
        "notAvailable": "Keine Angabe",
        "yes": "Ja",
        "no": "Nein",
        "multiple": "Verwendet mehrere Cookies"
      }
    },
    "style": {
      "position": "tl",
      "hideScroll": true,
      "sameButtonColor": true
    },
    "cookies": [
      {
        "id": "custom1",
        "name": "Cookie Consent Settings",
        "category": "Functional",
        "cookieName": "_cc_s, _cc_i, _cc_acoo, _cc_aall",
        "domain": "Diese Website",
        "description": "Settings to inject cookies automatically after revisit until cookies were changed",
        "retentionPeriod": "1 year",
        "dataController": "Diese Website",
        "wildcardMatch": false
      },
      {
        "id": "256c18e8-d881-11e9-8a34-2a2ae2dbcce4",
        "name": "Google Analytics",
        "category": "Analytics",
        "cookieName": "_ga",
        "domain": "google-analytics.com (3rd party) or advertiser's website domain (1st party)",
        "description": "ID used to identify users",
        "retentionPeriod": "2 years",
        "dataController": "Google",
        "privacy": "https://privacy.google.com/take-control.html",
        "wildcardMatch": false
      },
      {
        "id": "256c1ae6-d881-11e9-8a34-2a2ae2dbcce4",
        "name": "Google Analytics",
        "category": "Analytics",
        "cookieName": "_gid",
        "domain": "google-analytics.com (3rd party) or advertiser's website domain (1st party)",
        "description": "ID used to identify users for 24 hours after last activity",
        "retentionPeriod": "24 hours",
        "dataController": "Google",
        "privacy": "https://privacy.google.com/take-control.html",
        "wildcardMatch": false
      },
      {
        "id": "0d249cd5-ae35-4dbb-ad00-d5ca46948619",
        "name": "Facebook",
        "category": "Marketing",
        "cookieName": "_fbp",
        "domain": "facebook.com (3rd party)",
        "description": "Used by Facebook to deliver a series of advertisement products such as real time bidding from third party advertisers",
        "retentionPeriod": "4 months",
        "dataController": "Facebook",
        "privacy": "https://www.facebook.com/about/privacy/",
        "wildcardMatch": false
      },
      {
        "id": "f6f65358-15e8-4dcc-9014-13ae87d0e880",
        "name": "Google reCAPTCHA",
        "category": "Functional",
        "cookieName": "_GRECAPTCHA",
        "domain": "google.com",
        "description": "Google reCAPTCHA sets a necessary cookie (_GRECAPTCHA) when executed for the purpose of providing its risk analysis.",
        "retentionPeriod": "179 days",
        "dataController": "Google",
        "privacy": "https://privacy.google.com/take-control.html",
        "wildcardMatch": false
      }
    ],
    "updatedAt": 1
  }
</script>
```

### Type Definition

Can be imported:

```ts
import type { CookieConsentSettings } from 'simple-cookie-consent';
```

And will look like:

```ts
type CookieCategories = 'Functional' | 'Analytics' | 'Marketing' | 'Preferences';

type CookieConsentSettings = {
  id?: string | null;
  content: {
    title: string;
    paragraph: string;
    categories: string;
    services: string;
    links: [label: string, href: string, target?: string | undefined][];
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
  categories: Record<CookieCategories | string, string>;
  cookies: {
    id: string; // some unique, random string
    name: string;
    category: CookieCategories | string;
    domain?: string;
    cookieName: string;
    description?: string;
    retentionPeriod?: string;
    dataController?: string;
    privacy?: string;
    wildcardMatch?: 0 | 1 | boolean;
  }[];
  style?: {
    // b = bottom, c = center, t = top, r = right, l = left
    position?: 'bc' | 'br' | 'bl' | 'cc' | 'tr' | 'tl' | 'tc' | undefined;
    // if page should be scrollable or not when consent panel is open
    hideScroll?: boolean;
    // if all buttons (cancel, accept, accept all) should use the same color
    sameButtonColor?: boolean;
  };
  updatedAt?: number; // every time you update your configuration you should update updatedAt to! Use milliseconds timestamp or growing number.
};
```

### What if my service provider is using more than one cookie?

In case your service provider is using more than one cookie just add all cookies as one with the same ID like:

```json
{
  "id": "256c18e8-d881-11e9-8a34-2a2ae2dbcce4",
  "name": "Google Analytics",
  "category": "Analytics",
  "cookieName": "_ga",
  "domain": "google-analytics.com (3rd party) or advertiser's website domain (1st party)",
  "description": "ID used to identify users",
  "retentionPeriod": "2 years",
  "dataController": "Google",
  "privacy": "https://privacy.google.com/take-control.html",
  "wildcardMatch": false
},
{
  "id": "256c1ae6-d881-11e9-8a34-2a2ae2dbcce4",
  "name": "Google Analytics",
  "category": "Analytics",
  "cookieName": "_gid",
  "domain": "google-analytics.com (3rd party) or advertiser's website domain (1st party)",
  "description": "ID used to identify users for 24 hours after last activity",
  "retentionPeriod": "24 hours",
  "dataController": "Google",
  "privacy": "https://privacy.google.com/take-control.html",
  "wildcardMatch": false
}
```

If the User accepts one entry all entries for this service will be accepted.

### What if the service is not using cookies but tracking personal data like IP addresses?

In this case just add a cookie information like the following:

```json
{
  "id": "256c1ae6-d881-11e9-8a34-2a2ae2dbcce4",
  "name": "My Service",
  "category": "Preferences",
  "domain": "my-service.com",
  "description": "This service is used to embed a booking tool. It may tracks your IP address.",
  "dataController": "My Service",
  "privacy": "https://my-service.com/privacy"
}
```

## Setup Scripts

### DOM

Every script has to set type to "text/plain" and use a data-cc attribute which matches the Name of the service inside your settings config.

```html 
<script type="text/plain" data-cc="Google Analytics">
  console.log('ANALYTICS', 'Google Analytics injected');
</script>
<!-- OR with URL -->
<script type="text/plain" data-cc="My Service" src="https://my-custom-service-lorem.com/embed.js"></script>
```

### JavaScript

```ts
window.addEventListener('cc-inject', (e: any) => {
  const details = e.detail as CookieConsent;
  // It is really important to check e.detail.all!
  const myServiceAccepted = window.ccHasConsent('Google Analytics');
});

// OR subscribe to store
const unsubscribe = window.ccConsentStore.subscribe(() => {
  const myServiceAccepted = window.ccHasConsent('Google Analytics');
});

// OR subscribe to specific service
const unsubscribe1 = window.ccHasConsentStore('Google Analytics').subscribe((accepted) => {
  const myServiceAccepted = accepted; // true or false
});
// to unsubscribe
unsubscribe1();
```

## Global Methods

```js
window.mountCookieConsent();
// Reset all cookie settings
window.ccReset();
// Reopen panel
window.ccReopen();
// Get user consent
// Returns: { all: boolean, cookies: Record<string, boolean>; acceptedAt: number | null }
window.ccGetConsent();
// Get user consent store, returns nanostores map instance
window.ccConsentStore;
// Check if user has given consent for a specific service
window.ccHasConsent('Google Analytics');
// Returns nanostores computed value
window.ccHasConsentStore('Google Analytics');
// Set consent for one service
window.ccSetConsent('Google Analytics');
```

## Customize Styling

```js
// import in js
import 'simpler-cookie-consent/styles.css';
```

```html
<!-- or when using cdn package -->
<link href="https://cdn.jsdelivr.net/npm/simpler-cookie-consent@latest/dist/style.css" rel="stylesheet">
```

```html
<style>
  body {
    margin: 0;
  }
  :root {
    --cc-font-family: 'Inter', sans-serif;
    --cc-primary: #4a76d4;
    --cc-primary-text: #fff;
  }
</style>
```

## Activate Debug Logs

```js
window.CC_DEBUG = true;
```

```html
<script type="text/javascript">
  window.CC_DEBUG = true;
</script>
```
