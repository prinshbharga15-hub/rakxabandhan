import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';

export const SoundToggle = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = soundManager.subscribe((state) => {
      setIsPlaying(state.isPlaying);
    });
    return unsubscribe;
  }, []);

  const handleToggle = () => {
    soundManager.togglePlay();
  };

  return (
    <button
      onClick={handleToggle}
      title={isPlaying ? 'Pause Festive Music' : 'Play Festive Music & Ragas'}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 border ${
        isPlaying
          ? 'bg-gradient-to-r from-red-100 to-amber-100 text-festive-crimson border-amber-300 shadow-sm ring-1 ring-festive-crimson/30'
          : 'bg-stone-100/90 text-stone-600 border-stone-300 hover:bg-amber-50'
      } ${className}`}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-festive-crimson animate-pulse" />
          <span className="hidden sm:inline">Playing Raga</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Play Festive Music</span>
        </>
      )}
    </button>
  );
};

export default SoundToggle;
