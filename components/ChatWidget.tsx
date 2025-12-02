import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/ai';
import { MessageCircle, X, Send, Bot, User, Sparkles, Minimize2, Maximize2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Chào bạn! Mình là trợ lý AI Toán K12. Mình có thể giúp gì cho bạn với các công thức và bài tập?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Auto-scroll on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Trigger MathJax typeset when messages update
  useEffect(() => {
    if (window.MathJax && chatContainerRef.current) {
        // Typeset the container. For better performance in a real app, 
        // we might target only the new message ID, but global is fine for this scale.
        window.MathJax.typesetPromise([chatContainerRef.current])
          .catch((err: any) => console.error(err));
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const botMsgId = (Date.now() + 1).toString();
    const botMsg: ChatMessage = {
      id: botMsgId,
      role: 'model',
      text: '',
      timestamp: new Date(),
      isThinking: true
    };
    
    setMessages(prev => [...prev, botMsg]);

    let fullText = '';

    await sendMessageToGemini(userMsg.text, (chunk) => {
      fullText += chunk;
      setMessages(prev => prev.map(msg => 
        msg.id === botMsgId 
          ? { ...msg, text: fullText, isThinking: false } 
          : msg
      ));
    });

    setIsLoading(false);
  };

  return (
    <>
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-teal-600 hover:bg-teal-700 text-white rounded-full shadow-lg shadow-teal-900/20 transition-all hover:scale-105 z-50 flex items-center gap-2 group"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out font-medium whitespace-nowrap">
            Hỏi AI Toán
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`
            fixed z-50 bg-white shadow-2xl flex flex-col transition-all duration-300 ease-in-out border border-teal-100
            ${isExpanded 
              ? 'top-0 left-0 w-full h-full rounded-none' 
              : 'bottom-6 right-6 w-[400px] h-[600px] max-h-[80vh] rounded-2xl'
            }
          `}
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white flex items-center justify-between rounded-t-xl">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/20 rounded-lg">
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Trợ lý K12 AI</h3>
                <p className="text-xs text-teal-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"/>
                  Sẵn sàng hỗ trợ
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
               <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-teal-50"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-teal-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50"
          >
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div 
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                    ${msg.role === 'user' ? 'bg-teal-100 text-teal-700' : 'bg-teal-600 text-white'}
                  `}
                >
                  {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                
                <div 
                  className={`
                    max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm
                    ${msg.role === 'user' 
                      ? 'bg-white text-slate-800 border border-teal-100' 
                      : 'bg-teal-600 text-white'
                    }
                  `}
                >
                  {msg.isThinking && !msg.text ? (
                     <div className="flex gap-1 items-center h-5 px-1">
                        <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
                        <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
                        <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
                     </div>
                  ) : (
                    <div className={`prose prose-sm max-w-none ${msg.role === 'user' ? 'prose-p:text-slate-800' : 'prose-invert prose-p:text-white prose-a:text-teal-200'}`}>
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100 rounded-b-xl">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Hỏi về bài tập, công thức..."
                disabled={isLoading}
                className="w-full pl-4 pr-12 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all placeholder:text-slate-400 text-slate-700"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-2 p-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:hover:bg-teal-600 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-2">
              AI có thể mắc sai sót. Hãy kiểm tra lại thông tin quan trọng.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;