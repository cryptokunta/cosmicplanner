import React from 'react';
import { Sparkle } from 'lucide-react';

export default function MoodTracker() {
  return (
    <div className="bg-indigo-900/20 backdrop-blur-sm rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkle className="w-5 h-5 text-indigo-300" />
        <h3 className="text-xl font-semibold text-white">Mood Tracker</h3>
      </div>
      <div className="text-center py-8">
        <p className="text-indigo-200">Coming Soon</p>
        <p className="text-sm text-indigo-300 mt-2">Track your emotional journey through the cosmos</p>
      </div>
    </div>
  );
}