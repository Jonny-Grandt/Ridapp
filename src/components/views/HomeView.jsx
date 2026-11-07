import React from 'react';
import { ArrowRight, Bell, Calendar, Award } from 'lucide-react';
import { useWorkout } from '../../context/WorkoutContext';
import { useAuth } from '../../context/AuthContext';
import { NextPassCard } from '../cards/NextPassCard';
import { IMAGES } from '../../assets/images';
import { Header } from '../layout/Header';

/**
 * Hemvy (Screen 1 i designskiss)
 * - Alla 4 hörn är rundade på hero-kortet
 * - Skarp notisklocka med hög kontrast
 */
export function HomeView({ onNavigate, onOpenMenu }) {
  const { nextPass, setActiveWorkoutId } = useWorkout();
  const { activeHorse } = useAuth();

  const handleNextPassClick = () => {
    if (nextPass) {
      setActiveWorkoutId(nextPass.id);
      onNavigate('detail');
    } else {
      onNavigate('schedule');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F7F5F0]">
      {/* Header med skarp statusrad, notisklocka och hamburgermeny */}
      <Header
        transparent={false}
        showBack={false}
        rightAction="bell"
        onRightAction={() => alert('Du har inga nya notiser.')}
        onOpenMenu={onOpenMenu}
        showMenuButton={true}
      />

      <div className="px-4 pt-2 pb-6 flex-1 flex flex-col">
        {/* Hero-kort med ALLA FYRA HÖRN RUNDADE */}
        <div className="relative w-full h-[430px] sm:h-[460px] overflow-hidden rounded-[32px] sm:rounded-[36px] shadow-lg border border-[#E0D9CD] shrink-0">
          {/* Bakgrundsbild */}
          <img
            src={IMAGES.heroJumping}
            alt="Hästhoppning träning"
            className="w-full h-full object-cover object-center transform scale-105"
          />

          {/* Mörkgrön gradientoverlay som skapar fantastisk kontrast och djup */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A261D] via-[#243326]/65 to-[#1A261D]/30" />

          {/* Hero-innehåll */}
          <div className="absolute inset-0 px-6 py-6 flex flex-col justify-end text-white">
            <div className="mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#E3BE86] bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/15">
                Träningspartner för {activeHorse?.name || 'din häst'}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#FAF7F2] leading-tight mb-2">
              Planera.<br />
              Träna.<br />
              Utvecklas.
            </h2>

            <p className="text-xs sm:text-sm text-[#E2DDD5] leading-relaxed max-w-[280px] mb-5 opacity-95">
              Sätt dina mål, följ din plan och se din utveckling – tillsammans med din häst.
            </p>

            <div>
              <button
                onClick={() => onNavigate('plan')}
                className="inline-flex items-center gap-2 bg-[#FAF7F2] hover:bg-white text-equestrian-dark font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md transition-all active:scale-[0.98]"
              >
                <span>Min träningsplan</span>
                <ArrowRight className="w-4 h-4 stroke-[2.2]" />
              </button>
            </div>
          </div>
        </div>

        {/* Undre sektion med "Nästa pass" widget */}
        <div className="pt-4 flex-1 flex flex-col justify-start">
          <NextPassCard
            workout={nextPass}
            onClick={handleNextPassClick}
          />

          {/* Snabblänkar */}
          <div className="mt-3.5 grid grid-cols-2 gap-3">
            <button
              onClick={() => onNavigate('goals')}
              className="bg-white p-3.5 rounded-2xl border border-[#EAE5DC] hover:border-neutral-300 text-left transition-all shadow-xs flex items-center gap-3 active:scale-[0.99]"
            >
              <div className="w-9 h-9 rounded-xl bg-[#EBF1EB] flex items-center justify-center text-equestrian-dark shrink-0">
                <Award className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-equestrian-dark truncate">Mina 3 mål</p>
                <p className="text-[11px] text-neutral-500 truncate">Se fokusområden</p>
              </div>
            </button>

            <button
              onClick={() => onNavigate('schedule')}
              className="bg-white p-3.5 rounded-2xl border border-[#EAE5DC] hover:border-neutral-300 text-left transition-all shadow-xs flex items-center gap-3 active:scale-[0.99]"
            >
              <div className="w-9 h-9 rounded-xl bg-[#F4EFE6] flex items-center justify-center text-[#946F3D] shrink-0">
                <Calendar className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-equestrian-dark truncate">Träningsschema</p>
                <p className="text-[11px] text-neutral-500 truncate">Se alla pass</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
