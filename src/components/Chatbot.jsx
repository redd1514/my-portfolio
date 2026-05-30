import React, { useState, useRef, useEffect } from 'react';
import { BOT_CONTEXT } from '../data/botContext';
import { GoogleGenerativeAI } from "@google/generative-ai";
import profileImg from '../assets/cj.jpg';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm Elmer. Ask me anything about my projects, technical stack, or background!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
  e.preventDefault();
  if (!input.trim() || isLoading) return;

  const userMessage = input.trim();
  setInput('');
  
  // 1. Instantly display user's message in chat layout
  setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
  setIsLoading(true);

  try {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing or undefined.");
  }

  // 1. Initialize the official SDK wrapper
  const genAI = new GoogleGenerativeAI(apiKey);
  
  // 2. Set the model target and provide system instructions
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    systemInstruction: `You are Elmer. Speak exactly as though you are Elmer Benitez II himself talking about your own work. Use this context to answer: ${JSON.stringify(BOT_CONTEXT)}`
  });

  // 3. Format the chat history (skip the greeting so it starts correctly)
  const historyWithoutGreeting = messages.filter((msg, index) => index !== 0);
  const formattedHistory = historyWithoutGreeting.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.text }]
  }));

  // 4. Send the chat history PLUS the newest user message directly to Gemini
  const result = await model.generateContent({
    contents: [
      ...formattedHistory,
      { role: 'user', parts: [{ text: userMessage }] }
    ]
  });

  // 5. Parse out the generated textual response stream safely
  const response = await result.response;
  let botReply = response.text() || "I'm having trouble pulling up that detail right now.";
  
  // Remove markdown asterisks from the response
  botReply = botReply.replace(/\*/g, '');
  
  setMessages((prev) => [...prev, { role: 'assistant', text: botReply }]);

} catch (error) {
  console.error("Detailed Chat Error:", error);
  setMessages((prev) => [
    ...prev, 
    { role: 'assistant', text: "Sorry, I lost connection to server grid. Let's try that question again." }
  ]);
} finally {
    setIsLoading(false);
  }
};
  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans text-sm flex flex-col items-end animate-fade-in">
      {/* 1. Expandable Floating Window Panel */}
      <div 
        className={`absolute bottom-[calc(100%+1rem)] right-0 w-80 md:w-96 h-[450px] rounded-2xl border flex flex-col shadow-2xl transition-all duration-300 origin-bottom-right
        bg-white border-neutral-200 text-black dark:bg-[#0c0c0c] dark:border-neutral-800 dark:text-white
        ${isOpen ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible pointer-events-none'}`}
      >
        {/* Top Bar Header */}
        <div className="p-4 border-b flex justify-between items-center bg-neutral-50 dark:bg-[#121212] border-neutral-200 dark:border-neutral-800 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <img src={profileImg} alt="Elmer" className="w-[38px] h-[38px] rounded-full object-cover" />
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-[#121212]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-[15px]">Chat with Elmer</span>
              <span className="text-xs text-neutral-500 font-medium leading-none mt-1">Online</span>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white font-mono p-1 text-lg leading-none">×</button>
        </div>

        {/* Scrolling Feed Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-black">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <img src={profileImg} alt="Elmer" className="w-8 h-8 rounded-full object-cover shrink-0 mt-1 shadow-[0_2px_4px_rgba(0,0,0,0.1)]" />
              )}
              <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
                {msg.role === 'assistant' && (
                  <span className="text-[11px] text-neutral-500 mb-1 ml-1 font-semibold tracking-tight">Elmer Benitez II</span>
                )}
                <div className={`px-4 py-2.5 leading-relaxed text-[13.5px] border shadow-sm
                  ${msg.role === 'user' 
                    ? 'bg-neutral-900 border-neutral-900 text-white dark:bg-white dark:border-white dark:text-black rounded-2xl rounded-tr-sm' 
                    : 'bg-[#f4f4f5] border-transparent text-neutral-900 dark:bg-[#1a1a1a] dark:border-neutral-800 dark:text-neutral-200 rounded-2xl rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 justify-start">
              <img src={profileImg} alt="Elmer" className="w-8 h-8 rounded-full object-cover shrink-0 mt-1 shadow-[0_2px_4px_rgba(0,0,0,0.1)]" />
              <div className="flex flex-col items-start max-w-[80%]">
                <span className="text-[11px] text-neutral-500 mb-1 ml-1 font-semibold tracking-tight">Elmer Benitez II</span>
                <div className="bg-[#f4f4f5] border-transparent dark:bg-[#1a1a1a] dark:border-neutral-800 text-neutral-500 rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm text-[13.5px] italic font-medium">
                  typing...
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Form Footer */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black rounded-b-2xl flex gap-2">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about my tech stack or projects..."
            className="flex-1 bg-neutral-100 dark:bg-[#121212] border-transparent rounded-full px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-neutral-700 transition-all text-[13px] font-medium placeholder:text-neutral-400"
          />
          <button type="submit" className="bg-neutral-900 text-white dark:bg-white dark:text-black p-2 w-[42px] h-[42px] shrink-0 flex items-center justify-center rounded-sm transition-opacity hover:opacity-90">
            <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>

      {/* 2. Floating Action Launcher Button (Always stays here) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-5 py-3.5 bg-white text-black border border-neutral-300 shadow-xl hover:border-neutral-400 dark:bg-white dark:text-black dark:border-transparent transition-all rounded-sm font-semibold tracking-tight z-10"
      >
        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span>Chat with Elmer</span>
      </button>
    </div>
  );
}

export default Chatbot;