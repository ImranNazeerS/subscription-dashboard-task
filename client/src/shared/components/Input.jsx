import React from 'react';
import { cn } from '../../lib/utils';

const Input = React.forwardRef(({ className, label, error, ...props }, ref) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-button-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all",
          error && "border-danger focus:ring-danger",
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-sm text-danger mt-1">
          {error.message || error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
