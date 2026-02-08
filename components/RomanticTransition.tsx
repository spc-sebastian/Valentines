
import React, { useEffect, useState } from 'react';
import { playSound } from './SoundManager';
import { Heart } from 'lucide-react';

interface RomanticTransitionProps {
  name: string;
  onFinish: () => void;
}

const RomanticTransition: React.FC<RomanticTransitionProps> = ({ name, onFinish }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    playSound('romantic_theme');
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 3000),
      setTimeout(() => setPhase(3), 5500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="relative text-center px-6 max-w-4xl">
        <div className={`transition-all duration-1000 transform ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-2xl md:text-3xl text-red-300 font-romantic mb-6">Dearest {name},</h2>
        </div>

        <div className={`transition-all duration-1000 delay-500 transform ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-lg md:text-xl text-gray-400 font-light tracking-widest mb-12 uppercase">Every moment is better with you</p>
        </div>

        <div className={`transition-all duration-1000 transform ${phase >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h1 className="text-5xl md:text-6xl font-romantic text-red-500 mb-16 font-light">
            Will you be my Valentine?
          </h1>
          
          <button
            onClick={onFinish}
            className="px-12 py-4 bg-transparent border border-red-200 text-red-400 text-sm tracking-[0.3em] uppercase rounded-full hover:bg-red-50 transition-all"
          >
            I'd love to
          </button>
        </div>
      </div>
    </div>
  );
};

export default RomanticTransition;
