import React from 'react';

/**
 * Minimalistiskt linjetecknat hästhuvud identiskt med designskissens emblem
 */
export const HorseHeadLineArt = ({ className = "w-10 h-10 text-equestrian-dark", strokeWidth = 1.6 }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Elegant minimalist horse head profile */}
    <path d="M 28 85 C 32 75, 34 68, 36 60 C 37 54, 38 48, 38 42 C 38 34, 40 24, 46 18 C 47 16, 49 15, 51 17 C 52 19, 52 23, 50 28 C 55 24, 60 25, 63 28 C 66 31, 68 36, 68 44 C 73 47, 78 51, 80 57 C 82 62, 80 67, 74 70 C 68 73, 62 70, 58 66 C 52 61, 48 57, 44 54 C 42 62, 40 72, 38 85" />
    {/* Mane and muzzle details */}
    <path d="M 44 26 C 40 32, 38 40, 36 48" />
    <path d="M 70 54 C 71 56, 70 58, 68 58" />
    <circle cx="58" cy="38" r="1.8" fill="currentColor" />
  </svg>
);

/**
 * Cirkulär badge för 4-veckorscykeln (se Screen 3 i designskiss)
 */
export const HorseCycleBadge = ({ className = "w-20 h-20" }) => (
  <div className={`relative flex items-center justify-center rounded-full bg-[#EBF1EB] border-2 border-[#D7E3D8] ${className}`}>
    <HorseHeadLineArt className="w-12 h-12 text-[#2C3E2D]" strokeWidth={1.8} />
  </div>
);

/**
 * Handritat hjärta för "Tillsammans utvecklas vi ♡"
 */
export const HandDrawnHeart = ({ className = "w-5 h-5 inline-block text-equestrian-dark" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

