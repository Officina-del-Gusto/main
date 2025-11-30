import React, { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  size: number;
  delay: number;
}

const ChristmasEffects: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const [snowmanPosition, setSnowmanPosition] = useState<'left' | 'right'>('left');
  const [santaWalkingTop, setSantaWalkingTop] = useState(65); // Starting vertical position for walking Santa
  const [isVisible, setIsVisible] = useState(false);

  // Fade in effect on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Generate 50 snowflakes with random properties
    const flakes: Snowflake[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 10 + Math.random() * 20, // 10-30 seconds
      size: 10 + Math.random() * 20, // 10-30px
      delay: Math.random() * 5, // 0-5 seconds delay
    }));
    setSnowflakes(flakes);

    // Change snowman position every 6 seconds on mobile to avoid overlap with Santa
    const snowmanInterval = setInterval(() => {
      setSnowmanPosition(prev => prev === 'left' ? 'right' : 'left');
    }, 6000);

    // Change walking Santa vertical position every 45 seconds (duration of one walk cycle)
    const santaWalkInterval = setInterval(() => {
      setSantaWalkingTop(55 + Math.random() * 20); // 55-75% vertical position
    }, 45000);

    return () => {
      clearInterval(snowmanInterval);
      clearInterval(santaWalkInterval);
    };
  }, []);

  return (
    <>
      <div className={`fixed inset-0 pointer-events-none z-50 overflow-hidden transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Snowflakes */}
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="absolute text-white opacity-80 animate-fall"
            style={{
              left: `${flake.left}%`,
              fontSize: `${flake.size}px`,
              animationDuration: `${flake.animationDuration}s`,
              animationDelay: `${flake.delay}s`,
              top: '-50px',
            }}
          >
            ❄
          </div>
        ))}

        {/* Subtle Christmas string lights - at very top */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ filter: 'brightness(1.5) saturate(1.5)' }}>
          {/* Main power cable */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-400/20 to-transparent" />
          
          <div className="flex items-start justify-between px-4">
            {Array.from({ length: 24 }, (_, i) => {
              const lightColors = [
                { base: '#b91c1c', shine: '#dc2626' }, // Red
                { base: '#15803d', shine: '#22c55e' }, // Green (brighter)
                { base: '#f59e0b', shine: '#fbbf24' }, // Yellow
                { base: '#ea580c', shine: '#fb923c' }, // Orange
                { base: '#2563eb', shine: '#3b82f6' }, // Blue
              ];
              const colorSet = lightColors[i % lightColors.length];
              const blinkDelay = (i % 8) * 0.3;
              // Show fewer lights on mobile (every 2nd light) with transparency
              const isVisible = i % 2 === 0;
              
              return (
                <div key={i} className="flex flex-col items-center" style={{ width: '1.5rem' }}>
                  {/* Wire from main cable to bulb */}
                  <div className={`w-px h-2 bg-gray-300/30 ${!isVisible ? 'md:block hidden' : ''}`} />
                  
                  {/* Tiny blinking bulb - fewer on mobile with more transparency */}
                  <div 
                    className={`w-1 h-2 rounded-full ${!isVisible ? 'md:block hidden' : ''}`}
                    style={{
                      background: `linear-gradient(135deg, ${colorSet.shine}, ${colorSet.base})`,
                      animation: `blink 2s ease-in-out infinite`,
                      animationDelay: `${blinkDelay}s`,
                      opacity: 0.6,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Santa Claus walking - right to left diagonally in random positions below middle */}
        <div 
          className="absolute animate-santa-walk-diagonal pointer-events-none opacity-100 md:opacity-85" 
          style={{ 
            top: `${santaWalkingTop}%`,
            transition: 'top 3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-32 h-32 md:w-48 md:h-48 object-contain"
            style={{ imageRendering: 'auto', willChange: 'transform' }}
          >
            <source src="/animations/christmass/Santa Claus walking - animate walking from right to left in random positions.webm" type="video/webm" />
          </video>
        </div>

        {/* Sleigh - 3x size, animated horizontally and diagonally randomly, no transparency */}
        {/* <div className="hidden md:block absolute animate-sleigh-diagonal pointer-events-none opacity-100">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-[28rem] h-[28rem] object-contain"
            style={{ imageRendering: 'auto', willChange: 'transform' }}
          >
            <source src="/animations/christmass/sleigh - size enhance like 3x and animate horizontally and diagonally randomly - no transparency.webm" type="video/webm" />
          </video>
        </div> */}

        {/* Christmas text santa - pop in and out randomly - ALTERNATE with merry text */}
        {/* <div className="hidden md:block absolute animate-pop-alternate-1 pointer-events-none opacity-90" style={{ top: '25%', right: '15%' }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-64 h-64 object-contain"
            style={{ imageRendering: 'auto', willChange: 'transform' }}
          >
            <source src="/animations/christmass/christmass text santa - pop in and out randomly - alternate.webm" type="video/webm" />
          </video>
        </div> */}

        {/* Merry Christmas text - pop in and out in random locations - ALTERNATE with santa text */}
        {/* <div className="hidden md:block absolute animate-pop-alternate-2 pointer-events-none opacity-90" style={{ top: '45%', left: '12%' }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-72 h-72 object-contain"
            style={{ imageRendering: 'auto', willChange: 'transform' }}
          >
            <source src="/animations/christmass/merry christmass text - pop in and out in random locations - alternate.webm" type="video/webm" />
          </video>
        </div> */}

        {/* Christmas Tree - static position - ALWAYS visible */}
        <div className="hidden md:block absolute bottom-8 left-8 pointer-events-none opacity-85">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-48 h-48 object-contain"
            style={{ imageRendering: 'auto' }}
          >
            <source src="/animations/christmass/christmass tree - static position - always.webm" type="video/webm" />
          </video>
        </div>

        {/* Happy Snowman - bigger, static on desktop, pops between left/right on mobile to avoid overlap - ALWAYS visible */}
        <div 
          className="absolute bottom-8 left-8 md:right-8 md:left-auto pointer-events-none opacity-85 animate-snowman-mobile md:animate-none"
          style={{
            transform: snowmanPosition === 'right' ? 'translateX(calc(100vw - 10rem))' : 'translateX(0)',
            transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-32 h-32 md:w-56 md:h-56 object-contain md:!transform-none"
            style={{ imageRendering: 'auto' }}
          >
            <source src="/animations/christmass/happy snowman jumping - make bigger - static position - always.webm" type="video/webm" />
          </video>
        </div>

        {/* Subtle stars - minimal */}
        <div className="absolute top-32 left-10 text-2xl animate-twinkle opacity-30" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute top-40 right-20 text-2xl animate-twinkle opacity-30" style={{ animationDelay: '2s' }}>✨</div>
        <div className="absolute bottom-40 right-1/4 text-2xl animate-twinkle opacity-30" style={{ animationDelay: '1.5s' }}>✨</div>
      </div>



      {/* CSS Animations */}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0.8;
          }
        }

        @keyframes blink {
          0%, 45% { opacity: 1; transform: scale(1); }
          50%, 55% { opacity: 0.2; transform: scale(0.7); }
          60%, 100% { opacity: 1; transform: scale(1); }
        }

        @keyframes subtleGlow {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.9;
          }
        }

        @keyframes sleigh-subtle {
          0% {
            transform: translateX(-150px) translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 0.85;
          }
          90% {
            opacity: 0.85;
          }
          100% {
            transform: translateX(calc(100vw + 150px)) translateY(-20px);
            opacity: 0;
          }
        }

        .animate-sleigh-subtle {
          animation: sleigh-subtle 35s linear infinite;
        }

        @keyframes sleigh-fly {
          0% {
            transform: translateX(-300px) translateY(0) rotate(-5deg);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          25% {
            transform: translateX(25vw) translateY(-40px) rotate(2deg);
          }
          50% {
            transform: translateX(50vw) translateY(-20px) rotate(-2deg);
          }
          75% {
            transform: translateX(75vw) translateY(-35px) rotate(3deg);
          }
          95% {
            opacity: 1;
          }
          100% {
            transform: translateX(calc(100vw + 300px)) translateY(-10px) rotate(-5deg);
            opacity: 0;
          }
        }

        @keyframes sleigh-fly-reverse {
          0% {
            transform: translateX(calc(100vw + 300px)) translateY(0) rotate(5deg);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          25% {
            transform: translateX(75vw) translateY(-50px) rotate(-3deg);
          }
          50% {
            transform: translateX(50vw) translateY(-25px) rotate(2deg);
          }
          75% {
            transform: translateX(25vw) translateY(-40px) rotate(-2deg);
          }
          95% {
            opacity: 1;
          }
          100% {
            transform: translateX(-300px) translateY(0) rotate(5deg);
            opacity: 0;
          }
        }

        @keyframes sleigh-diagonal {
          0% {
            transform: translateX(-400px) translateY(150px);
            opacity: 0;
          }
          10% {
            opacity: 0.85;
          }
          50% {
            transform: translateX(50vw) translateY(-80px);
          }
          90% {
            opacity: 0.85;
          }
          100% {
            transform: translateX(calc(100vw + 400px)) translateY(-150px);
            opacity: 0;
          }
        }

        @keyframes santa-walk-diagonal {
          0% {
            transform: translateX(calc(100vw + 200px)) translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 0.85;
          }
          25% {
            transform: translateX(75vw) translateY(-30px);
          }
          50% {
            transform: translateX(50vw) translateY(20px);
          }
          75% {
            transform: translateX(25vw) translateY(-20px);
          }
          90% {
            opacity: 0.85;
          }
          100% {
            transform: translateX(-200px) translateY(0);
            opacity: 0;
          }
        }

        .animate-santa-walk-diagonal {
          animation: santa-walk-diagonal 45s linear infinite;
        }

        @keyframes pop-alternate-1 {
          0%, 50% {
            opacity: 0.9;
            transform: scale(1);
          }
          55%, 100% {
            opacity: 0;
            transform: scale(0);
          }
        }

        .animate-pop-alternate-1 {
          animation: pop-alternate-1 16s ease-in-out infinite;
        }

        @keyframes pop-alternate-2 {
          0%, 50% {
            opacity: 0;
            transform: scale(0);
          }
          55%, 100% {
            opacity: 0.9;
            transform: scale(1);
          }
        }

        .animate-pop-alternate-2 {
          animation: pop-alternate-2 16s ease-in-out infinite;
        }

        @keyframes float-present {
          0% {
            transform: translateX(-100px) translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          50% {
            transform: translateX(50vw) translateY(-60px);
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateX(calc(100vw + 100px)) translateY(0);
            opacity: 0;
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.3);
          }
        }

        @keyframes sway {
          0%, 100% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
        }

        @keyframes snowman-mobile {
          0%, 100% {
            transform: translateX(0) translateY(0);
          }
          25% {
            transform: translateX(-15px) translateY(-10px);
          }
          50% {
            transform: translateX(0) translateY(-15px);
          }
          75% {
            transform: translateX(15px) translateY(-10px);
          }
        }

        .animate-snowman-mobile {
          animation: snowman-mobile 4s ease-in-out infinite;
        }

        @keyframes wave {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-8deg);
          }
          75% {
            transform: rotate(8deg);
          }
        }

        @keyframes float-candy {
          0% {
            transform: translateX(100vw) translateY(0) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          50% {
            transform: translateX(50vw) translateY(50px) rotate(-180deg);
          }
          95% {
            opacity: 1;
          }
          100% {
            transform: translateX(-200px) translateY(0) rotate(-360deg);
            opacity: 0;
          }
        }

        @keyframes swing {
          0%, 100% {
            transform: rotate(-15deg);
          }
          50% {
            transform: rotate(15deg);
          }
        }

        @keyframes dance {
          0%, 100% {
            transform: translateY(0) rotate(-5deg);
          }
          25% {
            transform: translateY(-10px) rotate(5deg);
          }
          75% {
            transform: translateY(-5px) rotate(-5deg);
          }
        }

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.1);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        .animate-fall {
          animation: fall linear infinite;
        }

        .animate-blink {
          animation: blink 2s ease-in-out infinite;
        }

        .animate-bulb-glow {
          animation: bulb-glow 1.8s ease-in-out infinite;
        }

        .animate-float-present {
          animation: float-present 20s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default ChristmasEffects;
