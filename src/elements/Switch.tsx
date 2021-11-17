type SwitchProps = {
  value: boolean;
  id: string;
  children?: JSX.HTMLAttributes<HTMLInputElement>['children'];
  disabled?: boolean;
  noLabel?: boolean;
  small?: boolean;
  onChange: (b: boolean) => void;
};

export function Switch({ value, small, children, noLabel, onChange, ...props }: SwitchProps) {
  const c = small ? 'switch sm' : 'switch';

  return (
    <div className={c}>
      <input
        className="el"
        checked={value}
        type="checkbox"
        {...props}
        onChange={() => onChange(!value)}
      />
      {!noLabel && <label for={props.id}>{children}</label>}
    </div>
  );
}
