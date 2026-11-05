import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SECTIONS, openPalette, travelTo } from './navigation';
import { scrambleText } from './scramble';
import { playStarChime } from './sound';

const HEADER_ID = 'profile-header';
const LAST = SECTIONS.length - 1;

// Rail geometry in px. Stars zigzag off the axis so it reads as a star map.
const VERTICAL = { width: 24, length: 216, wobble: 5 };
const HORIZONTAL = { width: 24, length: 156, wobble: 4 };

function useIsCompact() {
    const query = '(max-width: 1023px)'; // below this the page is too wide to leave a gutter for the rail
    const [compact, setCompact] = useState(() => window.matchMedia(query).matches);
    useEffect(() => {
        const media = window.matchMedia(query);
        const onChange = () => setCompact(media.matches);
        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
    }, []);
    return compact;
}

function starPoints(compact) {
    const { width, length, wobble } = compact ? HORIZONTAL : VERTICAL;
    return SECTIONS.map((_, i) => {
        const along = (i / LAST) * length;
        const across = width / 2 + (i % 2 ? wobble : -wobble);
        return compact ? { x: along, y: across } : { x: across, y: along };
    });
}

const PROBE = 0.35;   // the reading line, as a fraction of the viewport height

/**
 * Where the reader is, recalculated once per frame while scrolling:
 * - visible: the profile header has mostly scrolled away
 * - active: the section the reading line is in. On wide screens two cards
 *   can sit side by side; the one that starts lower is the one most recently
 *   reached, and a tie goes to the left column (earlier in SECTIONS).
 * - progress: active plus how far the reading line is toward the next section,
 *   so the trail between stars fills smoothly.
 */
function useScrollState() {
    const [state, setState] = useState({ visible: false, active: 0, progress: 0 });

    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            const header = document.getElementById(HEADER_ID);
            const threshold = header ? header.offsetTop + header.offsetHeight * 0.75 : 200;
            const visible = window.scrollY > threshold;

            const probe = window.innerHeight * PROBE;
            const tops = SECTIONS.map(({ id }) => document.getElementById(id)?.getBoundingClientRect().top ?? Infinity);
            let active = 0;
            tops.forEach((top, i) => {
                if (top <= probe && top > tops[active] + 1) active = i;
            });

            let progress = active;
            const next = tops[active + 1];
            if (next !== undefined && next > tops[active] + 1) {
                progress += Math.min(1, Math.max(0, (probe - tops[active]) / (next - tops[active])));
            }

            // The last sections may never reach the reading line; the bottom of the page counts.
            const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
            if (atBottom) {
                active = LAST;
                progress = LAST;
            }

            setState((prev) => (
                prev.visible === visible && prev.active === active && Math.abs(prev.progress - progress) < 0.005
                    ? prev
                    : { visible, active, progress }
            ));
        };
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        schedule();
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
        };
    }, []);

    return state;
}

// After a star is clicked, keep it lit until the visitor scrolls on their own,
// even if the observer would pick its neighbour in the other column.
function usePinnedIndex() {
    const [pinned, setPinned] = useState(null);
    useEffect(() => {
        if (pinned === null) return undefined;
        const release = () => setPinned(null);
        const options = { passive: true, once: true };
        window.addEventListener('wheel', release, options);
        window.addEventListener('touchmove', release, options);
        window.addEventListener('keydown', release, { once: true });
        return () => {
            window.removeEventListener('wheel', release);
            window.removeEventListener('touchmove', release);
            window.removeEventListener('keydown', release);
        };
    }, [pinned]);
    return [pinned, setPinned];
}

function Star({ section, index, point, isActive, isPassed, onTravel }) {
    const labelRef = useRef(null);
    const cancelRef = useRef(() => {});

    const decode = () => {
        cancelRef.current();
        cancelRef.current = scrambleText(labelRef.current, 420);
    };

    const classes = ['constellation__star', isActive && 'is-active', isPassed && 'is-passed']
        .filter(Boolean).join(' ');

    return (
        <button
            type="button"
            className={classes}
            style={{ left: point.x, top: point.y }}
            onClick={() => onTravel(index)}
            onPointerEnter={decode}
            onFocus={decode}
            aria-label={`Go to ${section.label}`}
            aria-current={isActive ? 'location' : undefined}
        >
            <span className="constellation__dot" aria-hidden="true" />
            <span ref={labelRef} className="constellation__label" aria-hidden="true">
                {section.label}
            </span>
        </button>
    );
}

/**
 * Replaces the top navbar: one star per home section, joined by a line that
 * draws itself as you read. Stars you've passed stay lit, the current one
 * pulses, and each one chimes its own note as it lights. Clicking a star
 * streaks the starfield and glides there. Sits on the right edge on wide
 * screens and along the bottom on phones.
 */
function ConstellationRail({ sections = SECTIONS }) {
    const compact = useIsCompact();
    const { visible, active: observed, progress } = useScrollState();
    const [pinned, setPinned] = usePinnedIndex();
    const active = pinned ?? observed;
    const trail = pinned ?? progress;
    const lastChimed = useRef(active);

    useEffect(() => {
        if (visible && active !== lastChimed.current) playStarChime(active);
        lastChimed.current = active;
    }, [active, visible]);

    const points = starPoints(compact);
    const polyline = points.map(({ x, y }) => `${x},${y}`).join(' ');
    const { width, length } = compact ? HORIZONTAL : VERTICAL;
    const box = compact ? { width: length, height: width } : { width, height: length };

    const travel = (index) => {
        setPinned(index);
        travelTo(sections[index].id);
    };

    return (
        <nav
            className={`constellation ${compact ? 'is-compact' : ''} ${visible ? 'is-visible' : ''}`}
            aria-label="Sections"
            inert={!visible}
        >
            <div className="constellation__map" style={box}>
                <svg className="constellation__lines" width={box.width} height={box.height} aria-hidden="true">
                    <polyline className="constellation__track" points={polyline} />
                    <polyline
                        className="constellation__trail"
                        points={polyline}
                        pathLength="1"
                        style={{ strokeDashoffset: 1 - trail / LAST }}
                    />
                </svg>
                {sections.map((section, i) => (
                    <Star
                        key={section.id}
                        section={section}
                        index={i}
                        point={points[i]}
                        isActive={i === active}
                        isPassed={i < active}
                        onTravel={travel}
                    />
                ))}
            </div>

            <button type="button" className="constellation__menu" onClick={openPalette} aria-label="Open command menu">
                <kbd aria-hidden="true">/</kbd>
            </button>
        </nav>
    );
}

// Only the home page has sections to map; other pages keep the menu key.
const ConstellationRailRoute = () => {
    const { pathname } = useLocation();
    if (pathname === '/') return <ConstellationRail />;
    return (
        <nav className="constellation is-visible is-bare" aria-label="Menu">
            <button type="button" className="constellation__menu" onClick={openPalette} aria-label="Open command menu">
                <kbd aria-hidden="true">/</kbd>
            </button>
        </nav>
    );
};

export default ConstellationRailRoute;
