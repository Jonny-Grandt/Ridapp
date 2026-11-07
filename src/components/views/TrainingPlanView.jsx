import React from 'react';
import { Target, Calendar as CalendarIcon, TrendingUp, ChevronRight } from 'lucide-react';
import { useWorkout } from '../../context/WorkoutContext';
import { HorseCycleBadge } from '../../assets/horseGraphics';
import { IMAGES } from '../../assets/images';
import { Header } from '../layout/Header';

/**
 * Min träningsplan (Screen 3 i designskiss)
 */
export function TrainingPlanView({ onNavigate }) {
  const { cycle, selectedGoals } = useWorkout();

  return (
    <div className="flex-1 flex flex-col bg-[#F7F5F0]">
      {/* Header */}
      <Header
        title="Min träningsplan"
        showBack={true}
        onBack={() => onNavigate('home')}
        rightAction="none"
      />

      <div className="px-5 pt-3 pb-6 flex-1 flex flex-col">
        {/* Huvudkort för 4-veckorscykeln (Screen 3 överst) */}
        <div className="bg-white rounded-3xl p-5 border border-[#EAE5DC] shadow-sm mb-6">
          <div className="flex items-center gap-4 mb-5">
            {/* Cirkulär badge med minimalistiskt hästhuvud */}
            <HorseCycleBadge className="w-18 h-18 shrink-0" />

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-bold text-equestrian-dark truncate">
                  {cycle.title || '4 veckors cykel'}
                </h3>
                <span className="text-[11px] font-semibold bg-[#2F4132] text-white px-2.5 py-0.5 rounded-full shrink-0">
                  {cycle.status === 'completed' ? 'Slutförd' : 'Aktiv'}
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                {cycle.periodLabel || 'Vecka 1–4 • 29 okt - 25 nov'}
              </p>
            </div>
          </div>

          {/* Stegvis cykelförlopp (v.1-3 Arbete -> v.4 Återhämtning -> Utvärdering) */}
          <div className="relative pt-2 pb-1 border-t border-[#F0ECE4]">
            <div className="flex items-center justify-between text-center relative z-10">
              {/* Steg 1: v.1-3 Arbete */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-3.5 h-3.5 rounded-full bg-[#2F4132] ring-4 ring-[#E5ECE5] mb-1.5" />
                <span className="text-[11px] font-bold text-equestrian-dark leading-tight">
                  v.1–3
                </span>
                <span className="text-[10px] text-neutral-500">Arbete</span>
              </div>

              {/* Steg 2: v.4 Återhämtning */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-3.5 h-3.5 rounded-full bg-[#DDD6CB] mb-1.5" />
                <span className="text-[11px] font-medium text-neutral-600 leading-tight">
                  v.4
                </span>
                <span className="text-[10px] text-neutral-400">Återhämtning</span>
              </div>

              {/* Steg 3: Utvärdering */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-3.5 h-3.5 rounded-full bg-[#DDD6CB] mb-1.5" />
                <span className="text-[11px] font-medium text-neutral-600 leading-tight">
                  Slut
                </span>
                <span className="text-[10px] text-neutral-400">Utvärdering</span>
              </div>
            </div>

            {/* Linje mellan stegen */}
            <div className="absolute top-[15px] left-10 right-10 h-0.5 bg-[#E8E2D7] -z-0" />
          </div>
        </div>

        {/* Sektion: Din plan i korthet */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-equestrian-dark mb-3">
            Din plan i korthet
          </h4>

          <div className="space-y-3">
            {/* Punkt 1 */}
            <div
              onClick={() => onNavigate('goals')}
              className="bg-white rounded-2xl p-3.5 border border-[#EAE5DC] flex items-center justify-between cursor-pointer hover:border-neutral-300 transition-all shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EBF1EB] flex items-center justify-center text-[#2F4132]">
                  <Target className="w-4 h-4 stroke-[2]" />
                </div>
                <span className="text-xs font-semibold text-equestrian-dark">
                  Fokusera på dina {selectedGoals.length || 3} mål
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </div>

            {/* Punkt 2 */}
            <div
              onClick={() => onNavigate('schedule')}
              className="bg-white rounded-2xl p-3.5 border border-[#EAE5DC] flex items-center justify-between cursor-pointer hover:border-neutral-300 transition-all shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#946F3D]">
                  <CalendarIcon className="w-4 h-4 stroke-[2]" />
                </div>
                <span className="text-xs font-semibold text-equestrian-dark">
                  Följ träningsschemat
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </div>

            {/* Punkt 3 */}
            <div
              onClick={() => onNavigate('progress')}
              className="bg-white rounded-2xl p-3.5 border border-[#EAE5DC] flex items-center justify-between cursor-pointer hover:border-neutral-300 transition-all shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EBF1EB] flex items-center justify-center text-[#2F4132]">
                  <TrendingUp className="w-4 h-4 stroke-[2]" />
                </div>
                <span className="text-xs font-semibold text-equestrian-dark">
                  Utvärdera och reflektera
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </div>
          </div>
        </div>

        {/* Bildkort i botten (Screen 3) */}
        <div
          onClick={() => onNavigate('schedule')}
          className="relative h-28 rounded-2xl overflow-hidden cursor-pointer shadow-sm group border border-[#E0DCD4]"
        >
          <img
            src={IMAGES.horsePortrait}
            alt="Häst i träning"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-3.5">
            <div className="flex items-center justify-between w-full text-white">
              <span className="text-xs font-semibold">Öppna träningsschemat</span>
              <span className="text-[11px] bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full font-medium">
                Se alla pass →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

