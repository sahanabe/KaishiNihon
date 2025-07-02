import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Brain, Sparkles, TrendingUp, Target, Globe, Zap, Crown, Trophy, 
  Bell, Settings, User, Calendar, MessageCircle, FileText, Clock,
  CheckCircle, Star, AlertTriangle, ArrowUp, ArrowDown, Activity,
  BarChart3, PieChart, LineChart, Award, Rocket, Bolt, Shield, Signal, Battery,
  GraduationCap, Languages, MapPin, Phone, Mail, Home
} from 'lucide-react';

interface ProfileData {
  personalInfo: {
    fullName: string;
    age: number;
    nationality: string;
    maritalStatus: string;
    occupation: string;
    email: string;
    phoneNumber: string;
    currentAddress: string;
  };
  educationHistory: any[];
  educationEmployment: {
    educationLevel: string;
    workExperience: number;
  };
  visaApplication: {
    visaCategory: string;
    japaneseLanguageLevel: string;
    japaneseExam: string;
  };
  createdAt: string;
  status: string;
}

interface RealTimeData {
  applicationProgress: number;
  languageLevel: string;
  successProbability: number;
  daysInJourney: number;
  achievementsUnlocked: number;
  aiRecommendations: string[];
}

interface LiveNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'achievement';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const Dashboard: React.FC = () => {
  const { state } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [realTimeData, setRealTimeData] = useState<RealTimeData>({
    applicationProgress: 0,
    languageLevel: 'Loading...',
    successProbability: 0,
    daysInJourney: 0,
    achievementsUnlocked: 0,
    aiRecommendations: []
  });

