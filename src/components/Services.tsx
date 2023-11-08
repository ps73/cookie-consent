import { activatedCoks, setAcCok } from '@/store';
import type { CookieConsentSettings, CookieSettings } from '@/types/settings';
import { useStore } from '@nanostores/preact';
import { Service } from './Service';

type ServicesProps = {
  services: CookieSettings[];
  content: CookieConsentSettings['content']['cookies'];
  disabled?: boolean;
  showCat?: boolean;
  onChange?: (n: string, b: boolean) => void;
};

export function Services({ services, content, onChange, disabled }: ServicesProps) {
  const acCoks = useStore(activatedCoks);

  const onActivate = (n: string, b: boolean) => {
    setAcCok(n, b);
    onChange && onChange(n, b);
  };

  return (
    <div class="service-list">
      {services.map((s) => (
        <Service
          key={s.id}
          content={content}
          disabled={disabled}
          service={s}
          active={acCoks[s.name] || false}
          multiple={services.filter((s) => s.cookieName).length > 1}
          onChange={(b) => onActivate(s.name, b)}
        />
      ))}
    </div>
  );
}
