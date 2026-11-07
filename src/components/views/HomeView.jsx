import React from 'react';
import { ArrowRight, Bell, Calendar, Award } from 'lucide-react';
import { useWorkout } from '../../context/WorkoutContext';
import { useAuth } from '../../context/AuthContext';
import { NextPassCard } from '../cards/NextPassCard';
import { IMAGES } from '../../assets/images';
import { Header } from '../layout/Header';

/**
 * Hemvy (Screen 1 i designskiss)
 */
export function HomeView({ onNavigate }) {
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
      {/* Header med statusrad och notisklocka */}
      <Header
        transparent={true}
        showBack={false}
        rightAction="bell"
        onRightAction={() => alert('Du har inga nya notiser.')}
        className="absolute top-0 left-0 right-0 z-30"
      />

      {/* Hero-sektion med mörkgrön overlay och hopphäst (Screen 1) */}
      <div className="relative w-full h-[470px] sm:h-[490px] overflow-hidden rounded-b-[36px] shadow-lg">
        {/* Bakgrundsbild */}
        <img
          src={IMAGES.heroJumping}
          alt="Hästhoppning träning"
          className="w-full h-full object-cover object-center transform scale-105"
        />

        {/* Mörkgrön elegant gradientoverlay som matchar skissen */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F2C21] via-[#263428]/70 to-[#1F2C21]/40" />

        {/* Hero-innehåll */}
        <div className="absolute inset-0 px-6 pt-24 pb-8 flex flex-col justify-end text-white">
          <div className="mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C89D66] bg-black/30 px-3 py-1 rounded-full backdrop-blur-xs border border-white/10">
              Träningspartner för {activeHorse?.name || 'din häst'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#FAF7F2] leading-tight mb-2">
            Planera.<br />
            Träna.<br />
            Utvecklas.
          </h2>

          <p className="text-sm text-[#E2DDD5] leading-relaxed max-w-[280px] mb-6 opacity-95">
            Sätt dina mål, följ din plan och se din utveckling – tillsammans med din häst.
          </p>

          <div>
            <button
              onClick={() => onNavigate('plan')}
              className="inline-flex items-center gap-2 bg-[#FAF7F2] hover:bg-white text-equestrian-dark font-semibold text-sm px-5 py-2.5 rounded-full shadow-md transition-all active:scale-[0.98]"
            >
              <span>Min träningsplan</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </div>

      {/* Undre sektion med "Nästa pass" widget */}
      <div className="px-5 py-6 flex-1 flex flex-col justify-start">
        <NextPassCard
          workout={nextPass}
          onClick={handleNextPassClick}
        />

        {/* Snabblänkar för snabb navigering */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={() => onNavigate('goals')}
            className="bg-white p-3.5 rounded-2xl border border-[#EAE5DC] hover:border-neutral-300 text-left transition-all shadow-xs flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-[#EBF1EB] flex items-center justify-center text-equestrian-dark">
              <Award className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div>
              <p className="text-xs font-bold text-equestrian-dark">Mina 3 mål</p>
              <p className="text-[11px] text-neutral-500">Se fokusområden</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('schedule')}
            className="bg-white p-3.5 rounded-2xl border border-[#EAE5DC] hover:border-neutral-300 text-left transition-all shadow-xs flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-[#F4EFE6] flex items-center justify-center text-[#946F3D]">
              <Calendar className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div>
              <p className="text-xs font-bold text-equestrian-dark">Träningsschema</p>
              <p className="text-[11px] text-neutral-500">Se alla veckans pass</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

