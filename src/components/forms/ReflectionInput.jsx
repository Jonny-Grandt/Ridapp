import React from 'react';

/**
 * Textfält för reflektioner och anteckningar (Screen 7)
 */
export function ReflectionInput({
  value,
  onChange,
  placeholder = 'Vad har fungerat bra? Vad vill du utveckla?',
  label = 'Dina reflektioner',
  rows = 4,
  maxLength = 500,
  className = '',
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-xs font-semibold text-equestrian-dark mb-1.5 uppercase tracking-wide">
          {label}
        </label>
      )}
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          className="w-full bg-white border border-[#E0DCD4] rounded-2xl p-3.5 text-sm text-equestrian-dark placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-equestrian-dark/20 focus:border-equestrian-dark transition-all resize-none shadow-xs"
        />
        <div className="absolute bottom-2.5 right-3 text-[10px] text-neutral-400">
          {value.length}/{maxLength}
        </div>
      </div>
    </div>
  );
}

