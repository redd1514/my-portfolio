import { useCallback, useEffect, useRef, useState } from 'react';
import ChatLauncher from './ChatLauncher';

const QUICK_PROMPTS = [
  'what projects have you built?',
  'what is your tech stack?',
  'tell me about your experience',
];
const STATUS_WORDS = ['thinking', 'analyzing', 'checking my portfolio', 'writing'];
const STATUS_INTERVAL_MS = 1600;
const MAX_REQUEST_MESSAGES = 20;
const REQUEST_TIMEOUT_MS = 30_000;

// How long each line of an answer stays on screen: long enough to read.
const lineDuration = (line) => Math.min(6000, Math.max(1800, 1200 + line.length * 45));

// Short replies are set large; the longer the text, the smaller it gets so
// it still fits comfortably on screen.
function textSize(text) {
  if (text.length <= 90) return 'lg';
  if (text.length <= 260) return 'md';
  return 'sm';
}

function splitIntoLines(text) {
  const sentences = text.match(/[^.!?\n]+[.!?]+["')\]]*|[^.!?\n]+$/g) ?? [text];
  return sentences.map((sentence) => sentence.trim()).filter(Boolean);
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function ThinkingGlyph() {
  return (
    <span className="chat-glyph" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

/**
 * Full-screen chat over a blurred page. One exchange is on screen at a time:
 * the question becomes a small chip, a status line cycles while the answer is
 * on its way, and the answer plays one sentence at a time before settling
 * into the full reply.
 */
function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [history, setHistory] = useState([]);
  const [exchange, setExchange] = useState(null);
  const [input, setInput] = useState('');
  const [statusIndex, setStatusIndex] = useState(0);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);

  const isLoading = exchange?.status === 'loading';
  const isPlaying = exchange?.status === 'playing';
  const showInput = !exchange || exchange.status === 'done' || exchange.status === 'error';

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && showInput) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen, showInput]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    requestAnimationFrame(() => launcherRef.current?.focus());
  }, []);

  const handleOpen = () => setIsOpen(true);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  // Cycle the status word while waiting for a reply.
  useEffect(() => {
    if (!isLoading) return undefined;
    const id = setInterval(() => setStatusIndex((i) => (i + 1) % STATUS_WORDS.length), STATUS_INTERVAL_MS);
    return () => clearInterval(id);
  }, [isLoading]);

  // Play the answer one line at a time, then settle on the full reply.
  useEffect(() => {
    if (!isPlaying) return undefined;
    const { lines, index } = exchange;
    const id = setTimeout(() => {
      setExchange((current) => (
        index + 1 < lines.length
          ? { ...current, index: index + 1 }
          : { ...current, status: 'done' }
      ));
    }, lineDuration(lines[index]));
    return () => clearTimeout(id);
  }, [isPlaying, exchange]);

  const skipPlayback = () => {
    setExchange((current) => (current?.status === 'playing' ? { ...current, status: 'done' } : current));
  };

  const ask = async (question) => {
    if (!question || isLoading) return;

    setHasInteracted(true);
    setInput('');
    setStatusIndex(0);
    setExchange({ question, status: 'loading' });

    const conversation = [...history, { role: 'user', text: question }].slice(-MAX_REQUEST_MESSAGES);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversation }),
        signal: controller.signal,
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || `Chat request failed (${response.status}).`);
      }
      if (typeof data.text !== 'string' || !data.text.trim()) {
        throw new Error('The chat service returned an empty response.');
      }

      const text = data.text.trim();
      setHistory([...conversation, { role: 'assistant', text }]);
      setExchange({
        question,
        text,
        lines: splitIntoLines(text),
        index: 0,
        status: prefersReducedMotion() ? 'done' : 'playing',
      });
    } catch (error) {
      console.error('Chat request failed:', error);
      const text = error.name === 'AbortError'
        ? 'The request timed out. Please try again.'
        : error.message || 'The chat service is temporarily unavailable.';
      setExchange({ question, text, status: 'error' });
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    ask(input.trim());
  };

  return (
    <>
      <div
        id="portfolio-chatbot"
        className={`chat ${isOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Chat with Elmer"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <button type="button" className="chat__close" onClick={handleClose} aria-label="Close chat">
          esc <span aria-hidden="true">×</span>
        </button>

        <div className="chat__stage">
          {!exchange ? (
            <h2 className="chat__prompt">what do you want to ask?</h2>
          ) : (
            <div className="chat__exchange">
              <p className="chat__chip">{exchange.question}</p>

              {isLoading && (
                <p className="chat__status" role="status">
                  <ThinkingGlyph />
                  <span key={statusIndex} className="chat__shimmer">{STATUS_WORDS[statusIndex]}…</span>
                </p>
              )}

              {isPlaying && (
                <button type="button" className="chat__line-wrap" onClick={skipPlayback} aria-hidden="true" tabIndex={-1}>
                  <span key={exchange.index} className="chat__line" data-size={textSize(exchange.lines[exchange.index])}>
                    {exchange.lines[exchange.index]}
                  </span>
                </button>
              )}

              {exchange.status === 'done' && (
                <p className="chat__answer" data-size={textSize(exchange.text)}>{exchange.text}</p>
              )}
              {exchange.status === 'error' && <p className="chat__answer chat__answer--error">{exchange.text}</p>}

              {isPlaying && (
                <button type="button" className="chat__skip" onClick={skipPlayback}>
                  show full answer ↵
                </button>
              )}

              {/* Screen readers get the whole reply at once instead of the line-by-line playback. */}
              {(isPlaying || exchange.status === 'done') && (
                <p className="sr-only" aria-live="polite">{exchange.text}</p>
              )}
            </div>
          )}

          {showInput && (
            <form className="chat__form" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={2000}
                placeholder={exchange ? 'ask a follow-up…' : 'type your question…'}
                aria-label={exchange ? 'Ask a follow-up question' : 'Ask Elmer a question'}
                className="chat__input"
              />
            </form>
          )}

          {!exchange && (
            <div className="chat__suggestions">
              {QUICK_PROMPTS.map((prompt) => (
                <button key={prompt} type="button" onClick={() => ask(prompt)}>
                  {prompt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <ChatLauncher
        ref={launcherRef}
        isOpen={isOpen}
        hasInteracted={hasInteracted}
        onOpen={handleOpen}
      />
    </>
  );
}

export default Chatbot;
