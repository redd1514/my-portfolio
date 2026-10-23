const GLYPHS = '!<>-_/[]{}=+*^?#01ABCDEFKXYZ';

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Decodes the text inside `el` from random glyphs into its real characters,
// settling left to right. Only touches text node values, so React-owned
// markup inside the element is left intact. Returns a cancel function that
// restores the original text immediately.
export function scrambleText(el, duration = 650) {
    if (!el || prefersReducedMotion()) return () => {};

    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) {
        if (walker.currentNode.nodeValue.trim()) nodes.push(walker.currentNode);
    }

    const finals = nodes.map((node) => node.nodeValue);
    const total = finals.reduce((sum, text) => sum + text.length, 0);
    if (total === 0) return () => {};

    const start = performance.now();
    let frameId;
    let frame = 0;

    const tick = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        const settled = Math.floor(progress * total);
        frame += 1;

        // Re-roll the unsettled glyphs every other frame so it reads as decoding, not noise.
        if (frame % 2 === 0 || progress === 1) {
            let offset = 0;
            nodes.forEach((node, i) => {
                const text = finals[i];
                let out = '';
                for (let c = 0; c < text.length; c += 1) {
                    const ch = text[c];
                    out += offset + c < settled || ch === ' '
                        ? ch
                        : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
                }
                node.nodeValue = out;
                offset += text.length;
            });
        }

        if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
        cancelAnimationFrame(frameId);
        nodes.forEach((node, i) => {
            node.nodeValue = finals[i];
        });
    };
}
