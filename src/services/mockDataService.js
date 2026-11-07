/**
 * @fileoverview Datatjänst för träningscykler, mål, pass och utvärderingar.
 * Sparar automatiskt i localStorage och är förberedd för backend-anrop.
 */

import { IMAGES } from '../assets/images';

const STORAGE_KEY_DATA = 'ridapp_equestrian_data_v1';

export const INITIAL_DATA = {
  activeCycle: {
    id: 'cycle_2026_q4',
    userId: 'user_1',
    horseId: 'horse_1',
    title: '4 veckors cykel',
    periodLabel: 'Vecka 1–4 • 29 okt - 25 nov',
    startDate: '2026-10-29',
    endDate: '2026-11-25',
    status: 'active', // 'active' | 'completed' | 'upcoming'
    currentPhase: 'v.1-3 Arbete',
    selectedGoalIds: ['goal_1', 'goal_2', 'goal_3'],
    evaluation: null,
  },

  goals: [
    {
      id: 'goal_1',
      userId: 'user_1',
      horseId: 'horse_1',
      title: 'Mer bärighet och självbärighet',
      description: 'Stärka galopparbetet och få hästen att bära mer vikt på bakbenen i övergångar.',
      category: 'dressage',
      imageUrl: IMAGES.goals.carriage,
      selected: true,
      progress: 80,
      rating: 5,
    },
    {
      id: 'goal_2',
      userId: 'user_1',
      horseId: 'horse_1',
      title: 'Bättre balans i vändningar',
      description: 'Bibehålla ytterskänkelstöd och rakriktning genom hörnpasseringar och snäva svängar.',
      category: 'turns',
      imageUrl: IMAGES.goals.turns,
      selected: true,
      progress: 70,
      rating: 4,
    },
    {
      id: 'goal_3',
      userId: 'user_1',
      horseId: 'horse_1',
      title: 'Större språngkraft',
      description: 'Öka avstampets explosivitet med hjälp av studs, kavaletti och rätt anridning.',
      category: 'power',
      imageUrl: IMAGES.goals.power,
      selected: true,
      progress: 60,
      rating: 4,
    },
    {
      id: 'goal_4',
      userId: 'user_1',
      horseId: 'horse_1',
      title: 'Lugn och rytmisk galopp',
      description: 'Hitta jämn fyrtakt och avslappnad rygg i markarbetet.',
      category: 'general',
      imageUrl: IMAGES.goals.flexibility,
      selected: false,
      progress: 40,
      rating: 0,
    },
    {
      id: 'goal_5',
      userId: 'user_1',
      horseId: 'horse_1',
      title: 'Starkare överlinje och rygg',
      description: 'Lång och låg form kombinerat med bomserier för ryggmuskulatur.',
      category: 'strength',
      imageUrl: IMAGES.goals.poles,
      selected: false,
      progress: 50,
      rating: 0,
    }
  ],

  workouts: [
    {
      id: 'w_1',
      userId: 'user_1',
      horseId: 'horse_1',
      title: 'Dressyr – bärighet',
      type: 'Dressyr',
      date: '2026-10-25',
      dayLabel: 'Tis 25 okt',
      durationMinutes: 45,
      intensity: 'Låg-medel intensitet',
      purpose: 'Förbättra samling i övergångar mellan trav och galopp samt aktivera bakbenen.',
      completed: true,
      completedAt: '2026-10-25T15:30:00Z',
      hasVideo: true,
      image: IMAGES.goals.carriage,
      exercises: [
        { id: 'e_1_1', text: '10 min skritt på lång tygel och serpentiner', completed: true },
        { id: 'e_1_2', text: '15 min tempoväxlingar i trav med fokus på bärighet', completed: true },
        { id: 'e_1_3', text: '15 min galoppfattningar från skritt och samlad galopp', completed: true },
        { id: 'e_1_4', text: '5 min avskrittning för hand', completed: true },
      ],
      tip: 'Tänk på att sitta djupt i sadeln och använda sätet framför handen vid förhållningar.',
    },
    {
      id: 'w_2',
      userId: 'user_1',
      horseId: 'horse_1',
      title: 'Markarbete – styrka',
      type: 'Markarbete',
      date: '2026-10-27',
      dayLabel: 'Tor 27 okt',
      durationMinutes: 50,
      intensity: 'Medel intensitet',
      purpose: 'Stärka bålmuskulatur och koordination med upphöjda bommar i galopp.',
      completed: true,
      completedAt: '2026-10-27T17:15:00Z',
      hasVideo: false,
      image: IMAGES.goals.poles,
      exercises: [
        { id: 'e_2_1', text: '12 min lösgörande trav- och skrittarbete', completed: true },
        { id: 'e_2_2', text: '20 min bomserie med 3 meter mellan bommarna i galopp', completed: true },
        { id: 'e_2_3', text: '10 min voltarbete över enskild bom', completed: true },
        { id: 'e_2_4', text: '8 min avslappnande avskrittning', completed: true },
      ],
      tip: 'Låt hästen titta på bommarna och hitta sin egen balans utan att dra i tygeln.',
    },
    {
      id: 'w_3',
      userId: 'user_1',
      horseId: 'horse_1',
      title: 'Hoppspecifikt – teknik',
      type: 'Hoppning',
      date: '2026-10-29',
      dayLabel: 'Ons 29 okt',
      durationMinutes: 50,
      intensity: 'Medel intensitet',
      purpose: 'Träna en rund och balanserad galopp med fokus på sits, rytm och distans.',
      completed: false,
      completedAt: null,
      hasVideo: true,
      image: IMAGES.heroJumping,
      exercises: [
        { id: 'e_3_1', text: '15 min uppvärmning i balans och rytm', completed: false },
        { id: 'e_3_2', text: '4-5 språngserier med fokus på distans', completed: false },
        { id: 'e_3_3', text: 'Avsluta med lugn avskrittning', completed: false },
      ],
      tip: 'Tips! Avsluta gärna med några minuter uteritt för mental avkoppling.',
    },
    {
      id: 'w_4',
      userId: 'user_1',
      horseId: 'horse_1',
      title: 'Lugnare pass i skritt och trav',
      type: 'Återhämtning',
      date: '2026-10-31',
      dayLabel: 'Fre 31 okt',
      durationMinutes: 30,
      intensity: 'Låg intensitet',
      purpose: 'Aktiv återhämtning, stretchning och mentalt lugn efter gårdagens teknikträning.',
      completed: false,
      completedAt: null,
      hasVideo: false,
      image: IMAGES.horsePortrait,
      exercises: [
        { id: 'e_4_1', text: '15 min skritt på lång tygel utomhus', completed: false },
        { id: 'e_4_2', text: '10 min mjuk trav med fokus på framåt-nedåt-sökning', completed: false },
        { id: 'e_4_3', text: '5 min avskrittning och massage', completed: false },
      ],
      tip: 'Ge hästen mycket beröm och fokusera på avslappning.',
    },
    {
      id: 'w_5',
      userId: 'user_1',
      horseId: 'horse_1',
      title: 'Uteritt – styrka i backar',
      type: 'Uteritt',
      date: '2026-11-02',
      dayLabel: 'Sön 2 nov',
      durationMinutes: 45,
      intensity: 'Medel intensitet',
      purpose: 'Klättra i backar för att naturligt bygga bakbensstyrka och rygg.',
      completed: false,
      completedAt: null,
      hasVideo: false,
      image: IMAGES.horseSunset,
      exercises: [
        { id: 'e_5_1', text: '10 min skritt på fast underlag till skogsslingan', completed: false },
        { id: 'e_5_2', text: '20 min intervallklättring i skritt och trav i backe', completed: false },
        { id: 'e_5_3', text: '15 min avskrittning hemåt', completed: false },
      ],
      tip: 'Lätta i sadeln uppför backen och håll en stadig hand.',
    }
  ],

  stats: {
    totalWorkouts: 12,
    totalHours: 14,
    averageRating: 4.7,
    progressionPoints: [
      { week: 'v.1', score: 62 },
      { week: 'v.2', score: 68 },
      { week: 'v.3', score: 79 },
      { week: 'v.4', score: 86 },
    ]
  },

  upcomingCycle: {
    startDate: '2026-11-25',
    label: 'Nästa 4-veckorscykel startar 25 nov',
    quote: 'Håll fokus på det som gör skillnad! Tillsammans utvecklas vi ♡',
  }
};

export const mockDataService = {
  getData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_DATA);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Kunde inte läsa mockdata:', e);
    }
    return INITIAL_DATA;
  },

  saveData(data) {
    try {
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(data));
    } catch (e) {
      console.warn('Kunde inte spara data i localStorage:', e);
    }
  },

  resetToDefault() {
    localStorage.removeItem(STORAGE_KEY_DATA);
    return INITIAL_DATA;
  }
};

