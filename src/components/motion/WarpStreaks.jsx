import { useEffect, useRef } from 'react';
import { onWarp, prefersReducedMotion } from './navigation';

const DURATION_MS = 750;
const STREAKS = 90;

// Rises, peaks just after the middle, then settles: a jump, not a slide.
const envelope = (t) => Math.sin(Math.PI * Math.min(1, t)) ** 2;

/**
 * Brief light-speed streaks over the starfield when the constellation rail
 * jumps to a section. Stars stream the opposite way to travel, so going
 * down the page they shoot upward.
 */
const WarpStreaks = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        let frame = 0;

        const off = onWarp((direction) => {
            const canvas = canvasRef.current;
            if (!canvas || prefersReducedMotion()) return;

            cancelAnimationFrame(frame);
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const w = window.innerWidth;
            const h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            const g = canvas.getContext('2d');
            g.setTransform(dpr, 0, 0, dpr, 0, 0);
            g.strokeStyle = getComputedStyle(document.body).color;
            g.lineCap = 'round';

            const streaks = Array.from({ length: STREAKS }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                speed: 0.4 + Math.random() * 0.9,
                width: Math.random() < 0.15 ? 1.4 : 0.7,
                alpha: 0.15 + Math.random() * 0.45,
            }));

            const start = performance.now();
            let last = start;
            const tick = (now) => {
                const t = (now - start) / DURATION_MS;
                const dt = now - last;
                last = now;
                const power = envelope(t);
                g.clearRect(0, 0, w, h);

                streaks.forEach((s) => {
                    const velocity = s.speed * power * 3.2;
                    s.y -= direction * velocity * dt;
                    if (s.y < -80) s.y += h + 160;
                    if (s.y > h + 80) s.y -= h + 160;
                    const tail = 4 + velocity * 60;
                    g.globalAlpha = s.alpha * power;
                    g.lineWidth = s.width;
                    g.beginPath();
                    g.moveTo(s.x, s.y);
                    g.lineTo(s.x, s.y + direction * tail);
                    g.stroke();
                });

                if (t < 1) frame = requestAnimationFrame(tick);
                else g.clearRect(0, 0, w, h);
            };
            frame = requestAnimationFrame(tick);
        });

        return () => {
            off();
            cancelAnimationFrame(frame);
        };
    }, []);

    return <canvas ref={canvasRef} className="warp-streaks" aria-hidden="true" />;
};

export default WarpStreaks;
