import React, { useState } from 'react';
import { Clock, Plus, Check, X } from 'lucide-react';

interface ScheduleItem {
  id: string;
  time: string;
  task: string;
  completed: boolean;
}

interface DailyScheduleProps {
  selectedDate: Date;
}

export default function DailySchedule({ selectedDate }: DailyScheduleProps) {
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [newTask, setNewTask] = useState('');
  const [newTime, setNewTime] = useState('09:00');

  const addTask = () => {
    if (newTask.trim()) {
      setScheduleItems([
        ...scheduleItems,
        {
          id: Date.now().toString(),
          time: newTime,
          task: newTask.trim(),
          completed: false
        }
      ].sort((a, b) => a.time.localeCompare(b.time)));
      setNewTask('');
    }
  };

  const toggleTask = (id: string) => {
    setScheduleItems(items =>
      items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const removeTask = (id: string) => {
    setScheduleItems(items => items.filter(item => item.id !== id));
  };

  return (
    <div className="bg-indigo-900/20 backdrop-blur-sm rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-indigo-300" />
        <h3 className="text-xl font-semibold text-white">Daily Schedule</h3>
      </div>

      {/* Add New Task */}
      <div className="mb-6">
        <div className="flex gap-2 mb-2">
          <input
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="bg-indigo-950/30 text-white rounded-lg px-3 py-2 w-24 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new task..."
            className="bg-indigo-950/30 text-white rounded-lg px-3 py-2 flex-1 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <button
            onClick={addTask}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Schedule Items */}
      <div className="space-y-2">
        {scheduleItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-2 p-2 rounded-lg ${
              item.completed ? 'bg-indigo-950/20' : 'bg-indigo-950/30'
            }`}
          >
            <button
              onClick={() => toggleTask(item.id)}
              className={`p-1 rounded-full ${
                item.completed ? 'text-green-400' : 'text-indigo-400'
              }`}
            >
              <Check className="w-4 h-4" />
            </button>
            <span className="text-indigo-200 text-sm w-16">{item.time}</span>
            <span className={`flex-1 text-white ${item.completed ? 'line-through opacity-50' : ''}`}>
              {item.task}
            </span>
            <button
              onClick={() => removeTask(item.id)}
              className="text-indigo-400 hover:text-indigo-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        {scheduleItems.length === 0 && (
          <p className="text-center text-indigo-300 text-sm py-4">
            No tasks scheduled for today
          </p>
        )}
      </div>
    </div>
  );
}