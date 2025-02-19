import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, Trash2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  type: 'user' | 'bot';
  content: string;
  language?: string;
  isTypingComplete?: boolean;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

// Custom avatar URLs
const AI_AVATAR_URL = "/my-avatar.png";
const USER_AVATAR_URL = "/hippie_4526032.png";

const WELCOME_MESSAGE = {
  type: 'bot' as const,
  content: "Hey there! 👋 I'm Mohit's digital assistant. I'd love to tell you all about his journey, skills, and the amazing projects he's worked on. What would you like to know?",
  language: 'en',
  isTypingComplete: true
};

const SUGGESTIONS = [
  "Skills",
  "Education",
  "Experience",
  "Projects",
  "Contact Info",
  "Resume"
];

const TYPING_SPEED = 150;
const BACKSPACE_SPEED = 50;
const PAUSE_DURATION = 2000;

const formatMessageContent = (content: string) => {
  content = content.replace(
    /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi,
    '<a href="mailto:$1" class="text-cyan-400 hover:text-cyan-300 underline">$1</a>'
  );

  content = content.replace(
    /(\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/g,
    '<a href="tel:$1" class="text-cyan-400 hover:text-cyan-300 underline">$1</a>'
  );

  content = content.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:text-cyan-300 underline">$1</a>'
  );

  content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  return content;
};

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [displayedSuggestion, setDisplayedSuggestion] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const typeAndErase = async (text: string) => {
    for (let i = 0; i <= text.length; i++) {
      if (isFocused) return;
      setDisplayedSuggestion(text.substring(0, i));
      await new Promise(resolve => setTimeout(resolve, TYPING_SPEED));
    }

    await new Promise(resolve => setTimeout(resolve, PAUSE_DURATION));

    for (let i = text.length; i >= 0; i--) {
      if (isFocused) return;
      setDisplayedSuggestion(text.substring(0, i));
      await new Promise(resolve => setTimeout(resolve, BACKSPACE_SPEED));
    }
  };

  useEffect(() => {
    let isActive = true;

    const animateSuggestions = async () => {
      while (isActive && !isFocused) {
        for (const suggestion of SUGGESTIONS) {
          if (!isActive || isFocused) break;
          await typeAndErase(suggestion);
        }
      }
    };

    if (!isFocused && input === '') {
      animateSuggestions();
    }

    return () => {
      isActive = false;
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [isFocused, input]);

  const handleInputFocus = () => {
    setIsFocused(true);
    setDisplayedSuggestion('');
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    if (input.trim() === '') {
      setDisplayedSuggestion('');
    }
  };

  const handleDownloadResume = () => {
    const resumeUrl = '/resume/Mohit_Goyal_Resume.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Mohit_Goyal_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setShowClearConfirm(false);
  };

  const TypedMessage: React.FC<{ message: Message, index: number }> = ({ message, index }) => {
    const [displayedContent, setDisplayedContent] = useState(message.isTypingComplete ? formatMessageContent(message.content) : '');
    const contentRef = useRef(message.content);
    const typingRef = useRef<number | null>(null);

    useEffect(() => {
      if (message.isTypingComplete || message.content !== contentRef.current) {
        setDisplayedContent(formatMessageContent(message.content));
        contentRef.current = message.content;
        return;
      }

      if (!message.isTypingComplete) {
        const words = message.content.split(' ');
        let currentIndex = 0;

        typingRef.current = window.setInterval(() => {
          if (currentIndex < words.length) {
            setDisplayedContent(prev => 
              formatMessageContent(prev + (prev ? ' ' : '') + words[currentIndex])
            );
            currentIndex++;
          } else {
            if (typingRef.current) {
              clearInterval(typingRef.current);
            }
            setMessages(prev => prev.map((m, i) => 
              i === index ? { ...m, isTypingComplete: true } : m
            ));
          }
        }, 50);

        return () => {
          if (typingRef.current) {
            clearInterval(typingRef.current);
          }
        };
      }
    }, [message.content, message.isTypingComplete, index]);

    return (
      <div 
        className="text-base md:text-lg"
        dangerouslySetInnerHTML={{ __html: displayedContent }}
      />
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    
    if (!trimmedInput || isLoading) return;

    setIsLoading(true);

    try {
      const userMessage: Message = { 
        type: 'user', 
        content: trimmedInput,
        language: 'en',
        isTypingComplete: true
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInput(''); // Clear input after adding message

      const resumeKeywords = ['resume', 'cv', 'download resume', 'get resume', 'रेज्यूमे', 'सीवी'];
      if (resumeKeywords.some(keyword => trimmedInput.toLowerCase().includes(keyword))) {
        const resumeMessage: Message = {
          type: 'bot',
          content: "I'll be happy to share Mohit's resume with you! You can download it right away. 📄",
          language: 'en',
          isTypingComplete: true
        };
        setMessages(prev => [...prev, resumeMessage]);
        handleDownloadResume();
      } else {
        // Simulated bot response
        const botMessage: Message = { 
          type: 'bot', 
          content: "I understand you're interested in knowing more. Let me help you with that!",
          language: 'en',
          isTypingComplete: false
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error in chat:', error);
      const errorMessage: Message = {
        type: 'bot',
        content: "I'm having a bit of trouble processing that right now. Could you please try asking again? 🙏",
        language: 'en',
        isTypingComplete: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-4 right-4 w-[90vw] md:w-[600px] lg:w-[500px] h-[80vh] md:h-[600px] bg-gray-900 rounded-lg shadow-2xl overflow-hidden z-50 border border-cyan-500/20"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4 flex justify-between items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1200&auto=format&fit=crop&q=60')] opacity-20 bg-cover bg-center" />
            <div className="flex items-center space-x-3 relative z-10">
              <div className="relative">
                <img 
                  src={AI_AVATAR_URL}
                  alt="AI Assistant" 
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white">
                  <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></div>
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Mohit's Assistant</h3>
                <div className="flex items-center space-x-1">
                  <Sparkles size={14} className="text-cyan-200" />
                  <p className="text-xs text-cyan-100">AI-Powered Helper</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 relative z-10">
              <button 
                onClick={() => setShowClearConfirm(true)}
                className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                title="Clear chat"
              >
                <Trash2 size={20} />
              </button>
              <button 
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                title="Close chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Clear Chat Confirmation */}
          <AnimatePresence>
            {showClearConfirm && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-20 left-4 right-4 bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-700 z-50"
              >
                <p className="text-white mb-4">Are you sure you want to clear the chat history?</p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="px-4 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleClearChat}
                    className="px-4 py-2 rounded-md text-sm bg-red-500 hover:bg-red-600 text-white transition-colors"
                  >
                    Clear Chat
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages */}
          <div className="p-4 h-[calc(100%-8rem)] overflow-y-auto bg-gradient-to-b from-gray-900 to-gray-800 custom-scrollbar">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`mb-6 flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.type === 'bot' && (
                  <div className="relative">
                    <img 
                      src={AI_AVATAR_URL}
                      alt="AI" 
                      className="w-10 h-10 rounded-full object-cover border-2 border-cyan-400 shadow-lg mr-3 mt-1"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-4 rounded-2xl shadow-lg ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                      : 'bg-gray-700/90 text-white backdrop-blur-sm'
                  } ${message.language === 'hi' ? 'font-hindi' : ''} transition-all hover:shadow-xl`}
                  dir={message.language === 'ar' ? 'rtl' : 'ltr'}
                >
                  {!message.isTypingComplete ? (
                    <TypedMessage message={message} index={index} />
                  ) : (
                    <div 
                      className="text-base md:text-lg"
                      dangerouslySetInnerHTML={{ 
                        __html: formatMessageContent(message.content)
                      }}
                    />
                  )}
                </div>
                {message.type === 'user' && (
                  <div className="relative">
                    <img 
                      src={USER_AVATAR_URL}
                      alt="User" 
                      className="w-10 h-10 rounded-full object-cover border-2 border-blue-400 shadow-lg ml-3 mt-1"
                    />
                  </div>
                )}
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form 
            onSubmit={handleSubmit}
            className="absolute bottom-0 left-0 right-0 p-4 bg-gray-800/95 backdrop-blur-sm border-t border-gray-700"
          >
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder={isFocused ? "Ask me anything..." : ""}
                  disabled={isLoading}
                  className="w-full px-6 py-3 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50 text-base transition-all border border-gray-600 hover:border-gray-500 focus:border-cyan-400"
                />
                {!isFocused && input === '' && (
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none whitespace-nowrap">
                    Ask About Mohit's <span className="text-cyan-400">{displayedSuggestion}</span>
                    <span className="animate-pulse">|</span>
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white hover:opacity-90 transition-all disabled:opacity-50 shadow-lg hover:shadow-cyan-500/20 active:scale-95"
              >
                {isLoading ? (
                  <Loader2 size={24} className="animate-spin" />
                ) : (
                  <Send size={24} />
                )}
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatBot;