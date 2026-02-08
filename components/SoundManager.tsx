
export const playSound = (type: 'boing' | 'celebrate' | 'nope' | 'romantic_theme') => {
  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  if (type === 'boing') {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    // Randomize pitch a bit for fun
    const startFreq = 150 + Math.random() * 100;
    const endFreq = 600 + Math.random() * 200;
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, audioCtx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);
  } else if (type === 'nope') {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, audioCtx.currentTime);
    osc.frequency.linearRampToValueAtTime(80, audioCtx.currentTime + 0.4);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.4);
  } else if (type === 'celebrate') {
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.08);
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + i * 0.08 + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime + i * 0.08);
      osc.stop(audioCtx.currentTime + i * 0.08 + 0.6);
    });
  } else if (type === 'romantic_theme') {
    const melody = [349.23, 440.00, 523.25, 659.25, 783.99, 1046.50];
    melody.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.5);
      gain.gain.setValueAtTime(0, audioCtx.currentTime + i * 0.5);
      gain.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + i * 0.5 + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + i * 0.5 + 4.0);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime + i * 0.5);
      osc.stop(audioCtx.currentTime + i * 0.5 + 4.0);
    });
  }
};
