import React from 'react';
import { User, ShieldCheck, Heart, Award, CheckCircle, Database, RefreshCw } from 'lucide-react';
import { Header } from '../layout/Header';
import { useAuth } from '../../context/AuthContext';
import { useWorkout } from '../../context/WorkoutContext';
import { Button } from '../common/Button';
import { IMAGES } from '../../assets/images';

export function ProfileView({ onNavigate }) {
  const { currentUser, activeHorse, allUsers, switchUser, switchHorse } = useAuth();
  const { stats, resetToDefault } = useWorkout();

  return (
    <div className="flex-1 flex flex-col bg-[#F7F5F0]">
      <Header title="Ryttare & Hästprofil" showBack={false} rightAction="bell" />

      <div className="px-5 pt-3 pb-8 space-y-5">
        {/* Ryttarkort */}
        <div className="bg-white rounded-3xl p-5 border border-[#EAE5DC] shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#E8ECE6] shrink-0 border-2 border-white shadow-xs">
            <img src={currentUser.avatar || IMAGES.riderAvatar} alt={currentUser.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-bold text-equestrian-dark truncate">{currentUser.name}</h3>
              <ShieldCheck className="w-4 h-4 text-[#2F4132] shrink-0" />
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">{currentUser.role}</p>
            <p className="text-[11px] text-neutral-400 truncate">{currentUser.email}</p>
          </div>
        </div>

        {/* Hästprofil */}
        <div className="bg-white rounded-3xl p-5 border border-[#EAE5DC] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Aktiv Häst
            </h4>
            <span className="text-[10px] bg-[#EBF1EB] text-[#2F4132] font-semibold px-2 py-0.5 rounded-full">
              Primär träningshäst
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#E8ECE6] shrink-0">
              <img src={activeHorse?.image || IMAGES.horsePortrait} alt={activeHorse?.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="text-base font-bold text-equestrian-dark">{activeHorse?.name}</h4>
              <p className="text-xs text-neutral-500">{activeHorse?.breed} • Född {activeHorse?.birthYear || 2016}</p>
              <p className="text-[11px] text-[#A9834F] font-medium mt-0.5">{activeHorse?.discipline}</p>
            </div>
          </div>

          {/* Byt häst om ryttaren har flera hästar */}
          {currentUser.horses.length > 1 && (
            <div className="pt-2 border-t border-neutral-100">
              <span className="text-[11px] font-semibold text-neutral-500 block mb-2">Välj träningshäst:</span>
              <div className="flex gap-2">
                {currentUser.horses.map((horse) => (
                  <button
                    key={horse.id}
                    onClick={() => switchHorse(horse.id)}
                    className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                      activeHorse?.id === horse.id
                        ? 'bg-equestrian-dark text-white border-equestrian-dark font-semibold'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    {horse.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Backend / Datamodell Info för fleranvändare (som specificerades i krav 4) */}
        <div className="bg-[#FAF7F0] rounded-3xl p-4 border border-[#E5DECF] space-y-2 text-xs">
          <div className="flex items-center gap-2 text-equestrian-dark font-bold">
            <Database className="w-4 h-4 text-[#A9834F]" />
            <span>Multi-User & Backend Redo</span>
          </div>
          <p className="text-neutral-600 leading-relaxed text-[11px]">
            Alla mål, pass och utvärderingar är strikt kopplade till:
          </p>
          <div className="bg-white/80 p-2 rounded-xl font-mono text-[10px] text-neutral-700 border border-[#E5DECF]">
            userId: "{currentUser.id}" | horseId: "{activeHorse?.id}"
          </div>
          <p className="text-neutral-500 text-[10px]">
            Förberedd för direkt integration med Firebase Firestore eller Supabase Row Level Security.
          </p>
        </div>

        {/* Återställningsknapp */}
        <div className="pt-2">
          <Button
            variant="outline"
            fullWidth
            size="md"
            icon={RefreshCw}
            onClick={() => {
              if (window.confirm('Vill du återställa appens testdata till ursprungsläget?')) {
                resetToDefault();
                alert('Testdata har återställts!');
              }
            }}
          >
            Återställ demo-data
          </Button>
        </div>
      </div>
    </div>
  );
}

