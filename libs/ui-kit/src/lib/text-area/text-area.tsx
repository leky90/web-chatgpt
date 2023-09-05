import clsx from 'clsx';
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  PropsWithChildren,
  forwardRef,
} from 'react';

/* eslint-disable-next-line */
export interface TextAreaProps extends PropsWithChildren {
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
  rows?: number;
  value?: string;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
  resizeable?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function (
    { children, block = true, resizeable = true, className, ...inputProps },
    ref
  ) {
    const display = block ? 'w-full' : '';
    const resize = resizeable ? 'resize-y' : 'resize-none';
    return (
      <textarea
        ref={ref}
        className={clsx(
          'form-textarea bg-neutral_smoke disabled:bg-neutral_dark_smoke text-neutral_dark rounded outline-none min-h-[40px]',
          display,
          resize,
          className
        )}
        {...inputProps}
      >
        {children}
      </textarea>
    );
  }
);
