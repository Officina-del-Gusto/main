import React, { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import { createPortal } from 'react-dom';

const CHRISTMAS_SONGS = [
  '/audio/florile_dalbe.mp3',
  '/audio/mos_craciun_cu_plete_dalbe.mp3',
  '/audio/buna_dimineata_la_mos_ajun.mp3',
  '/audio/astazi_s_a_nascut_hristos.mp3',
  '/audio/o_brad_frumos.mp3',
  '/audio/sus_boieri_nu_mai_dormiti.mp3',
  '/audio/trei_pastori.mp3',
  '/audio/joy_to_the_world.mp3',
  '/audio/zurgalai.mp3',
  '/audio/o_ce_veste_minunata.mp3',
  '/audio/sorcova.mp3',
  '/audio/jingle_bells.mp3',
  '/audio/o_ce_veste_minunata_cor_de_copii.mp3',
  '/audio/mos_craciun_mai_stai.mp3'
];

// Shuffle array function
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

interface ChristmasMusicContextType {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  isTransitioning: boolean;
  showPrompt: boolean;
  hasPopupBlocker: boolean;
  togglePlay: () => void;
  toggleMute: () => void;
  playNextTrack: () => void;
  playPreviousTrack: () => void;
  handleAcceptMusic: () => void;
  handleDeclineMusic: () => void;
  handleNeverAskAgain: () => void;
  handleManualMusicToggle: () => void;
  closePopupBlockerNotification: () => void;
}

const ChristmasMusicContext = createContext<ChristmasMusicContextType | null>(null);

export const useChristmasMusic = (): ChristmasMusicContextType => {
  const context = useContext(ChristmasMusicContext);
  if (!context) {
    throw new Error('useChristmasMusic must be used within a ChristmasMusicProvider');
  }
  return context;
};

interface ChristmasMusicProviderProps {
  children: ReactNode;
}

export const ChristmasMusicProvider: React.FC<ChristmasMusicProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [showPrompt, setShowPrompt] = useState(false);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasPopupBlocker, setHasPopupBlocker] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const promptTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize playlist and volume
  useEffect(() => {
    // Create shuffled playlist
    const shuffled = shuffleArray(CHRISTMAS_SONGS);
    setPlaylist(shuffled);
    
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
    }

    // Check if user chose 'never ask again'
    const musicChoice = localStorage.getItem('christmasMusicChoice');
    if (musicChoice === 'never') {
      setShowPrompt(false);
      setHasPopupBlocker(false);
      return;
    }

    // Delay popup slightly to allow page to load
    promptTimeoutRef.current = setTimeout(() => {
      // Show the prompt after a short delay
      setHasPopupBlocker(false);
      setShowPrompt(true);
    }, 500);

    return () => {
      if (promptTimeoutRef.current) {
        clearTimeout(promptTimeoutRef.current);
      }
    };
  }, []);

  // Block body scroll and position when prompt is shown
  useEffect(() => {
    if (showPrompt && !hasPopupBlocker) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [showPrompt, hasPopupBlocker]);

  // Smooth volume fade for transitions
  const fadeOutAndChangeTrack = useCallback((newIndex: number) => {
    const audio = audioRef.current;
    if (!audio || isTransitioning) return;

    setIsTransitioning(true);
    const originalVolume = audio.volume;
    const fadeOutDuration = 1000; // 1 second fade out
    const steps = 20;
    const stepDuration = fadeOutDuration / steps;
    const volumeStep = originalVolume / steps;

    let currentStep = 0;
    const fadeOutInterval = setInterval(() => {
      currentStep++;
      audio.volume = Math.max(0, originalVolume - (volumeStep * currentStep));

      if (currentStep >= steps) {
        clearInterval(fadeOutInterval);
        setCurrentTrackIndex(newIndex);
        
        // Fade in new track
        setTimeout(() => {
          audio.volume = 0;
          audio.play()
            .then(() => {
              let fadeInStep = 0;
              const fadeInInterval = setInterval(() => {
                fadeInStep++;
                audio.volume = Math.min(originalVolume, (originalVolume / steps) * fadeInStep);

                if (fadeInStep >= steps) {
                  clearInterval(fadeInInterval);
                  setIsTransitioning(false);
                }
              }, stepDuration);
            })
            .catch(() => {
              // Playback failed, reset transitioning state
              setIsTransitioning(false);
            });
        }, 100);
      }
    }, stepDuration);
  }, [isTransitioning]);

  const playNextTrack = useCallback(() => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    fadeOutAndChangeTrack(nextIndex);
  }, [currentTrackIndex, playlist.length, fadeOutAndChangeTrack]);

  const playPreviousTrack = useCallback(() => {
    const prevIndex = currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1;
    fadeOutAndChangeTrack(prevIndex);
  }, [currentTrackIndex, playlist.length, fadeOutAndChangeTrack]);

  // Handle track end with smooth transition
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTrackEnd = () => {
      playNextTrack();
    };

    audio.addEventListener('ended', handleTrackEnd);
    return () => audio.removeEventListener('ended', handleTrackEnd);
  }, [playNextTrack]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleAcceptMusic = () => {
    setShowPrompt(false);
    setHasPopupBlocker(false);
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      audioRef.current.muted = false;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handleDeclineMusic = () => {
    setShowPrompt(false);
    setHasPopupBlocker(false);
    setIsPlaying(false);
  };

  const handleNeverAskAgain = () => {
    localStorage.setItem('christmasMusicChoice', 'never');
    setShowPrompt(false);
    setHasPopupBlocker(false);
    setIsPlaying(false);
  };

  const handleManualMusicToggle = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.volume = 0.2;
      audioRef.current.muted = false;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const closePopupBlockerNotification = () => {
    setHasPopupBlocker(false);
  };

  const contextValue: ChristmasMusicContextType = {
    isPlaying,
    isMuted,
    volume,
    isTransitioning,
    showPrompt,
    hasPopupBlocker,
    togglePlay,
    toggleMute,
    playNextTrack,
    playPreviousTrack,
    handleAcceptMusic,
    handleDeclineMusic,
    handleNeverAskAgain,
    handleManualMusicToggle,
    closePopupBlockerNotification,
  };

  return (
    <ChristmasMusicContext.Provider value={contextValue}>
      {children}
      
      {/* Music consent prompt - full screen overlay */}
      {showPrompt && !hasPopupBlocker && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md pointer-events-auto overflow-hidden">
          <div className="bg-white rounded-3xl w-full max-w-md mx-4 p-8 shadow-2xl border border-bakery-100 transform">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🎄🎵</span>
              <div>
                <h3 className="text-xl font-serif font-bold text-bakery-900">Pornește muzica de Crăciun?</h3>
                <p className="text-sm text-bakery-700 mt-1">
                  Avem un fundal discret cu colinde la ~20% volum. Vrei să îl auzi?
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAcceptMusic}
                className="flex-1 py-3 rounded-xl bg-bakery-500 hover:bg-bakery-600 text-white font-bold text-base shadow-lg transition-all hover:scale-105"
              >
                Da, pornește muzica
              </button>
              <button
                onClick={handleDeclineMusic}
                className="flex-1 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-bakery-800 font-bold text-base transition-all hover:scale-105"
              >
                Nu acum
              </button>
            </div>
            <button
              onClick={handleNeverAskAgain}
              className="w-full mt-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-medium text-sm transition-all hover:scale-105 border border-red-200"
            >
              Nu mă mai întreba niciodată
            </button>
            <p className="mt-4 text-xs text-bakery-500 text-center">
              Poți controla oricând muzica din header-ul paginii.
            </p>
          </div>
        </div>,
        document.body
      )}

      {/* Alternative notification for popup blocker users - no scroll blocking */}
      {hasPopupBlocker && !isPlaying && createPortal(
        <div className="fixed bottom-4 right-4 z-[100] pointer-events-auto">
          <div className="bg-white rounded-2xl p-4 shadow-2xl border border-bakery-200 max-w-xs">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎵</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-bakery-900 mb-2">
                  Muzică de Crăciun disponibilă!
                </p>
                <button
                  onClick={handleManualMusicToggle}
                  className="w-full py-2 rounded-lg bg-bakery-500 hover:bg-bakery-600 text-white text-sm font-bold transition-colors"
                >
                  Pornește muzica
                </button>
                <button
                  onClick={closePopupBlockerNotification}
                  className="w-full mt-2 py-1.5 text-xs text-bakery-600 hover:text-bakery-800 transition-colors"
                >
                  Închide
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Hidden Audio Element with playlist - single instance managed by provider */}
      {playlist.length > 0 && (
        <audio
          ref={audioRef}
          src={playlist[currentTrackIndex]}
          preload="auto"
        />
      )}
    </ChristmasMusicContext.Provider>
  );
};

export default ChristmasMusicContext;
