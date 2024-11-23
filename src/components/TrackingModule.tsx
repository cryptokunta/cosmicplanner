import React, { useState } from 'react';
import { Star, CheckCircle2, Circle, Plus, X } from 'lucide-react';

interface TrackingItem {
  id: string;
  name: string;
  completed: boolean;
  notes?: string;
}

export default function TrackingModule() {
  const [practices, setPractices] = useState<TrackingItem[]>([
    { id: 'meditation', name: 'Daily Meditation', completed: false },
    { id: 'gratitude', name: 'Gratitude Practice', completed: false },
    { id: 'intention', name: 'Set Daily Intention', completed: false },
    { id: 'ritual', name: 'Morning Ritual', completed: false }
  ]);
  const [newPractice, setNewPractice] = useState('');

  const togglePractice = (id: string) => {
    setPractices(prev => prev.map(practice => 
      practice.id === id 
        ? { ...practice, completed: !practice.completed }
        : practice
    ));
  };

  const addPractice = () => {
    if (newPractice.trim()) {
      setPractices(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          name: newPractice.trim(),
          completed: false
        }
      ]);
      setNewPractice('');
    }
  };

  const removePractice = (id: string) => {
    setPractices(prev => prev.filter(practice => practice.id !== id));
  };

  return (
    <div className="bg-indigo-900/20 backdrop-blur-sm rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-200">
          <Star className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-semibold text-white">
          Daily Practices
        </h3>
      </div>

      {/* Add New Practice */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newPractice}
            onChange={(e) => setNewPractice(e.target.value)}
            placeholder="Add new practice..."
            className="bg-indigo-950/30 text-white rounded-lg px-3 py-2 flex-1 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            onKeyPress={(e) => e.key === 'Enter' && addPractice()}
          />
          <button
            onClick={addPractice}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Practice List */}
      <div className="space-y-3">
        {practices.map(practice => (
          <div 
            key={practice.id}
            className="bg-indigo-950/30 rounded-xl p-4 flex items-center gap-3"
          >
            <button
              onClick={() => togglePractice(practice.id)}
              className={`text-lg transition-colors ${
                practice.completed ? 'text-green-400' : 'text-indigo-400'
              }`}
            >
              {practice.completed ? <CheckCircle2 /> : <Circle />}
            </button>
            <span className={`flex-1 text-white ${
              practice.completed ? 'line-through text-white/70' : ''
            }`}>
              {practice.name}
            </span>
            <button
              onClick={() => removePractice(practice.id)}
              className="text-indigo-400 hover:text-indigo-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Progress Summary */}
      <div className="mt-6 pt-4 border-t border-indigo-800/50">
        <p className="text-indigo-200 text-sm">
          {practices.filter(p => p.completed).length} of {practices.length} practices completed
        </p>
      </div>
    </div>
  );
}