import React, { useState } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { useWorkout } from '../../context/WorkoutContext';
import { GoalCard } from '../cards/GoalCard';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { GoalSelectionForm } from '../forms/GoalSelectionForm';
import { Header } from '../layout/Header';

/**
 * Målsättningsvy (Screen 2 i designskiss)
 */
export function GoalSettingView({ onNavigate }) {
  const { goals, toggleGoal, addGoal, selectedGoals } = useWorkout();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddCustomGoal = (title, category) => {
    addGoal(title, category);
    setIsAddModalOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F7F5F0]">
      {/* Header */}
      <Header
        showBack={true}
        onBack={() => onNavigate('home')}
        rightAction="none"
      />

      <div className="px-5 pt-3 pb-8 flex-1 flex flex-col">
        {/* Rubrik & ingress */}
        <div className="mb-5">
          <h2 className="text-xl font-bold text-equestrian-dark font-sans">
            Mina mål
          </h2>
          <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
            Välj 3 förbättringsområden att fokusera på de kommande 4 veckorna.
          </p>

          <div className="mt-2.5 flex items-center justify-between text-xs font-medium text-neutral-600 bg-white/70 py-1.5 px-3 rounded-xl border border-[#EAE5DC]">
            <span>Valda fokusområden:</span>
            <span className={`font-bold ${selectedGoals.length === 3 ? 'text-[#2F4132]' : 'text-amber-700'}`}>
              {selectedGoals.length} av 3 valda
            </span>
          </div>
        </div>

        {/* Lista med målkort */}
        <div className="space-y-3 mb-6">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onToggle={toggleGoal}
            />
          ))}
        </div>

        {/* Knapp: + Lägg till mål */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 bg-white border border-[#DDD6CB] hover:border-equestrian-dark text-equestrian-dark text-xs font-semibold px-5 py-2.5 rounded-full shadow-xs transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 stroke-[2.2]" />
            <span>Lägg till mål</span>
          </button>
        </div>

        {/* Fast bottenåtgärd: Nästa steg -> */}
        <div className="mt-auto pt-4">
          <Button
            variant="primary"
            fullWidth
            size="lg"
            onClick={() => onNavigate('plan')}
            icon={ArrowRight}
            iconPosition="right"
            className="shadow-md"
          >
            Nästa steg
          </Button>
        </div>
      </div>

      {/* Modal för att skapa anpassat mål */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Skapa eget träningsmål"
        subtitle="Definiera vad du och din häst vill uppnå under perioden"
      >
        <GoalSelectionForm
          onSubmit={handleAddCustomGoal}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

