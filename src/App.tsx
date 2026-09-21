import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import {
  Heart, Star, Clock, MapPin, MessageCircle, Phone, Coffee, Book,
  Terminal, Play, Pause, Image as ImageIcon, ChevronRight, X, Sparkles, ChevronDown, Music,
  SkipForward, SkipBack, Minimize2, Quote, Volume2, VolumeX, RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import photo1 from './assets/photo1.jpeg';
import photo2 from './assets/photo2.jpeg';
import photo3 from './assets/photo3.jpeg';
import photo4 from './assets/photo4.jpeg';
import photo5 from './assets/photo5.jpeg';
import photo6 from './assets/photo6.jpeg';
import { SongPage, dedicatedSongs } from './components/SongPage';

// --- Types ---
type SectionProps = {
  children: React.ReactNode;
  id?: string;
  className?: string;
};

interface Song {
  id: number;
  title: string;
  artist: string;
  cover: string;
  theme: string;
  src: string;
}

interface TimelineEvent {
  icon: React.ReactNode;
  title: string;
  desc: string;
  date: string;
}

// --- Data ---
const playlist: Song[] = [
  {
    id: 1,
    title: "Raabta (Kehte Hain Khuda)",
    artist: "Arijit Singh",
    cover: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=300",
    theme: "from-rose-500 to-pink-600",
    src: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3"
  },
  {
    id: 2,
    title: "Until I Found You",
    artist: "Stephen Sanchez",
    cover: "https://images.unsplash.com/photo-1518599904199-0ca897819ddb?auto=format&fit=crop&q=80&w=300",
    theme: "from-amber-500 to-rose-500",
    src: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=love-story-piano-version-10904.mp3"
  },
  {
    id: 3,
    title: "Tum Se Hi",
    artist: "Mohit Chauhan",
    cover: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&q=80&w=300",
    theme: "from-purple-500 to-pink-600",
    src: "https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f772dd.mp3?filename=acoustic-guitar-love-123276.mp3"
  },
  {
    id: 4,
    title: "Perfect",
    artist: "Ed Sheeran",
    cover: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=300",
    theme: "from-rose-600 to-orange-500",
    src: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=tender-feeling-10499.mp3"
  }
];

// Fallback pleasant melodic chime synthesizer in case audio network request is blocked
const playChimeFallback = (freq = 440) => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1.2);
  } catch {
    // audio context ignored if blocked
  }
};

const triggerConfettiExplosion = () => {
  try {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#d946ef', '#a855f7', '#fbbf24', '#ffffff']
    });
  } catch {
    // fallback gracefully
  }
};

