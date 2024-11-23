export const moonPhases = [
  {
    date: "2024-11-14",
    phase: "New Moon",
    symbol: "🌑",
    ritual: "Setting intentions and new beginnings",
    meaning: "A time for planting seeds of intention and starting fresh"
  },
  {
    date: "2024-11-21",
    phase: "First Quarter",
    symbol: "🌓",
    ritual: "Taking action and overcoming challenges",
    meaning: "A time of growth and forward momentum"
  },
  {
    date: "2024-11-28",
    phase: "Full Moon (Beaver Moon)",
    symbol: "🌕",
    ritual: "Harvesting and celebrating achievements",
    meaning: "A time of culmination and manifestation"
  },
  {
    date: "2024-12-07",
    phase: "Last Quarter",
    symbol: "🌗",
    ritual: "Release and reflection",
    meaning: "A time of letting go and processing"
  }
] as const;

export const celestialEvents = [
  {
    date: "2024-11-14",
    event: "New Moon in Scorpio",
    type: "lunar",
    description: "Powerful time for transformation and setting deep intentions"
  },
  {
    date: "2024-11-21",
    event: "Jupiter Opposition",
    type: "planetary",
    description: "Expansion of consciousness and spiritual growth"
  },
  {
    date: "2024-11-28",
    event: "Full Beaver Moon",
    type: "lunar",
    description: "Time of preparation and gathering resources"
  }
] as const;

export const monthlyCorrespondences = {
  "November": {
    "Zodiac": "Scorpio/Sagittarius",
    "Element & House": "Water & Transformation / Fire & Philosophy",
    "Crystals": ["Topaz", "Citrine", "Malachite"],
    "Colors": ["Deep Red", "Black", "Orange"],
    "Trees": ["Pine", "Cypress", "Elder"],
    "Flowers": ["Chrysanthemum", "Amaranth"],
    "Animals": ["Snake", "Wolf", "Owl"],
    "Herbs & Oils": ["Sage", "Myrrh", "Cedar"],
    "Deities": ["Hecate", "Kali"],
    "Tarot": "Death",
    "Numerology": "11",
    "Themes & Energies": ["Transformation", "Mystery", "Inner Work"],
    "Festivals": ["Samhain", "Day of the Dead"],
    "Historical & Cultural Practices": "Ancestor veneration, divination",
    "Affirmations": "I embrace transformation and trust in the cycles of life.",
    "Mantra": "Om Kali Ma",
    "Planetary_Movements": {
      "Jupiter": "Opposition on November 21st",
      "Mars": "Direct in Sagittarius"
    },
    "Lunar_Phases": {
      "New Moon": "November 14th",
      "Full Moon": "November 28th (Beaver Moon)"
    }
  }
} as const;

export const dailyKarmicLessons = {
  Monday: {
    lesson: "Love and Nourishment",
    theme: "Renunciation",
    mantra: "Om Somaya Namaha",
    focus: "Emotional healing and intuitive development"
  },
  Tuesday: {
    lesson: "Courage and Willpower",
    theme: "Transformation",
    mantra: "Om Mangalaya Namaha",
    focus: "Breaking through limitations and taking action"
  },
  Wednesday: {
    lesson: "Communication and Adaptability",
    theme: "Expression",
    mantra: "Om Buddhaya Namaha",
    focus: "Clear communication and mental agility"
  },
  Thursday: {
    lesson: "Wisdom and Expansion",
    theme: "Growth",
    mantra: "Om Brihaspataye Namaha",
    focus: "Learning and spiritual development"
  },
  Friday: {
    lesson: "Love and Harmony",
    theme: "Balance",
    mantra: "Om Shukraya Namaha",
    focus: "Relationships and creativity"
  },
  Saturday: {
    lesson: "Discipline and Responsibility",
    theme: "Structure",
    mantra: "Om Shanaischaraya Namaha",
    focus: "Setting boundaries and accepting limitations"
  },
  Sunday: {
    lesson: "Self-Expression and Vitality",
    theme: "Illumination",
    mantra: "Om Suryaya Namaha",
    focus: "Personal power and authentic expression"
  }
} as const;

export const dailyCorrespondences = {
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
} as const;