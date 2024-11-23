import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

interface AstroTimesProps {
  latitude?: number;
  longitude?: number;
}

interface CelestialTimes {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
}

export default function AstroTimes({ latitude = 40.7128, longitude = -74.0060 }: AstroTimesProps) {
  const [times, setTimes] = useState<CelestialTimes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const calculateTimes = () => {
      const date = new Date();
      // Using approximate calculations for demo
      // In production, use precise astronomical calculations or an API
      const baseTime = date.getTime();
      const day = 24 * 60 * 60 * 1000;
      
      // Simplified calculation based on latitude
      const dayLength = 12 + (latitude / 90) * 4; // Hours of daylight
      const nightLength = 24 - dayLength;
      
      const sunriseTime = new Date(baseTime);
      sunriseTime.setHours(6 + (latitude > 0 ? -1 : 1), 30, 0);
      
      const sunsetTime = new Date(baseTime);
      sunsetTime.setHours(18 + (latitude > 0 ? 1 : -1), 30, 0);
      
      const moonriseTime = new Date(baseTime);
      moonriseTime.setHours(20, 45, 0);
      
      const moonsetTime = new Date(baseTime);
      moonsetTime.setHours(8, 15, 0);

      setTimes({
        sunrise: sunriseTime.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        }),
        sunset: sunsetTime.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        }),
        moonrise: moonriseTime.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        }),
        moonset: moonsetTime.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        })
      });
      setLoading(false);
    };

    calculateTimes();
    const interval = setInterval(calculateTimes, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [latitude, longitude]);

  if (loading) {
    return (
      <div className="animate-pulse flex gap-4">
        <div className="h-4 w-24 bg-indigo-200/20 rounded"></div>
        <div className="h-4 w-24 bg-indigo-200/20 rounded"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <Sun className="w-4 h-4 text-yellow-400" />
        <div className="text-sm">
          <span className="text-indigo-200">↑</span>{' '}
          <span className="text-white">{times?.sunrise}</span>
          <span className="mx-2 text-indigo-400">|</span>
          <span className="text-indigo-200">↓</span>{' '}
          <span className="text-white">{times?.sunset}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Moon className="w-4 h-4 text-indigo-200" />
        <div className="text-sm">
          <span className="text-indigo-200">↑</span>{' '}
          <span className="text-white">{times?.moonrise}</span>
          <span className="mx-2 text-indigo-400">|</span>
          <span className="text-indigo-200">↓</span>{' '}
          <span className="text-white">{times?.moonset}</span>
        </div>
      </div>
    </div>
  );
}