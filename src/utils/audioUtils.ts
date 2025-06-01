
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
      
      // Create a more realistic paper flip sound with crispier texture
      const duration = 0.4;
      const sampleRate = audioContext.sampleRate;
      const bufferSize = sampleRate * duration;
      const buffer = audioContext.createBuffer(2, bufferSize, sampleRate);
      
      const leftChannel = buffer.getChannelData(0);
      const rightChannel = buffer.getChannelData(1);

      // Enhanced paper sound generation - more emphasis on the crisp paper texture
      for (let i = 0; i < bufferSize; i++) {
        const t = i / sampleRate;
        
        // More defined paper crinkle frequencies
        const freq1 = 180 * Math.exp(-t * 10) * (1 + 0.1 * Math.sin(40 * t));
        const freq2 = 220 * Math.exp(-t * 9) * (1 + 0.15 * Math.sin(30 * t));
        
        // Enhanced white noise for paper texture - more prominent at the beginning
        const noiseIntensity = Math.exp(-t * 15); // faster decay for sharper sound
        const noise = (Math.random() * 2 - 1) * 0.5 * noiseIntensity;
        
        // Paper rustling mid-frequencies
        const rustle1 = Math.sin(2 * Math.PI * freq1 * t) * 0.15 * Math.exp(-t * 7);
        const rustle2 = Math.sin(2 * Math.PI * freq2 * t) * 0.12 * Math.exp(-t * 8);
        
        // Combine all elements with more emphasis on the noise component for realistic paper sound
        const sample1 = rustle1 + noise * 1.2;
        const sample2 = rustle2 + noise * 1.2;
        
        leftChannel[i] = sample1;
        rightChannel[i] = sample2;
      }

      // Add a slight "tap" at the beginning for the impact sound when page hits the book
      const attackTime = 0.01; // very quick attack
      for (let i = 0; i < sampleRate * attackTime; i++) {
        const t = i / (sampleRate * attackTime);
        const amplitude = t * (1 - t) * 4; // parabolic curve for natural attack
        
        leftChannel[i] *= 1 + amplitude;
        rightChannel[i] *= 1 + amplitude;
      }

      // Play the generated sound
      const source = audioContext.createBufferSource();
      const gainNode = audioContext.createGain();
      
      source.buffer = buffer;
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime); // slightly louder
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
      
      // Create book opening sound with more paper elements
      const duration = 0.8;
      const oscillator1 = audioContext.createOscillator();
      const oscillator2 = audioContext.createOscillator();
      const noiseNode = audioContext.createBufferSource();
      const gainNode = audioContext.createGain();
      
      // Create noise buffer for paper rustling
      const noiseBuffer = audioContext.createBuffer(
        2, 
        audioContext.sampleRate * duration, 
        audioContext.sampleRate
      );
      const noiseL = noiseBuffer.getChannelData(0);
      const noiseR = noiseBuffer.getChannelData(1);
      
      // Fill with filtered noise that sounds more like paper
      for (let i = 0; i < noiseBuffer.length; i++) {
        const t = i / audioContext.sampleRate;
        const envelope = Math.pow(t * (1 - t/duration) * 4, 2); // shaped envelope
        
        noiseL[i] = (Math.random() * 2 - 1) * envelope * 0.4;
        noiseR[i] = (Math.random() * 2 - 1) * envelope * 0.4;
        
        // Add some gentle rustling patterns
        if (t > 0.1 && t < 0.4) {
          const rustlePattern = 0.2 * Math.sin(t * 120) * Math.exp(-(t-0.2) * 10);
          noiseL[i] += rustlePattern;
          noiseR[i] += rustlePattern * 0.8; // slightly different between channels
        }
      }
      
      noiseNode.buffer = noiseBuffer;
      
      oscillator1.connect(gainNode);
      oscillator2.connect(gainNode);
      noiseNode.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Lower frequency components for book binding sound
      oscillator1.frequency.setValueAtTime(80, audioContext.currentTime);
      oscillator1.frequency.exponentialRampToValueAtTime(120, audioContext.currentTime + 0.3);
      oscillator1.frequency.exponentialRampToValueAtTime(60, audioContext.currentTime + duration);
      
      oscillator2.frequency.setValueAtTime(150, audioContext.currentTime);
      oscillator2.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + duration);
      
      gainNode.gain.setValueAtTime(0.04, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.15, audioContext.currentTime + 0.2);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator1.type = 'sine';
      oscillator2.type = 'triangle';
      
      oscillator1.start(audioContext.currentTime);
      oscillator2.start(audioContext.currentTime);
      noiseNode.start(audioContext.currentTime);
      
      oscillator1.stop(audioContext.currentTime + duration);
      oscillator2.stop(audioContext.currentTime + duration);
      noiseNode.stop(audioContext.currentTime + duration);

    } catch (error) {
      console.log('Error playing book open sound:', error);
    }
  }
}

export const audioManager = new AudioManager();
