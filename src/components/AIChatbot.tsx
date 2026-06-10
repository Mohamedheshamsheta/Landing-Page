import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Sparkles, Bot, User as UserIcon, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AIChatbot = ({ context }: { context: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Hello ${context.user.fullName.split(' ')[0]}! I'm your ARD AI assistant. How can I help you with your ${context.user.role === 'Partner' ? 'business' : 'travel plans'} today?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      
      const systemInstruction = `
        You are the ARD AI Assistant, a high-end cultural tourism platform expert.
        Current User Context:
        - Role: ${context.role}
        - Name: ${context.name}
        - Data: ${JSON.stringify({ bookings: context.bookings, services: context.services })}

        Guidelines:
        1. If the user is a Partner: Help them manage their services, explain the fee structure (10% commission), and provide insights on their bookings.
        2. If the user is a Traveller: Help them find experiences, explain the 3% service fee, and assist with their current bookings.
        3. Tone: Professional, sophisticated, helpful, and concise.
        4. Knowledge: You know about 'Journey Planner', 'Local Adventure', and 'Golden Hands' categories.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction
        },
      });

      if (response.text) {
        setMessages(prev => [...prev, { role: 'assistant', content: response.text! }]);
      }
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-12 right-12 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, y: 40, filter: 'blur(10px)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute bottom-24 right-0 w-[450px] h-[700px] bg-paper rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.15)] border border-paper/10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 bg-ink text-paper flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-paper/5 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-paper/10 flex items-center justify-center backdrop-blur-md border border-paper/10">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight">ARD Intelligence</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                    <p className="text-[10px] text-paper/40 uppercase tracking-widest font-black">AI Support Active</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-paper/10 rounded-full transition-colors relative z-10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth bg-paper"
            >
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  key={i}
                  className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-ink text-paper' : 'bg-paper border border-ink/5 text-ink'
                  }`}>
                    {msg.role === 'user' ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`max-w-[80%] p-5 rounded-[1.5rem] text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-ink text-paper rounded-tr-none' 
                      : 'bg-white text-ink border border-ink/5 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-paper border border-ink/5 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 animate-spin text-ink/20" />
                  </div>
                  <div className="bg-white border border-ink/5 p-5 rounded-[1.5rem] rounded-tl-none shadow-sm">
                    <div className="flex gap-1.5">
                      <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-ink/20 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-ink/20 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-ink/20 rounded-full" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-8 border-t border-ink/5 bg-paper">
              <div className="relative group">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="w-full bg-paper border border-ink/10 rounded-2xl py-5 pl-6 pr-16 text-sm focus:bg-white focus:border-ink/20 transition-all outline-none text-ink"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="absolute right-2.5 top-2.5 bottom-2.5 px-5 bg-ink text-paper rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[9px] text-center text-ink/20 mt-4 uppercase tracking-[0.2em] font-bold">Powered by ARD Intelligence Engine</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 bg-ink text-paper rounded-[2rem] flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative group overflow-hidden"
      >
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-tr from-accent/20 via-transparent to-paper/20 opacity-0 group-hover:opacity-100 transition-opacity" 
        />
        <div className="absolute inset-0 bg-ink rounded-[2rem] animate-ping opacity-10 group-hover:opacity-20 transition-opacity" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <X className="w-8 h-8" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
            >
              <Sparkles className="w-8 h-8" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
