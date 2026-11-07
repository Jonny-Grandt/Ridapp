import React, { useState } from 'react';
import { Button } from '../common/Button';
import { Target, Plus } from 'lucide-react';

/**
 * Formulär för att skapa ett eget skräddarsytt fokusmål
 */
export function GoalSelectionForm({
  onSubmit,
  onCancel,
}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('general');

  const categories = [
    { id: 'dressage', label: 'Dressyr & Bärighet' },
    { id: 'jumping', label: 'Hoppning & Språngkraft' },
    { id: 'turns', label: 'Balans & Vändningar' },
    { id: 'strength', label: 'Kondition & Bål' },
    { id: 'general', label: 'Övrigt / Mental fokus' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(title.trim(), category);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-equestrian-dark mb-1.5 uppercase tracking-wide">
          Målrubrik
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="t.ex. Mer rytmisk och reglerbar galopp"
          className="w-full bg-white border border-[#E0DCD4] rounded-xl px-3.5 py-2.5 text-sm text-equestrian-dark placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-equestrian-dark/20 focus:border-equestrian-dark transition-all"
          autoFocus
          required
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-equestrian-dark mb-1.5 uppercase tracking-wide">
          Kategori
        </label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`text-xs px-3 py-2 rounded-xl border text-left transition-all ${
                category === c.id
                  ? 'border-equestrian-dark bg-[#EBF1EB] text-equestrian-dark font-semibold'
                  : 'border-[#E5E1D8] bg-white text-neutral-600 hover:border-neutral-300'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2.5 pt-2">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="flex-1"
        >
          Avbryt
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={!title.trim()}
          icon={Plus}
          className="flex-1"
        >
          Lägg till mål
        </Button>
      </div>
    </form>
  );
}

