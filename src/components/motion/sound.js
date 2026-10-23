import { useSyncExternalStore } from 'react';

// Hover sound effects, synthesized with the Web Audio API so there are no
// audio files to load. The on/off choice is remembered per browser.
const STORAGE_KEY = 'portfolio:sound';
const MIN_GAP_S = 0.04;   // don't machine-gun when sweeping across a row of links

const listeners = new Set();
let enabled = readStoredPreference();
let ctx = null;
let master = null;
let noise = null;
let lastPlayed = 0;

function readStoredPreference() {
    try {
        return localStorage.getItem(STORAGE_KEY) !== 'off';
    } catch {
        return true;
    }
}

const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
};

export const useSoundOn = () => useSyncExternalStore(subscribe, () => enabled);

export function setSoundOn(on) {
    enabled = on;
    try {
        localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off');
    } catch {
        // Storage can be blocked; the toggle still works for this visit.
    }
    listeners.forEach((listener) => listener());
    if (on) unlockAudio();
}

// Browsers only allow audio to start after a click or key press, so this is
// called from those events. Hovers before the first one stay silent.
export function unlockAudio() {
    if (!ctx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        ctx = new AudioContextClass();
        master = ctx.createGain();
        master.gain.value = 0.5;
        master.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
}

function noiseBuffer() {
    if (!noise) {
        noise = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.02), ctx.sampleRate);
        const data = noise.getChannelData(0);
        for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
    }
    return noise;
}

// A soft glassy tick: a short falling sine ping plus a few milliseconds of
// high-passed noise for a tactile edge. Pitch wobbles slightly so repeated
// hovers don't sound mechanical.
export function playHoverTick() {
    if (!enabled || !ctx || ctx.state !== 'running') return;

    const now = ctx.currentTime;
    if (now - lastPlayed < MIN_GAP_S) return;
    lastPlayed = now;

    const freq = 1500 + Math.random() * 300;
    const tone = ctx.createOscillator();
    tone.type = 'sine';
    tone.frequency.setValueAtTime(freq, now);
    tone.frequency.exponentialRampToValueAtTime(freq * 0.85, now + 0.08);

    const toneGain = ctx.createGain();
    toneGain.gain.setValueAtTime(0.0001, now);
    toneGain.gain.exponentialRampToValueAtTime(0.08, now + 0.004);
    toneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

    tone.connect(toneGain).connect(master);
    tone.start(now);
    tone.stop(now + 0.1);

    const click = ctx.createBufferSource();
    click.buffer = noiseBuffer();
    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = 4000;
    const clickGain = ctx.createGain();
    clickGain.gain.setValueAtTime(0.03, now);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

    click.connect(highpass).connect(clickGain).connect(master);
    click.start(now);
    click.stop(now + 0.02);
}
