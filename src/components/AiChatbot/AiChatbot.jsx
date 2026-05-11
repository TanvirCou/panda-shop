import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { BsChatDots, BsSend, BsX } from 'react-icons/bs';
import ReactMarkdown from 'react-markdown';

const AiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("panda_chatbot_messages");
    return savedMessages ? JSON.parse(savedMessages) : [
      { sender: 'bot', text: 'Hi! Ask me anything about our products. I am here to help!' }
    ];
  });
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(() => {
    const savedSessionId = localStorage.getItem("panda_chatbot_session_id");
    if (savedSessionId) return savedSessionId;
    const newSession = Math.random().toString(36).substring(2, 15);
    localStorage.setItem("panda_chatbot_session_id", newSession);
    return newSession;
  });
  const messagesEndRef = useRef(null);

  const webhookUrl = `${import.meta.env.VITE_N8N_URL}/webhook/chat-message`;

  useEffect(() => {
    localStorage.setItem("panda_chatbot_messages", JSON.stringify(messages));
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => scrollToBottom(), 100);
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    
    const userMessage = { sender: 'user', text: inputText };
    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await axios.post(webhookUrl, {
        message: userMessage.text,
        sessionId: sessionId
      });

      console.log(response);
      
      let botText = "I received your message but didn't get a valid text response.";
      
      if (typeof response.data === 'string') {
        botText = response.data;
      } else if (response.data?.output) {
        botText = response.data.output;
      } else if (response.data?.message) {
        botText = response.data.message;
      } else if (response.data?.text) {
        botText = response.data.text;
      } else if (Array.isArray(response.data) && response.data.length > 0) {
        if (response.data[0].output) botText = response.data[0].output;
      } else {
        botText = JSON.stringify(response.data);
      }

      const botMessage = { 
        sender: 'bot', 
        text: botText
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot Error:", error);

      let errorText;
      const status = error?.response?.status;
      const serverMsg = error?.response?.data?.message || error?.response?.data || "";

      if (status === 429 || String(serverMsg).toLowerCase().includes("quota") || String(serverMsg).toLowerCase().includes("rate limit")) {
        errorText = "⚠️ The AI is a bit overwhelmed right now (quota limit reached). Please wait a moment and try again.";
      } else if (status === 503 || String(serverMsg).toLowerCase().includes("busy") || String(serverMsg).toLowerCase().includes("overloaded")) {
        errorText = "🔄 The AI model is currently busy. Please try again in a few seconds.";
      } else if (!error?.response) {
        errorText = "📡 Could not reach the server. Please check your connection and try again.";
      } else {
        errorText = "❌ Something went wrong. Please try again later.";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: errorText, isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-[350px] h-[500px] overflow-hidden border border-gray-200 transition-all duration-300 animate-fade-in">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md z-10">
            <div>
              <h3 className="font-bold text-lg leading-tight">PandaBot</h3>
              <p className="text-xs text-blue-100 font-medium tracking-wide">AI Assistant</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-red-200 transition-colors p-1 bg-white/10 rounded-full hover:bg-white/20">
              <BsX size={24} />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-5 bg-gray-50 overflow-y-auto flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`max-w-[85%] rounded-2xl p-3 text-[14px] leading-relaxed 
                ${msg.sender === 'user' 
                  ? 'bg-blue-600 text-white self-end rounded-br-sm shadow-md' 
                  : msg.isError 
                    ? 'bg-amber-50 text-amber-800 self-start shadow-sm rounded-bl-sm border border-amber-200' 
                    : 'bg-white text-gray-800 self-start shadow-sm rounded-bl-sm border border-gray-100'}`}>
                {msg.sender === 'user' ? (
                  msg.text
                ) : (
                  <div className="flex flex-col gap-2">
                    <ReactMarkdown 
                      components={{
                        p: ({node, ...props}) => <p className="mb-1" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                        li: ({node, ...props}) => <li {...props} />,
                        strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="bg-white text-gray-800 self-start shadow-sm rounded-2xl rounded-bl-sm p-3 text-sm border border-gray-100 flex gap-2 items-center">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 outline-none text-[14px] transition-all focus:ring-2 focus:ring-blue-500/50 focus:bg-white focus:border-blue-300 border border-transparent"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !inputText.trim()}
              className="bg-blue-600 text-white p-2.5 rounded-full shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed transition-all transform active:scale-95"
            >
              <BsSend size={18} className="-translate-x-0.5 translate-y-0.5" />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white flex items-center justify-center w-[60px] h-[60px] rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.24)] hover:shadow-[0_8px_30px_rgb(37,99,235,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <BsChatDots size={28} />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
          </span>
        </button>
      )}
    </div>
  );
};

export default AiChatbot;
