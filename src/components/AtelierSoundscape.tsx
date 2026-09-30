import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface AtelierSoundscapeProps {
  sectionId?: string;
}

export const AtelierSoundscape: React.FC<AtelierSoundscapeProps> = ({ sectionId = 'custom' }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Audio nodes refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Initialize Web Audio graph
  const initAudio = () => {
    if (audioCtxRef.current) return;

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master gain node
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Low-pass filter for velvety softness
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);
      filter.Q.setValueAtTime(1.2, ctx.currentTime);
      filter.connect(masterGain);

      // Slow LFO for gentle breathing filter sweep
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.08, ctx.currentTime);
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(140, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();

      // Warm harmonic chords (A2 = 110Hz, E3 = 164.81Hz, A3 = 220Hz, C#4 = 277.18Hz)
      const frequencies = [110, 164.81, 220, 277.18];
      const oscGains = [0.06, 0.04, 0.03, 0.02];

      oscillatorsRef.current = frequencies.map((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(oscGains[idx], ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start();
        return osc;
      });

      // Soft ambient organic texture (gentle filtered white/pink noise for tactile workshop ambiance)
      const bufferSize = ctx.sampleRate * 3;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99765 * b0 + white * 0.0555179;
        b1 = 0.96300 * b1 + white * 0.0750759;
        b2 = 0.57000 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2) * 0.012;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(260, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.015, ctx.currentTime);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);
      noise.start();
      noiseSourceRef.current = noise;
    } catch (e) {
      console.warn('AudioContext not supported or blocked:', e);
    }
  };

  // Observe scroll position relative to custom atelier section
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Section is considered in-view when visible in viewport
      const visible = rect.bottom > 80 && rect.top < windowHeight - 80;
      setIsInView(visible);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [sectionId]);

  // Handle smooth gain fade in / fade out
  useEffect(() => {
    if (!audioCtxRef.current || !masterGainRef.current) return;
    const ctx = audioCtxRef.current;
    const gain = masterGainRef.current.gain;

    if (ctx.state === 'suspended' && isEnabled) {
      ctx.resume();
    }

    const targetVolume = isEnabled && isInView ? 0.09 : 0.0001;

    // Smooth exponential ramp over ~1.6 seconds without pops
    const now = ctx.currentTime;
    gain.cancelScheduledValues(now);
    gain.setValueAtTime(Math.max(0.0001, gain.value), now);
    gain.exponentialRampToValueAtTime(targetVolume, now + 1.6);
  }, [isEnabled, isInView]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const handleToggle = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }

    if (!isEnabled) {
      initAudio();
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  };

  const isPlayingActive = isEnabled && isInView;

  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={handleToggle}
        className={`group px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-xs ${
          isEnabled
            ? 'bg-[#2A1D17] text-[#FDFBF7] ring-1 ring-[#C8A97E]/40'
            : 'bg-white/80 hover:bg-white text-[#5B5248] hover:text-[#1E1C1A] border border-[#2A1D17]/10'
        }`}
        title={
          isEnabled
            ? 'Atelier Ambient Soundscape: Enabled (Fades in when scrolling through Atelier)'
            : 'Click to enable gentle ambient atelier soundscape'
        }
        aria-label="Toggle Atelier Ambient Soundscape"
      >
        {isEnabled ? (
          <>
            <Volume2 className="w-3.5 h-3.5 text-[#C8A97E]" />
            <span className="text-[11px]">
              {isPlayingActive ? 'Soundscape Active' : 'Soundscape Armed'}
            </span>
            {/* Animated Equalizer Waves */}
            <div className="flex items-end gap-0.5 h-3 w-3 ml-0.5">
              <span
                className={`w-0.5 bg-[#C8A97E] rounded-full transition-all duration-300 ${
                  isPlayingActive ? 'h-full animate-pulse' : 'h-1'
                }`}
              />
              <span
                className={`w-0.5 bg-[#C8A97E] rounded-full transition-all duration-500 delay-100 ${
                  isPlayingActive ? 'h-2/3 animate-pulse' : 'h-1'
                }`}
              />
              <span
                className={`w-0.5 bg-[#C8A97E] rounded-full transition-all duration-300 delay-200 ${
                  isPlayingActive ? 'h-4/5 animate-pulse' : 'h-1'
                }`}
              />
            </div>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-[#9E5B32]" />
            <span className="text-[11px]">Atelier Soundscape</span>
            <span className="text-[10px] font-mono text-[#8C8276] uppercase">OFF</span>
          </>
        )}
      </button>

      {/* Subtle First-Time Hint */}
      {!hasInteracted && (
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#8C8276] font-light">
          <Sparkles className="w-3 h-3 text-[#9E5B32]" />
          <span>Optional cinematic audio</span>
        </span>
      )}
    </div>
  );
};
