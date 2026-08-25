// Dedicated Raksha Bandhan Audio Controller
// Featuring: "Kon Halave Limbdi • Khamma Veera Ne" (Gujarati Mashup)

export const MUSIC_TRACKS = [
  {
    id: 'kon_halave_limbdi',
    title: 'Kon Halave Limbdi • Khamma Veera Ne',
    subtitle: 'Gujarati Raksha Bandhan Special Mashup',
    raga: 'Traditional Sibling Folk Anthem',
    src: '/audio/raksha_bandhan_theme.mp3'
  }
];

class SoundController {
  constructor() {
    this.audio = null;
    this.isMuted = false;
    this.isPlaying = false;
    this.currentTrackIndex = 0;
    this.volume = 0.65;
    this.currentTime = 0;
    this.duration = 0;
    this.listeners = new Set();
    this.audioContext = null;

    if (typeof window !== 'undefined') {
      this.initAudio();
    }
  }

  initAudio() {
    if (this.audio) return;
    this.audio = new Audio('/audio/raksha_bandhan_theme.mp3');
    this.audio.loop = true;
    this.audio.volume = this.volume;

    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.audio.currentTime;
      this.duration = this.audio.duration || 0;
      this.notify();
    });

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.notify();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.notify();
    });

    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      this.notify();
    });
  }

  initAudioContext() {
    if (!this.audioContext && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    }
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    // Trigger initial notification
    listener({
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      currentTrack: MUSIC_TRACKS[0],
      currentTrackIndex: 0,
      volume: this.volume,
      currentTime: this.currentTime,
      duration: this.duration
    });
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((fn) =>
      fn({
        isPlaying: this.isPlaying,
        isMuted: this.isMuted,
        currentTrack: MUSIC_TRACKS[0],
        currentTrackIndex: 0,
        volume: this.volume,
        currentTime: this.currentTime,
        duration: this.duration
      })
    );
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
    this.notify();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
  }

  play() {
    this.initAudio();
    this.initAudioContext();
    if (!this.audio) return;

    this.audio
      .play()
      .then(() => {
        this.isPlaying = true;
        this.isMuted = false;
        this.notify();
      })
      .catch((err) => {
        console.warn('Audio play request:', err.message);
      });
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
    }
    this.isPlaying = false;
    this.notify();
  }

  seek(time) {
    if (this.audio && Number.isFinite(time)) {
      this.audio.currentTime = time;
    }
  }

  selectTrack() {
    this.play();
  }

  nextTrack() {
    this.seek(0);
    this.play();
  }

  prevTrack() {
    this.seek(0);
    this.play();
  }

  // SFX: Resonant temple bell
  playBell() {
    if (this.isMuted) return;
    this.initAudioContext();
    if (!this.audioContext) return;

    const ctx = this.audioContext;
    const now = ctx.currentTime;
    [587.33, 1174.66, 1760.0, 2349.32].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      const vol = idx === 0 ? 0.25 : 0.1 / (idx + 1);
      gain.gain.setValueAtTime(vol * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 2.6);
    });
  }

  // SFX: Sparkling chime
  playChime() {
    if (this.isMuted) return;
    this.initAudioContext();
    if (!this.audioContext) return;

    const ctx = this.audioContext;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
    const now = ctx.currentTime;
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.08);
      gain.gain.setValueAtTime(0.16 * this.volume, now + index * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 1.3);
    });
  }

  // SFX: Celebratory Fanfare
  playFanfare() {
    if (this.isMuted) return;
    this.initAudioContext();
    if (!this.audioContext) return;

    const ctx = this.audioContext;
    const notes = [440, 554.37, 659.25, 880, 1108.73];
    const now = ctx.currentTime;
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);
      gain.gain.setValueAtTime(0.18 * this.volume, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 1.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 1.6);
    });
  }
}

export const soundManager = new SoundController();
