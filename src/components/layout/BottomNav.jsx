import React from 'react';
import { Home, Calendar, Users, GraduationCap, User } from 'lucide-react';

/**
 * Fast bottennavigering enligt designskiss
 */
export function BottomNav({ activeTab, onTabChange }) {
  const navItems = [
    { id: 'home', label: 'Hem', icon: Home },
    { id: 'planering', label: 'Planering', icon: Calendar },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'kurser', label: 'Kurser', icon: GraduationCap },
    { id: 'profil', label: 'Profil', icon: User },
  ];

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-30 bg-[#FBF9F5]/95 backdrop-blur-md border-t border-[#EAE5DC] px-2 py-2">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-150 min-w-[56px] ${
                isActive
                  ? 'text-equestrian-dark font-semibold'
                  : 'text-[#8E958E] hover:text-equestrian-dark'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-equestrian-dark rounded-full" />
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

