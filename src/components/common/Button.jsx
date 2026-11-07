import React from 'react';

/**
 * Återanvändbar knapp med touch-vänlig höjd och tydlig feedback
 */
export function Button({
  children,
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'light' | 'outline' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  fullWidth = false,
  disabled = false,
  className = '',
  type = 'button',
  icon: Icon,
  iconPosition = 'left',
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none';

  const variants = {
    primary: 'bg-equestrian-dark hover:bg-equestrian-primary text-white shadow-md active:bg-[#1E291F]',
    secondary: 'bg-[#EAE6DF] hover:bg-[#DDD8D0] text-equestrian-dark',
    light: 'bg-white hover:bg-neutral-50 text-equestrian-dark shadow-sm border border-neutral-100',
    outline: 'border border-equestrian-dark/30 hover:border-equestrian-dark text-equestrian-dark bg-transparent',
    ghost: 'text-equestrian-dark hover:bg-black/5 bg-transparent',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 min-h-[36px]',
    md: 'text-sm px-5 py-3 gap-2 min-h-[44px]',
    lg: 'text-base px-6 py-3.5 gap-2.5 min-h-[50px] font-semibold',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${widthStyle} ${className}`}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}

