import React from 'react';
import { Sparkles } from 'lucide-react';
import { monthlyCorrespondences } from '../data/cosmicData';

interface EnergyForecastProps {
  selectedDate: Date;
}

export default function EnergyForecast({ selectedDate }: EnergyForecastProps) {
  const month = selectedDate.toLocaleString('default', { month: 'long' });
  const monthData = monthlyCorrespondences[month as keyof typeof monthlyCorrespondences];

  return (
    <div className="bg-indigo-900/20 backdrop-blur-sm rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-indigo-300" />
        <h3 className="text-xl font-semibold text-white">Energy Forecast</h3>
      </div>

      {monthData && (
        <div className="space-y-6">
          <div>
            <h4 className="text-indigo-200 font-medium mb-2">Themes & Energies</h4>
            <div className="space-y-2">
              {monthData["Themes & Energies"].map((theme, index) => (
                <div
                  key={index}
                  className="bg-indigo-950/30 rounded-lg px-3 py-2 text-white"
                >
                  {theme}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-indigo-200 font-medium mb-2">Planetary Movements</h4>
            <div className="space-y-2">
              {Object.entries(monthData.Planetary_Movements).map(([planet, movement]) => (
                <div key={planet} className="text-sm">
                  <span className="text-indigo-300">{planet}:</span>{' '}
                  <span className="text-white">{movement}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-indigo-200 font-medium mb-2">Sacred Tools</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-indigo-300 mb-1">Crystals</p>
                <p className="text-white">{monthData.Crystals.join(", ")}</p>
              </div>
              <div>
                <p className="text-indigo-300 mb-1">Herbs & Oils</p>
                <p className="text-white">{monthData["Herbs & Oils"].join(", ")}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-indigo-800">
            <h4 className="text-indigo-200 font-medium mb-2">Monthly Festivals</h4>
            <div className="space-y-2">
              {monthData.Festivals.map((festival, index) => (
                <p key={index} className="text-white">
                  {festival}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}