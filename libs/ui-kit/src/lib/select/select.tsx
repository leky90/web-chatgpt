import clsx from 'clsx';
import { ChangeEventHandler, forwardRef } from 'react';

/* eslint-disable-next-line */
export interface SelectProps {
  name?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  block?: boolean;
  options?: Map<string, string | number>;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  defaultValue?: string | number;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function (
  { block = true, options, className, ...selectProps },
  ref
) {
  const display = block ? 'w-full' : '';
  return (
    <select
      ref={ref}
      className={clsx(
        'form-select disabled:bg-neutral_dark_smoke bg-neutral_smoke text-neutral_dark rounded outline-none',
        display,
        className
      )}
      {...selectProps}
    >
      {options &&
        [...options.entries()].map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
    </select>
  );
});
