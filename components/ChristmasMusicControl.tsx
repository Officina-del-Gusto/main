import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface ChristmasMusicControlProps {
  scrolled: boolean;
}

const ChristmasMusicControl: React.FC<ChristmasMusicControlProps> = ({ scrolled }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [showPrompt, setShowPrompt] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Initialize volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
    }
  }, []);

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
      {/* Compact music control in header */}
      <div className="flex items-center gap-2">
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

      {/* Hidden Audio Element with local Christmas music */}
      <audio
        ref={audioRef}
        src="/audio/7379.mp3"
        loop
        preload="auto"
      />
    </>
  );
};

export default ChristmasMusicControl;
