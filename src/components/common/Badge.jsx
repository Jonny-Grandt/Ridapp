import React from 'react';

/**
 * Återanvändbar etikett/badge för status, intensitet och kategorier
 */
export function Badge({
  children,
  variant = 'neutral', // 'success' | 'active' | 'warning' | 'neutral' | 'accent'
  size = 'md',
  className = '',
  icon: Icon,
}) {
  const variants = {
    active: 'bg-[#2F4132] text-white',
    success: 'bg-[#E5ECE5] text-[#2F4132] font-semibold',
    warning: 'bg-[#F9EDE2] text-[#A26D38]',
    neutral: 'bg-[#EFECE6] text-[#4A5048]',
    accent: 'bg-[#F2EFE9] text-[#7A644D]',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2',
  };

  return (
    <span
      className={`inline-flex items-center justify-center font-medium rounded-full ${
        variants[variant] || variants.neutral
      } ${sizes[size] || sizes.md} ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  );
}

