import React from 'react';
import { Compass } from 'lucide-react';

interface DailyGuide {
  planet: string;
  symbol: string;
  element: string;
  direction: string;
  color: string;
  crystal: string;
  animal: string;
  tree: string;
  activity: string;
  influence: string;
}

const dailyGuides: Record<string, DailyGuide> = {
  Sunday: {
    planet: "Sun",
    symbol: "☉",
    element: "Fire",
    direction: "East",
    color: "Gold",
    crystal: "Citrine",
    animal: "Lion",
    tree: "Oak",
    activity: "Self-care rituals",
    influence: "Vitality and leadership"
  },
  Monday: {
    planet: "Moon",
    symbol: "☽",
    element: "Water",
    direction: "West",
    color: "Silver",
    crystal: "Moonstone",
    animal: "Crab",
    tree: "Willow",
    activity: "Emotional healing",
    influence: "Intuition and emotions"
  },
  Tuesday: {
    planet: "Mars",
    symbol: "♂",
    element: "Fire",
    direction: "South",
    color: "Red",
    crystal: "Ruby",
    animal: "Wolf",
    tree: "Holly",
    activity: "Energy work",
    influence: "Courage and strength"
  },
  Wednesday: {
    planet: "Mercury",
    symbol: "☿",
    element: "Air",
    direction: "East",
    color: "Purple",
    crystal: "Amethyst",
    animal: "Raven",
    tree: "Ash",
    activity: "Communication",
    influence: "Wisdom and communication"
  },
  Thursday: {
    planet: "Jupiter",
    symbol: "♃",
    element: "Air",
    direction: "North",
    color: "Blue",
    crystal: "Sapphire",
    animal: "Eagle",
    tree: "Pine",
    activity: "Spiritual study",
    influence: "Expansion and abundance"
  },
  Friday: {
    planet: "Venus",
    symbol: "♀",
    element: "Earth",
    direction: "North",
    color: "Green",
    crystal: "Rose Quartz",
    animal: "Dove",
    tree: "Apple",
    activity: "Love rituals",
    influence: "Love and harmony"
  },
  Saturday: {
    planet: "Saturn",
    symbol: "♄",
    element: "Earth",
    direction: "West",
    color: "Black",
    crystal: "Obsidian",
    animal: "Crow",
    tree: "Yew",
    activity: "Grounding",
    influence: "Structure and boundaries"
  }
};

export default function DailyCorrespondences() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const guide = dailyGuides[today];

  return (
    <div className="bg-indigo-900/20 backdrop-blur-sm rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Compass className="w-5 h-5 text-indigo-300" />
        <h3 className="text-xl font-semibold text-white">Daily Alignments</h3>
      </div>

      {/* Planetary Information */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{guide.symbol}</span>
          <span className="text-white font-medium">{guide.planet}'s Day</span>
        </div>
        <p className="text-indigo-200 text-sm mt-1">{guide.influence}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mb-6">
        <div>
          <p className="text-indigo-200 mb-1">Element</p>
          <p className="text-white font-medium">{guide.element}</p>
        </div>
        <div>
          <p className="text-indigo-200 mb-1">Direction</p>
          <p className="text-white font-medium">{guide.direction}</p>
        </div>
        <div>
          <p className="text-indigo-200 mb-1">Color</p>
          <p className="text-white font-medium">{guide.color}</p>
        </div>
        <div>
          <p className="text-indigo-200 mb-1">Crystal</p>
          <p className="text-white font-medium">{guide.crystal}</p>
        </div>
      </div>

      {/* Sacred Animals and Trees */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-6">
        <div>
          <p className="text-indigo-200 mb-1">Sacred Animal</p>
          <p className="text-white font-medium">{guide.animal}</p>
        </div>
        <div>
          <p className="text-indigo-200 mb-1">Sacred Tree</p>
          <p className="text-white font-medium">{guide.tree}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-indigo-800">
        <p className="text-indigo-200 mb-1">Suggested Practice</p>
        <p className="text-white font-medium">{guide.activity}</p>
      </div>
    </div>
  );
}