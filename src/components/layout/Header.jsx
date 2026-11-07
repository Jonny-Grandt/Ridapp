import React from 'react';
import { ChevronLeft, Bell, Bookmark, X, Wifi, Battery, Signal, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useMenu } from './PageContainer';

/**
 * Top App Bar med mobil statusrad, tydlig notisklocka och hamburgermeny
 */
export function Header({
  title,
  showBack = false,
  onBack,
  rightAction = 'bell', // 'bell' | 'bookmark' | 'close' | 'none'
  onRightAction,
  showMenuButton = false,
  transparent = false,
  showStatusBar = true,
  className = '',
}) {
  const { activeHorse } = useAuth();
  const { openMenu } = useMenu();

  return (
    <header className={`${transparent ? 'bg-transparent text-equestrian-dark' : 'bg-[#FBF9F5] text-equestrian-dark border-b border-[#EAE5DC]'} sticky top-0 z-20 ${className}`}>
      {/* Simulerad iOS statusrad för äkta mobilkänsla - alltid skarp mörk text så den syns perfekt */}
      {showStatusBar && (
        <div className="flex justify-between items-center px-6 pt-2 pb-1 text-[11px] font-bold tracking-tight text-equestrian-dark select-none">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3.5 h-3.5 text-equestrian-dark" />
            <Wifi className="w-3.5 h-3.5 text-equestrian-dark" />
            <Battery className="w-4 h-4 text-equestrian-dark" />
          </div>
        </div>
      )}

      {/* Navigationsrad */}
      <div className="flex items-center justify-between px-4 py-2 min-h-[48px]">
        {/* Vänster sida: Tillbaka-knapp eller Hamburgermeny */}
        <div className="flex items-center gap-1 min-w-[40px]">
          {showBack ? (
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-full bg-white/80 hover:bg-white text-equestrian-dark border border-[#E5E0D5] shadow-xs active:scale-95 transition-all"
              aria-label="Gå tillbaka"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.4]" />
            </button>
          ) : showMenuButton ? (
            <button
              onClick={openMenu}
              className="p-2 -ml-2 rounded-full bg-white/90 hover:bg-white text-equestrian-dark border border-[#E5E0D5] shadow-xs active:scale-95 transition-all"
              aria-label="Öppna meny"
            >
              <Menu className="w-5 h-5 stroke-[2.2]" />
            </button>
          ) : null}
        </div>

        {/* Mitten: Titel */}
        {title ? (
          <h1 className="text-base font-bold tracking-tight text-equestrian-dark text-center truncate px-2">
            {title}
          </h1>
        ) : (
          <div className="flex-1" />
        )}

        {/* Höger sida: Notisklocka med hög kontrast eller bokmärke/stäng */}
        <div className="flex items-center justify-end gap-1.5 min-w-[40px]">
          {rightAction === 'bell' && (
            <button
              onClick={onRightAction}
              className="relative p-2 rounded-full bg-white text-equestrian-dark hover:bg-neutral-50 border border-[#DDD6CB] shadow-sm active:scale-95 transition-all group"
              aria-label="Notiser"
            >
              <Bell className="w-5 h-5 stroke-[2.4] text-[#263428] group-hover:scale-105 transition-transform" />
              {/* Notisprick med stark röd färg och tydlig vit kantring */}
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-600 rounded-full ring-2 ring-white" />
            </button>
          )}

          {rightAction === 'bookmark' && (
            <button
              onClick={onRightAction}
              className="p-2 rounded-full bg-white text-equestrian-dark hover:bg-neutral-50 border border-[#DDD6CB] shadow-sm active:scale-95 transition-all"
              aria-label="Bokmärk pass"
            >
              <Bookmark className="w-5 h-5 stroke-[2] text-[#263428]" />
            </button>
          )}

          {rightAction === 'close' && (
            <button
              onClick={onRightAction || onBack}
              className="p-2 rounded-full bg-white text-equestrian-dark hover:bg-neutral-50 border border-[#DDD6CB] shadow-sm active:scale-95 transition-all"
              aria-label="Stäng"
            >
              <X className="w-5 h-5 stroke-[2.4] text-[#263428]" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
