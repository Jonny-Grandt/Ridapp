/**
 * @fileoverview Hjälpfunktioner för datumhantering och ridsportstatistik.
 */

export const SWEDISH_DAYS_SHORT = ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'];
export const SWEDISH_MONTHS = [
  'Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni',
  'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'
];
export const SWEDISH_MONTHS_SHORT = [
  'jan', 'feb', 'mar', 'apr', 'maj', 'jun',
  'jul', 'aug', 'sep', 'okt', 'nov', 'dec'
];

/**
 * Formaterar ett datum till svenskt format, t.ex. "Ons 29 okt"
 * @param {string|Date} dateInput 
 * @returns {string}
 */
export function formatDayMonth(dateInput) {
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return String(dateInput);
  const dayName = SWEDISH_DAYS_SHORT[d.getDay()];
  const dayNum = d.getDate();
  const monthName = SWEDISH_MONTHS_SHORT[d.getMonth()];
  return `${dayName} ${dayNum} ${monthName}`;
}

/**
 * Beräknar total träningstid i timmar från en array med pass
 * @param {Array<{durationMinutes: number, completed: boolean}>} workouts 
 * @returns {number}
 */
export function calculateTotalHours(workouts = []) {
  const totalMinutes = workouts
    .filter(w => w.completed)
    .reduce((sum, w) => sum + (w.durationMinutes || 0), 0);
  return Math.round((totalMinutes / 60) * 10) / 10;
}

/**
 * Beräknar snittbetyg för avslutade pass eller utvärderingar
 * @param {Array<number>} ratings 
 * @returns {number}
 */
export function calculateAverageRating(ratings = []) {
  if (!ratings.length) return 0;
  const sum = ratings.reduce((acc, r) => acc + r, 0);
  return Math.round((sum / ratings.length) * 10) / 10;
}

