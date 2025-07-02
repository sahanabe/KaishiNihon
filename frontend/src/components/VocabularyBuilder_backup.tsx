import React, { useState, useEffect, useRef } from "react";
import { 
  X, 
  Volume2, 
  BookOpen, 
  Brain, 
  Target, 
  Calendar,
  Star,
  TrendingUp,
  Award,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Clock,
  Zap,
  Trophy,
  Heart,
  Play,
  Pause
} from 'lucide-react';

interface VocabularyWord {
  id: number;
  japanese: string;
  hiragana: string;
  romaji: string;
  english: string;
  category: string;
  jlptLevel: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  mnemonic: string;
  contextSentence: {
    japanese: string;
    hiragana: string;
    english: string;
  };
  audioUrl?: string;
  srsLevel: number;
  nextReview: Date;
  correctCount: number;
  incorrectCount: number;
  lastStudied: Date | null;
}

interface VocabularyBuilderProps {
  onClose: () => void;
}

const VocabularyBuilder: React.FC<VocabularyBuilderProps> = ({ onClose }) => {
  const [currentPhase, setCurrentPhase] = useState<'dashboard' | 'study' | 'review' | 'stats'>('dashboard');
  const [currentDay, setCurrentDay] = useState(1);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [studyMode, setStudyMode] = useState<'learn' | 'review' | 'test'>('learn');
  const [showAnswer, setShowAnswer] = useState(false);
  const [userProgress, setUserProgress] = useState({
    totalWords: 0,
    learnedWords: 0,
    masteredWords: 0,
    currentStreak: 0,
    totalStudyTime: 0,
    accuracyRate: 0
  });
  const [todaysWords, setTodaysWords] = useState<VocabularyWord[]>([]);
  const [reviewWords, setReviewWords] = useState<VocabularyWord[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    timeSpent: 0
  });
  const audioRef = useRef<HTMLAudioElement>(null);

  // Sample N5 vocabulary data
  const vocabularyData: VocabularyWord[] = [
    {
      id: 1,
      japanese: '私',
      hiragana: 'わたし',
      romaji: 'watashi',
      english: 'I, me',
      category: 'Pronouns',
      jlptLevel: 'N5',
      difficulty: 'beginner',
      mnemonic: 'I am washing (wa-ta-shi) myself',
      contextSentence: {
        japanese: '私は学生です。',
        hiragana: 'わたしはがくせいです。',
        english: 'I am a student.'
      },
      srsLevel: 0,
      nextReview: new Date(),
      correctCount: 0,
      incorrectCount: 0,
      lastStudied: null
    },
    {
      id: 2,
      japanese: '学生',
      hiragana: 'がくせい',
      romaji: 'gakusei',
      english: 'student',
      category: 'People',
      jlptLevel: 'N5',
      difficulty: 'beginner',
      mnemonic: 'Students gawk at their homework (gaku-sei)',
      contextSentence: {
        japanese: '私は大学の学生です。',
        hiragana: 'わたしはだいがくのがくせいです。',
        english: 'I am a university student.'
      },
      srsLevel: 0,
      nextReview: new Date(),
      correctCount: 0,
      incorrectCount: 0,
      lastStudied: null
    },
    {
      id: 3,
      japanese: '先生',
      hiragana: 'せんせい',
      romaji: 'sensei',
      english: 'teacher',
      category: 'People',
      jlptLevel: 'N5',
      difficulty: 'beginner',
      mnemonic: 'A teacher is sensible (sen-sei)',
      contextSentence: {
        japanese: '田中先生は親切です。',
        hiragana: 'たなかせんせいはしんせつです。',
        english: 'Tanaka-sensei is kind.'
      },
      srsLevel: 0,
      nextReview: new Date(),
      correctCount: 0,
      incorrectCount: 0,
      lastStudied: null
    },
    {
      id: 4,
      japanese: '学校',
      hiragana: 'がっこう',
      romaji: 'gakkou',
      english: 'school',
      category: 'Places',
      jlptLevel: 'N5',
      difficulty: 'beginner',
      mnemonic: 'Students gawk at cool (gak-kou) buildings at school',
      contextSentence: {
        japanese: '学校で勉強します。',
        hiragana: 'がっこうでべんきょうします。',
        english: 'I study at school.'
      },
      srsLevel: 0,
      nextReview: new Date(),
      correctCount: 0,
      incorrectCount: 0,
      lastStudied: null
    },
    {
      id: 5,
      japanese: '勉強',
      hiragana: 'べんきょう',
      romaji: 'benkyou',
      english: 'study',
      category: 'Actions',
      jlptLevel: 'N5',
      difficulty: 'beginner',
      mnemonic: 'Ben is keen on (ben-kyou) studying',
      contextSentence: {
        japanese: '毎日日本語を勉強します。',
        hiragana: 'まいにちにほんごをべんきょうします。',
        english: 'I study Japanese every day.'
      },
      srsLevel: 0,
      nextReview: new Date(),
      correctCount: 0,
      incorrectCount: 0,
      lastStudied: null
    },
    {
      id: 6,
      japanese: '日本語',
      hiragana: 'にほんご',
      romaji: 'nihongo',
      english: 'Japanese language',
      category: 'Languages',
      jlptLevel: 'N5',
      difficulty: 'beginner',
      mnemonic: 'Knee-high bongo (ni-hon-go) drums from Japan',
      contextSentence: {
        japanese: '日本語は難しいです。',
        hiragana: 'にほんごはむずかしいです。',
        english: 'Japanese is difficult.'
      },
      srsLevel: 0,
      nextReview: new Date(),
      correctCount: 0,
      incorrectCount: 0,
      lastStudied: null
    },
    {
      id: 7,
      japanese: '英語',
      hiragana: 'えいご',
      romaji: 'eigo',
      english: 'English language',
      category: 'Languages',
      jlptLevel: 'N5',
      difficulty: 'beginner',
      mnemonic: 'Ay, I go (ei-go) to English class',
      contextSentence: {
        japanese: '英語を話せます。',
        hiragana: 'えいごをはなせます。',
        english: 'I can speak English.'
      },
      srsLevel: 0,
      nextReview: new Date(),
      correctCount: 0,
      incorrectCount: 0,
      lastStudied: null
    },
    {
      id: 8,
      japanese: '話す',
      hiragana: 'はなす',
      romaji: 'hanasu',
      english: 'to speak, talk',
      category: 'Actions',
      jlptLevel: 'N5',
      difficulty: 'beginner',
      mnemonic: 'Hana speaks (hana-su) through her nose',
      contextSentence: {
        japanese: '友達と話します。',
        hiragana: 'ともだちとはなします。',
        english: 'I talk with friends.'
      },
      srsLevel: 0,
      nextReview: new Date(),
      correctCount: 0,
      incorrectCount: 0,
      lastStudied: null
    },
    {
      id: 9,
      japanese: '友達',
      hiragana: 'ともだち',
      romaji: 'tomodachi',
      english: 'friend',
      category: 'People',
      jlptLevel: 'N5',
      difficulty: 'beginner',
      mnemonic: 'Tomorrow (tomo) I will reach (dachi) my friend',
      contextSentence: {
        japanese: '友達と映画を見ます。',
        hiragana: 'ともだちとえいがをみます。',
        english: 'I watch movies with friends.'
      },
      srsLevel: 0,
      nextReview: new Date(),
      correctCount: 0,
      incorrectCount: 0,
      lastStudied: null
    },
    {
      id: 10,
      japanese: '映画',
      hiragana: 'えいが',
      romaji: 'eiga',
      english: 'movie',
      category: 'Entertainment',
      jlptLevel: 'N5',
      difficulty: 'beginner',
      mnemonic: 'Ay, I got (ei-ga) a movie ticket',
      contextSentence: {
        japanese: '今日映画を見ました。',
        hiragana: 'きょうえいがをみました。',
        english: 'I watched a movie today.'
      },
      srsLevel: 0,
      nextReview: new Date(),
      correctCount: 0,
      incorrectCount: 0,
      lastStudied: null
    }
  ];

  useEffect(() => {
    const startIndex = (currentDay - 1) * 10;
    const endIndex = startIndex + 10;
    const wordsForToday = vocabularyData.slice(startIndex, endIndex);
    setTodaysWords(wordsForToday);
    
    const totalLearned = vocabularyData.filter(word => word.srsLevel > 0).length;
    const totalMastered = vocabularyData.filter(word => word.srsLevel >= 4).length;
    
    setUserProgress({
      totalWords: vocabularyData.length,
      learnedWords: totalLearned,
      masteredWords: totalMastered,
      currentStreak: 5,
      totalStudyTime: 120,
      accuracyRate: 85
    });

    const now = new Date();
    const dueWords = vocabularyData.filter(word => word.nextReview <= now && word.srsLevel > 0);
    setReviewWords(dueWords);
  }, [currentDay]);

  const playAudio = (word: VocabularyWord) => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 1000);
  };

  const markAnswer = (correct: boolean) => {
    const currentWord = todaysWords[currentWordIndex];
    if (!currentWord) return;

    if (correct) {
      setSessionStats(prev => ({ ...prev, correct: prev.correct + 1 }));
      currentWord.srsLevel = Math.min(currentWord.srsLevel + 1, 8);
      currentWord.correctCount++;
    } else {
      setSessionStats(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
      currentWord.srsLevel = Math.max(currentWord.srsLevel - 1, 0);
      currentWord.incorrectCount++;
    }

    currentWord.lastStudied = new Date();
    
    const intervals = [1, 4, 8, 23, 47, 167, 334, 667, 1334];
    const hoursToAdd = intervals[currentWord.srsLevel] || 1334;
    currentWord.nextReview = new Date(Date.now() + hoursToAdd * 60 * 60 * 1000);

    setShowAnswer(false);
    setShowMnemonic(false);
    
    if (currentWordIndex < todaysWords.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    } else {
      setCurrentPhase('stats');
    }
  };

  const nextWord = () => {
    if (currentWordIndex < todaysWords.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      setShowAnswer(false);
      setShowMnemonic(false);
    }
  };

  const previousWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(prev => prev - 1);
      setShowAnswer(false);
      setShowMnemonic(false);
    }
  };

  const resetSession = () => {
    setCurrentWordIndex(0);
    setShowAnswer(false);
    setShowMnemonic(false);
    setSessionStats({ correct: 0, incorrect: 0, timeSpent: 0 });
    setCurrentPhase('study');
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getCurrentWord = () => todaysWords[currentWordIndex];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">📚 N5 Vocabulary Building</h2>
                <p className="text-green-100">800 essential words • 10 words per day • 80 days</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress Stats */}
          <div className="mt-4 grid grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-sm text-green-100">Day</div>
              <div className="text-xl font-bold">{currentDay}/80</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-sm text-green-100">Learned</div>
              <div className="text-xl font-bold">{userProgress.learnedWords}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-sm text-green-100">Streak</div>
              <div className="text-xl font-bold">{userProgress.currentStreak}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-sm text-green-100">Accuracy</div>
              <div className="text-xl font-bold">{userProgress.accuracyRate}%</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentPhase === 'dashboard' && (
            <div className="space-y-8">
              {/* Daily Overview */}
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Day {currentDay} Vocabulary</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Learn 10 new words with AI-powered spaced repetition
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                    <div className="text-blue-600 mb-3">
                      <BookOpen className="w-8 h-8 mx-auto" />
                    </div>
                    <h4 className="text-xl font-bold text-blue-900 mb-2">New Words</h4>
                    <p className="text-3xl font-bold text-blue-600">{todaysWords.length}</p>
                    <p className="text-sm text-blue-700">Ready to learn</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
                    <div className="text-orange-600 mb-3">
                      <RotateCcw className="w-8 h-8 mx-auto" />
                    </div>
                    <h4 className="text-xl font-bold text-orange-900 mb-2">Review</h4>
                    <p className="text-3xl font-bold text-orange-600">{reviewWords.length}</p>
                    <p className="text-sm text-orange-700">Due for review</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                    <div className="text-green-600 mb-3">
                      <Trophy className="w-8 h-8 mx-auto" />
                    </div>
                    <h4 className="text-xl font-bold text-green-900 mb-2">Mastered</h4>
                    <p className="text-3xl font-bold text-green-600">{userProgress.masteredWords}</p>
                    <p className="text-sm text-green-700">Words mastered</p>
                  </div>
                </div>
              </div>

              {/* Study Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-green-200 rounded-xl p-6 hover:border-green-300 transition-colors">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Zap className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">Learn New Words</h4>
                    <p className="text-gray-600 mt-2">Study today's 10 new vocabulary words</p>
                  </div>
                  <button
                    onClick={() => setCurrentPhase('study')}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-colors"
                  >
                    Start Learning
                  </button>
                </div>

                <div className="bg-white border-2 border-orange-200 rounded-xl p-6 hover:border-orange-300 transition-colors">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Brain className="w-8 h-8 text-orange-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">Review Session</h4>
                    <p className="text-gray-600 mt-2">Review words using spaced repetition</p>
                  </div>
                  <button
                    onClick={() => {
                      setStudyMode('review');
                      setCurrentPhase('study');
                    }}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-colors"
                    disabled={reviewWords.length === 0}
                  >
                    {reviewWords.length > 0 ? 'Start Review' : 'No Reviews Due'}
                  </button>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Overall Progress</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{Math.round((userProgress.learnedWords / userProgress.totalWords) * 100)}%</div>
                    <div className="text-sm text-gray-600">Completion</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{formatTime(userProgress.totalStudyTime)}</div>
                    <div className="text-sm text-gray-600">Study Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{userProgress.currentStreak}</div>
                    <div className="text-sm text-gray-600">Day Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{userProgress.accuracyRate}%</div>
                    <div className="text-sm text-gray-600">Accuracy</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Words Learned</span>
                    <span>{userProgress.learnedWords}/{userProgress.totalWords}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(userProgress.learnedWords / userProgress.totalWords) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentPhase === 'study' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <button
                    onClick={previousWord}
                    disabled={currentWordIndex === 0}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <span className="text-lg font-semibold text-gray-600">
                    {currentWordIndex + 1} / {todaysWords.length}
                  </span>
                  <button
                    onClick={nextWord}
                    disabled={currentWordIndex === todaysWords.length - 1}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentWordIndex + 1) / todaysWords.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {getCurrentWord() && (
                <div className="max-w-4xl mx-auto">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-6">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-gray-900 mb-4">
                        {getCurrentWord().japanese}
                      </div>
                      <div className="text-2xl text-gray-600 mb-2">
                        {getCurrentWord().hiragana}
                      </div>
                      <div className="text-xl text-gray-500 mb-4">
                        {getCurrentWord().romaji}
                      </div>
                      
                      <button
                        onClick={() => playAudio(getCurrentWord())}
                        className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                          isPlaying 
                            ? 'bg-green-600 text-white' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        <span>Pronunciation</span>
                      </button>
                      
                      {!showAnswer && (
                        <div className="mt-6">
                          <button
                            onClick={() => setShowAnswer(true)}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors"
                          >
                            Show Meaning
                          </button>
                        </div>
                      )}
                      
                      {showAnswer && (
                        <div className="mt-6 space-y-4">
                          <div className="text-3xl font-bold text-green-600">
                            {getCurrentWord().english}
                          </div>
                          <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                            {getCurrentWord().category}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {showAnswer && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                          <Target className="w-5 h-5 mr-2 text-green-600" />
                          Context Sentence
                        </h4>
                        <div className="space-y-2">
                          <div className="text-lg font-semibold text-gray-900">
                            {getCurrentWord().contextSentence.japanese}
                          </div>
                          <div className="text-gray-600">
                            {getCurrentWord().contextSentence.hiragana}
                          </div>
                          <div className="text-green-600 font-medium">
                            {getCurrentWord().contextSentence.english}
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                          <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
                          Memory Aid
                        </h4>
                        <div className="space-y-2">
                          <button
                            onClick={() => setShowMnemonic(!showMnemonic)}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                          >
                            {showMnemonic ? 'Hide' : 'Show'} Mnemonic
                          </button>
                          {showMnemonic && (
                            <div className="text-gray-700 italic">
                              "{getCurrentWord().mnemonic}"
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {showAnswer && (
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={() => markAnswer(false)}
                        className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                      >
                        <XCircle className="w-5 h-5" />
                        <span>Hard</span>
                      </button>
                      <button
                        onClick={() => markAnswer(true)}
                        className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Easy</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {currentPhase === 'stats' && (
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-3xl font-bold text-gray-900">Session Complete!</h3>
              <p className="text-lg text-gray-600">
                Great job studying today's vocabulary!
              </p>
              
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 max-w-md mx-auto">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">{sessionStats.correct}</div>
                    <div className="text-sm text-gray-600">Correct</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">{sessionStats.incorrect}</div>
                    <div className="text-sm text-gray-600">To Review</div>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <div className="text-lg font-semibold text-gray-900">
                    Accuracy: {Math.round((sessionStats.correct / (sessionStats.correct + sessionStats.incorrect)) * 100)}%
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={resetSession}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-colors"
                >
                  Study Again
                </button>
                <div>
                  <button
                    onClick={() => setCurrentPhase('dashboard')}
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VocabularyBuilder; 
