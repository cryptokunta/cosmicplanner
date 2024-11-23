import React from 'react';
import { Sparkles } from 'lucide-react';
import { monthlyCorrespondences, celestialEvents } from '../data/cosmicData';

interface MonthlyCorrespondencesProps {
  selectedDate: Date;
}

export default function MonthlyCorrespondences({ selectedDate }: MonthlyCorrespondencesProps) {
  const currentMonth = selectedDate.toLocaleString('default', { month: 'long' });
  const defaultMonth = "August";
  const correspondences = monthlyCorrespondences[currentMonth as keyof typeof monthlyCorrespondences] 
    || monthlyCorrespondences[defaultMonth];

  const monthEvents = celestialEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === selectedDate.getMonth();
  });

  if (!correspondences) {
    return null;
  }

  return (
    <div className="bg-indigo-900/20 backdrop-blur-sm rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-indigo-300" />
        <h3 className="text-xl font-semibold text-white">Monthly Overview</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-indigo-200 font-medium mb-1">Zodiac</h4>
          <p className="text-white">{correspondences.Zodiac}</p>
        </div>

        <div>
          <h4 className="text-indigo-200 font-medium mb-1">Element & House</h4>
          <p className="text-white">{correspondences["Element & House"]}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-indigo-200 font-medium mb-1">Sacred Animals</h4>
            <p className="text-white">{correspondences.Animals.join(", ")}</p>
          </div>
          <div>
            <h4 className="text-indigo-200 font-medium mb-1">Sacred Trees</h4>
            <p className="text-white">{correspondences.Trees.join(", ")}</p>
          </div>
        </div>

        <div>
          <h4 className="text-indigo-200 font-medium mb-1">Key Events</h4>
          <div className="space-y-2">
            {monthEvents.map((event, index) => (
              <div key={index} className="text-sm">
                <span className="text-indigo-300">
                  {new Date(event.date).getDate()}: 
                </span>
                <span className="text-white ml-2">
                  {event.event}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-indigo-200 font-medium mb-1">Themes & Energies</h4>
          <p className="text-white">{correspondences["Themes & Energies"].join(", ")}</p>
        </div>

        <div>
          <h4 className="text-indigo-200 font-medium mb-1">Festivals</h4>
          <p className="text-white">{correspondences.Festivals.join(", ")}</p>
        </div>

        <div className="pt-4 border-t border-indigo-800">
          <h4 className="text-indigo-200 font-medium mb-1">Planetary Movements</h4>
          {Object.entries(correspondences.Planetary_Movements).map(([planet, event]) => (
            <div key={planet} className="text-sm text-white">
              {planet}: {event}
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-indigo-800">
          <h4 className="text-indigo-200 font-medium mb-1">Lunar Phases</h4>
          {Object.entries(correspondences.Lunar_Phases).map(([phase, date]) => (
            <div key={phase} className="text-sm text-white">
              {phase}: {date}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}