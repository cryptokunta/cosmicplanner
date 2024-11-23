import React, { useState } from 'react';
import { Moon } from 'lucide-react';
import Calendar from './components/Calendar';
import MoonPhase from './components/MoonPhase';
import JournalEntry from './components/JournalEntry';
import TrackingModule from './components/TrackingModule';
import DailyCorrespondences from './components/DailyCorrespondences';
import MeditationPlayer from './components/MeditationPlayer';
import AstroTimes from './components/AstroTimes';
import CosmicDashboard from './components/CosmicDashboard';
import DailySchedule from './components/DailySchedule';
import DeityAssociations from './components/DeityAssociations';
import EnergyForecast from './components/EnergyForecast';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Moon className="w-8 h-8 text-indigo-300" />
            <h1 className="text-3xl font-bold text-white">Cosmic Journal</h1>
          </div>
          <AstroTimes />
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Daily Information */}
          <div className="lg:col-span-3 space-y-6">
            <DailyCorrespondences selectedDate={selectedDate} />
            <MoonPhase selectedDate={selectedDate} />
            <MeditationPlayer />
          </div>

          {/* Center Column - Core Journal Content */}
          <div className="lg:col-span-6 space-y-6">
            <CosmicDashboard selectedDate={selectedDate} />
            <JournalEntry selectedDate={selectedDate} />
            <DailySchedule selectedDate={selectedDate} />
            <TrackingModule />
          </div>

          {/* Right Column - Monthly Overview */}
          <div className="lg:col-span-3 space-y-6">
            <Calendar onDateSelect={setSelectedDate} />
            <DeityAssociations selectedDate={selectedDate} />
            <EnergyForecast selectedDate={selectedDate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;