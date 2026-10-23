import { useEffect } from 'react';
import { playHoverTick, unlockAudio } from './sound';

const CLICKABLE = 'a[href], button:not(:disabled), [role="button"], summary, label[for]';

// Plays a tick when the mouse moves onto a link or button. One listener on
// the document covers everything, including elements added later.
const HoverSounds = () => {
    useEffect(() => {
        let current = null;

        const handlePointerOver = (event) => {
            if (event.pointerType !== 'mouse') return;
            const target = event.target.closest?.(CLICKABLE) ?? null;

            // Moving between children of the same link shouldn't retrigger it.
            if (target === current) return;
            current = target;

            if (target && !target.closest('[inert], [aria-hidden="true"]')) playHoverTick();
        };

        document.addEventListener('pointerover', handlePointerOver);
        window.addEventListener('pointerdown', unlockAudio, { passive: true });
        window.addEventListener('keydown', unlockAudio);
        return () => {
            document.removeEventListener('pointerover', handlePointerOver);
            window.removeEventListener('pointerdown', unlockAudio);
            window.removeEventListener('keydown', unlockAudio);
        };
    }, []);

    return null;
};

export default HoverSounds;
