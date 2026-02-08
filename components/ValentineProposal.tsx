
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { playSound } from './SoundManager';
import { Heart } from 'lucide-react';

const QUIPS = [
  "Nice try! 💃", "Missed me! 😜", "Not today, sugar! ✨", "Think again! 🤔", 
  "Makayla, darling, please! 💅", "Try the other one! 👈", "Nope! 🙅‍♀️", 
  "Wrong way, babe! 💋", "Close, but no cigar! 💃", "Calculated dodge! ⚡",
  "Too slow! 🐢", "I'm over here now! 🏃‍♀️", "Catch me if you can! 💨",
  "Error 404: 'No' not found! 🚫", "Is that all you got? 😏", "Psych! 🤪", 
  "In your dreams! ✨", "Click YES instead! 💖", "Ninja skills! 🥷", 
  "Look at me go! 💃", "Can't touch this! 🎶", "Still no! 😘",
  "Almost had it! 🤏", "Wait, over here! 📍", "You're getting warmer! 🔥",
  "I'm too fast! 🏎️", "Try with your eyes closed! 🙈", "Stop it! 😂",
  "I'm a elusive button! 👻", "No is not an option! 🛑"
];

interface ValentineProposalProps {
  onAccept: () => void;
}

const ValentineProposal: React.FC<ValentineProposalProps> = ({ onAccept }) => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noState, setNoState] = useState({ rotate: 0, scale: 1, isTeasing: false });
  const [quipIndex, setQuipIndex] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  // Function to move the button with "sass"
  const moveNoButton = useCallback(() => {
    playSound('boing');
    setQuipIndex(Math.floor(Math.random() * QUIPS.length));
    setHasMoved(true);

    const padding = 100;
    const btnWidth = noBtnRef.current?.offsetWidth || 150;
    const btnHeight = noBtnRef.current?.offsetHeight || 50;
    
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;
    
    // Pick a new position
    const nextX = Math.max(padding, Math.random() * maxX);
    const nextY = Math.max(padding, Math.random() * maxY);
    
    // Add erratic rotation and scale
    const randomRotate = (Math.random() - 0.5) * 80; 
    const randomScale = 0.8 + Math.random() * 0.6;
    
    setNoPosition({ x: nextX, y: nextY });
    setNoState({ rotate: randomRotate, scale: randomScale, isTeasing: false });
  }, []);

  // Track mouse distance for "teasing" effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!noBtnRef.current) return;
      
      const rect = noBtnRef.current.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(e.clientX - btnCenterX, 2) + Math.pow(e.clientY - btnCenterY, 2)
      );

      // Trigger dodge even earlier if it hasn't moved yet to surprise her
      const triggerDistance = hasMoved ? 130 : 80;

      if (distance < triggerDistance) {
        moveNoButton();
      } else if (distance < triggerDistance + 100) {
        if (!noState.isTeasing) {
            setNoState(prev => ({ ...prev, isTeasing: true }));
        }
      } else {
        if (noState.isTeasing) {
            setNoState(prev => ({ ...prev, isTeasing: false }));
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [hasMoved, noState.isTeasing, moveNoButton]);

  const handleYes = () => {
    playSound('celebrate');
    onAccept();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-8 relative z-10 overflow-hidden">
      <div className="max-w-md w-full animate-subtle">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Heart className="w-16 h-16 text-red-400 animate-pulse-heart" strokeWidth={1} fill="currentColor" />
            <Heart className="w-6 h-6 text-red-200 absolute -top-2 -right-2 animate-bounce" fill="currentColor" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-romantic text-gray-800 mb-2 font-light tracking-wide">
          Makayla...
        </h1>
        
        <p className="text-gray-400 font-light tracking-[0.5em] uppercase text-[10px] mb-12">
          I have a question for you
        </p>

        <h2 className="text-2xl md:text-3xl font-light text-gray-700 mb-16 tracking-wide">
          Will you be my Valentine?
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 relative h-24">
          <button
            onClick={handleYes}
            className="px-12 py-4 bg-red-500 text-white rounded-full transition-all duration-300 font-semibold tracking-widest text-lg w-full sm:w-auto active:scale-95 z-20 hover:bg-red-600 yes-glow"
          >
            YES!
          </button>

          <button
            ref={noBtnRef}
            onMouseEnter={moveNoButton}
            onClick={(e) => {
              e.preventDefault();
              moveNoButton();
            }}
            style={hasMoved ? {
              position: 'fixed',
              left: `${noPosition.x}px`,
              top: `${noPosition.y}px`,
              zIndex: 100,
              transform: `rotate(${noState.rotate}deg) scale(${noState.scale})`,
              transition: 'all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            } : {}}
            className={`px-10 py-3 text-gray-400 font-light tracking-widest text-lg transition-all w-full sm:w-auto hover:text-red-500
              ${hasMoved ? 'animate-dance' : 'border border-gray-100 rounded-full'} 
              ${noState.isTeasing ? 'animate-shake text-red-300' : ''}
            `}
          >
            {hasMoved ? QUIPS[quipIndex] : "No"}
          </button>
        </div>
      </div>
      
      {hasMoved && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 opacity-40 pointer-events-none">
          <p className="text-[10px] uppercase tracking-[0.8em] text-red-400 font-bold animate-pulse">Try to catch the "No", Makayla! 🏃‍♀️💨</p>
        </div>
      )}
    </div>
  );
};

export default ValentineProposal;
