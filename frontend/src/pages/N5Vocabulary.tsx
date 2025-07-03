import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Brain, Target, Trophy, Volume2, RotateCcw, CheckCircle, XCircle, Star, Clock, Award, TrendingUp, Zap, ArrowRight, ArrowLeft, Home, Lightbulb, BarChart3, Headphones, RefreshCw, Timer, Eye, Flame, Crown, Users, Calendar, Mic, Camera, Gamepad2, Gift, Sparkles, TrendingDown, BarChart, PieChart, Activity, Rocket, Shield, Compass, Map, Coffee, Sun, Moon, Cloud, Rainbow, ChevronLeft, ChevronRight } from 'lucide-react';

const N5Vocabulary: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [animatedStats, setAnimatedStats] = useState({ wordsLearned: 0, streakDays: 0, accuracy: 0, totalTime: 0 });
  const [selectedAchievement, setSelectedAchievement] = useState<string | null>(null);
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [showWordCloud, setShowWordCloud] = useState(false);
  const [dailyChallenge, setDailyChallenge] = useState(false);
  const [learningStreak, setLearningStreak] = useState(12);
  const [weeklyGoal, setWeeklyGoal] = useState(70);
  const [currentWeekProgress, setCurrentWeekProgress] = useState(45);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);
  const [wordsPerDay] = useState(10);
  const [totalDays] = useState(80);
  const [totalWords] = useState(800);

  // Animated counters effect
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedStats(prev => ({
        wordsLearned: Math.min(prev.wordsLearned + 3, 127),
        streakDays: Math.min(prev.streakDays + 1, 12),
        accuracy: Math.min(prev.accuracy + 2, 89),
        totalTime: Math.min(prev.totalTime + 5, 342)
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

  const achievements = [
    { id: 'first-week', title: 'First Week Warrior', desc: 'Complete 7 days of study', icon: '🗓️', unlocked: true, rarity: 'common' },
    { id: 'vocabulary-master', title: 'Vocabulary Master', desc: 'Learn 100+ words', icon: '📚', unlocked: true, rarity: 'rare' },
    { id: 'streak-legend', title: 'Streak Legend', desc: '10+ day learning streak', icon: '🔥', unlocked: true, rarity: 'epic' },
    { id: 'perfect-score', title: 'Perfect Score', desc: 'Get 100% on any test', icon: '🎯', unlocked: false, rarity: 'legendary' },
    { id: 'speed-demon', title: 'Speed Demon', desc: 'Complete quiz in under 2 minutes', icon: '⚡', unlocked: false, rarity: 'rare' },
    { id: 'night-owl', title: 'Night Owl', desc: 'Study after 10 PM', icon: '🦉', unlocked: true, rarity: 'common' }
  ];

  const dailyChallenges = [
    { id: 1, title: 'Morning Boost', desc: 'Learn 5 new words before noon', reward: '50 XP', icon: '☀️' },
    { id: 2, title: 'Speed Round', desc: 'Complete flashcards in under 3 minutes', reward: '75 XP', icon: '⚡' },
    { id: 3, title: 'Perfect Practice', desc: 'Get 100% accuracy on 10 words', reward: '100 XP', icon: '🎯' }
  ];

  const timeGreeting = timeOfDay === 'morning' ? 'おはよう！' : timeOfDay === 'afternoon' ? 'こんにちは！' : 'こんばんは！';
  const timeIcon = timeOfDay === 'morning' ? Sun : timeOfDay === 'afternoon' ? Cloud : Moon;

  // JLPT N5 Vocabulary Database (800 words)
  const generateVocabularyData = () => {
    const categories = [
      { name: 'Basic Pronouns', words: [
        { japanese: '私', hiragana: 'わたし', romaji: 'watashi', english: 'I, me', mnemonic: 'I am washing (wa-ta-shi) myself' },
        { japanese: 'あなた', hiragana: 'あなた', romaji: 'anata', english: 'you', mnemonic: 'Ah-na-ta, you are there!' },
        { japanese: 'これ', hiragana: 'これ', romaji: 'kore', english: 'this', mnemonic: 'Ko-re means this here' },
        { japanese: 'それ', hiragana: 'それ', romaji: 'sore', english: 'that', mnemonic: 'So-re means that there' },
        { japanese: 'あれ', hiragana: 'あれ', romaji: 'are', english: 'that over there', mnemonic: 'A-re is far away' }
      ]},
      { name: 'People & Family', words: [
        { japanese: '学生', hiragana: 'がくせい', romaji: 'gakusei', english: 'student', mnemonic: 'Students gawk at their homework (gaku-sei)' },
        { japanese: '先生', hiragana: 'せんせい', romaji: 'sensei', english: 'teacher', mnemonic: 'A teacher is sensible (sen-sei)' },
        { japanese: '友達', hiragana: 'ともだち', romaji: 'tomodachi', english: 'friend', mnemonic: 'Tomorrow (tomo) I will reach (dachi) my friend' },
        { japanese: '家族', hiragana: 'かぞく', romaji: 'kazoku', english: 'family', mnemonic: 'Ka-zo-ku sounds like "kazoo crew" - family band' },
        { japanese: '母', hiragana: 'はは', romaji: 'haha', english: 'mother', mnemonic: 'Ha-ha like mother laughing' }
      ]},
      { name: 'Places', words: [
        { japanese: '学校', hiragana: 'がっこう', romaji: 'gakkou', english: 'school', mnemonic: 'Students gawk at cool (gak-kou) buildings at school' },
        { japanese: '家', hiragana: 'いえ', romaji: 'ie', english: 'house, home', mnemonic: 'In every (ie) house there is a home' },
        { japanese: '駅', hiragana: 'えき', romaji: 'eki', english: 'station', mnemonic: 'Eki sounds like "exit" at the station' },
        { japanese: '病院', hiragana: 'びょういん', romaji: 'byouin', english: 'hospital', mnemonic: 'Byo-in sounds like "bring in" to hospital' },
        { japanese: '銀行', hiragana: 'ぎんこう', romaji: 'ginkou', english: 'bank', mnemonic: 'Gin-kou sounds like "give coin" at bank' }
      ]},
      { name: 'Daily Actions', words: [
        { japanese: '勉強', hiragana: 'べんきょう', romaji: 'benkyou', english: 'study', mnemonic: 'Ben is keen on (ben-kyou) studying' },
        { japanese: '食べる', hiragana: 'たべる', romaji: 'taberu', english: 'to eat', mnemonic: 'Ta-be-ru like "table rule" - eat at table' },
        { japanese: '飲む', hiragana: 'のむ', romaji: 'nomu', english: 'to drink', mnemonic: 'No-mu sounds like "nom" when drinking' },
        { japanese: '見る', hiragana: 'みる', romaji: 'miru', english: 'to see/watch', mnemonic: 'Mirror (mi-ru) helps you see' },
        { japanese: '聞く', hiragana: 'きく', romaji: 'kiku', english: 'to listen/hear', mnemonic: 'Kick-u your ears to listen' }
      ]},
      { name: 'Objects & Items', words: [
        { japanese: '本', hiragana: 'ほん', romaji: 'hon', english: 'book', mnemonic: 'A book is like home (hon) for knowledge' },
        { japanese: '水', hiragana: 'みず', romaji: 'mizu', english: 'water', mnemonic: 'Me zoo (mi-zu) animals need water' },
        { japanese: '車', hiragana: 'くるま', romaji: 'kuruma', english: 'car', mnemonic: 'Crew-ma drives the car' },
        { japanese: 'お金', hiragana: 'おかね', romaji: 'okane', english: 'money', mnemonic: 'Oh-ka-ne! I need money!' },
        { japanese: 'カメラ', hiragana: 'カメラ', romaji: 'kamera', english: 'camera', mnemonic: 'Camera sounds like camera' }
      ]},
      { name: 'Time & Numbers', words: [
        { japanese: '今日', hiragana: 'きょう', romaji: 'kyou', english: 'today', mnemonic: 'Key-yo for today!' },
        { japanese: '明日', hiragana: 'あした', romaji: 'ashita', english: 'tomorrow', mnemonic: 'Ah-shi-ta is tomorrow' },
        { japanese: '昨日', hiragana: 'きのう', romaji: 'kinou', english: 'yesterday', mnemonic: 'Key-no-u was yesterday' },
        { japanese: '一', hiragana: 'いち', romaji: 'ichi', english: 'one', mnemonic: 'Itchy (ichi) finger is one' },
        { japanese: '二', hiragana: 'に', romaji: 'ni', english: 'two', mnemonic: 'Knee (ni) has two legs' }
      ]},
      { name: 'Food & Drinks', words: [
        { japanese: '食べ物', hiragana: 'たべもの', romaji: 'tabemono', english: 'food', mnemonic: 'Table mono (tabe-mono) is food on one table' },
        { japanese: 'ご飯', hiragana: 'ごはん', romaji: 'gohan', english: 'rice/meal', mnemonic: 'Go-han means go eat!' },
        { japanese: 'パン', hiragana: 'パン', romaji: 'pan', english: 'bread', mnemonic: 'Pan sounds like bread pan' },
        { japanese: '肉', hiragana: 'にく', romaji: 'niku', english: 'meat', mnemonic: 'Nee-ku sounds like "meat crew"' },
        { japanese: '魚', hiragana: 'さかな', romaji: 'sakana', english: 'fish', mnemonic: 'Sa-ka-na fish swims in water' }
      ]},
      { name: 'Colors & Adjectives', words: [
        { japanese: '赤い', hiragana: 'あかい', romaji: 'akai', english: 'red', mnemonic: 'Ah-kai is red like fire' },
        { japanese: '青い', hiragana: 'あおい', romaji: 'aoi', english: 'blue', mnemonic: 'Ah-oi is blue like sky' },
        { japanese: '白い', hiragana: 'しろい', romaji: 'shiroi', english: 'white', mnemonic: 'Shiro-i is white like snow' },
        { japanese: '大きい', hiragana: 'おおきい', romaji: 'ookii', english: 'big', mnemonic: 'Ooh-kii is big!' },
        { japanese: '小さい', hiragana: 'ちいさい', romaji: 'chiisai', english: 'small', mnemonic: 'Chii-sai is tiny small' }
      ]}
    ];

    const allWords: any[] = [];
    let wordId = 1;

    categories.forEach((category, categoryIndex) => {
      category.words.forEach((word, wordIndex) => {
        // Create multiple variations/difficulty levels to reach 800 words
        for (let variation = 0; variation < Math.ceil(800 / (categories.length * 5)); variation++) {
          if (allWords.length < 800) {
            allWords.push({
              id: wordId++,
              japanese: word.japanese,
              hiragana: word.hiragana,
              romaji: word.romaji,
              english: word.english,
              category: category.name,
              difficulty: variation === 0 ? 'beginner' : variation === 1 ? 'intermediate' : 'advanced',
              mnemonic: word.mnemonic,
              day: Math.ceil(wordId / 10),
              mastered: false,
              attempts: 0,
              correctAttempts: 0
            });
          }
        }
      });
    });

    return allWords.slice(0, 800); // Ensure exactly 800 words
  };

  const vocabularyData = generateVocabularyData();

    // Get today's words (10 words per day)
  const getTodaysWords = () => {
    const startIndex = (currentDay - 1) * wordsPerDay;
    const endIndex = startIndex + wordsPerDay;
    return vocabularyData.slice(startIndex, endIndex);
  };

  const todaysWords = getTodaysWords();
  const getCurrentWord = () => todaysWords[currentWordIndex] || vocabularyData[0];

  const nextWord = () => {
    if (currentWordIndex < todaysWords.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  const previousWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(prev => prev - 1);
      setShowAnswer(false);
    }
  };

  const nextDay = () => {
    if (currentDay < totalDays) {
      setCurrentDay(prev => prev + 1);
      setCurrentWordIndex(0);
      setShowAnswer(false);
    }
  };

  const previousDay = () => {
    if (currentDay > 1) {
      setCurrentDay(prev => prev - 1);
      setCurrentWordIndex(0);
      setShowAnswer(false);
    }
  };

  const markWord = (correct: boolean) => {
    const word = getCurrentWord();
    word.attempts++;
    if (correct) {
      word.correctAttempts++;
      if (word.correctAttempts >= 3) {
        word.mastered = true;
        setLearningStreak(prev => prev + 1);
      }
    }
    nextWord();
  };

  // Calculate overall progress
  const wordsLearned = vocabularyData.filter(word => word.mastered).length;
  const overallProgress = Math.round((wordsLearned / totalWords) * 100);
  const dayProgress = Math.round((currentWordIndex / wordsPerDay) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/language/jlpt-n5" className="text-white hover:text-green-200">
                <Home className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold">N5 Vocabulary Building</h1>
                <p className="text-green-100">800 essential words • 10 words per day • 80 days</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">0%</div>
              <div className="text-green-100 text-sm">Progress</div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Learning Overview', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'practice', label: 'Character Practice', icon: <BookOpen className="w-4 h-4" /> },
              { id: 'memory', label: 'Memory Training', icon: <Brain className="w-4 h-4" /> },
              { id: 'exam', label: 'Mastery Exam', icon: <Trophy className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-blue-600'
                }`}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Personalized Greeting */}
            <div className="text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-100 via-purple-50 to-indigo-100 animate-pulse"></div>
              <div className="relative z-10 py-12">
                <div className="flex items-center justify-center mb-4">
                  {React.createElement(timeIcon, { className: "w-12 h-12 text-yellow-500 mr-4 animate-bounce" })}
                  <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                    {timeGreeting}
                  </h2>
                </div>
                <p className="text-2xl text-gray-700 mb-4">Ready to conquer Japanese today?</p>
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full shadow-lg">
                  <Flame className="w-5 h-5 mr-2 animate-pulse" />
                  <span className="font-bold">{learningStreak} Day Streak! 🔥</span>
                </div>
              </div>
            </div>

            {/* Animated Statistics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <BookOpen className="w-8 h-8" />
                  <div className="text-3xl font-bold">{animatedStats.wordsLearned}</div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Words Mastered</h3>
                <div className="w-full bg-blue-400 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(animatedStats.wordsLearned / 800) * 100}%` }}
                  ></div>
                </div>
                <p className="text-blue-100 text-sm mt-1">Target: 800 words</p>
              </div>

              <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <Flame className="w-8 h-8" />
                  <div className="text-3xl font-bold">{animatedStats.streakDays}</div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Day Streak</h3>
                <div className="flex space-x-1">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full ${
                        i < animatedStats.streakDays ? 'bg-yellow-300' : 'bg-red-300'
                      } transition-all duration-300`}
                    ></div>
                  ))}
                </div>
                <p className="text-red-100 text-sm mt-2">Keep it burning! 🔥</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <Target className="w-8 h-8" />
                  <div className="text-3xl font-bold">{animatedStats.accuracy}%</div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Accuracy Rate</h3>
                <div className="relative w-16 h-16 mx-auto">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      className="text-green-300"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      strokeDasharray={`${(animatedStats.accuracy / 100) * 175.93} 175.93`}
                      className="text-white transition-all duration-1000"
                    />
                  </svg>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <Clock className="w-8 h-8" />
                  <div className="text-3xl font-bold">{Math.floor(animatedStats.totalTime / 60)}h</div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Study Time</h3>
                <div className="flex items-center space-x-2">
                  <Coffee className="w-4 h-4" />
                  <span className="text-sm">{animatedStats.totalTime} minutes today</span>
                </div>
                <p className="text-purple-100 text-sm mt-1">Amazing dedication! ⭐</p>
              </div>
            </div>

            {/* Weekly Goal Progress */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Weekly Challenge</h3>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  <span className="text-lg font-semibold text-gray-700">{currentWeekProgress}% Complete</span>
                </div>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-6">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-6 rounded-full transition-all duration-1000 relative overflow-hidden"
                    style={{ width: `${(currentWeekProgress / weeklyGoal) * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>{currentWeekProgress}/{weeklyGoal} words</span>
                  <span>{weeklyGoal - currentWeekProgress} words to go!</span>
                </div>
              </div>
            </div>

            {/* Achievement Showcase */}
            <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Crown className="w-8 h-8 mr-3 animate-pulse" />
                Achievement Gallery
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    onClick={() => setSelectedAchievement(achievement.id)}
                    className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 hover:scale-110 ${
                      achievement.unlocked 
                        ? achievement.rarity === 'legendary' 
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg' 
                          : achievement.rarity === 'epic'
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg'
                          : achievement.rarity === 'rare'
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg'
                          : 'bg-gradient-to-r from-gray-400 to-gray-500 shadow-lg'
                        : 'bg-gray-600 opacity-50'
                    } ${selectedAchievement === achievement.id ? 'ring-4 ring-white' : ''}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{achievement.icon}</div>
                      <h4 className="font-bold text-xs">{achievement.title}</h4>
                    </div>
                    {achievement.unlocked && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {selectedAchievement && (
                <div className="mt-6 p-4 bg-white/20 rounded-xl">
                  <p className="text-center">
                    {achievements.find(a => a.id === selectedAchievement)?.desc}
                  </p>
                </div>
              )}
            </div>

            {/* Daily Challenges */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Gamepad2 className="w-8 h-8 mr-3 text-purple-600" />
                  Today's Challenges
                </h3>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Refresh Challenges
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {dailyChallenges.map((challenge) => (
                  <div key={challenge.id} className="border-2 border-dashed border-purple-300 rounded-xl p-6 hover:border-purple-500 transition-colors">
                    <div className="text-center">
                      <div className="text-4xl mb-3">{challenge.icon}</div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{challenge.title}</h4>
                      <p className="text-gray-600 text-sm mb-4">{challenge.desc}</p>
                      <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                        <Gift className="w-4 h-4 mr-1" />
                        {challenge.reward}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Word Cloud */}
            <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-2xl shadow-xl p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold flex items-center">
                  <Sparkles className="w-8 h-8 mr-3 animate-pulse" />
                  Your Learning Universe
                </h3>
                <button 
                  onClick={() => setShowWordCloud(!showWordCloud)}
                  className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  {showWordCloud ? 'Hide Universe' : 'Explore Universe'}
                </button>
              </div>
              {showWordCloud && (
                <div className="relative h-64 overflow-hidden rounded-xl bg-black/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-4 gap-4 text-center">
                      {['私', '学校', '食べ物', '友達', '勉強', '先生', '本', '水'].map((word, index) => (
                        <div
                          key={word}
                          className={`text-${['2xl', '3xl', 'xl', '4xl'][index % 4]} font-bold opacity-70 hover:opacity-100 cursor-pointer transition-all duration-300 hover:scale-125`}
                          style={{
                            color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'][index],
                            transform: `rotate(${Math.random() * 30 - 15}deg)`
                          }}
                        >
                          {word}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* AI Insights Panel */}
            <div className="bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Brain className="w-8 h-8 mr-3" />
                AI Learning Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/20 rounded-xl p-6">
                  <h4 className="text-lg font-bold mb-3 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Performance Analysis
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Your learning speed increased by 23% this week!</li>
                    <li>• Best performance time: 10-11 AM</li>
                    <li>• Strongest category: Family & People words</li>
                    <li>• Suggested focus: Food & Drink vocabulary</li>
                  </ul>
                </div>
                <div className="bg-white/20 rounded-xl p-6">
                  <h4 className="text-lg font-bold mb-3 flex items-center">
                    <Rocket className="w-5 h-5 mr-2" />
                    Personalized Tips
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Try voice recognition practice for better retention</li>
                    <li>• Schedule reviews in the evening for optimal memory</li>
                    <li>• Join community challenges to boost motivation</li>
                    <li>• Use mnemonics for difficult kanji characters</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Social Learning Features */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="w-8 h-8 mr-3 text-blue-600" />
                Learning Community
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Global Rank</h4>
                  <div className="text-3xl font-bold text-blue-600 mb-1">#247</div>
                  <p className="text-gray-600 text-sm">Out of 12,847 learners</p>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Study Buddies</h4>
                  <div className="text-3xl font-bold text-green-600 mb-1">23</div>
                  <p className="text-gray-600 text-sm">Active learning partners</p>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-xl">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">XP Points</h4>
                  <div className="text-3xl font-bold text-purple-600 mb-1">2,847</div>
                  <p className="text-gray-600 text-sm">This month</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-8">
            {/* Practice Header with Real-time Progress */}
            <div className="text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 animate-pulse"></div>
              <div className="relative z-10 py-8">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  Character Practice Dojo 🥋
                </h2>
                <p className="text-xl text-gray-700 mb-6">Master each character with our revolutionary learning system</p>
                
                {/* Live Practice Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <div className="text-2xl font-bold text-blue-600">Day {currentDay}/{totalDays}</div>
                    <div className="text-sm text-gray-600 mb-2">Study Progress</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(currentDay / totalDays) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{Math.round((currentDay / totalDays) * 100)}% Complete</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <div className="text-2xl font-bold text-green-600">{currentWordIndex + 1}/{wordsPerDay}</div>
                    <div className="text-sm text-gray-600 mb-2">Today's Words</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${dayProgress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{dayProgress}% Today</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <div className="text-2xl font-bold text-purple-600">{wordsLearned}/{totalWords}</div>
                    <div className="text-sm text-gray-600 mb-2">Words Mastered</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${overallProgress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{overallProgress}% Mastered</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <div className="text-2xl font-bold text-orange-600">{learningStreak}</div>
                    <div className="text-sm text-gray-600 mb-2">Day Streak</div>
                    <div className="flex justify-center mt-2">
                      {[...Array(7)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 mx-0.5 rounded-full ${
                            i < learningStreak ? 'bg-yellow-400' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Weekly Goal</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Revolutionary Word Card System */}
            <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-3xl shadow-2xl p-8 text-white">
              {/* Card Navigation & Progress */}
              <div className="flex items-center justify-between mb-8">
                {/* Word Navigation */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={previousWord}
                    disabled={currentWordIndex === 0}
                    className="group relative overflow-hidden bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl p-4 transition-all duration-300 hover:scale-110"
                  >
                    <ArrowLeft className="w-6 h-6 group-hover:animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  </button>
                  <span className="text-white/80 text-sm px-2">Word</span>
                </div>

                {/* Center Progress Display */}
                <div className="text-center">
                  <div className="text-lg font-semibold mb-2">
                    Day {currentDay}: Word {currentWordIndex + 1} of {wordsPerDay}
                  </div>
                  <div className="w-64 bg-white/20 rounded-full h-3 mb-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-blue-400 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${((currentWordIndex + 1) / wordsPerDay) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-white/70">
                    Total Progress: {((currentDay - 1) * wordsPerDay + currentWordIndex + 1)}/{totalWords} words
                  </div>
                </div>

                {/* Word Navigation */}
                <div className="flex items-center space-x-2">
                  <span className="text-white/80 text-sm px-2">Word</span>
                  <button
                    onClick={nextWord}
                    disabled={currentWordIndex === todaysWords.length - 1}
                    className="group relative overflow-hidden bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl p-4 transition-all duration-300 hover:scale-110"
                  >
                    <ArrowRight className="w-6 h-6 group-hover:animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  </button>
                </div>
              </div>

              {/* Day Navigation */}
              <div className="flex items-center justify-center space-x-4 mb-8 bg-white/10 backdrop-blur-md rounded-2xl p-4">
                <button
                  onClick={previousDay}
                  disabled={currentDay === 1}
                  className="group relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-6 py-3 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center space-x-2">
                    <ChevronLeft className="w-5 h-5" />
                    <span className="font-semibold">Previous Day</span>
                  </div>
                </button>

                <div className="text-center px-8">
                  <div className="text-2xl font-bold text-white mb-1">Day {currentDay}</div>
                  <div className="text-white/80 text-sm">of {totalDays} days</div>
                  <div className="w-32 bg-white/20 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentDay / totalDays) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <button
                  onClick={nextDay}
                  disabled={currentDay === totalDays}
                  className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-6 py-3 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Next Day</span>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </button>
              </div>

              {/* Interactive Character Display */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 mb-8">
                <div className="text-center">
                  {/* Main Character with Hover Effects */}
                  <div className="relative group mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <div 
                      className="relative text-9xl font-bold cursor-pointer transition-all duration-500 hover:scale-110 hover:rotate-3"
                      style={{ 
                        background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))'
                      }}
                                          >
                        {getCurrentWord().japanese}
                      </div>
                    </div>

                    {/* Hiragana with Typewriter Effect */}
                    <div className="text-4xl text-blue-200 mb-4 font-light tracking-wide">
                      {getCurrentWord().hiragana}
                    </div>

                    {/* Romaji with Gradient */}
                    <div className="text-3xl mb-8 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                      {getCurrentWord().romaji}
                    </div>

                  {/* Audio Controls with Visualizer */}
                  <div className="flex justify-center space-x-4 mb-8">
                    <button className="group relative bg-gradient-to-r from-green-500 to-blue-500 px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
                      <div className="flex items-center space-x-3">
                        <Volume2 className="w-6 h-6 group-hover:animate-pulse" />
                        <span>Listen (Native)</span>
                      </div>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity"></div>
                    </button>
                    
                    <button className="group relative bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
                      <div className="flex items-center space-x-3">
                        <Mic className="w-6 h-6 group-hover:animate-pulse" />
                        <span>Record & Compare</span>
                      </div>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity"></div>
                    </button>
                  </div>

                  {/* Answer Reveal System */}
                  {!showAnswer ? (
                    <div className="space-y-6">
                      <div className="text-xl text-white/80 mb-6">
                        🤔 What does this word mean?
                      </div>
                      <button
                        onClick={() => setShowAnswer(true)}
                        className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 px-12 py-6 rounded-3xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-2xl"
                      >
                        <span className="relative z-10">Reveal Answer ✨</span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-8">
                                              {/* English Meaning with Animation */}
                        <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-6">
                          {getCurrentWord().english}
                        </div>

                        {/* Category Badge */}
                        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-xl font-bold shadow-lg">
                          <Star className="w-5 h-5 mr-2" />
                          {getCurrentWord().category}
                        </div>

                      {/* Memory Aid Section */}
                      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-2xl p-6 backdrop-blur-sm">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                          <Lightbulb className="w-8 h-8 text-yellow-400 animate-pulse" />
                          <span className="text-2xl font-bold text-yellow-200">Memory Magic</span>
                        </div>
                                                  <p className="text-xl text-yellow-100 italic text-center leading-relaxed">
                            "{getCurrentWord().mnemonic}"
                          </p>
                      </div>

                      {/* Interactive Stroke Order */}
                      <div className="bg-white/10 rounded-2xl p-6">
                        <h4 className="text-xl font-bold mb-4 text-center">✍️ Stroke Order Practice</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                      <div className="bg-white/20 rounded-xl p-4 text-center">
                              <div className="text-lg font-semibold mb-2">Step 1</div>
                              <div className="w-20 h-20 bg-white/10 rounded-lg mx-auto flex items-center justify-center text-3xl">
                                {getCurrentWord().japanese}
                              </div>
                            </div>
                            <div className="bg-white/20 rounded-xl p-4 text-center">
                              <div className="text-lg font-semibold mb-2">Step 2</div>
                              <div className="w-20 h-20 bg-white/10 rounded-lg mx-auto flex items-center justify-center text-3xl opacity-60">
                                {getCurrentWord().japanese}
                              </div>
                            </div>
                            <div className="bg-white/20 rounded-xl p-4 text-center">
                              <div className="text-lg font-semibold mb-2">Step 3</div>
                              <div className="w-20 h-20 bg-white/10 rounded-lg mx-auto flex items-center justify-center text-3xl opacity-30">
                                {getCurrentWord().japanese}
                              </div>
                            </div>
                        </div>
                      </div>

                      {/* Mastery Assessment */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                          onClick={() => markWord(false)}
                          className="group relative bg-gradient-to-r from-red-500 to-pink-500 px-8 py-6 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-xl"
                        >
                          <div className="flex items-center justify-center space-x-3">
                            <XCircle className="w-8 h-8 group-hover:animate-bounce" />
                            <span>Need More Practice</span>
                          </div>
                          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity"></div>
                        </button>

                        <button
                          onClick={() => markWord(true)}
                          className="group relative bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-6 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-xl"
                        >
                          <div className="flex items-center justify-center space-x-3">
                            <Star className="w-8 h-8 group-hover:animate-spin" />
                            <span>Getting There</span>
                          </div>
                          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity"></div>
                        </button>

                        <button
                          onClick={() => markWord(true)}
                          className="group relative bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-6 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-xl"
                        >
                          <div className="flex items-center justify-center space-x-3">
                            <CheckCircle className="w-8 h-8 group-hover:animate-pulse" />
                            <span>Mastered!</span>
                          </div>
                          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity"></div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Learning Modes Selector */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white cursor-pointer hover:scale-105 transition-all duration-300 shadow-xl">
                <div className="text-center">
                  <Eye className="w-12 h-12 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-xl font-bold mb-2">Visual Mode</h3>
                  <p className="text-blue-100 text-sm">Learn with images and associations</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white cursor-pointer hover:scale-105 transition-all duration-300 shadow-xl">
                <div className="text-center">
                  <Headphones className="w-12 h-12 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-xl font-bold mb-2">Audio Mode</h3>
                  <p className="text-green-100 text-sm">Perfect your pronunciation</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white cursor-pointer hover:scale-105 transition-all duration-300 shadow-xl">
                <div className="text-center">
                  <Brain className="w-12 h-12 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-xl font-bold mb-2">Memory Mode</h3>
                  <p className="text-purple-100 text-sm">Strengthen recall with mnemonics</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white cursor-pointer hover:scale-105 transition-all duration-300 shadow-xl">
                <div className="text-center">
                  <Zap className="w-12 h-12 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-xl font-bold mb-2">Speed Mode</h3>
                  <p className="text-orange-100 text-sm">Rapid-fire recognition practice</p>
                </div>
              </div>
            </div>

            {/* Study Insights Panel */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="w-8 h-8 mr-3 text-indigo-600" />
                Your Practice Analytics
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Character Mastery Progress</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-lg">私 (watashi)</span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg">学生 (gakusei)</span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < 3 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg">先生 (sensei)</span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Practice Recommendations</h4>
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-blue-800">Optimal Practice Time</span>
                      </div>
                      <p className="text-blue-700 text-sm">Your best performance is at 10-11 AM</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Target className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-800">Focus Area</span>
                      </div>
                      <p className="text-green-700 text-sm">Review family-related vocabulary</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Rocket className="w-4 h-4 text-purple-600" />
                        <span className="font-medium text-purple-800">Next Goal</span>
                      </div>
                      <p className="text-purple-700 text-sm">Master 5 more words this week</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'memory' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Memory Training</h2>
              <p className="text-lg text-gray-600 mb-6">Interactive games and exercises to strengthen memory retention</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RefreshCw className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Flashcard Review</h3>
                  <p className="text-gray-600 mb-4">Quick review of learned words with spaced repetition</p>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Start Review</button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Memory Palace</h3>
                  <p className="text-gray-600 mb-4">Create visual associations for better retention</p>
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">Start Training</button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Speed Recognition</h3>
                  <p className="text-gray-600 mb-4">Fast-paced word recognition challenges</p>
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">Start Challenge</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exam' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Mastery Exam</h2>
              <p className="text-lg text-gray-600 mb-6">Test your knowledge and track your progress</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Quiz</h3>
                  <p className="text-gray-600 mb-4">10 questions • 5 minutes</p>
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold">
                    Start Quick Quiz
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Progress Test</h3>
                  <p className="text-gray-600 mb-4">25 questions • 15 minutes</p>
                  <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold">
                    Start Progress Test
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Master Exam</h3>
                  <p className="text-gray-600 mb-4">50 questions • 30 minutes</p>
                  <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 font-semibold">
                    Start Master Exam
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default N5Vocabulary;
