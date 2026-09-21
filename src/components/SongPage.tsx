import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, ExternalLink, Play, Pause, RotateCcw, Volume2, VolumeX, 
  Sparkles, Heart, Disc3, Share2, Check
} from 'lucide-react';

export interface DedicatedSongData {
  id: 'perfect' | 'raabta' | 'until-i-found-you';
  title: string;
  artist: string;
  subtitle: string;
  dedication: string;
  youtubeUrl: string;
  audioSrc: string;
  coverImage: string;
  themeGradient: string;
  accentColor: string;
  glowColor: string;
  lyrics: {
    section?: string;
    lines: string[];
    highlight?: boolean;
    note?: string;
  }[];
}

export const dedicatedSongs: Record<string, DedicatedSongData> = {
  'perfect': {
    id: 'perfect',
    title: 'Perfect',
    artist: 'Ed Sheeran',
    subtitle: 'Dancing in the dark with you between my arms',
    dedication: 'Every single time I look at you, I see my future. You are more than perfect to me, Buggu.',
    youtubeUrl: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
    audioSrc: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=tender-feeling-10499.mp3',
    coverImage: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=1200',
    themeGradient: 'from-amber-950/70 via-rose-950/80 to-[#0a0510]',
    accentColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    lyrics: [
      {
        section: "Verse 1",
        lines: [
          "I found a love for me",
          "Oh darling, just dive right in and follow my lead",
          "Well, I found a girl, beautiful and sweet",
          "Oh, I never knew you were the someone waiting for me"
        ]
      },
      {
        section: "Pre-Chorus",
        lines: [
          "'Cause we were just kids when we fell in love",
          "Not knowing what it was",
          "I will not give you up this time",
          "But darling, just kiss me slow",
          "Your heart is all I own",
          "And in your eyes, you're holding mine"
        ],
        highlight: true,
        note: "Every time we look at each other, nothing else in this world matters."
      },
      {
        section: "Chorus",
        lines: [
          "Baby, I'm dancing in the dark with you between my arms",
          "Barefoot on the grass, listening to our favourite song",
          "When you said you looked a mess, I whispered underneath my breath",
          "But you heard it, darling, you look perfect tonight"
        ],
        highlight: true,
        note: "To me, you are the most gorgeous person to ever exist."
      },
      {
        section: "Verse 2",
        lines: [
          "Well, I found a woman, stronger than anyone I know",
          "She shares my dreams, I hope that someday I'll share her home",
          "I found a lover, to carry more than just my secrets",
          "To carry love, to carry children of our own"
        ]
      },
      {
        section: "Bridge & Outro",
        lines: [
          "We are still kids, but we're so in love",
          "Fighting against all odds",
          "I know we'll be alright this time",
          "Darling, just hold my hand",
          "Be my girl, I'll be your man",
          "I see my future in your eyes",
          "Baby, I'm dancing in the dark with you between my arms...",
          "Now I know I have met an angel in person",
          "And she looks perfect, no I don't deserve this",
          "You look perfect tonight ✨"
        ],
        highlight: true,
        note: "Forever and always, Pranshii. 💖"
      }
    ]
  },
  'raabta': {
    id: 'raabta',
    title: 'Raabta (Kehte Hain Khuda)',
    artist: 'Arijit Singh · Agent Vinod',
    subtitle: 'Kuch toh hai tujhse raabta... kaise hum jaane hume kya pata',
    dedication: 'Our souls connected long before our eyes ever met in that library. You are my cosmic connection.',
    youtubeUrl: 'https://www.youtube.com/watch?v=z-diRzPVgu0',
    audioSrc: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3',
    coverImage: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1200',
    themeGradient: 'from-rose-950/80 via-purple-950/80 to-[#0a0510]',
    accentColor: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.45)',
    lyrics: [
      {
        section: "Opening",
        lines: [
          "Kehte hain khuda ne iss jahan mein sabhi ke liye",
          "Kisi na kisi ko hai banaya har kisi ke liye",
          "Tera milna hai uss rab ka ishaara maano",
          "Mujhko banaya tere jaise hi kisi ke liye"
        ],
        highlight: true,
        note: "Meeting you in Lucknow was not a coincidence. It was God answering my prayers."
      },
      {
        section: "Chorus",
        lines: [
          "Kuch toh hai tujhse raabta",
          "Kuch toh hai tujhse raabta",
          "Kaise hum jaane hume kya pata",
          "Kuch toh hai tujhse raabta"
        ],
        highlight: true
      },
      {
        section: "Verse 1",
        lines: [
          "Tu humsafar hai, phir kya fikar hai",
          "Jeene ki wajah hi yahi hai",
          "Marna bhi chahein toh mar na sakein hum",
          "Bole ke khuda yeh mera faisla hai"
        ]
      },
      {
        section: "Antara",
        lines: [
          "Meherbani jaate-jaate mujhpe kar gaya",
          "Guzarata sa lamha ek daaman bhar gaya",
          "Tera nazara mila, roshan sitara mila",
          "Taqdeer ki kashtiyon ko kinara mila"
        ],
        highlight: true,
        note: "You brought stillness and sunshine into every corner of my chaos."
      },
      {
        section: "Outro",
        lines: [
          "Saadgi mein bhi aisi taazgi hai teri",
          "Jaise subah ki pehli kiran khili ho",
          "Kuch toh hai tujhse raabta...",
          "Haan, rab ne banaya tujhe sirf mere liye ❤️"
        ],
        highlight: true,
        note: "Happy Birthday my whole world. 🌹"
      }
    ]
  },
  'until-i-found-you': {
    id: 'until-i-found-you',
    title: 'Until I Found You',
    artist: 'Stephen Sanchez',
    subtitle: 'I would never fall in love until I found her...',
    dedication: 'I used to believe I would wander alone, until the day you walked into my life and made it warm.',
    youtubeUrl: 'https://www.youtube.com/watch?v=GxldQ9GyXwo',
    audioSrc: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=love-story-piano-version-10904.mp3',
    coverImage: 'https://images.unsplash.com/photo-1518599904199-0ca897819ddb?auto=format&fit=crop&q=80&w=1200',
    themeGradient: 'from-fuchsia-950/80 via-pink-950/80 to-[#0a0510]',
    accentColor: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.45)',
    lyrics: [
      {
        section: "Verse 1",
        lines: [
          "Georgia, Wrap me up in all your...",
          "I want ya, in my arms",
          "Oh, let me hold ya",
          "I'll never let you go again, like I did",
          "Oh, I used to say..."
        ]
      },
      {
        section: "Chorus",
        lines: [
          "I would never fall in love until I found her",
          "I said, 'I would never fall, unless it's you I fall into'",
          "I was lost within the darkness, but then I found her",
          "I found you ✨"
        ],
        highlight: true,
        note: "Unless it's you, I would never fall. You are the only one, Pranshii."
      },
      {
        section: "Verse 2",
        lines: [
          "Heaven, when I held you again",
          "How could we ever just be friends?",
          "I would rather die than let you go",
          "Juliet to your Romeo",
          "How I heard you say..."
        ]
      },
      {
        section: "Chorus & Climax",
        lines: [
          "I would never fall in love until I found her",
          "I said, 'I would never fall, unless it's you I fall into'",
          "I was lost within the darkness, but then I found her",
          "I found you..."
        ],
        highlight: true
      },
      {
        section: "Outro",
        lines: [
          "I would never fall in love until I found her",
          "I was lost within the darkness, but then I found her",
          "I found you... my forever person. 💖"
        ],
        highlight: true,
        note: "16 August and forever beyond. ♾️"
      }
    ]
  }
};

