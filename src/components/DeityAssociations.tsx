import React from 'react';
import { Star } from 'lucide-react';
import { monthlyCorrespondences } from '../data/cosmicData';

interface DeityAssociationsProps {
  selectedDate: Date;
}

export default function DeityAssociations({ selectedDate }: DeityAssociationsProps) {
  const month = selectedDate.toLocaleString('default', { month: 'long' });
  const monthData = monthlyCorrespondences[month as keyof typeof monthlyCorrespondences];

  return (
    <div className="bg-indigo-900/20 backdrop-blur-sm rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Star className="w-5 h-5 text-indigo-300" />
        <h3 className="text-xl font-semibold text-white">Divine Guidance</h3>
      </div>

      {monthData && (
        <div className="space-y-6">
          <div>
            <h4 className="text-indigo-200 font-medium mb-2">Monthly Deities</h4>
            <div className="space-y-3">
              {monthData.Deities.map((deity, index) => (
                <div key={index} className="bg-indigo-950/30 rounded-lg p-3">
                  <p className="text-white font-medium">{deity}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-indigo-200 font-medium mb-2">Sacred Numbers</h4>
            <p className="text-white">{monthData.Numerology}</p>
          </div>

          <div>
            <h4 className="text-indigo-200 font-medium mb-2">Tarot Association</h4>
            <p className="text-white">{monthData.Tarot}</p>
          </div>

          <div className="pt-4 border-t border-indigo-800">
            <h4 className="text-indigo-200 font-medium mb-2">Cultural Practices</h4>
            <p className="text-white text-sm">
              {monthData["Historical & Cultural Practices"]}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}