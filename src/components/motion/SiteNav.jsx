import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TransitionLink } from './PageTransition';
import { setSoundOn, useSoundOn } from './sound';

const HEADER_ID = 'profile-header';
const CONTACT_EMAIL = 'Benitez1504elmer@gmail.com';
const NAV_OFFSET = 72;

const SECTIONS = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'gallery', label: 'Gallery' },
];

const smoothScrollTo = (top) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
};

// Which home section sits in the middle band of the viewport.
function useActiveSection(enabled) {
    const [active, setActive] = useState(null);

    useEffect(() => {
        if (!enabled) return undefined;
        const observer = new IntersectionObserver(
            (entries) => {
                const hit = entries.find((entry) => entry.isIntersecting);
                if (hit) setActive(hit.target.id);
            },
            { rootMargin: '-45% 0px -50% 0px' },
        );
        SECTIONS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [enabled]);

    return enabled ? active : null;
}

/**
 * Slim top bar that drops in once the profile header has scrolled away. Its
 * bottom edge fills with scroll progress. On the home page it links to the
 * sections and highlights the one you're reading; elsewhere it links home.
 */
const SiteNav = () => {
    const { pathname } = useLocation();
    const isHome = pathname === '/';
    const [visible, setVisible] = useState(false);
    const progressRef = useRef(null);
    const activeSection = useActiveSection(isHome);
    const soundOn = useSoundOn();

    useEffect(() => {
        let frameId = 0;

        const update = () => {
            frameId = 0;
            const header = document.getElementById(HEADER_ID);
            const threshold = header ? header.offsetTop + header.offsetHeight * 0.75 : 200;
            setVisible(window.scrollY > threshold);

            const max = document.documentElement.scrollHeight - window.innerHeight;
            const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
        };

        const schedule = () => {
            if (!frameId) frameId = requestAnimationFrame(update);
        };

        schedule();
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
        };
    }, [pathname]);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) smoothScrollTo(el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET);
    };

    return (
        <nav className={`site-nav ${visible ? 'is-visible' : ''}`} aria-label="Primary" inert={!visible}>
            <div className="site-nav__inner">
                <button type="button" className="site-nav__brand" onClick={() => smoothScrollTo(0)}>
                    Elmer Benitez II
                </button>

                <div className="site-nav__links">
                    {isHome ? (
                        SECTIONS.map(({ id, label }) => (
                            <button
                                key={id}
                                type="button"
                                className={`site-nav__link ${activeSection === id ? 'is-current' : ''}`}
                                aria-current={activeSection === id ? 'location' : undefined}
                                onClick={() => scrollToSection(id)}
                            >
                                {label}
                            </button>
                        ))
                    ) : (
                        <TransitionLink to="/" label="Home" className="site-nav__link">
                            ← Home
                        </TransitionLink>
                    )}
                </div>

                <div className="site-nav__meta">
                    <button
                        type="button"
                        className="site-nav__sound"
                        aria-pressed={soundOn}
                        onClick={() => setSoundOn(!soundOn)}
                    >
                        Sound {soundOn ? 'on' : 'off'}
                    </button>
                    <a className="site-nav__cta" href={`mailto:${CONTACT_EMAIL}`}>
                        Contact
                    </a>
                </div>
            </div>

            <span ref={progressRef} className="site-nav__progress" aria-hidden="true" />
        </nav>
    );
};

export default SiteNav;
