import React, { useState } from 'react';
import { Smartphone, Monitor, RotateCcw, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWorkout } from '../../context/WorkoutContext';
import { Sidebar } from './Sidebar';

/**
 * PageContainer ger stöd för:
 * 1. Mobile-First Phone Frame (som återskapar designskissens exakta mobilupplevelse)
 * 2. Fullskärm / Desktop Responsive Mode med Sidebar
 * 3. Snabb switch mellan användare och hästar
 */
export function PageContainer({
  children,
  currentView,
  onNavigate,
}) {
  const [isMobileFrame, setIsMobileFrame] = useState(true);
  const { currentUser, activeHorse, allUsers, switchUser, switchHorse } = useAuth();
  const { resetToDefault } = useWorkout();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="min-h-screen bg-[#E5DFD5] text-[#222421] flex flex-col items-center">
      {/* Kommersiell Demo-kontrollpanel i toppen */}
      <aside className="w-full bg-[#263428] text-white/90 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 shadow-sm z-40 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="font-semibold tracking-wide uppercase text-[10px] bg-white/15 px-2 py-0.5 rounded text-white flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#A9834F]" /> Ridträning v1.0
          </span>
          <span className="hidden sm:inline text-white/60">|</span>
          <span className="font-medium text-white/80">
            Aktiv häst: <strong className="text-white underline decoration-[#A9834F]">{activeHorse?.name}</strong> ({currentUser?.name})
          </span>
        </div>

        {/* Vy-snabbväljare för snabb presentation av alla skisser */}
        <div className="hidden lg:flex items-center gap-1 bg-white/10 px-1.5 py-1 rounded-full text-[11px]">
          <span className="text-white/50 px-1">Skiss-vyer:</span>
          {[
            { id: 'home', label: '1. Hem' },
            { id: 'goals', label: '2. Mål' },
            { id: 'plan', label: '3. Plan' },
            { id: 'schedule', label: '4. Schema' },
            { id: 'detail', label: '5. Passdetalj' },
            { id: 'progress', label: '6. Utveckling' },
            { id: 'evaluation', label: '7. Utvärdera' },
            { id: 'completed', label: '8. Avslutad' },
            { id: 'upcoming', label: '9. Kommande' },
          ].map((v) => (
            <button
              key={v.id}
              onClick={() => onNavigate(v.id)}
              className={`px-2 py-0.5 rounded-full transition-colors ${
                currentView === v.id
                  ? 'bg-white text-[#263428] font-bold shadow-xs'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Kontroller: Byt enhet, Byt användare, Återställ */}
        <div className="flex items-center gap-2">
          {/* Användarväxlare */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>Byt konto / häst</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-1.5 w-60 bg-white text-neutral-800 rounded-xl shadow-xl border border-neutral-200 p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-2 py-1 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                  Testanvändare
                </div>
                {allUsers.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      switchUser(u.id);
                      setShowUserMenu(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      currentUser.id === u.id ? 'bg-[#EBF1EB] text-[#263428] font-bold' : 'hover:bg-neutral-100'
                    }`}
                  >
                    <div>
                      <p>{u.name}</p>
                      <p className="text-[10px] text-neutral-500 font-normal">{u.role}</p>
                    </div>
                    {currentUser.id === u.id && <span className="text-[10px] text-[#2F4132]">Aktiv</span>}
                  </button>
                ))}

                <div className="border-t border-neutral-100 my-1 pt-1">
                  <div className="px-2 py-1 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    Byt häst ({currentUser.name})
                  </div>
                  {currentUser.horses.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => {
                        switchHorse(h.id);
                        setShowUserMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                        activeHorse?.id === h.id ? 'bg-[#EBF1EB] text-[#263428] font-bold' : 'hover:bg-neutral-100'
                      }`}
                    >
                      <span>{h.name}</span>
                      <span className="text-[10px] text-neutral-500">{h.discipline}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Återställ mockdata */}
          <button
            onClick={() => {
              if (window.confirm('Vill du återställa alla pass och mål till standardläget?')) {
                resetToDefault();
              }
            }}
            title="Återställ testdata"
            className="p-1.5 bg-white/10 hover:bg-white/20 rounded-md text-white/80 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Toggle mobilram vs responsive */}
          <button
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            title={isMobileFrame ? 'Växla till responsiv desktop-vy' : 'Växla till mobil enhetsram'}
            className="flex items-center gap-1 bg-[#A9834F] hover:bg-[#967444] text-white px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors"
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Desktopvy</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mobilram</span>
              </>
            )}
          </button>
        </div>
      </aside>

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
          /* Responsiv vy med valbar Sidebar för desktop / tablet */
          <div className="w-full max-w-5xl bg-[#F7F5F0] min-h-screen sm:min-h-[850px] sm:rounded-3xl sm:border border-neutral-300 shadow-2xl flex flex-row overflow-hidden">
            <Sidebar currentView={currentView} onNavigate={onNavigate} />
            <div className="flex-1 flex flex-col overflow-y-auto bg-[#F7F5F0]">
              {children}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
