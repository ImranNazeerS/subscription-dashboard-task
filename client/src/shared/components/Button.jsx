import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  children, 
  disabled, 
  ...props 
}, ref) => {
  
  const variants = {
    primary: 'bg-button-primary text-button-primary-text hover:opacity-90',
    secondary: 'bg-button-secondary text-button-secondary-text hover:bg-gray-50 border border-border',
    danger: 'bg-danger text-white hover:opacity-90',
    outline: 'bg-transparent border border-border text-text-primary hover:bg-gray-50',
    ghost: 'bg-transparent text-text-primary hover:bg-gray-100',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-sm',
    md: 'px-4 py-2 text-base rounded-md',
    lg: 'px-6 py-3 text-lg rounded-lg',
  };

  return (
    <button
      ref={ref}
      disabled={isLoading || disabled}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-button-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
