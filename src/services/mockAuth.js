/**
 * @fileoverview Mock-autentiseringstjänst med stöd för fleranvändare och hästprofiler.
 * Förberedd för att bytas ut mot Firebase Auth, Supabase eller eget JWT-backend.
 */

const STORAGE_KEY_AUTH = 'ridapp_auth_session';

export const INITIAL_USERS = [
  {
    id: 'user_1',
    name: 'Elin Lindqvist',
    email: 'elin.ryttare@equestrian.se',
    role: 'Tävlingsryttare (Hoppning)',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    horses: [
      {
        id: 'horse_1',
        userId: 'user_1',
        name: 'Cornetto',
        breed: 'SWB (Svenskt Varmblod)',
        birthYear: 2016,
        discipline: 'Hoppning (120–130 cm)',
        image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'horse_2',
        userId: 'user_1',
        name: 'Cassandra',
        breed: 'Holsteiner',
        birthYear: 2018,
        discipline: 'Dressyr & Unghästutbildning',
        image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=400&q=80',
      }
    ],
    activeHorseId: 'horse_1',
  },
  {
    id: 'user_2',
    name: 'Marcus Berg',
    email: 'marcus@stallberg.se',
    role: 'C-tränare & Dressyrryttare',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    horses: [
      {
        id: 'horse_3',
        userId: 'user_2',
        name: 'Zack Royal',
        breed: 'Hannoveranare',
        birthYear: 2015,
        discipline: 'Dressyr (Msv A)',
        image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80',
      }
    ],
    activeHorseId: 'horse_3',
  }
];

export const mockAuthService = {
  getCurrentSession() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_AUTH);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Kunde inte läsa inloggningssession från localStorage:', e);
    }
    // Standard inloggad användare: Elin
    return {
      currentUser: INITIAL_USERS[0],
      activeHorse: INITIAL_USERS[0].horses[0],
    };
  },

  saveSession(session) {
    try {
      localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(session));
    } catch (e) {
      console.warn('Kunde inte spara inloggningssession:', e);
    }
  },

  getAllMockUsers() {
    return INITIAL_USERS;
  },

  switchUser(userId) {
    const user = INITIAL_USERS.find(u => u.id === userId) || INITIAL_USERS[0];
    const activeHorse = user.horses.find(h => h.id === user.activeHorseId) || user.horses[0];
    const session = { currentUser: user, activeHorse };
    this.saveSession(session);
    return session;
  },

  switchHorse(horseId) {
    const session = this.getCurrentSession();
    const horse = session.currentUser.horses.find(h => h.id === horseId);
    if (horse) {
      session.activeHorse = horse;
      session.currentUser.activeHorseId = horseId;
      this.saveSession(session);
    }
    return session;
  }
};

