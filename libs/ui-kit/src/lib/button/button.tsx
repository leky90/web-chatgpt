import clsx from 'clsx';
import { MouseEvent, PropsWithChildren } from 'react';

/* eslint-disable-next-line */
export interface ButtonProps extends PropsWithChildren {
  className?: string;
  inline?: boolean;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function Button({
  children,
  className,
  type = 'button',
  inline,
  ...btnProps
}: ButtonProps) {
  const display = inline ? 'inline-flex' : 'flex w-full';

  return (
    <button
      type={type}
      className={clsx(
        'bg-primary hover:bg-primary_shade disabled:bg-neutral_dark_smoke text-neutral_dark py-2 px-4 rounded gap-1 justify-center items-center',
        display,
        className
      )}
      {...btnProps}
    >
      {children}
    </button>
  );
}

export default Button;
