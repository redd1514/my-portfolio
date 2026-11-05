// Shared pieces for the constellation rail and the command palette: the home
// page sections they jump between, and a few window events that let them
// talk to the chatbot and the starfield without prop drilling.

export const SECTIONS = [
    { id: 'about', label: 'about' },
    { id: 'experience', label: 'experience' },
    { id: 'stack', label: 'tech stack' },
    { id: 'projects', label: 'recent projects' },
    { id: 'reel', label: 'demo reel' },
    { id: 'gallery', label: 'gallery' },
];

export const CONTACT_EMAIL = 'Benitez1504elmer@gmail.com';

const ASK_EVENT = 'portfolio:ask';
const WARP_EVENT = 'portfolio:warp';
const PALETTE_EVENT = 'portfolio:palette';
const SCROLL_GAP = 24;

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const listen = (name, handler) => {
    const wrapped = (event) => handler(event.detail);
    window.addEventListener(name, wrapped);
    return () => window.removeEventListener(name, wrapped);
};
const emit = (name, detail) => window.dispatchEvent(new CustomEvent(name, { detail }));

// Opens the chatbot and sends `question` as the first message.
export const askChatbot = (question) => emit(ASK_EVENT, question);
export const onAskChatbot = (handler) => listen(ASK_EVENT, handler);

// Streaks the starfield. direction: 1 when travelling down the page, -1 up.
export const warpStarfield = (direction) => emit(WARP_EVENT, direction);
export const onWarp = (handler) => listen(WARP_EVENT, handler);

export const openPalette = () => emit(PALETTE_EVENT);
export const onOpenPalette = (handler) => listen(PALETTE_EVENT, handler);

/** Smooth-scrolls to a home section and streaks the stars on the way. */
export function travelTo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - SCROLL_GAP);
    const distance = top - window.scrollY;
    if (Math.abs(distance) > window.innerHeight * 0.5) warpStarfield(Math.sign(distance));
    window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}
