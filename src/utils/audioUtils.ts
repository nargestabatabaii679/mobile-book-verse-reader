
export class AudioManager {
  private audioContext: AudioContext | null = null;
  private soundEnabled: boolean = true;

  constructor() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.log('Audio context not supported');
    }
  }

  setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  async playPageFlipSound() {
    if (!this.soundEnabled || !this.audioContext) return;

    try {
      const audioContext = this.audioContext;
      
      // Create a more realistic paper flip sound
      const duration = 0.3;
      const sampleRate = audioContext.sampleRate;
      const bufferSize = sampleRate * duration;
      const buffer = audioContext.createBuffer(2, bufferSize, sampleRate);
      
      const leftChannel = buffer.getChannelData(0);
      const rightChannel = buffer.getChannelData(1);

      // Generate paper rustle sound
      for (let i = 0; i < bufferSize; i++) {
        const t = i / sampleRate;
        
        // Base frequency sweep for paper movement
        const freq1 = 200 * Math.exp(-t * 8);
        const freq2 = 150 * Math.exp(-t * 6);
        
        // Generate white noise for paper texture
        const noise = (Math.random() * 2 - 1) * 0.3 * Math.exp(-t * 10);
        
        // Combine frequencies with noise
        const sample1 = Math.sin(2 * Math.PI * freq1 * t) * 0.1 * Math.exp(-t * 5) + noise;
        const sample2 = Math.sin(2 * Math.PI * freq2 * t) * 0.1 * Math.exp(-t * 5) + noise;
        
        leftChannel[i] = sample1;
        rightChannel[i] = sample2;
      }

      // Play the generated sound
      const source = audioContext.createBufferSource();
      const gainNode = audioContext.createGain();
      
      source.buffer = buffer;
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      source.start(audioContext.currentTime);
      source.stop(audioContext.currentTime + duration);

    } catch (error) {
      console.log('Error playing page flip sound:', error);
    }
  }

  async playBookOpenSound() {
    if (!this.soundEnabled || !this.audioContext) return;

    try {
      const audioContext = this.audioContext;
      
      // Create book opening sound
      const duration = 0.8;
      const oscillator1 = audioContext.createOscillator();
      const oscillator2 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator1.connect(gainNode);
      oscillator2.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Deep, soft opening sound
      oscillator1.frequency.setValueAtTime(80, audioContext.currentTime);
      oscillator1.frequency.exponentialRampToValueAtTime(120, audioContext.currentTime + 0.4);
      oscillator1.frequency.exponentialRampToValueAtTime(60, audioContext.currentTime + duration);
      
      oscillator2.frequency.setValueAtTime(150, audioContext.currentTime);
      oscillator2.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + duration);
      
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.15, audioContext.currentTime + 0.2);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator1.type = 'sine';
      oscillator2.type = 'triangle';
      
      oscillator1.start(audioContext.currentTime);
      oscillator2.start(audioContext.currentTime);
      oscillator1.stop(audioContext.currentTime + duration);
      oscillator2.stop(audioContext.currentTime + duration);

    } catch (error) {
      console.log('Error playing book open sound:', error);
    }
  }
}

export const audioManager = new AudioManager();
