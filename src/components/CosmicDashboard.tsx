import React from 'react';
import { Star } from 'lucide-react';
import { dailyKarmicLessons, dailyCorrespondences } from '../data/cosmicData';

interface CosmicDashboardProps {
  selectedDate: Date;
}

export default function CosmicDashboard({ selectedDate }: CosmicDashboardProps) {
  const dayOfWeek = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
  const karmicLesson = dailyKarmicLessons[dayOfWeek as keyof typeof dailyKarmicLessons];
  const dailyCorr = dailyCorrespondences[dayOfWeek as keyof typeof dailyCorrespondences];

  return (
    <div className="bg-indigo-900/20 backdrop-blur-sm rounded-2xl p-6">
      {/* Karmic Lesson Section */}
      <div className="mb-6">
        <div className="bg-indigo-950/30 rounded-xl p-4">
          <h3 className="text-indigo-200 font-medium mb-3 flex items-center gap-2">
            <Star className="w-4 h-4" />
            Daily Karmic Lesson
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-indigo-300 text-sm">Lesson</p>
              <p className="text-white font-medium">{karmicLesson.lesson}</p>
            </div>
            <div>
              <p className="text-indigo-300 text-sm">Theme</p>
              <p className="text-white">{karmicLesson.theme}</p>
            </div>
            <div>
              <p className="text-indigo-300 text-sm">Sacred Mantra</p>
              <p className="text-white font-medium italic">{karmicLesson.mantra}</p>
            </div>
            <div>
              <p className="text-indigo-300 text-sm">Focus</p>
              <p className="text-white text-sm">{karmicLesson.focus}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Planetary Information */}
      <div className="mb-6">
        <div className="bg-indigo-950/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{dailyCorr.symbol}</span>
            <span className="text-white font-medium">{dailyCorr.planet}'s Day</span>
          </div>
          <p className="text-indigo-200 text-sm">{dailyCorr.influence}</p>
        </div>
      </div>
    </div>
  );
}