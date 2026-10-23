import React, { useCallback, useEffect, useRef, useState } from 'react';
import profileImg from '../assets/dark_mode_profile.jpg';

const INITIAL_MESSAGE = {
  role: 'assistant',
  text: "Hi! I'm Elmer. Ask me anything about my projects, technical stack, or background!",
  isGreeting: true,
};
const QUICK_PROMPTS = [
  'What projects have you built?',
  'What is your tech stack?',
  'Tell me about your experience.',
];
const MAX_VISIBLE_MESSAGES = 40;
const MAX_REQUEST_MESSAGES = 20;
const REQUEST_TIMEOUT_MS = 30_000;

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (isOpen && hasInteracted) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, hasInteracted]);

  useEffect(() => {
    if (isOpen && hasInteracted) {
      inputRef.current?.focus();
    }
  }, [isOpen, hasInteracted]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    requestAnimationFrame(() => launcherRef.current?.focus());
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    requestAnimationFrame(() => closeRef.current?.focus());
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  const startConversation = () => {
    setHasInteracted(true);
  };

  const appendMessage = (message) => {
    setMessages((prev) => {
      const conversation = [...prev.filter((item) => !item.isGreeting), message]
        .slice(-MAX_VISIBLE_MESSAGES);
      return [INITIAL_MESSAGE, ...conversation];
    });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    startConversation();
    const userMessage = input.trim();
    const conversation = [
      ...messages.filter((message) => !message.isGreeting && !message.isError),
      { role: 'user', text: userMessage },
    ].slice(-MAX_REQUEST_MESSAGES);

    setInput('');
    appendMessage({ role: 'user', text: userMessage });
    setIsLoading(true);

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

      appendMessage({ role: 'assistant', text: data.text.trim() });
    } catch (error) {
      console.error('Chat request failed:', error);
      const errorText = error.name === 'AbortError'
        ? 'The request timed out. Please try again.'
        : error.message || 'The chat service is temporarily unavailable.';
      appendMessage({ role: 'assistant', text: errorText, isError: true });
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (prompt) => {
    startConversation();
    setInput(prompt);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <>
      <div
        id="portfolio-chatbot"
        className={`fixed inset-0 z-[60] transition-opacity duration-500 ease-out ${isOpen ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Chat with Elmer"
        aria-hidden={!isOpen}
      >
        <div className="absolute inset-0 bg-white/[0.86] backdrop-blur-xl" />

        <div className="relative z-10 flex h-full min-h-0 flex-col text-black">
          <header className="flex shrink-0 items-center justify-between px-6 py-5 md:px-[8vw] md:py-7">
            <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 md:text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_5px_rgba(16,185,129,0.13)]" />
              Elmer / assistant
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={handleClose}
              aria-label="Close chat"
              className="rounded-full p-2 text-neutral-500 transition-colors hover:bg-black/10 hover:text-black focus:outline-none focus:ring-2 focus:ring-black/30"
            >
              <CloseIcon />
            </button>
          </header>

          {!hasInteracted ? (
            <div className="flex min-h-0 flex-1 flex-col justify-between px-6 pb-8 md:px-[8vw] md:pb-12">
              <div className="flex flex-1 items-center">
                <div className="w-full max-w-[1500px]">
                  <p className="max-w-[1400px] font-mono text-[clamp(2.5rem,5.2vw,5.8rem)] font-normal leading-[0.92] tracking-[-0.09em] text-neutral-950">
                    what do you want to ask?
                  </p>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-neutral-500 md:mt-8 md:text-lg">
                    Ask about my work, technical stack, or experience.
                  </p>
                </div>
              </div>

              <div className="w-full max-w-[1500px]">
                <div className="flex items-center gap-4 border-b border-black/20 pb-3 transition-colors focus-within:border-black">
                  <form onSubmit={handleSendMessage} className="flex min-w-0 flex-1 items-center gap-3">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onFocus={startConversation}
                      onChange={(e) => setInput(e.target.value)}
                      maxLength={2000}
                      placeholder="type your question..."
                      aria-label="Ask Elmer a question"
                      className="min-w-0 flex-1 bg-transparent py-2 font-mono text-lg font-normal text-black placeholder:text-neutral-400 focus:outline-none md:text-2xl"
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      aria-label="Send question"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white transition-all hover:-translate-y-0.5 hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ArrowIcon />
                    </button>
                  </form>
                </div>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handleQuickPrompt(prompt)}
                      className="text-left text-xs text-neutral-500 underline-offset-4 transition-colors hover:text-black hover:underline focus:outline-none focus:ring-2 focus:ring-black/30"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex min-h-0 flex-1 flex-col px-6 pb-7 md:px-[8vw] md:pb-10">
              <div className="mx-auto flex min-h-0 w-full max-w-4xl flex-1 flex-col">
                <div className="chatbot-scrollbar min-h-0 flex-1 space-y-7 overflow-y-auto py-4 md:py-8" aria-live="polite">
                  {messages.map((msg, idx) => (
                    <div key={`${msg.role}-${idx}`} className="chat-message-in flex gap-3 md:gap-4">
                      {msg.role === 'assistant' && (
                        <img src={profileImg} alt="Elmer" className="mt-1 h-9 w-9 shrink-0 rounded-full object-cover shadow-[0_2px_4px_rgba(0,0,0,0.12)] md:h-10 md:w-10" />
                      )}
                      <div className={`flex max-w-3xl flex-col ${msg.role === 'user' ? 'ml-auto items-end' : 'items-start'}`}>
                        {msg.role === 'assistant' && (
                          <span className="mb-2 ml-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500">Elmer Benitez II</span>
                        )}
                        <div
                          className={`max-w-full border px-5 py-3.5 text-sm leading-relaxed shadow-sm backdrop-blur-md md:px-6 md:py-4 md:text-base ${msg.role === 'user'
                            ? 'rounded-3xl rounded-tr-md border-black/10 bg-black/[0.88] text-white'
                            : `rounded-3xl rounded-tl-md border-black/10 bg-white/[0.68] text-neutral-900 ${msg.isError ? 'text-red-600' : ''}`
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="chat-message-in flex gap-3 md:gap-4">
                      <img src={profileImg} alt="Elmer" className="mt-1 h-9 w-9 shrink-0 rounded-full object-cover shadow-[0_2px_4px_rgba(0,0,0,0.12)] md:h-10 md:w-10" />
                      <div className="flex flex-col items-start">
                        <span className="mb-2 ml-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500">Elmer Benitez II</span>
                        <div className="rounded-3xl rounded-tl-md border border-black/10 bg-white/[0.68] px-6 py-4 text-neutral-500 shadow-sm backdrop-blur-md">
                          <span className="inline-flex gap-1.5" aria-label="Elmer is typing">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-current" />
                            <span className="h-2 w-2 animate-pulse rounded-full bg-current [animation-delay:150ms]" />
                            <span className="h-2 w-2 animate-pulse rounded-full bg-current [animation-delay:300ms]" />
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className="flex shrink-0 items-center gap-3 border-b border-black/20 pb-3 transition-colors focus-within:border-black">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    maxLength={2000}
                    placeholder="ask a follow-up..."
                    aria-label="Ask a follow-up question"
                    className="min-w-0 flex-1 bg-transparent py-2 font-mono text-lg font-normal text-black placeholder:text-neutral-400 focus:outline-none md:text-2xl"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    aria-label="Send question"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white transition-opacity hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ArrowIcon />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        ref={launcherRef}
        type="button"
        onClick={handleOpen}
        aria-expanded={isOpen}
        aria-controls="portfolio-chatbot"
        aria-hidden={isOpen}
        tabIndex={isOpen ? -1 : 0}
        className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 border px-5 py-3.5 font-semibold tracking-tight shadow-xl transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 md:bottom-6 md:right-6 ${isOpen
          ? 'pointer-events-none scale-95 opacity-0'
          : 'rounded-sm border-neutral-300 bg-white text-black hover:border-neutral-400 dark:border-transparent dark:bg-white dark:text-black'
        }`}
      >
        <svg aria-hidden="true" className="h-5 w-5 animate-float" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span>{hasInteracted ? 'Continue chat' : 'Chat with me'}</span>
      </button>
    </>
  );
}

export default Chatbot;
