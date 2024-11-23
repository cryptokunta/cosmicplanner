import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Timer } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  duration: number;
  url: string;
  type: 'meditation' | 'mantra';
}

const defaultTracks: Track[] = [
  {
    id: '1',
    title: 'Morning Meditation',
    duration: 600,
    url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    type: 'meditation'
  },
  {
    id: '2',
    title: 'Evening Peace',
    duration: 900,
    url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8395863.mp3',
    type: 'meditation'
  },
  {
    id: '3',
    title: 'Om Mantra',
    duration: 300,
    url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0c6ff1ecd.mp3',
    type: 'mantra'
  }
];

export default function MeditationPlayer() {
  const [tracks] = useState<Track[]>(defaultTracks);
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressInterval = useRef<number>();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }

    audioRef.current = new Audio(currentTrack.url);
    
    // Add error handling
    audioRef.current.onerror = () => {
      setError('Unable to load audio file');
      setIsPlaying(false);
    };

    // Reset error state when changing tracks
    setError(null);
    setProgress(0);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [currentTrack]);

  const handlePlayPause = () => {
    if (!audioRef.current || error) return;

    if (isPlaying) {
      audioRef.current.pause();
      if (progressInterval.current) clearInterval(progressInterval.current);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          setError('Playback failed. Please try again.');
          setIsPlaying(false);
        });
      }
      
      progressInterval.current = window.setInterval(() => {
        if (audioRef.current) {
          setProgress(audioRef.current.currentTime / audioRef.current.duration);
        }
      }, 100);
    }
    setIsPlaying(!isPlaying);
  };

  const handleTrackChange = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(false);
    setProgress(0);
    setError(null);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-indigo-900/20 backdrop-blur-sm rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Timer className="w-5 h-5 text-indigo-300" />
        <h3 className="text-lg font-semibold text-white">Meditation</h3>
      </div>

      {/* Track Info */}
      <div className="mb-3">
        <p className="text-sm text-indigo-200">{currentTrack.title}</p>
        {error && (
          <p className="text-red-400 text-xs mt-1">{error}</p>
        )}
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-indigo-200/20 rounded-full mb-3">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => handleTrackChange(tracks[(tracks.findIndex(t => t.id === currentTrack.id) - 1 + tracks.length) % tracks.length])}
          className="text-indigo-200 hover:text-white"
        >
          <SkipBack className="w-5 h-5" />
        </button>
        
        <button
          onClick={handlePlayPause}
          className={`p-3 rounded-full text-white ${
            error ? 'bg-indigo-500/50 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'
          }`}
          disabled={!!error}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>
        
        <button
          onClick={() => handleTrackChange(tracks[(tracks.findIndex(t => t.id === currentTrack.id) + 1) % tracks.length])}
          className="text-indigo-200 hover:text-white"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* Playlist */}
      <div className="space-y-1 max-h-32 overflow-y-auto">
        {tracks.map(track => (
          <button
            key={track.id}
            onClick={() => handleTrackChange(track)}
            className={`w-full text-left p-1.5 rounded text-sm ${
              currentTrack.id === track.id
                ? 'bg-indigo-500/30 text-white'
                : 'text-indigo-200 hover:bg-indigo-800/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="truncate mr-2">{track.title}</span>
              <span className="text-xs opacity-75">
                {formatTime(track.duration)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}