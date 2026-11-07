import React from 'react';
import { PlayCircle, Clock, Award, Star } from 'lucide-react';
import { Header } from '../layout/Header';
import { IMAGES } from '../../assets/images';

export function CoursesView({ onNavigate }) {
  const courses = [
    {
      id: 'c1',
      title: 'Hoppteknik & Distansbedömning',
      instructor: 'Helena Persson',
      episodes: '6 lektioner',
      duration: '45 min',
      rating: 4.9,
      image: IMAGES.heroJumping,
    },
    {
      id: 'c2',
      title: 'Bärighet & Skänkelvikningar',
      instructor: 'Patrik Kittel',
      episodes: '8 lektioner',
      duration: '60 min',
      rating: 4.8,
      image: IMAGES.goals.carriage,
    },
    {
      id: 'c3',
      title: 'Cavaletti för styrka och koordination',
      instructor: 'Maria Gretzer',
      episodes: '5 lektioner',
      duration: '40 min',
      rating: 5.0,
      image: IMAGES.goals.poles,
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#F7F5F0]">
      <Header title="Kurser & Ridövningar" showBack={false} rightAction="bell" />

      <div className="px-5 pt-3 pb-6 space-y-4">
        <div className="mb-2">
          <h3 className="text-base font-bold text-equestrian-dark">Mästarlektioner</h3>
          <p className="text-xs text-neutral-500">Övningar utvecklade av landslagstränare</p>
        </div>

        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => alert(`Öppnar kursen: ${course.title}`)}
            className="bg-white rounded-3xl p-3.5 border border-[#EAE5DC] shadow-xs flex gap-3.5 cursor-pointer hover:shadow-md transition-all active:scale-[0.99]"
          >
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-neutral-900">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 flex items-center justify-center text-white/90">
                <PlayCircle className="w-8 h-8 drop-shadow" />
              </div>
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
              <div>
                <h4 className="text-xs font-bold text-equestrian-dark leading-snug truncate">
                  {course.title}
                </h4>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  {course.instructor}
                </p>
              </div>

              <div className="flex items-center gap-3 text-[10px] text-neutral-400 font-medium pt-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {course.duration}
                </span>
                <span className="flex items-center gap-1 text-[#A9834F]">
                  <Star className="w-3 h-3 fill-current" /> {course.rating}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

