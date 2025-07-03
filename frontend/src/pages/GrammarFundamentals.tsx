import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Brain, Target, Trophy, Volume2, RotateCcw, CheckCircle, XCircle, Star, Clock, Award, TrendingUp, Zap, ArrowRight, ArrowLeft, Home, Lightbulb, BarChart3, Headphones, RefreshCw, Timer, Eye, Flame, Crown, Users, Calendar, Mic, Camera, Gamepad2, Gift, Sparkles, TrendingDown, BarChart, PieChart, Activity, Rocket, Shield, Compass, Map, Coffee, Sun, Moon, Cloud, Rainbow, ChevronLeft, ChevronRight, Brush, PenTool, Layers, Grid, Hexagon, MessageSquare, Scroll, Languages, Edit3, FileText, Bookmark } from 'lucide-react';

const GrammarFundamentals: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [animatedStats, setAnimatedStats] = useState({ patternsLearned: 0, streakDays: 0, accuracy: 0, totalTime: 0 });
  const [selectedAchievement, setSelectedAchievement] = useState<string | null>(null);
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [showGrammarCloud, setShowGrammarCloud] = useState(false);
  const [dailyChallenge, setDailyChallenge] = useState(false);
  const [learningStreak, setLearningStreak] = useState(18);
  const [weeklyGoal, setWeeklyGoal] = useState(35);
  const [currentWeekProgress, setCurrentWeekProgress] = useState(24);
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [patternsPerWeek] = useState(8);
  const [totalWeeks] = useState(5);
  const [totalPatterns] = useState(40);

  // Animated counters effect
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedStats(prev => ({
        patternsLearned: Math.min(prev.patternsLearned + 2, 24),
        streakDays: Math.min(prev.streakDays + 1, 18),
        accuracy: Math.min(prev.accuracy + 3, 92),
        totalTime: Math.min(prev.totalTime + 8, 445)
      }));
    }, 50);

    const finalTimer = setTimeout(() => {
      clearInterval(timer);
    }, 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(finalTimer);
    };
  }, []);

  // Time of day detection
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('morning');
    else if (hour < 18) setTimeOfDay('afternoon');
    else setTimeOfDay('evening');
  }, []);

  // Comprehensive JLPT N5 Grammar Database (40 essential patterns)
  const grammarDatabase = [
    // Week 1: Basic Sentence Structure & Copula
    { 
      id: 1, pattern: 'AはBです', romaji: 'A wa B desu', english: 'A is B', 
      category: 'Basic Structure', difficulty: 'beginner', week: 1,
      explanation: 'Basic sentence pattern using は particle and です copula',
      examples: [
        { japanese: '私は学生です。', romaji: 'Watashi wa gakusei desu.', english: 'I am a student.' },
        { japanese: 'これは本です。', romaji: 'Kore wa hon desu.', english: 'This is a book.' }
      ],
      keyPoints: ['は marks the topic', 'です is polite copula', 'Used for identification']
    },
    { 
      id: 2, pattern: 'AはBじゃありません', romaji: 'A wa B ja arimasen', english: 'A is not B', 
      category: 'Basic Structure', difficulty: 'beginner', week: 1,
      explanation: 'Negative form of です using じゃありません',
      examples: [
        { japanese: '私は先生じゃありません。', romaji: 'Watashi wa sensei ja arimasen.', english: 'I am not a teacher.' },
        { japanese: 'これは車じゃありません。', romaji: 'Kore wa kuruma ja arimasen.', english: 'This is not a car.' }
      ],
      keyPoints: ['じゃありません = negative copula', 'More polite than じゃない', 'Used in formal situations']
    },
    { 
      id: 3, pattern: '～ですか？', romaji: '～desu ka?', english: 'Is it～?', 
      category: 'Questions', difficulty: 'beginner', week: 1,
      explanation: 'Basic question formation using か particle',
      examples: [
        { japanese: '学生ですか？', romaji: 'Gakusei desu ka?', english: 'Are you a student?' },
        { japanese: 'おいしいですか？', romaji: 'Oishii desu ka?', english: 'Is it delicious?' }
      ],
      keyPoints: ['か makes questions', 'Rising intonation', 'Can be used with any sentence']
    },
    { 
      id: 4, pattern: 'は (topic particle)', romaji: 'wa', english: 'as for, regarding', 
      category: 'Particles', difficulty: 'beginner', week: 1,
      explanation: 'Topic marker particle (written は but pronounced wa)',
      examples: [
        { japanese: '田中さんは医者です。', romaji: 'Tanaka-san wa isha desu.', english: 'As for Mr. Tanaka, he is a doctor.' },
        { japanese: '今日は暑いです。', romaji: 'Kyou wa atsui desu.', english: 'As for today, it is hot.' }
      ],
      keyPoints: ['Marks the topic', 'Written は, pronounced wa', 'Shows what we\'re talking about']
    },
    { 
      id: 5, pattern: 'が (subject particle)', romaji: 'ga', english: 'subject marker', 
      category: 'Particles', difficulty: 'beginner', week: 1,
      explanation: 'Subject marker particle - marks who/what does the action',
      examples: [
        { japanese: '犬がいます。', romaji: 'Inu ga imasu.', english: 'There is a dog.' },
        { japanese: '雨が降っています。', romaji: 'Ame ga futte imasu.', english: 'It is raining.' }
      ],
      keyPoints: ['Marks the subject', 'Different from は', 'Used for new information']
    },
    { 
      id: 6, pattern: 'を (object particle)', romaji: 'wo/o', english: 'object marker', 
      category: 'Particles', difficulty: 'beginner', week: 1,
      explanation: 'Direct object marker - shows what receives the action',
      examples: [
        { japanese: '本を読みます。', romaji: 'Hon wo yomimasu.', english: 'I read a book.' },
        { japanese: 'コーヒーを飲みます。', romaji: 'Koohii wo nomimasu.', english: 'I drink coffee.' }
      ],
      keyPoints: ['Marks direct object', 'Written を, pronounced o', 'Shows what is acted upon']
    },
    { 
      id: 7, pattern: 'に (direction/time particle)', romaji: 'ni', english: 'to, at, in', 
      category: 'Particles', difficulty: 'beginner', week: 1,
      explanation: 'Indicates direction, time, or location of existence',
      examples: [
        { japanese: '学校に行きます。', romaji: 'Gakkou ni ikimasu.', english: 'I go to school.' },
        { japanese: '7時に起きます。', romaji: 'Shichi-ji ni okimasu.', english: 'I wake up at 7 o\'clock.' }
      ],
      keyPoints: ['Direction: に行く', 'Time: 時間に', 'Location of existence']
    },
    { 
      id: 8, pattern: 'へ (direction particle)', romaji: 'e', english: 'toward, to', 
      category: 'Particles', difficulty: 'beginner', week: 1,
      explanation: 'Indicates direction of movement (written へ but pronounced e)',
      examples: [
        { japanese: '東京へ行きます。', romaji: 'Toukyou e ikimasu.', english: 'I go to Tokyo.' },
        { japanese: '家へ帰ります。', romaji: 'Ie e kaerimasu.', english: 'I return home.' }
      ],
      keyPoints: ['Shows direction', 'Written へ, pronounced e', 'Similar to に but more directional']
    },

    // Week 2: Location, Possession, and More Particles
    { 
      id: 9, pattern: 'で (location/method particle)', romaji: 'de', english: 'at, by, with', 
      category: 'Particles', difficulty: 'beginner', week: 2,
      explanation: 'Indicates location of action or method/tool used',
      examples: [
        { japanese: '図書館で勉強します。', romaji: 'Toshokan de benkyou shimasu.', english: 'I study at the library.' },
        { japanese: 'バスで行きます。', romaji: 'Basu de ikimasu.', english: 'I go by bus.' }
      ],
      keyPoints: ['Location of action', 'Method/tool', 'Different from に']
    },
    { 
      id: 10, pattern: 'の (possessive particle)', romaji: 'no', english: 'of, \'s', 
      category: 'Particles', difficulty: 'beginner', week: 2,
      explanation: 'Shows possession or relationship between nouns',
      examples: [
        { japanese: '私の本', romaji: 'Watashi no hon', english: 'My book' },
        { japanese: '日本の文化', romaji: 'Nihon no bunka', english: 'Japanese culture' }
      ],
      keyPoints: ['Shows possession', 'Connects nouns', 'Very common particle']
    },
    { 
      id: 11, pattern: 'と (and/with particle)', romaji: 'to', english: 'and, with', 
      category: 'Particles', difficulty: 'beginner', week: 2,
      explanation: 'Connects nouns (exhaustive list) or indicates companionship',
      examples: [
        { japanese: 'パンとミルク', romaji: 'Pan to miruku', english: 'Bread and milk' },
        { japanese: '友達と映画を見ます。', romaji: 'Tomodachi to eiga wo mimasu.', english: 'I watch a movie with a friend.' }
      ],
      keyPoints: ['Exhaustive "and"', 'Shows companionship', 'Different from や']
    },
    { 
      id: 12, pattern: 'から (from particle)', romaji: 'kara', english: 'from, since', 
      category: 'Particles', difficulty: 'beginner', week: 2,
      explanation: 'Indicates starting point in time or space',
      examples: [
        { japanese: '9時から仕事です。', romaji: 'Ku-ji kara shigoto desu.', english: 'Work is from 9 o\'clock.' },
        { japanese: '東京から来ました。', romaji: 'Toukyou kara kimashita.', english: 'I came from Tokyo.' }
      ],
      keyPoints: ['Starting point', 'Time: から', 'Place: から']
    },
    { 
      id: 13, pattern: 'まで (until particle)', romaji: 'made', english: 'until, to', 
      category: 'Particles', difficulty: 'beginner', week: 2,
      explanation: 'Indicates ending point in time or space',
      examples: [
        { japanese: '5時まで働きます。', romaji: 'Go-ji made hatarakimasu.', english: 'I work until 5 o\'clock.' },
        { japanese: '駅まで歩きます。', romaji: 'Eki made arukimasu.', english: 'I walk to the station.' }
      ],
      keyPoints: ['Ending point', 'Time: まで', 'Place: まで']
    },
    { 
      id: 14, pattern: 'も (also particle)', romaji: 'mo', english: 'also, too', 
      category: 'Particles', difficulty: 'beginner', week: 2,
      explanation: 'Indicates "also" or "too", replaces は, が, を',
      examples: [
        { japanese: '私も学生です。', romaji: 'Watashi mo gakusei desu.', english: 'I am also a student.' },
        { japanese: 'これも買います。', romaji: 'Kore mo kaimasu.', english: 'I will buy this too.' }
      ],
      keyPoints: ['Means "also/too"', 'Replaces は, が, を', 'Adds to existing information']
    },
    { 
      id: 15, pattern: '～があります', romaji: '～ga arimasu', english: 'there is/there are', 
      category: 'Existence', difficulty: 'beginner', week: 2,
      explanation: 'Expresses existence of inanimate objects',
      examples: [
        { japanese: 'テーブルの上に本があります。', romaji: 'Teeburu no ue ni hon ga arimasu.', english: 'There is a book on the table.' },
        { japanese: '時間があります。', romaji: 'Jikan ga arimasu.', english: 'I have time.' }
      ],
      keyPoints: ['For inanimate objects', 'Shows existence/possession', 'Use が not を']
    },
    { 
      id: 16, pattern: '～がいます', romaji: '～ga imasu', english: 'there is/there are (living)', 
      category: 'Existence', difficulty: 'beginner', week: 2,
      explanation: 'Expresses existence of animate beings',
      examples: [
        { japanese: '公園に子供がいます。', romaji: 'Kouen ni kodomo ga imasu.', english: 'There are children in the park.' },
        { japanese: '犬がいます。', romaji: 'Inu ga imasu.', english: 'There is a dog.' }
      ],
      keyPoints: ['For living beings', 'People and animals', 'Different from あります']
    },

    // Week 3: Verb Forms and Tenses
    { 
      id: 17, pattern: '～ます (polite present)', romaji: '～masu', english: 'polite verb ending', 
      category: 'Verb Forms', difficulty: 'beginner', week: 3,
      explanation: 'Polite present/future tense verb ending',
      examples: [
        { japanese: '行きます', romaji: 'ikimasu', english: 'go/will go' },
        { japanese: '食べます', romaji: 'tabemasu', english: 'eat/will eat' }
      ],
      keyPoints: ['Polite form', 'Present/future', 'Most common verb form']
    },
    { 
      id: 18, pattern: '～ません (polite negative)', romaji: '～masen', english: 'polite negative', 
      category: 'Verb Forms', difficulty: 'beginner', week: 3,
      explanation: 'Polite negative present/future tense',
      examples: [
        { japanese: '行きません', romaji: 'ikimasen', english: 'don\'t go/won\'t go' },
        { japanese: '食べません', romaji: 'tabemasen', english: 'don\'t eat/won\'t eat' }
      ],
      keyPoints: ['Polite negative', 'Present/future', 'Opposite of ます']
    },
    { 
      id: 19, pattern: '～ました (polite past)', romaji: '～mashita', english: 'polite past tense', 
      category: 'Verb Forms', difficulty: 'beginner', week: 3,
      explanation: 'Polite past tense verb ending',
      examples: [
        { japanese: '行きました', romaji: 'ikimashita', english: 'went' },
        { japanese: '食べました', romaji: 'tabemashita', english: 'ate' }
      ],
      keyPoints: ['Polite past', 'Completed actions', 'た form in polite speech']
    },
    { 
      id: 20, pattern: '～ませんでした', romaji: '～masen deshita', english: 'polite past negative', 
      category: 'Verb Forms', difficulty: 'beginner', week: 3,
      explanation: 'Polite negative past tense',
      examples: [
        { japanese: '行きませんでした', romaji: 'ikimasen deshita', english: 'didn\'t go' },
        { japanese: '食べませんでした', romaji: 'tabemasen deshita', english: 'didn\'t eat' }
      ],
      keyPoints: ['Polite past negative', 'Actions that didn\'t happen', 'Most complex basic form']
    },
    { 
      id: 21, pattern: 'い-adjectives', romaji: 'i-keiyoushi', english: 'i-adjectives', 
      category: 'Adjectives', difficulty: 'beginner', week: 3,
      explanation: 'Adjectives ending in い that can conjugate',
      examples: [
        { japanese: '高いです', romaji: 'takai desu', english: 'is expensive' },
        { japanese: '美味しいです', romaji: 'oishii desu', english: 'is delicious' }
      ],
      keyPoints: ['End in い', 'Can conjugate', 'Don\'t need な']
    },
    { 
      id: 22, pattern: 'な-adjectives', romaji: 'na-keiyoushi', english: 'na-adjectives', 
      category: 'Adjectives', difficulty: 'beginner', week: 3,
      explanation: 'Adjectives that need な when modifying nouns',
      examples: [
        { japanese: '静かです', romaji: 'shizuka desu', english: 'is quiet' },
        { japanese: '好きです', romaji: 'suki desu', english: 'like' }
      ],
      keyPoints: ['Need な before nouns', 'Like nouns in conjugation', 'Very common type']
    },
    { 
      id: 23, pattern: '～たいです', romaji: '～tai desu', english: 'want to~', 
      category: 'Desire', difficulty: 'beginner', week: 3,
      explanation: 'Express desire to do something',
      examples: [
        { japanese: '映画を見たいです。', romaji: 'Eiga wo mitai desu.', english: 'I want to watch a movie.' },
        { japanese: '日本に行きたいです。', romaji: 'Nihon ni ikitai desu.', english: 'I want to go to Japan.' }
      ],
      keyPoints: ['Express personal desire', 'Conjugates like い-adjective', 'Very useful pattern']
    },
    { 
      id: 24, pattern: '～ましょう', romaji: '～mashou', english: 'let\'s~', 
      category: 'Invitation', difficulty: 'beginner', week: 3,
      explanation: 'Suggest doing something together',
      examples: [
        { japanese: '一緒に行きましょう。', romaji: 'Issho ni ikimashou.', english: 'Let\'s go together.' },
        { japanese: '映画を見ましょう。', romaji: 'Eiga wo mimashou.', english: 'Let\'s watch a movie.' }
      ],
      keyPoints: ['Invitation/suggestion', 'Polite form', 'Group activity']
    }
  ];

  // Get current week's patterns
  const getCurrentWeekPatterns = () => {
    const startIndex = (currentWeek - 1) * patternsPerWeek;
    const endIndex = startIndex + patternsPerWeek;
    return grammarDatabase.slice(startIndex, endIndex);
  };

  const currentWeekPatterns = getCurrentWeekPatterns();
  const getCurrentPattern = () => currentWeekPatterns[currentPatternIndex] || grammarDatabase[0];

  const nextPattern = () => {
    if (currentPatternIndex < currentWeekPatterns.length - 1) {
      setCurrentPatternIndex(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  const previousPattern = () => {
    if (currentPatternIndex > 0) {
      setCurrentPatternIndex(prev => prev - 1);
      setShowAnswer(false);
    }
  };

  const nextWeek = () => {
    if (currentWeek < totalWeeks) {
      setCurrentWeek(prev => prev + 1);
      setCurrentPatternIndex(0);
      setShowAnswer(false);
    }
  };

  const previousWeek = () => {
    if (currentWeek > 1) {
      setCurrentWeek(prev => prev - 1);
      setCurrentPatternIndex(0);
      setShowAnswer(false);
    }
  };

  // Calculate progress
  const patternsLearned = grammarDatabase.filter((_, index) => index < (currentWeek - 1) * patternsPerWeek + currentPatternIndex).length;
  const overallProgress = Math.round((patternsLearned / totalPatterns) * 100);
  const weekProgress = Math.round((currentPatternIndex / patternsPerWeek) * 100);

  const timeGreeting = timeOfDay === 'morning' ? 'おはよう！' : timeOfDay === 'afternoon' ? 'こんにちは！' : 'こんばんは！';
  const timeIcon = timeOfDay === 'morning' ? Sun : timeOfDay === 'afternoon' ? Cloud : Moon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-teal-500/20 to-blue-500/20 animate-pulse"></div>
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-8xl mb-6 animate-bounce">文法</div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Grammar Fundamentals
            </h1>
            <p className="text-2xl text-white/90 mb-8">
              Master all N5 particles and essential grammar patterns • 40 key patterns in 5 weeks
            </p>
            
            {/* Navigation Tabs */}
            <div className="flex justify-center space-x-4 mb-12">
              {[
                { id: 'overview', label: 'Learning Overview', icon: BarChart3 },
                { id: 'practice', label: 'Pattern Practice', icon: Edit3 },
                { id: 'memory', label: 'Memory Training', icon: Brain },
                { id: 'exam', label: 'Mastery Exam', icon: Trophy }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-2xl scale-110'
                        : 'bg-white/10 text-white/80 hover:bg-white/20 hover:scale-105'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-6 h-6" />
                      <span>{tab.label}</span>
                    </div>
                    {activeTab === tab.id && (
                      <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 pb-16">
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Time-based Greeting */}
            <div className="text-center bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-3xl p-8 backdrop-blur-md border border-green-400/30">
              <div className="flex items-center justify-center space-x-4 mb-4">
                {timeOfDay === 'morning' ? <Sun className="w-12 h-12 text-yellow-400 animate-spin" /> :
                 timeOfDay === 'afternoon' ? <Cloud className="w-12 h-12 text-blue-400 animate-pulse" /> :
                 <Moon className="w-12 h-12 text-purple-400 animate-bounce" />}
                <h2 className="text-4xl font-bold text-white">{timeGreeting}</h2>
              </div>
              <p className="text-xl text-white/90">Ready to master Japanese grammar today?</p>
            </div>

            {/* Real-time Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { label: 'Patterns Learned', value: animatedStats.patternsLearned, max: 40, icon: MessageSquare, color: 'from-green-400 to-teal-400' },
                { label: 'Day Streak', value: animatedStats.streakDays, max: 30, icon: Flame, color: 'from-orange-400 to-red-400' },
                { label: 'Accuracy', value: animatedStats.accuracy, max: 100, icon: Target, color: 'from-blue-400 to-purple-400' },
                { label: 'Study Time (min)', value: animatedStats.totalTime, max: 500, icon: Clock, color: 'from-purple-400 to-pink-400' }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-white">{stat.value}</div>
                        <div className="text-white/70">{stat.label}</div>
                      </div>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full bg-gradient-to-r ${stat.color} transition-all duration-1000`}
                        style={{ width: `${(stat.value / stat.max) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Grammar Categories Overview */}
            <div className="bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-3xl p-8 backdrop-blur-md border border-teal-400/30">
              <h3 className="text-3xl font-bold text-center text-white mb-8">📚 5-Week Grammar Journey</h3>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {[
                  { week: 1, title: 'Basic Structure', patterns: ['AはBです', 'Question forms', 'Basic particles'], icon: '🏗️' },
                  { week: 2, title: 'Particles Mastery', patterns: ['Location particles', 'Possession の', 'Existence forms'], icon: '🎯' },
                  { week: 3, title: 'Verb Forms', patterns: ['Polite forms', 'Adjectives', 'Desire expressions'], icon: '⚡' },
                  { week: 4, title: 'Advanced Patterns', patterns: ['Complex particles', 'Te-form basics', 'Comparisons'], icon: '🚀' },
                  { week: 5, title: 'Integration', patterns: ['Combined patterns', 'Real conversations', 'Mastery review'], icon: '🎖️' }
                ].map((weekData, index) => (
                  <div key={index} className={`bg-white/10 rounded-2xl p-6 border-2 ${currentWeek === weekData.week ? 'border-green-400 bg-green-400/20' : 'border-white/20'}`}>
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{weekData.icon}</div>
                      <h4 className="text-xl font-bold text-white">Week {weekData.week}</h4>
                      <p className="text-teal-200">{weekData.title}</p>
                    </div>
                    <div className="space-y-2">
                      {weekData.patterns.map((pattern, patternIndex) => (
                        <div key={patternIndex} className="text-sm text-white/80 bg-white/10 rounded-lg p-2">
                          {pattern}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <div className={`w-full h-3 rounded-full ${weekData.week <= currentWeek ? 'bg-gradient-to-r from-green-400 to-teal-400' : 'bg-white/20'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Grammar Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Sentence Structure', icon: '🏗️', patterns: ['AはBです', 'AはBじゃありません', '～ですか？'], color: 'from-green-400 to-teal-400' },
                { title: 'Essential Particles', icon: '🎯', patterns: ['は, が, を', 'に, へ, で', 'の, と, も'], color: 'from-teal-400 to-blue-400' },
                { title: 'Verb Forms', icon: '⚡', patterns: ['～ます forms', 'Past tense', 'Negative forms'], color: 'from-blue-400 to-purple-400' },
                { title: 'Adjectives', icon: '🌈', patterns: ['い-adjectives', 'な-adjectives', 'Comparisons'], color: 'from-purple-400 to-pink-400' },
                { title: 'Expressions', icon: '💭', patterns: ['～たいです', '～ましょう', '～があります'], color: 'from-pink-400 to-red-400' },
                { title: 'Questions', icon: '❓', patterns: ['はい/いいえ', 'WH-questions', 'Choice questions'], color: 'from-red-400 to-orange-400' }
              ].map((category, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{category.icon}</div>
                    <h4 className="text-xl font-bold text-white">{category.title}</h4>
                  </div>
                  <div className="space-y-2">
                    {category.patterns.map((pattern, patternIndex) => (
                      <div key={patternIndex} className={`text-sm text-white bg-gradient-to-r ${category.color} bg-opacity-20 rounded-lg p-2 text-center`}>
                        {pattern}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-8">Pattern Practice Coming Soon!</h2>
            <p className="text-xl">Interactive grammar pattern practice will be implemented here.</p>
          </div>
        )}

        {activeTab === 'memory' && (
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-8">Memory Training Coming Soon!</h2>
            <p className="text-xl">Interactive memory games for grammar patterns will be implemented here.</p>
          </div>
        )}

        {activeTab === 'exam' && (
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-8">Mastery Exam Coming Soon!</h2>
            <p className="text-xl">Comprehensive grammar testing system will be implemented here.</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <Link
          to="/language/jlpt-n5"
          className="group bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-110 flex items-center space-x-3"
        >
          <ArrowLeft className="w-6 h-6 group-hover:animate-pulse" />
          <span>Back to JLPT N5</span>
        </Link>
      </div>
    </div>
  );
};

export default GrammarFundamentals; 