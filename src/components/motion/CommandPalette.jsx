import { useContext, useEffect, useId, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CONTACT_EMAIL, SECTIONS, askChatbot, onOpenPalette, travelTo } from './navigation';
import { TransitionContext } from './pageContext';
import { setSoundOn, useSoundOn } from './sound';

const LINKS = [
    { label: 'github', hint: 'redd1514', url: 'https://github.com/redd1514' },
    { label: 'linkedin', hint: 'elmer benitez', url: 'https://www.linkedin.com/in/elmer-benitez-867a46381/' },
    { label: 'demo reel on youtube', hint: 'video', url: 'https://youtu.be/UxxKWBcHwfI' },
    { label: 'instagram', hint: 'reddbenitez__', url: 'https://www.instagram.com/reddbenitez__/' },
];

const PAGES = [
    { path: '/', label: 'home', title: 'Home' },
    { path: '/projects', label: 'all projects', title: 'Projects' },
    { path: '/tech-stack', label: 'full tech stack', title: 'Tech Stack' },
];

const STATUS_MS = 900;

// Every character of the query, in order, somewhere in the text. Lower is better;
// null means no match. Prefix and whole-word hits rank first.
function matchScore(text, query) {
    if (!query) return 0;
    const hay = text.toLowerCase();
    const at = hay.indexOf(query);
    if (at === 0) return 0;
    if (at > 0) return hay[at - 1] === ' ' ? 1 : 2;
    let from = 0;
    for (const ch of query) {
        from = hay.indexOf(ch, from);
        if (from < 0) return null;
        from += 1;
    }
    return 3;
}

const isTypingTarget = (el) => el?.closest?.('input, textarea, select, [contenteditable="true"]');
const chatIsOpen = () => Boolean(document.querySelector('.chat.is-open'));

/**
 * Terminal-style menu on "/" or Ctrl/Cmd+K: jump to a section or page, copy
 * the email, flip the sound, open a profile. Anything it can't match becomes
 * a question for the chatbot.
 */
