import React from 'react';
import { ChevronLeft, Bell, Bookmark, X, Wifi, Battery, Signal } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/**
 * Top App Bar med mobil statusrad och kontextuella åtgärder
 */
export function Header({
  title,
  showBack = false,
  onBack,
  rightAction = 'bell', // 'bell' | 'bookmark' | 'close' | 'none'
  onRightAction,
  transparent = false,
  showStatusBar = true,
  className = '',
}) {
  const { activeHorse } = useAuth();

  return (
    <header className={`${transparent ? 'bg-transparent text-white' : 'bg-[#FBF9F5] text-equestrian-dark border-b border-[#EAE5DC]'} sticky top-0 z-20 ${className}`}>
      {/* Simulerad iOS statusrad för äkta mobilkänsla */}
      {showStatusBar && (
        <div className="flex justify-between items-center px-6 pt-2 pb-1 text-[11px] font-semibold tracking-tighter opacity-80 select-none">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>
      )}

      {/* Navigationsrad */}
      <div className="flex items-center justify-between px-4 py-2.5 min-h-[48px]">
        <div className="w-10 flex items-center">
          {showBack && (
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-full hover:bg-black/10 active:scale-95 transition-all text-current"
              aria-label="Gå tillbaka"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
            </button>
          )}
        </div>

        {title && (
          <h1 className="text-base font-semibold tracking-tight text-center truncate px-2">
            {title}
          </h1>
        )}

        <div className="w-10 flex items-center justify-end">
          {rightAction === 'bell' && (
            <button
              onClick={onRightAction}
              className="relative p-2 -mr-2 rounded-full hover:bg-black/10 transition-all text-current"
              aria-label="Notiser"
            >
              <Bell className="w-5 h-5 stroke-[1.8]" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>
          )}

          {rightAction === 'bookmark' && (
            <button
              onClick={onRightAction}
              className="p-2 -mr-2 rounded-full hover:bg-black/10 transition-all text-current"
              aria-label="Bokmärk pass"
            >
              <Bookmark className="w-5 h-5 stroke-[1.8]" />
            </button>
          )}

          {rightAction === 'close' && (
            <button
              onClick={onRightAction || onBack}
              className="p-2 -mr-2 rounded-full hover:bg-black/10 transition-all text-current"
              aria-label="Stäng"
            >
              <X className="w-5 h-5 stroke-[2]" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

