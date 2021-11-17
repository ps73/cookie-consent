// import { Button } from '@/elements';
import type { UsedCats } from '@/types/settings';
import { Category } from './Category';

type HomeProps = {
  categories: UsedCats;
  moreLabel: string;
  shortMoreLabel: string;
  onClickMore: () => void;
};

export function Home({ categories, shortMoreLabel }: HomeProps) {
  return (
    <div className="vhome">
      <div class="category-list">
        {categories.map((cat) => (
          <Category
            key={cat.name}
            disabled={cat.name === 'Functional'}
            name={cat.name}
            moreLabel={shortMoreLabel}
          >
            {cat.label}
          </Category>
        ))}
      </div>
      {/* <Button text onClick={() => onClickMore()}>
        {moreLabel}
      </Button> */}
    </div>
  );
}
