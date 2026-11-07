import React, { useState } from 'react';
import { Check, ArrowRight, Calendar as CalendarIcon, RotateCcw } from 'lucide-react';
import { useWorkout } from '../../context/WorkoutContext';
import { EvaluationForm } from '../forms/EvaluationForm';
import { Button } from '../common/Button';
import { Header } from '../layout/Header';
import { IMAGES } from '../../assets/images';
import { HandDrawnHeart } from '../../assets/horseGraphics';

/**
 * Utvärderings- och avslutningsflöde (Screens 7, 8 och 9 i designskiss)
 */
export function EvaluationView({ onNavigate, initialStep = 'form' }) {
  const { selectedGoals, saveEvaluation, startNewCycle, upcomingCycle } = useWorkout();
  // steg: 'form' (Screen 7), 'completed' (Screen 8), 'upcoming' (Screen 9)
  const [step, setStep] = useState(initialStep);

  const handleSaveEvaluation = (ratings, reflection) => {
    saveEvaluation(ratings, reflection);
    setStep('completed');
  };

  const handleStartNewPlan = () => {
    setStep('upcoming');
  };

  const handleConfirmNewCycle = () => {
    startNewCycle();
    onNavigate('goals');
  };

  // --- SKÄRM 8: Din 4-veckorsperiod är avslutad! ---
  if (step === 'completed') {
    return (
      <div className="flex-1 flex flex-col bg-[#F7F5F0] justify-between relative overflow-hidden">
        <Header
          showBack={true}
          onBack={() => onNavigate('progress')}
          rightAction="none"
        />

        <div className="px-6 pt-6 pb-2 text-center flex flex-col items-center z-10">
          {/* Grön cirkel med checkmark */}
          <div className="w-18 h-18 rounded-full bg-[#2F4132] text-white flex items-center justify-center shadow-lg mb-6 ring-8 ring-[#E5ECE5]">
            <Check className="w-9 h-9 stroke-[3]" />
          </div>

          <h2 className="text-2xl font-serif font-bold text-equestrian-dark mb-2">
            Din 4-veckorsperiod<br />är avslutad!
          </h2>

          <p className="text-sm text-neutral-600 mb-8 font-medium">
            Tack för ditt engagemang.
          </p>

          <div className="w-full max-w-xs space-y-3">
            <Button
              variant="primary"
              fullWidth
              size="lg"
              onClick={() => onNavigate('progress')}
              icon={ArrowRight}
              iconPosition="right"
              className="shadow-md"
            >
              Se min utveckling
            </Button>

            <button
              onClick={handleStartNewPlan}
              className="text-xs font-semibold text-equestrian-dark hover:underline py-2 transition-colors block w-full"
            >
              Starta ny plan
            </button>
          </div>
        </div>

        {/* Häst i solnedgång vid äng (Screen 8 i skiss) */}
        <div className="relative w-full h-56 sm:h-64 mt-4 overflow-hidden">
          <img
            src={IMAGES.horseSunset}
            alt="Häst i solnedgång"
            className="w-full h-full object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#F7F5F0]/20 to-[#F7F5F0]" />
        </div>
      </div>
    );
  }

  // --- SKÄRM 9: Kommande period ---
  if (step === 'upcoming') {
    return (
      <div className="flex-1 flex flex-col bg-[#F7F5F0] justify-between">
        <Header
          showBack={true}
          onBack={() => setStep('completed')}
          rightAction="none"
        />

        <div className="px-6 pt-4 pb-8 flex-1 flex flex-col justify-between">
          <div>
            {/* Rubrik med kalenderikon */}
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-xl bg-[#EBF1EB] flex items-center justify-center text-[#2F4132]">
                <CalendarIcon className="w-5 h-5 stroke-[2]" />
              </div>
              <h2 className="text-xl font-bold text-equestrian-dark">
                Kommande period
              </h2>
            </div>

            {/* Kort för nästa period */}
            <div className="bg-white rounded-3xl p-5 border border-[#EAE5DC] shadow-sm mb-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#F4EFE6] flex items-center justify-center text-[#946F3D] shrink-0 mt-0.5">
                  <CalendarIcon className="w-4 h-4 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-equestrian-dark leading-snug">
                    {upcomingCycle.label}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Skapa nya målsättningar och anpassa schemat efter hästens dagsform.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  fullWidth
                  size="md"
                  onClick={handleConfirmNewCycle}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Förbered din plan
                </Button>
              </div>
            </div>
          </div>

          {/* Citat & handritat hjärta (Screen 9 i designskiss) */}
          <div className="text-center py-6">
            <p className="text-xs font-medium text-neutral-600 mb-3">
              Håll fokus på det som gör skillnad!
            </p>

            <div className="font-handwriting text-2xl sm:text-3xl text-equestrian-dark font-bold flex items-center justify-center gap-2">
              <span>Tillsammans utvecklas vi</span>
              <HandDrawnHeart className="w-6 h-6 text-equestrian-dark inline-block stroke-[2.2]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- SKÄRM 7: Utvärdering – 4 veckor (Formulär) ---
  return (
    <div className="flex-1 flex flex-col bg-[#F7F5F0] relative">
      {/* Övre bild på häst (Screen 7) */}
      <div className="relative w-full h-52 shrink-0 overflow-hidden bg-[#263428]">
        <img
          src={IMAGES.horsePortrait}
          alt="Hästporträtt utvärdering"
          className="w-full h-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30 pointer-events-none" />

        <Header
          transparent={true}
          showBack={true}
          onBack={() => onNavigate('progress')}
          rightAction="close"
          onRightAction={() => onNavigate('progress')}
          className="absolute top-0 left-0 right-0 z-20"
        />
      </div>

      {/* Utvärderingskort som överlappar bilden */}
      <div className="flex-1 -mt-8 bg-[#F7F5F0] rounded-t-[32px] px-5 pt-5 pb-8 flex flex-col relative z-10 shadow-lg">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-equestrian-dark font-sans">
            Utvärdering – 4 veckor
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Hur har det gått med dina mål denna period?
          </p>
        </div>

        <EvaluationForm
          goals={selectedGoals}
          onSubmit={handleSaveEvaluation}
          onCancel={() => onNavigate('progress')}
        />
      </div>
    </div>
  );
}

