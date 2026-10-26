import { useState } from 'react';
import { usePageReady } from './motion/pageContext';

const MAGNET_STRENGTH = 0.18;   // how far the button leans toward the cursor

/**
 * Round launcher with the site's orbit mark: a ring, a core and a small moon
 * circling it. It pings outward until the first conversation starts. On hover
 * it stretches into a pill with a label while the core and moon regroup into
 * a bouncing typing indicator.
 */
function ChatLauncher({ ref, isOpen, hasInteracted, onOpen }) {
    const ready = usePageReady();
    const [entered, setEntered] = useState(false);

    // Pop in once the splash has opened, and only once.
    if (ready && !entered) setEntered(true);

    const label = hasInteracted ? 'Continue chat' : 'Ask me anything';

    const handlePointerMove = (event) => {
        if (event.pointerType !== 'mouse') return;
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        button.style.translate = `${(dx * MAGNET_STRENGTH).toFixed(1)}px ${(dy * MAGNET_STRENGTH).toFixed(1)}px`;
    };

    const handlePointerLeave = (event) => {
        event.currentTarget.style.translate = '';
    };

    const classes = [
        'chat-launcher',
        entered && 'is-ready',
        isOpen && 'is-hidden',
        !hasInteracted && 'is-inviting',
    ].filter(Boolean).join(' ');

    return (
        <button
            ref={ref}
            type="button"
            className={classes}
            onClick={onOpen}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            aria-label={hasInteracted ? 'Continue chat with Elmer' : 'Chat with Elmer'}
            aria-expanded={isOpen}
            aria-controls="portfolio-chatbot"
            aria-hidden={isOpen}
            tabIndex={isOpen ? -1 : 0}
        >
            <span className="chat-launcher__label" aria-hidden="true">
                <span>{label}</span>
            </span>

            <svg className="chat-launcher__icon" viewBox="-12 -12 24 24" aria-hidden="true">
                <circle className="chat-launcher__ring" r="8" pathLength="1" />
                <g className="chat-launcher__orbit">
                    <circle r="10" fill="none" stroke="none" />
                    <circle cx="8" r="1.6" />
                </g>
                <g className="chat-launcher__slot chat-launcher__slot--left">
                    <circle className="chat-launcher__dot" r="1.7" />
                </g>
                <g className="chat-launcher__slot chat-launcher__slot--mid">
                    <circle className="chat-launcher__dot" r="1.7" />
                </g>
                <g className="chat-launcher__slot chat-launcher__slot--right">
                    <circle className="chat-launcher__dot" r="1.7" />
                </g>
            </svg>
        </button>
    );
}

export default ChatLauncher;
