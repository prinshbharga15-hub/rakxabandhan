import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager, MUSIC_TRACKS } from '../../utils/soundEffects';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Music,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const unsubscribe = soundManager.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setVolume(state.volume);
      setCurrentTime(state.currentTime);
      setDuration(state.duration);
    });
    return unsubscribe;
  }, []);

  const track = MUSIC_TRACKS[0];

  const handleTogglePlay = () => {
    soundManager.togglePlay();
  };

  const handleRestart = () => {
    soundManager.seek(0);
    soundManager.play();
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundManager.setVolume(val);
  };

  const handleSeek = (e) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    soundManager.seek(val);
  };

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border-2 border-amber-300 shadow-2xl p-3 md:p-3.5 flex flex-col gap-2.5 max-w-sm transition-all duration-300">
        
        {/* Main Player Bar */}
        <div className="flex items-center gap-3">
          {/* Animated Disc Play/Pause Button */}
          <button
            onClick={handleTogglePlay}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform active:scale-95 flex-shrink-0 ${
              isPlaying
                ? 'bg-gradient-to-br from-festive-crimson to-festive-gold shadow-gold-glow animate-pulse'
                : 'bg-gradient-to-br from-amber-400 to-festive-gold hover:opacity-95'
            }`}
            title={isPlaying ? 'Pause Festive Anthem' : 'Play Kon Halave Limbdi Track'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-white" />
            ) : (
              <Play className="w-5 h-5 fill-white ml-0.5" />
            )}
          </button>

          {/* Track Info */}
          <div
            className="min-w-0 flex-1 cursor-pointer select-none"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-festive-saffron">
                Festive Track 🎵
              </span>
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-full bg-festive-crimson rounded-full animate-bounce" />
                  <span className="w-0.5 h-2 bg-festive-gold rounded-full animate-pulse" />
                  <span className="w-0.5 h-3 bg-festive-saffron rounded-full animate-bounce" />
                </div>
              )}
            </div>
            <h4 className="text-xs md:text-sm font-bold text-festive-dark truncate">
              {track.title}
            </h4>
            <p className="text-[10px] text-stone-500 truncate">
              {track.subtitle}
            </p>
          </div>

          {/* Controls: Restart & Expand */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleRestart}
              className="p-1.5 rounded-full hover:bg-amber-100 text-stone-600 transition-colors"
              title="Replay from start"
            >
              <RotateCcw className="w-4 h-4 text-festive-crimson" />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-full hover:bg-amber-100 text-stone-600 transition-colors"
              title={isExpanded ? 'Collapse' : 'Expand Audio Controls'}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Expanded Controls: Progress Bar & Volume */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-2 border-t border-amber-200/80 space-y-2 overflow-hidden"
            >
              {/* Progress Slider */}
              <div className="space-y-1">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.5"
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-amber-100 rounded-lg appearance-none cursor-pointer accent-festive-crimson"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-2 px-1 pt-1">
                <Volume2 className="w-3.5 h-3.5 text-stone-500 flex-shrink-0" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1.5 bg-amber-100 rounded-lg appearance-none cursor-pointer accent-festive-crimson"
                />
                <span className="text-[10px] text-stone-500 font-mono w-6 text-right">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MusicPlayer;
