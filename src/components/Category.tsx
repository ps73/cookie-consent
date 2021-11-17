import { Button, Switch } from '@/elements';
import {
  activatedCats,
  catIsActive,
  cookiesByCat,
  isCatOpen,
  openCat,
  setAcCat,
  setAcCok,
  store,
} from '@/store';
import { useStore } from '@nanostores/preact';
import { Services } from './Services';

type CategoryProps = {
  // active: boolean;
  name: string;
  moreLabel: string;
  children: JSX.HTMLAttributes<HTMLDivElement>['children'];
  disabled?: boolean;
  // onChange: (b: boolean) => void;
};

export function Category({ disabled, name, children, moreLabel }: CategoryProps) {
  const show = useStore(isCatOpen(name));
  const services = cookiesByCat(name);
  const active = useStore(activatedCats);
  const { settings } = useStore(store);

  const onCheckAll = (v: boolean) => {
    setAcCat(name, v);
    services.forEach(({ name }) => {
      setAcCok(name, v);
    });
  };

  const proofIfAllChecked = () => {
    const na = catIsActive(name);
    if (active[name] !== na) {
      setAcCat(name, na);
    }
  };

  if (name === 'Functional') {
    onCheckAll(true);
  }

  setTimeout(() => {
    proofIfAllChecked();
  }, 100);

  return (
    <div class="category">
      <div class="category-main">
        <Switch id={name} value={active[name]} disabled={disabled} onChange={(b) => onCheckAll(b)}>
          {children} {}
        </Switch>
        <Button text onClick={() => openCat(name)}>
          {moreLabel}
        </Button>
      </div>
      {show && settings && (
        <div class="category-services">
          <Services
            services={services}
            content={settings.content.cookies}
            disabled={disabled}
            onChange={() => proofIfAllChecked()}
          />
        </div>
      )}
    </div>
  );
}
