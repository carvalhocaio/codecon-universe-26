/**
 * ═══════════════════════════════════════════════════════════════
 *  Deep Thought as a Service — Synthesized Web Audio API Sound Effects
 *  No external asset files needed, completely client-synthesized.
 * ═══════════════════════════════════════════════════════════════
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  
  return audioCtx;
}

/**
 * Play a high-tech click/beep sound (e.g. for button hovers or presses)
 */
export function playClick(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = "sine";
  osc.frequency.setValueAtTime(900, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.08);

  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

  osc.start();
  osc.stop(ctx.currentTime + 0.08);
}

/**
 * Play a short computer processing data beep
 */
export function playBeep(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = "sine";
  // Random science-fiction beep frequency
  const freq = 650 + Math.random() * 450;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);

  gain.gain.setValueAtTime(0.04, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

  osc.start();
  osc.stop(ctx.currentTime + 0.1);
}

/**
 * Play a triumphant cosmic chime chord for the 42 answer reveal
 */
export function playSuccess(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Major 7th arpeggiating upward
  const notes = [261.63, 329.63, 392.00, 493.88, 523.25, 659.25, 783.99, 1046.50]; // C4 to C6 notes
  
  notes.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const subOsc = ctx.createOscillator();
    const gain = ctx.createGain();
    const delay = index * 0.07;
    const duration = 1.5;

    osc.connect(gain);
    subOsc.connect(gain);
    gain.connect(ctx.destination);

    // Main melody note
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    
    // Sub harmony note
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(freq * 0.5, ctx.currentTime + delay);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.setValueAtTime(0.05, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

    osc.start(ctx.currentTime + delay);
    subOsc.start(ctx.currentTime + delay);
    
    osc.stop(ctx.currentTime + delay + duration);
    subOsc.stop(ctx.currentTime + delay + duration);
  });
}

// Variables to manage the looping background calculation hum
let humOsc: OscillatorNode | null = null;
let humLfo: OscillatorNode | null = null;
let humGain: GainNode | null = null;

/**
 * Start the ongoing, low-frequency science-fiction supercomputer hum
 */
export function startHum(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Prevent duplicate runs
  if (humOsc) return;

  humGain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  
  filter.type = "lowpass";
  filter.frequency.value = 160;

  humGain.connect(filter);
  filter.connect(ctx.destination);

  // Main low sawtooth wave
  humOsc = ctx.createOscillator();
  humOsc.type = "sawtooth";
  humOsc.frequency.value = 55; // A1 frequency

  // LFO (Low Frequency Oscillator) to modulate the pitch, creating a pulsing engine-like hum
  humLfo = ctx.createOscillator();
  humLfo.type = "sine";
  humLfo.frequency.value = 3.5; // 3.5 Hz pulsing rate

  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 12; // Frequency modulation depth (+/- 12 Hz)

  humLfo.connect(lfoGain);
  lfoGain.connect(humOsc.frequency);

  // Smooth fade-in to prevent sudden pop
  humGain.gain.setValueAtTime(0, ctx.currentTime);
  humGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.6);

  humOsc.connect(humGain);

  humOsc.start();
  humLfo.start();
}

/**
 * Stop the ongoing supercomputer hum with a smooth fade-out
 */
export function stopHum(): void {
  const ctx = getAudioContext();
  
  if (!ctx) {
    humOsc = null;
    humLfo = null;
    humGain = null;
    return;
  }

  if (humOsc && humGain) {
    const currentGain = humGain.gain;
    
    currentGain.cancelScheduledValues(ctx.currentTime);
    currentGain.setValueAtTime(currentGain.value, ctx.currentTime);
    currentGain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);

    const targetOsc = humOsc;
    const targetLfo = humLfo;

    setTimeout(() => {
      try {
        targetOsc.stop();
        targetLfo?.stop();
      } catch (err) {
        // Prevent crashing if already stopped
      }
    }, 400);
  }

  humOsc = null;
  humLfo = null;
  humGain = null;
}
