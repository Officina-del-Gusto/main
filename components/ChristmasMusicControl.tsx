import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, SkipForward, SkipBack } from 'lucide-react';

interface ChristmasMusicControlProps {
  scrolled: boolean;
}

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

const ChristmasMusicControl: React.FC<ChristmasMusicControlProps> = ({ scrolled }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [showPrompt, setShowPrompt] = useState(true);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Initialize playlist and volume
  useEffect(() => {
    // Create shuffled playlist
    const shuffled = shuffleArray(CHRISTMAS_SONGS);
    setPlaylist(shuffled);
    
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
    }
  }, []);

  // Handle track end with smooth transition
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTrackEnd = () => {
      playNextTrack();
    };

    audio.addEventListener('ended', handleTrackEnd);
    return () => audio.removeEventListener('ended', handleTrackEnd);
  }, [currentTrackIndex, playlist]);

  // Smooth volume fade for transitions
  const fadeOutAndChangeTrack = (newIndex: number) => {
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
          audio.play().then(() => {
            let fadeInStep = 0;
            const fadeInInterval = setInterval(() => {
              fadeInStep++;
              audio.volume = Math.min(originalVolume, (originalVolume / steps) * fadeInStep);

              if (fadeInStep >= steps) {
                clearInterval(fadeInInterval);
                setIsTransitioning(false);
              }
            }, stepDuration);
          });
        }, 100);
      }
    }, stepDuration);
  };

  const playNextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    fadeOutAndChangeTrack(nextIndex);
  };

  const playPreviousTrack = () => {
    const prevIndex = currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1;
    fadeOutAndChangeTrack(prevIndex);
  };

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
    setIsPlaying(false);
  };

  return (
    <>
      {/* Compact music control in header - Desktop */}
      <div className="hidden md:flex items-center gap-2">
        <button
          type="button"
          onClick={playPreviousTrack}
          disabled={isTransitioning}
          className={`p-2 rounded-full transition-all ${
            scrolled 
              ? 'bg-bakery-100 hover:bg-bakery-200 text-bakery-800' 
              : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          title="Previous Song"
        >
          <SkipBack size={18} />
        </button>
        <button
          type="button"
          onClick={togglePlay}
          className={`p-2 rounded-full transition-all ${
            scrolled 
              ? 'bg-bakery-100 hover:bg-bakery-200 text-bakery-800' 
              : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
          }`}
          title={isPlaying ? 'Pause Christmas Music' : 'Play Christmas Music'}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button
          type="button"
          onClick={playNextTrack}
          disabled={isTransitioning}
          className={`p-2 rounded-full transition-all ${
            scrolled 
              ? 'bg-bakery-100 hover:bg-bakery-200 text-bakery-800' 
              : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          title="Next Song"
        >
          <SkipForward size={18} />
        </button>
        <button
          type="button"
          onClick={toggleMute}
          className={`p-2 rounded-full transition-all ${
            scrolled 
              ? 'bg-bakery-100 hover:bg-bakery-200 text-bakery-800' 
              : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
          }`}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      {/* Compact music control in header - Mobile (Play/Pause only) */}
      <div className="flex md:hidden items-center gap-2">
        <button
          type="button"
          onClick={togglePlay}
          className={`p-2 rounded-full transition-all ${
            scrolled 
              ? 'bg-bakery-100 hover:bg-bakery-200 text-bakery-800' 
              : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
          }`}
          title={isPlaying ? 'Pause Christmas Music' : 'Play Christmas Music'}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
      </div>

      {/* Music consent prompt */}
      {showPrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-auto">
          <div className="bg-white rounded-3xl max-w-sm w-full mx-4 p-6 shadow-2xl border border-bakery-100">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🎄🎵</span>
              <div>
                <h3 className="text-lg font-serif font-bold text-bakery-900">Pornește muzica de Crăciun?</h3>
                <p className="text-sm text-bakery-700">
                  Avem un fundal discret cu colinde la ~20% volum. Vrei să îl auzi?
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleAcceptMusic}
                className="flex-1 py-2.5 rounded-xl bg-bakery-500 hover:bg-bakery-600 text-white font-bold text-sm shadow-md transition-colors"
              >
                Da, pornește muzica
              </button>
              <button
                onClick={handleDeclineMusic}
                className="flex-1 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-bakery-800 font-bold text-sm transition-colors"
              >
                Nu acum
              </button>
            </div>
            <p className="mt-3 text-[11px] text-bakery-500 text-center">
              Poți controla oricând muzica din header-ul paginii.
            </p>
          </div>
        </div>
      )}

      {/* Hidden Audio Element with playlist */}
      {playlist.length > 0 && (
        <audio
          ref={audioRef}
          src={playlist[currentTrackIndex]}
          preload="auto"
        />
      )}
    </>
  );
};

export default ChristmasMusicControl;