interface SongPageProps {
  songId: 'perfect' | 'raabta' | 'until-i-found-you';
  onBack: () => void;
  onSelectSong: (id: 'perfect' | 'raabta' | 'until-i-found-you') => void;
}

export const SongPage: React.FC<SongPageProps> = ({ songId, onBack, onSelectSong }) => {
  const song = dedicatedSongs[songId] || dedicatedSongs['perfect'];
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeStanza, setActiveStanza] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Scroll to top upon song change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsPlaying(false);
    setProgress(0);
  }, [songId]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, songId]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const pct = (clickX / width) * 100;
    const duration = audioRef.current.duration || 1;
    audioRef.current.currentTime = (pct / 100) * duration;
    setProgress(pct);
  };

  const copyPageLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#song-${song.id}`;
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${song.themeGradient} text-rose-50 relative selection:bg-rose-500/30`}>
      {/* Hidden background audio for preview playback */}
      <audio
        ref={audioRef}
        src={song.audioSrc}
        onTimeUpdate={() => {
          if (audioRef.current && audioRef.current.duration) {
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
          }
        }}
        onEnded={() => {
          setIsPlaying(false);
          setProgress(0);
        }}
      />

      {/* Atmospheric Ambient Glows */}
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-4xl h-96 rounded-full blur-[140px] pointer-events-none opacity-40 z-0"
        style={{ backgroundColor: song.accentColor }}
      />
      
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0510]/70 border-b border-white/10 px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-rose-100 font-medium text-sm transition-all hover:-translate-x-1 shadow-md"
          >
            <ArrowLeft size={18} />
            <span>Back to Birthday Journey</span>
          </button>

          {/* Quick Song Switcher Pills */}
          <div className="hidden sm:flex items-center gap-2 bg-black/40 p-1.5 rounded-full border border-white/10">
            {(['perfect', 'raabta', 'until-i-found-you'] as const).map((id) => {
              const s = dedicatedSongs[id];
              const active = s.id === song.id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onSelectSong(id)}
                  className={`px-3 py-1 text-xs rounded-full font-semibold transition-all ${
                    active 
                      ? 'bg-rose-500 text-white shadow-lg' 
                      : 'text-rose-200/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {s.title.split(' ')[0]}
                </button>
              );
            })}
          </div>

          {/* YouTube Action Button */}
          <a
            href={song.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/90 hover:bg-red-600 text-white font-bold text-xs sm:text-sm transition-all hover:scale-105 shadow-lg shadow-red-950/40 border border-red-400/30"
          >
            <Disc3 size={16} className="animate-spin" />
            <span>Open in YouTube ↗</span>
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-10 sm:py-16 relative z-10">
        
        {/* Hero Section of the Song */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center mb-16">
          
          {/* Cover Art with Vinyl Rotation Effect */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-5 flex flex-col items-center"
          >
            <div className="relative group w-64 h-64 sm:w-80 sm:h-80">
              <div 
                className="absolute -inset-2 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                style={{ backgroundColor: song.accentColor }}
              />
              <img
                src={song.coverImage}
                alt={song.title}
                className="w-full h-full object-cover rounded-3xl relative z-10 shadow-2xl border border-white/20"
              />
              <div className="absolute inset-0 z-20 rounded-3xl bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
                <span className="text-xs font-bold uppercase tracking-widest text-rose-300">Dedication Anthem</span>
                <span className="text-white font-bold text-sm">Akash &amp; Pranshii</span>
              </div>
            </div>

            {/* In-Page Audio Player Control Bar */}
            <div className="w-full max-w-xs mt-6 bg-black/50 backdrop-blur-xl border border-white/15 p-4 rounded-2xl shadow-xl">
              <div 
                className="w-full h-2 bg-white/15 rounded-full cursor-pointer overflow-hidden mb-3"
                onClick={handleSeek}
              >
                <div 
                  className="h-full bg-gradient-to-r from-rose-500 to-amber-400 rounded-full transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.muted = !isMuted;
                      setIsMuted(!isMuted);
                    }
                  }}
                  className="p-2 text-rose-200/70 hover:text-white"
                  aria-label="Toggle mute"
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="w-12 h-12 rounded-full bg-rose-500 hover:bg-rose-400 text-white flex items-center justify-center shadow-lg shadow-rose-950 transition-all hover:scale-105"
                    aria-label={isPlaying ? "Pause preview" : "Play preview"}
                  >
                    {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" className="ml-0.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (audioRef.current) audioRef.current.currentTime = 0;
                      setProgress(0);
                    }}
                    className="p-2 text-rose-200/70 hover:text-white"
                    aria-label="Restart audio"
                  >
                    <RotateCcw size={18} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={copyPageLink}
                  className="p-2 text-rose-200/70 hover:text-white transition-colors relative"
                  title="Share this song page"
                  aria-label="Share song page"
                >
                  {copied ? <Check size={18} className="text-emerald-400" /> : <Share2 size={18} />}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Song Information & Love Dedication */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-7 text-center md:text-left space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-rose-300 text-xs font-semibold tracking-wider uppercase">
              <Sparkles size={14} className="text-rose-400" />
              <span>Full Page Music Experience</span>
            </div>

            <h1 className="font-romantic text-4xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-pink-200 to-rose-300 leading-tight">
              {song.title}
            </h1>

            <p className="text-rose-200/90 text-lg sm:text-xl font-medium tracking-wide">
              {song.artist}
            </p>

            <p className="font-script text-2xl sm:text-3xl text-rose-300/90 italic leading-relaxed">
              "{song.subtitle}"
            </p>

            {/* Akash's Personal Dedication Card */}
            <div className="p-6 rounded-3xl bg-white/5 border border-rose-500/25 backdrop-blur-xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Heart size={80} fill="currentColor" className="text-rose-400" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-rose-400 mb-2 flex items-center gap-1.5">
                <Heart size={14} fill="currentColor" /> Akash's Note For Pranshii
              </p>
              <p className="text-rose-100/90 text-base sm:text-lg font-light leading-relaxed">
                {song.dedication}
              </p>
            </div>

            {/* Direct Big Call to Action for YouTube */}
            <div className="pt-2 flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                href={song.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-sm sm:text-base flex items-center gap-3 shadow-xl hover:scale-105 transition-transform"
              >
                <span>Watch Official Video on YouTube</span>
                <ExternalLink size={18} />
              </a>

              <button
                type="button"
                onClick={() => {
                  document.getElementById('lyrics-flow')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm sm:text-base transition-colors"
              >
                Read Lyrics Below ↓
              </button>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Lyrics Section */}
        <section id="lyrics-flow" className="pt-8 sm:pt-14 pb-20 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-rose-400 text-xs font-bold tracking-widest uppercase block mb-2">Poetry &amp; Soul</span>
            <h2 className="font-romantic text-3xl sm:text-5xl font-bold text-white mb-4">Lyrics &amp; Feelings</h2>
            <p className="text-rose-200/70 text-sm sm:text-base">
              Sing along with the words that echo how deeply I feel about you.
            </p>
          </div>

          <div className="space-y-8 max-w-3xl mx-auto">
            {song.lyrics.map((stanza, sIdx) => {
              const isSelected = activeStanza === sIdx;
              return (
                <motion.div
                  key={sIdx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  onClick={() => setActiveStanza(isSelected ? null : sIdx)}
                  className={`p-6 sm:p-8 rounded-3xl transition-all duration-300 cursor-pointer border ${
                    stanza.highlight
                      ? 'bg-rose-500/10 border-rose-500/30 shadow-[0_0_40px_rgba(244,63,94,0.15)]'
                      : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.07]'
                  } ${isSelected ? 'ring-2 ring-rose-400 bg-white/15' : ''}`}
                >
                  {stanza.section && (
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-300/80 px-3 py-1 rounded-full bg-white/10 border border-white/10">
                        {stanza.section}
                      </span>
                      {stanza.highlight && (
                        <span className="text-xs text-rose-300 flex items-center gap-1 font-medium">
                          <Heart size={13} fill="currentColor" /> Akash's Favorite
                        </span>
                      )}
                    </div>
                  )}

                  <div className="space-y-2 text-center sm:text-left">
                    {stanza.lines.map((line, lIdx) => (
                      <p 
                        key={lIdx}
                        className={`font-romantic text-lg sm:text-2xl transition-all leading-relaxed ${
                          stanza.highlight 
                            ? 'text-rose-100 font-semibold drop-shadow-sm' 
                            : 'text-rose-200/80 font-normal'
                        }`}
                      >
                        {line}
                      </p>
                    ))}
                  </div>

                  {stanza.note && (
                    <div className="mt-4 pt-4 border-t border-rose-500/20 flex items-start gap-2 text-rose-300 text-sm font-script italic">
                      <Sparkles size={16} className="mt-0.5 shrink-0 text-amber-300" />
                      <span>{stanza.note}</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Bottom YouTube Redirect Card */}
          <div className="mt-16 text-center max-w-2xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-red-950/40 via-rose-950/40 to-black/60 border border-white/10 backdrop-blur-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Want to hear the real song?</h3>
            <p className="text-rose-200/80 text-sm sm:text-base mb-6">
              Click below to immediately listen to {song.title} on YouTube in full high-definition sound!
            </p>
            <a
              href={song.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-base shadow-xl transition-all hover:scale-105"
            >
              <span>Play "{song.title}" on YouTube</span>
              <ExternalLink size={20} />
            </a>
          </div>

          {/* Navigation to other songs or back */}
          <div className="mt-12 text-center flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-medium text-sm transition-all"
            >
              ← Back to Main Journey
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
