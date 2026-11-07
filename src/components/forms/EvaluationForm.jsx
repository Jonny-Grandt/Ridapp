import React, { useState } from 'react';
import { StarRating } from '../common/StarRating';
import { ReflectionInput } from './ReflectionInput';
import { Button } from '../common/Button';
import { CheckCircle2 } from 'lucide-react';

/**
 * Utvärderingsformulär för 4-veckorsperioden (Screen 7 i designskiss)
 */
export function EvaluationForm({
  goals = [],
  initialRatings = {},
  initialReflection = '',
  onSubmit,
  onCancel,
}) {
  const [ratings, setRatings] = useState(() => {
    const initial = {};
    goals.forEach(g => {
      initial[g.id] = initialRatings[g.id] || g.rating || 4;
    });
    return initial;
  });

  const [reflection, setReflection] = useState(
    initialReflection || 'Galoppen har fått en betydligt bättre bärighet och hästen svarar fint för förhållningarna. Vill fortsätta jobba med tålamod och böjning i höger varv.'
  );

  const handleRatingChange = (goalId, starCount) => {
    setRatings(prev => ({ ...prev, [goalId]: starCount }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(ratings, reflection);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Betygsättning per valt mål */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="border-b border-[#EAE5DC] pb-3 last:border-b-0">
            <h4 className="text-sm font-semibold text-equestrian-dark mb-1.5">
              {goal.title}
            </h4>
            <div className="flex items-center justify-between">
              <StarRating
                value={ratings[goal.id] || 0}
                onChange={(rating) => handleRatingChange(goal.id, rating)}
                size="md"
              />
              <span className="text-xs text-neutral-400 font-medium">
                {ratings[goal.id] || 0} / 5
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Reflektioner */}
      <ReflectionInput
        value={reflection}
        onChange={setReflection}
        placeholder="Vad har fungerat bra? Vad vill du utveckla?"
      />

      {/* Skicka in */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          fullWidth
          size="lg"
          icon={CheckCircle2}
          className="shadow-lg"
        >
          Spara utvärdering
        </Button>
      </div>
    </form>
  );
}

