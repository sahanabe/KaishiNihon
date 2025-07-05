import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Target, 
  Trophy, 
  Play, 
  RotateCcw, 
  CheckCircle, 
  XCircle,
  ArrowRight,
  ArrowLeft,
  Star,
  Award,
  BarChart3,
  Clock,
  Zap,
  Volume2,
  Brain,
  Calendar,
  Users
} from 'lucide-react';

// N4 Vocabulary Data (700 words organized by themes)
const vocabularyData = [
  {
    category: "Daily Life & Home",
    icon: "🏠",
    words: [
      { word: "家具", reading: "かぐ", meaning: "furniture", difficulty: 1 },
      { word: "家事", reading: "かじ", meaning: "housework", difficulty: 1 },
      { word: "掃除", reading: "そうじ", meaning: "cleaning", difficulty: 2 },
      { word: "洗濯", reading: "せんたく", meaning: "laundry", difficulty: 2 },
      { word: "料理", reading: "りょうり", meaning: "cooking", difficulty: 1 },
      { word: "食事", reading: "しょくじ", meaning: "meal", difficulty: 1 },
      { word: "朝食", reading: "ちょうしょく", meaning: "breakfast", difficulty: 2 },
      { word: "昼食", reading: "ちゅうしょく", meaning: "lunch", difficulty: 2 },
      { word: "夕食", reading: "ゆうしょく", meaning: "dinner", difficulty: 2 },
      { word: "お風呂", reading: "おふろ", meaning: "bath", difficulty: 1 },
      { word: "シャワー", reading: "シャワー", meaning: "shower", difficulty: 1 },
      { word: "寝る", reading: "ねる", meaning: "to sleep", difficulty: 1 },
      { word: "起きる", reading: "おきる", meaning: "to wake up", difficulty: 1 },
      { word: "着替える", reading: "きがえる", meaning: "to change clothes", difficulty: 2 },
      { word: "化粧", reading: "けしょう", meaning: "makeup", difficulty: 2 }
    ]
  },
  {
    category: "Food & Dining",
    icon: "🍽️",
    words: [
      { word: "レストラン", reading: "レストラン", meaning: "restaurant", difficulty: 1 },
      { word: "食堂", reading: "しょくどう", meaning: "cafeteria", difficulty: 2 },
      { word: "居酒屋", reading: "いざかや", meaning: "izakaya", difficulty: 2 },
      { word: "カフェ", reading: "カフェ", meaning: "cafe", difficulty: 1 },
      { word: "メニュー", reading: "メニュー", meaning: "menu", difficulty: 1 },
      { word: "注文", reading: "ちゅうもん", meaning: "order", difficulty: 2 },
      { word: "支払い", reading: "しはらい", meaning: "payment", difficulty: 2 },
      { word: "お会計", reading: "おかいけい", meaning: "bill", difficulty: 2 },
      { word: "割り勘", reading: "わりかん", meaning: "split bill", difficulty: 3 },
      { word: "おごる", reading: "おごる", meaning: "to treat", difficulty: 2 },
      { word: "乾杯", reading: "かんぱい", meaning: "cheers", difficulty: 2 },
      { word: "お酒", reading: "おさけ", meaning: "alcohol", difficulty: 1 },
      { word: "ビール", reading: "ビール", meaning: "beer", difficulty: 1 },
      { word: "ワイン", reading: "ワイン", meaning: "wine", difficulty: 1 },
      { word: "お茶", reading: "おちゃ", meaning: "tea", difficulty: 1 }
    ]
  },
  {
    category: "Transportation",
    icon: "🚗",
    words: [
      { word: "電車", reading: "でんしゃ", meaning: "train", difficulty: 1 },
      { word: "地下鉄", reading: "ちかてつ", meaning: "subway", difficulty: 2 },
      { word: "バス", reading: "バス", meaning: "bus", difficulty: 1 },
      { word: "タクシー", reading: "タクシー", meaning: "taxi", difficulty: 1 },
      { word: "自転車", reading: "じてんしゃ", meaning: "bicycle", difficulty: 2 },
      { word: "車", reading: "くるま", meaning: "car", difficulty: 1 },
      { word: "飛行機", reading: "ひこうき", meaning: "airplane", difficulty: 2 },
      { word: "船", reading: "ふね", meaning: "ship", difficulty: 1 },
      { word: "駅", reading: "えき", meaning: "station", difficulty: 1 },
      { word: "空港", reading: "くうこう", meaning: "airport", difficulty: 2 },
      { word: "港", reading: "みなと", meaning: "port", difficulty: 1 },
      { word: "切符", reading: "きっぷ", meaning: "ticket", difficulty: 2 },
      { word: "運賃", reading: "うんちん", meaning: "fare", difficulty: 2 },
      { word: "定期券", reading: "ていきけん", meaning: "commuter pass", difficulty: 3 },
      { word: "乗り換え", reading: "のりかえ", meaning: "transfer", difficulty: 2 }
    ]
  },
  {
    category: "Shopping & Money",
    icon: "💰",
    words: [
      { word: "買い物", reading: "かいもの", meaning: "shopping", difficulty: 1 },
      { word: "デパート", reading: "デパート", meaning: "department store", difficulty: 1 },
      { word: "スーパー", reading: "スーパー", meaning: "supermarket", difficulty: 1 },
      { word: "コンビニ", reading: "コンビニ", meaning: "convenience store", difficulty: 1 },
      { word: "値段", reading: "ねだん", meaning: "price", difficulty: 1 },
      { word: "料金", reading: "りょうきん", meaning: "fee", difficulty: 2 },
      { word: "割引", reading: "わりびき", meaning: "discount", difficulty: 2 },
      { word: "セール", reading: "セール", meaning: "sale", difficulty: 1 },
      { word: "現金", reading: "げんきん", meaning: "cash", difficulty: 2 },
      { word: "カード", reading: "カード", meaning: "card", difficulty: 1 },
      { word: "小銭", reading: "こぜに", meaning: "change", difficulty: 2 },
      { word: "お釣り", reading: "おつり", meaning: "change (money)", difficulty: 1 },
      { word: "レシート", reading: "レシート", meaning: "receipt", difficulty: 1 },
      { word: "領収書", reading: "りょうしゅうしょ", meaning: "receipt", difficulty: 3 },
      { word: "予算", reading: "よさん", meaning: "budget", difficulty: 2 }
    ]
  },
  {
    category: "Work & Business",
    icon: "💼",
    words: [
      { word: "会社", reading: "かいしゃ", meaning: "company", difficulty: 1 },
      { word: "仕事", reading: "しごと", meaning: "work", difficulty: 1 },
      { word: "職場", reading: "しょくば", meaning: "workplace", difficulty: 2 },
      { word: "同僚", reading: "どうりょう", meaning: "colleague", difficulty: 2 },
      { word: "上司", reading: "じょうし", meaning: "boss", difficulty: 2 },
      { word: "部下", reading: "ぶか", meaning: "subordinate", difficulty: 2 },
      { word: "会議", reading: "かいぎ", meaning: "meeting", difficulty: 2 },
      { word: "プレゼン", reading: "プレゼン", meaning: "presentation", difficulty: 1 },
      { word: "報告", reading: "ほうこく", meaning: "report", difficulty: 2 },
      { word: "連絡", reading: "れんらく", meaning: "contact", difficulty: 2 },
      { word: "打ち合わせ", reading: "うちあわせ", meaning: "consultation", difficulty: 3 },
      { word: "残業", reading: "ざんぎょう", meaning: "overtime", difficulty: 2 },
      { word: "出張", reading: "しゅっちょう", meaning: "business trip", difficulty: 2 },
      { word: "給料", reading: "きゅうりょう", meaning: "salary", difficulty: 2 },
      { word: "ボーナス", reading: "ボーナス", meaning: "bonus", difficulty: 1 }
    ]
  },
  {
    category: "Health & Medical",
    icon: "🏥",
    words: [
      { word: "病院", reading: "びょういん", meaning: "hospital", difficulty: 1 },
      { word: "医者", reading: "いしゃ", meaning: "doctor", difficulty: 1 },
      { word: "看護師", reading: "かんごし", meaning: "nurse", difficulty: 2 },
      { word: "薬", reading: "くすり", meaning: "medicine", difficulty: 1 },
      { word: "診察", reading: "しんさつ", meaning: "medical examination", difficulty: 2 },
      { word: "治療", reading: "ちりょう", meaning: "treatment", difficulty: 2 },
      { word: "手術", reading: "しゅじゅつ", meaning: "surgery", difficulty: 2 },
      { word: "注射", reading: "ちゅうしゃ", meaning: "injection", difficulty: 2 },
      { word: "痛い", reading: "いたい", meaning: "painful", difficulty: 1 },
      { word: "熱", reading: "ねつ", meaning: "fever", difficulty: 1 },
      { word: "風邪", reading: "かぜ", meaning: "cold", difficulty: 1 },
      { word: "頭痛", reading: "ずつう", meaning: "headache", difficulty: 2 },
      { word: "腹痛", reading: "ふくつう", meaning: "stomachache", difficulty: 2 },
      { word: "咳", reading: "せき", meaning: "cough", difficulty: 1 },
      { word: "鼻水", reading: "はなみず", meaning: "runny nose", difficulty: 2 }
    ]
  }
];

