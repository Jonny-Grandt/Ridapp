import React, { useState } from 'react';
import { Calendar, Clock, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useWorkout } from '../../context/WorkoutContext';
import { ProgressBar } from '../common/ProgressBar';
import { StatCard } from '../cards/StatCard';
import { Header } from '../layout/Header';
import { Button } from '../common/Button';

/**
 * Min utveckling & statistik (Screen 6 i designskiss)
 */
export function ProgressView({ onNavigate }) {
  const { selectedGoals, stats, workouts } = useWorkout();
  const [activeSubTab, setActiveSubTab] = useState('oversikt'); // 'oversikt' | 'mal' | 'traning'

  // Räkna dynamiskt från verkliga data om pass har bockats av
  const completedCount = workouts.filter(w => w.completed).length;
  const displayPasses = Math.max(stats.totalWorkouts, completedCount);

  return (
    <div className="flex-1 flex flex-col bg-[#F7F5F0]">
      {/* Header */}
      <Header
        title="Min utveckling"
        showBack={true}
        onBack={() => onNavigate('home')}
        rightAction="none"
      />

      <div className="px-5 pt-2 pb-6 flex-1 flex flex-col">
        {/* Sub-tab pills (Översikt, Mål, Träning) */}
        <div className="flex items-center justify-between bg-white rounded-2xl p-1 border border-[#EAE5DC] mb-5 shadow-xs">
          {[
            { id: 'oversikt', label: 'Översikt' },
            { id: 'mal', label: 'Mål' },
            { id: 'traning', label: 'Träning' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                activeSubTab === tab.id
                  ? 'bg-equestrian-dark text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sektion: Mina mål - denna period */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-equestrian-dark mb-3">
            Mina mål – denna period
          </h3>

          <div className="space-y-3.5 bg-white p-4 rounded-3xl border border-[#EAE5DC] shadow-xs">
            {selectedGoals.map((goal, idx) => {
              // Standardvärden från designskissen: 80%, 70%, 60%
              const progressVal = goal.progress || (80 - idx * 10);

              return (
                <div key={goal.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-semibold text-equestrian-dark truncate pr-2">
                      <div className="w-4 h-4 rounded-full bg-[#E5ECE5] text-[#2F4132] flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="truncate">{goal.title}</span>
                    </div>
                    <span className="text-xs font-bold text-equestrian-dark shrink-0">
                      {progressVal}%
                    </span>
                  </div>

                  <ProgressBar
                    value={progressVal}
                    color="bg-equestrian-dark"
                    height="h-2"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Sektion: Träningsstatistik (3 StatCards i rad + trendkurva) */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-equestrian-dark mb-3">
            Träningsstatistik
          </h3>

          {/* 3 kort i bredd */}
          <div className="grid grid-cols-3 gap-2.5 mb-4">
            <StatCard
              icon={Calendar}
              value={`${displayPasses}`}
              label="pass"
            />
            <StatCard
              icon={Clock}
              value={`${stats.totalHours} h`}
              label="träning"
            />
            <StatCard
              icon={Star}
              value={`${stats.averageRating}`}
              label="snittbetyg"
            />
          </div>

          {/* Visuell progressionskurva (som syns under statistikkorten i Screen 6) */}
          <div className="bg-white p-4 rounded-2xl border border-[#EAE5DC] shadow-xs">
            <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-400 mb-2">
              <span>PROGRESSION ÖVER TID</span>
              <span className="text-[#2F4132] font-bold">+24% förbättring</span>
            </div>

            {/* SVG Trendkurva */}
            <div className="h-20 w-full relative">
              <svg viewBox="0 0 300 70" className="w-full h-full overflow-visible">
                {/* Bakgrundsgridlinjer */}
                <line x1="0" y1="15" x2="300" y2="15" stroke="#F0ECE4" strokeDasharray="3 3" />
                <line x1="0" y1="40" x2="300" y2="40" stroke="#F0ECE4" strokeDasharray="3 3" />
                <line x1="0" y1="65" x2="300" y2="65" stroke="#F0ECE4" strokeDasharray="3 3" />

                {/* Kurva */}
                <path
                  d="M 20 52 C 80 48, 120 40, 180 28 C 230 18, 270 12, 280 10"
                  fill="none"
                  stroke="#2F4132"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Punkter med datavärden */}
                {[
                  { cx: 20, cy: 52, label: 'v.1' },
                  { cx: 105, cy: 45, label: 'v.2' },
                  { cx: 195, cy: 26, label: 'v.3' },
                  { cx: 280, cy: 10, label: 'v.4' },
                ].map((pt, i) => (
                  <g key={i}>
                    <circle cx={pt.cx} cy={pt.cy} r="4" fill="#2F4132" stroke="#FFFFFF" strokeWidth="2" />
                    <text x={pt.cx} y="68" textAnchor="middle" fontSize="9" fill="#8C938B" fontWeight="600">
                      {pt.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>

        {/* Handlingsknapp för utvärdering */}
        <div className="mt-auto">
          <Button
            variant="primary"
            fullWidth
            onClick={() => onNavigate('evaluation')}
            icon={ArrowRight}
            iconPosition="right"
            className="shadow-md"
          >
            Gör 4-veckorsutvärdering
          </Button>
        </div>
      </div>
    </div>
  );
}

