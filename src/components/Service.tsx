import { Switch } from '@/elements';
import { CookieConsentSettings, CookieSettings } from '@/types/settings';

type ServiceProps = {
  service: CookieSettings;
  content: CookieConsentSettings['content']['cookies'];
  active: boolean;
  disabled?: boolean;
  onChange: (b: boolean) => void;
};

export function Service({ service, content, active, disabled, onChange }: ServiceProps) {
  const s = service;
  const c = content;

  const items = [
    [c.name, s.cookieName],
    [c.description, s.description],
    [c.retention, s.retentionPeriod],
    [c.dataController, s.dataController],
    [c.domain, s.domain],
    [c.privacySettings, s.privacy, 'link'],
    ['Wildcard', s.wildcardMatch?.toString()],
    ['ID', s.id],
  ];

  return (
    <div className="service">
      <Switch id={s.id} value={active} small disabled={disabled} onChange={() => onChange(!active)}>
        {s.name}
      </Switch>
      <dl>
        {items.map(([l, v, a]) => (
          <div key={l} className="item">
            <dt>{l}</dt>
            {!a && <dd>{v || c.notAvailable}</dd>}
            {a === 'link' && v && v.indexOf('http') > -1 && (
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
