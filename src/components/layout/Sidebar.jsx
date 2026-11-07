import React from 'react';
import { Home, Calendar, Users, GraduationCap, User, Target, BarChart2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { HorseHeadLineArt } from '../../assets/horseGraphics';

/**
 * Valbar sidonavigering för större skärmar / desktop vy
 */
export function Sidebar({ currentView, onNavigate }) {
  const { currentUser, activeHorse } = useAuth();

  const menuItems = [
    { id: 'home', label: 'Hem', icon: Home },
    { id: 'plan', label: 'Min träningsplan', icon: Calendar },
    { id: 'goals', label: 'Fokusmål', icon: Target },
    { id: 'schedule', label: 'Träningsschema', icon: Calendar },
    { id: 'progress', label: 'Min utveckling', icon: BarChart2 },
    { id: 'evaluation', label: 'Utvärdering', icon: CheckCircle2 },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'kurser', label: 'Kurser', icon: GraduationCap },
    { id: 'profil', label: 'Profil & Häst', icon: User },
  ];

  return (
    <aside className="w-64 bg-[#263428] text-white flex flex-col justify-between p-4 border-r border-[#1E291F]">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-[#3D4F3E] flex items-center justify-center text-white">
            <HorseHeadLineArt className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
          <div>
            <h2 className="font-bold text-sm tracking-wide">Ridträning</h2>
            <p className="text-[10px] text-white/60">4-veckorsmetoden</p>
          </div>
        </div>

        {/* Navigationslänkar */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-white text-equestrian-dark shadow-sm'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 stroke-[2]" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Användarprofil i botten */}
      <div className="bg-white/10 p-3 rounded-2xl flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-white/20 overflow-hidden shrink-0">
          <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold truncate text-white">{currentUser.name}</p>
          <p className="text-[10px] text-white/70 truncate">Häst: {activeHorse?.name}</p>
        </div>
      </div>
    </aside>
  );
}

