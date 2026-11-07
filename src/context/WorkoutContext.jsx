import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockDataService, INITIAL_DATA } from '../services/mockDataService';
import { IMAGES } from '../assets/images';
import confetti from 'canvas-confetti';

const WorkoutContext = createContext(null);

export function WorkoutProvider({ children }) {
  const [data, setData] = useState(() => mockDataService.getData());
  const [activeWorkoutId, setActiveWorkoutId] = useState('w_3'); // Standard: 'Hoppspecifikt – teknik'

  // Spara automatiskt i localStorage vid förändringar
  useEffect(() => {
    mockDataService.saveData(data);
  }, [data]);

  // Hämta nästa pass (första ej genomförda passet)
  const nextPass = data.workouts.find(w => !w.completed) || data.workouts[0];

  // Aktuellt pass för detaljvyn
  const currentWorkout = data.workouts.find(w => w.id === activeWorkoutId) || data.workouts[0];

  // Valda mål för cykeln
  const selectedGoals = data.goals.filter(g => g.selected);

  // Växla val av mål (max 3 rekommenderat i enlighet med designen "Välj 3 förbättringsområden")
  const toggleGoal = (goalId) => {
    setData(prev => {
      const targetGoal = prev.goals.find(g => g.id === goalId);
      if (!targetGoal) return prev;

      const currentSelectedCount = prev.goals.filter(g => g.selected).length;
      
      // Om man försöker välja ett nytt när 3 redan är valda, avbryt eller byt
      if (!targetGoal.selected && currentSelectedCount >= 3) {
        alert('Du kan välja max 3 fokusmål för en 4-veckorscykel.');
        return prev;
      }

      const updatedGoals = prev.goals.map(g => {
        if (g.id === goalId) {
          return { ...g, selected: !g.selected };
        }
        return g;
      });

      return {
        ...prev,
        goals: updatedGoals,
        activeCycle: {
          ...prev.activeCycle,
          selectedGoalIds: updatedGoals.filter(g => g.selected).map(g => g.id),
        }
      };
    });
  };

  // Lägg till eget mål
  const addGoal = (title, category = 'general') => {
    if (!title.trim()) return;

    const newGoal = {
      id: `goal_custom_${Date.now()}`,
      userId: 'user_1',
      horseId: 'horse_1',
      title: title.trim(),
      description: 'Anpassat fokusmål för din träningsplan.',
      category,
      imageUrl: IMAGES.goals.default,
      selected: data.goals.filter(g => g.selected).length < 3,
      progress: 20,
      rating: 0,
    };

    setData(prev => ({
      ...prev,
      goals: [...prev.goals, newGoal],
    }));
  };

  // Markera pass som genomfört eller ej
  const toggleWorkoutCompleted = (workoutId) => {
    setData(prev => {
      let nowCompleted = false;
      const updatedWorkouts = prev.workouts.map(w => {
        if (w.id === workoutId) {
          nowCompleted = !w.completed;
          return {
            ...w,
            completed: nowCompleted,
            completedAt: nowCompleted ? new Date().toISOString() : null,
            exercises: w.exercises.map(ex => ({ ...ex, completed: nowCompleted })),
          };
        }
        return w;
      });

      // Trigga fira-konfetti om passet nyss klarmarkerades!
      if (nowCompleted) {
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#2F4132', '#A9834F', '#8F9F8F']
          });
        } catch {
          // ignore if canvas is not ready
        }
      }

      // Beräkna om statistik
      const completedList = updatedWorkouts.filter(w => w.completed);
      const totalHours = Math.round((completedList.reduce((sum, w) => sum + w.durationMinutes, 0) / 60) * 10) / 10;

      return {
        ...prev,
        workouts: updatedWorkouts,
        stats: {
          ...prev.stats,
          totalWorkouts: 10 + completedList.length,
          totalHours: Math.max(14, totalHours),
        }
      };
    });
  };

  // Bocka av enskilt övningsmoment i passet
  const toggleExercise = (workoutId, exerciseId) => {
    setData(prev => {
      const updatedWorkouts = prev.workouts.map(w => {
        if (w.id === workoutId) {
          const updatedExercises = w.exercises.map(ex => {
            if (ex.id === exerciseId) {
              return { ...ex, completed: !ex.completed };
            }
            return ex;
          });
          const allDone = updatedExercises.every(ex => ex.completed);
          return {
            ...w,
            exercises: updatedExercises,
            completed: allDone,
            completedAt: allDone ? (w.completedAt || new Date().toISOString()) : null,
          };
        }
        return w;
      });
      return { ...prev, workouts: updatedWorkouts };
    });
  };

  // Spara 4-veckorsutvärdering
  const saveEvaluation = (ratings, reflectionText) => {
    setData(prev => {
      const values = Object.values(ratings);
      const average = values.length
        ? Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10
        : 5;

      const evalObject = {
        id: `eval_${Date.now()}`,
        cycleId: prev.activeCycle.id,
        userId: 'user_1',
        horseId: 'horse_1',
        evaluatedAt: new Date().toISOString(),
        goalRatings: ratings,
        reflections: reflectionText,
        averageRating: average,
      };

      // Uppdatera mål med de sparade betygen
      const updatedGoals = prev.goals.map(g => {
        if (ratings[g.id] !== undefined) {
          return { ...g, rating: ratings[g.id] };
        }
        return g;
      });

      return {
        ...prev,
        goals: updatedGoals,
        activeCycle: {
          ...prev.activeCycle,
          status: 'completed',
          currentPhase: 'Utvärdering',
          evaluation: evalObject,
        },
        stats: {
          ...prev.stats,
          averageRating: average,
        }
      };
    });

    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#2F4132', '#A9834F', '#425A46', '#D4AF37']
      });
    } catch {
      // ignore
    }
  };

  // Starta ny 4-veckorscykel
  const startNewCycle = () => {
    setData(prev => ({
      ...prev,
      activeCycle: {
        id: `cycle_${Date.now()}`,
        userId: 'user_1',
        horseId: 'horse_1',
        title: '4 veckors cykel',
        periodLabel: 'Vecka 1–4 • 25 nov - 23 dec',
        startDate: '2026-11-25',
        endDate: '2026-12-23',
        status: 'active',
        currentPhase: 'v.1-3 Arbete',
        selectedGoalIds: prev.goals.slice(0, 3).map(g => g.id),
        evaluation: null,
      },
      workouts: prev.workouts.map(w => ({
        ...w,
        completed: false,
        completedAt: null,
        exercises: w.exercises.map(e => ({ ...e, completed: false })),
      }))
    }));
  };

  // Återställ all data till standard
  const resetToDefault = () => {
    const fresh = mockDataService.resetToDefault();
    setData(fresh);
  };

  const value = {
    cycle: data.activeCycle,
    goals: data.goals,
    selectedGoals,
    workouts: data.workouts,
    stats: data.stats,
    upcomingCycle: data.upcomingCycle,
    nextPass,
    activeWorkoutId,
    setActiveWorkoutId,
    currentWorkout,
    toggleGoal,
    addGoal,
    toggleWorkoutCompleted,
    toggleExercise,
    saveEvaluation,
    startNewCycle,
    resetToDefault,
  };

  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>;
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
}