  const [notifications, setNotifications] = useState<LiveNotification[]>([]);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [userLevel, setUserLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [nextLevelExp] = useState(1000);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load profile data on component mount
  useEffect(() => {
    const loadProfileData = () => {
      // Try to get profile data from localStorage
      const storedProfile = localStorage.getItem('completedProfile');
      if (storedProfile) {
        try {
          const profileDataParsed = JSON.parse(storedProfile);
          setProfileData(profileDataParsed);
          
          // Calculate dynamic values based on profile data
          const daysSinceProfile = Math.floor((new Date().getTime() - new Date(profileDataParsed.createdAt).getTime()) / (1000 * 3600 * 24));
          
          // Calculate success probability based on profile completeness and visa category
          let successProbability = 75; // Base rate
          if (profileDataParsed.educationEmployment.workExperience > 3) successProbability += 10;
          if (profileDataParsed.visaApplication.japaneseLanguageLevel === 'advanced') successProbability += 15;
          else if (profileDataParsed.visaApplication.japaneseLanguageLevel === 'intermediate') successProbability += 8;
          if (profileDataParsed.visaApplication.visaCategory === 'skilled-worker') successProbability += 5;
          
          // Calculate progress based on profile completion and time
          const baseProgress = 35; // Base progress for completing profile
          const timeProgress = Math.min(30, daysSinceProfile * 2); // Up to 30% based on time
          const totalProgress = Math.min(95, baseProgress + timeProgress + Math.random() * 10);
          
          // Calculate user level and experience based on profile data
          const calculatedLevel = Math.max(1, Math.floor(totalProgress / 15) + 1);
          const calculatedExperience = Math.floor(totalProgress * 10) + (daysSinceProfile * 25);
          
          setUserLevel(calculatedLevel);
          setExperience(calculatedExperience);
          
          setRealTimeData({
            applicationProgress: totalProgress,
            languageLevel: profileDataParsed.visaApplication.japaneseLanguageLevel === 'beginner' ? 'N5' :
                          profileDataParsed.visaApplication.japaneseLanguageLevel === 'intermediate' ? 'N3' :
                          profileDataParsed.visaApplication.japaneseLanguageLevel === 'advanced' ? 'N2' : 'N4',
            successProbability: Math.min(99.9, successProbability),
            daysInJourney: Math.max(1, daysSinceProfile),
            achievementsUnlocked: Math.floor(totalProgress / 5),
            aiRecommendations: generatePersonalizedRecommendations(profileDataParsed)
          });

          // Set personalized notifications
          const personalizedNotifications = generatePersonalizedNotifications(profileDataParsed, {
            applicationProgress: totalProgress,
            languageLevel: profileDataParsed.visaApplication.japaneseLanguageLevel === 'beginner' ? 'N5' :
                          profileDataParsed.visaApplication.japaneseLanguageLevel === 'intermediate' ? 'N3' :
                          profileDataParsed.visaApplication.japaneseLanguageLevel === 'advanced' ? 'N2' : 'N4',
            successProbability: Math.min(99.9, successProbability),
            daysInJourney: Math.max(1, daysSinceProfile),
            achievementsUnlocked: Math.floor(totalProgress / 5),
            aiRecommendations: []
          });
          setNotifications(personalizedNotifications);
        } catch (error) {
          console.error('Error parsing profile data:', error);
        }
      }
    };

    loadProfileData();
  }, []);

  const generatePersonalizedRecommendations = (profile: ProfileData): string[] => {
    const recommendations: string[] = [];
    
    if (profile.visaApplication.japaneseLanguageLevel === 'beginner') {
      recommendations.push('Start with basic Hiragana and Katakana practice');
      recommendations.push('Consider enrolling in a beginner Japanese course');
    } else if (profile.visaApplication.japaneseLanguageLevel === 'intermediate') {
      recommendations.push('Focus on Kanji practice for JLPT N2');
      recommendations.push('Practice conversation skills with native speakers');
    } else {
      recommendations.push('Prepare for business Japanese certification');
      recommendations.push('Focus on specialized vocabulary for your field');
    }
    
    if (profile.visaApplication.visaCategory === 'student') {
      recommendations.push('Research Japanese universities in your field');
      recommendations.push('Prepare your academic transcripts');
    } else if (profile.visaApplication.visaCategory === 'skilled-worker') {
      recommendations.push('Update your professional portfolio');
      recommendations.push('Connect with Japanese companies in your industry');
    }
    
    recommendations.push('Schedule interview prep session');
    recommendations.push('Update financial documents');
    
    return recommendations.slice(0, 3);
  };

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Animated particles background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{x: number, y: number, vx: number, vy: number, alpha: number}> = [];

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.5 + 0.1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 51, 234, ${particle.alpha})`;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }, []);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        applicationProgress: Math.min(100, prev.applicationProgress + Math.random() * 0.5),
        successProbability: Math.min(100, prev.successProbability + (Math.random() - 0.5) * 0.2),
        daysInJourney: prev.daysInJourney + (Math.random() < 0.1 ? 1 : 0)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getTimeOfDay = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return '🌅 Good Morning';
    if (hour < 17) return '☀️ Good Afternoon';
    if (hour < 21) return '🌆 Good Evening';
    return '🌙 Good Night';
  };

  const generateAiInsight = () => {
    setIsAiThinking(true);
    setTimeout(() => {
      const insights = [
        "Your learning pace is 23% above average! Keep it up! 🚀",
        "Perfect time to practice conversation skills - your grammar is solid! 💬",
        "I predict you'll reach N2 level in 8 weeks based on current progress! 📈",
        "Your consistency in study sessions is excellent. Consider adding more kanji practice! ✨"
      ];
      const newNotification: LiveNotification = {
        id: Date.now().toString(),
        type: 'info',
        title: '🤖 AI Insight',
        message: insights[Math.floor(Math.random() * insights.length)],
        timestamp: new Date(),
        read: false
      };
      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
      setIsAiThinking(false);
    }, 2000);
  };

  const statsCards = [
    {
      title: 'Journey Progress',
      value: `${realTimeData.applicationProgress.toFixed(1)}%`,
      change: '+2.3%',
      trend: 'up',
      icon: Rocket,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      title: 'Success Probability',
      value: `${realTimeData.successProbability.toFixed(1)}%`,
      change: '+0.8%',
      trend: 'up',
      icon: Target,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      title: 'Language Level',
      value: realTimeData.languageLevel,
      change: 'N2 Soon!',
      trend: 'up',
      icon: Globe,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50'
    },
    {
      title: 'Days in Journey',
      value: realTimeData.daysInJourney.toString(),
      change: 'Day ' + realTimeData.daysInJourney,
      trend: 'neutral',
      icon: Calendar,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50'
    }
  ];

  // Generate dynamic achievement data based on profile
  const generateAchievementData = (profile: ProfileData | null, realTime: RealTimeData) => {
    if (!profile) {
      return [
        { name: 'Language Master', progress: 0, icon: Globe, color: 'text-blue-500' },
        { name: 'Document Pro', progress: 0, icon: FileText, color: 'text-green-500' },
        { name: 'Cultural Expert', progress: 0, icon: Star, color: 'text-purple-500' },
        { name: 'Network Builder', progress: 0, icon: MessageCircle, color: 'text-pink-500' }
      ];
    }

    const languageProgress = profile.visaApplication.japaneseLanguageLevel === 'advanced' ? 95 :
                           profile.visaApplication.japaneseLanguageLevel === 'intermediate' ? 75 :
                           profile.visaApplication.japaneseLanguageLevel === 'beginner' ? 45 : 25;

    const documentProgress = Math.min(95, realTime.applicationProgress + 20);
    const cultureProgress = Math.min(90, realTime.daysInJourney * 2 + 30);
    const networkProgress = Math.min(85, profile.educationEmployment.workExperience * 15 + 40);

    return [
      { name: 'Language Master', progress: languageProgress, icon: Globe, color: 'text-blue-500' },
      { name: 'Document Pro', progress: documentProgress, icon: FileText, color: 'text-green-500' },
      { name: 'Cultural Expert', progress: cultureProgress, icon: Star, color: 'text-purple-500' },
      { name: 'Network Builder', progress: networkProgress, icon: MessageCircle, color: 'text-pink-500' }
    ];
  };

  // Generate personalized notifications
  const generatePersonalizedNotifications = (profile: ProfileData | null, realTime: RealTimeData): LiveNotification[] => {
    if (!profile) {
      return [
        {
          id: '1',
          type: 'info',
          title: '👋 Welcome to your dashboard!',
          message: 'Complete your profile to get personalized insights',
          timestamp: new Date(),
          read: false
        }
      ];
    }

    const notifications: LiveNotification[] = [
      {
        id: '1',
        type: 'achievement',
        title: '🎉 Profile Complete!',
        message: `Welcome ${profile.personalInfo.fullName}! Your Japan journey has begun.`,
        timestamp: new Date(),
        read: false
      }
    ];

    if (realTime.successProbability > 90) {
      notifications.push({
        id: '2',
        type: 'success',
        title: '🌟 Excellent Progress!',
        message: `Your success probability is ${realTime.successProbability.toFixed(1)}% - you're on track!`,
        timestamp: new Date(Date.now() - 180000),
        read: false
      });
    }

    if (profile.visaApplication.japaneseLanguageLevel === 'beginner') {
      notifications.push({
        id: '3',
        type: 'info',
        title: '📚 Language Study Tip',
        message: 'Start with Hiragana and Katakana practice - 30 minutes daily is perfect!',
        timestamp: new Date(Date.now() - 300000),
        read: false
      });
    }

    return notifications;
  };

  const achievementData = generateAchievementData(profileData, realTimeData);

  const weeklyProgress = [
    { day: 'Mon', study: 120, practice: 45 },
    { day: 'Tue', study: 90, practice: 60 },
    { day: 'Wed', study: 150, practice: 30 },
    { day: 'Thu', study: 110, practice: 55 },
    { day: 'Fri', study: 180, practice: 40 },
    { day: 'Sat', study: 200, practice: 80 },
    { day: 'Sun', study: 95, practice: 70 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
      
      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {getTimeOfDay()}, {profileData?.personalInfo?.fullName?.split(' ')[0] || state.user?.name?.split(' ')[0] || 'Explorer'}! 
              </h1>
              <p className="text-xl text-gray-300">
                {currentTime.toLocaleString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            
            {/* User Level & Experience */}
            <div className="text-right">
              <div className="flex items-center space-x-3 mb-2">
                <Crown className="w-8 h-8 text-yellow-400" />
                <div>
                  <div className="text-2xl font-bold text-white">Level {userLevel}</div>
                  <div className="text-sm text-gray-300">{experience}/{nextLevelExp} XP</div>
                </div>
              </div>
              <div className="w-48 bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${(experience / nextLevelExp) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Live Status Indicators */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400">AI Assistant Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <Signal className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400">Real-time Sync Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400">Secure Connection</span>
            </div>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl"></div>
                <div className={`relative bg-gradient-to-br ${stat.bgGradient} backdrop-blur-xl rounded-2xl p-6 border border-white/20 transition-all duration-500 hover:scale-105 hover:border-white/40`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`flex items-center space-x-1 text-sm ${
                      stat.trend === 'up' ? 'text-green-500' : 
                      stat.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                    }`}>
                      {stat.trend === 'up' && <ArrowUp className="w-4 h-4" />}
                      {stat.trend === 'down' && <ArrowDown className="w-4 h-4" />}
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.title}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* AI Insights & Live Notifications */}
          <div className="lg:col-span-1">
            {/* AI Command Center */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <Brain className="w-6 h-6 text-purple-400 mr-2" />
                    AI Command Center
                  </h3>
                  <button
                    onClick={generateAiInsight}
                    disabled={isAiThinking}
                    className="p-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                  >
                    {isAiThinking ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Sparkles className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>
                
                <div className="space-y-3">
                  {realTimeData.aiRecommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-purple-500/20 rounded-lg">
                      <Zap className="w-5 h-5 text-yellow-400 mt-0.5" />
                      <span className="text-white text-sm">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Notifications */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <Bell className="w-6 h-6 text-blue-400 mr-2" />
                    Live Updates
                  </h3>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
                
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 bg-blue-500/20 rounded-lg border-l-4 border-blue-400">
                      <div className="font-medium text-white text-sm">{notification.title}</div>
                      <div className="text-gray-300 text-xs mt-1">{notification.message}</div>
                      <div className="text-gray-400 text-xs mt-2">
                        {notification.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Progress Chart */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-green-500/30">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <BarChart3 className="w-6 h-6 text-green-400 mr-2" />
                  Weekly Learning Progress
                </h3>
                
                <div className="flex items-end justify-between h-48 space-x-2">
                  {weeklyProgress.map((day, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="w-full flex flex-col space-y-1">
                        <div 
                          className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all duration-1000 hover:from-blue-400 hover:to-blue-300"
                          style={{ height: `${(day.study / 200) * 100}%`, minHeight: '4px' }}
                        ></div>
                        <div 
                          className="bg-gradient-to-t from-green-500 to-green-400 rounded-t transition-all duration-1000 hover:from-green-400 hover:to-green-300"
                          style={{ height: `${(day.practice / 100) * 60}%`, minHeight: '4px' }}
                        ></div>
                      </div>
                      <span className="text-white text-xs mt-2">{day.day}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-white text-sm">Study Time</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-white text-sm">Practice Time</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievement Progress */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-yellow-500/30">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Trophy className="w-6 h-6 text-yellow-400 mr-2" />
                  Achievement Progress
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {achievementData.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <div key={index} className="p-4 bg-yellow-500/20 rounded-lg">
                        <div className="flex items-center space-x-3 mb-3">
                          <Icon className={`w-6 h-6 ${achievement.color}`} />
                          <span className="text-white font-medium">{achievement.name}</span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300 text-sm">{achievement.progress}%</span>
                          <span className="text-yellow-400 text-sm font-medium">
                            {achievement.progress > 80 ? '🔥' : achievement.progress > 60 ? '⚡' : '💪'}
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-1000 ${
                              achievement.progress > 80 ? 'bg-gradient-to-r from-green-400 to-emerald-400' :
                              achievement.progress > 60 ? 'bg-gradient-to-r from-blue-400 to-cyan-400' :
                              'bg-gradient-to-r from-gray-400 to-gray-500'
                            }`}
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Profile Information */}
            {profileData && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-indigo-500/30">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <User className="w-6 h-6 text-indigo-400 mr-2" />
                    Your Profile Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Info */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white flex items-center">
                        <User className="w-5 h-5 text-purple-400 mr-2" />
                        Personal Details
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-indigo-500/20 rounded-lg">
                          <span className="text-gray-300">Name</span>
                          <span className="text-white font-semibold">{profileData.personalInfo.fullName}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-indigo-500/20 rounded-lg">
                          <span className="text-gray-300">Age</span>
                          <span className="text-white font-semibold">{profileData.personalInfo.age} years</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-indigo-500/20 rounded-lg">
                          <span className="text-gray-300">Nationality</span>
                          <span className="text-white font-semibold">{profileData.personalInfo.nationality}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-indigo-500/20 rounded-lg">
                          <span className="text-gray-300">Occupation</span>
                          <span className="text-white font-semibold capitalize">{profileData.personalInfo.occupation}</span>
                        </div>
                      </div>
                    </div>

                    {/* Visa Journey Info */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white flex items-center">
                        <Globe className="w-5 h-5 text-blue-400 mr-2" />
                        Visa Journey
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-blue-500/20 rounded-lg">
                          <span className="text-gray-300">Visa Category</span>
                          <span className="text-white font-semibold capitalize">{profileData.visaApplication.visaCategory.replace('-', ' ')}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-blue-500/20 rounded-lg">
                          <span className="text-gray-300">Japanese Level</span>
                          <span className="text-white font-semibold capitalize">{profileData.visaApplication.japaneseLanguageLevel}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-blue-500/20 rounded-lg">
                          <span className="text-gray-300">Language Exam</span>
                          <span className="text-white font-semibold uppercase">{profileData.visaApplication.japaneseExam}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-blue-500/20 rounded-lg">
                          <span className="text-gray-300">Work Experience</span>
                          <span className="text-white font-semibold">{profileData.educationEmployment.workExperience} years</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Education History */}
                  {profileData.educationHistory && profileData.educationHistory.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-white flex items-center mb-4">
                        <GraduationCap className="w-5 h-5 text-green-400 mr-2" />
                        Education History
                      </h4>
                      <div className="grid gap-3">
                        {profileData.educationHistory.map((entry: any, index: number) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-green-500/20 rounded-lg">
                            <span className="text-gray-300">{entry.year}</span>
                            <span className="text-white font-semibold">{entry.place}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-pink-500/30">
                                 <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                   <Bolt className="w-6 h-6 text-pink-400 mr-2" />
                   Quick Actions
                 </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { icon: FileText, label: 'Documents', color: 'from-blue-500 to-blue-600' },
                    { icon: MessageCircle, label: 'Chat AI', color: 'from-green-500 to-green-600' },
                    { icon: Calendar, label: 'Schedule', color: 'from-purple-500 to-purple-600' },
                    { icon: Globe, label: 'Practice', color: 'from-pink-500 to-pink-600' }
                  ].map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <button 
                        key={index}
                        className={`group p-4 bg-gradient-to-r ${action.color} rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
                      >
                        <Icon className="w-8 h-8 text-white mx-auto mb-2 group-hover:animate-bounce" />
                        <div className="text-white text-sm font-medium">{action.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="mt-8 flex items-center justify-between p-4 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-green-400" />
              <span className="text-white">System Status: Optimal</span>
            </div>
            <div className="flex items-center space-x-2">
              <Battery className="w-5 h-5 text-blue-400" />
              <span className="text-white">Performance: 98%</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
              <Settings className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 