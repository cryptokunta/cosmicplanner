import React, { useState, useEffect } from 'react';
import { Moon, ChevronLeft, ChevronRight } from 'lucide-react';
import { moonPhases } from '../data/cosmicData';

interface MoonPhaseProps {
  selectedDate?: Date;
}

export default function MoonPhase({ selectedDate = new Date() }: MoonPhaseProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [countdown, setCountdown] = useState<string>('');

  useEffect(() => {
    // Find the current phase based on today's date
    const now = new Date();
    const currentPhaseIndex = moonPhases.findIndex(phase => {
      const phaseDate = new Date(phase.date);
      return phaseDate >= now;
    });
    
    if (currentPhaseIndex !== -1) {
      setCurrentSlide(currentPhaseIndex);
    }
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const currentPhaseDate = new Date(moonPhases[currentSlide].date);
      const nextPhaseIndex = (currentSlide + 1) % moonPhases.length;
      const nextPhaseDate = new Date(moonPhases[nextPhaseIndex].date);
      
      // Calculate days between phases
      const daysUntilNext = Math.ceil((nextPhaseDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysUntilNext > 0) {
        setCountdown(`${daysUntilNext} days`);
      } else {
        setCountdown('Today');
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [currentSlide]);

  const currentPhase = moonPhases[currentSlide];
  const nextPhase = moonPhases[(currentSlide + 1) % moonPhases.length];

  return (
    <div className="bg-indigo-900/20 backdrop-blur-sm rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => setCurrentSlide((prev) => (prev - 1 + moonPhases.length) % moonPhases.length)}
          className="text-indigo-200 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <span className="text-4xl mb-2 block">
            {currentPhase.symbol}
          </span>
          <h3 className="text-xl font-semibold text-white">
            {currentPhase.phase}
          </h3>
          <p className="text-sm text-indigo-200 mt-1">
            {new Date(currentPhase.date).toLocaleDateString('en-US', { 
              month: 'short',
              day: 'numeric'
            })}
          </p>
        </div>
        <button 
          onClick={() => setCurrentSlide((prev) => (prev + 1) % moonPhases.length)}
          className="text-indigo-200 hover:text-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Phase Meaning */}
      <div className="text-center mb-6">
        <p className="text-indigo-100 text-sm">
          {currentPhase.meaning}
        </p>
      </div>

      {/* Countdown to Next Phase */}
      <div className="text-center mb-6">
        <p className="text-indigo-200 text-sm">Next Phase: {nextPhase.phase}</p>
        <p className="text-white font-bold">{countdown}</p>
      </div>

      {/* All Phases Overview */}
      <div className="grid grid-cols-4 gap-2">
        {moonPhases.map((phase, index) => (
          <button
            key={phase.date}
            onClick={() => setCurrentSlide(index)}
            className={`text-center p-2 rounded-lg transition-all ${
              currentSlide === index 
                ? 'bg-indigo-500/30 text-white' 
                : 'text-indigo-200 hover:bg-indigo-500/20'
            }`}
          >
            <div className="text-2xl mb-1">{phase.symbol}</div>
            <div className="text-xs">
              {new Date(phase.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </div>
          </button>
        ))}
      </div>

      {/* Ritual */}
      <div className="text-center mt-6 pt-4 border-t border-indigo-800/50">
        <p className="text-indigo-200 text-sm mb-2">Ritual</p>
        <p className="text-white text-sm">
          {currentPhase.ritual}
        </p>
      </div>
    </div>
  );
}