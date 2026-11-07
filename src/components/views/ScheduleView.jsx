import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';
import { useWorkout } from '../../context/WorkoutContext';
import { WorkoutCard } from '../cards/WorkoutCard';
import { Header } from '../layout/Header';

/**
 * Träningsschema (Screen 4 i designskiss)
 */
export function ScheduleView({ onNavigate }) {
  const { workouts, activeWorkoutId, setActiveWorkoutId, toggleWorkoutCompleted } = useWorkout();
  const [selectedDayIndex, setSelectedDayIndex] = useState(2); // Standard: Ons 26 / Ons 29

  const daysRow = [
    { name: 'Mån', date: 24 },
    { name: 'Tis', date: 25 },
    { name: 'Ons', date: 26 },
    { name: 'Tor', date: 27 },
    { name: 'Fre', date: 28 },
    { name: 'Lör', date: 29 },
    { name: 'Sön', date: 30 },
  ];

  const handleSelectWorkout = (workout) => {
    setActiveWorkoutId(workout.id);
    onNavigate('detail');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F7F5F0]">
      {/* Header */}
      <Header
        title="Träningsschema"
        showBack={true}
        onBack={() => onNavigate('plan')}
        rightAction="none"
      />

      <div className="px-5 pt-2 pb-6 flex-1 flex flex-col">
        {/* Månads- och datumväljare (Screen 4) */}
        <div className="mb-4">
          <div className="flex items-center justify-between px-2 mb-3">
            <button className="p-1 text-neutral-500 hover:text-equestrian-dark transition-colors">
              <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
            </button>
            <span className="text-sm font-bold text-equestrian-dark">
              November
            </span>
            <button className="p-1 text-neutral-500 hover:text-equestrian-dark transition-colors">
              <ChevronRight className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>

          {/* Dagsremsa */}
          <div className="flex items-center justify-between bg-white rounded-2xl p-2 border border-[#EAE5DC] shadow-xs">
            {daysRow.map((d, index) => {
              const isSelected = selectedDayIndex === index;
              return (
                <button
                  key={d.name + d.date}
                  onClick={() => setSelectedDayIndex(index)}
                  className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all ${
                    isSelected
                      ? 'bg-equestrian-dark text-white font-bold shadow-xs'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-tighter opacity-80">{d.name}</span>
                  <span className="text-xs font-semibold">{d.date}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Lista med schemalagda träningspass */}
        <div className="space-y-3 mb-5">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              isSelected={workout.id === activeWorkoutId}
              onSelect={() => handleSelectWorkout(workout)}
              onToggleCompleted={toggleWorkoutCompleted}
            />
          ))}
        </div>

        {/* Träningstips-box i botten (Screen 4) */}
        <div className="bg-[#FAF7F0] border border-[#E5DECF] rounded-2xl p-3.5 flex items-start gap-3 mt-auto shadow-xs">
          <div className="w-7 h-7 rounded-full bg-[#EFE4CE] flex items-center justify-center text-[#966F38] shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-xs font-bold text-equestrian-dark block">Tips!</span>
            <p className="text-[11px] text-neutral-600 mt-0.5 leading-snug">
              Avsluta gärna med några minuter uteritt för mental avkoppling och nöjd häst.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