const AmbientBackground: React.FC = () => {
  // Precompute stardust values with useMemo so re-renders are 100% deterministic
  const stardust = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: (i * 4.2 + 2) % 96,
      scale: 0.35 + ((i % 5) * 0.12),
      duration: 18 + (i % 8) * 2,
      delay: (i % 6) * 1.5,
      isStar: i % 3 === 0
    }));
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden bg-[#0a0510] pointer-events-none">
      {/* Romantic Animated Glow Orbs */}
      <motion.div
        animate={{ x: [0, 80, -40, 0], y: [0, -80, 40, 0], scale: [1, 1.15, 0.9, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-rose-900/25 blur-[130px]"
      />
      <motion.div
        animate={{ x: [0, -80, 70, 0], y: [0, 80, -70, 0], scale: [1, 1.25, 0.95, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-[65vw] h-[65vw] rounded-full bg-purple-900/25 blur-[150px]"
      />
      <motion.div
        animate={{ x: [0, 40, -80, 0], y: [0, 110, -40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[25%] left-[35%] w-[45vw] h-[45vw] rounded-full bg-pink-900/20 blur-[120px]"
      />

      {/* Floating Stardust and Petals */}
      {stardust.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-rose-300/30"
          initial={{
            y: "105vh",
            x: `${item.x}vw`,
            scale: item.scale,
            rotate: 0
          }}
          animate={{
            y: "-10vh",
            rotate: 360,
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "linear",
            delay: item.delay
          }}
        >
          {item.isStar ? (
            <Star size={20} fill="currentColor" />
          ) : (
            <Heart fill="currentColor" size={22} />
          )}
        </motion.div>
      ))}
    </div>
  );
};

const GlassCard = ({
  children,
  className = '',
  hover = true
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) => (
  <motion.div
    whileHover={hover ? { y: -4, scale: 1.01 } : {}}
    transition={{ type: "spring", stiffness: 320, damping: 25 }}
    className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(225,29,72,0.15)] relative overflow-hidden group isolate ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    {children}
  </motion.div>
);

const Section = ({ children, id, className = '' }: SectionProps) => (
  <section id={id} className={`min-h-screen relative flex flex-col justify-center py-20 sm:py-24 px-4 sm:px-8 md:px-16 lg:px-24 overflow-hidden z-10 ${className}`}>
    {children}
  </section>
);

const SpotifyPlayer: React.FC<{
  onOpenSongPage?: (id: 'perfect' | 'raabta' | 'until-i-found-you') => void;
}> = ({ onOpenSongPage }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hasAudioError, setHasAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const song = playlist[currentSong];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setHasAudioError(false);
            })
            .catch(() => {
              setHasAudioError(true);
              setIsPlaying(false);
              playChimeFallback(523.25);
            });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentSong((prev) => (prev + 1) % playlist.length);
    setProgress(0);
    setIsPlaying(true);
    playChimeFallback(659.25);
  }, []);

  const handlePrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSong((prev) => (prev - 1 + playlist.length) % playlist.length);
    setProgress(0);
    setIsPlaying(true);
    playChimeFallback(587.33);
  }, []);

  const togglePlay = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    if (nextState) {
      playChimeFallback(523.25);
    }
  }, [isPlaying]);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      const pct = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(pct);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!audioRef.current || !audioRef.current.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
    audioRef.current.currentTime = newProgress * audioRef.current.duration;
    setProgress(newProgress * 100);
  };

  return (
    <motion.aside
      layout
      aria-label="Romantic Spotify Player"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-[#120a1c]/95 backdrop-blur-2xl border border-rose-500/20 rounded-2xl shadow-[0_12px_45px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-300 max-w-[calc(100vw-2rem)] ${isExpanded ? 'w-80 sm:w-96' : 'w-72 sm:w-80'
        }`}
    >
      <audio
        ref={audioRef}
        src={song.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => handleNext()}
        onError={() => setHasAudioError(true)}
      />

      {/* Mini Player Bar */}
      <div
        className="p-3 flex items-center gap-3 cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        aria-label={isExpanded ? "Collapse music player" : "Expand music player"}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsExpanded(!isExpanded); }}
      >
        <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-md border border-white/10">
          <img
            src={song.cover}
            alt={`${song.title} album art`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {isPlaying && (
            <div className="absolute inset-0 bg-black/45 flex items-center justify-center gap-0.5">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{ height: ['25%', '85%', '25%'] }}
                  transition={{ repeat: Infinity, duration: 0.7, delay: i * 0.18 }}
                  className="w-1 bg-rose-300 rounded-full"
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-white font-bold text-sm truncate">{song.title}</h4>
          <p className="text-rose-200/70 text-xs truncate">{song.artist}</p>
          {hasAudioError && (
            <span className="text-[10px] text-amber-400 block truncate">Gentle chime active</span>
          )}
        </div>

        <div className="flex items-center gap-1 text-white">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause track" : "Play track"}
            className="p-2 hover:bg-rose-500/20 text-rose-300 hover:text-white rounded-full transition-colors"
          >
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
            aria-label={isExpanded ? "Minimize player" : "Expand player"}
            className="p-2 text-rose-200/60 hover:text-white rounded-full transition-colors"
          >
            <ChevronDown className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} size={18} />
          </button>
        </div>
      </div>

      {/* Progress Bar (Clickable) */}
      <div
        className="px-3 pb-2 cursor-pointer"
        onClick={handleSeek}
        role="progressbar"
        aria-label="Song progress"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="h-1 bg-white/15 rounded-full overflow-hidden relative">
          <div
            className={`h-full bg-gradient-to-r ${song.theme} transition-all duration-150`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Expanded Player View */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-rose-500/15 bg-gradient-to-b from-transparent to-black/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Controls */}
            <div className="flex items-center justify-between px-6 py-4 text-white">
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                className="text-rose-200/60 hover:text-white transition-colors"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <div className="flex items-center gap-5">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous song"
                  className="text-rose-200/70 hover:text-white transition-colors p-1"
                >
                  <SkipBack size={22} fill="currentColor" />
                </button>
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-rose-900/40"
                >
                  {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" className="ml-0.5" />}
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next song"
                  className="text-rose-200/70 hover:text-white transition-colors p-1"
                >
                  <SkipForward size={22} fill="currentColor" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (audioRef.current) audioRef.current.currentTime = 0;
                  setProgress(0);
                }}
                aria-label="Restart song"
                className="text-rose-200/60 hover:text-white transition-colors"
              >
                <RotateCcw size={18} />
              </button>
            </div>

            {/* Playlist Queue */}
            <div className="px-4 pb-4 max-h-44 overflow-y-auto custom-scrollbar">
              <p className="text-[11px] text-rose-300/60 font-bold mb-2 uppercase tracking-wider">Our Playlist</p>
              {playlist.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => { setCurrentSong(idx); setIsPlaying(true); }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') { setCurrentSong(idx); setIsPlaying(true); } }}
                  aria-label={`Play ${item.title} by ${item.artist}`}
                  className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-all ${currentSong === idx ? 'bg-rose-500/20 border border-rose-500/30' : 'hover:bg-white/5'
                    }`}
                >
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="w-9 h-9 rounded-lg object-cover shadow-sm"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs truncate ${currentSong === idx ? 'text-white font-bold' : 'text-rose-100/90 font-medium'}`}>
                      {item.title}
                    </p>
                    <p className="text-[11px] text-rose-300/50 truncate">{item.artist}</p>
                  </div>
                  {onOpenSongPage && (item.title.toLowerCase().includes('perfect') || item.title.toLowerCase().includes('raabta') || item.title.toLowerCase().includes('until')) && (
                    <button
                      type="button"
                      title="Open Dedicated Song & Lyrics Page"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (item.title.toLowerCase().includes('perfect')) onOpenSongPage('perfect');
                        else if (item.title.toLowerCase().includes('raabta')) onOpenSongPage('raabta');
                        else if (item.title.toLowerCase().includes('until')) onOpenSongPage('until-i-found-you');
                      }}
                      className="px-2 py-0.5 rounded-full text-[10px] bg-rose-500/30 hover:bg-rose-500 text-rose-200 hover:text-white border border-rose-400/30 transition-colors"
                    >
                      Lyrics Page ✨
                    </button>
                  )}
                  {currentSong === idx && <Music size={14} className="text-rose-400 animate-pulse" />}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
              aria-label="Close extended player"
              className="absolute top-2 right-2 p-1.5 text-rose-200/60 hover:text-white bg-black/40 hover:bg-black/70 backdrop-blur-md transition-all rounded-full"
            >
              <Minimize2 size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};

const Hero: React.FC = () => (
  <Section id="hero" className="items-center text-center">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative z-10 max-w-4xl mx-auto"
    >
      <motion.div
        animate={{ scale: [1, 1.08, 1], rotate: [0, 2, -2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="mb-6 inline-block relative"
      >
        <div className="absolute inset-0 bg-rose-500 blur-3xl opacity-35 rounded-full" />
        <Heart
          aria-hidden="true"
          className="w-20 h-20 sm:w-28 sm:h-28 text-rose-500 fill-rose-500 relative z-10 drop-shadow-[0_0_25px_rgba(225,29,72,0.6)]"
        />
      </motion.div>

      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6 shadow-sm">
        <Sparkles size={16} className="text-rose-400" />
        <span>For My Buggu · Jaanu · My Love</span>
      </div>

      <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-rose-100 via-pink-200 to-rose-400 drop-shadow-lg pb-2 leading-tight break-words">
        Happy Birthday<br />Pranshii <span className="text-rose-400 inline-block">💖 ✨</span>
      </h1>

      <p className="text-base sm:text-xl md:text-2xl text-rose-100/80 max-w-2xl mx-auto mb-10 font-light leading-relaxed px-4">
        A tiny corner of the universe crafted with love for my favorite person in the entire world.
      </p>

      <motion.button
        type="button"
        whileHover={{ scale: 1.04, boxShadow: "0 0 35px rgba(225,29,72,0.5)" }}
        whileTap={{ scale: 0.96 }}
        onClick={() => {
          document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
          triggerConfettiExplosion();
        }}
        aria-label="Start our journey timeline"
        className="px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 text-white rounded-full font-bold text-base sm:text-lg shadow-xl shadow-rose-900/50 transition-all flex items-center gap-3 mx-auto border border-rose-400/30"
      >
        <span>Start Our Journey</span>
        <ChevronDown className="animate-bounce" size={20} />
      </motion.button>
    </motion.div>
  </Section>
);

const timelineEvents: TimelineEvent[] = [
  {
    icon: <Book size={24} />,
    title: "Chapter 1: The Library",
    desc: "We met in the library. A quiet place for the beginning of our sweetest story. Two people surrounded by books, completely unaware that our favorite chapter had just begun.",
    date: "The Beginning"
  },
  {
    icon: <MessageCircle size={24} />,
    title: "Chapter 2: Reels & Late-Night Texts",
    desc: "Through Instagram reels, memes, and late-night WhatsApp chats. Every notification with your name on it instantly made my entire day brighter.",
    date: "Growing Closer"
  },
  {
    icon: <Phone size={24} />,
    title: "Chapter 3: The 4-Hour Morning Call",
    desc: "That morning we started talking and almost four hours passed like mere minutes. Neither of us wanted to hang up. That's when I knew my mornings belonged to you.",
    date: "The Realization"
  },
  {
    icon: <MapPin size={24} />,
    title: "Chapter 4: 16 August in Lucknow",
    desc: "16 August in Lucknow. The day you held my hand tightly. My heart raced, and that warm, reassuring touch became an everlasting memory.",
    date: "16 August"
  },
  {
    icon: <Heart size={24} fill="currentColor" />,
    title: "Chapter 5: My Safe Haven & Anchor",
    desc: "When I felt insecure and anxious about my future and career, you stayed. You listened without judgment, comforted me, reassured me, and gave me confidence.",
    date: "Always By My Side"
  },
  {
    icon: <Sparkles size={24} />,
    title: "Chapter 6: Today & Forever",
    desc: "Celebrating you, Pranshii. The most wonderful, kind, and deeply special girl I will ever know. Happy Birthday, my love! 💖✨",
    date: "Today"
  }
];

const OurStory: React.FC = () => (
  <Section id="story">
    <div className="max-w-5xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 sm:mb-24"
      >
        <span className="text-rose-400 font-bold text-xs sm:text-sm uppercase tracking-widest block mb-2">Our Beautiful Journey</span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-rose-50 mb-4 drop-shadow-md">Our Timeline</h2>
        <p className="text-lg sm:text-xl text-rose-200/70 font-light">Every single step that brought me home to you.</p>
      </motion.div>

      <div className="relative">
        {/* Timeline Center/Left Line */}
        <div className="absolute left-[26px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-500/20 via-rose-500/70 to-purple-500/20 rounded-full transform md:-translate-x-1/2" />

        {timelineEvents.map((event, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`relative flex items-center justify-between mb-16 sm:mb-20 last:mb-0 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                } flex-row group`}
            >
              <div className="hidden md:block w-[45%]" />

              {/* Timeline Center Node */}
              <div className="absolute left-0 md:left-1/2 w-13 h-13 sm:w-14 sm:h-14 bg-[#180922] border-3 sm:border-4 border-rose-500 rounded-full shadow-[0_0_20px_rgba(225,29,72,0.5)] flex items-center justify-center transform md:-translate-x-1/2 z-10 text-rose-300 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
                {event.icon}
              </div>

              {/* Card Container */}
              <div className="w-[calc(100%-65px)] ml-[65px] md:ml-0 md:w-[45%]">
                <GlassCard className="!p-6 sm:!p-8 group-hover:border-rose-400/50 transition-colors">
                  <span className="text-xs font-bold uppercase tracking-widest text-rose-400 mb-1.5 block">{event.date}</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-rose-50 mb-2 sm:mb-3">{event.title}</h3>
                  <p className="text-rose-200/80 leading-relaxed font-light text-sm sm:text-base">{event.desc}</p>
                </GlassCard>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </Section>
);

const specialTraits = [
  "You wake up early just to make sure I wake up on time.",
  "You never forget to ask whether I have eaten.",
  "You constantly motivate me to study and build my dreams.",
  "You cared about my career and future when I was overwhelmed.",
  "You listened to me with unconditional warmth and zero judgment.",
  "You supported me during my most insecure and doubtful moments.",
  "You made me feel truly understood, valued, and cherished.",
  "You send the cutest reels and share silly inside jokes.",
  "You believed in me even when I struggled to believe in myself.",
  "You became my peace, my safest place, and my favorite home."
];

const WhySpecial: React.FC = () => (
  <Section id="special" className="items-center justify-center">
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-center mb-14 sm:mb-20"
      >
        <span className="text-rose-400 font-bold text-xs sm:text-sm uppercase tracking-widest block mb-2">My Little Everyday Wonders</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-rose-50 mb-4 drop-shadow-md">Why You Are So Special</h2>
        <p className="text-base sm:text-lg text-rose-200/70 font-light max-w-xl mx-auto">It's in the quiet, selfless things you do effortlessly every single day.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {specialTraits.map((trait, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ delay: index * 0.04 }}
            className="bg-white/5 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-white/10 flex items-start gap-4 group hover:bg-white/10 hover:border-rose-500/35 transition-all duration-300 shadow-md"
          >
            <div className="bg-rose-500/20 p-2.5 rounded-2xl group-hover:bg-rose-500/40 transition-colors shrink-0 mt-0.5">
              <Heart size={18} className="text-rose-400 fill-rose-400/50" />
            </div>
            <p className="text-rose-100/90 text-sm sm:text-base font-medium leading-relaxed">{trait}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </Section>
);

const WrappedStat = ({
  title,
  value,
  icon,
  gradient
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  gradient: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.03, y: -4 }}
    transition={{ type: "spring", stiffness: 300 }}
    className={`bg-gradient-to-br ${gradient} p-[1px] rounded-[2rem] shadow-xl overflow-hidden group`}
  >
    <div className="bg-[#140a1d]/90 backdrop-blur-xl h-full p-6 sm:p-8 rounded-[2rem] flex flex-col items-center justify-center text-center transition-all group-hover:bg-[#140a1d]/75">
      <div className="bg-white/10 p-3.5 sm:p-4 rounded-2xl mb-4 shadow-sm text-rose-300 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="text-xs text-rose-200/70 uppercase tracking-widest font-bold mb-2">{title}</div>
      <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-rose-200">
        {value}
      </div>
    </div>
  </motion.div>
);

const PranshiiWrapped: React.FC = () => (
  <Section id="wrapped">
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 sm:mb-20"
      >
        <div className="inline-block px-5 py-1.5 bg-rose-500/20 text-rose-300 rounded-full font-bold tracking-widest text-xs mb-4 uppercase border border-rose-500/30 shadow-[0_0_15px_rgba(225,29,72,0.3)]">
          Birthday Edition · 2026
        </div>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-200 to-purple-300 drop-shadow-lg">
          Pranshii Wrapped
        </h2>
        <p className="text-rose-200/70 text-base sm:text-lg mt-3 font-light">The statistics of how much you mean to me.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
        <WrappedStat title="Favorite Human" value="Pranshii 💖" icon={<Heart size={32} fill="currentColor" />} gradient="from-rose-500 to-red-400" />
        <WrappedStat title="Best Notification" value="Her Message 💌" icon={<MessageCircle size={32} />} gradient="from-pink-500 to-purple-400" />
        <WrappedStat title="Best Alarm Clock" value="Buggu ⏰" icon={<Clock size={32} />} gradient="from-orange-400 to-rose-400" />
        <WrappedStat title="Safe Space" value="Her Warmth ☕" icon={<Coffee size={32} />} gradient="from-purple-500 to-pink-400" />
        <WrappedStat title="Lifetime Rank" value="#1 Forever 👑" icon={<Star size={32} fill="currentColor" />} gradient="from-amber-400 to-rose-400" />
        <WrappedStat title="Love & Smiles" value="∞ Infinity" icon={<Sparkles size={32} />} gradient="from-rose-600 to-pink-500" />
      </div>
    </div>
  </Section>
);

const OurAnthems: React.FC<{ onSelectSong: (id: 'perfect' | 'raabta' | 'until-i-found-you') => void }> = ({ onSelectSong }) => {
  const songs = [
    {
      id: 'perfect' as const,
      title: 'Perfect',
      artist: 'Ed Sheeran',
      tagline: 'Dancing in the dark with you',
      theme: 'from-amber-500/20 via-rose-500/20 to-pink-500/10',
      border: 'border-amber-500/30 hover:border-amber-400',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      cover: dedicatedSongs['perfect'].coverImage
    },
    {
      id: 'raabta' as const,
      title: 'Raabta',
      artist: 'Arijit Singh',
      tagline: 'Kehte hain khuda ne iss jahan mein...',
      theme: 'from-rose-500/20 via-pink-500/20 to-purple-500/10',
      border: 'border-rose-500/30 hover:border-rose-400',
      badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      cover: dedicatedSongs['raabta'].coverImage
    },
    {
      id: 'until-i-found-you' as const,
      title: 'Until I Found You',
      artist: 'Stephen Sanchez',
      tagline: 'I would never fall in love until I found her',
      theme: 'from-pink-500/20 via-purple-500/20 to-fuchsia-500/10',
      border: 'border-pink-500/30 hover:border-pink-400',
      badge: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      cover: dedicatedSongs['until-i-found-you'].coverImage
    }
  ];

  return (
    <Section id="anthems">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3">
            <Music size={15} />
            <span>Dedicated Love Anthems</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-rose-50 drop-shadow-md">
            The Songs of Our Hearts
          </h2>
          <p className="text-rose-200/75 text-sm sm:text-lg max-w-xl mx-auto mt-3">
            Three songs that hold the rhythm of my love for you. Tap any song to enter its dedicated full-page experience with lyrics &amp; music.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {songs.map((song) => (
            <motion.div
              key={song.id}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => onSelectSong(song.id)}
              className={`p-6 rounded-3xl bg-gradient-to-b ${song.theme} border ${song.border} backdrop-blur-xl shadow-xl cursor-pointer group relative overflow-hidden flex flex-col justify-between`}
            >
              <div className="relative z-10">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-5 border border-white/10 shadow-lg">
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-rose-500/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play size={20} fill="currentColor" className="ml-0.5" />
                    </div>
                  </div>
                </div>

                <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border mb-3 ${song.badge}`}>
                  Full Page Experience
                </span>

                <h3 className="text-2xl font-black text-white group-hover:text-rose-200 transition-colors">
                  {song.title}
                </h3>
                <p className="text-rose-200/70 text-sm font-medium mb-3">
                  {song.artist}
                </p>
                <p className="font-script text-rose-300 text-lg italic leading-snug">
                  "{song.tagline}"
                </p>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-rose-200 text-xs font-semibold">
                <span className="group-hover:text-white transition-colors">View Lyrics &amp; Video</span>
                <ChevronRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const galleryImages = [
  photo1,
  photo2,
  photo3,
  photo4,
  photo5,
  photo6
];

