import { Button } from '@/elements';

type DetailsProps = {
  lessLabel: string;
  onClickLess: () => void;
};

export function Details({ lessLabel, onClickLess }: DetailsProps) {
  return (
    <div class="vdetails">
      <Button text onClick={() => onClickLess()}>
        {lessLabel}
      </Button>
    </div>
  );
}
