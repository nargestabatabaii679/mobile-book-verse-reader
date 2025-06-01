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
      
      // Create a much more realistic paper flip sound
      const duration = 0.6;
      const sampleRate = audioContext.sampleRate;
      const bufferSize = sampleRate * duration;
      const buffer = audioContext.createBuffer(2, bufferSize, sampleRate);
      
      const leftChannel = buffer.getChannelData(0);
      const rightChannel = buffer.getChannelData(1);

      // Generate realistic paper sound with multiple layers
      for (let i = 0; i < bufferSize; i++) {
        const t = i / sampleRate;
        
        // Paper crinkle - high frequency rustling
        const crinkleFreq = 3000 + Math.sin(t * 50) * 1000;
        const crinkle = Math.sin(2 * Math.PI * crinkleFreq * t) * 0.1 * Math.exp(-t * 8);
        
        // Paper fiber noise - realistic paper texture
        const fiberNoise = (Math.random() * 2 - 1) * 0.4 * Math.exp(-t * 6);
        
        // Paper fold sound - mid frequency
        const foldFreq = 800 * Math.exp(-t * 4);
        const fold = Math.sin(2 * Math.PI * foldFreq * t) * 0.08 * Math.exp(-t * 5);
        
        // Sharp initial impact - the moment page hits
        const impact = Math.exp(-t * 40) * 0.3;
        
        // Paper rustling swoosh
        const swoosh = Math.sin(2 * Math.PI * (200 + t * 150) * t) * 0.06 * Math.exp(-t * 3);
        
        // Subtle paper thickness resonance
        const thickness = Math.sin(2 * Math.PI * 120 * t) * 0.03 * Math.exp(-t * 2);
        
        // Combine all elements for realistic paper sound
        const sample1 = crinkle + fiberNoise + fold + impact + swoosh + thickness;
        const sample2 = crinkle * 0.8 + fiberNoise * 1.1 + fold * 0.9 + impact + swoosh * 0.7 + thickness;
        
        leftChannel[i] = sample1;
        rightChannel[i] = sample2;
      }

      // Add realistic envelope shaping
      const attackSamples = Math.floor(sampleRate * 0.02); // 20ms attack
      const releaseSamples = Math.floor(sampleRate * 0.3); // 300ms release
      
      // Attack phase - sharp rise
      for (let i = 0; i < attackSamples; i++) {
        const envelope = Math.sin((i / attackSamples) * Math.PI * 0.5);
        leftChannel[i] *= envelope;
        rightChannel[i] *= envelope;
      }
      
      // Release phase - gradual fade
      const releaseStart = bufferSize - releaseSamples;
      for (let i = releaseStart; i < bufferSize; i++) {
        const progress = (i - releaseStart) / releaseSamples;
        const envelope = Math.cos(progress * Math.PI * 0.5);
        leftChannel[i] *= envelope;
        rightChannel[i] *= envelope;
      }

      // Apply subtle filtering to enhance paper characteristics
      for (let i = 1; i < bufferSize - 1; i++) {
        // High-pass filter to emphasize paper crispness
        leftChannel[i] = leftChannel[i] * 0.7 + (leftChannel[i] - leftChannel[i-1]) * 0.3;
        rightChannel[i] = rightChannel[i] * 0.7 + (rightChannel[i] - rightChannel[i-1]) * 0.3;
      }

      // Play the enhanced paper sound
      const source = audioContext.createBufferSource();
      const gainNode = audioContext.createGain();
      const filterNode = audioContext.createBiquadFilter();
      
      source.buffer = buffer;
      source.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Add subtle filtering for more realistic paper tone
      filterNode.type = 'highpass';
      filterNode.frequency.setValueAtTime(100, audioContext.currentTime);
      filterNode.Q.setValueAtTime(0.5, audioContext.currentTime);
      
      gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
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
