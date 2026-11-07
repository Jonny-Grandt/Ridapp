import React from 'react';
import { Check } from 'lucide-react';
import { IMAGES } from '../../assets/images';

/**
 * Målkort för val av fokusområden (Screen 2 i designskiss)
 */
export function GoalCard({
  goal,
  onToggle,
  className = '',
}) {
  const isSelected = goal.selected;

  return (
    <div
      onClick={() => onToggle(goal.id)}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onToggle(goal.id);
        }
      }}
      className={`bg-white rounded-2xl p-3 border transition-all duration-200 flex items-center gap-3.5 cursor-pointer select-none active:scale-[0.99] ${
        isSelected
          ? 'border-equestrian-dark shadow-sm bg-[#FAFCFA]'
          : 'border-[#EAE5DC] hover:border-neutral-300'
      } ${className}`}
    >
      {/* Målbild */}
      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#E8ECE6]">
        <img
          src={goal.imageUrl || IMAGES.goals.default}
          alt={goal.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Målrubrik */}
      <div className="flex-1 min-w-0 pr-2">
        <h4 className="text-sm font-semibold text-equestrian-dark leading-snug">
          {goal.title}
        </h4>
        {goal.description && (
          <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
            {goal.description}
          </p>
        )}
      </div>

      {/* Urvalscirkel med bock (matchar skissens runda checkmark) */}
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
          isSelected
            ? 'bg-equestrian-dark text-white shadow-xs'
            : 'border-2 border-neutral-300 bg-white'
        }`}
      >
        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
      </div>
    </div>
  );
}