// Game modes
const GAME_MODES = {
  FLASHCARD: 'flashcard',
  QUIZ: 'quiz',
  LISTENING: 'listening',
  SPEAKING: 'speaking'
};

const N4VocabularyExpansion: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(vocabularyData[0].category);
  const [gameMode, setGameMode] = useState<string | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [userProgress, setUserProgress] = useState<{[key: string]: number}>({});
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [studyStreak, setStudyStreak] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(15);

  // Get current category words
  const currentCategoryWords = vocabularyData.find(cat => cat.category === selectedCategory)?.words || [];

  // Calculate overall progress
  const totalWords = vocabularyData.reduce((sum, cat) => sum + cat.words.length, 0);
  const masteredWords = Object.values(userProgress).reduce((sum, count) => sum + count, 0);
  const overallProgress = Math.round((masteredWords / totalWords) * 100);

  // Flashcard component
  const FlashcardGame = () => {
    const currentWord = currentCategoryWords[currentWordIndex];
    
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-4xl font-bold text-black mb-4">{currentWord.word}</div>
          <div className="text-lg text-gray-600 mb-4">Difficulty: {currentWord.difficulty}/3</div>
          
          {showAnswer ? (
            <div className="space-y-4">
              <div className="text-xl font-semibold text-blue-600">{currentWord.reading}</div>
              <div className="text-lg text-gray-800">{currentWord.meaning}</div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => {
                    setUserProgress(prev => ({
                      ...prev,
                      [currentWord.word]: (prev[currentWord.word] || 0) + 1
                    }));
                    setShowAnswer(false);
                    setCurrentWordIndex((prev) => (prev + 1) % currentCategoryWords.length);
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  Got it!
                </button>
                <button
                  onClick={() => {
                    setShowAnswer(false);
                    setCurrentWordIndex((prev) => (prev + 1) % currentCategoryWords.length);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <XCircle className="w-4 h-4 inline mr-2" />
                  Need more practice
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAnswer(true)}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Show Answer
            </button>
          )}
          
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => setCurrentWordIndex((prev) => prev === 0 ? currentCategoryWords.length - 1 : prev - 1)}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-500">
              {currentWordIndex + 1} / {currentCategoryWords.length}
            </span>
            <button
              onClick={() => setCurrentWordIndex((prev) => (prev + 1) % currentCategoryWords.length)}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Quiz component
  const QuizGame = () => {
    useEffect(() => {
      if (isQuizActive && timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else if (timeLeft === 0) {
        setIsQuizActive(false);
      }
    }, [timeLeft, isQuizActive]);

    const generateQuiz = () => {
      const questions = currentCategoryWords.map(word => {
        const options = [word.meaning];
        const otherWords = vocabularyData.flatMap(cat => cat.words).filter(w => w.word !== word.word);
        
        while (options.length < 4) {
          const randomWord = otherWords[Math.floor(Math.random() * otherWords.length)];
          if (!options.includes(randomWord.meaning)) {
            options.push(randomWord.meaning);
          }
        }
        
        return {
          word: word.word,
          reading: word.reading,
          correctAnswer: word.meaning,
          options: options.sort(() => Math.random() - 0.5)
        };
      }).sort(() => Math.random() - 0.5).slice(0, 10);
      
      setQuizQuestions(questions);
      setCurrentQuestion(0);
      setScore(0);
      setTotalQuestions(questions.length);
      setTimeLeft(30);
      setIsQuizActive(true);
    };

    const handleAnswer = (selectedAnswer: string) => {
      const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correctAnswer;
      if (isCorrect) {
        setScore(score + 1);
        setUserProgress(prev => ({
          ...prev,
          [quizQuestions[currentQuestion].word]: (prev[quizQuestions[currentQuestion].word] || 0) + 1
        }));
      }
      
      if (currentQuestion + 1 < quizQuestions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setIsQuizActive(false);
      }
    };

    if (quizQuestions.length === 0) {
      return (
        <div className="text-center">
          <button
            onClick={generateQuiz}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            <Play className="w-4 h-4 inline mr-2" />
            Start Quiz
          </button>
        </div>
      );
    }

    if (!isQuizActive) {
      return (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Quiz Complete!</h3>
          <p className="text-lg mb-4">Score: {score} / {totalQuestions}</p>
          <p className="text-lg mb-6">Accuracy: {Math.round((score / totalQuestions) * 100)}%</p>
          <button
            onClick={generateQuiz}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            <RotateCcw className="w-4 h-4 inline mr-2" />
            Try Again
          </button>
        </div>
      );
    }

    const currentQ = quizQuestions[currentQuestion];
    
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-black font-medium">Question {currentQuestion + 1} / {totalQuestions}</span>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-black" />
              <span className="text-sm font-bold text-black">{timeLeft}s</span>
            </div>
          </div>
          
          <div className="text-3xl font-bold text-center mb-2 text-black">{currentQ.word}</div>
          <div className="text-lg text-center mb-6 text-gray-600">{currentQ.reading}</div>
          
          <div className="space-y-3">
            {currentQ.options.map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors text-black font-medium"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">N4 Vocabulary Expansion</h1>
          <p className="text-lg text-gray-600 mb-4">Master 700 intermediate words with thematic learning</p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Overall Progress</span>
              <span>{overallProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {masteredWords} / {totalWords} words mastered
            </p>
          </div>

          {/* Daily Goal */}
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-md mx-auto mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">Daily Goal</h3>
                <p className="text-sm text-gray-600">{dailyGoal} words per day</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">{studyStreak}</div>
                <div className="text-sm text-gray-600">day streak</div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {vocabularyData.map(category => (
            <button
              key={category.category}
              onClick={() => {
                setSelectedCategory(category.category);
                setGameMode(null);
                setCurrentWordIndex(0);
                setShowAnswer(false);
              }}
              className={`px-4 py-2 rounded-full transition-all duration-200 flex items-center space-x-2 ${
                selectedCategory === category.category
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.category}</span>
            </button>
          ))}
        </div>

        {/* Game Mode Selection */}
        {!gameMode && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <button
              onClick={() => setGameMode(GAME_MODES.FLASHCARD)}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-center group"
            >
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-blue-500 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">Flashcards</h3>
              <p className="text-sm text-gray-600">Practice word recognition and meanings</p>
            </button>
            
            <button
              onClick={() => setGameMode(GAME_MODES.QUIZ)}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-center group"
            >
              <Target className="w-12 h-12 mx-auto mb-4 text-purple-500 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">Quiz Mode</h3>
              <p className="text-sm text-gray-600">Test your knowledge with timed quizzes</p>
            </button>
            
            <button
              onClick={() => setGameMode(GAME_MODES.LISTENING)}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-center group"
            >
              <Volume2 className="w-12 h-12 mx-auto mb-4 text-orange-500 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">Listening</h3>
              <p className="text-sm text-gray-600">Practice listening comprehension</p>
            </button>
            
            <button
              onClick={() => setGameMode(GAME_MODES.SPEAKING)}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-center group"
            >
              <Brain className="w-12 h-12 mx-auto mb-4 text-green-500 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">Speaking</h3>
              <p className="text-sm text-gray-600">Practice pronunciation and speaking</p>
            </button>
          </div>
        )}

        {/* Game Area */}
        {gameMode && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {gameMode === GAME_MODES.FLASHCARD && 'Vocabulary Flashcards'}
                {gameMode === GAME_MODES.QUIZ && 'Vocabulary Quiz'}
                {gameMode === GAME_MODES.LISTENING && 'Listening Practice'}
                {gameMode === GAME_MODES.SPEAKING && 'Speaking Practice'}
              </h2>
              <button
                onClick={() => setGameMode(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Back to Games
              </button>
            </div>
            
            {gameMode === GAME_MODES.FLASHCARD && <FlashcardGame />}
            {gameMode === GAME_MODES.QUIZ && <QuizGame />}
            {gameMode === GAME_MODES.LISTENING && (
              <div className="text-center text-gray-600">
                <p className="text-lg">Listening Practice - Coming Soon!</p>
                <p>Practice listening to native Japanese pronunciation</p>
              </div>
            )}
            {gameMode === GAME_MODES.SPEAKING && (
              <div className="text-center text-gray-600">
                <p className="text-lg">Speaking Practice - Coming Soon!</p>
                <p>Practice speaking with pronunciation feedback</p>
              </div>
            )}
          </div>
        )}

        {/* Vocabulary Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {vocabularyData.find(cat => cat.category === selectedCategory)?.icon} {selectedCategory}
            </h2>
            <p className="text-gray-600">
              {currentCategoryWords.length} words • {currentCategoryWords.filter(w => userProgress[w.word] > 0).length} mastered
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Word</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reading</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meaning</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentCategoryWords.map((word, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-lg font-bold text-black">{word.word}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{word.reading}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{word.meaning}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-1">
                        {[1, 2, 3].map(level => (
                          <div
                            key={level}
                            className={`w-3 h-3 rounded-full ${
                              level <= word.difficulty ? 'bg-yellow-400' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min((userProgress[word.word] || 0) * 20, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {userProgress[word.word] || 0}/5
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats and Achievements */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <h3 className="text-lg font-semibold">Achievements</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Perfect Scores</span>
                <span className="text-sm font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Study Streak</span>
                <span className="text-sm font-semibold">{studyStreak} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Words Today</span>
                <span className="text-sm font-semibold">0 / {dailyGoal}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <BarChart3 className="w-8 h-8 text-blue-500" />
              <h3 className="text-lg font-semibold">Statistics</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Quizzes Taken</span>
                <span className="text-sm font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Average Score</span>
                <span className="text-sm font-semibold">0%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Study Time</span>
                <span className="text-sm font-semibold">0 min</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Star className="w-8 h-8 text-purple-500" />
              <h3 className="text-lg font-semibold">Next Goals</h3>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">Master 100 words</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${Math.min((masteredWords / 100) * 100, 100)}%` }}></div>
              </div>
              <div className="text-sm text-gray-600">Complete 10 quizzes</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default N4VocabularyExpansion; 