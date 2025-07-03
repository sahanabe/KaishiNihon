import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Brain, Target, Trophy, Volume2, RotateCcw, CheckCircle, XCircle, Star, Clock, Award, TrendingUp, Zap, ArrowRight, ArrowLeft, Home, Lightbulb, BarChart3, Headphones, RefreshCw, Timer, Eye, Flame, Crown, Users, Calendar, Mic, Camera, Gamepad2, Gift, Sparkles, TrendingDown, BarChart, PieChart, Activity, Rocket, Shield, Compass, Map, Coffee, Sun, Moon, Cloud, Rainbow, ChevronLeft, ChevronRight, Brush, PenTool, Layers, Grid, Hexagon } from 'lucide-react';

const KanjiMastery: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [animatedStats, setAnimatedStats] = useState({ kanjiLearned: 0, streakDays: 0, accuracy: 0, totalTime: 0 });
  const [selectedAchievement, setSelectedAchievement] = useState<string | null>(null);
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [showKanjiCloud, setShowKanjiCloud] = useState(false);
  const [dailyChallenge, setDailyChallenge] = useState(false);
  const [learningStreak, setLearningStreak] = useState(15);
  const [weeklyGoal, setWeeklyGoal] = useState(21);
  const [currentWeekProgress, setCurrentWeekProgress] = useState(18);
  const [currentKanjiIndex, setCurrentKanjiIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);
  const [kanjiPerDay] = useState(3);
  const [totalDays] = useState(37);
  const [totalKanji] = useState(110);
  const [currentWeek, setCurrentWeek] = useState(1);

  // Mastery Exam States
  const [examMode, setExamMode] = useState('selection'); // 'selection', 'adaptive', 'lightning', 'ninja', 'hologram'
  const [examLevel, setExamLevel] = useState(1);
  const [examScore, setExamScore] = useState(0);
  const [examProgress, setExamProgress] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [examStreak, setExamStreak] = useState(0);
  const [neuralActivity, setNeuralActivity] = useState(75);
  const [quantumBonus, setQuantumBonus] = useState(false);

  // Comprehensive JLPT N5 Kanji Database (110 characters)
  const kanjiDatabase = [
    // Week 1 (Days 1-7): Numbers, Time, Basic
    { kanji: '一', onYomi: ['イチ', 'イツ'], kunYomi: ['ひと', 'ひと-つ'], meaning: 'one', category: 'Numbers', strokeCount: 1, week: 1, day: 1 },
    { kanji: '二', onYomi: ['ニ'], kunYomi: ['ふた', 'ふた-つ'], meaning: 'two', category: 'Numbers', strokeCount: 2, week: 1, day: 1 },
    { kanji: '三', onYomi: ['サン'], kunYomi: ['み', 'み-つ'], meaning: 'three', category: 'Numbers', strokeCount: 3, week: 1, day: 1 },
    { kanji: '四', onYomi: ['シ'], kunYomi: ['よ', 'よ-つ', 'よん'], meaning: 'four', category: 'Numbers', strokeCount: 5, week: 1, day: 2 },
    { kanji: '五', onYomi: ['ゴ'], kunYomi: ['いつ', 'いつ-つ'], meaning: 'five', category: 'Numbers', strokeCount: 4, week: 1, day: 2 },
    { kanji: '六', onYomi: ['ロク'], kunYomi: ['む', 'む-つ'], meaning: 'six', category: 'Numbers', strokeCount: 4, week: 1, day: 2 },
    { kanji: '七', onYomi: ['シチ'], kunYomi: ['なな', 'なな-つ'], meaning: 'seven', category: 'Numbers', strokeCount: 2, week: 1, day: 3 },
    { kanji: '八', onYomi: ['ハチ'], kunYomi: ['や', 'や-つ'], meaning: 'eight', category: 'Numbers', strokeCount: 2, week: 1, day: 3 },
    { kanji: '九', onYomi: ['キュウ', 'ク'], kunYomi: ['ここの', 'ここの-つ'], meaning: 'nine', category: 'Numbers', strokeCount: 2, week: 1, day: 3 },
    { kanji: '十', onYomi: ['ジュウ'], kunYomi: ['とお', 'と'], meaning: 'ten', category: 'Numbers', strokeCount: 2, week: 1, day: 4 },
    { kanji: '百', onYomi: ['ヒャク'], kunYomi: ['もも'], meaning: 'hundred', category: 'Numbers', strokeCount: 6, week: 1, day: 4 },
    { kanji: '千', onYomi: ['セン'], kunYomi: ['ち'], meaning: 'thousand', category: 'Numbers', strokeCount: 3, week: 1, day: 4 },
    { kanji: '万', onYomi: ['マン', 'バン'], kunYomi: ['よろず'], meaning: 'ten thousand', category: 'Numbers', strokeCount: 3, week: 1, day: 5 },
    { kanji: '円', onYomi: ['エン'], kunYomi: ['まる', 'まど', 'まど-か'], meaning: 'yen, circle', category: 'Money', strokeCount: 4, week: 1, day: 5 },
    { kanji: '年', onYomi: ['ネン'], kunYomi: ['とし'], meaning: 'year', category: 'Time', strokeCount: 6, week: 1, day: 5 },
    { kanji: '月', onYomi: ['ゲツ', 'ガツ'], kunYomi: ['つき'], meaning: 'month, moon', category: 'Time', strokeCount: 4, week: 1, day: 6 },
    { kanji: '日', onYomi: ['ニチ', 'ジツ'], kunYomi: ['ひ', 'か'], meaning: 'day, sun', category: 'Time', strokeCount: 4, week: 1, day: 6 },
    { kanji: '時', onYomi: ['ジ'], kunYomi: ['とき'], meaning: 'time, hour', category: 'Time', strokeCount: 10, week: 1, day: 6 },
    { kanji: '分', onYomi: ['ブン', 'フン'], kunYomi: ['わ-ける', 'わ-かる'], meaning: 'minute, part', category: 'Time', strokeCount: 4, week: 1, day: 7 },
    { kanji: '秒', onYomi: ['ビョウ'], kunYomi: [], meaning: 'second', category: 'Time', strokeCount: 9, week: 1, day: 7 },
    { kanji: '今', onYomi: ['コン', 'キン'], kunYomi: ['いま'], meaning: 'now', category: 'Time', strokeCount: 4, week: 1, day: 7 },

    // Week 2 (Days 8-14): People, Places, Directions
    { kanji: '人', onYomi: ['ジン', 'ニン'], kunYomi: ['ひと'], meaning: 'person', category: 'People', strokeCount: 2, week: 2, day: 8 },
    { kanji: '大', onYomi: ['ダイ', 'タイ'], kunYomi: ['おお', 'おお-きい'], meaning: 'big', category: 'Size', strokeCount: 3, week: 2, day: 8 },
    { kanji: '小', onYomi: ['ショウ'], kunYomi: ['ちい-さい', 'こ', 'お'], meaning: 'small', category: 'Size', strokeCount: 3, week: 2, day: 8 },
    { kanji: '中', onYomi: ['チュウ'], kunYomi: ['なか', 'うち'], meaning: 'middle, inside', category: 'Position', strokeCount: 4, week: 2, day: 9 },
    { kanji: '上', onYomi: ['ジョウ'], kunYomi: ['うえ', 'うわ', 'かみ', 'あ-げる'], meaning: 'up, above', category: 'Position', strokeCount: 3, week: 2, day: 9 },
    { kanji: '下', onYomi: ['カ', 'ゲ'], kunYomi: ['した', 'しも', 'もと', 'さ-げる'], meaning: 'down, below', category: 'Position', strokeCount: 3, week: 2, day: 9 },
    { kanji: '前', onYomi: ['ゼン'], kunYomi: ['まえ'], meaning: 'before, front', category: 'Position', strokeCount: 9, week: 2, day: 10 },
    { kanji: '後', onYomi: ['ゴ', 'コウ'], kunYomi: ['うし-ろ', 'あと'], meaning: 'after, behind', category: 'Position', strokeCount: 9, week: 2, day: 10 },
    { kanji: '左', onYomi: ['サ'], kunYomi: ['ひだり'], meaning: 'left', category: 'Direction', strokeCount: 5, week: 2, day: 10 },
    { kanji: '右', onYomi: ['ユウ', 'ウ'], kunYomi: ['みぎ'], meaning: 'right', category: 'Direction', strokeCount: 5, week: 2, day: 11 },
    { kanji: '東', onYomi: ['トウ'], kunYomi: ['ひがし'], meaning: 'east', category: 'Direction', strokeCount: 8, week: 2, day: 11 },
    { kanji: '西', onYomi: ['セイ', 'サイ'], kunYomi: ['にし'], meaning: 'west', category: 'Direction', strokeCount: 6, week: 2, day: 11 },
    { kanji: '南', onYomi: ['ナン'], kunYomi: ['みなみ'], meaning: 'south', category: 'Direction', strokeCount: 9, week: 2, day: 12 },
    { kanji: '北', onYomi: ['ホク'], kunYomi: ['きた'], meaning: 'north', category: 'Direction', strokeCount: 5, week: 2, day: 12 },
    { kanji: '国', onYomi: ['コク'], kunYomi: ['くに'], meaning: 'country', category: 'Places', strokeCount: 8, week: 2, day: 12 },
    { kanji: '京', onYomi: ['キョウ', 'ケイ'], kunYomi: ['みやこ'], meaning: 'capital', category: 'Places', strokeCount: 8, week: 2, day: 13 },
    { kanji: '都', onYomi: ['ト', 'ツ'], kunYomi: ['みやこ'], meaning: 'metropolis', category: 'Places', strokeCount: 11, week: 2, day: 13 },
    { kanji: '府', onYomi: ['フ'], kunYomi: [], meaning: 'prefecture', category: 'Places', strokeCount: 8, week: 2, day: 13 },
    { kanji: '県', onYomi: ['ケン'], kunYomi: [], meaning: 'prefecture', category: 'Places', strokeCount: 9, week: 2, day: 14 },
    { kanji: '市', onYomi: ['シ'], kunYomi: ['いち'], meaning: 'city, market', category: 'Places', strokeCount: 5, week: 2, day: 14 },
    { kanji: '町', onYomi: ['チョウ'], kunYomi: ['まち'], meaning: 'town', category: 'Places', strokeCount: 7, week: 2, day: 14 }
  ];

  // Get today's kanji (3 kanji per day)
  const getTodaysKanji = () => {
    const startIndex = (currentDay - 1) * kanjiPerDay;
    const endIndex = startIndex + kanjiPerDay;
    return kanjiDatabase.slice(startIndex, endIndex);
  };

  const todaysKanji = getTodaysKanji();
  const getCurrentKanji = () => todaysKanji[currentKanjiIndex] || kanjiDatabase[0];

  const nextKanji = () => {
    if (currentKanjiIndex < todaysKanji.length - 1) {
      setCurrentKanjiIndex(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  const previousKanji = () => {
    if (currentKanjiIndex > 0) {
      setCurrentKanjiIndex(prev => prev - 1);
      setShowAnswer(false);
    }
  };

  const nextDay = () => {
    if (currentDay < totalDays) {
      setCurrentDay(prev => prev + 1);
      setCurrentKanjiIndex(0);
      setShowAnswer(false);
    }
  };

  const previousDay = () => {
    if (currentDay > 1) {
      setCurrentDay(prev => prev - 1);
      setCurrentKanjiIndex(0);
      setShowAnswer(false);
    }
  };

  // Calculate progress
  const kanjiLearned = kanjiDatabase.filter((_, index) => index < (currentDay - 1) * kanjiPerDay + currentKanjiIndex).length;
  const overallProgress = Math.round((kanjiLearned / totalKanji) * 100);
  const dayProgress = Math.round((currentKanjiIndex / kanjiPerDay) * 100);

  // Animated counters effect
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedStats(prev => ({
        kanjiLearned: Math.min(prev.kanjiLearned + 2, 47),
        streakDays: Math.min(prev.streakDays + 1, 15),
        accuracy: Math.min(prev.accuracy + 3, 94),
        totalTime: Math.min(prev.totalTime + 7, 428)
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

  return (
    <>
      <style>
        {`
          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          .animate-spin-slow {
            animation: spin-slow 3s linear infinite;
          }
        `}
      </style>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 animate-pulse"></div>
          <div className="relative z-10 container mx-auto px-4 py-16">
            <div className="text-center">
              <div className="text-8xl mb-6 animate-bounce">漢</div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
                Essential Kanji Mastery
              </h1>
              <p className="text-2xl text-white/90 mb-8">
                Master 110 fundamental Kanji in 37 days • 3 characters per day
              </p>
              
              {/* Navigation Tabs */}
              <div className="flex justify-center space-x-4 mb-12">
                {[
                  { id: 'overview', label: 'Learning Overview', icon: BarChart3 },
                  { id: 'practice', label: 'Character Practice', icon: Brush },
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
                          ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-2xl scale-110'
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
              <div className="text-center bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl p-8 backdrop-blur-md border border-orange-400/30">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  {timeOfDay === 'morning' ? <Sun className="w-12 h-12 text-yellow-400 animate-spin" /> :
                   timeOfDay === 'afternoon' ? <Cloud className="w-12 h-12 text-blue-400 animate-pulse" /> :
                   <Moon className="w-12 h-12 text-purple-400 animate-bounce" />}
                  <h2 className="text-4xl font-bold text-white">
                    {timeOfDay === 'morning' ? 'おはよう！' : timeOfDay === 'afternoon' ? 'こんにちは！' : 'こんばんは！'}
                  </h2>
                </div>
                <p className="text-xl text-white/90">Ready to master some kanji today?</p>
              </div>

              {/* Real-time Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { label: 'Kanji Learned', value: animatedStats.kanjiLearned, max: 110, icon: BookOpen, color: 'from-blue-400 to-purple-400' },
                  { label: 'Day Streak', value: animatedStats.streakDays, max: 37, icon: Flame, color: 'from-orange-400 to-red-400' },
                  { label: 'Accuracy', value: animatedStats.accuracy, max: 100, icon: Target, color: 'from-green-400 to-blue-400' },
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

              {/* Learning Progress Visualization */}
              <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl p-8 backdrop-blur-md border border-indigo-400/30">
                <h3 className="text-3xl font-bold text-center text-white mb-8">📅 37-Day Learning Journey</h3>
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
                  {Array.from({ length: 6 }, (_, weekIndex) => (
                    <div key={weekIndex} className={`bg-white/10 rounded-2xl p-6 border-2 ${currentWeek === weekIndex + 1 ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/20'}`}>
                      <h4 className="text-xl font-bold text-white mb-2">Week {weekIndex + 1}</h4>
                      <div className="text-sm text-white/80 mb-4">
                        Days {weekIndex * 7 + 1}-{Math.min((weekIndex + 1) * 7, 37)}
                      </div>
                      <div className="space-y-2">
                        {Array.from({ length: weekIndex === 5 ? 2 : 7 }, (_, dayIndex) => (
                          <div key={dayIndex} className={`w-full h-3 rounded-full ${
                            (weekIndex * 7 + dayIndex + 1) <= currentDay ? 'bg-gradient-to-r from-green-400 to-blue-400' : 'bg-white/20'
                          }`}></div>
                        ))}
                      </div>
                      <div className="text-xs text-white/70 mt-2">
                        {weekIndex === 5 ? '13 kanji' : '21 kanji'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'practice' && (
            <div className="space-y-8">
              {/* Practice Header with Real-time Progress */}
              <div className="text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-100 via-orange-50 to-yellow-100 animate-pulse"></div>
                <div className="relative z-10 py-8">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent mb-4">
                    漢字道場 - Kanji Mastery Dojo 🥋
                  </h2>
                  <p className="text-xl text-gray-700 mb-6">Master stroke order, readings, and meanings</p>
                  
                  {/* Live Practice Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="text-center bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                      <div className="text-2xl font-bold text-red-600">Day {currentDay}/{totalDays}</div>
                      <div className="text-sm text-gray-600 mb-2">Study Progress</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-red-400 to-orange-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(currentDay / totalDays) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{Math.round((currentDay / totalDays) * 100)}% Complete</div>
                    </div>
                    <div className="text-center bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                      <div className="text-2xl font-bold text-orange-600">{currentKanjiIndex + 1}/{kanjiPerDay}</div>
                      <div className="text-sm text-gray-600 mb-2">Today's Kanji</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-orange-400 to-yellow-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${dayProgress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{dayProgress}% Today</div>
                    </div>
                    <div className="text-center bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                      <div className="text-2xl font-bold text-yellow-600">{kanjiLearned}/{totalKanji}</div>
                      <div className="text-sm text-gray-600 mb-2">Kanji Mastered</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-yellow-400 to-green-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${overallProgress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{overallProgress}% Mastered</div>
                    </div>
                    <div className="text-center bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                      <div className="text-2xl font-bold text-green-600">{learningStreak}</div>
                      <div className="text-sm text-gray-600 mb-2">Day Streak</div>
                      <div className="flex justify-center mt-2">
                        {[...Array(7)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 mx-0.5 rounded-full ${
                              i < learningStreak ? 'bg-green-400' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Weekly Goal</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Revolutionary Kanji Card System */}
              <div className="bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 rounded-3xl shadow-2xl p-8 text-white">
                {/* Card Navigation & Progress */}
                <div className="flex items-center justify-between mb-8">
                  {/* Kanji Navigation */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={previousKanji}
                      disabled={currentKanjiIndex === 0}
                      className="group relative overflow-hidden bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl p-4 transition-all duration-300 hover:scale-110"
                    >
                      <ArrowLeft className="w-6 h-6 group-hover:animate-pulse" />
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    </button>
                    <span className="text-white/80 text-sm px-2">Kanji</span>
                  </div>

                  {/* Center Progress Display */}
                  <div className="text-center">
                    <div className="text-lg font-semibold mb-2">
                      Day {currentDay}: Kanji {currentKanjiIndex + 1} of {kanjiPerDay}
                    </div>
                    <div className="w-64 bg-white/20 rounded-full h-3 mb-2">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${((currentKanjiIndex + 1) / kanjiPerDay) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-white/70">
                      Total Progress: {((currentDay - 1) * kanjiPerDay + currentKanjiIndex + 1)}/{totalKanji} kanji
                    </div>
                  </div>

                  {/* Kanji Navigation */}
                  <div className="flex items-center space-x-2">
                    <span className="text-white/80 text-sm px-2">Kanji</span>
                    <button
                      onClick={nextKanji}
                      disabled={currentKanjiIndex === todaysKanji.length - 1}
                      className="group relative overflow-hidden bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl p-4 transition-all duration-300 hover:scale-110"
                    >
                      <ArrowRight className="w-6 h-6 group-hover:animate-pulse" />
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    </button>
                  </div>
                </div>

                {/* Day Navigation */}
                <div className="flex items-center justify-center space-x-4 mb-8 bg-white/10 backdrop-blur-md rounded-2xl p-4">
                  <button
                    onClick={previousDay}
                    disabled={currentDay === 1}
                    className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-6 py-3 transition-all duration-300 hover:scale-105"
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
                        className="bg-gradient-to-r from-red-400 to-yellow-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(currentDay / totalDays) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <button
                    onClick={nextDay}
                    disabled={currentDay === totalDays}
                    className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-6 py-3 transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">Next Day</span>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </button>
                </div>

                {/* Interactive Kanji Display */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 mb-8">
                  <div className="text-center">
                    {/* Main Kanji with Hover Effects */}
                    <div className="relative group mb-8">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                      <div 
                        className="relative text-9xl font-bold cursor-pointer transition-all duration-500 hover:scale-110 hover:rotate-3"
                        style={{ 
                          background: 'linear-gradient(45deg, #FF6B6B, #FF8E53, #FF6B35, #F7931E)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))'
                        }}
                      >
                        {getCurrentKanji().kanji}
                      </div>
                    </div>

                    {/* Stroke Count */}
                    <div className="text-2xl text-orange-200 mb-4 font-light">
                      {getCurrentKanji().strokeCount} strokes
                    </div>

                    {/* Category Badge */}
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-xl font-bold shadow-lg mb-8">
                      <Star className="w-5 h-5 mr-2" />
                      {getCurrentKanji().category}
                    </div>

                    {/* Answer Reveal System */}
                    {!showAnswer ? (
                      <div className="space-y-6">
                        <div className="text-xl text-white/80 mb-6">
                          🤔 What does this kanji mean and how is it read?
                        </div>
                        <button
                          onClick={() => setShowAnswer(true)}
                          className="group relative overflow-hidden bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 px-12 py-6 rounded-3xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-2xl"
                        >
                          <span className="relative z-10">Reveal Answer ✨</span>
                          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        {/* English Meaning */}
                        <div className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-6">
                          {getCurrentKanji().meaning}
                        </div>

                        {/* Readings Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          {/* On-yomi */}
                          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/30 rounded-2xl p-6 backdrop-blur-sm">
                            <div className="flex items-center justify-center space-x-3 mb-4">
                              <div className="text-2xl">音</div>
                              <span className="text-xl font-bold text-red-200">On-yomi (Chinese reading)</span>
                            </div>
                            <div className="text-2xl text-red-100 text-center">
                              {getCurrentKanji().onYomi.length > 0 ? getCurrentKanji().onYomi.join(', ') : 'None'}
                            </div>
                          </div>

                          {/* Kun-yomi */}
                          <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-400/30 rounded-2xl p-6 backdrop-blur-sm">
                            <div className="flex items-center justify-center space-x-3 mb-4">
                              <div className="text-2xl">訓</div>
                              <span className="text-xl font-bold text-orange-200">Kun-yomi (Japanese reading)</span>
                            </div>
                            <div className="text-2xl text-orange-100 text-center">
                              {getCurrentKanji().kunYomi.length > 0 ? getCurrentKanji().kunYomi.join(', ') : 'None'}
                            </div>
                          </div>
                        </div>

                        {/* Interactive Stroke Order */}
                        <div className="bg-white/10 rounded-2xl p-6">
                          <h4 className="text-xl font-bold mb-4 text-center">✍️ Stroke Order Practice</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white/20 rounded-xl p-4 text-center">
                              <div className="text-lg font-semibold mb-2">Step 1</div>
                              <div className="w-20 h-20 bg-white/10 rounded-lg mx-auto flex items-center justify-center text-3xl">
                                {getCurrentKanji().kanji}
                              </div>
                              <div className="text-sm text-white/70 mt-2">Trace slowly</div>
                            </div>
                            <div className="bg-white/20 rounded-xl p-4 text-center">
                              <div className="text-lg font-semibold mb-2">Step 2</div>
                              <div className="w-20 h-20 bg-white/10 rounded-lg mx-auto flex items-center justify-center text-3xl opacity-60">
                                {getCurrentKanji().kanji}
                              </div>
                              <div className="text-sm text-white/70 mt-2">Practice writing</div>
                            </div>
                            <div className="bg-white/20 rounded-xl p-4 text-center">
                              <div className="text-lg font-semibold mb-2">Step 3</div>
                              <div className="w-20 h-20 bg-white/10 rounded-lg mx-auto flex items-center justify-center text-3xl opacity-30">
                                {getCurrentKanji().kanji}
                              </div>
                              <div className="text-sm text-white/70 mt-2">Memory test</div>
                            </div>
                          </div>
                        </div>

                        {/* Audio Practice */}
                        <div className="flex justify-center space-x-4 mb-8">
                          <button className="group relative bg-gradient-to-r from-red-500 to-orange-500 px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
                            <div className="flex items-center space-x-3">
                              <Volume2 className="w-6 h-6 group-hover:animate-pulse" />
                              <span>Listen (On-yomi)</span>
                            </div>
                          </button>
                          
                          <button className="group relative bg-gradient-to-r from-orange-500 to-yellow-500 px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
                            <div className="flex items-center space-x-3">
                              <Volume2 className="w-6 h-6 group-hover:animate-pulse" />
                              <span>Listen (Kun-yomi)</span>
                            </div>
                          </button>
                        </div>

                        {/* Mastery Assessment */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <button
                            onClick={() => nextKanji()}
                            className="group relative bg-gradient-to-r from-red-500 to-pink-500 px-8 py-6 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-xl"
                          >
                            <div className="flex items-center justify-center space-x-3">
                              <XCircle className="w-8 h-8 group-hover:animate-bounce" />
                              <span>Need More Practice</span>
                            </div>
                          </button>

                          <button
                            onClick={() => nextKanji()}
                            className="group relative bg-gradient-to-r from-orange-500 to-yellow-500 px-8 py-6 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-xl"
                          >
                            <div className="flex items-center justify-center space-x-3">
                              <Star className="w-8 h-8 group-hover:animate-spin" />
                              <span>Getting There</span>
                            </div>
                          </button>

                          <button
                            onClick={() => nextKanji()}
                            className="group relative bg-gradient-to-r from-yellow-500 to-green-500 px-8 py-6 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-xl"
                          >
                            <div className="flex items-center justify-center space-x-3">
                              <CheckCircle className="w-8 h-8 group-hover:animate-bounce" />
                              <span>Mastered!</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'memory' && (
            <div className="space-y-12">
              {/* Revolutionary Memory Training Header */}
              <div className="text-center bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-red-500/20 rounded-3xl p-8 backdrop-blur-md border border-purple-400/30">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <Brain className="w-12 h-12 text-pink-400 animate-pulse" />
                  <div className="text-6xl animate-bounce">🧠</div>
                  <Zap className="w-12 h-12 text-yellow-400 animate-pulse" />
                </div>
                <h2 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-4">
                  Neural Memory Training
                </h2>
                <p className="text-2xl text-white/90 mb-6">
                  🚀 Experience Next-Level Memory Enhancement • 10 Revolutionary Games
                </p>
                
                {/* Live Memory Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-purple-400/30">
                    <div className="text-3xl font-bold text-purple-400">{animatedStats.kanjiLearned}</div>
                    <div className="text-sm text-white/70">Memory Engrams</div>
                    <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-pink-400/30">
                    <div className="text-3xl font-bold text-pink-400">94%</div>
                    <div className="text-sm text-white/70">Neural Efficiency</div>
                    <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                      <div className="bg-gradient-to-r from-pink-500 to-red-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-red-400/30">
                    <div className="text-3xl font-bold text-red-400">{animatedStats.streakDays}</div>
                    <div className="text-sm text-white/70">Memory Streak</div>
                    <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                      <div className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-orange-400/30">
                    <div className="text-3xl font-bold text-orange-400">2.4x</div>
                    <div className="text-sm text-white/70">Speed Multiplier</div>
                    <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Revolutionary Memory Games Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {/* 1. 3D Kanji Visualization Game */}
                <div className="group relative bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl p-6 backdrop-blur-lg border border-purple-400/30 hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl animate-spin-slow">🌐</div>
                      <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">3D</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Holographic Kanji</h3>
                    <p className="text-white/80 mb-4">Experience kanji in 3D space with gesture controls and holographic projections</p>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-white/20 rounded-lg p-2 text-center transform hover:rotate-12 transition-transform">
                        <div className="text-2xl">漢</div>
                      </div>
                      <div className="bg-white/20 rounded-lg p-2 text-center transform hover:rotate-12 transition-transform">
                        <div className="text-2xl">字</div>
                      </div>
                      <div className="bg-white/20 rounded-lg p-2 text-center transform hover:rotate-12 transition-transform">
                        <div className="text-2xl">学</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-purple-200">AR Compatible</div>
                      <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-xl font-bold hover:scale-110 transition-transform">
                        Launch 🚀
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. Memory Palace Builder */}
                <div className="group relative bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl p-6 backdrop-blur-lg border border-blue-400/30 hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl animate-pulse">🏰</div>
                      <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">PALACE</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Memory Palace</h3>
                    <p className="text-white/80 mb-4">Build virtual rooms and place kanji in spatial memory locations</p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-white/20 rounded-lg p-3 text-center">
                        <div className="text-lg mb-1">🏛️</div>
                        <div className="text-xs text-blue-200">Grand Hall</div>
                      </div>
                      <div className="bg-white/20 rounded-lg p-3 text-center">
                        <div className="text-lg mb-1">🌸</div>
                        <div className="text-xs text-blue-200">Garden</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-blue-200">12 Rooms Built</div>
                      <button className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-xl font-bold hover:scale-110 transition-transform">
                        Build 🏗️
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. Rhythm & Beats Kanji */}
                <div className="group relative bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-3xl p-6 backdrop-blur-lg border border-green-400/30 hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl animate-bounce">🎵</div>
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">BEAT</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Rhythm Memory</h3>
                    <p className="text-white/80 mb-4">Learn kanji through musical patterns and rhythmic sequences</p>
                    <div className="flex space-x-2 mb-4">
                      <div className="flex-1 bg-white/20 rounded-lg p-2 text-center animate-pulse">
                        <div className="text-xl">🎼</div>
                      </div>
                      <div className="flex-1 bg-white/20 rounded-lg p-2 text-center animate-pulse delay-100">
                        <div className="text-xl">🎹</div>
                      </div>
                      <div className="flex-1 bg-white/20 rounded-lg p-2 text-center animate-pulse delay-200">
                        <div className="text-xl">🥁</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-green-200">BPM: 120 ♪</div>
                      <button className="bg-gradient-to-r from-green-500 to-blue-500 px-4 py-2 rounded-xl font-bold hover:scale-110 transition-transform">
                        Play 🎮
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. AI Story Generator */}
                <div className="group relative bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-3xl p-6 backdrop-blur-lg border border-orange-400/30 hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl animate-pulse">📚</div>
                      <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">AI</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Story Weaver</h3>
                    <p className="text-white/80 mb-4">AI creates personalized stories using your kanji to enhance memory</p>
                    <div className="bg-white/20 rounded-lg p-3 mb-4">
                      <div className="text-sm text-orange-200 mb-2">Current Story:</div>
                      <div className="text-xs text-white/70">"In the 大きい city, a 人 walked towards the 山..."</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-orange-200">47 Stories Created</div>
                      <button className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-xl font-bold hover:scale-110 transition-transform">
                        Write 📝
                      </button>
                    </div>
                  </div>
                </div>

                {/* 5. Mirror Match Challenge */}
                <div className="group relative bg-gradient-to-br from-pink-600/20 to-purple-600/20 rounded-3xl p-6 backdrop-blur-lg border border-pink-400/30 hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl animate-spin-slow">🪞</div>
                      <div className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">MATCH</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Mirror Universe</h3>
                    <p className="text-white/80 mb-4">Advanced matching with quantum mirror effects and time distortion</p>
                    <div className="grid grid-cols-4 gap-1 mb-4">
                      {['水', '火', '木', '金'].map((kanji, i) => (
                        <div key={i} className="bg-white/20 rounded-lg p-2 text-center hover:bg-white/30 transition-colors cursor-pointer">
                          <div className="text-lg">{kanji}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-pink-200">Quantum Mode</div>
                      <button className="bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 rounded-xl font-bold hover:scale-110 transition-transform">
                        Match ⚡
                      </button>
                    </div>
                  </div>
                </div>

                {/* 6. Time Warp Memory */}
                <div className="group relative bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-3xl p-6 backdrop-blur-lg border border-yellow-400/30 hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl animate-pulse">⏰</div>
                      <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">TIME</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Chronos Mode</h3>
                    <p className="text-white/80 mb-4">Speed challenges with time dilation effects and temporal bonuses</p>
                    <div className="bg-white/20 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Speed Bonus</span>
                        <span className="text-yellow-300 font-bold">3.2x</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full animate-pulse" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-yellow-200">Warp Level 7</div>
                      <button className="bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2 rounded-xl font-bold hover:scale-110 transition-transform">
                        Warp 🌀
                      </button>
                    </div>
                  </div>
                </div>

                {/* 7. Kanji Constellation Map */}
                <div className="group relative bg-gradient-to-br from-indigo-600/20 to-blue-600/20 rounded-3xl p-6 backdrop-blur-lg border border-indigo-400/30 hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl animate-pulse">⭐</div>
                      <div className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-bold">COSMOS</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Star Navigator</h3>
                    <p className="text-white/80 mb-4">Navigate constellations of related kanji in deep space visualization</p>
                    <div className="relative bg-white/20 rounded-lg p-3 mb-4 h-20 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-blue-900 opacity-50"></div>
                      <div className="relative flex items-center justify-center h-full">
                        <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                        <div className="w-1 h-1 bg-blue-300 rounded-full absolute top-2 right-4 animate-pulse"></div>
                        <div className="w-1 h-1 bg-indigo-300 rounded-full absolute bottom-3 left-6 animate-pulse delay-150"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-indigo-200">Galaxy α-42</div>
                      <button className="bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-2 rounded-xl font-bold hover:scale-110 transition-transform">
                        Explore 🚀
                      </button>
                    </div>
                  </div>
                </div>

                {/* 8. Neural Network Visualizer */}
                <div className="group relative bg-gradient-to-br from-cyan-600/20 to-teal-600/20 rounded-3xl p-6 backdrop-blur-lg border border-cyan-400/30 hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl animate-pulse">🧬</div>
                      <div className="bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-bold">NEURAL</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Brain Mapper</h3>
                    <p className="text-white/80 mb-4">Visualize how your brain forms neural pathways while learning kanji</p>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-white/20 rounded-lg p-2 text-center">
                        <div className="w-4 h-4 bg-cyan-400 rounded-full mx-auto mb-1 animate-pulse"></div>
                        <div className="text-xs text-cyan-200">Input</div>
                      </div>
                      <div className="bg-white/20 rounded-lg p-2 text-center">
                        <div className="w-4 h-4 bg-teal-400 rounded-full mx-auto mb-1 animate-pulse delay-100"></div>
                        <div className="text-xs text-teal-200">Process</div>
                      </div>
                      <div className="bg-white/20 rounded-lg p-2 text-center">
                        <div className="w-4 h-4 bg-green-400 rounded-full mx-auto mb-1 animate-pulse delay-200"></div>
                        <div className="text-xs text-green-200">Memory</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-cyan-200">1,247 Synapses</div>
                      <button className="bg-gradient-to-r from-cyan-500 to-teal-500 px-4 py-2 rounded-xl font-bold hover:scale-110 transition-transform">
                        Scan 🔬
                      </button>
                    </div>
                  </div>
                </div>

                {/* 9. AR Kanji Hunter */}
                <div className="group relative bg-gradient-to-br from-red-600/20 to-pink-600/20 rounded-3xl p-6 backdrop-blur-lg border border-red-400/30 hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl animate-bounce">📱</div>
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">AR</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Reality Hunter</h3>
                    <p className="text-white/80 mb-4">Hunt for kanji in the real world using augmented reality camera</p>
                    <div className="bg-white/20 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Captured Today</span>
                        <span className="text-red-300 font-bold">23 📸</span>
                      </div>
                      <div className="text-xs text-white/70">Last found: 本 at bookstore</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-red-200">Hunter Level 5</div>
                      <button className="bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 rounded-xl font-bold hover:scale-110 transition-transform">
                        Hunt 🎯
                      </button>
                    </div>
                  </div>
                </div>

                {/* 10. Quantum Memory Maze */}
                <div className="group relative bg-gradient-to-br from-violet-600/20 to-indigo-600/20 rounded-3xl p-6 backdrop-blur-lg border border-violet-400/30 hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl animate-spin-slow">🌀</div>
                      <div className="bg-violet-500 text-white px-3 py-1 rounded-full text-sm font-bold">QUANTUM</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Memory Maze</h3>
                    <p className="text-white/80 mb-4">Navigate through quantum maze dimensions while collecting kanji</p>
                    <div className="grid grid-cols-5 gap-1 mb-4">
                      {Array.from({ length: 10 }, (_, i) => (
                        <div key={i} className={`w-8 h-8 rounded ${i % 3 === 0 ? 'bg-violet-500/50' : 'bg-white/20'} flex items-center justify-center`}>
                          {i % 3 === 0 && <div className="text-xs">⚡</div>}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-violet-200">Dimension 7</div>
                      <button className="bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-2 rounded-xl font-bold hover:scale-110 transition-transform">
                        Enter 🌌
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Memory Training Dashboard */}
              <div className="bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-red-600/20 rounded-3xl p-8 backdrop-blur-lg border border-purple-400/30">
                <div className="text-center mb-8">
                  <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                    🧠 Memory Training Analytics
                  </h3>
                  <p className="text-xl text-white/80">Real-time neural enhancement tracking</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  {/* Memory Efficiency Graph */}
                  <div className="bg-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-purple-300 mb-4 flex items-center">
                      <BarChart3 className="w-6 h-6 mr-2" />
                      Memory Efficiency
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Visual Memory</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-white/20 rounded-full h-2">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                          </div>
                          <span className="text-purple-300 font-bold">92%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Audio Memory</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-white/20 rounded-full h-2">
                            <div className="bg-gradient-to-r from-pink-500 to-red-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                          </div>
                          <span className="text-pink-300 font-bold">87%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Spatial Memory</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-white/20 rounded-full h-2">
                            <div className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                          </div>
                          <span className="text-red-300 font-bold">95%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Neural Pathway Strength */}
                  <div className="bg-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-pink-300 mb-4 flex items-center">
                      <Brain className="w-6 h-6 mr-2" />
                      Neural Pathways
                    </h4>
                    <div className="text-center">
                      <div className="relative w-24 h-24 mx-auto mb-4">
                        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.2)" strokeWidth="8" fill="none"/>
                          <circle cx="50" cy="50" r="40" stroke="url(#gradient)" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="25.12" className="animate-pulse"/>
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#EC4899"/>
                              <stop offset="100%" stopColor="#EF4444"/>
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">90%</span>
                        </div>
                      </div>
                      <p className="text-white/70">Pathway Strength</p>
                    </div>
                  </div>

                  {/* Memory Speed */}
                  <div className="bg-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-red-300 mb-4 flex items-center">
                      <Zap className="w-6 h-6 mr-2" />
                      Recall Speed
                    </h4>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-red-300 mb-2">0.8s</div>
                        <p className="text-white/70 text-sm">Average Recall Time</p>
                      </div>
                      <div className="bg-white/20 rounded-lg p-3">
                        <div className="text-sm text-white/70 mb-1">Speed Improvement</div>
                        <div className="text-2xl font-bold text-green-400">+47%</div>
                        <div className="text-xs text-green-300">vs. last week</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Neural Enhancement Protocol */}
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-white mb-4">🔬 Today's Enhancement Protocol</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-400/30">
                      <div className="text-3xl mb-2">🎯</div>
                      <div className="text-sm font-bold text-purple-300">Focus Training</div>
                      <div className="text-xs text-white/70">15 minutes</div>
                    </div>
                    <div className="bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-xl p-4 border border-pink-400/30">
                      <div className="text-3xl mb-2">🧩</div>
                      <div className="text-sm font-bold text-pink-300">Pattern Recognition</div>
                      <div className="text-xs text-white/70">12 minutes</div>
                    </div>
                    <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl p-4 border border-red-400/30">
                      <div className="text-3xl mb-2">⚡</div>
                      <div className="text-sm font-bold text-red-300">Speed Drills</div>
                      <div className="text-xs text-white/70">8 minutes</div>
                    </div>
                    <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-xl p-4 border border-orange-400/30">
                      <div className="text-3xl mb-2">🌀</div>
                      <div className="text-sm font-bold text-orange-300">Deep Memory</div>
                      <div className="text-xs text-white/70">20 minutes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'exam' && (
            <div className="space-y-12">
              {/* Revolutionary Mastery Exam Header */}
              <div className="text-center bg-gradient-to-r from-gold-500/20 via-yellow-500/20 to-orange-500/20 rounded-3xl p-8 backdrop-blur-md border border-gold-400/30">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <Trophy className="w-12 h-12 text-yellow-400 animate-pulse" />
                  <div className="text-6xl animate-bounce">🏆</div>
                  <Crown className="w-12 h-12 text-orange-400 animate-pulse" />
                </div>
              <h2 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
                Ultimate Mastery Exam
              </h2>
              <p className="text-2xl text-white/90 mb-6">
                🚀 Revolutionary Testing System • 5 Exam Modes • AI-Powered Evaluation
              </p>
              
              {/* Live Exam Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-yellow-400/30">
                  <div className="text-3xl font-bold text-yellow-400">{examScore}</div>
                  <div className="text-sm text-white/70">Total Score</div>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{ width: `${Math.min(examScore, 100)}%` }}></div>
                  </div>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-orange-400/30">
                  <div className="text-3xl font-bold text-orange-400">{examLevel}</div>
                  <div className="text-sm text-white/70">Mastery Level</div>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full" style={{ width: `${(examLevel / 10) * 100}%` }}></div>
                  </div>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-red-400/30">
                  <div className="text-3xl font-bold text-red-400">{examStreak}</div>
                  <div className="text-sm text-white/70">Perfect Streak</div>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full" style={{ width: `${Math.min((examStreak / 20) * 100, 100)}%` }}></div>
                  </div>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-pink-400/30">
                  <div className="text-3xl font-bold text-pink-400">{neuralActivity}%</div>
                  <div className="text-sm text-white/70">Neural Activity</div>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full animate-pulse" style={{ width: `${neuralActivity}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {!examStarted ? (
              /* Exam Mode Selection */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {/* 1. Adaptive Intelligence Exam */}
                <div className="group relative bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-3xl p-6 backdrop-blur-lg border border-blue-400/30 hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden"
                     onClick={() => {
                       setExamMode('adaptive');
                       setExamStarted(true);
                       setCurrentQuestion(0);
                       setExamScore(0);
                       setExamStreak(0);
                       setSelectedAnswer('');
                       setTimeRemaining(30);
                     }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl animate-pulse">🧠</div>
                      <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">AI</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Adaptive Intelligence</h3>
                    <p className="text-white/80 mb-4">AI adjusts difficulty in real-time based on your performance</p>
                    <div className="bg-white/20 rounded-lg p-3 mb-4">
                      <div className="text-sm text-blue-200 mb-2">Features:</div>
                      <div className="text-xs text-white/70">• Dynamic difficulty scaling</div>
                      <div className="text-xs text-white/70">• Neural pattern analysis</div>
                      <div className="text-xs text-white/70">• Personalized challenges</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-blue-200">Duration: 15-25 min</div>
                      <button className="bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 rounded-xl font-bold hover:scale-110 transition-transform">
                        Start 🧠
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. Lightning Speed Challenge */}
                <div className="group relative bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-3xl p-6 backdrop-blur-lg border border-yellow-400/30 hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden"
                     onClick={() => {
                       setExamMode('lightning');
                       setExamStarted(true);
                       setCurrentQuestion(0);
                       setExamScore(0);
                       setExamStreak(0);
                       setSelectedAnswer('');
                       setTimeRemaining(3);
                     }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl animate-bounce">⚡</div>
                      <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">SPEED</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Lightning Challenge</h3>
                    <p className="text-white/80 mb-4">Ultra-fast recognition with time pressure and speed bonuses</p>
                    <div className="bg-white/20 rounded-lg p-3 mb-4">
                      <div className="text-sm text-yellow-200 mb-2">Features:</div>
                      <div className="text-xs text-white/70">• 3-second time limits</div>
                      <div className="text-xs text-white/70">• Speed multipliers</div>
                      <div className="text-xs text-white/70">• Lightning effects</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-yellow-200">Duration: 5-10 min</div>
                      <button className="bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2 rounded-xl font-bold hover:scale-110 transition-transform">
                        Start ⚡
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. Ninja Stealth Mode */}
                <div className="group relative bg-gradient-to-br from-gray-800/20 to-black/20 rounded-3xl p-6 backdrop-blur-lg border border-gray-400/30 hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden"
                     onClick={() => {
                       setExamMode('ninja');
                       setExamStarted(true);
                       setCurrentQuestion(0);
                       setExamScore(0);
                       setExamStreak(0);
                       setSelectedAnswer('');
                       setTimeRemaining(20);
                     }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl animate-pulse">🥷</div>
                      <div className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-bold">STEALTH</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Ninja Stealth</h3>
                    <p className="text-white/80 mb-4">Hidden kanji appear and disappear - test your instant recognition</p>
                    <div className="bg-white/20 rounded-lg p-3 mb-4">
                      <div className="text-sm text-gray-200 mb-2">Features:</div>
                      <div className="text-xs text-white/70">• Disappearing characters</div>
                      <div className="text-xs text-white/70">• Shadow effects</div>
                      <div className="text-xs text-white/70">• Stealth bonuses</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-200">Duration: 8-12 min</div>
                      <button className="bg-gradient-to-r from-gray-500 to-black px-4 py-2 rounded-xl font-bold hover:scale-110 transition-transform">
                        Start 🥷
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. Holographic Matrix */}
                <div className="group relative bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-3xl p-6 backdrop-blur-lg border border-green-400/30 hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden"
                     onClick={() => {
                       setExamMode('hologram');
                       setExamStarted(true);
                       setCurrentQuestion(0);
                       setExamScore(0);
                       setExamStreak(0);
                       setSelectedAnswer('');
                       setTimeRemaining(25);
                     }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl animate-spin-slow">🌐</div>
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">MATRIX</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Holographic Matrix</h3>
                    <p className="text-white/80 mb-4">3D kanji projections in virtual reality environment</p>
                    <div className="bg-white/20 rounded-lg p-3 mb-4">
                      <div className="text-sm text-green-200 mb-2">Features:</div>
                      <div className="text-xs text-white/70">• 3D projections</div>
                      <div className="text-xs text-white/70">• Matrix effects</div>
                      <div className="text-xs text-white/70">• Spatial challenges</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-green-200">Duration: 12-18 min</div>
                      <button className="bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 rounded-xl font-bold hover:scale-110 transition-transform">
                        Start 🌐
                      </button>
                    </div>
                  </div>
                </div>

                {/* 5. Quantum Mastery Portal */}
                <div className="group relative bg-gradient-to-br from-purple-600/20 to-violet-600/20 rounded-3xl p-6 backdrop-blur-lg border border-purple-400/30 hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden"
                     onClick={() => {
                       setExamMode('quantum');
                       setExamStarted(true);
                       setCurrentQuestion(0);
                       setExamScore(0);
                       setExamStreak(0);
                       setSelectedAnswer('');
                       setTimeRemaining(35);
                       setQuantumBonus(true);
                     }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl animate-pulse">🌀</div>
                      <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">QUANTUM</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Quantum Portal</h3>
                    <p className="text-white/80 mb-4">Multi-dimensional testing across parallel kanji universes</p>
                    <div className="bg-white/20 rounded-lg p-3 mb-4">
                      <div className="text-sm text-purple-200 mb-2">Features:</div>
                      <div className="text-xs text-white/70">• Parallel dimensions</div>
                      <div className="text-xs text-white/70">• Quantum entanglement</div>
                      <div className="text-xs text-white/70">• Reality shifts</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-purple-200">Duration: 20-30 min</div>
                      <button className="bg-gradient-to-r from-purple-500 to-violet-500 px-4 py-2 rounded-xl font-bold hover:scale-110 transition-transform">
                        Start 🌀
                      </button>
                    </div>
                  </div>
                </div>

                {/* 6. Ultimate Champion Mode */}
                <div className="group relative bg-gradient-to-br from-red-600/20 to-pink-600/20 rounded-3xl p-6 backdrop-blur-lg border border-red-400/30 hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden"
                     onClick={() => {
                       setExamMode('champion');
                       setExamStarted(true);
                       setCurrentQuestion(0);
                       setExamScore(0);
                       setExamStreak(0);
                       setSelectedAnswer('');
                       setTimeRemaining(40);
                       setQuantumBonus(true);
                       setNeuralActivity(100);
                     }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl animate-bounce">👑</div>
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">CHAMPION</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Ultimate Champion</h3>
                    <p className="text-white/80 mb-4">The ultimate test combining all modes - only for masters</p>
                    <div className="bg-white/20 rounded-lg p-3 mb-4">
                      <div className="text-sm text-red-200 mb-2">Features:</div>
                      <div className="text-xs text-white/70">• All modes combined</div>
                      <div className="text-xs text-white/70">• Master difficulty</div>
                      <div className="text-xs text-white/70">• Hall of Fame</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-red-200">Duration: 45-60 min</div>
                      <button className="bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 rounded-xl font-bold hover:scale-110 transition-transform">
                        Start 👑
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Active Exam Interface */
              <div className="space-y-8">
                {/* Exam Progress Header */}
                <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl p-6 backdrop-blur-lg border border-blue-400/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">
                        {examMode === 'adaptive' && '🧠'}
                        {examMode === 'lightning' && '⚡'}
                        {examMode === 'ninja' && '🥷'}
                        {examMode === 'hologram' && '🌐'}
                        {examMode === 'quantum' && '🌀'}
                        {examMode === 'champion' && '👑'}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white capitalize">{examMode} Mode</h3>
                        <p className="text-white/70">Question {currentQuestion + 1} of 50</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-yellow-400">{timeRemaining}s</div>
                      <div className="text-sm text-white/70">Time Remaining</div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-white/20 rounded-full h-4 mb-4">
                    <div 
                      className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${(currentQuestion / 50) * 100}%` }}
                    ></div>
                  </div>
                  
                  {/* Live Stats */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-400">{examScore}</div>
                      <div className="text-xs text-white/70">Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-purple-400">{examStreak}</div>
                      <div className="text-xs text-white/70">Streak</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-pink-400">{Math.round((examScore / (currentQuestion + 1)) * 100) || 0}%</div>
                      <div className="text-xs text-white/70">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-400">{quantumBonus ? '2x' : '1x'}</div>
                      <div className="text-xs text-white/70">Multiplier</div>
                    </div>
                  </div>
                </div>

                {/* Question Interface */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">
                  <div className="text-center mb-8">
                    {/* Kanji Display with Mode-Specific Effects */}
                    <div className={`relative group mb-8 ${
                      examMode === 'hologram' ? 'animate-pulse' : 
                      examMode === 'ninja' ? 'animate-bounce' :
                      examMode === 'quantum' ? 'animate-spin-slow' : ''
                    }`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                      <div 
                        className="relative text-9xl font-bold cursor-pointer transition-all duration-500 hover:scale-110"
                        style={{ 
                          background: examMode === 'lightning' ? 
                            'linear-gradient(45deg, #FBBF24, #F59E0B, #D97706)' :
                            examMode === 'ninja' ?
                            'linear-gradient(45deg, #6B7280, #374151, #1F2937)' :
                            'linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))'
                        }}
                      >
                        {kanjiDatabase[currentQuestion]?.kanji || '一'}
                      </div>
                    </div>

                    {/* Question Type Indicator */}
                    <div className="text-xl text-white/80 mb-8">
                      What is the meaning of this kanji?
                    </div>

                    {/* Answer Options */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {['option1', 'option2', 'option3', 'option4'].map((option, index) => (
                        <button
                          key={option}
                          onClick={() => setSelectedAnswer(option)}
                          className={`group relative p-6 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 ${
                            selectedAnswer === option
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-2xl'
                              : 'bg-white/20 text-white hover:bg-white/30'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                              selectedAnswer === option ? 'border-white bg-white/20' : 'border-white/50'
                            }`}>
                              {String.fromCharCode(65 + index)}
                            </div>
                            <span>
                              {index === 0 && (kanjiDatabase[currentQuestion]?.meaning || 'one')}
                              {index === 1 && 'fire'}
                              {index === 2 && 'water'}
                              {index === 3 && 'earth'}
                            </span>
                          </div>
                          {selectedAnswer === option && (
                            <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={() => setExamStarted(false)}
                        className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300"
                      >
                        Exit Exam
                      </button>
                      <button
                        onClick={() => {
                          setCurrentQuestion(prev => prev + 1);
                          setSelectedAnswer('');
                          setTimeRemaining(30);
                          if (selectedAnswer === 'option1') {
                            setExamScore(prev => prev + 1);
                            setExamStreak(prev => prev + 1);
                          } else {
                            setExamStreak(0);
                          }
                        }}
                        disabled={!selectedAnswer}
                        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next Question
                      </button>
                    </div>
                  </div>
                </div>

                {/* Real-time Analytics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-blue-300 mb-4 flex items-center">
                      <Activity className="w-6 h-6 mr-2" />
                      Neural Activity
                    </h4>
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.2)" strokeWidth="8" fill="none"/>
                        <circle cx="50" cy="50" r="40" stroke="url(#neuralGradient)" strokeWidth="8" fill="none" 
                                strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * neuralActivity / 100)} className="animate-pulse"/>
                        <defs>
                          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3B82F6"/>
                            <stop offset="100%" stopColor="#8B5CF6"/>
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-white">{neuralActivity}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-purple-300 mb-4 flex items-center">
                      <TrendingUp className="w-6 h-6 mr-2" />
                      Performance Trend
                    </h4>
                    <div className="space-y-2">
                      {Array.from({ length: 8 }, (_, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <div className="flex-1 bg-white/20 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                              style={{ width: `${Math.random() * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-pink-300 mb-4 flex items-center">
                      <Zap className="w-6 h-6 mr-2" />
                      Speed Metrics
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <div className="text-2xl font-bold text-pink-400">1.2s</div>
                        <div className="text-sm text-white/70">Avg Response Time</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-400">+34%</div>
                        <div className="text-sm text-white/70">Speed Improvement</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Exam Analytics Dashboard */}
            <div className="bg-gradient-to-r from-yellow-600/20 via-orange-600/20 to-red-600/20 rounded-3xl p-8 backdrop-blur-lg border border-yellow-400/30">
              <div className="text-center mb-8">
                <h3 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
                  🏆 Mastery Analytics
                </h3>
                <p className="text-xl text-white/80">Comprehensive performance tracking and insights</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white/10 rounded-2xl p-6 text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <div className="text-2xl font-bold text-yellow-400">94.2%</div>
                  <div className="text-sm text-white/70">Overall Mastery</div>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-2xl p-6 text-center">
                  <div className="text-4xl mb-4">🎯</div>
                  <div className="text-2xl font-bold text-orange-400">87/110</div>
                  <div className="text-sm text-white/70">Kanji Mastered</div>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full" style={{ width: '79%' }}></div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-2xl p-6 text-center">
                  <div className="text-4xl mb-4">⚡</div>
                  <div className="text-2xl font-bold text-red-400">1247</div>
                  <div className="text-sm text-white/70">Questions Solved</div>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-2xl p-6 text-center">
                  <div className="text-4xl mb-4">🏅</div>
                  <div className="text-2xl font-bold text-pink-400">Master</div>
                  <div className="text-sm text-white/70">Current Rank</div>
                  <div className="flex justify-center mt-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Achievement Gallery */}
              <div className="mt-8">
                <h4 className="text-2xl font-bold text-white mb-4 text-center">🏆 Recent Achievements</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-r from-gold-500/20 to-yellow-500/20 rounded-xl p-4 border border-gold-400/30 text-center">
                    <div className="text-3xl mb-2">🥇</div>
                    <div className="text-sm font-bold text-gold-300">Speed Demon</div>
                    <div className="text-xs text-white/70">Sub-1s average</div>
                  </div>
                  <div className="bg-gradient-to-r from-silver-500/20 to-gray-500/20 rounded-xl p-4 border border-silver-400/30 text-center">
                    <div className="text-3xl mb-2">🧠</div>
                    <div className="text-sm font-bold text-silver-300">Neural Master</div>
                    <div className="text-xs text-white/70">Perfect recall</div>
                  </div>
                  <div className="bg-gradient-to-r from-bronze-500/20 to-orange-600/20 rounded-xl p-4 border border-bronze-400/30 text-center">
                    <div className="text-3xl mb-2">⚡</div>
                    <div className="text-sm font-bold text-bronze-300">Lightning Fast</div>
                    <div className="text-xs text-white/70">100 streak</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-xl p-4 border border-purple-400/30 text-center">
                    <div className="text-3xl mb-2">🌀</div>
                    <div className="text-sm font-bold text-purple-300">Quantum Mind</div>
                    <div className="text-xs text-white/70">All modes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <Link
          to="/language/jlpt-n5"
          className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-110 flex items-center space-x-3"
        >
          <ArrowLeft className="w-6 h-6 group-hover:animate-pulse" />
          <span>Back to JLPT N5</span>
        </Link>
      </div>
    </div>
    </>
  );
};

export default KanjiMastery; 