function CommandPalette() {
    const { pathname } = useLocation();
    const go = useContext(TransitionContext);
    const soundOn = useSoundOn();
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState(null);   // null: follow the best match
    const [status, setStatus] = useState('');
    const inputRef = useRef(null);
    const listRef = useRef(null);
    const bodyRef = useRef(null);
    const hoverSelectRef = useRef(false);
    const returnFocusRef = useRef(null);
    const afterCloseRef = useRef(null);
    const idBase = useId();

    const open = () => {
        if (chatIsOpen()) return;
        returnFocusRef.current = document.activeElement;
        setQuery('');
        setSelected(null);
        setStatus('');
        setIsOpen(true);
    };

    // `then` runs once the palette has closed and page scrolling is unlocked.
    const close = (then) => {
        afterCloseRef.current = typeof then === 'function' ? then : null;
        setIsOpen(false);
        setStatus('');
    };

    useEffect(() => onOpenPalette(open));

    useEffect(() => {
        const handleKeyDown = (event) => {
            const combo = (event.key === 'k' || event.key === 'K') && (event.metaKey || event.ctrlKey);
            const slash = event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey;
            if (!combo && !slash) return;
            if (slash && isTypingTarget(event.target)) return;
            event.preventDefault();
            if (isOpen) close();
            else open();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    useEffect(() => {
        if (!isOpen) return undefined;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => inputRef.current?.focus());
        return () => {
            document.body.style.overflow = previousOverflow;
            returnFocusRef.current?.focus?.({ preventScroll: true });
            const then = afterCloseRef.current;
            afterCloseRef.current = null;
            then?.();
        };
    }, [isOpen]);

    // Close a moment after a confirmation so it can be read.
    useEffect(() => {
        if (!status) return undefined;
        const id = setTimeout(close, STATUS_MS);
        return () => clearTimeout(id);
    });

    const isHome = pathname === '/';
    const commands = [
        ...(isHome ? SECTIONS.map((section) => ({
            group: 'jump to', label: section.label, hint: 'section', section: section.id,
        })) : []),
        ...PAGES.filter((page) => page.path !== pathname).map((page) => ({
            group: 'pages', label: page.label, hint: `~${page.path}`, page,
        })),
        { group: 'do', label: 'copy email', hint: CONTACT_EMAIL.toLowerCase(), action: 'copy' },
        { group: 'do', label: 'send an email', hint: 'mail app', action: 'mail' },
        { group: 'do', label: soundOn ? 'turn sound off' : 'turn sound on', hint: soundOn ? 'on' : 'off', action: 'sound' },
        ...LINKS.map((link) => ({ group: 'links', label: link.label, hint: link.hint, url: link.url })),
    ];

    const q = query.trim().toLowerCase();
    // Groups stay in their order; the best match is what Enter picks first.
    const scored = q.startsWith('?') ? [] : commands
        .map((command) => ({ command, score: matchScore(`${command.label} ${command.group}`, q) }))
        .filter((r) => r.score !== null);
    const results = scored.map((r) => r.command);
    const best = scored.reduce((bestIndex, r, i) => (r.score < scored[bestIndex].score ? i : bestIndex), 0);

    const question = query.trim().replace(/^\?\s*/, '');
    if (question) results.push({ group: 'ask', label: `ask: “${question}”`, hint: 'chatbot', question });

    const run = (command) => {
        if (!command) return;
        if (command.action === 'copy') {
            navigator.clipboard?.writeText(CONTACT_EMAIL)
                .then(() => setStatus('email copied'))
                .catch(() => setStatus(CONTACT_EMAIL));
            return;
        }
        if (command.action === 'sound') {
            setSoundOn(!soundOn);
            setStatus(soundOn ? 'sound off' : 'sound on');
            return;
        }
        if (command.url) {
            // Opened right away, inside the click or key press, so it isn't blocked as a pop-up.
            window.open(command.url, '_blank', 'noopener,noreferrer');
            close();
        } else if (command.section) close(() => travelTo(command.section));
        else if (command.page) close(() => go?.(command.page.path, command.page.title));
        else if (command.question) close(() => askChatbot(command.question));
        else if (command.action === 'mail') close(() => window.location.assign(`mailto:${CONTACT_EMAIL}`));
    };

    const current = Math.min(selected ?? best, results.length - 1);

    // Keep the selection in view when it moves by keyboard or by typing; a
    // mouse hover never scrolls the list out from under the pointer. The
    // list's scroll-padding keeps the item clear of the sticky group label.
    useEffect(() => {
        const list = listRef.current;
        if (!list || !isOpen || hoverSelectRef.current) return;
        if (current <= 0) list.scrollTop = 0;
        else list.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
    }, [current, isOpen, query]);

    // Draw the slim scrollbar and the edge fades from the list's scroll position.
    const updateScrollbar = () => {
        const list = listRef.current;
        const body = bodyRef.current;
        if (!list || !body) return;
        const { scrollTop, scrollHeight, clientHeight } = list;
        const overflow = scrollHeight - clientHeight;
        const size = overflow > 1 ? clientHeight / scrollHeight : 1;
        body.style.setProperty('--thumb-size', size.toFixed(4));
        body.style.setProperty('--thumb-offset', overflow > 1 ? (scrollTop / overflow).toFixed(4) : '0');
        body.classList.toggle('can-scroll', overflow > 1);
        body.classList.toggle('more-above', scrollTop > 2);
        body.classList.toggle('more-below', scrollTop < overflow - 2);
    };

    useEffect(updateScrollbar);

    // Dragging the thumb scrolls the list in proportion.
    const handleThumbDown = (event) => {
        const list = listRef.current;
        if (!list) return;
        event.preventDefault();
        const thumb = event.currentTarget;
        thumb.setPointerCapture(event.pointerId);
        const startY = event.clientY;
        const startTop = list.scrollTop;
        const ratio = list.scrollHeight / list.clientHeight;
        const move = (e) => { list.scrollTop = startTop + (e.clientY - startY) * ratio; };
        const up = () => {
            thumb.removeEventListener('pointermove', move);
            thumb.removeEventListener('pointerup', up);
            thumb.removeEventListener('pointercancel', up);
        };
        thumb.addEventListener('pointermove', move);
        thumb.addEventListener('pointerup', up);
        thumb.addEventListener('pointercancel', up);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            close();
            return;
        }
        if (!results.length) return;
        hoverSelectRef.current = false;
        if (event.key === 'ArrowDown' || (event.key === 'Tab' && !event.shiftKey)) {
            event.preventDefault();
            setSelected((current + 1) % results.length);
        } else if (event.key === 'ArrowUp' || (event.key === 'Tab' && event.shiftKey)) {
            event.preventDefault();
            setSelected((current - 1 + results.length) % results.length);
        } else if (event.key === 'Enter') {
            event.preventDefault();
            run(results[current]);
        }
    };

    const optionId = (i) => `${idBase}-option-${i}`;

    // Consecutive results that share a group render as one section, so each
    // sticky label only stays pinned while its own items are in view.
    const groups = [];
    results.forEach((command, i) => {
        const last = groups[groups.length - 1];
        if (last?.name === command.group) last.items.push({ command, i });
        else groups.push({ name: command.group, items: [{ command, i }] });
    });

    return (
        <div
            className={`palette ${isOpen ? 'is-open' : ''}`}
            aria-hidden={!isOpen}
            inert={!isOpen}
            onPointerDown={(event) => { if (event.target === event.currentTarget) close(); }}
        >
            <div className="palette__panel" role="dialog" aria-modal="true" aria-label="Command menu">
                <label className="palette__prompt">
                    <span className="palette__path" aria-hidden="true">~/elmer</span>
                    <span className="palette__caret" aria-hidden="true">$</span>
                    <input
                        ref={inputRef}
                        className="palette__input"
                        value={query}
                        onChange={(event) => {
                            hoverSelectRef.current = false;
                            setQuery(event.target.value);
                            setSelected(null);
                            setStatus('');
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="jump somewhere, or ask a question"
                        maxLength={200}
                        role="combobox"
                        aria-expanded="true"
                        aria-controls={`${idBase}-list`}
                        aria-activedescendant={results.length ? optionId(current) : undefined}
                        aria-label="Search commands or ask a question"
                        autoComplete="off"
                        spellCheck="false"
                    />
                </label>

                <div ref={bodyRef} className="palette__body">
                    <ul
                        ref={listRef}
                        id={`${idBase}-list`}
                        className="palette__list"
                        role="listbox"
                        aria-label="Commands"
                        onScroll={updateScrollbar}
                    >
                        {groups.map(({ name, items }) => (
                            <li key={name} className="palette__section" role="presentation">
                                <div className="palette__group" aria-hidden="true">{name}</div>
                                <ul className="palette__options" role="group" aria-label={name}>
                                    {items.map(({ command, i }) => (
                                        <li
                                            key={command.label}
                                            id={optionId(i)}
                                            role="option"
                                            aria-selected={i === current}
                                            className={`palette__item ${i === current ? 'is-selected' : ''}`}
                                            onPointerMove={() => {
                                                if (i === current) return;
                                                hoverSelectRef.current = true;
                                                setSelected(i);
                                            }}
                                            onClick={() => run(command)}
                                        >
                                            <span className="palette__label">{command.label}</span>
                                            <span className="palette__hint">{command.hint}</span>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                        {!results.length && <li className="palette__empty">type a question and press enter to ask the bot</li>}
                    </ul>
                    <div className="palette__scrollbar" aria-hidden="true">
                        <span className="palette__thumb" onPointerDown={handleThumbDown} />
                    </div>
                </div>

                <p className="palette__footer" aria-live="polite">
                    {status ? (
                        <span className="palette__status">{status} ✓</span>
                    ) : (
                        <>
                            <span><kbd>↑</kbd><kbd>↓</kbd> move</span>
                            <span><kbd>↵</kbd> select</span>
                            <span><kbd>?</kbd> ask the bot</span>
                            <span><kbd>esc</kbd> close</span>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}

export default CommandPalette;
