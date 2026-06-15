import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, MoreHorizontal, MessageSquareText } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { cn } from '../lib/utils';
import ReactMarkdown from 'react-markdown';

export function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: "Hello! I'm the AI-Solutions virtual assistant. How can I help you transform your business today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          sessionId,
          uid: user?.uid,
        }),
      });
      
      if (res.ok) {
        const data = await res.json();
        setSessionId(data.sessionId);
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I'm having trouble connecting to my servers right now." }]);
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Network error occurred." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 h-14 w-14 bg-secondary text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-secondary/90 focus:outline-none focus:ring-4 focus:ring-secondary/50 transition-all z-50 group content-center"
          >
            <Bot className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed md:bottom-24 md:right-6 bottom-0 right-0 md:w-96 w-full md:h-[600px] h-full bg-slate-900/40 backdrop-blur-xl md:rounded-2xl shadow-3xl flex flex-col overflow-hidden z-50 border border-white/10"
          >
            {/* Header */}
            <div className="bg-secondary/20 backdrop-blur-md px-4 py-4 flex justify-between items-center text-white border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="h-10 w-10 bg-secondary/20 rounded-full flex items-center justify-center">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 border-2 border-slate-900 rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm">AI Virtual Assistant</h3>
                  <p className="text-xs text-blue-200">Online & Ready</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent">
              {messages.map((msg, idx) => (
                <div key={idx} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                  {msg.role === 'assistant' && (
                    <div className="h-8 w-8 rounded-full bg-secondary text-white flex items-center justify-center mr-2 flex-shrink-0 mt-1 shadow-lg shadow-secondary/20">
                       <Bot className="h-4 w-4" />
                    </div>
                  )}
                  <div 
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3 text-sm flex flex-col justify-center",
                      msg.role === 'user' 
                        ? "bg-secondary text-white rounded-tr-sm shadow-lg shadow-secondary/20" 
                        : "bg-white/5 backdrop-blur-md text-white shadow-sm border border-white/10 rounded-tl-sm markdown-body"
                    )}
                  >
                    {msg.role === 'user' ? (
                      <p>{msg.content}</p>
                    ) : (
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="h-8 w-8 rounded-full bg-secondary text-white flex items-center justify-center mr-2 flex-shrink-0 mt-1 shadow-lg shadow-secondary/20">
                     <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-white/5 backdrop-blur-md text-white shadow-sm border border-white/10 rounded-tl-sm rounded-2xl px-4 py-4 max-w-[80%]">
                    <MoreHorizontal className="h-5 w-5 animate-pulse text-slate-400" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-white/5 backdrop-blur-md border-t border-white/10">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask about our AI services..."
                  className="w-full pl-4 pr-12 py-3 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-sm placeholder-slate-400 text-white"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 h-9 w-9 bg-secondary text-white rounded-full flex items-center justify-center hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:hover:bg-secondary"
                  aria-label="Send Message"
                >
                  <Send className="h-4 w-4 ml-0.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
