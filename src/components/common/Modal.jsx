import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Universell modal / bottom-sheet för dialoger och formulär
 */
export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-md',
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Klick på backdrop stänger */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal-innehåll: animeras upp som bottom-sheet i mobil, modal på tablet/desktop */}
      <div
        className={`relative z-10 w-full ${maxWidth} bg-[#FBF9F5] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#E5E1D8] max-h-[90vh] overflow-hidden flex flex-col`}
      >
        {/* Drag handtag för mobil */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 bg-neutral-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ECE7DF]">
          <div>
            {title && <h3 className="font-semibold text-lg text-equestrian-dark">{title}</h3>}
            {subtitle && <p className="text-xs text-neutral-500 mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-200/60 text-neutral-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

