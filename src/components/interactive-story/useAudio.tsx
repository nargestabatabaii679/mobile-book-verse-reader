import { useRef } from 'react';

export const useAudio = () => {
  const backgroundMusicRef = useRef<HTMLAudioElement>(null);

  const playBackgroundMusic = () => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = 0.2;
      backgroundMusicRef.current.play().catch(e => console.log('Background music failed:', e));
    }
  };

  const playStorySound = (soundType: string) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      let frequency = 440;
      let duration = 0.3;
      
      const soundMap: Record<string, { freq: number; dur: number }> = {
        footsteps: { freq: 200, dur: 0.5 },
        'door-creak': { freq: 150, dur: 1.0 },
        mystery: { freq: 660, dur: 0.8 },
        echo: { freq: 330, dur: 1.2 },
        'page-flip': { freq: 880, dur: 0.2 },
        'chest-open': { freq: 550, dur: 0.6 },
        victory: { freq: 1200, dur: 1.0 },
        escape: { freq: 400, dur: 0.7 },
        error: { freq: 300, dur: 0.3 }
      };
      
      if (soundMap[soundType]) {
        frequency = soundMap[soundType].freq;
        duration = soundMap[soundType].dur;
      }
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      if (['door-creak', 'echo'].includes(soundType)) {
        oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.7, audioContext.currentTime + duration);
      }
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
      console.log('Story sound failed:', e);
    }
  };

  return {
    backgroundMusicRef,
    playBackgroundMusic,
    playStorySound
  };
};