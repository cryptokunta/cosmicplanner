import React from 'react';
import { X, Star, Moon } from 'lucide-react';
import { moonPhases, celestialEvents, dailyCorrespondences } from '../data/cosmicData';

interface DayDetailsProps {
  date: Date;
  onClose: () => void;
  onSaveJournal: (content: string) => void;
  journalContent?: string;
}

export default function DayDetails({ date, onClose, onSaveJournal, journalContent = '' }: DayDetailsProps) {
  const [entry, setEntry] = React.useState(journalContent);
  const dayOfWeek = date.getDay();
  const dateStr = date.toISOString().split('T')[0];
  
  const moonPhase = moonPhases.find(mp => mp.date === dateStr);
  const celestialEvent = celestialEvents.find(ce => ce.date === dateStr);
  const dayCorr = dailyCorrespondences[date.toLocaleDateString('en-US', { weekday: 'long' }) as keyof typeof dailyCorrespondences];

  const handleSave = () => {
    onSaveJournal(entry);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-indigo-900/90 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {date.toLocaleDateString('en-US', { 
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}
          </h2>
          <button 
            onClick={onClose}
            className="text-indigo-200 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Celestial Information */}
            <div className="bg-indigo-950/50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-indigo-200 mb-3 flex items-center gap-2">
                <Moon className="w-4 h-4" />
                Celestial Alignments
              </h3>
              {moonPhase && (
                <div className="mb-2">
                  <p className="text-white font-medium">{moonPhase.phase}</p>
                  <p className="text-indigo-200 text-sm">{moonPhase.ritual}</p>
                </div>
              )}
              {celestialEvent && (
                <div className="mt-3">
                  <p className="text-white font-medium">{celestialEvent.event}</p>
                  <p className="text-indigo-200 text-sm">{celestialEvent.description}</p>
                </div>
              )}
            </div>

            {/* Daily Correspondences */}
            <div className="bg-indigo-950/50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-indigo-200 mb-3 flex items-center gap-2">
                <Star className="w-4 h-4" />
                Daily Correspondences
              </h3>
              <div className="space-y-2">
                <p><span className="text-indigo-200">Element:</span> <span className="text-white">{dayCorr.element}</span></p>
                <p><span className="text-indigo-200">Colors:</span> <span className="text-white">{dayCorr.color}</span></p>
                <p><span className="text-indigo-200">Crystal:</span> <span className="text-white">{dayCorr.crystal}</span></p>
                <p><span className="text-indigo-200">Animal:</span> <span className="text-white">{dayCorr.animal}</span></p>
                <p><span className="text-indigo-200">Tree:</span> <span className="text-white">{dayCorr.tree}</span></p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Planetary Guidance */}
            <div className="bg-indigo-950/50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-indigo-200 mb-3">
                Planetary Guidance
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{dayCorr.symbol}</span>
                <span className="text-white font-medium">{dayCorr.planet}'s Day</span>
              </div>
              <p className="text-white mb-3">{dayCorr.influence}</p>
              <p className="text-indigo-200 mt-2">Recommended Activity:</p>
              <p className="text-white text-sm">{dayCorr.activity}</p>
            </div>

            {/* Journal Entry */}
            <div className="bg-indigo-950/50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-indigo-200 mb-3">Journal Entry</h3>
              <textarea
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                className="w-full h-40 bg-indigo-900/50 text-white rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                placeholder="Record your cosmic reflections..."
              />
              <button
                onClick={handleSave}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
              >
                Save Entry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}