import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Globe, MessageCircle, Users, CheckCircle, TrendingUp, Sparkles, Brain, 
  Zap, Target, Shield, Award, Star, Plus, Minus, ChevronUp, Mic, Camera, Play, 
  Pause, Volume2, Eye, Fingerprint, Rocket, Gamepad2, Trophy, Gift, Heart, 
  Flame, Gem, Crown, Wand2, Sword, Atom, Dna, Infinity, User
} from 'lucide-react';
import AuthModal from '../components/AuthModal';

const Home: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [currentWord, setCurrentWord] = useState(0);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHolographic, setIsHolographic] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [isGameMode, setIsGameMode] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [isARMode, setIsARMode] = useState(false);
  const [aiPersonality, setAiPersonality] = useState('friendly');
  const [weatherEffect, setWeatherEffect] = useState('clear');
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [userLevel, setUserLevel] = useState(1);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const dynamicWords = [
    'AI-Powered Japan Immigration Revolution',
    'Experience the Impossible',
    'Your Dreams Become Reality',
    'Next-Level Immigration Magic',
    'AI Beyond Your Imagination'
  ];

  const aiPersonalities = [
    { name: 'Friendly', color: 'from-blue-400 to-cyan-400', emoji: '😊' },
    { name: 'Professional', color: 'from-gray-400 to-slate-400', emoji: '💼' },
    { name: 'Energetic', color: 'from-yellow-400 to-orange-400', emoji: '⚡' },
    { name: 'Mystical', color: 'from-purple-400 to-pink-400', emoji: '🔮' },
    { name: 'Futuristic', color: 'from-green-400 to-teal-400', emoji: '🚀' }
  ];

  // Simple background animation effects
  useEffect(() => {
    // Simple animation effects can be added here if needed
  }, []);

  // Dynamic Typing Effect with Word Rotation
  useEffect(() => {
    const currentText = dynamicWords[currentWord];
    if (typedText.length < currentText.length) {
      const timeout = setTimeout(() => {
        setTypedText(currentText.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setTypedText('');
        setCurrentWord((prev) => (prev + 1) % dynamicWords.length);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [typedText, currentWord]);

  // Mouse Movement Parallax Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / documentHeight;
      
      setShowScrollTop(scrollTop > 300);
      setCurrentSection(Math.floor(scrollPercent * 10));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
    if (!isVoiceActive) {
      setAchievements(prev => [...prev, 'Voice Activated']);
    }
  };

  const toggleGameMode = () => {
    setIsGameMode(!isGameMode);
    setUserScore(prev => prev + 10);
    if (!isGameMode) {
      setAchievements(prev => [...prev, 'Game Mode Unlocked']);
    }
  };

  const toggleARMode = () => {
    setIsARMode(!isARMode);
    setUserLevel(prev => prev + 1);
    if (!isARMode) {
      setAchievements(prev => [...prev, 'AR Experience']);
    }
  };

  return (
    <>
      {/* Original Dark Theme Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
          {/* Floating Particles */}
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 animate-pulse"></div>
      </div>

      {/* Holographic Overlay */}
      {isHolographic && (
        <div className="fixed inset-0 z-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-transparent to-purple-500/20 animate-pulse"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[length:20px_20px] animate-pulse"></div>
        </div>
      )}

      {/* Floating Control Panel */}
      <div className="fixed top-20 right-6 z-50 space-y-3">
        <button
          onClick={() => setIsHolographic(!isHolographic)}
          className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-110 group"
        >
          <Eye className="w-6 h-6 text-white group-hover:animate-pulse" />
        </button>
        
        <button
          onClick={toggleVoice}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 ${
            isVoiceActive ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse' : 'bg-gradient-to-r from-green-500 to-emerald-500'
          }`}
        >
          <Mic className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={toggleGameMode}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 ${
            isGameMode ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-orange-500 to-red-500'
          }`}
        >
          <Gamepad2 className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={toggleARMode}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 ${
            isARMode ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'
          }`}
        >
          <Atom className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* User Stats HUD */}
      <div className="fixed bottom-6 left-6 z-40 bg-black/60 backdrop-blur-xl rounded-xl p-3 border border-white/20">
        <div className="flex items-center space-x-3 text-white">
          <div className="flex items-center space-x-1">
            <Crown className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-bold">L{userLevel}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Trophy className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-bold">{userScore}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Gift className="w-4 h-4 text-pink-400" />
            <span className="text-xs font-bold">{achievements.length}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 min-h-screen">
        {/* Hero Section - Two Column Layout */}
        <section className="min-h-screen flex items-center relative overflow-hidden py-20">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Side - Content */}
              <div className="space-y-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl">
                    <span className="text-white font-bold text-3xl">始</span>
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                      Kaishi Nihon
                    </h1>
                    <p className="text-purple-300 text-lg">Your AI-Powered Immigration Partner</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                      Start Your Journey
                    </span>
                    <br />
                    <span className="text-white">to Japan Today</span>
                  </h2>
                  
                  <p className="text-xl text-white/80 leading-relaxed mb-8 max-w-lg">
                    Experience Japan immigration like never before with our AI-powered platform. 
                    Get personalized guidance, visa assistance, and cultural preparation all in one place.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="group relative overflow-hidden px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"></div>
                    <div className="relative flex items-center justify-center space-x-3 text-black">
                      <Rocket className="w-5 h-5" />
                      <span>Get Started Free</span>
                    </div>
                  </button>
                  
                  <button className="group px-8 py-4 rounded-full text-lg font-bold text-white border-2 border-white/30 hover:border-white/60 transition-all duration-300 transform hover:scale-105">
                    <div className="flex items-center justify-center space-x-3">
                      <Play className="w-5 h-5" />
                      <span>Watch Demo</span>
                    </div>
                  </button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-6 pt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">15K+</div>
                    <div className="text-sm text-gray-300">Success Stories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">99.8%</div>
                    <div className="text-sm text-gray-300">Approval Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">24/7</div>
                    <div className="text-sm text-gray-300">AI Support</div>
                  </div>
                </div>
              </div>

              {/* Right Side - AI Assistant */}
              <div className="relative">
                <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                  {/* AI Assistant Header */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl animate-pulse">
                      🤖
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">AI Assistant</h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-400">Online - Ready to help</span>
                      </div>
                    </div>
                  </div>

                  {/* Chat Interface */}
                  <div className="space-y-4 mb-6">
                    <div className="bg-blue-600/20 rounded-2xl rounded-bl-none p-4 max-w-xs">
                      <p className="text-white text-sm">
                        👋 Hi! I'm your AI immigration assistant. I can help you with visa applications, document preparation, and cultural guidance. What would you like to know about moving to Japan?
                      </p>
                    </div>
                    
                    <div className="flex justify-end">
                      <div className="bg-purple-600/20 rounded-2xl rounded-br-none p-4 max-w-xs">
                        <p className="text-white text-sm">
                          I want to work in Japan as a software engineer. Can you help me understand the visa requirements?
                        </p>
                      </div>
                    </div>

                    <div className="bg-blue-600/20 rounded-2xl rounded-bl-none p-4 max-w-xs">
                      <p className="text-white text-sm">
                        🎯 Perfect! For software engineers, you'll need a Engineer/Specialist visa. I'll analyze your profile and create a personalized roadmap. Let me check your eligibility...
                      </p>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button className="bg-purple-600/20 hover:bg-purple-600/30 rounded-xl p-3 text-white text-sm transition-colors border border-purple-500/30">
                      <div className="flex items-center space-x-2">
                        <Brain className="w-4 h-4" />
                        <span>Visa Check</span>
                      </div>
                    </button>
                    <button className="bg-blue-600/20 hover:bg-blue-600/30 rounded-xl p-3 text-white text-sm transition-colors border border-blue-500/30">
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4" />
                        <span>Cultural Guide</span>
                      </div>
                    </button>
                    <button className="bg-green-600/20 hover:bg-green-600/30 rounded-xl p-3 text-white text-sm transition-colors border border-green-500/30">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4" />
                        <span>Job Matching</span>
                      </div>
                    </button>
                    <button className="bg-pink-600/20 hover:bg-pink-600/30 rounded-xl p-3 text-white text-sm transition-colors border border-pink-500/30">
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4" />
                        <span>Community</span>
                      </div>
                    </button>
                  </div>

                  {/* Input Area */}
                  <div className="flex items-center space-x-3 bg-white/10 rounded-full p-2">
                    <input
                      type="text"
                      placeholder="Ask me anything about Japan immigration..."
                      className="flex-1 bg-transparent text-white placeholder-white/50 px-4 py-2 outline-none"
                    />
                    <button className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Revolutionary AI Features Showcase */}
        <section className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-6xl font-bold mb-8">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  🚀 Revolutionary AI Features
                </span>
              </h2>
              <p className="text-2xl text-white/80 max-w-3xl mx-auto">
                Technology that feels like magic, experiences that seem impossible
              </p>
            </div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {[
                {
                  title: '🧠 Quantum AI Predictor',
                  description: 'Predict your visa approval with 99.9% accuracy using quantum computing',
                  icon: Brain,
                  color: 'from-purple-500 to-pink-500',
                  features: ['Quantum Computing', 'Neural Networks', 'Real-time Analysis']
                },
                {
                  title: '⚡ Instant Translation',
                  description: 'Translate any document instantly with AI-powered OCR',
                  icon: Zap,
                  color: 'from-yellow-500 to-orange-500',
                  features: ['OCR Technology', 'Real-time Translation', 'Voice Support']
                },
                {
                  title: '🎯 Smart Roadmap',
                  description: 'AI creates your personalized path to Japan',
                  icon: Target,
                  color: 'from-green-500 to-emerald-500',
                  features: ['Personalized Plan', 'Timeline Optimization', 'Success Tracking']
                },
                {
                  title: '🔮 Future Simulator',
                  description: 'See your life in Japan before you move',
                  icon: Gem,
                  color: 'from-cyan-500 to-blue-500',
                  features: ['VR Preview', 'Life Simulation', 'City Matching']
                },
                {
                  title: '🎮 Gamified Learning',
                  description: 'Learn Japanese through interactive games',
                  icon: Gamepad2,
                  color: 'from-indigo-500 to-purple-500',
                  features: ['Game Mechanics', 'Progress Tracking', 'Achievements']
                },
                {
                  title: '🌟 AI Companion',
                  description: '24/7 AI friend that understands your journey',
                  icon: Heart,
                  color: 'from-pink-500 to-red-500',
                  features: ['Emotional Support', 'Personality Matching', 'Always Available']
                }
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
                    <div className="relative bg-black/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 group-hover:border-white/40 transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-2">
                      <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:rotate-12 transition-transform duration-500`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                      <p className="text-white/80 mb-6 leading-relaxed">{feature.description}</p>
                      <div className="space-y-2">
                        {feature.features.map((feat, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <div className={`w-2 h-2 bg-gradient-to-r ${feature.color} rounded-full`}></div>
                            <span className="text-white/70 text-sm">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* AI-Powered Features - Floating Timeline Design */}
        <section className="py-32 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-red-600/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse animation-delay-2000"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-24">
              <h2 className="text-6xl lg:text-7xl font-black mb-6">
                <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Revolutionary AI Features
                </span>
              </h2>
              <p className="text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                Experience the future of Japan immigration with our cutting-edge AI technology
              </p>
            </div>

            {/* Floating Feature Timeline */}
            <div className="relative">
              {/* Central Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-400"></div>
              
              <div className="space-y-32">
                {/* Feature 1 - Left Side */}
                <div className="flex items-center justify-between">
                  <div className="w-5/12 group">
                    <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-xl rounded-[3rem] p-10 border border-cyan-300/20 transform group-hover:scale-105 transition-all duration-700 group-hover:rotate-1">
                      <div className="flex items-center space-x-5 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-2xl">
                          🧠
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">AI Life Simulator</h3>
                          <p className="text-cyan-300 text-base">Experience Japan Before You Arrive</p>
                        </div>
                      </div>
                      <p className="text-white/90 text-base leading-relaxed mb-6">
                        Step into a virtual Japan and experience daily life scenarios, cultural situations, and real-world challenges through our advanced AI simulation.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 bg-cyan-500/20 rounded-full text-cyan-300 text-sm">Virtual Reality</span>
                        <span className="px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 text-sm">Cultural Training</span>
                        <span className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm">AI Scenarios</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeline Node */}
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full border-4 border-white/30 flex items-center justify-center z-10">
                    <div className="w-6 h-6 bg-white rounded-full animate-pulse"></div>
                  </div>
                  
                  <div className="w-5/12"></div>
                </div>

                {/* Feature 2 - Right Side */}
                <div className="flex items-center justify-between">
                  <div className="w-5/12"></div>
                  
                  {/* Timeline Node */}
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full border-4 border-white/30 flex items-center justify-center z-10">
                    <div className="w-6 h-6 bg-white rounded-full animate-pulse animation-delay-1000"></div>
                  </div>
                  
                  <div className="w-5/12 group">
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-[3rem] p-10 border border-purple-300/20 transform group-hover:scale-105 transition-all duration-700 group-hover:-rotate-1">
                      <div className="flex items-center space-x-5 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-2xl">
                          💬
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">Smart Language AI</h3>
                          <p className="text-pink-300 text-base">Master Japanese with AI Tutoring</p>
                        </div>
                      </div>
                      <p className="text-white/90 text-base leading-relaxed mb-6">
                        Our AI language companion adapts to your learning style, provides real-time pronunciation feedback, and creates personalized conversation scenarios.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm">Voice Recognition</span>
                        <span className="px-4 py-2 bg-pink-500/20 rounded-full text-pink-300 text-sm">Real Conversations</span>
                        <span className="px-4 py-2 bg-red-500/20 rounded-full text-red-300 text-sm">Adaptive Learning</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature 3 - Left Side */}
                <div className="flex items-center justify-between">
                  <div className="w-5/12 group">
                    <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 backdrop-blur-xl rounded-[3rem] p-10 border border-green-300/20 transform group-hover:scale-105 transition-all duration-700 group-hover:rotate-1">
                      <div className="flex items-center space-x-5 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center text-2xl">
                          🏠
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">Virtual Housing Portal</h3>
                          <p className="text-green-300 text-base">Explore Your Future Home in 3D</p>
                        </div>
                      </div>
                      <p className="text-white/90 text-base leading-relaxed mb-6">
                        Take immersive 3D tours of apartments, calculate commute times, and explore neighborhoods with our advanced virtual reality platform.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 bg-green-500/20 rounded-full text-green-300 text-sm">3D Tours</span>
                        <span className="px-4 py-2 bg-teal-500/20 rounded-full text-teal-300 text-sm">Neighborhood Guide</span>
                        <span className="px-4 py-2 bg-emerald-500/20 rounded-full text-emerald-300 text-sm">Commute Calculator</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeline Node */}
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-full border-4 border-white/30 flex items-center justify-center z-10">
                    <div className="w-6 h-6 bg-white rounded-full animate-pulse animation-delay-2000"></div>
                  </div>
                  
                  <div className="w-5/12"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo Section - Curved Design */}
        <section className="py-32 relative">
          {/* Curved Background */}
          <div className="absolute inset-0">
            <svg viewBox="0 0 1440 320" className="absolute top-0 w-full h-32 transform rotate-180">
              <path fill="url(#gradient1)" fillOpacity="0.3" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="bg-gradient-to-b from-blue-900/20 via-purple-900/20 to-pink-900/20 h-full"></div>
          </div>

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-6xl font-bold mb-8">
                <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
                  Try Our AI Demo
                </span>
              </h2>
              <p className="text-2xl text-white/80">
                Experience the power of our AI technology in real-time
              </p>
            </div>

            {/* Interactive Demo Grid */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Side - Demo Interface */}
              <div className="relative">
                <div className="bg-black/60 backdrop-blur-2xl rounded-3xl border border-white/20 overflow-hidden">
                  {/* Mock Terminal Header */}
                  <div className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 p-4 flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-white font-mono text-sm ml-4">Kaishi AI Demo</span>
                  </div>
                  
                  {/* Demo Content */}
                  <div className="p-8">
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                          🤖
                        </div>
                        <div className="flex-1">
                          <div className="bg-blue-500/20 rounded-2xl rounded-bl-none p-4">
                            <p className="text-white">Hi! I'm your AI immigration assistant. I can analyze your profile and predict your visa approval chances. What's your background?</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4 justify-end">
                        <div className="flex-1">
                          <div className="bg-purple-500/20 rounded-2xl rounded-br-none p-4 ml-12">
                            <p className="text-white">I'm a software engineer with 5 years experience, looking to work in Tokyo.</p>
                          </div>
                        </div>
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                          👤
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                          🤖
                        </div>
                        <div className="flex-1">
                          <div className="bg-blue-500/20 rounded-2xl rounded-bl-none p-4">
                            <p className="text-white">Perfect! Based on your profile, I recommend the Engineer/Specialist visa. Your approval probability is <span className="text-green-400 font-bold">98.7%</span>. Let me create your personalized roadmap...</p>
                            <div className="mt-4">
                              <div className="bg-green-500/30 rounded-lg p-3">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-green-300">Analyzing...</span>
                                  <span className="text-green-300">87%</span>
                                </div>
                                <div className="w-full bg-green-900/30 rounded-full h-2 mt-2">
                                  <div className="bg-green-400 h-2 rounded-full w-[87%] transition-all duration-1000"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Call to Action */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-5xl font-bold text-white mb-6">
                    Start Your <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">AI Journey</span>
                  </h3>
                  <p className="text-xl text-white/80 leading-relaxed mb-8">
                    Get instant AI analysis of your immigration potential, personalized recommendations, and a step-by-step roadmap to Japan.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center">
                      ⚡
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">Instant Analysis</h4>
                      <p className="text-white/70">Get results in under 30 seconds</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      🎯
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">99.8% Accuracy</h4>
                      <p className="text-white/70">AI trained on 10,000+ successful cases</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                      🔒
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">Completely Secure</h4>
                      <p className="text-white/70">Your data is encrypted and protected</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <button className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 text-white text-xl font-bold px-12 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white/20">
                    Start Free AI Analysis
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories - Testimonial Carousel */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-indigo-900/20"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-6xl font-bold mb-8">
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  ⭐ Success Stories
                </span>
              </h2>
              <p className="text-2xl text-white/80">
                Real people, incredible journeys
              </p>
            </div>

            {/* Floating Success Cards */}
            <div className="grid lg:grid-cols-3 gap-12">
              {[
                {
                  name: 'Sarah Chen',
                  country: '🇺🇸 USA',
                  achievement: 'Software Engineer at Sony Tokyo',
                  story: 'The AI predicted my approval in just 3 days - it was right! Now I\'m living my dream in Tokyo.',
                  time: '23 days',
                  accuracy: '99.8%',
                  avatar: '👩‍💻',
                  gradient: 'from-pink-500 to-rose-500'
                },
                {
                  name: 'Marco Rodriguez',
                  country: '🇪🇸 Spain',
                  achievement: 'Student at Tokyo University',
                  story: 'The gamified learning made Japanese fun! I passed JLPT N2 in 6 months.',
                  time: '31 days',
                  accuracy: '99.2%',
                  avatar: '👨‍🎓',
                  gradient: 'from-blue-500 to-cyan-500'
                },
                {
                  name: 'Priya Patel',
                  country: '🇮🇳 India',
                  achievement: 'Doctor at Tokyo Medical Center',
                  story: 'The AR experience helped me prepare for life in Japan. Everything felt familiar when I arrived!',
                  time: '18 days',
                  accuracy: '99.9%',
                  avatar: '👩‍⚕️',
                  gradient: 'from-purple-500 to-indigo-500'
                }
              ].map((story, index) => (
                <div key={index} className="group relative">
                  {/* Floating Animation */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${story.gradient} opacity-20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 group-hover:scale-110`}></div>
                  
                  <div className="relative bg-black/60 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 group-hover:border-white/40 transition-all duration-500 transform group-hover:-translate-y-4">
                    {/* Profile Header */}
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-white/20 to-white/10 rounded-full flex items-center justify-center text-3xl border border-white/20">
                        {story.avatar}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{story.name}</h3>
                        <p className="text-white/70">{story.country}</p>
                      </div>
                    </div>

                    {/* Achievement Badge */}
                    <div className={`bg-gradient-to-r ${story.gradient} rounded-2xl p-4 mb-6`}>
                      <h4 className="text-white font-bold text-lg">{story.achievement}</h4>
                    </div>

                    {/* Story */}
                    <p className="text-white/90 text-lg leading-relaxed mb-6 italic">
                      "{story.story}"
                    </p>

                    {/* Stats */}
                    <div className="flex justify-between items-center">
                      <div className="text-center">
                        <div className={`text-2xl font-bold bg-gradient-to-r ${story.gradient} bg-clip-text text-transparent`}>
                          {story.time}
                        </div>
                        <div className="text-white/60 text-sm">Process Time</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold bg-gradient-to-r ${story.gradient} bg-clip-text text-transparent`}>
                          {story.accuracy}
                        </div>
                        <div className="text-white/60 text-sm">AI Accuracy</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gamification & Achievement System */}
        {isGameMode && (
          <section className="py-32 relative bg-gradient-to-br from-purple-900/20 to-pink-900/20">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-20">
                <h2 className="text-6xl font-bold mb-8">
                  <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                    🎮 Game Mode Active!
                  </span>
                </h2>
                <p className="text-2xl text-white/80">
                  Complete challenges and unlock rewards
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {[
                  { title: 'Language Master', desc: 'Learn 100 Japanese words', progress: 65, reward: '🏆 Gold Badge' },
                  { title: 'Culture Explorer', desc: 'Complete cultural quizzes', progress: 80, reward: '🎌 Japan Flag' },
                  { title: 'Visa Wizard', desc: 'Perfect visa application', progress: 40, reward: '⭐ Special Badge' }
                ].map((challenge, index) => (
                  <div key={index} className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                    <h3 className="text-xl font-bold text-white mb-2">{challenge.title}</h3>
                    <p className="text-white/70 mb-4">{challenge.desc}</p>
                    <div className="bg-white/20 rounded-full h-4 mb-4 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-blue-400 h-full transition-all duration-1000"
                        style={{ width: `${challenge.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">{challenge.progress}%</span>
                      <span className="text-yellow-400">{challenge.reward}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full px-8 py-4">
                  <Trophy className="w-8 h-8 text-yellow-400" />
                  <span className="text-white text-xl font-bold">Level {userLevel} • {userScore} Points</span>
                  <Crown className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Spiral Statistics Section */}
        <section className="py-32 relative overflow-hidden">
          {/* Spiral Background */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full animate-spin-slow"></div>
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-400/20 to-red-600/20 rounded-full animate-pulse"></div>
          </div>

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-6xl font-bold mb-8">
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  📊 Why Choose Our AI Platform?
                </span>
              </h2>
              <p className="text-2xl text-white/80">
                Revolutionary technology backed by incredible results
              </p>
            </div>

            {/* Hexagonal Stats Layout */}
            <div className="relative">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { 
                    number: "99.8%", 
                    label: "Success Rate", 
                    description: "AI-predicted approvals",
                    color: "from-green-400 to-emerald-500",
                    icon: "🎯"
                  },
                  { 
                    number: "10K+", 
                    label: "Success Stories", 
                    description: "Dreams realized",
                    color: "from-blue-400 to-cyan-500",
                    icon: "⭐"
                  },
                  { 
                    number: "24hrs", 
                    label: "AI Analysis", 
                    description: "Complete roadmap",
                    color: "from-purple-400 to-pink-500",
                    icon: "⚡"
                  },
                  { 
                    number: "30sec", 
                    label: "Initial Results", 
                    description: "Instant predictions",
                    color: "from-orange-400 to-red-500",
                    icon: "🚀"
                  }
                ].map((stat, index) => (
                  <div key={index} className="group relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-700`}></div>
                    <div className="relative">
                      {/* Hexagonal Container */}
                      <div className="w-40 h-40 mx-auto mb-6 relative">
                        <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-full transform group-hover:scale-110 transition-all duration-500`}>
                          <div className="absolute inset-2 bg-black/80 rounded-full flex flex-col items-center justify-center">
                            <div className="text-3xl mb-2">{stat.icon}</div>
                            <div className="text-2xl font-black text-white">{stat.number}</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-white mb-2">{stat.label}</h3>
                        <p className="text-white/70">{stat.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Revolutionary Features Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
                  🚀 Revolutionary Features
                </span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Experience the future of immigration technology with our cutting-edge AI tools
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  title: "AI Vision Scanner",
                  description: "Upload any document and our AI instantly analyzes, translates, and validates it for your visa application. No more confusion about paperwork requirements.",
                  features: ["Document Recognition", "Auto Translation", "Validation Check", "Missing Item Detection"],
                  color: "from-cyan-400 to-blue-500",
                  icon: "📄",
                  bgPattern: "top-0 left-0"
                },
                {
                  title: "Virtual Interview Coach",
                  description: "Practice visa interviews with our AI that simulates real immigration officers. Get instant feedback on your answers and body language.",
                  features: ["Real-time Feedback", "Voice Analysis", "Body Language Tips", "Success Probability"],
                  color: "from-purple-400 to-pink-500",
                  icon: "🎤",
                  bgPattern: "top-0 right-0"
                },
                {
                  title: "Cultural Integration AI",
                  description: "Learn Japanese customs, business etiquette, and social norms through immersive AI scenarios. Arrive in Japan feeling like a local.",
                  features: ["Cultural Scenarios", "Etiquette Training", "Language Practice", "Social Integration"],
                  color: "from-green-400 to-emerald-500",
                  icon: "🎌",
                  bgPattern: "bottom-0 left-0"
                }
              ].map((feature, index) => (
                <div key={index} className="group relative">
                  {/* Floating Background Elements */}
                  <div className={`absolute ${feature.bgPattern} w-32 h-32 bg-gradient-to-r ${feature.color} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-1000`}></div>
                  
                  {/* Main Card */}
                  <div className="relative bg-black/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 group-hover:border-white/30 transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-2 h-full">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl group-hover:rotate-12 transition-transform duration-500`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                      <div className={`w-16 h-1 bg-gradient-to-r ${feature.color} rounded-full mx-auto`}></div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-white/90 text-base leading-relaxed mb-8 text-center">
                      {feature.description}
                    </p>
                    
                    {/* Features List */}
                    <div className="space-y-3">
                      {feature.features.map((feat, i) => (
                        <div key={i} className="flex items-center space-x-3 group/item">
                          <div className={`w-8 h-8 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300`}>
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span className="text-white/80 text-sm font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Bottom Accent */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Bottom CTA */}
            <div className="text-center mt-16">
              <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-green-600/20 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/20">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse animation-delay-200"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse animation-delay-400"></div>
                </div>
                <span className="text-white text-lg font-semibold">Experience All Features Today</span>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse animation-delay-400"></div>
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse animation-delay-200"></div>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 to-gray-900/30"></div>
          
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  🤔 Frequently Asked Questions
                </span>
              </h2>
              <p className="text-xl text-white/80">
                Everything you need to know about our AI immigration platform
              </p>
            </div>

            {/* FAQ Grid Layout */}
            <div className="grid lg:grid-cols-2 gap-8">
              {[
                {
                  question: "How accurate is your AI prediction system?",
                  answer: "Our AI achieves 99.8% accuracy by analyzing over 10,000 successful visa applications. It considers your profile, current immigration policies, and historical approval patterns to provide highly precise predictions.",
                  icon: "🎯",
                  color: "from-emerald-400 to-teal-500"
                },
                {
                  question: "What makes your platform different from traditional immigration services?",
                  answer: "We combine cutting-edge AI technology with human expertise. While traditional services rely on generic templates, our AI creates personalized strategies based on your unique profile, significantly increasing your success rate.",
                  icon: "⚡",
                  color: "from-cyan-400 to-blue-500"
                },
                {
                  question: "How long does the AI analysis process take?",
                  answer: "Our AI provides instant preliminary analysis in under 30 seconds. The comprehensive analysis with personalized roadmap is completed within 24 hours, compared to weeks with traditional consultants.",
                  icon: "⏱️",
                  color: "from-blue-400 to-purple-500"
                },
                {
                  question: "Is my personal data secure and private?",
                  answer: "Absolutely. We use military-grade encryption and comply with international data protection standards. Your information is never shared and is automatically deleted after successful immigration or upon request.",
                  icon: "🔒",
                  color: "from-purple-400 to-pink-500"
                },
                {
                  question: "Do you provide support throughout the entire process?",
                  answer: "Yes! Our AI provides 24/7 guidance, and you have access to human immigration experts for complex questions. We support you from initial assessment through successful arrival in Japan.",
                  icon: "🤝",
                  color: "from-pink-400 to-red-500"
                },
                {
                  question: "What if my application gets rejected?",
                  answer: "With our 99.8% success rate, rejections are rare. However, if it happens, our AI immediately analyzes the rejection reasons and creates an improved reapplication strategy at no additional cost.",
                  icon: "🛡️",
                  color: "from-red-400 to-orange-500"
                }
              ].map((faq, index) => (
                <div key={index} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${faq.color} opacity-20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-700`}></div>
                  <div className="relative bg-black/60 backdrop-blur-2xl rounded-2xl p-8 border border-white/20 group-hover:border-white/40 transition-all duration-500 transform group-hover:scale-[1.02]">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className={`w-12 h-12 bg-gradient-to-r ${faq.color} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                        {faq.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white leading-tight">{faq.question}</h3>
                    </div>
                    <p className="text-white/80 text-base leading-relaxed pl-16">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Call-to-Action */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-slate-900/50"></div>
          
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-red-500/20 rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
              <div className="relative bg-black/60 backdrop-blur-2xl rounded-[3rem] p-12 border border-white/20 group-hover:border-white/40 transition-all duration-500">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-5 mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center text-3xl">
                      🚀
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold text-white mb-2">
                        <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
                          Ready for the Impossible?
                        </span>
                      </h2>
                      <p className="text-orange-300 text-lg">Start Your Japan Journey Today</p>
                    </div>
                  </div>
                  
                  <p className="text-white/90 text-xl leading-relaxed mb-10 max-w-3xl mx-auto">
                    Join thousands who've transformed their Japan dreams into reality with our revolutionary AI platform.
                  </p>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-8 mb-10">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold text-white">
                        99%
                      </div>
                      <p className="text-white/70 text-sm">Success Rate</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold text-white">
                        24h
                      </div>
                      <p className="text-white/70 text-sm">AI Analysis</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold text-white">
                        10K+
                      </div>
                      <p className="text-white/70 text-sm">Success Stories</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <button className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-400 hover:via-orange-400 hover:to-red-400 text-white text-xl font-bold px-12 py-4 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white/20">
                      Start Your Japan Journey Now
                    </button>
                    
                    <p className="text-white/60 text-sm">
                      ✨ Free AI analysis • No credit card required • Results in 30 seconds
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Go to Top Button */}
        <button
          onClick={scrollToTop}
          className={`fixed right-6 bottom-32 z-50 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 transform ${
            showScrollTop ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-0 pointer-events-none'
          } hover:scale-110 hover:shadow-purple-500/50`}
        >
          <ChevronUp className="w-6 h-6 text-white" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 hover:opacity-30 transition-opacity duration-500"></div>
        </button>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => {
          console.log('🔒 Home: Closing auth modal');
          setIsAuthModalOpen(false);
        }}
        initialTab="register"
      />
    </>
  );
};

export default Home; 