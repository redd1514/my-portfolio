import { useEffect, useRef, useState } from 'react';

// "Event horizon": the starfield collapses into a single point, an orbital
// mark draws itself around it, the core ignites into a seam of light, and the
// night splits open along that seam to reveal the portfolio.
//
// Timeline, in ms from mount.
const GATHER_END = 1500;  // last particles fall into the core
const IGNITE_AT = 2750;   // core flares, seam races across the screen
const PART_AT = 3150;     // curtains split along the seam
const PART_DURATION = 950;
const REDUCED_PART_AT = 500;
const REDUCED_PART_DURATION = 700;

const SWIRL = 1.1;        // radians each particle winds while falling
const FALL_EASE = 2.4;    // >1 accelerates the fall, like gravity

function particlePosition(particle, progress, cx, cy) {
    const eased = progress ** FALL_EASE;
    const radius = particle.radius * (1 - eased);
    const angle = particle.angle + SWIRL * eased;
    return [cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius];
}

function useCollapsingStarfield(canvasRef, enabled) {
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!enabled || !ctx) return undefined;

        let w = 0;
        let h = 0;
        let cx = 0;
        let cy = 0;
        let particleCount = 0;
        let particles = [];
        let backdrop = [];

        // Particles are laid out in normalised units so a resize mid-animation
        // just rescales the field instead of reshuffling it.
        const layout = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            ({ width: w, height: h } = canvas.getBoundingClientRect());
            cx = w / 2;
            cy = h / 2;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.lineCap = 'round';

            if (particles.length === 0 && w > 0) {
                particleCount = Math.round(Math.min(320, Math.max(140, (w * h) / 5000)));
                particles = Array.from({ length: particleCount }, () => {
                    const delay = Math.random() * 550;
                    return {
                        angle: Math.random() * Math.PI * 2,
                        reach: 0.25 + Math.random() * 0.85,
                        delay,
                        duration: GATHER_END - delay - Math.random() * 200,
                        width: 0.5 + Math.random() * 0.9,
                    };
                });

                // Distant stars that stay put, so the sky never goes empty.
                backdrop = Array.from({ length: Math.round((w * h) / 9000) }, () => ({
                    x: Math.random(),
                    y: Math.random(),
                    radius: Math.random() * 0.6 + 0.2,
                    phase: Math.random() * Math.PI * 2,
                    speed: 0.6 + Math.random() * 1.4,
                }));
            }

            const reach = Math.hypot(w, h) / 2;
            for (const particle of particles) particle.radius = particle.reach * reach;
        };

        layout();
        const resizeObserver = new ResizeObserver(layout);
        resizeObserver.observe(canvas);

        const start = performance.now();
        let frameId;

        const render = (now) => {
            const t = now - start;
            frameId = requestAnimationFrame(render);
            if (particleCount === 0) return;
            ctx.clearRect(0, 0, w, h);

            for (const star of backdrop) {
                ctx.globalAlpha = 0.2 + 0.2 * Math.sin(t * 0.001 * star.speed + star.phase);
                ctx.beginPath();
                ctx.arc(star.x * w, star.y * h, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = '#fff';
                ctx.fill();
            }
            ctx.globalAlpha = 1;

            let absorbed = 0;
            for (const particle of particles) {
                const progress = (t - particle.delay) / particle.duration;

                if (progress >= 1) {
                    absorbed += 1;
                    continue;
                }

                if (progress <= 0) {
                    const [x, y] = particlePosition(particle, 0, cx, cy);
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
                    ctx.beginPath();
                    ctx.arc(x, y, particle.width * 0.8, 0, Math.PI * 2);
                    ctx.fill();
                    continue;
                }

                const eased = progress ** FALL_EASE;
                const [hx, hy] = particlePosition(particle, progress, cx, cy);
                const [tx, ty] = particlePosition(particle, Math.max(0, progress - 0.09), cx, cy);
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.25 + 0.75 * eased})`;
                ctx.lineWidth = particle.width * (1 + eased * 1.4);
                ctx.beginPath();
                ctx.moveTo(tx, ty);
                ctx.lineTo(hx, hy);
                ctx.stroke();
            }

            // The core brightens as it swallows the field.
            const fed = absorbed / particleCount;
            if (fed > 0) {
                const glowRadius = 6 + 34 * fed;
                const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowRadius);
                glow.addColorStop(0, `rgba(255, 255, 255, ${fed})`);
                glow.addColorStop(0.2, `rgba(255, 255, 255, ${0.35 * fed})`);
                glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
                ctx.fillStyle = glow;
                ctx.fillRect(cx - glowRadius, cy - glowRadius, glowRadius * 2, glowRadius * 2);
            }
        };

        frameId = requestAnimationFrame(render);
        return () => {
            cancelAnimationFrame(frameId);
            resizeObserver.disconnect();
        };
    }, [canvasRef, enabled]);
}

const OrbitalMark = () => (
    <svg className="splash-mark" viewBox="-200 -200 400 400" fill="none" stroke="#fff" strokeWidth="0.75">
        <defs>
            <radialGradient id="splash-halo-gradient">
                <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
                <stop offset="0.3" stopColor="#fff" stopOpacity="0.12" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
        </defs>

        <g className="splash-rings">
            <circle className="splash-draw" r="36" pathLength="1" strokeOpacity="0.75" style={{ animationDelay: '1300ms' }} />

            <g transform="rotate(-16)">
                <path
                    id="splash-orbit"
                    className="splash-draw"
                    d="M -96 0 A 96 26 0 1 1 96 0 A 96 26 0 1 1 -96 0"
                    pathLength="1"
                    strokeOpacity="0.5"
                    style={{ animationDelay: '1420ms', animationDuration: '1000ms' }}
                />
                <ellipse
                    className="splash-fade"
                    rx="152"
                    ry="41"
                    pathLength="1"
                    strokeOpacity="0.35"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    strokeDasharray="0.0001 0.011"
                    style={{ animationDelay: '1600ms' }}
                />
                <circle className="splash-fade" r="2" fill="#fff" stroke="none" style={{ animationDelay: '1800ms' }}>
                    <animateMotion dur="3.4s" repeatCount="indefinite">
                        <mpath href="#splash-orbit" />
                    </animateMotion>
                </circle>
            </g>

            <g className="splash-spin" style={{ animationDelay: '0ms, 1500ms' }}>
                <circle r="38" stroke="none" />
                <circle cx="36" r="1.6" fill="#fff" stroke="none" />
            </g>

            <g className="splash-fade" strokeOpacity="0.45" style={{ animationDelay: '1450ms' }}>
                {[45, 135, 225, 315].map((deg) => (
                    <line key={deg} x1="46" x2="53" transform={`rotate(${deg})`} />
                ))}
            </g>
        </g>

        <g className="splash-flare">
            <circle className="splash-halo" r="70" fill="url(#splash-halo-gradient)" stroke="none" />
            <circle className="splash-core" r="3" fill="#fff" stroke="none" />
        </g>
    </svg>
);

const SplashScreen = ({ onReveal, finishLoading }) => {
    const [reducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const [phase, setPhase] = useState('gather');
    const canvasRef = useRef(null);
    const skipRef = useRef(null);
    const callbacksRef = useRef({ onReveal, finishLoading });

    // Parent callbacks may be new every render; keep the timeline from restarting.
    useEffect(() => {
        callbacksRef.current = { onReveal, finishLoading };
    });

    useCollapsingStarfield(canvasRef, !reducedMotion);

    useEffect(() => {
        const timers = [];
        const at = (ms, fn) => timers.push(setTimeout(fn, ms));
        let parted = false;

        const part = () => {
            if (parted) return;
            parted = true;
            timers.forEach(clearTimeout);
            setPhase('part');
            callbacksRef.current.onReveal?.();
            at(reducedMotion ? REDUCED_PART_DURATION : PART_DURATION, () => callbacksRef.current.finishLoading?.());
        };
        skipRef.current = part;

        if (reducedMotion) {
            at(REDUCED_PART_AT, part);
        } else {
            // Content fades in behind the closed curtains so it's fully there when they open.
            at(GATHER_END, () => callbacksRef.current.onReveal?.());
            at(IGNITE_AT, () => setPhase('ignite'));
            at(PART_AT, part);
        }

        return () => timers.forEach(clearTimeout);
    }, [reducedMotion]);

    // Any click or key skips straight to the reveal.
    useEffect(() => {
        const skip = () => skipRef.current?.();
        window.addEventListener('pointerdown', skip);
        window.addEventListener('keydown', skip);
        return () => {
            window.removeEventListener('pointerdown', skip);
            window.removeEventListener('keydown', skip);
        };
    }, []);

    const phaseClass = phase === 'part' ? 'is-igniting is-parting' : phase === 'ignite' ? 'is-igniting' : '';

    return (
        <div className={`splash ${phaseClass}`} aria-hidden="true">
            <div className="splash-curtain splash-curtain--top" />
            <div className="splash-curtain splash-curtain--bottom" />

            {!reducedMotion && (
                <>
                    <div className="splash-stage">
                        <canvas ref={canvasRef} className="splash-canvas" />
                        <OrbitalMark />
                    </div>
                    <div className="splash-seam" />
                </>
            )}
        </div>
    );
};

export default SplashScreen;
