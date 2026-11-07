import React, { useState, useEffect, useRef } from 'react';
import { Modal } from './Modal';
import { Play, Pause, Volume2, Info, Compass } from 'lucide-react';
import { Button } from './Button';

/**
 * Interaktiv videobaserad ban- och övningsskiss med inbyggd galopptakt-metronom
 */
export function VideoDrillModal({ isOpen, onClose, workout }) {
  const [isPlayingMetronome, setIsPlayingMetronome] = useState(false);
  const [bpm, setBpm] = useState(98); // ~96-102 BPM är standardgalopp 350 m/min
  const audioContextRef = useRef(null);
  const intervalRef = useRef(null);

  // Spela upp ett diskret, behagligt galoppklick i web audio
  const playClick = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (isPlayingMetronome) {
      const intervalMs = (60 / bpm) * 1000;
      intervalRef.current = setInterval(playClick, intervalMs);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlayingMetronome, bpm]);

  useEffect(() => {
    if (!isOpen && isPlayingMetronome) {
      setIsPlayingMetronome(false);
    }
  }, [isOpen]);

  if (!workout) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={workout.title}
      subtitle="Interaktiv övningsguide & bangenomgång"
      maxWidth="max-w-lg"
    >
      <div className="space-y-4">
        {/* Ridhus / Banritning med bokstäver och bomplacering */}
        <div className="relative bg-[#F4EFE6] rounded-2xl p-4 border border-[#DFD7C9] overflow-hidden shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#946F3D] flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" /> Ridbana (20x40m) & Linjeföring
            </span>
            <span className="text-[10px] text-neutral-500 bg-white/70 px-2 py-0.5 rounded-md">
              Ryttarens väg
            </span>
          </div>

          <div className="relative w-full h-48 bg-[#EAE2D2] rounded-xl border-2 border-[#C8BCA6] flex items-center justify-center overflow-hidden">
            {/* Ridhusets bokstäver */}
            <span className="absolute top-1 left-1/2 -translate-x-1/2 font-mono text-[10px] font-bold text-neutral-600">A</span>
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-[10px] font-bold text-neutral-600">C</span>
            <span className="absolute left-2 top-1/2 -translate-y-1/2 font-mono text-[10px] font-bold text-neutral-600">B</span>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[10px] font-bold text-neutral-600">E</span>

            {/* Hinder/bommar */}
            <svg viewBox="0 0 200 120" className="w-full h-full">
              {/* Ridväg: kurva i volt och anridning */}
              <path
                d="M 30 60 C 30 20, 100 20, 100 60 C 100 100, 170 100, 170 60"
                fill="none"
                stroke="#2F4132"
                strokeWidth="2.5"
                strokeDasharray="4 3"
              />
              {/* Bommar / hinder */}
              <rect x="60" y="55" width="4" height="24" fill="#A9834F" rx="1" />
              <rect x="98" y="48" width="4" height="24" fill="#2F4132" rx="1" />
              <rect x="136" y="55" width="4" height="24" fill="#A9834F" rx="1" />

              <circle cx="100" cy="60" r="3" fill="#A9834F" />
              <text x="100" y="42" textAnchor="middle" fontSize="7" fill="#263428" fontWeight="bold">
                17.5m (4 galoppsprång)
              </text>
            </svg>
          </div>
        </div>

        {/* Galoppmetronom för tempo & rytm */}
        <div className="bg-white p-3.5 rounded-2xl border border-[#EAE5DC] flex items-center justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-equestrian-dark">
              <Volume2 className="w-4 h-4 text-[#A9834F]" />
              <span>Galopprytm-metronom ({bpm} BPM)</span>
            </div>
            <p className="text-[11px] text-neutral-500 mt-0.5">
              Hjälper dig hålla 3-taktig galopp och 350 m/min
            </p>
          </div>

          <Button
            size="sm"
            variant={isPlayingMetronome ? 'secondary' : 'primary'}
            onClick={() => setIsPlayingMetronome(!isPlayingMetronome)}
            icon={isPlayingMetronome ? Pause : Play}
          >
            {isPlayingMetronome ? 'Stoppa' : 'Starta'}
          </Button>
        </div>

        {/* Stegvis instruktion */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Tränarens fokusmål i övningen
          </h4>
          <div className="bg-[#FAF7F0] p-3 rounded-xl border border-[#E8E2D4] text-xs text-neutral-700 leading-relaxed space-y-1.5">
            <p>1. <strong>Anridning:</strong> Kom in i en samlad, rund galopp från hörnet vid C.</p>
            <p>2. <strong>Linjen:</strong> Räkna 4 jämna språng utan att trycka på eller hålla emot.</p>
            <p>3. <strong>Efter hindret:</strong> Följ genom med blicken mot kortsidan utan att tappa balansen.</p>
          </div>
        </div>

        <div className="pt-2">
          <Button fullWidth variant="primary" onClick={onClose}>
            Tillbaka till passet
          </Button>
        </div>
      </div>
    </Modal>
  );
}

