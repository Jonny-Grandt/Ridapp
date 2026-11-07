import React from 'react';

/**
 * Nyckeltalskort för träningsstatistik (Screen 6 i designskiss)
 */
export function StatCard({
  icon: Icon,
  value,
  label,
  className = '',
}) {
  return (
    <div className={`bg-white rounded-2xl p-3.5 border border-[#EAE5DC] flex flex-col items-center justify-center text-center shadow-xs ${className}`}>
      {Icon && (
        <div className="w-8 h-8 rounded-full bg-[#F3EFE9] flex items-center justify-center text-equestrian-dark mb-1.5">
          <Icon className="w-4 h-4 stroke-[2]" />
        </div>
      )}
      <div className="text-base font-bold text-equestrian-dark tracking-tight">
        {value}
      </div>
      <div className="text-[11px] text-neutral-500 font-medium">
        {label}
      </div>
    </div>
  );
}

