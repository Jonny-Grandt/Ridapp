import React from 'react';
import { Check, PlayCircle } from 'lucide-react';

/**
 * Passkort i träningsschemat (Screen 4 i designskiss)
 */
export function WorkoutCard({
  workout,
  isSelected = false,
  onSelect,
  onToggleCompleted,
  className = '',
}) {
  const isCompleted = workout.completed;

  return (
    <div
      onClick={onSelect}
      className={`bg-white rounded-2xl p-4 border transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer select-none active:scale-[0.99] ${
        isSelected
          ? 'border-equestrian-dark ring-2 ring-equestrian-dark/15 shadow-sm'
          : 'border-[#EAE5DC] hover:border-neutral-300 shadow-xs'
      } ${className}`}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        {/* Checkmark-knapp */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompleted(workout.id);
          }}
          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
            isCompleted
              ? 'bg-equestrian-dark text-white'
              : 'border-2 border-neutral-300 hover:border-equestrian-dark bg-white'
          }`}
          aria-label={isCompleted ? 'Markera som ej klar' : 'Markera som klar'}
        >
          {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        {/* Titel & metadata */}
        <div className="min-w-0">
          <h4 className={`text-sm font-semibold truncate ${isCompleted ? 'text-neutral-500 line-through' : 'text-equestrian-dark'}`}>
            {workout.title}
          </h4>
          <p className="text-xs text-neutral-500 mt-0.5">
            {workout.durationMinutes} min • {workout.intensity}
          </p>
        </div>
      </div>

      {/* Video-ikon om passet har videogenomgång */}
      {workout.hasVideo && (
        <div className="text-neutral-400 hover:text-equestrian-dark shrink-0 p-1">
          <PlayCircle className="w-5 h-5 stroke-[1.8]" />
        </div>
      )}
    </div>
  );
}

