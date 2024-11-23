import React from 'react';
import { Sparkles } from 'lucide-react';
import { monthlyCorrespondences } from '../data/cosmicData';

export default function MonthlyTheme() {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const defaultMonth = "August";
  const correspondences = monthlyCorrespondences[currentMonth as keyof typeof monthlyCorrespondences] 
    || monthlyCorrespondences[defaultMonth];

  if (!correspondences) {
    return (
      <div className="bg-indigo-900/20 backdrop-blur-sm rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-indigo-300" />
          <h3 className="text-xl font-semibold text-white">Monthly Correspondences</h3>
        </div>
        <p className="text-indigo-200">Loading correspondences...</p>
      </div>
    );
  }

  const mainCorrespondences = [
    { label: "Zodiac", value: correspondences.Zodiac },
    { label: "Element & House", value: correspondences["Element & House"] },
    { label: "Crystals", value: Array.isArray(correspondences.Crystals) 
      ? correspondences.Crystals.join(", ") 
      : correspondences.Crystals },
    { label: "Colors", value: Array.isArray(correspondences.Colors) 
      ? correspondences.Colors.join(", ") 
      : correspondences.Colors },
    { label: "Themes", value: Array.isArray(correspondences["Themes & Energies"]) 
      ? correspondences["Themes & Energies"].join(", ") 
      : correspondences["Themes & Energies"] }
  ];

  return (
    <div className="bg-indigo-900/20 backdrop-blur-sm rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-indigo-300" />
        <h3 className="text-xl font-semibold text-white">{currentMonth} Correspondences</h3>
      </div>
      
      <div className="space-y-4">
        {mainCorrespondences.map(({ label, value }) => (
          <div key={label}>
            <h4 className="text-indigo-200 font-medium mb-1">{label}</h4>
            <p className="text-white">{value}</p>
          </div>
        ))}
        
        <div className="mt-6 pt-4 border-t border-indigo-800">
          <h4 className="text-indigo-200 font-medium mb-2">Daily Affirmation</h4>
          <p className="text-white italic">"{correspondences.Affirmations}"</p>
        </div>
        
        <div className="mt-4">
          <h4 className="text-indigo-200 font-medium mb-2">Sacred Mantra</h4>
          <p className="text-white font-medium">{correspondences.Mantra}</p>
        </div>
      </div>
    </div>
  );
}