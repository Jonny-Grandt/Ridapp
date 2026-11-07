import React from 'react';

/**
 * Standardiserat kortkomponent med mjuk skugga och runda hörn
 */
export function Card({
  children,
  className = '',
  onClick,
  hoverable = false,
  as: Component = 'div',
  padding = 'p-4',
}) {
  const isClickable = Boolean(onClick);

  return (
    <Component
      onClick={onClick}
      className={`bg-white rounded-2xl border border-neutral-100/80 shadow-sm transition-all duration-200 ${
        hoverable || isClickable ? 'cursor-pointer hover:shadow-md hover:border-equestrian-dark/20 active:scale-[0.99]' : ''
      } ${padding} ${className}`}
    >
      {children}
    </Component>
  );
}

