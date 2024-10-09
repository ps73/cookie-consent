import { Switch } from '@/elements';
import { CookieConsentSettings, CookieSettings } from '@/types/settings';

type ServiceProps = {
  service: CookieSettings;
  content: CookieConsentSettings['content']['cookies'];
  active: boolean;
  disabled?: boolean;
  multiple?: boolean;
  onChange: (b: boolean) => void;
};

export function Service({ service, content, active, disabled, multiple, onChange }: ServiceProps) {
  const s = service;
  const c = content;
  const cless = !s.cookieName;

  let items = [
    [c.name, s.cookieName],
    [c.description, s.description],
    [c.retention, s.retentionPeriod],
    [c.dataController, s.dataController],
    [c.domain, s.domain],
    [c.privacySettings, s.privacy, 'link'],
    [c.multiple || 'Multiple Cookies', multiple ? c.yes || 'YES' : c.no || 'NO'],
    ['Wildcard', !!s.wildcardMatch],
    ['ID', s.id],
  ];

  if (cless) {
    items = [
      [c.description, s.description],
      [c.dataController, s.dataController],
      [c.domain, s.domain],
      [c.privacySettings, s.privacy, 'link'],
      ['ID', s.id],
    ];
  }

  return (
    <div className="service">
      <Switch id={s.id} value={active} small disabled={disabled} onChange={() => onChange(!active)}>
        {s.name}
      </Switch>
      <dl>
        {items.map(([l, v, a]) => (
          <div key={l} className="item">
            <dt>{l}</dt>
            {!a && typeof v !== 'boolean' && <dd>{v || c.notAvailable}</dd>}
            {!a && typeof v === 'boolean' && <dd>{v ? c.yes || 'YES' : c.no || 'NO'}</dd>}
            {a === 'link' &&
              v &&
              typeof v === 'string' &&
              (v.indexOf('http') > -1 || v.startsWith('/')) && (
                <dd>
                  <a href={v} className="link" target="_blank" rel="noreferrer">
                    {v}
                  </a>
                </dd>
              )}
          </div>
        ))}
      </dl>
    </div>
  );
}
