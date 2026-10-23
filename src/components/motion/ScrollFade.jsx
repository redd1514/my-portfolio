import { useEffect, useRef } from 'react';

const FADE_DISTANCE = 0.75;  // fully faded after scrolling this many header-heights
const DRIFT_RATE = 0.35;     // header trails the scroll by this fraction (parallax)

// Fades its content out as the page scrolls, while letting it drift down a
// little so it lingers behind the sections rising over it.
const ScrollFade = ({ id, children }) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        let frameId = 0;

        const update = () => {
            frameId = 0;
            const scrolled = Math.max(0, window.scrollY);
            const progress = Math.min(1, scrolled / (el.offsetHeight * FADE_DISTANCE || 1));

            el.style.opacity = String(1 - progress);
            el.style.pointerEvents = progress > 0.6 ? 'none' : '';

            if (reducedMotion.matches || progress === 0) {
                el.style.transform = '';
                el.style.filter = '';
            } else {
                const drift = Math.min(scrolled, el.offsetHeight * FADE_DISTANCE) * DRIFT_RATE;
                el.style.transform = `translate3d(0, ${drift.toFixed(1)}px, 0) scale(${(1 - progress * 0.04).toFixed(3)})`;
                el.style.filter = `blur(${(progress * 6).toFixed(1)}px)`;
            }
        };

        const schedule = () => {
            if (!frameId) frameId = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
        };
    }, []);

    return (
        <div id={id} ref={ref} className="scroll-fade">
            {children}
        </div>
    );
};

export default ScrollFade;
