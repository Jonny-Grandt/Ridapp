import React from 'react';
import { ChevronRight } from 'lucide-react';
import { IMAGES } from '../../assets/images';

/**
 * Nästa pass-widget från Hemvyn (Screen 1 i designskiss)
 */
export function NextPassCard({
  workout,
  onClick,
  className = '',
}) {
  if (!workout) return null;

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-3 shadow-md border border-[#EBE6DD] flex items-center gap-3.5 cursor-pointer hover:shadow-lg transition-all active:scale-[0.99] ${className}`}
    >
      {/* Thumbnail bild */}
      <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-[#E8ECE6]">
        <img
          src={workout.image || IMAGES.arenaNextPass}
          alt={workout.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <span className="text-[11px] font-semibold tracking-wide text-neutral-400 uppercase">
          Nästa pass
        </span>
        <h4 className="text-sm font-bold text-equestrian-dark truncate">
          {workout.dayLabel || 'Ons 29 okt'}
        </h4>
        <p className="text-xs text-neutral-500 truncate">
          {workout.title} • {workout.durationMinutes} min
        </p>
      </div>

      {/* Pilikon */}
      <div className="p-2 text-neutral-400 hover:text-equestrian-dark">
        <ChevronRight className="w-5 h-5 stroke-[2]" />
      </div>
    </div>
  );
}

