import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePageReady } from './pageContext';
import { scrambleText } from './scramble';

const ITEM_SETTLE_MS = 1300;   // longest item transition plus its lead-in
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasFinePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Spotlight and lit border that follow the cursor. Used by TiltCard and
// SpotlightCard.
function trackPointer(event, el) {
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
    return { x, y, rect };
}

const PointerLights = () => (
    <>
        <span className="card-spotlight" aria-hidden="true" />
        <span className="card-glow" aria-hidden="true" />
    </>
);

/**
 * Entrance for a page's content once it's on screen and uncovered. The block
 * rises out of a blur; descendants that match `stagger` follow one after
 * another; the first `scramble` heading decodes into place.
 */
export default function Reveal({
    className = '',
    stagger,
    step = 60,
    delay = 0,
    scramble = 'h2',
    children,
}) {
    const rootRef = useRef(null);
    const ready = usePageReady();
    const [seen, setSeen] = useState(false);
    const [revealed, setRevealed] = useState(false);

    // Latch: once shown, stay shown, even while a transition covers the page.
    if (seen && ready && !revealed) setRevealed(true);

    useLayoutEffect(() => {
        const root = rootRef.current;
        if (!root || !stagger) return;
        root.querySelectorAll(stagger).forEach((el, i) => {
            el.classList.add('reveal-item');
            el.style.setProperty('--i', i);
        });
    }, [stagger]);

    useEffect(() => {
        const root = rootRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setSeen(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
        );
        observer.observe(root);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!revealed) return undefined;
        const root = rootRef.current;
        let cancelScramble = () => {};

        const heading = scramble ? root.querySelector(scramble) : null;
        const scrambleId = setTimeout(() => {
            cancelScramble = scrambleText(heading, 700);
        }, delay + 150);

        // Once everything has landed, drop the staggered transitions so the
        // components' own hover transitions take over again.
        const items = root.querySelectorAll('.reveal-item').length;
        const doneId = setTimeout(() => {
            root.dataset.revealDone = 'true';
        }, delay + ITEM_SETTLE_MS + items * step);

        return () => {
            clearTimeout(scrambleId);
            clearTimeout(doneId);
            cancelScramble();
        };
    }, [revealed, scramble, delay, step]);

    return (
        <div
            ref={rootRef}
            className={`reveal ${revealed ? 'is-revealed' : ''} ${className}`}
            style={{ '--reveal-delay': `${delay}ms`, '--reveal-step': `${step}ms` }}
        >
            {children}
        </div>
    );
}

// A card that tilts toward the cursor under a spotlight and a lit border.
export function TiltCard({ id, className = '', children }) {
    const surfaceRef = useRef(null);

    const handlePointerMove = (event) => {
        const surface = surfaceRef.current;
        if (event.pointerType !== 'mouse' || !surface) return;
        const { x, y, rect } = trackPointer(event, surface);
        if (prefersReducedMotion() || !hasFinePointer()) return;

        // Big cards tilt less, so the motion feels the same size everywhere.
        const maxTilt = Math.min(4, 1800 / Math.max(rect.width, rect.height));
        const rotateX = (y / rect.height - 0.5) * -maxTilt;
        const rotateY = (x / rect.width - 0.5) * maxTilt;
        surface.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    };

    const handlePointerLeave = () => {
        if (surfaceRef.current) surfaceRef.current.style.transform = '';
    };

    return (
        <div id={id} className={`tilt-card ${className}`}>
            <div
                ref={surfaceRef}
                className="tilt-surface"
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
            >
                {children}
                <PointerLights />
            </div>
        </div>
    );
}

// A card with the cursor spotlight and lit border, without the tilt.
export function SpotlightCard({ className = '', children, ...props }) {
    const handlePointerMove = (event) => {
        if (event.pointerType === 'mouse') trackPointer(event, event.currentTarget);
    };

    return (
        <div className={`spotlight-card ${className}`} onPointerMove={handlePointerMove} {...props}>
            {children}
            <PointerLights />
        </div>
    );
}
