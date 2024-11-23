import React, { useState } from 'react';
import { BookOpen, Save } from 'lucide-react';

interface JournalEntryProps {
  selectedDate: Date;
}

export default function JournalEntry({ selectedDate }: JournalEntryProps) {
  const [entry, setEntry] = useState('');

  return (
    <div className="bg-indigo-900/20 backdrop-blur-sm rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-indigo-300" />
        <h3 className="text-xl font-semibold text-white">Cosmic Reflection</h3>
      </div>

      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        className="w-full h-40 bg-indigo-950/30 text-white rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none mb-4"
        placeholder="Write your cosmic thoughts here..."
      />

      <div className="flex justify-between items-center">
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
          <Save className="w-4 h-4" />
          Save Entry
        </button>
        <span className="text-indigo-300 text-sm">
          {entry.length} characters
        </span>
      </div>
    </div>
  );
}