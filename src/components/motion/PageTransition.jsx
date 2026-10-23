import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageReadyContext, TransitionContext } from './pageContext';
import { scrambleText } from './scramble';

// The splash curtains, played in reverse: two panels close on a seam of
// light, the destination decodes above a ring sitting on that seam, then the
// panels part again on the new page.
const COVER_MS = 650;
const HOLD_MS = 500;
const REVEAL_MS = 800;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function PageTransitionProvider({ enabled = true, children }) {
    const navigate = useNavigate();
    const [phase, setPhase] = useState('idle');
    const [destination, setDestination] = useState({ label: '', path: '' });
    const busyRef = useRef(false);
    const timersRef = useRef([]);
    const labelRef = useRef(null);

    useEffect(() => {
        const timers = timersRef.current;
        return () => timers.forEach(clearTimeout);
    }, []);

    useEffect(() => {
        if (phase !== 'cover') return undefined;
        let cancelScramble = () => {};
        const id = setTimeout(() => {
            cancelScramble = scrambleText(labelRef.current, 700);
        }, 300);
        return () => {
            clearTimeout(id);
            cancelScramble();
        };
    }, [phase]);

    const go = useCallback((to, label) => {
        if (busyRef.current) return;

        if (prefersReducedMotion()) {
            navigate(to);
            window.scrollTo(0, 0);
            return;
        }

        busyRef.current = true;
        setDestination({ label, path: to });
        setPhase('cover');

        const at = (ms, fn) => timersRef.current.push(setTimeout(fn, ms));
        at(COVER_MS, () => {
            navigate(to);
            window.scrollTo(0, 0);
            setPhase('hold');
        });
        at(COVER_MS + HOLD_MS, () => setPhase('reveal'));
        at(COVER_MS + HOLD_MS + REVEAL_MS, () => {
            setPhase('idle');
            busyRef.current = false;
        });
    }, [navigate]);

    const ready = enabled && (phase === 'idle' || phase === 'reveal');
    const phaseClass = phase === 'cover' || phase === 'hold' ? `is-active is-${phase}` : `is-${phase}`;

    return (
        <TransitionContext.Provider value={go}>
            <PageReadyContext.Provider value={ready}>
                {children}
            </PageReadyContext.Provider>

            <div className={`page-transition ${phaseClass}`} aria-hidden="true">
                <div className="pt-panel pt-panel--top" />
                <div className="pt-panel pt-panel--bottom" />
                <span ref={labelRef} className="pt-label">{destination.label}</span>
                <svg className="pt-ring" viewBox="-30 -30 60 60">
                    <circle className="pt-ring-circle" r="18" pathLength="1" />
                    <g className="pt-orbit">
                        <circle r="20" fill="none" stroke="none" />
                        <circle cx="18" r="2" className="pt-dot" />
                    </g>
                    <circle r="2.5" className="pt-dot" />
                </svg>
                <span className="pt-path">~{destination.path}</span>
            </div>
        </TransitionContext.Provider>
    );
}

// A router link that plays the curtain transition before navigating.
export function TransitionLink({ to, label, onClick, children, ...props }) {
    const go = useContext(TransitionContext);

    const handleClick = (event) => {
        onClick?.(event);
        if (!go || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }
        event.preventDefault();
        go(to, label);
    };

    return (
        <Link to={to} onClick={handleClick} {...props}>
            {children}
        </Link>
    );
}
