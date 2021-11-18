import { useStore } from '@nanostores/preact';
import { Button } from '@/elements';
import { inject, save } from '@/hooks/useSettings';
import { activatedCoks, changeView, hidePanel, showPanel, store, view } from '@/store';
import { Details } from './Details';
import { Home } from './Home';
import { getPositionClass } from '@/hooks/useClasses';

function View() {
  const { settings: s, categories: cat } = useStore(store);
  const v = useStore(view);
  return (
    s && (
      <>
        {v === 'h' ? (
          <Home
            categories={cat}
            moreLabel={s.content.more}
            shortMoreLabel={s.content.moreShort}
            onClickMore={() => changeView('d')}
          />
        ) : (
          <Details lessLabel={s.content.less} onClickLess={() => changeView('h')} />
        )}
      </>
    )
  );
}

export function Panel() {
  const { settings: s } = useStore(store);
  const sp = useStore(showPanel);
  const st = s?.style || {};
  const { position: p, hideScroll: h } = st;
  const c = `panel-container ${getPositionClass(p)} ${h ? 'hide-scroll' : ''}`;

  const submit = (all = false, disallowAll = false) => {
    const cookies = activatedCoks.get();
    let sparams = { all, cookies };
    if (disallowAll) {
      sparams = {
        all: false,
        cookies: {},
      };
    }
    setTimeout(
      () => {
        hidePanel();
      },
      all ? 150 : 0,
    );
    save(sparams, disallowAll);
    if (!disallowAll) inject(sparams);
  };

  if (h && sp) {
    document.body.classList.add('cc-hide-scroll');
  } else {
    document.body.classList.remove('cc-hide-scroll');
  }

  return (
    <>
      {s && sp && (
        <div className={c}>
          <div className="consent-panel">
            <h4>{s.content.title}</h4>
            <p>{s.content.paragraph}</p>
            <div>
              {s.content.links.map(([l, href]) => (
                <a class="link" key={l} href={href} target="_blank" rel="noreferrer">
                  {l}
                </a>
              ))}
            </div>
            <View />
            <div className="action-buttons">
              <Button p={st.sameButtonColor} onClick={() => submit(false, true)}>
                {s.content.disallow}
              </Button>
              <Button p={st.sameButtonColor} onClick={() => submit()}>
                {s.content.save}
              </Button>
              <Button p main={true} onClick={() => submit(true)}>
                {s.content.allow}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
