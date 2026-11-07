import React, { useState } from 'react';
import { Clock, Activity, Check, ChevronDown, ChevronUp, Play, BookOpen, Volume2 } from 'lucide-react';
import { useWorkout } from '../../context/WorkoutContext';
import { Button } from '../common/Button';
import { Header } from '../layout/Header';
import { IMAGES } from '../../assets/images';

/**
 * Passdetaljer (Screen 5 i designskiss: Hoppspecifikt – teknik)
 */
export function WorkoutDetailView({ onNavigate }) {
  const { currentWorkout, toggleWorkoutCompleted, toggleExercise } = useWorkout();
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  if (!currentWorkout) {
    return (
      <div className="p-6 text-center">
        <p>Inget pass valt.</p>
        <Button onClick={() => onNavigate('schedule')} className="mt-4">
          Till schemat
        </Button>
      </div>
    );
  }

  const isCompleted = currentWorkout.completed;

  return (
    <div className="flex-1 flex flex-col bg-[#F7F5F0]">
      {/* Övre bild med tillbaka-knapp och bokmärke */}
      <div className="relative w-full h-64 sm:h-72 shrink-0 overflow-hidden bg-[#263428]">
        <img
          src={currentWorkout.image || IMAGES.heroJumping}
          alt={currentWorkout.title}
          className="w-full h-full object-cover"
        />

        {/* Gradient skugga */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Header placerad över bilden */}
        <Header
          transparent={true}
          showBack={true}
          onBack={() => onNavigate('schedule')}
          rightAction="bookmark"
          onRightAction={() => {
            setIsBookmarked(!isBookmarked);
            alert(isBookmarked ? 'Passet togs bort från sparade.' : 'Passet sparades i dina favoriter!');
          }}
          className="absolute top-0 left-0 right-0 z-20"
        />
      </div>

      {/* Kort med passinnehåll med rundade hörn som överlappar bilden */}
      <div className="flex-1 -mt-6 bg-[#F7F5F0] rounded-t-[32px] px-5 pt-5 pb-8 flex flex-col relative z-10 shadow-lg">
        {/* Rubrik & metadata */}
        <div className="mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-equestrian-dark font-sans leading-tight">
            {currentWorkout.title}
          </h2>

          <div className="flex items-center gap-4 mt-2 text-xs text-neutral-600 font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              {currentWorkout.durationMinutes} min
            </span>
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#946F3D]" />
              {currentWorkout.intensity}
            </span>
          </div>
        </div>

        {/* Sektion: Syfte */}
        <div className="mb-5 bg-white p-3.5 rounded-2xl border border-[#EAE5DC] shadow-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
            Syfte
          </h3>
          <p className="text-xs sm:text-sm text-equestrian-dark leading-relaxed font-medium">
            {currentWorkout.purpose}
          </p>
        </div>

        {/* Sektion: Innehåll (avbockningsbara steg) */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Innehåll
            </h3>
            <span className="text-[11px] text-neutral-500 font-medium">
              Bocka av under passet
            </span>
          </div>

          <div className="space-y-2">
            {currentWorkout.exercises.map((exercise) => (
              <div
                key={exercise.id}
                onClick={() => toggleExercise(currentWorkout.id, exercise.id)}
                className={`flex items-start gap-3 p-3 rounded-2xl border transition-all cursor-pointer select-none ${
                  exercise.completed
                    ? 'bg-[#EBF1EB] border-[#D4E2D5] text-[#2F4132]'
                    : 'bg-white border-[#EAE5DC] text-neutral-700 hover:border-neutral-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    exercise.completed
                      ? 'bg-equestrian-dark text-white'
                      : 'border-2 border-neutral-300 bg-white'
                  }`}
                >
                  {exercise.completed && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className={`text-xs font-medium leading-relaxed ${exercise.completed ? 'line-through text-neutral-500' : ''}`}>
                  {exercise.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Utökad sektion "Se mer detaljer ↓" */}
        {showMoreDetails && (
          <div className="mb-6 p-4 bg-white rounded-2xl border border-[#EAE5DC] text-xs space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-equestrian-dark font-bold">
              <BookOpen className="w-4 h-4 text-[#A9834F]" />
              <span>Tekniktips från tränaren</span>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              Fokusera på att räkna galoppsprången tyst för dig själv mellan bommarna: "1, 2, 3, 4, språng". Behåll samma rytm även efter hindret utan att tappa ytterskänkeln.
            </p>

            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
              <span className="font-semibold text-neutral-700">Röstcoachning (ljudspår):</span>
              <button
                onClick={() => alert('Startar 5 minuters guidad ljudövning för uppvärmning.')}
                className="inline-flex items-center gap-1.5 text-xs bg-[#EBF1EB] text-equestrian-dark font-semibold px-3 py-1 rounded-full"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Spela upp guide</span>
              </button>
            </div>
          </div>
        )}

        {/* Huvudknapp: Markera som genomfört */}
        <div className="space-y-3 mt-auto">
          <Button
            variant={isCompleted ? 'secondary' : 'primary'}
            fullWidth
            size="lg"
            onClick={() => toggleWorkoutCompleted(currentWorkout.id)}
            icon={Check}
            className="shadow-md"
          >
            {isCompleted ? 'Genomfört! (Tryck för att avmarkera)' : 'Markera som genomfört'}
          </Button>

          <div className="text-center">
            <button
              onClick={() => setShowMoreDetails(!showMoreDetails)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-600 hover:text-equestrian-dark py-1 transition-colors"
            >
              <span>{showMoreDetails ? 'Dölj detaljer' : 'Se mer detaljer'}</span>
              {showMoreDetails ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

