type ButtonProps = {
  p?: boolean;
  text?: boolean;
  main?: boolean;
} & JSX.HTMLAttributes<HTMLButtonElement>;

export function Button({ p, main, text, children, ...props }: ButtonProps) {
  const c = p && main ? 'primary main' : p ? 'primary' : text ? 'text' : '';
  return (
    <button {...props} className={c}>
      {children}
    </button>
  );
}
