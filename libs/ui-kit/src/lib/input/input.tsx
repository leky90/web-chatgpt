import clsx from 'clsx';
import { ChangeEventHandler, HTMLInputTypeAttribute, forwardRef } from 'react';

/* eslint-disable-next-line */
export interface InputProps {
  type?: HTMLInputTypeAttribute;
  name?: string;
  id?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  autoCorrect?: string;
  autoComplete?: string;
  autoCapitalize?: string;
  className?: string;
  block?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function (
  { type = 'text', block = true, className, ...inputProps },
  ref
) {
  const display = block ? 'w-full' : '';
  return (
    <input
      ref={ref}
      type={type}
      className={clsx(
        'form-input bg-neutral_smoke disabled:bg-neutral_dark_smoke text-neutral_dark rounded outline-none',
        display,
        className
      )}
      {...inputProps}
    />
  );
});
