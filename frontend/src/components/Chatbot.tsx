import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I\'m KaishiNihon AI Assistant. How can I help you with your Japanese learning journey today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue.trim());
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Japanese learning related responses
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return 'Konnichiwa! How can I assist you with your Japanese learning today?';
    }
    
    if (input.includes('hiragana') || input.includes('katakana')) {
      return 'Great question! Hiragana and Katakana are the two basic Japanese syllabaries. Hiragana is used for native Japanese words, while Katakana is used for foreign words and emphasis. Would you like to practice them?';
    }
    
    if (input.includes('kanji')) {
      return 'Kanji are Chinese characters used in Japanese writing. They represent both meaning and sound. Start with basic kanji like 人 (person), 日 (sun), and 月 (moon). Our Kanji Mastery course can help you learn systematically!';
    }
    
    if (input.includes('jlpt') || input.includes('n5') || input.includes('n4') || input.includes('n3') || input.includes('n2') || input.includes('n1')) {
      return 'The JLPT (Japanese Language Proficiency Test) has 5 levels: N5 (beginner) to N1 (advanced). Each level tests reading, listening, vocabulary, and grammar. Which level are you aiming for?';
    }
    
    if (input.includes('grammar') || input.includes('sentence')) {
      return 'Japanese grammar follows SOV (Subject-Object-Verb) order, unlike English\'s SVO. Particles like は (wa), が (ga), and を (wo) are crucial. Our Grammar Fundamentals course covers all the basics!';
    }
    
    if (input.includes('speak') || input.includes('conversation') || input.includes('talk')) {
      return 'Speaking Japanese requires practice! Try our Spoken Japanese Mastery course with native speakers. Remember, Japanese has different politeness levels - casual, polite, and formal.';
    }
    
    if (input.includes('online') || input.includes('class') || input.includes('lesson')) {
      return 'We offer various online classes! From JLPT preparation to business Japanese, conversation practice to cultural lessons. Check out our online class page to find the perfect lecturer for you!';
    }
    
    if (input.includes('app') || input.includes('download') || input.includes('mobile')) {
      return 'Yes! We have KaishiMeets for video calls and KaishiMeets Online for web-based learning. Both apps include interactive features, progress tracking, and shared materials.';
    }
    
    if (input.includes('price') || input.includes('cost') || input.includes('fee')) {
      return 'Our pricing varies by course and lecturer. Basic classes start around $15-25/hour, while specialized JLPT courses may cost more. Check individual lecturer profiles for specific rates!';
    }
    
    if (input.includes('teacher') || input.includes('lecturer') || input.includes('instructor')) {
      return 'Our lecturers are certified Japanese language instructors with years of experience. They come from Japan and other countries, offering diverse teaching styles and specializations. Meet them on our online class page!';
    }
    
    if (input.includes('thank')) {
      return 'You\'re welcome! Feel free to ask me anything about Japanese learning, our courses, or how to get started. Ganbatte kudasai! (Do your best!)';
    }
    
    if (input.includes('bye') || input.includes('goodbye')) {
      return 'Sayounara! Good luck with your Japanese studies. Feel free to come back anytime for more help!';
    }
    
    // Default responses
    const defaultResponses = [
      'That\'s an interesting question! Could you tell me more about what you\'re looking to learn?',
      'I\'d be happy to help! Are you interested in grammar, vocabulary, speaking practice, or something else?',
      'Great question! Have you checked out our courses page? We have something for every level.',
      'I\'m here to help with your Japanese learning journey! What specific area would you like to focus on?',
      'That sounds exciting! Our platform offers various resources to help you achieve your goals.'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">KaishiNihon AI</h3>
                  <p className="text-xs text-blue-100">Online Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-md'
                      : 'bg-gray-100 text-gray-900 rounded-bl-md'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && (
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot size={12} className="text-white" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.sender === 'user' && (
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <User size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 rounded-2xl rounded-bl-md p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <Bot size={12} className="text-white" />
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isTyping ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot; 