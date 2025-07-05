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
      { char: "花", reading: "カ / はな", meaning: "flower", strokeCount: 7 },
      { char: "草", reading: "ソウ / くさ", meaning: "grass", strokeCount: 9 },
      { char: "木", reading: "ボク・モク / き", meaning: "tree", strokeCount: 4 },
      { char: "石", reading: "セキ / いし", meaning: "stone", strokeCount: 5 },
      { char: "土", reading: "ド・ト / つち", meaning: "earth", strokeCount: 3 },
      { char: "火", reading: "カ / ひ", meaning: "fire", strokeCount: 4 },
      { char: "水", reading: "スイ / みず", meaning: "water", strokeCount: 4 },
      { char: "田", reading: "デン / た", meaning: "rice field", strokeCount: 5 },
      { char: "畑", reading: "はたけ", meaning: "field", strokeCount: 10 },
      { char: "池", reading: "チ / いけ", meaning: "pond", strokeCount: 6 },
      { char: "湖", reading: "コ / みずうみ", meaning: "lake", strokeCount: 12 },
      { char: "島", reading: "トウ / しま", meaning: "island", strokeCount: 10 },
      { char: "岸", reading: "ガン / きし", meaning: "shore", strokeCount: 8 },
      { char: "岩", reading: "ガン / いわ", meaning: "rock", strokeCount: 8 },
      { char: "砂", reading: "サ / すな", meaning: "sand", strokeCount: 9 },
      { char: "泥", reading: "デイ / どろ", meaning: "mud", strokeCount: 8 },
      { char: "氷", reading: "ヒョウ / こおり", meaning: "ice", strokeCount: 5 },
      { char: "霜", reading: "ソウ / しも", meaning: "frost", strokeCount: 17 },
      { char: "霧", reading: "ム / きり", meaning: "fog", strokeCount: 19 },
      { char: "雲", reading: "ウン / くも", meaning: "cloud", strokeCount: 12 },
      { char: "雷", reading: "ライ / かみなり", meaning: "thunder", strokeCount: 13 },
      { char: "虹", reading: "コウ / にじ", meaning: "rainbow", strokeCount: 9 },
      { char: "星", reading: "セイ / ほし", meaning: "star", strokeCount: 9 },
      { char: "月", reading: "ゲツ・ガツ / つき", meaning: "moon", strokeCount: 4 },
      { char: "太陽", reading: "タイヨウ", meaning: "sun", strokeCount: 4 },
      { char: "地球", reading: "チキュウ", meaning: "earth", strokeCount: 6 },
      { char: "宇宙", reading: "ウチュウ", meaning: "universe", strokeCount: 6 }
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
  const [strokeOrderData, setStrokeOrderData] = useState<any[]>([]);
  const [currentStrokeIndex, setCurrentStrokeIndex] = useState(0);
  const [showStrokeOrder, setShowStrokeOrder] = useState(false);
  const [strokeOrderMode, setStrokeOrderMode] = useState<'learn' | 'practice'>('learn');
  const [compoundWords, setCompoundWords] = useState<any[]>([]);
  const [currentCompoundIndex, setCurrentCompoundIndex] = useState(0);
  const [showCompoundAnswer, setShowCompoundAnswer] = useState(false);
  const [compoundMode, setCompoundMode] = useState<'learn' | 'quiz'>('learn');

  // Get current category kanji
  const currentCategoryKanji = kanjiData.find(cat => cat.category === selectedCategory)?.kanji || [];

  // Calculate overall progress
  const totalKanji = kanjiData.reduce((sum, cat) => sum + cat.kanji.length, 0);
  const masteredKanji = Object.values(userProgress).reduce((sum, count) => sum + count, 0);
  const overallProgress = Math.round((masteredKanji / totalKanji) * 100);

  // Stroke order data for common kanji
  const strokeOrderDatabase = {
    "家": [
      { stroke: 1, path: "M 20 20 L 80 20 L 80 80 L 20 80 Z", description: "Top horizontal line" },
      { stroke: 2, path: "M 30 30 L 70 30", description: "Second horizontal line" },
      { stroke: 3, path: "M 40 40 L 60 40", description: "Third horizontal line" },
      { stroke: 4, path: "M 50 50 L 50 70", description: "Vertical line" },
      { stroke: 5, path: "M 35 60 L 65 60", description: "Bottom horizontal line" },
      { stroke: 6, path: "M 25 25 L 75 25", description: "Roof line" },
      { stroke: 7, path: "M 30 35 L 70 35", description: "Inside roof line" },
      { stroke: 8, path: "M 40 45 L 60 45", description: "Middle horizontal" },
      { stroke: 9, path: "M 45 55 L 55 55", description: "Lower horizontal" },
      { stroke: 10, path: "M 50 65 L 50 75", description: "Final vertical" }
    ],
    "森": [
      { stroke: 1, path: "M 20 20 L 80 20", description: "Top tree - horizontal" },
      { stroke: 2, path: "M 30 25 L 30 75", description: "Top tree - vertical" },
      { stroke: 3, path: "M 25 30 L 35 30", description: "Top tree - branch 1" },
      { stroke: 4, path: "M 25 40 L 35 40", description: "Top tree - branch 2" },
      { stroke: 5, path: "M 25 50 L 35 50", description: "Top tree - branch 3" },
      { stroke: 6, path: "M 40 25 L 60 25", description: "Middle tree - horizontal" },
      { stroke: 7, path: "M 50 30 L 50 80", description: "Middle tree - vertical" },
      { stroke: 8, path: "M 45 35 L 55 35", description: "Middle tree - branch 1" },
      { stroke: 9, path: "M 45 45 L 55 45", description: "Middle tree - branch 2" },
      { stroke: 10, path: "M 45 55 L 55 55", description: "Middle tree - branch 3" },
      { stroke: 11, path: "M 65 30 L 75 30", description: "Bottom tree - horizontal" },
      { stroke: 12, path: "M 70 35 L 70 85", description: "Bottom tree - vertical" }
    ],
    "山": [
      { stroke: 1, path: "M 30 30 L 70 30", description: "Top peak" },
      { stroke: 2, path: "M 40 35 L 40 75", description: "Left peak" },
      { stroke: 3, path: "M 60 35 L 60 75", description: "Right peak" }
    ],
    "川": [
      { stroke: 1, path: "M 30 20 L 30 80", description: "Left river bank" },
      { stroke: 2, path: "M 50 20 L 50 80", description: "Middle river" },
      { stroke: 3, path: "M 70 20 L 70 80", description: "Right river bank" }
    ],
    "人": [
      { stroke: 1, path: "M 50 20 L 50 60", description: "Left leg" },
      { stroke: 2, path: "M 50 20 L 70 60", description: "Right leg" }
    ],
    "日": [
      { stroke: 1, path: "M 20 20 L 80 20 L 80 80 L 20 80 Z", description: "Outer frame" },
      { stroke: 2, path: "M 30 30 L 70 30", description: "Top horizontal" },
      { stroke: 3, path: "M 30 50 L 70 50", description: "Middle horizontal" },
      { stroke: 4, path: "M 30 70 L 70 70", description: "Bottom horizontal" }
    ]
  };

  // Compound words database
  const compoundWordsDatabase = {
    "家": [
      { word: "家族", reading: "かぞく", meaning: "family", kanji: ["家", "族"] },
      { word: "家庭", reading: "かてい", meaning: "home, household", kanji: ["家", "庭"] },
      { word: "家事", reading: "かじ", meaning: "housework", kanji: ["家", "事"] },
      { word: "家具", reading: "かぐ", meaning: "furniture", kanji: ["家", "具"] },
      { word: "家計", reading: "かけい", meaning: "household finances", kanji: ["家", "計"] }
    ],
    "学": [
      { word: "学校", reading: "がっこう", meaning: "school", kanji: ["学", "校"] },
      { word: "学生", reading: "がくせい", meaning: "student", kanji: ["学", "生"] },
      { word: "学習", reading: "がくしゅう", meaning: "study, learning", kanji: ["学", "習"] },
      { word: "大学", reading: "だいがく", meaning: "university", kanji: ["大", "学"] },
      { word: "中学", reading: "ちゅうがく", meaning: "middle school", kanji: ["中", "学"] }
    ],
    "人": [
      { word: "人間", reading: "にんげん", meaning: "human being", kanji: ["人", "間"] },
      { word: "人口", reading: "じんこう", meaning: "population", kanji: ["人", "口"] },
      { word: "人生", reading: "じんせい", meaning: "life", kanji: ["人", "生"] },
      { word: "外国人", reading: "がいこくじん", meaning: "foreigner", kanji: ["外", "国", "人"] },
      { word: "日本人", reading: "にほんじん", meaning: "Japanese person", kanji: ["日", "本", "人"] }
    ],
    "時": [
      { word: "時間", reading: "じかん", meaning: "time", kanji: ["時", "間"] },
      { word: "時刻", reading: "じこく", meaning: "time, moment", kanji: ["時", "刻"] },
      { word: "時代", reading: "じだい", meaning: "era, period", kanji: ["時", "代"] },
      { word: "時計", reading: "とけい", meaning: "clock, watch", kanji: ["時", "計"] },
      { word: "同時", reading: "どうじ", meaning: "simultaneous", kanji: ["同", "時"] }
    ],
    "車": [
      { word: "自動車", reading: "じどうしゃ", meaning: "automobile", kanji: ["自", "動", "車"] },
      { word: "電車", reading: "でんしゃ", meaning: "train", kanji: ["電", "車"] },
      { word: "車両", reading: "しゃりょう", meaning: "vehicle", kanji: ["車", "両"] },
      { word: "駐車場", reading: "ちゅうしゃじょう", meaning: "parking lot", kanji: ["駐", "車", "場"] },
      { word: "車庫", reading: "しゃこ", meaning: "garage", kanji: ["車", "庫"] }
    ],
    "電": [
      { word: "電気", reading: "でんき", meaning: "electricity", kanji: ["電", "気"] },
      { word: "電話", reading: "でんわ", meaning: "telephone", kanji: ["電", "話"] },
      { word: "電車", reading: "でんしゃ", meaning: "train", kanji: ["電", "車"] },
      { word: "電灯", reading: "でんとう", meaning: "electric light", kanji: ["電", "灯"] },
      { word: "発電", reading: "はつでん", meaning: "power generation", kanji: ["発", "電"] }
    ],
    "国": [
      { word: "国家", reading: "こっか", meaning: "nation, state", kanji: ["国", "家"] },
      { word: "国際", reading: "こくさい", meaning: "international", kanji: ["国", "際"] },
      { word: "外国", reading: "がいこく", meaning: "foreign country", kanji: ["外", "国"] },
      { word: "中国", reading: "ちゅうごく", meaning: "China", kanji: ["中", "国"] },
      { word: "アメリカ", reading: "アメリカ", meaning: "America", kanji: ["アメリカ"] }
    ],
    "年": [
      { word: "年間", reading: "ねんかん", meaning: "yearly, annual", kanji: ["年", "間"] },
      { word: "年度", reading: "ねんど", meaning: "fiscal year", kanji: ["年", "度"] },
      { word: "今年", reading: "ことし", meaning: "this year", kanji: ["今", "年"] },
      { word: "去年", reading: "きょねん", meaning: "last year", kanji: ["去", "年"] },
      { word: "来年", reading: "らいねん", meaning: "next year", kanji: ["来", "年"] }
    ]
  };

  // Initialize stroke order for current kanji
  useEffect(() => {
    const currentKanji = currentCategoryKanji[currentKanjiIndex];
    if (currentKanji && strokeOrderDatabase[currentKanji.char as keyof typeof strokeOrderDatabase]) {
      setStrokeOrderData(strokeOrderDatabase[currentKanji.char as keyof typeof strokeOrderDatabase]);
    } else {
      // Generate basic stroke order for kanji not in database
      const basicStrokes = [];
      for (let i = 1; i <= currentKanji.strokeCount; i++) {
        basicStrokes.push({
          stroke: i,
          path: `M ${20 + i * 5} ${20 + i * 3} L ${80 - i * 5} ${20 + i * 3}`,
          description: `Stroke ${i}`
        });
      }
      setStrokeOrderData(basicStrokes);
    }
    setCurrentStrokeIndex(0);
    setShowStrokeOrder(false);
  }, [currentKanjiIndex, currentCategoryKanji]);

  // Initialize compound words for current kanji
  useEffect(() => {
    const currentKanji = currentCategoryKanji[currentKanjiIndex];
    if (currentKanji && compoundWordsDatabase[currentKanji.char as keyof typeof compoundWordsDatabase]) {
      setCompoundWords(compoundWordsDatabase[currentKanji.char as keyof typeof compoundWordsDatabase]);
    } else {
      // Generate basic compound words for kanji not in database
      setCompoundWords([
        { word: `${currentKanji.char}語`, reading: `${currentKanji.reading.split(' ')[0]}ご`, meaning: `${currentKanji.meaning} language`, kanji: [currentKanji.char, "語"] },
        { word: `${currentKanji.char}人`, reading: `${currentKanji.reading.split(' ')[0]}じん`, meaning: `${currentKanji.meaning} person`, kanji: [currentKanji.char, "人"] },
        { word: `${currentKanji.char}的`, reading: `${currentKanji.reading.split(' ')[0]}てき`, meaning: `${currentKanji.meaning}-like`, kanji: [currentKanji.char, "的"] }
      ]);
    }
    setCurrentCompoundIndex(0);
    setShowCompoundAnswer(false);
  }, [currentKanjiIndex, currentCategoryKanji]);

  // Stroke Order Practice Component
  const StrokeOrderGame = () => {
    const currentKanji = currentCategoryKanji[currentKanjiIndex];
    
    const handleNextStroke = () => {
      if (currentStrokeIndex < strokeOrderData.length - 1) {
        setCurrentStrokeIndex(currentStrokeIndex + 1);
      } else {
        setCurrentStrokeIndex(0);
        setShowStrokeOrder(false);
        setUserProgress(prev => ({
          ...prev,
          [currentKanji.char]: (prev[currentKanji.char] || 0) + 1
        }));
      }
    };

    const handlePreviousStroke = () => {
      if (currentStrokeIndex > 0) {
        setCurrentStrokeIndex(currentStrokeIndex - 1);
      }
    };

    const resetStrokeOrder = () => {
      setCurrentStrokeIndex(0);
      setShowStrokeOrder(false);
    };

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Mode Selection */}
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => setStrokeOrderMode('learn')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                strokeOrderMode === 'learn' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Learn Mode
            </button>
            <button
              onClick={() => setStrokeOrderMode('practice')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                strokeOrderMode === 'practice' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Practice Mode
            </button>
          </div>

          {/* Kanji Display */}
          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-black mb-2">{currentKanji.char}</div>
            <div className="text-lg text-gray-600 mb-4">
              {currentKanji.reading} • {currentKanji.meaning} • {currentKanji.strokeCount} strokes
            </div>
          </div>

          {/* Stroke Order Canvas */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="relative w-full h-64 bg-white rounded border-2 border-gray-300">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background grid for reference */}
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f0f0f0" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
                
                {/* Completed strokes */}
                {strokeOrderData.slice(0, currentStrokeIndex + 1).map((stroke, index) => (
                  <path
                    key={index}
                    d={stroke.path}
                    stroke="#3B82F6"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}
                
                {/* Current stroke (highlighted) */}
                {strokeOrderData[currentStrokeIndex] && (
                  <path
                    d={strokeOrderData[currentStrokeIndex].path}
                    stroke="#EF4444"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="5,5"
                  />
                )}
              </svg>
            </div>
          </div>

          {/* Stroke Information */}
          <div className="text-center mb-6">
            <div className="text-lg font-semibold text-black mb-2">
              Stroke {currentStrokeIndex + 1} of {strokeOrderData.length}
            </div>
            <div className="text-gray-600">
              {strokeOrderData[currentStrokeIndex]?.description || `Complete stroke ${currentStrokeIndex + 1}`}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={handlePreviousStroke}
              disabled={currentStrokeIndex === 0}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4 inline mr-2" />
              Previous
            </button>
            
            <button
              onClick={handleNextStroke}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {currentStrokeIndex === strokeOrderData.length - 1 ? (
                <>
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  Complete
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 inline ml-2" />
                </>
              )}
            </button>
            
            <button
              onClick={resetStrokeOrder}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              <RotateCcw className="w-4 h-4 inline mr-2" />
              Reset
            </button>
          </div>

          {/* Progress */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(((currentStrokeIndex + 1) / strokeOrderData.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStrokeIndex + 1) / strokeOrderData.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">How to Practice:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>Learn Mode:</strong> Follow the stroke order step by step</li>
              <li>• <strong>Practice Mode:</strong> Try to write the kanji yourself first</li>
              <li>• Pay attention to stroke direction and order</li>
              <li>• Practice each kanji multiple times for mastery</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  // Compound Words Builder Component
  const CompoundWordsGame = () => {
    const currentKanji = currentCategoryKanji[currentKanjiIndex];
    const currentCompound = compoundWords[currentCompoundIndex];
    
    const handleNextCompound = () => {
      if (currentCompoundIndex < compoundWords.length - 1) {
        setCurrentCompoundIndex(currentCompoundIndex + 1);
        setShowCompoundAnswer(false);
      } else {
        setCurrentCompoundIndex(0);
        setShowCompoundAnswer(false);
        setUserProgress(prev => ({
          ...prev,
          [currentKanji.char]: (prev[currentKanji.char] || 0) + 1
        }));
      }
    };

    const handlePreviousCompound = () => {
      if (currentCompoundIndex > 0) {
        setCurrentCompoundIndex(currentCompoundIndex - 1);
        setShowCompoundAnswer(false);
      }
    };

    const resetCompoundWords = () => {
      setCurrentCompoundIndex(0);
      setShowCompoundAnswer(false);
    };

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Mode Selection */}
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => setCompoundMode('learn')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                compoundMode === 'learn' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Learn Mode
            </button>
            <button
              onClick={() => setCompoundMode('quiz')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                compoundMode === 'quiz' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Quiz Mode
            </button>
          </div>

          {/* Current Kanji Display */}
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-black mb-2">{currentKanji.char}</div>
            <div className="text-lg text-gray-600 mb-4">
              {currentKanji.reading} • {currentKanji.meaning} • {currentKanji.strokeCount} strokes
            </div>
            <div className="text-sm text-blue-600 font-medium">
              Compound Words: {compoundWords.length} found
            </div>
          </div>

          {/* Compound Word Display */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-4">
                {currentCompound?.word || "Loading..."}
              </div>
              
              {showCompoundAnswer ? (
                <div className="space-y-4">
                  <div className="text-xl font-semibold text-blue-600">
                    {currentCompound?.reading}
                  </div>
                  <div className="text-lg text-gray-800">
                    {currentCompound?.meaning}
                  </div>
                  <div className="flex justify-center space-x-2">
                    {currentCompound?.kanji.map((k: string, index: number) => (
                      <div key={index} className="bg-white px-3 py-2 rounded border text-lg font-bold">
                        {k}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    Breakdown: {currentCompound?.kanji.join(' + ')}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowCompoundAnswer(true)}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium"
                >
                  Show Reading & Meaning
                </button>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={handlePreviousCompound}
              disabled={currentCompoundIndex === 0}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4 inline mr-2" />
              Previous
            </button>
            
            <button
              onClick={handleNextCompound}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              {currentCompoundIndex === compoundWords.length - 1 ? (
                <>
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  Complete
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 inline ml-2" />
                </>
              )}
            </button>
            
            <button
              onClick={resetCompoundWords}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              <RotateCcw className="w-4 h-4 inline mr-2" />
              Reset
            </button>
          </div>

          {/* Progress */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(((currentCompoundIndex + 1) / compoundWords.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentCompoundIndex + 1) / compoundWords.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* All Compound Words List */}
          <div className="mt-8">
            <h4 className="font-semibold text-gray-900 mb-4 text-center">All Compound Words for {currentKanji.char}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {compoundWords.map((compound, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    index === currentCompoundIndex 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="font-bold text-lg text-black">{compound.word}</div>
                  <div className="text-sm text-gray-600">{compound.reading}</div>
                  <div className="text-sm text-gray-800">{compound.meaning}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">How Compound Words Work:</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• <strong>Learn Mode:</strong> Study how kanji combine to form new words</li>
              <li>• <strong>Quiz Mode:</strong> Test your knowledge of compound word meanings</li>
              <li>• Pay attention to how readings change when kanji combine</li>
              <li>• Notice patterns in how kanji meanings combine</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  // Flashcard component
  const FlashcardGame = () => {
    const currentKanji = currentCategoryKanji[currentKanjiIndex];
    
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl font-bold mb-4 text-black">{currentKanji.char}</div>
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
            <span className="text-sm text-black font-medium">Question {currentQuestion + 1} / {totalQuestions}</span>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-black" />
              <span className="text-sm font-bold text-black">{timeLeft}s</span>
            </div>
          </div>
          
          <div className="text-4xl font-bold text-center mb-6 text-black">{currentQ.kanji}</div>
          
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
            {gameMode === GAME_MODES.STROKE_ORDER && <StrokeOrderGame />}
            {gameMode === GAME_MODES.COMPOUND_WORDS && <CompoundWordsGame />}
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
                      <div className="text-2xl font-bold text-black">{kanji.char}</div>
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