const PhotoGallery: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <Section id="gallery">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-rose-400 font-bold text-xs sm:text-sm uppercase tracking-widest block mb-2">Frames of Us</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-rose-50 drop-shadow-md">Captured Moments</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {galleryImages.map((imgSrc, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="aspect-square rounded-2xl sm:rounded-[2rem] overflow-hidden cursor-pointer relative group bg-white/5 border border-white/10 shadow-lg"
              onClick={() => setSelectedImg(imgSrc)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') setSelectedImg(imgSrc); }}
              aria-label={`View photo ${idx + 1}`}
            >
              <img
                src={imgSrc}
                alt={`Captured moment ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0510]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="p-3 rounded-full bg-black/40 backdrop-blur-md text-rose-300 border border-white/10">
                  <ImageIcon size={22} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0a0510]/95 flex items-center justify-center p-4 backdrop-blur-2xl"
            onClick={() => setSelectedImg(null)}
          >
            <button
              type="button"
              aria-label="Close photo preview"
              onClick={() => setSelectedImg(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 p-3 rounded-full transition-colors backdrop-blur-md"
            >
              <X size={24} />
            </button>
            <div
              className="max-w-2xl w-full bg-[#180b22] border border-rose-500/30 rounded-3xl overflow-hidden shadow-2xl p-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImg}
                alt="Captured moment preview"
                className="w-full max-h-[80vh] object-contain rounded-2xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};

const TerminalSection: React.FC = () => {
  const [step, setStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const lines = [
    { cmd: "find happiness", res: "Found in Pranshii's smile 💖" },
    { cmd: "who_is_my_favorite_person", res: "Pranshii (Babe, Buggu, Jaanu, My Love)" },
    { cmd: "check_career_anchor", res: "Reassured by Pranshii — she believed in me when no one else did." },
    { cmd: "calculate_love --target=Pranshii", res: "Error: Value exceeds limits -> ∞ (Infinity)" },
    { cmd: "birthday --wish", res: "Happy Birthday to the most special person in the world! 💖 ✨" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && step === 0) {
          const interval = setInterval(() => {
            setStep((prev) => {
              if (prev < lines.length) return prev + 1;
              clearInterval(interval);
              return prev;
            });
          }, 1400);
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [step, lines.length]);

  return (
    <Section id="terminal" className="items-center">
      <div className="w-full max-w-4xl mx-auto" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-rose-400 font-bold text-xs sm:text-sm uppercase tracking-widest block mb-2">Code & Affection</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-rose-50 flex items-center justify-center gap-3 drop-shadow-md">
            <Terminal size={36} className="text-rose-400" />
            <span>Developer Romantic</span>
          </h2>
        </motion.div>

        <GlassCard hover={false} className="!p-0 overflow-hidden bg-[#0d0617]/95 border-rose-500/25 shadow-[0_0_40px_rgba(225,29,72,0.15)]">
          <div className="bg-[#1a0e28] px-5 py-3.5 flex items-center gap-2.5 border-b border-rose-500/20">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm shadow-green-500/50" />
            <div className="text-rose-200/50 text-xs sm:text-sm font-mono mx-auto tracking-widest">akash@heart: ~</div>
          </div>

          <div className="p-6 sm:p-8 text-rose-100 min-h-[320px] font-mono text-sm sm:text-base leading-relaxed overflow-x-auto">
            {lines.slice(0, step).map((line, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="mb-5">
                <div className="flex items-center text-rose-300 mb-1.5 flex-wrap">
                  <span className="text-purple-400 font-bold mr-2">akash@heart:~$</span>
                  <span className="typing-text text-white font-semibold">{line.cmd}</span>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="pl-4 border-l-2 border-rose-500/50 ml-1 text-rose-200/90 py-0.5"
                >
                  {line.res}
                </motion.div>
              </motion.div>
            ))}
            {step <= lines.length && (
              <div className="flex items-center text-rose-300 mt-4">
                <span className="text-purple-400 font-bold mr-2">akash@heart:~$</span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-2.5 h-5 bg-rose-400 inline-block align-middle"
                />
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </Section>
  );
};

const FunnyMemory: React.FC = () => (
  <Section id="funny" className="items-center">
    <div className="w-full max-w-4xl mx-auto text-center">
      <motion.div
        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.15 }}
        transition={{ duration: 0.5 }}
        className="inline-block mb-8 bg-white/5 p-5 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-white/10 text-4xl sm:text-5xl"
      >
        <span role="img" aria-label="laughing and blushing">😂🙈</span>
      </motion.div>

      <div className="mb-8">
        <span className="text-rose-400 font-bold text-xs sm:text-sm uppercase tracking-widest block mb-2">Our Late-Night Moments</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-rose-50 drop-shadow-md">That One Sleepy Call...</h2>
      </div>

      <GlassCard className="text-left relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 !p-6 sm:!p-10">
        <Quote className="absolute top-4 left-4 text-rose-500/15 w-24 h-24 sm:w-32 sm:h-32 -z-10 rotate-180 pointer-events-none" />
        <p className="text-lg sm:text-2xl text-rose-100/90 leading-relaxed font-light relative z-10">
          The night when I was utterly exhausted, half-asleep, and saying random, hilarious things that made zero sense...
          <br /><br />
          And you? You simply stayed on the call, listening patiently to every single ridiculous word, giggling with me. That's when I knew for certain: I found the person who truly embraces my weirdness and turns it into pure warmth.
        </p>
      </GlassCard>
    </div>
  </Section>
);

const EmotionalSection: React.FC = () => (
  <Section id="emotional" className="bg-[#120818]/90 text-rose-50 rounded-[2.5rem] sm:rounded-[3rem] mx-2 sm:mx-8 md:mx-12 my-16 sm:my-24 overflow-hidden border border-rose-900/50 shadow-[0_0_50px_rgba(225,29,72,0.18)] backdrop-blur-2xl relative">
    <div className="absolute inset-0 bg-gradient-to-b from-rose-900/15 to-transparent pointer-events-none" />
    <div className="w-full max-w-4xl mx-auto z-10 text-center relative py-12 sm:py-16 px-4 sm:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Heart className="w-16 h-16 sm:w-20 sm:h-20 text-rose-500 fill-rose-500 mx-auto mb-8 drop-shadow-[0_0_40px_rgba(225,29,72,0.8)]" />
      </motion.div>

      <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-12 tracking-tight text-white drop-shadow-lg">
        The Moment I Needed You Most
      </h2>

      <div className="space-y-8 text-base sm:text-xl md:text-2xl font-light leading-relaxed text-rose-100/90 max-w-3xl mx-auto">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          There was a time when I felt deeply anxious and insecure about my career, future, and direction. I was overthinking constantly, doubting every move.
        </motion.p>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <p className="text-rose-400 font-bold text-3xl sm:text-4xl my-8 drop-shadow-[0_0_15px_rgba(251,113,133,0.5)]">
            But you stayed.
          </p>
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          You listened with unconditional patience. You comforted me, reassured me, and made sure I never felt alone in my battles.
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
          You never judged me. You believed in me so fiercely that it gave me the courage to believe in myself again.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mt-12 pt-8 border-t border-rose-800/40"
        >
          You made me believe that everything was going to be okay. And with you, it always is.
        </motion.p>
      </div>
    </div>
  </Section>
);

const BirthdayLetter: React.FC = () => (
  <Section id="letter">
    <div className="w-full max-w-4xl mx-auto">
      <GlassCard className="!p-6 sm:!p-12 md:!p-16 relative bg-white/5 border border-white/20 shadow-[0_0_60px_rgba(225,29,72,0.12)]">
        <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 rounded-bl-[150px] blur-2xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-tr-[150px] blur-2xl -z-10 pointer-events-none" />

        <div className="mb-8">
          <span className="text-rose-400 font-bold text-xs sm:text-sm uppercase tracking-widest block mb-2">From My Heart To Yours</span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-rose-50 font-serif drop-shadow-md">
            Happy Birthday, Babe 💖 ✨
          </h2>
        </div>

        <div className="space-y-6 text-base sm:text-xl md:text-2xl text-rose-100/85 font-light leading-relaxed">
          <p>
            From the quiet morning we first met in the library, I never could have imagined how central you would become to my life. What started as simple Instagram reels and WhatsApp messages turned into the most meaningful connection I have ever known.
          </p>
          <p>
            I still replay that 4-hour morning conversation where seconds felt like heartbeats, and that unforgettable 16th of August in Lucknow when you held my hand tightly. That touch anchored me.
          </p>
          <p>
            Thank you for being the person who wakes up early just to wake me up, who always checks whether I have eaten, and who constantly motivates me to study and build my future. Your presence makes life softer, brighter, and infinitely more beautiful.
          </p>
          <p>
            No matter what life brings our way, or how tough the road may get, remember one thing: <strong>I will always choose you.</strong>
          </p>
          <p>
            You are my safe space, my Buggu, my Jaan, my Jaanu. I hope your birthday brings you as much happiness, joy, and peace as you bring to my life every day.
          </p>
          <p className="font-bold text-2xl sm:text-3xl pt-6 text-rose-300 drop-shadow-[0_0_10px_rgba(253,164,175,0.5)]">
            I love you endlessly, always and forever.
          </p>
        </div>
      </GlassCard>
    </div>
  </Section>
);

const SecretButton: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const messages = [
    "Do Not Click",
    "I warned you...",
    "Still clicking?",
    "Almost there...",
    "I Love You Buggu 💖 ✨"
  ];

  const handleClick = () => {
    const next = Math.min(clickCount + 1, messages.length - 1);
    setClickCount(next);
    playChimeFallback(440 + next * 80);
    if (next === messages.length - 1) {
      triggerConfettiExplosion();
    }
  };

  return (
    <Section id="secret" className="items-center justify-center min-h-[40vh] sm:min-h-[50vh]">
      <div className="text-center">
        <motion.div
          animate={clickCount > 0 ? { rotate: [0, -4, 4, -4, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <button
            type="button"
            onClick={handleClick}
            aria-live="polite"
            aria-label={messages[clickCount]}
            className={`px-8 sm:px-12 py-4 sm:py-6 rounded-full font-black text-lg sm:text-2xl transition-all duration-500 shadow-2xl ${clickCount === messages.length - 1
              ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white scale-110 shadow-[0_0_50px_rgba(225,29,72,0.6)]'
              : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }`}
          >
            {messages[clickCount]}
          </button>
        </motion.div>
        {clickCount === messages.length - 1 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-rose-300 text-sm sm:text-base mt-4 font-medium"
          >
            You unlocked the secret message! 💖
          </motion.p>
        )}
      </div>
    </Section>
  );
};

const FinalScreen: React.FC = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scale: [1, 1.15, 1],
      filter: [
        "drop-shadow(0 0 20px rgba(225,29,72,0.5))",
        "drop-shadow(0 0 50px rgba(225,29,72,0.8))",
        "drop-shadow(0 0 20px rgba(225,29,72,0.5))"
      ],
      transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
    });
  }, [controls]);

  return (
    <Section id="final" className="items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="z-10 bg-black/45 backdrop-blur-3xl p-8 sm:p-16 md:p-20 rounded-[2.5rem] sm:rounded-[3rem] shadow-[0_0_80px_rgba(225,29,72,0.25)] border border-white/10 max-w-4xl w-full mx-auto"
      >
        <motion.div animate={controls} className="mb-8 inline-block">
          <Heart className="w-20 h-20 sm:w-28 sm:h-28 text-rose-500 fill-rose-500" />
        </motion.div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-pink-200 to-rose-300 tracking-tight leading-tight">
          Happy Birthday<br />My Love 💖 ✨
        </h2>

        <div className="text-lg sm:text-2xl text-rose-200/85 font-light space-y-3 mb-12">
          <p>Thank you for making my life so infinitely better.</p>
          <p>Thank you for caring so deeply and selflessly.</p>
          <p>Thank you for being you.</p>
        </div>

        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            triggerConfettiExplosion();
          }}
          aria-label="Read from the beginning again"
          className="px-8 sm:px-10 py-4 sm:py-5 bg-white/10 text-white rounded-full font-bold text-base sm:text-lg shadow-sm hover:bg-white/20 transition-all mb-12 flex items-center gap-2 mx-auto border border-white/20 backdrop-blur-md hover:scale-105"
        >
          <span>Read Again</span>
          <ChevronRight size={20} />
        </button>

        <div className="pt-8 border-t border-white/10">
          <p className="text-rose-300/60 text-xs sm:text-sm font-medium tracking-widest uppercase leading-loose">
            Built with all my love, memories,<br />and a little bit of magic ✨<br />
            <span className="text-rose-400 font-bold mt-3 block text-base sm:text-lg drop-shadow-md">
              For Pranshii 💖 · Forever Yours, Akash
            </span>
          </p>
        </div>
      </motion.div>
    </Section>
  );
};

export default function App() {
  const [activeSongPage, setActiveSongPage] = useState<'perfect' | 'raabta' | 'until-i-found-you' | null>(null);

  // Sync with browser URL hash e.g. #song-perfect, #song-raabta, #song-until-i-found-you
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#song-perfect') {
        setActiveSongPage('perfect');
      } else if (hash === '#song-raabta') {
        setActiveSongPage('raabta');
      } else if (hash === '#song-until-i-found-you' || hash === '#song-until') {
        setActiveSongPage('until-i-found-you');
      } else if (!hash.startsWith('#song-')) {
        setActiveSongPage(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openSongPage = (id: 'perfect' | 'raabta' | 'until-i-found-you') => {
    setActiveSongPage(id);
    window.location.hash = `song-${id}`;
  };

  const closeSongPage = () => {
    setActiveSongPage(null);
    if (window.location.hash.startsWith('#song-')) {
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  };

  if (activeSongPage) {
    return (
      <SongPage
        songId={activeSongPage}
        onBack={closeSongPage}
        onSelectSong={(id) => openSongPage(id)}
      />
    );
  }

  return (
    <div className="bg-[#0a0510] text-rose-50 font-sans selection:bg-rose-500/30 selection:text-white min-h-screen overflow-x-hidden relative">
      <AmbientBackground />

      {/* Main Content with padding bottom so fixed audio player never obscures bottom section */}
      <main className="relative z-10 pb-36">
        <Hero />
        <OurStory />
        <WhySpecial />
        <PranshiiWrapped />
        <OurAnthems onSelectSong={openSongPage} />
        <PhotoGallery />
        <TerminalSection />
        <FunnyMemory />
        <EmotionalSection />
        <BirthdayLetter />
        <SecretButton />
        <FinalScreen />
      </main>

      {/* Floating Interactive Music Player with song page jump */}
      <SpotifyPlayer onOpenSongPage={openSongPage} />
    </div>
  );
}
