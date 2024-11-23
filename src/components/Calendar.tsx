import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { moonPhases, celestialEvents } from '../data/cosmicData';
import DayDetails from './DayDetails';

interface CalendarProps {
  onDateSelect: (date: Date) => void;
}

export default function Calendar({ onDateSelect }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [journalEntries, setJournalEntries] = useState<Record<string, string>>({});
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getMoonPhaseEmoji = (dateStr: string) => {
    const phase = moonPhases.find(mp => mp.date === dateStr);
    if (!phase) return null;
    
    switch (phase.phase) {
      case 'New Moon': return '🌑';
      case 'First Quarter': return '🌓';
      case 'Full Moon': return '🌕';
      case 'Last Quarter': return '🌗';
      case 'Blue Moon': return '🌕';
      default: return null;
    }
  };

  const days = Array.from({ length: getDaysInMonth(currentDate) }, (_, i) => i + 1);
  const firstDay = getFirstDayOfMonth(currentDate);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const hasEvent = (day: number) => {
    const dateStr = formatDate(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    return celestialEvents.some(ce => ce.date === dateStr);
  };

  const changeMonth = (increment: number) => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + increment));
    setCurrentDate(newDate);
    onDateSelect(newDate);
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(date);
    onDateSelect(date);
  };

  const handleSaveJournal = (content: string) => {
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      setJournalEntries(prev => ({ ...prev, [dateStr]: content }));
    }
  };

  return (
    <>
      <div className="bg-indigo-900/20 backdrop-blur-sm rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={() => changeMonth(-1)}
            className="text-white hover:text-indigo-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="text-xl font-semibold text-white">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <button 
            onClick={() => changeMonth(1)}
            className="text-white hover:text-indigo-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day, index) => (
            <div key={`weekday-${index}`} className="text-indigo-200 text-center text-sm py-1">
              {day[0]}
            </div>
          ))}
          {blanks.map((blank) => (
            <div key={`blank-${blank}`} className="aspect-square" />
          ))}
          {days.map((day) => {
            const dateStr = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
            const moonPhaseEmoji = getMoonPhaseEmoji(dateStr);
            const hasSpecialEvent = hasEvent(day);
            const hasJournal = journalEntries[dateStr];
            
            return (
              <button
                key={`day-${day}`}
                onClick={() => handleDateClick(day)}
                className={`
                  aspect-square flex flex-col items-center justify-center text-white 
                  hover:bg-indigo-500/20 rounded-lg text-sm relative
                  ${moonPhaseEmoji ? 'bg-indigo-600/30' : ''}
                  ${hasSpecialEvent ? 'ring-2 ring-yellow-500/50' : ''}
                  ${hasJournal ? 'font-bold' : ''}
                `}
              >
                <span>{day}</span>
                {moonPhaseEmoji && (
                  <span className="text-xs mt-1">{moonPhaseEmoji}</span>
                )}
                {(hasSpecialEvent || hasJournal) && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-yellow-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <DayDetails
          date={selectedDate}
          onClose={() => setSelectedDate(null)}
          onSaveJournal={handleSaveJournal}
          journalContent={journalEntries[selectedDate.toISOString().split('T')[0]]}
        />
      )}
    </>
  );
}