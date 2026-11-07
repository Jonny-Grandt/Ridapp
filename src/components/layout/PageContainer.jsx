import React, { useState, createContext, useContext } from 'react';
import { Menu, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Sidebar } from './Sidebar';
import { HamburgerMenu } from './HamburgerMenu';

const MenuContext = createContext({
  openMenu: () => {},
  closeMenu: () => {},
});

export function useMenu() {
  return useContext(MenuContext);
}

/**
 * PageContainer med:
 * 1. Mobile-First Phone Frame (återskapar designskissens mobila upplevelse)
 * 2. Fullskärm / Desktop Responsive Mode med Sidebar
 * 3. Ren Hamburger-meny som samlar vyval, kontobyte och inställningar utan avklippta texter
 */
export function PageContainer({
  children,
  currentView,
  onNavigate,
}) {
  const [isMobileFrame, setIsMobileFrame] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, activeHorse } = useAuth();

  const menuContextValue = {
    openMenu: () => setIsMenuOpen(true),
    closeMenu: () => setIsMenuOpen(false),
  };

  return (
    <MenuContext.Provider value={menuContextValue}>
      <div className="min-h-screen bg-[#E5DFD5] text-[#222421] flex flex-col items-center">
        {/* Stilren och kompakt topplist med Hamburgermeny */}
        <header className="w-full bg-[#263428] text-white px-4 py-2.5 text-xs flex items-center justify-between shadow-md z-30 border-b border-white/10">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-bold tracking-wider uppercase text-[10px] bg-white/15 px-2.5 py-1 rounded-lg text-white flex items-center gap-1.5 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C89D66]" /> Ridträning
            </span>
            <span className="text-white/40 hidden xs:inline">•</span>
            <span className="text-white/90 text-xs truncate font-medium">
              <strong className="text-white font-bold">{activeHorse?.name}</strong>{' '}
              <span className="text-white/60 hidden sm:inline">({currentUser?.name})</span>
            </span>
          </div>

          {/* Hamburgermeny-knapp (ersätter röriga knappar och löser avklippt konto-meny) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 active:scale-95 text-white px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-xs shrink-0 cursor-pointer"
            aria-label="Öppna meny"
          >
            <Menu className="w-4 h-4 stroke-[2.2]" />
            <span>Meny</span>
          </button>
        </header>

        {/* Rymlig Hamburgermeny (slide-in) */}
        <HamburgerMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          isMobileFrame={isMobileFrame}
          onToggleFrame={() => setIsMobileFrame(!isMobileFrame)}
          currentView={currentView}
          onNavigate={onNavigate}
        />

        {/* Huvudcontainer: Mobil-ram eller flytande responsiv vy */}
        <main className="w-full flex-1 flex justify-center py-0 sm:py-6 sm:px-4">
          {isMobileFrame ? (
            /* Realistisk mobilram (iPhone Pro format) */
            <div className="w-full sm:max-w-[412px] bg-[#F7F5F0] min-h-screen sm:min-h-[850px] sm:max-h-[880px] sm:rounded-[44px] sm:border-[8px] sm:border-[#1E2620] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] flex flex-col overflow-hidden relative">
              {/* Notch / Dynamic Island för desktop presentation */}
              <div className="hidden sm:block absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-4.5 bg-[#1E2620] rounded-full z-40 pointer-events-none" />

              {/* Skärminnehåll */}
              <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar relative bg-[#F7F5F0]">
                {children}
              </div>
            </div>
          ) : (
            /* Responsiv vy med Sidebar för desktop / tablet */
            <div className="w-full max-w-5xl bg-[#F7F5F0] min-h-screen sm:min-h-[850px] sm:rounded-3xl sm:border border-neutral-300 shadow-2xl flex flex-row overflow-hidden">
              <Sidebar currentView={currentView} onNavigate={onNavigate} />
              <div className="flex-1 flex flex-col overflow-y-auto bg-[#F7F5F0]">
                {children}
              </div>
            </div>
          )}
        </main>
      </div>
    </MenuContext.Provider>
  );
}
