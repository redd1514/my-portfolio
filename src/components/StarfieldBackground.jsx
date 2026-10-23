import { useEffect, useState } from 'react';
import ShootingStars from './ui/shooting-stars';
import StarsBackground from './ui/stars-background';

// Profile toggles the `dark` class on <html>; follow it so the stars flip
// between white-on-black and black-on-white.
function useIsDark() {
    const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

    useEffect(() => {
        const root = document.documentElement;
        const observer = new MutationObserver(() => setIsDark(root.classList.contains('dark')));
        observer.observe(root, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    return isDark;
}

function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    useEffect(() => {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)');
        const onChange = () => setReduced(query.matches);
        query.addEventListener('change', onChange);
        return () => query.removeEventListener('change', onChange);
    }, []);

    return reduced;
}

const StarfieldBackground = () => {
    const isDark = useIsDark();
    const reducedMotion = usePrefersReducedMotion();
    const color = isDark ? '#ffffff' : '#000000';

    return (
        <>
            <StarsBackground
                starColor={isDark ? '255, 255, 255' : '0, 0, 0'}
                allStarsTwinkle={!reducedMotion}
                twinkleProbability={reducedMotion ? 0 : 0.7}
            />
            {!reducedMotion && <ShootingStars starColor={color} trailColor={color} />}
        </>
    );
};

export default StarfieldBackground;
