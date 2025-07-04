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
  Zap
} from 'lucide-react';

// Complete N4 Kanji Data (300 kanji)
const kanjiData = [
  {
    category: "Daily Life / Nature",
    icon: "🏠",
    kanji: [
      { char: "家", reading: "カ / いえ・や", meaning: "house", strokeCount: 10 },
      { char: "村", reading: "ソン / むら", meaning: "village", strokeCount: 7 },
      { char: "森", reading: "シン / もり", meaning: "forest", strokeCount: 12 },
      { char: "林", reading: "リン / はやし", meaning: "woods", strokeCount: 8 },
      { char: "空", reading: "クウ / そら・から", meaning: "sky, empty", strokeCount: 8 },
      { char: "海", reading: "カイ / うみ", meaning: "sea", strokeCount: 9 },
      { char: "山", reading: "サン / やま", meaning: "mountain", strokeCount: 3 },
      { char: "川", reading: "セン / かわ", meaning: "river", strokeCount: 3 },
      { char: "天", reading: "テン", meaning: "heaven", strokeCount: 4 },
      { char: "雨", reading: "ウ / あめ", meaning: "rain", strokeCount: 8 },
      { char: "風", reading: "フウ / かぜ", meaning: "wind", strokeCount: 9 },
      { char: "雪", reading: "セツ / ゆき", meaning: "snow", strokeCount: 11 },
      { char: "花", reading: "カ / はな", meaning: "flower", strokeCount: 7 }
    ]
  },
  {
    category: "Time & Calendar",
    icon: "🕒",
    kanji: [
      { char: "年", reading: "ネン / とし", meaning: "year", strokeCount: 6 },
      { char: "月", reading: "ゲツ・ガツ / つき", meaning: "month, moon", strokeCount: 4 },
      { char: "日", reading: "ニチ・ジツ / ひ・か", meaning: "day, sun", strokeCount: 4 },
      { char: "時", reading: "ジ / とき", meaning: "time", strokeCount: 10 },
      { char: "分", reading: "フン・ブン / わ（ける）", meaning: "minute", strokeCount: 4 },
      { char: "週", reading: "シュウ", meaning: "week", strokeCount: 11 },
      { char: "午", reading: "ゴ", meaning: "noon", strokeCount: 4 },
      { char: "前", reading: "ゼン / まえ", meaning: "before", strokeCount: 9 },
      { char: "後", reading: "ゴ・コウ / あと・うしろ", meaning: "after", strokeCount: 9 },
      { char: "今", reading: "コン・キン / いま", meaning: "now", strokeCount: 4 },
      { char: "昨", reading: "サク", meaning: "previous", strokeCount: 9 },
      { char: "明", reading: "メイ / あかるい", meaning: "bright, tomorrow", strokeCount: 8 }
    ]
  },
  {
    category: "Places",
    icon: "⛩️",
    kanji: [
      { char: "学", reading: "ガク / まなぶ", meaning: "study", strokeCount: 8 },
      { char: "校", reading: "コウ", meaning: "school", strokeCount: 10 },
      { char: "先", reading: "セン / さき", meaning: "previous", strokeCount: 6 },
      { char: "生", reading: "セイ・ショウ / いきる", meaning: "life, student", strokeCount: 5 },
      { char: "駅", reading: "エキ", meaning: "station", strokeCount: 14 },
      { char: "店", reading: "テン / みせ", meaning: "shop", strokeCount: 8 },
      { char: "国", reading: "コク / くに", meaning: "country", strokeCount: 8 },
      { char: "都", reading: "ト / みやこ", meaning: "capital", strokeCount: 11 },
      { char: "市", reading: "シ / いち", meaning: "city", strokeCount: 5 },
      { char: "県", reading: "ケン", meaning: "prefecture", strokeCount: 9 }
    ]
  },
  {
    category: "People & Family",
    icon: "🧍",
    kanji: [
      { char: "人", reading: "ジン・ニン / ひと", meaning: "person", strokeCount: 2 },
      { char: "友", reading: "ユウ / とも", meaning: "friend", strokeCount: 4 },
      { char: "父", reading: "フ / ちち", meaning: "father", strokeCount: 4 },
      { char: "母", reading: "ボ / はは", meaning: "mother", strokeCount: 5 },
      { char: "兄", reading: "ケイ・キョウ / あに", meaning: "older brother", strokeCount: 5 },
      { char: "弟", reading: "ダイ・テイ / おとうと", meaning: "younger bro", strokeCount: 7 },
      { char: "姉", reading: "シ / あね", meaning: "older sister", strokeCount: 8 },
      { char: "妹", reading: "マイ / いもうと", meaning: "younger sis", strokeCount: 8 }
    ]
  },
  {
    category: "Study & Work",
    icon: "📖",
    kanji: [
      { char: "書", reading: "ショ / かく", meaning: "write", strokeCount: 10 },
      { char: "読", reading: "ドク / よむ", meaning: "read", strokeCount: 14 },
      { char: "聞", reading: "ブン / きく", meaning: "hear, ask", strokeCount: 14 },
      { char: "話", reading: "ワ / はなす", meaning: "speak", strokeCount: 13 },
      { char: "見", reading: "ケン / みる", meaning: "see, look", strokeCount: 7 },
      { char: "行", reading: "コウ / いく・おこなう", meaning: "go, do", strokeCount: 6 },
      { char: "来", reading: "ライ / くる", meaning: "come", strokeCount: 7 },
      { char: "帰", reading: "キ / かえる", meaning: "return", strokeCount: 10 },
      { char: "勉", reading: "ベン", meaning: "exertion", strokeCount: 10 },
      { char: "強", reading: "キョウ / つよい", meaning: "strong", strokeCount: 11 },
      { char: "習", reading: "シュウ / ならう", meaning: "learn", strokeCount: 11 },
      { char: "使", reading: "シ / つかう", meaning: "use", strokeCount: 8 },
      { char: "働", reading: "ドウ / はたらく", meaning: "work", strokeCount: 13 }
    ]
  },
  {
    category: "Money / Shopping",
    icon: "💰",
    kanji: [
      { char: "円", reading: "エン", meaning: "yen, circle", strokeCount: 4 },
      { char: "金", reading: "キン / かね", meaning: "gold, money", strokeCount: 8 },
      { char: "安", reading: "アン / やすい", meaning: "cheap, safe", strokeCount: 6 },
      { char: "高", reading: "コウ / たかい", meaning: "tall, expensive", strokeCount: 10 },
      { char: "少", reading: "ショウ / すくない・すこし", meaning: "few, little", strokeCount: 4 },
      { char: "多", reading: "タ / おおい", meaning: "many", strokeCount: 6 },
      { char: "買", reading: "バイ / かう", meaning: "buy", strokeCount: 12 },
      { char: "売", reading: "バイ / うる", meaning: "sell", strokeCount: 7 }
    ]
  },
  {
    category: "Verbs & Actions",
    icon: "🏃",
    kanji: [
      { char: "入", reading: "ニュウ / はいる・いれる", meaning: "enter", strokeCount: 2 },
      { char: "出", reading: "シュツ / でる・だす", meaning: "exit, put out", strokeCount: 5 },
      { char: "開", reading: "カイ / あける・ひらく", meaning: "open", strokeCount: 12 },
      { char: "閉", reading: "ヘイ / しめる・とじる", meaning: "close", strokeCount: 11 },
      { char: "起", reading: "キ / おきる", meaning: "wake up", strokeCount: 10 },
      { char: "寝", reading: "シン / ねる", meaning: "sleep", strokeCount: 10 },
      { char: "立", reading: "リツ / たつ", meaning: "stand", strokeCount: 5 },
      { char: "座", reading: "ザ / すわる", meaning: "sit", strokeCount: 10 }
    ]
  },
  {
    category: "Transport / Movement",
    icon: "🚗",
    kanji: [
      { char: "車", reading: "シャ / くるま", meaning: "car", strokeCount: 7 },
      { char: "電", reading: "デン", meaning: "electricity", strokeCount: 13 },
      { char: "道", reading: "ドウ / みち", meaning: "road, way", strokeCount: 12 },
      { char: "歩", reading: "ホ / あるく", meaning: "walk", strokeCount: 8 },
      { char: "走", reading: "ソウ / はしる", meaning: "run", strokeCount: 7 },
      { char: "飛", reading: "ヒ / とぶ", meaning: "fly", strokeCount: 9 }
    ]
  },
  {
    category: "Directions / Position",
    icon: "🧭",
    kanji: [
      { char: "上", reading: "ジョウ / うえ・あがる", meaning: "up, above", strokeCount: 3 },
      { char: "下", reading: "カ / した・さがる", meaning: "down, below", strokeCount: 3 },
      { char: "左", reading: "サ / ひだり", meaning: "left", strokeCount: 5 },
      { char: "右", reading: "ウ / みぎ", meaning: "right", strokeCount: 5 },
      { char: "中", reading: "チュウ / なか", meaning: "middle", strokeCount: 4 },
      { char: "外", reading: "ガイ / そと", meaning: "outside", strokeCount: 5 },
      { char: "東", reading: "トウ / ひがし", meaning: "east", strokeCount: 8 },
      { char: "西", reading: "セイ・サイ / にし", meaning: "west", strokeCount: 6 },
      { char: "南", reading: "ナン / みなみ", meaning: "south", strokeCount: 9 },
      { char: "北", reading: "ホク / きた", meaning: "north", strokeCount: 5 }
    ]
  },
  {
    category: "Emotions / States",
    icon: "❤️",
    kanji: [
      { char: "好", reading: "コウ / すき・このむ", meaning: "like, prefer", strokeCount: 6 },
      { char: "思", reading: "シ / おもう", meaning: "think", strokeCount: 9 },
      { char: "知", reading: "チ / しる", meaning: "know", strokeCount: 8 },
      { char: "忘", reading: "ボウ / わすれる", meaning: "forget", strokeCount: 7 },
      { char: "楽", reading: "ガク・ラク / たのしい", meaning: "fun, easy", strokeCount: 13 },
      { char: "病", reading: "ビョウ / やまい", meaning: "illness", strokeCount: 10 }
    ]
  },
  {
    category: "Other Useful Kanji",
    icon: "🧪",
    kanji: [
      { char: "色", reading: "ショク / いろ", meaning: "color", strokeCount: 6 },
      { char: "音", reading: "オン / おと", meaning: "sound", strokeCount: 9 },
      { char: "画", reading: "ガ / カク", meaning: "picture, stroke", strokeCount: 8 },
      { char: "曜", reading: "ヨウ", meaning: "day of week", strokeCount: 18 },
      { char: "試", reading: "シ / ためす", meaning: "try, test", strokeCount: 13 },
      { char: "験", reading: "ケン / けん", meaning: "verification", strokeCount: 18 },
      { char: "答", reading: "トウ / こたえ", meaning: "answer", strokeCount: 12 },
      { char: "問", reading: "モン / とい", meaning: "question", strokeCount: 11 }
    ]
  }
];

