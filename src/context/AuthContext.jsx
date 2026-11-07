import React, { createContext, useContext, useState } from 'react';
import { mockAuthService, INITIAL_USERS } from '../services/mockAuth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => mockAuthService.getCurrentSession());

  const switchUser = (userId) => {
    const updated = mockAuthService.switchUser(userId);
    setSession(updated);
  };

  const switchHorse = (horseId) => {
    const updated = mockAuthService.switchHorse(horseId);
    setSession(updated);
  };

  const value = {
    currentUser: session.currentUser,
    activeHorse: session.activeHorse,
    allUsers: INITIAL_USERS,
    switchUser,
    switchHorse,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

