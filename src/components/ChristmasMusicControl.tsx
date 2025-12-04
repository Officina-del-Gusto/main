import React from 'react';
import { Volume2, VolumeX, Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { useChristmasMusic } from '../contexts/ChristmasMusicContext';

interface ChristmasMusicControlProps {
  scrolled: boolean;
  showControls?: boolean; // Whether to show music control buttons
}

const ChristmasMusicControl: React.FC<ChristmasMusicControlProps> = ({ scrolled, showControls = true }) => {
  const {
    isPlaying,
    isMuted,
    volume,
    isTransitioning,
    togglePlay,
    toggleMute,
    playNextTrack,
    playPreviousTrack,
  } = useChristmasMusic();

  // Advanced controls stay wired for future use but remain hidden in the UI for now.
  const trackControlsEnabled = false;
  const muteControlEnabled = false;

  return (
    <>
      {/* Compact music control in header - Desktop */}
      {showControls && (
        <div className="hidden md:flex items-center gap-2 h-10">
          {trackControlsEnabled && (
            <button
              type="button"
              onClick={playPreviousTrack}
              disabled={isTransitioning}
              className={`p-2 rounded-full transition-all ${scrolled
                  ? 'bg-bakery-100 hover:bg-bakery-200 text-bakery-800'
                  : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              title="Previous Song"
            >
              <SkipBack size={18} />
            </button>
          )}
          <button
            type="button"
            onClick={togglePlay}
            className={`p-2 rounded-full transition-all ${scrolled
                ? 'bg-bakery-100 hover:bg-bakery-200 text-bakery-800'
                : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
              }`}
            title={isPlaying ? 'Pause Christmas Music' : 'Play Christmas Music'}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          {trackControlsEnabled && (
            <button
              type="button"
              onClick={playNextTrack}
              disabled={isTransitioning}
              className={`p-2 rounded-full transition-all ${scrolled
                  ? 'bg-bakery-100 hover:bg-bakery-200 text-bakery-800'
                  : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              title="Next Song"
            >
              <SkipForward size={18} />
            </button>
          )}
          {muteControlEnabled && (
            <button
              type="button"
              onClick={toggleMute}
              className={`p-2 rounded-full transition-all ${scrolled
                  ? 'bg-bakery-100 hover:bg-bakery-200 text-bakery-800'
                  : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
                }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          )}
        </div>
      )}

      {/* Compact music control in header - Mobile (with track controls) */}
      {showControls && (
        <div className="flex md:hidden items-center gap-1.5 h-10">
          {trackControlsEnabled && (
            <button
              type="button"
              onClick={playPreviousTrack}
              disabled={isTransitioning}
              className={`p-1.5 rounded-full transition-all ${scrolled
                  ? 'bg-bakery-100 hover:bg-bakery-200 text-bakery-800'
                  : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              title="Previous Song"
            >
              <SkipBack size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={togglePlay}
            className={`p-1.5 rounded-full transition-all ${scrolled
                ? 'bg-bakery-100 hover:bg-bakery-200 text-bakery-800'
                : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
              }`}
            title={isPlaying ? 'Pause Christmas Music' : 'Play Christmas Music'}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          {trackControlsEnabled && (
            <button
              type="button"
              onClick={playNextTrack}
              disabled={isTransitioning}
              className={`p-1.5 rounded-full transition-all ${scrolled
                  ? 'bg-bakery-100 hover:bg-bakery-200 text-bakery-800'
                  : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              title="Next Song"
            >
              <SkipForward size={16} />
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default ChristmasMusicControl;
