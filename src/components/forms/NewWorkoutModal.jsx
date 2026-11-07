import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Plus } from 'lucide-react';
import { IMAGES } from '../../assets/images';

export function NewWorkoutModal({ isOpen, onClose, onAddWorkout }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Hoppning');
  const [duration, setDuration] = useState(45);
  const [intensity, setIntensity] = useState('Medel intensitet');
  const [purpose, setPurpose] = useState('');
  const [dayLabel, setDayLabel] = useState('Lör 29 okt');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newWorkout = {
      id: `w_custom_${Date.now()}`,
      userId: 'user_1',
      horseId: 'horse_1',
      title: title.trim(),
      type,
      date: new Date().toISOString().split('T')[0],
      dayLabel,
      durationMinutes: Number(duration),
      intensity,
      purpose: purpose.trim() || 'Fokus på bärighet, lösgjordhet och ryttarens sits.',
      completed: false,
      completedAt: null,
      hasVideo: type === 'Hoppning' || type === 'Dressyr',
      image: type === 'Hoppning' ? IMAGES.heroJumping : (type === 'Dressyr' ? IMAGES.goals.carriage : IMAGES.goals.poles),
      exercises: [
        { id: `e_${Date.now()}_1`, text: '10 min skritt på lång tygel och serpentiner', completed: false },
        { id: `e_${Date.now()}_2`, text: 'Huvudövning enligt dagens fokusmål', completed: false },
        { id: `e_${Date.now()}_3`, text: 'Lugn avskrittning för hand eller uppsuttet', completed: false },
      ],
      tip: 'Avsluta gärna med beröm och några minuters lugn trav med lång tygel.',
    };

    onAddWorkout(newWorkout);
    setTitle('');
    setPurpose('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Planera eller logga pass"
      subtitle="Lägg till ett nytt ridpass i träningsschemat"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-equestrian-dark mb-1">
            Passrubrik
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="t.ex. Hoppträning i ridhus"
            className="w-full bg-white border border-[#E0DCD4] rounded-xl px-3.5 py-2 text-sm text-equestrian-dark placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-equestrian-dark/20 focus:border-equestrian-dark"
            required
            autoFocus
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-equestrian-dark mb-1">
              Typ av träning
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-white border border-[#E0DCD4] rounded-xl px-3 py-2 text-xs text-equestrian-dark focus:outline-none"
            >
              <option value="Hoppning">Hoppning</option>
              <option value="Dressyr">Dressyr</option>
              <option value="Markarbete">Markarbete & Bommar</option>
              <option value="Uteritt">Uteritt / Kondition</option>
              <option value="Återhämtning">Återhämtning & Skritt</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-equestrian-dark mb-1">
              Dag
            </label>
            <input
              type="text"
              value={dayLabel}
              onChange={(e) => setDayLabel(e.target.value)}
              className="w-full bg-white border border-[#E0DCD4] rounded-xl px-3 py-2 text-xs text-equestrian-dark"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-equestrian-dark mb-1">
              Varaktighet (min)
            </label>
            <input
              type="number"
              min="15"
              max="120"
              step="5"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-white border border-[#E0DCD4] rounded-xl px-3 py-2 text-xs text-equestrian-dark"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-equestrian-dark mb-1">
              Intensitet
            </label>
            <select
              value={intensity}
              onChange={(e) => setIntensity(e.target.value)}
              className="w-full bg-white border border-[#E0DCD4] rounded-xl px-3 py-2 text-xs text-equestrian-dark focus:outline-none"
            >
              <option value="Låg intensitet">Låg intensitet</option>
              <option value="Låg-medel intensitet">Låg-medel</option>
              <option value="Medel intensitet">Medel intensitet</option>
              <option value="Hög intensitet">Hög intensitet</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-equestrian-dark mb-1">
            Syfte med passet
          </label>
          <textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            rows={2}
            placeholder="Vad vill du uppnå under detta pass?"
            className="w-full bg-white border border-[#E0DCD4] rounded-xl p-3 text-xs text-equestrian-dark placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-equestrian-dark/20"
          />
        </div>

        <div className="flex gap-2.5 pt-2">
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            Avbryt
          </Button>
          <Button type="submit" variant="primary" icon={Plus} className="flex-1">
            Spara pass
          </Button>
        </div>
      </form>
    </Modal>
  );
}