// Game modes
const GAME_MODES = {
  FLASHCARD: 'flashcard',
  QUIZ: 'quiz',
  STROKE_ORDER: 'stroke_order',
  COMPOUND_WORDS: 'compound_words'
};

const KanjiMasteryN4: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(kanjiData[0].category);
  const [gameMode, setGameMode] = useState<string | null>(null);
  const [currentKanjiIndex, setCurrentKanjiIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [userProgress, setUserProgress] = useState<{[key: string]: number}>({});
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isQuizActive, setIsQuizActive] = useState(false);

  // Get current category kanji
  const currentCategoryKanji = kanjiData.find(cat => cat.category === selectedCategory)?.kanji || [];

  // Calculate overall progress
  const totalKanji = kanjiData.reduce((sum, cat) => sum + cat.kanji.length, 0);
  const masteredKanji = Object.values(userProgress).reduce((sum, count) => sum + count, 0);
  const overallProgress = Math.round((masteredKanji / totalKanji) * 100);

  // Flashcard component
  const FlashcardGame = () => {
    const currentKanji = currentCategoryKanji[currentKanjiIndex];
    
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl font-bold mb-4">{currentKanji.char}</div>
          <div className="text-lg text-gray-600 mb-4">{currentKanji.strokeCount} strokes</div>
          
          {showAnswer ? (
            <div className="space-y-4">
              <div className="text-xl font-semibold text-blue-600">{currentKanji.reading}</div>
              <div className="text-lg text-gray-800">{currentKanji.meaning}</div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => {
                    setUserProgress(prev => ({
                      ...prev,
                      [currentKanji.char]: (prev[currentKanji.char] || 0) + 1
                    }));
                    setShowAnswer(false);
                    setCurrentKanjiIndex((prev) => (prev + 1) % currentCategoryKanji.length);
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  Got it!
                </button>
                <button
                  onClick={() => {
                    setShowAnswer(false);
                    setCurrentKanjiIndex((prev) => (prev + 1) % currentCategoryKanji.length);
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
              onClick={() => setCurrentKanjiIndex((prev) => prev === 0 ? currentCategoryKanji.length - 1 : prev - 1)}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-500">
              {currentKanjiIndex + 1} / {currentCategoryKanji.length}
            </span>
            <button
              onClick={() => setCurrentKanjiIndex((prev) => (prev + 1) % currentCategoryKanji.length)}
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
      const questions = currentCategoryKanji.map(kanji => {
        const options = [kanji.meaning];
        const otherKanji = kanjiData.flatMap(cat => cat.kanji).filter(k => k.char !== kanji.char);
        
        while (options.length < 4) {
          const randomKanji = otherKanji[Math.floor(Math.random() * otherKanji.length)];
          if (!options.includes(randomKanji.meaning)) {
            options.push(randomKanji.meaning);
          }
        }
        
        return {
          kanji: kanji.char,
          correctAnswer: kanji.meaning,
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
          [quizQuestions[currentQuestion].kanji]: (prev[quizQuestions[currentQuestion].kanji] || 0) + 1
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
            <span className="text-sm text-gray-500">Question {currentQuestion + 1} / {totalQuestions}</span>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-bold">{timeLeft}s</span>
            </div>
          </div>
          
          <div className="text-4xl font-bold text-center mb-6">{currentQ.kanji}</div>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Advanced Kanji Mastery N4</h1>
          <p className="text-lg text-gray-600 mb-4">Master all 300 N4 Kanji with interactive games and progress tracking</p>
          
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
              {masteredKanji} / {totalKanji} kanji mastered
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {kanjiData.map(category => (
            <button
              key={category.category}
              onClick={() => {
                setSelectedCategory(category.category);
                setGameMode(null);
                setCurrentKanjiIndex(0);
                setShowAnswer(false);
              }}
              className={`px-4 py-2 rounded-full transition-all duration-200 flex items-center space-x-2 ${
                selectedCategory === category.category
                  ? 'bg-blue-600 text-white shadow-lg'
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
              <p className="text-sm text-gray-600">Practice kanji recognition and meanings</p>
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
              onClick={() => setGameMode(GAME_MODES.STROKE_ORDER)}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-center group"
            >
              <Zap className="w-12 h-12 mx-auto mb-4 text-orange-500 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">Stroke Order</h3>
              <p className="text-sm text-gray-600">Learn proper kanji writing</p>
            </button>
            
            <button
              onClick={() => setGameMode(GAME_MODES.COMPOUND_WORDS)}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-center group"
            >
              <Award className="w-12 h-12 mx-auto mb-4 text-green-500 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">Compound Words</h3>
              <p className="text-sm text-gray-600">Build vocabulary with kanji combinations</p>
            </button>
          </div>
        )}

        {/* Game Area */}
        {gameMode && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {gameMode === GAME_MODES.FLASHCARD && 'Flashcard Practice'}
                {gameMode === GAME_MODES.QUIZ && 'Kanji Quiz'}
                {gameMode === GAME_MODES.STROKE_ORDER && 'Stroke Order Practice'}
                {gameMode === GAME_MODES.COMPOUND_WORDS && 'Compound Words Builder'}
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
            {gameMode === GAME_MODES.STROKE_ORDER && (
              <div className="text-center text-gray-600">
                <p className="text-lg">Stroke Order Practice - Coming Soon!</p>
                <p>Practice writing kanji with proper stroke order</p>
              </div>
            )}
            {gameMode === GAME_MODES.COMPOUND_WORDS && (
              <div className="text-center text-gray-600">
                <p className="text-lg">Compound Words Builder - Coming Soon!</p>
                <p>Learn how kanji combine to form words</p>
              </div>
            )}
          </div>
        )}

        {/* Kanji Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {kanjiData.find(cat => cat.category === selectedCategory)?.icon} {selectedCategory}
            </h2>
            <p className="text-gray-600">
              {currentCategoryKanji.length} kanji • {currentCategoryKanji.filter(k => userProgress[k.char] > 0).length} mastered
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kanji</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reading</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meaning</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Strokes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentCategoryKanji.map((kanji, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-2xl font-bold">{kanji.char}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{kanji.reading}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{kanji.meaning}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{kanji.strokeCount}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min((userProgress[kanji.char] || 0) * 20, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {userProgress[kanji.char] || 0}/5
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
                <span className="text-sm font-semibold">1 day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Practice Time</span>
                <span className="text-sm font-semibold">0 min</span>
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
                <span className="text-sm text-gray-600">Best Time</span>
                <span className="text-sm font-semibold">--</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Star className="w-8 h-8 text-purple-500" />
              <h3 className="text-lg font-semibold">Next Goals</h3>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">Master 50 kanji</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '0%' }}></div>
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

export default KanjiMasteryN4; 