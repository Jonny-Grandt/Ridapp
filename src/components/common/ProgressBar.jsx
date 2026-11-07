import React from 'react';

/**
 * Progress bar med animationsstöd och procentindikator
 */
export function ProgressBar({
  value = 0,
  max = 100,
  showLabel = false,
  label = '',
  height = 'h-2',
  color = 'bg-equestrian-dark',
  trackColor = 'bg-[#EAE6DF]',
  className = '',
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center text-xs text-neutral-600 mb-1.5 font-medium">
          <span>{label}</span>
          <span className="font-semibold text-equestrian-dark">{percentage}%</span>
        </div>
      )}
      <div className={`w-full ${height} ${trackColor} rounded-full overflow-hidden`}>
        <div
          className={`${height} ${color} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

