
import React, { useState } from 'react';
import ValentineProposal from './components/ValentineProposal';
import Celebration from './components/Celebration';
import RomanticTransition from './components/RomanticTransition';
import HeartBackground from './components/HeartBackground';
import { AppState } from './types';

const App: React.FC = () => {
  const [currentState, setCurrentState] = useState<AppState>(AppState.PROPOSAL);
  const wifeName = "Makayla";

  return (
    <div className="min-h-screen bg-pink-50 selection:bg-red-200">
      <HeartBackground />
      
      {currentState === AppState.PROPOSAL && (
        <ValentineProposal onAccept={() => setCurrentState(AppState.ANIMATING)} />
      )}

      {currentState === AppState.ANIMATING && (
        <RomanticTransition 
          name={wifeName} 
          onFinish={() => setCurrentState(AppState.ACCEPTED)} 
        />
      )}

      {currentState === AppState.ACCEPTED && (
        <Celebration name={wifeName} />
      )}

      {/* Footer Branding */}
      <div className="fixed bottom-4 right-4 text-red-300/50 font-romantic text-lg pointer-events-none select-none">
        Made with ❤️ for Makayla
      </div>
    </div>
  );
};

export default App;
