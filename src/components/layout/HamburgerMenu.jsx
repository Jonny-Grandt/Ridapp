import React from 'react';
import { X, Smartphone, Monitor, User, RotateCcw, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWorkout } from '../../context/WorkoutContext';
import { HorseHeadLineArt } from '../../assets/horseGraphics';

/**
 * Rymlig och touch-vänlig Hamburgermeny för mobil & desktop.
 * Löser problemet med avklippta kontonamn och samlar alla inställningar snyggt.
 */
export function HamburgerMenu({
  isOpen,
  onClose,
  isMobileFrame,
  onToggleFrame,
  currentView,
  onNavigate,
}) {
  const { currentUser, activeHorse, allUsers, switchUser, switchHorse } = useAuth();
  const { resetToDefault } = useWorkout();

  if (!isOpen) return null;

  const views = [
    { id: 'home', label: '1. Hem' },
    { id: 'goals', label: '2. Mål (3 fokusområden)' },
    { id: 'plan', label: '3. Min träningsplan' },
    { id: 'schedule', label: '4. Träningsschema' },
    { id: 'detail', label: '5. Passdetaljer' },
    { id: 'progress', label: '6. Min utveckling' },
    { id: 'evaluation', label: '7. Utvärdering (4 veckor)' },
    { id: 'completed', label: '8. Cykel avslutad' },
    { id: 'upcoming', label: '9. Kommande period' },
    { id: 'community', label: 'Community' },
    { id: 'kurser', label: 'Kurser & Video' },
    { id: 'profil', label: 'Profil & Hästar' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
      {/* Bakgrunds-backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Menypanel (slide-in från höger) */}
      <div className="relative z-10 w-full max-w-sm bg-[#FAF8F5] h-full shadow-2xl flex flex-col border-l border-[#E5E0D5] overflow-hidden">
        {/* Header */}
        <div className="bg-[#263428] text-white px-5 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
              <HorseHeadLineArt className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide">Ridträning Menyn</h3>
              <p className="text-[10px] text-white/70">Inställningar & Vyer</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 active:scale-95 text-white transition-colors"
            aria-label="Stäng meny"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollbart innehåll */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* SEKTION 1: Välj vy mellan Desktop & Mobil */}
          <div>
            <label className="block text-xs font-bold text-equestrian-dark uppercase tracking-wider mb-2">
              Visningsläge
            </label>
            <div className="grid grid-cols-2 gap-2 bg-[#EFEBE4] p-1.5 rounded-2xl border border-[#DFD9CE]">
              <button
                type="button"
                onClick={() => {
                  if (!isMobileFrame) onToggleFrame();
                }}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                  isMobileFrame
                    ? 'bg-white text-equestrian-dark shadow-sm'
                    : 'text-neutral-600 hover:text-equestrian-dark'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Mobilvy</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (isMobileFrame) onToggleFrame();
                }}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                  !isMobileFrame
                    ? 'bg-white text-equestrian-dark shadow-sm'
                    : 'text-neutral-600 hover:text-equestrian-dark'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span>Desktopvy</span>
              </button>
            </div>
          </div>

          {/* SEKTION 2: Byt konto / användare (Rymliga kort där inget klipps) */}
          <div>
            <label className="block text-xs font-bold text-equestrian-dark uppercase tracking-wider mb-2">
              Byt användarkonto
            </label>
            <div className="space-y-2">
              {allUsers.map((user) => {
                const isActive = currentUser.id === user.id;
                return (
                  <button
                    key={user.id}
                    onClick={() => {
                      switchUser(user.id);
                    }}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-[#EBF1EB] border-equestrian-dark ring-2 ring-equestrian-dark/15 shadow-xs'
                        : 'bg-white border-[#E5E0D5] hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-neutral-200 shrink-0">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-equestrian-dark truncate">
                          {user.name}
                        </p>
                        <p className="text-[11px] text-neutral-500 truncate">
                          {user.role}
                        </p>
                        <p className="text-[10px] text-neutral-400 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    {isActive ? (
                      <span className="shrink-0 bg-equestrian-dark text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check className="w-3 h-3 stroke-[3]" /> Aktiv
                      </span>
                    ) : (
                      <span className="shrink-0 text-xs text-neutral-400 font-medium">
                        Välj
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SEKTION 3: Byt häst för aktiv användare */}
          <div>
            <label className="block text-xs font-bold text-equestrian-dark uppercase tracking-wider mb-2">
              Träningshäst ({currentUser.name})
            </label>
            <div className="space-y-2">
              {currentUser.horses.map((horse) => {
                const isCurrentHorse = activeHorse?.id === horse.id;
                return (
                  <button
                    key={horse.id}
                    onClick={() => {
                      switchHorse(horse.id);
                    }}
                    className={`w-full text-left p-2.5 rounded-2xl border transition-all flex items-center justify-between ${
                      isCurrentHorse
                        ? 'bg-[#F2ECE1] border-[#A9834F] font-bold text-equestrian-dark shadow-xs'
                        : 'bg-white border-[#E5E0D5] text-neutral-700 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-neutral-200 shrink-0">
                        <img src={horse.image} alt={horse.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-equestrian-dark truncate">{horse.name}</p>
                        <p className="text-[10px] text-neutral-500 truncate">{horse.discipline}</p>
                      </div>
                    </div>
                    {isCurrentHorse && (
                      <span className="text-[10px] bg-[#A9834F] text-white font-bold px-2 py-0.5 rounded-full">
                        Vald
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SEKTION 4: Snabbhopp till designskiss-vyer */}
          <div>
            <label className="block text-xs font-bold text-equestrian-dark uppercase tracking-wider mb-2">
              Snabbnavigering till skisser
            </label>
            <div className="grid grid-cols-1 gap-1.5 bg-white p-2.5 rounded-2xl border border-[#E5E0D5]">
              {views.map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    onNavigate(v.id);
                    onClose();
                  }}
                  className={`text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-center justify-between ${
                    currentView === v.id
                      ? 'bg-[#EBF1EB] text-equestrian-dark font-bold'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <span>{v.label}</span>
                  {currentView === v.id && (
                    <span className="w-2 h-2 rounded-full bg-equestrian-dark" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* SEKTION 5: Återställning */}
          <div className="pt-2">
            <button
              onClick={() => {
                if (window.confirm('Vill du återställa alla pass och mål till standardläget?')) {
                  resetToDefault();
                  alert('Data har återställts till standard.');
                  onClose();
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border border-red-200 text-red-700 bg-red-50/50 hover:bg-red-100 text-xs font-semibold transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Återställ all testdata till ursprung</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

