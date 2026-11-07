import React from 'react';
import { Star } from 'lucide-react';

/**
 * Interaktiv stjärngradering (1-5 stjärnor) för utvärdering
 */
export function StarRating({
  value = 0,
  onChange,
  max = 5,
  size = 'md',
  readonly = false,
  className = '',
}) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const starIconSize = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {Array.from({ length: max }, (_, index) => {
        const starNumber = index + 1;
        const isFilled = starNumber <= value;

        return (
          <button
            key={starNumber}
            type="button"
            disabled={readonly}
            onClick={() => onChange && onChange(starNumber)}
            className={`transition-transform duration-150 ${
              readonly ? 'cursor-default' : 'cursor-pointer hover:scale-115 active:scale-95'
            } focus:outline-none`}
            aria-label={`Betygsätt ${starNumber} av ${max}`}
          >
            <Star
              className={`${starIconSize} ${
                isFilled
                  ? 'fill-[#C99D5A] text-[#C99D5A]'
                  : 'text-[#DDD6CB] fill-none'
              } transition-colors duration-200`}
            />
          </button>
        );
      })}
    </div>
  );
}

