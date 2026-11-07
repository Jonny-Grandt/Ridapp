/**
 * @fileoverview Datamodeller och typdefinitioner för Ridträning-applikationen.
 * Förberedd för framtida integration med backend (t.ex. Supabase, Firebase, Node.js REST/GraphQL).
 */

/**
 * @typedef {Object} UserProfile
 * @property {string} id - Unikt användar-ID (t.ex. "user_1")
 * @property {string} name - Ryttarens namn
 * @property {string} email - E-postadress
 * @property {string} role - Roll (t.ex. "rider", "trainer")
 * @property {string} avatar - Bild-URL eller avatar
 * @property {string} activeHorseId - Nuvarande vald häst
 */

/**
 * @typedef {Object} Horse
 * @property {string} id - Hästens ID (t.ex. "horse_1")
 * @property {string} userId - Ägarens användar-ID
 * @property {string} name - Hästens namn (t.ex. "Cornetto")
 * @property {string} breed - Ras (t.ex. "SWB - Svenskt Varmblod")
 * @property {number} birthYear - Födelseår
 * @property {string} discipline - Huvudgren (t.ex. "Hoppning", "Dressyr", "Fälttävlan")
 * @property {string} image - Bild-URL
 */

/**
 * @typedef {Object} TrainingGoal
 * @property {string} id - Målets ID (t.ex. "g_1")
 * @property {string} userId - Kopplat användar-ID
 * @property {string} horseId - Kopplat häst-ID
 * @property {string} title - Målrubrik (t.ex. "Mer bärighet och självbärighet")
 * @property {string} description - Beskrivning eller fokus
 * @property {string} category - Kategori: "dressage" | "jumping" | "strength" | "general"
 * @property {string} imageUrl - Miniatyrbild
 * @property {boolean} selected - Om målet är valt för nuvarande 4-veckorscykel
 * @property {number} progress - Framstegsprocent (0-100)
 * @property {number} rating - Betyg vid utvärdering (1-5 stjärnor)
 */

/**
 * @typedef {Object} WorkoutExercise
 * @property {string} id - Övnings-ID
 * @property {string} text - Beskrivning av övningsmoment
 * @property {boolean} completed - Om momentet är avbockat
 */

/**
 * @typedef {Object} Workout
 * @property {string} id - Passets ID (t.ex. "w_1")
 * @property {string} userId - Kopplat användar-ID
 * @property {string} horseId - Kopplat häst-ID
 * @property {string} title - Rubrik (t.ex. "Hoppspecifikt – teknik")
 * @property {string} type - "Dressyr" | "Markarbete" | "Hoppning" | "Uteritt" | "Återhämtning"
 * @property {string} date - ISO datum (t.ex. "2026-10-29")
 * @property {string} dayLabel - Dagsetikett (t.ex. "Ons 29 okt")
 * @property {number} durationMinutes - Varaktighet i minuter (t.ex. 50)
 * @property {string} intensity - "Låg" | "Låg-medel" | "Medel" | "Hög"
 * @property {string} purpose - Syfte med passet
 * @property {WorkoutExercise[]} exercises - Stegvis innehåll
 * @property {string} tip - Extra träningstips
 * @property {boolean} completed - Om passet är genomfört
 * @property {string|null} completedAt - Tidsstämpel när passet slutfördes
 * @property {boolean} hasVideo - Om passet har tillhörande videoövning
 * @property {string} [videoUrl] - Eventuell videolänk
 * @property {string} image - Bild för passet
 */

/**
 * @typedef {Object} CycleEvaluation
 * @property {string} id - Utvärderingens ID
 * @property {string} cycleId - Kopplad cykel
 * @property {string} userId - Kopplat användar-ID
 * @property {string} horseId - Kopplat häst-ID
 * @property {string} evaluatedAt - Datum då utvärderingen sparades
 * @property {Record<string, number>} goalRatings - Betyg per mål-ID (1-5)
 * @property {string} reflections - Ryttarens fria reflektioner
 * @property {number} averageRating - Beräknat snittbetyg
 */

/**
 * @typedef {Object} TrainingCycle
 * @property {string} id - Cykelns ID (t.ex. "cycle_2026_q4")
 * @property {string} userId - Kopplat användar-ID
 * @property {string} horseId - Kopplat häst-ID
 * @property {string} title - Namn på cykeln (t.ex. "4 veckors cykel")
 * @property {string} periodLabel - Periodetikett (t.ex. "Vecka 1–4 • 29 okt - 25 nov")
 * @property {string} startDate - Startdatum
 * @property {string} endDate - Slutdatum
 * @property {string} status - "active" | "completed" | "upcoming"
 * @property {string} currentPhase - "work" (v.1-3) | "recovery" (v.4) | "evaluation"
 * @property {string[]} selectedGoalIds - De 3 valda målens ID
 * @property {CycleEvaluation|null} evaluation - Sparad utvärdering om slutförd
 */

export const INTENSITY_LEVELS = {
  LOW: 'Låg intensitet',
  LOW_MEDIUM: 'Låg-medel intensitet',
  MEDIUM: 'Medel intensitet',
  HIGH: 'Hög intensitet',
};

export const CYCLE_PHASES = {
  WORK: 'v.1-3 Arbete',
  RECOVERY: 'v.4 Återhämtning',
  EVALUATION: 'Utvärdering',
};

