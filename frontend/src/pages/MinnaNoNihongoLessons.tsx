import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Brain, Target, Trophy, Volume2, RotateCcw, CheckCircle, XCircle, Star, Clock, Award, TrendingUp, Zap, ArrowRight, ArrowLeft, Home, Lightbulb, BarChart3, Headphones, RefreshCw, Timer, Eye, Flame, Crown, Users, Calendar, Mic, Camera, Gamepad2, Gift, Sparkles, Play, Pause, SkipForward, FileText, PenTool } from 'lucide-react';

// Type definitions
interface VocabularyItem {
  japanese: string;
  hiragana: string;
  english: string;
}

interface GrammarRule {
  pattern: string;
  meaning: string;
  example: string;
  translation: string;
}

interface Lesson {
  lesson: number;
  title: string;
  vocabulary: VocabularyItem[];
  grammar: GrammarRule[];
  reading: string;
  readingTranslation: string;
  listening: string[];
}

interface Game {
  id: string;
  title: string;
  description: string;
  type: string;
}

interface ExamQuestion {
  type: string;
  question: string;
  options: string[];
  correct: string;
}

const MinnaNoNihongoLessons: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState(1);
  const [activeSection, setActiveSection] = useState('vocabulary');
  const [gameMode, setGameMode] = useState('');
  const [examMode, setExamMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [gameScore, setGameScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  // Counters table modal state
  const [showCountersModal, setShowCountersModal] = useState(false);

  // Lesson Data - Complete 25 lessons following Minna no Nihongo structure
  const lessons: Lesson[] = [
    {
      lesson: 1,
      title: "Self-introduction & Basic Greetings",
      vocabulary: [
        { japanese: "わたし", hiragana: "わたし", english: "I, me" },
        { japanese: "あなた", hiragana: "あなた", english: "you" },
        { japanese: "あのひと / あのかた", hiragana: "あのひと / あのかた", english: "that person / that person (polite)" },
        { japanese: "～さん", hiragana: "～さん", english: "Mr./Ms. (polite suffix)" },
        { japanese: "～ちゃん", hiragana: "～ちゃん", english: "suffix for children" },
        { japanese: "～じん", hiragana: "～じん", english: "nationality suffix" },
        { japanese: "せんせい", hiragana: "せんせい", english: "teacher" },
        { japanese: "きょうし", hiragana: "きょうし", english: "teacher (job description)" },
        { japanese: "がくせい", hiragana: "がくせい", english: "student" },
        { japanese: "かいしゃいん", hiragana: "かいしゃいん", english: "company employee" },
        { japanese: "いしゃ", hiragana: "いしゃ", english: "doctor" },
        { japanese: "だいがく", hiragana: "だいがく", english: "university" },
        { japanese: "はじめまして", hiragana: "はじめまして", english: "Nice to meet you" },
        { japanese: "どうぞよろしく", hiragana: "どうぞよろしく", english: "Pleased to meet you" }
      ],
      grammar: [
        { pattern: "AはBです。", meaning: "A is B", example: "わたしは がくせいです。", translation: "I am a student." },
        { pattern: "AはBじゃありません。", meaning: "A is not B", example: "わたしは せんせいじゃありません。", translation: "I am not a teacher." },
        { pattern: "AはBですか？", meaning: "Is A B?", example: "あなたは いしゃですか？", translation: "Are you a doctor?" },
        { pattern: "～も", meaning: "also, too", example: "わたしも がくせいです。", translation: "I am also a student." },
        { pattern: "～の～", meaning: "Possessive/Descriptive particle", example: "にほんごのせんせい / ABCのしゃいん", translation: "Japanese language teacher / Employee of ABC" },
        { pattern: "～さん", meaning: "Polite name suffix", example: "さとうさん", translation: "Mr./Ms. Satou" }
      ],
      reading: "はじめまして。わたしは サンジュラ です。にいがたから きました。ABCの しゃいんです。どうぞ よろしく おねがいします。",
      readingTranslation: "Nice to meet you. I am Sanjula. I came from Niigata. I work for ABC company. Pleased to meet you.",
      listening: [
        "このひとは だれですか？ (Who is this person?)",
        "このひとは アメリカじんですか？ (Is this person American?)"
      ]
    },
    {
      lesson: 2,
      title: "これ / それ / あの (Demonstratives)",
      vocabulary: [
        { japanese: "これ", hiragana: "これ", english: "this (thing near the speaker)" },
        { japanese: "それ", hiragana: "それ", english: "that (thing near the listener)" },
        { japanese: "あれ", hiragana: "あれ", english: "that (thing over there)" },
        { japanese: "この～", hiragana: "この～", english: "this ～ (with a noun)" },
        { japanese: "その～", hiragana: "その～", english: "that ～ (with a noun)" },
        { japanese: "あの～", hiragana: "あの～", english: "that ～ over there (with a noun)" },
        { japanese: "ほん", hiragana: "ほん", english: "book" },
        { japanese: "じしょ", hiragana: "じしょ", english: "dictionary" },
        { japanese: "ざっし", hiragana: "ざっし", english: "magazine" },
        { japanese: "しんぶん", hiragana: "しんぶん", english: "newspaper" },
        { japanese: "ノート", hiragana: "ノート", english: "notebook" },
        { japanese: "てちょう", hiragana: "てちょう", english: "pocket notebook" },
        { japanese: "めいし", hiragana: "めいし", english: "business card" },
        { japanese: "カード", hiragana: "カード", english: "card" },
        { japanese: "ボールペン", hiragana: "ボールペン", english: "ballpoint pen" },
        { japanese: "シャープペンシル", hiragana: "シャープペンシル", english: "mechanical pencil" },
        { japanese: "かぎ", hiragana: "かぎ", english: "key" },
        { japanese: "とけい", hiragana: "とけい", english: "watch, clock" },
        { japanese: "かさ", hiragana: "かさ", english: "umbrella" },
        { japanese: "かばん", hiragana: "かばん", english: "bag" },
        { japanese: "[カセット]テープ", hiragana: "[カセット]テープ", english: "cassette tape" },
        { japanese: "テレビ", hiragana: "テレビ", english: "television" },
        { japanese: "ラジオ", hiragana: "ラジオ", english: "radio" },
        { japanese: "カメラ", hiragana: "カメラ", english: "camera" },
        { japanese: "コンピューター", hiragana: "コンピューター", english: "computer" },
        { japanese: "くるま", hiragana: "くるま", english: "car" },
        { japanese: "つくえ", hiragana: "つくえ", english: "desk" },
        { japanese: "いす", hiragana: "いす", english: "chair" },
        { japanese: "チョコレート", hiragana: "チョコレート", english: "chocolate" },
        { japanese: "コーヒー", hiragana: "コーヒー", english: "coffee" },
        { japanese: "えいご", hiragana: "えいご", english: "English (language)" },
        { japanese: "にほんご", hiragana: "にほんご", english: "Japanese (language)" },
        { japanese: "～ご", hiragana: "～ご", english: "～ language" },
        { japanese: "なん / なに", hiragana: "なん / なに", english: "what" },
        { japanese: "そう", hiragana: "そう", english: "so, that way" },
        { japanese: "ちがいます", hiragana: "ちがいます", english: "No, it isn't / You are wrong" },
        { japanese: "そうですか", hiragana: "そうですか", english: "I see. / Is that so?" },
        { japanese: "あのう", hiragana: "あのう", english: "um... (hesitation)" },
        { japanese: "ほんのきもちです", hiragana: "ほんのきもちです", english: "It's nothing / Just a small gift" },
        { japanese: "どうぞ", hiragana: "どうぞ", english: "here you are (when offering)" },
        { japanese: "どうも", hiragana: "どうも", english: "thanks" },
        { japanese: "[どうも]ありがとうございます", hiragana: "[どうも]ありがとうございます", english: "thank you [very much]" },
        { japanese: "これからおせわになります", hiragana: "これからおせわになります", english: "I'm in your care (used when joining a new group)" },
        { japanese: "こちらこそ[よろしく]", hiragana: "こちらこそ[よろしく]", english: "Likewise / I'm the one who should say so" }
      ],
      grammar: [
        { pattern: "これ / それ / あれ", meaning: "Demonstratives: これ = this (near speaker), それ = that (near listener), あれ = that (over there)", example: "これはほんです。それはじしょですか。あれはなんですか。", translation: "This is a book. Is that a dictionary? What is that?" },
        { pattern: "この / その / あの + noun", meaning: "Used when directly modifying a noun", example: "このほんはわたしのです。そのとけいはいくらですか。", translation: "This book is mine. How much is that watch?" },
        { pattern: "～は～ですか。/ ～はなんですか。", meaning: "Used for asking questions", example: "これはなんですか。それはコンピューターですか。", translation: "What is this? Is that a computer?" },
        { pattern: "～の～", meaning: "Possessive/attribution particle", example: "わたしのかさ。これはたなかさんのノートです。", translation: "my umbrella. This is Mr. Tanaka's notebook." },
        { pattern: "そうです / ちがいます", meaning: "そうです = That's right. ちがいます = That's wrong.", example: "それはあなたのですか？はい、そうです。/ いいえ、ちがいます。", translation: "Is that yours? Yes, it is. / No, it isn't." },
        { pattern: "どうぞ / どうも / ありがとうございます", meaning: "Used when giving, receiving, and thanking", example: "どうぞ。どうも / ありがとうございます。", translation: "Here you go. Thank you." },
        { pattern: "ほんのきもちです。", meaning: "A humble expression when giving a gift", example: "これ、どうぞ。ほんのきもちです。", translation: "Here, a small token of my appreciation." }
      ],
      reading: "これはほんです。それはチョコレートですか。はい、そうです。どうぞ。ありがとうございます。",
      readingTranslation: "This is a book. Is that chocolate? Yes, it is. Here you are. Thank you very much.",
      listening: [
        "これはなんですか？ (What is this?)",
        "それはてちょうです。 (That is a pocket notebook.)",
        "Identifying items by name",
        "Listening to conversations with これ/それ/あれ",
        "Listening to situations where someone gives a gift or receives something"
      ]
    },
    {
      lesson: 3,
      title: "ここ / そこ / あそこ (Locations & Directions)",
      vocabulary: [
        { japanese: "ここ", hiragana: "ここ", english: "here (near speaker)" },
        { japanese: "そこ", hiragana: "そこ", english: "there (near listener)" },
        { japanese: "あそこ", hiragana: "あそこ", english: "over there" },
        { japanese: "どこ", hiragana: "どこ", english: "where" },
        { japanese: "こちら", hiragana: "こちら", english: "this way (polite of ここ)" },
        { japanese: "そちら", hiragana: "そちら", english: "that way (polite of そこ)" },
        { japanese: "あちら", hiragana: "あちら", english: "that way over there (polite of あそこ)" },
        { japanese: "どちら", hiragana: "どちら", english: "which way (polite of どこ)" },
        { japanese: "きょうしつ", hiragana: "きょうしつ", english: "classroom" },
        { japanese: "しょくどう", hiragana: "しょくどう", english: "cafeteria, dining hall" },
        { japanese: "じむしょ", hiragana: "じむしょ", english: "office" },
        { japanese: "かいぎしつ", hiragana: "かいぎしつ", english: "meeting room" },
        { japanese: "うけつけ", hiragana: "うけつけ", english: "reception desk" },
        { japanese: "ロビー", hiragana: "ロビー", english: "lobby" },
        { japanese: "へや", hiragana: "へや", english: "room" },
        { japanese: "トイレ（おてあらい）", hiragana: "トイレ（おてあらい）", english: "toilet, restroom" },
        { japanese: "かいだん", hiragana: "かいだん", english: "stairs" },
        { japanese: "エレベーター", hiragana: "エレベーター", english: "elevator" },
        { japanese: "エスカレーター", hiragana: "エスカレーター", english: "escalator" },
        { japanese: "[お]くに", hiragana: "[お]くに", english: "country" },
        { japanese: "かいしゃ", hiragana: "かいしゃ", english: "company" },
        { japanese: "うち", hiragana: "うち", english: "home, house" },
        { japanese: "でんわ", hiragana: "でんわ", english: "telephone" },
        { japanese: "くつ", hiragana: "くつ", english: "shoes" },
        { japanese: "ネクタイ", hiragana: "ネクタイ", english: "necktie" },
        { japanese: "ワイン", hiragana: "ワイン", english: "wine" },
        { japanese: "たばこ", hiragana: "たばこ", english: "tobacco, cigarette" },
        { japanese: "うりば", hiragana: "うりば", english: "counter (in a department store)" },
        { japanese: "ちか", hiragana: "ちか", english: "basement" },
        { japanese: "いっかい", hiragana: "いっかい", english: "1st floor" },
        { japanese: "にかい", hiragana: "にかい", english: "2nd floor" },
        { japanese: "～かい（がい）", hiragana: "～かい", english: "～ floor" },
        { japanese: "なんがい", hiragana: "なんがい", english: "what floor" },
        { japanese: "～えん", hiragana: "～えん", english: "～ yen" },
        { japanese: "いくら", hiragana: "いくら", english: "how much" },
        { japanese: "ひゃく", hiragana: "ひゃく", english: "100" },
        { japanese: "せん", hiragana: "せん", english: "1,000" },
        { japanese: "まん", hiragana: "まん", english: "10,000" },
        { japanese: "すみません", hiragana: "すみません", english: "excuse me / I'm sorry" },
        { japanese: "～でございます", hiragana: "～でございます", english: "polite form of ～です" },
        { japanese: "[～を] みせてください", hiragana: "～をみせてください", english: "Please show me ～" },
        { japanese: "[～を]ください", hiragana: "～をください", english: "Please give me ～" },
        { japanese: "じゃ", hiragana: "じゃ", english: "well then..." },
        { japanese: "[～を]どうぞ", hiragana: "[～を]どうぞ", english: "Here it is. / Please have ～" }
      ],
      grammar: [
        { pattern: "ここ / そこ / あそこ / どこ", meaning: "Location words: ここ = here (near speaker), そこ = there (near listener), あそこ = over there, どこ = where", example: "ここは きょうしつです。トイレは どこですか。", translation: "This is a classroom. Where is the toilet?" },
        { pattern: "こちら / そちら / あちら / どちら", meaning: "Polite location words: more formal/polite versions", example: "じむしょは こちらです。", translation: "The office is this way." },
        { pattern: "Noun + は + どこ / どちら ですか。", meaning: "Asking where something is located", example: "トイレは どこですか。ABCのうりばは どちらですか。", translation: "Where is the toilet? Where is the ABC counter?" },
        { pattern: "～でございます", meaning: "Polite version of です (used in service situations)", example: "これは いっかいでございます。", translation: "This is on the first floor." },
        { pattern: "～をください / ～をみせてください", meaning: "～をください = Please give me ～, ～をみせてください = Please show me ～", example: "ワインをください。このネクタイをみせてください。", translation: "Please give me wine. Please show me this necktie." },
        { pattern: "Floor Numbers（～かい / ～がい）", meaning: "いっかい = 1st floor, にかい = 2nd floor, さんがい = 3rd floor, なんがい = What floor?", example: "じむしょは 3がいです。", translation: "The office is on the 3rd floor." }
      ],
      reading: "ここは しょくどうです。あそこは かいぎしつです。トイレは どこですか。じむしょは 3がいです。",
      readingTranslation: "This is the cafeteria. That is the meeting room. Where is the toilet? The office is on the 3rd floor.",
      listening: [
        "すみません。くつうりばは どこですか？ (Excuse me, where is the shoe section?)",
        "ちかいっかいでございます。 (It is on the first basement floor.)",
        "Questions about locations of places in a building",
        "Conversations in a department store asking for items",
        "Identifying items and their floor numbers or prices"
             ]
     },
     {
       lesson: 4,
       title: "Time & Daily Routines (時間・じかん)",
       vocabulary: [
         { japanese: "いま", hiragana: "今", english: "now" },
         { japanese: "～じ", hiragana: "～時", english: "～ o'clock" },
         { japanese: "～ふん／ぷん", hiragana: "～分", english: "～ minutes" },
         { japanese: "はん", hiragana: "半", english: "half" },
         { japanese: "なんじ", hiragana: "何時", english: "what time" },
         { japanese: "なんぷん", hiragana: "何分", english: "how many minutes" },
         { japanese: "ごぜん", hiragana: "午前", english: "a.m." },
         { japanese: "ごご", hiragana: "午後", english: "p.m." },
         { japanese: "あさ", hiragana: "朝", english: "morning" },
         { japanese: "ひる", hiragana: "昼", english: "noon / daytime" },
         { japanese: "よる", hiragana: "夜", english: "night" },
         { japanese: "おととい", hiragana: "おととい", english: "the day before yesterday" },
         { japanese: "きのう", hiragana: "きのう", english: "yesterday" },
         { japanese: "きょう", hiragana: "きょう", english: "today" },
         { japanese: "あした", hiragana: "あした", english: "tomorrow" },
         { japanese: "あさって", hiragana: "あさって", english: "the day after tomorrow" },
         { japanese: "けさ", hiragana: "今朝", english: "this morning" },
         { japanese: "こんばん", hiragana: "今晩", english: "this evening" },
         { japanese: "やすみ", hiragana: "休み", english: "break, holiday" },
         { japanese: "ひるやすみ", hiragana: "昼休み", english: "lunch break" },
         { japanese: "おきます", hiragana: "起きます", english: "get up" },
         { japanese: "ねます", hiragana: "寝ます", english: "sleep" },
         { japanese: "はたらきます", hiragana: "働きます", english: "work" },
         { japanese: "やすみます", hiragana: "休みます", english: "rest" },
         { japanese: "べんきょうします", hiragana: "勉強します", english: "study" },
         { japanese: "おわります", hiragana: "終わります", english: "finish" },
         { japanese: "デパート", hiragana: "デパート", english: "department store" },
         { japanese: "ぎんこう", hiragana: "銀行", english: "bank" },
         { japanese: "ゆうびんきょく", hiragana: "郵便局", english: "post office" },
         { japanese: "としょかん", hiragana: "図書館", english: "library" },
         { japanese: "びじゅつかん", hiragana: "美術館", english: "art museum" },
         { japanese: "まいにち", hiragana: "毎日", english: "every day" },
         { japanese: "まいあさ", hiragana: "毎朝", english: "every morning" },
         { japanese: "まいばん", hiragana: "毎晩", english: "every night" }
       ],
       grammar: [
         { pattern: "わたしは [time] に [verb]。", meaning: "I do [verb] at [time]", example: "わたしは 6じに おきます。", translation: "I get up at 6." },
         { pattern: "[time] から [time] まで です。", meaning: "It's from [time] to [time]", example: "9じから 5じまでです。", translation: "It's from 9 to 5." },
         { pattern: "[noun] は [time] から [time] まで です。", meaning: "[Noun] is open from ～ to ～", example: "ぎんこうは 9じから 3じまで です。", translation: "The bank is open from 9 to 3." },
         { pattern: "[time] に [event] があります。", meaning: "There is [event] at [time]", example: "10じに かいぎが あります。", translation: "There is a meeting at 10." },
         { pattern: "[noun] は [time] から です。", meaning: "～ starts from [time]", example: "じゅぎょうは 1じからです。", translation: "Class starts at 1." },
         { pattern: "Time Expressions & Questions", meaning: "なんじに = what time, いつ = when, に particle for time, から/まで for duration", example: "なんじに おきますか？いつ ねますか？", translation: "What time do you get up? When do you sleep?" }
       ],
       reading: "わたしは まいにち 6じに おきます。7じに あさごはんを たべて、8じに しごとを はじめます。5じに おわります。",
       readingTranslation: "I wake up every day at 6. I eat breakfast at 7 and start work at 8. I finish at 5.",
       listening: [
         "なんじに しごとが はじまりますか？ (What time does work start?)",
         "9じからです。 (It starts at 9.)",
         "Asking and answering about time schedules",
         "Listening for daily routines and opening hours",
         "Clock reading practice"
              ]
      },
      {
        lesson: 5,
        title: "Movement & Transportation (行きます・来ます)",
        vocabulary: [
          { japanese: "いきます", hiragana: "行きます", english: "go" },
          { japanese: "きます", hiragana: "来ます", english: "come" },
          { japanese: "かえります", hiragana: "帰ります", english: "return, go home" },
          { japanese: "でんしゃ", hiragana: "電車", english: "train" },
          { japanese: "しんかんせん", hiragana: "新幹線", english: "bullet train" },
          { japanese: "バス", hiragana: "バス", english: "bus" },
          { japanese: "タクシー", hiragana: "タクシー", english: "taxi" },
          { japanese: "くるま / じどうしゃ", hiragana: "車 / 自動車", english: "car" },
          { japanese: "ひこうき", hiragana: "飛行機", english: "airplane" },
          { japanese: "ふね", hiragana: "船", english: "boat" },
          { japanese: "あるいて", hiragana: "歩いて", english: "on foot (note: no で needed)" },
          { japanese: "ひとりで", hiragana: "一人で", english: "alone, by oneself" },
          { japanese: "ともだち", hiragana: "友達", english: "friend" },
          { japanese: "かぞく", hiragana: "家族", english: "family" },
          { japanese: "がっこう", hiragana: "学校", english: "school" },
          { japanese: "スーパー", hiragana: "スーパー", english: "supermarket" },
          { japanese: "えき", hiragana: "駅", english: "station" },
          { japanese: "ひこうじょう", hiragana: "飛行場", english: "airport" },
          { japanese: "こうえん", hiragana: "公園", english: "park" },
          { japanese: "きのう", hiragana: "昨日", english: "yesterday" },
          { japanese: "きょう", hiragana: "今日", english: "today" },
          { japanese: "あした", hiragana: "明日", english: "tomorrow" },
          { japanese: "なんにち", hiragana: "何日", english: "what day (of the month)" },
          { japanese: "ついたち", hiragana: "一日", english: "1st (of the month)" },
          { japanese: "ふつか", hiragana: "二日", english: "2nd" },
          { japanese: "～にち", hiragana: "～日", english: "～ day of the month" },
          { japanese: "なんようび", hiragana: "何曜日", english: "what day of the week" },
          { japanese: "げつようび", hiragana: "月曜日", english: "Monday" },
          { japanese: "かようび", hiragana: "火曜日", english: "Tuesday" },
          { japanese: "すいようび", hiragana: "水曜日", english: "Wednesday" },
          { japanese: "もくようび", hiragana: "木曜日", english: "Thursday" },
          { japanese: "きんようび", hiragana: "金曜日", english: "Friday" },
          { japanese: "どようび", hiragana: "土曜日", english: "Saturday" },
          { japanese: "にちようび", hiragana: "日曜日", english: "Sunday" },
          { japanese: "いつ", hiragana: "いつ", english: "when" }
        ],
        grammar: [
          { pattern: "[Subject] は [Place] へ いきます／きます／かえります。", meaning: "Go/Come/Return to a place", example: "わたしは がっこうへ いきます。", translation: "I go to school." },
          { pattern: "[Transport] で [Place] へ いきます。", meaning: "Go to a place by (transport)", example: "でんしゃで とうきょうへ いきます。", translation: "I go to Tokyo by train." },
          { pattern: "[Person] と いきます。", meaning: "Go with (person)", example: "ともだちと きょうとへ いきます。", translation: "I go to Kyoto with a friend." },
          { pattern: "いつ [action] か？", meaning: "When (do you do something)?", example: "いつ にほんへ きましたか。", translation: "When did you come to Japan?" },
          { pattern: "いきます・きます・かえります", meaning: "いきます (go away), きます (come toward), かえります (return home)", example: "にほんへ いきます。うちへ かえります。", translation: "Go to Japan. Return home." },
          { pattern: "Particles: へ (direction), で (transport), と (companion)", meaning: "へ = to (direction), で = by (means), と = with (person)", example: "くるまで がっこうへ いきます。かぞくと きました。", translation: "Go to school by car. Came with family." }
        ],
        reading: "わたしは あした ともだちと きょうとへ いきます。しんかんせんで いきます。",
        readingTranslation: "I will go to Kyoto tomorrow with a friend. I'll go by bullet train.",
        listening: [
          "どこへ いきますか。 (Where are you going?)",
          "えきへ いきます。でんしゃで いきます。 (I'm going to the station. I'll go by train.)",
          "Listening to where people are going and how",
          "Listening to who they are going with",
          "Understanding the transport method and time"
                 ]
       },
       {
         lesson: 6,
         title: "Object Particle & Invitations (を・いっしょに)",
         vocabulary: [
           { japanese: "パン", hiragana: "パン", english: "bread" },
           { japanese: "ごはん", hiragana: "ごはん", english: "rice, meal" },
           { japanese: "みず", hiragana: "水", english: "water" },
           { japanese: "おちゃ", hiragana: "お茶", english: "green tea" },
           { japanese: "こうちゃ", hiragana: "紅茶", english: "black tea" },
           { japanese: "ぎゅうにゅう", hiragana: "牛乳", english: "milk" },
           { japanese: "ジュース", hiragana: "ジュース", english: "juice" },
           { japanese: "ビール", hiragana: "ビール", english: "beer" },
           { japanese: "[お]さけ", hiragana: "[お]酒", english: "sake, alcohol" },
           { japanese: "たまご", hiragana: "卵", english: "egg" },
           { japanese: "にく", hiragana: "肉", english: "meat" },
           { japanese: "さかな", hiragana: "魚", english: "fish" },
           { japanese: "やさい", hiragana: "野菜", english: "vegetables" },
           { japanese: "くだもの", hiragana: "果物", english: "fruit" },
           { japanese: "たべます", hiragana: "食べます", english: "eat" },
           { japanese: "のみます", hiragana: "飲みます", english: "drink" },
           { japanese: "すいます", hiragana: "吸います", english: "smoke" },
           { japanese: "みます", hiragana: "見ます", english: "see, watch" },
           { japanese: "ききます", hiragana: "聞きます", english: "listen, hear" },
           { japanese: "よみます", hiragana: "読みます", english: "read" },
           { japanese: "かきます", hiragana: "書きます", english: "write" },
           { japanese: "かいます", hiragana: "買います", english: "buy" },
           { japanese: "とります", hiragana: "撮ります", english: "take (a photo)" },
           { japanese: "します", hiragana: "します", english: "do, play" },
           { japanese: "あいます", hiragana: "会います", english: "meet" },
           { japanese: "いつも", hiragana: "いつも", english: "always" },
           { japanese: "よく", hiragana: "よく", english: "often" },
           { japanese: "ときどき", hiragana: "ときどき", english: "sometimes" },
           { japanese: "あまり", hiragana: "あまり", english: "not often (with ません)" },
           { japanese: "ぜんぜん", hiragana: "ぜんぜん", english: "never (with ません)" },
           { japanese: "じゃ、また あした。", hiragana: "じゃ、また あした。", english: "See you tomorrow" },
           { japanese: "いいですね", hiragana: "いいですね", english: "Sounds good" },
           { japanese: "なんですか", hiragana: "なんですか", english: "What is it?" },
           { japanese: "ええ", hiragana: "ええ", english: "Yes (casual)" },
           { japanese: "いっしょに", hiragana: "いっしょに", english: "together" }
         ],
         grammar: [
           { pattern: "[noun] を [verb]", meaning: "(Do something) with an object - を marks the direct object", example: "パンを たべます。コーヒーを のみます。", translation: "I eat bread. I drink coffee." },
           { pattern: "なにをしますか。/ [thing] を します。", meaning: "What will you do? / I'll do [something]", example: "スポーツを します。パーティーを します。", translation: "I play sports. I have a party." },
           { pattern: "いっしょに [verb] ませんか。", meaning: "Won't you do [verb] with me? (invitation)", example: "いっしょに えいがを みませんか。", translation: "Won't you watch a movie with me?" },
           { pattern: "～は ちょっと…", meaning: "That's a bit… (declining an invitation politely)", example: "すみません。きょうは ちょっと…。", translation: "Sorry, today is a bit difficult…" },
           { pattern: "Frequency Adverbs", meaning: "いつも (always), よく (often), ときどき (sometimes), あまり+ません (not often), ぜんぜん+ません (never)", example: "いつも うちで ばんごはんを たべます。あまり テレビを みません。", translation: "I always eat dinner at home. I don't watch TV often." },
           { pattern: "じゃ、また あした。", meaning: "Well then, see you tomorrow", example: "じゃ、また あした。", translation: "Well then, see you tomorrow." }
         ],
         reading: "わたしは まいにち パンと たまごを たべます。コーヒーを のみます。よく ともだちと スポーツを します。",
         readingTranslation: "I eat bread and eggs every day. I drink coffee. I often play sports with my friend.",
         listening: [
           "いっしょに テニスを しませんか。 (Won't you play tennis with me?)",
           "いいですね。しましょう！ (Sounds good. Let's do it!)",
           "Recognizing objects and actions (what someone eats or drinks)",
           "Listening to invitations using いっしょに～ませんか",
           "Responses using いいですね or ～はちょっと…"
                   ]
        },
        {
          lesson: 7,
          title: "Giving & Receiving (あげます・もらいます)",
          vocabulary: [
            { japanese: "あげます", hiragana: "あげます", english: "give" },
            { japanese: "もらいます", hiragana: "もらいます", english: "receive" },
            { japanese: "かします", hiragana: "貸します", english: "lend" },
            { japanese: "かります", hiragana: "借ります", english: "borrow" },
            { japanese: "おしえます", hiragana: "教えます", english: "teach, tell" },
            { japanese: "ならいます", hiragana: "習います", english: "learn" },
            { japanese: "スプーン", hiragana: "スプーン", english: "spoon" },
            { japanese: "ナイフ", hiragana: "ナイフ", english: "knife" },
            { japanese: "フォーク", hiragana: "フォーク", english: "fork" },
            { japanese: "はさみ", hiragana: "はさみ", english: "scissors" },
            { japanese: "けしゴム", hiragana: "消しゴム", english: "eraser" },
            { japanese: "パソコン", hiragana: "パソコン", english: "personal computer" },
            { japanese: "ケータイ / スマホ", hiragana: "ケータイ / スマホ", english: "mobile phone / smartphone" },
            { japanese: "メール", hiragana: "メール", english: "email" },
            { japanese: "プレゼント", hiragana: "プレゼント", english: "present, gift" },
            { japanese: "にもつ", hiragana: "荷物", english: "luggage" },
            { japanese: "おかね", hiragana: "お金", english: "money" },
            { japanese: "ちち", hiragana: "父", english: "(my) father" },
            { japanese: "はは", hiragana: "母", english: "(my) mother" },
            { japanese: "おとうさん", hiragana: "お父さん", english: "(someone else's) father" },
            { japanese: "おかあさん", hiragana: "お母さん", english: "(someone else's) mother" },
            { japanese: "これ、どうぞ。", hiragana: "これ、どうぞ。", english: "Here you go." },
            { japanese: "どうも。", hiragana: "どうも。", english: "Thanks." },
            { japanese: "どうも ありがとうございます。", hiragana: "どうも ありがとうございます。", english: "Thank you very much." },
            { japanese: "～すてきですね。", hiragana: "～すてきですね。", english: "That's nice/lovely." },
            { japanese: "きれい", hiragana: "きれい", english: "beautiful, clean" },
            { japanese: "はな", hiragana: "花", english: "flower" },
            { japanese: "うれしい", hiragana: "うれしい", english: "happy, glad" },
            { japanese: "ほんとう", hiragana: "本当", english: "really, true" }
          ],
          grammar: [
            { pattern: "わたしは [person] に [thing] を あげます。", meaning: "I give [thing] to [person]", example: "わたしは たなかさんに プレゼントを あげました。", translation: "I gave a present to Mr. Tanaka." },
            { pattern: "わたしは [person] に [thing] を もらいました。", meaning: "I received [thing] from [person]", example: "わたしは たなかさんに プレゼントを もらいました。", translation: "I received a present from Mr. Tanaka." },
            { pattern: "わたしは [person] に [thing] を かりました／かしました。", meaning: "I borrowed/lent [thing] to/from [person]", example: "せんせいに ほんを かしました。", translation: "I lent a book to the teacher." },
            { pattern: "に (indirect object) and を (direct object)", meaning: "に = person receiving or giving, を = object involved", example: "ともだちに パソコンを かりました。", translation: "I borrowed a computer from my friend." },
            { pattern: "Giving & Receiving Verbs", meaning: "あげます (give away), もらいます (receive), かします (lend), かります (borrow)", example: "おしえます (teach), ならいます (learn)", translation: "Teaching and learning verbs with same particle pattern." },
            { pattern: "どうぞ / ありがとう expressions", meaning: "これ、どうぞ = Here you are, どうも = Thanks, どうもありがとうございます = Thank you very much", example: "これ、どうぞ。ありがとうございます。", translation: "Here you go. Thank you very much." }
          ],
          reading: "きのう、たなかさんに プレゼントを もらいました。プレゼントは きれいな はなでした。とても うれしかったです。",
          readingTranslation: "Yesterday, I received a present from Mr. Tanaka. The present was beautiful flowers. I was very happy.",
          listening: [
            "たなかさんに スマホを もらいました。 (I received a smartphone from Mr. Tanaka.)",
            "えっ、ほんとう？いいですね！ (Really? That's great!)",
            "Who gave what to whom",
            "Using correct verb forms like あげました／もらいました／かりました",
            "Recognizing objects and people in dialogues"
                     ]
         },
         {
           lesson: 8,
           title: "Adjectives & Descriptions (きれい・おもしろい)",
           vocabulary: [
             { japanese: "おおきい", hiragana: "大きい", english: "big" },
             { japanese: "ちいさい", hiragana: "小さい", english: "small" },
             { japanese: "あたらしい", hiragana: "新しい", english: "new" },
             { japanese: "ふるい", hiragana: "古い", english: "old (not for people)" },
             { japanese: "いい / よい", hiragana: "いい / よい", english: "good" },
             { japanese: "わるい", hiragana: "悪い", english: "bad" },
             { japanese: "あつい", hiragana: "暑い／熱い", english: "hot (weather / thing)" },
             { japanese: "さむい", hiragana: "寒い", english: "cold (weather)" },
             { japanese: "つめたい", hiragana: "冷たい", english: "cold (thing)" },
             { japanese: "むずかしい", hiragana: "難しい", english: "difficult" },
             { japanese: "やさしい", hiragana: "易しい", english: "easy, kind" },
             { japanese: "たかい", hiragana: "高い", english: "expensive, tall" },
             { japanese: "やすい", hiragana: "安い", english: "cheap" },
             { japanese: "ひくい", hiragana: "低い", english: "low" },
             { japanese: "おもしろい", hiragana: "面白い", english: "interesting" },
             { japanese: "おいしい", hiragana: "おいしい", english: "delicious" },
             { japanese: "たのしい", hiragana: "楽しい", english: "fun" },
             { japanese: "いそがしい", hiragana: "忙しい", english: "busy" },
             { japanese: "しずか（な）", hiragana: "静か（な）", english: "quiet" },
             { japanese: "にぎやか（な）", hiragana: "賑やか（な）", english: "lively" },
             { japanese: "ゆうめい（な）", hiragana: "有名（な）", english: "famous" },
             { japanese: "しんせつ（な）", hiragana: "親切（な）", english: "kind" },
             { japanese: "げんき（な）", hiragana: "元気（な）", english: "healthy, energetic" },
             { japanese: "ひま（な）", hiragana: "暇（な）", english: "free (time)" },
             { japanese: "すてき（な）", hiragana: "素敵（な）", english: "lovely, nice" },
             { japanese: "まち", hiragana: "町", english: "town" },
             { japanese: "たべもの", hiragana: "食べ物", english: "food" },
             { japanese: "ところ", hiragana: "所", english: "place" },
             { japanese: "せいかつ", hiragana: "生活", english: "life (daily life)" },
             { japanese: "おしごと", hiragana: "お仕事", english: "work/job (polite)" },
             { japanese: "どう", hiragana: "どう", english: "how" },
             { japanese: "とても", hiragana: "とても", english: "very" },
             { japanese: "あまり（～ない）", hiragana: "あまり（～ない）", english: "not very" },
             { japanese: "そして", hiragana: "そして", english: "and then (used to link sentences)" },
             { japanese: "～が、～", hiragana: "～が、～", english: "but (soft contrast)" }
           ],
           grammar: [
             { pattern: "[Noun] は [い-adjective] です。", meaning: "[Noun] is [adjective] - い-adjectives end with い", example: "このほんは おもしろいです。", translation: "This book is interesting." },
             { pattern: "[Noun] は [な-adjective] です。", meaning: "[Noun] is [adjective] - な-adjectives use な when modifying nouns", example: "にほんは しずかです。", translation: "Japan is quiet." },
             { pattern: "[Noun 1] は [Noun 2] より [adjective] です。", meaning: "Noun 1 is more [adjective] than Noun 2", example: "このスマホは あのスマホより あたらしいです。", translation: "This smartphone is newer than that smartphone." },
             { pattern: "[Noun] は どうですか。", meaning: "How is [Noun]? (asking for an opinion)", example: "にほんの せいかつは どうですか。", translation: "How is life in Japan?" },
             { pattern: "とても／あまり + [adjective]", meaning: "very / not very (used with adjectives)", example: "このえいがは とても おもしろいです。このレストランは あまり おいしくないです。", translation: "This movie is very interesting. This restaurant is not very delicious." },
             { pattern: "Adjective Types", meaning: "い-adjectives (directly modify), な-adjectives (use な to modify)", example: "たかい ほん (expensive book), しずかな ところ (quiet place)", translation: "Different adjective types require different modification patterns." }
           ],
           reading: "きょうと は ふるい まちです。にぎやかですが、しずか な ところも あります。たべものは とても おいしいです。",
           readingTranslation: "Kyoto is an old town. It is lively, but there are also quiet places. The food is very delicious.",
           listening: [
             "にほんのたべものは どうですか？ (How is Japanese food?)",
             "とても おいしいです。でも、ちょっと たかいです。 (It's very delicious. But it's a bit expensive.)",
             "Descriptions of people, places, and things using adjectives",
             "Opinions and comparisons",
             "Use of とても／あまり with adjectives"
           ]
         },
         {
           lesson: 9,
           title: "Preferences & Abilities (わかります・すきです)",
           vocabulary: [
             { japanese: "おんがく", hiragana: "音楽", english: "music" },
             { japanese: "うた", hiragana: "歌", english: "song" },
             { japanese: "クラシック", hiragana: "クラシック", english: "classical music" },
             { japanese: "ジャズ", hiragana: "ジャズ", english: "jazz" },
             { japanese: "ポップス", hiragana: "ポップス", english: "pop music" },
             { japanese: "コンサート", hiragana: "コンサート", english: "concert" },
             { japanese: "かぶき", hiragana: "歌舞伎", english: "Kabuki (Japanese drama)" },
             { japanese: "スポーツ", hiragana: "スポーツ", english: "sports" },
             { japanese: "サッカー", hiragana: "サッカー", english: "soccer" },
             { japanese: "やきゅう", hiragana: "野球", english: "baseball" },
             { japanese: "ダンス", hiragana: "ダンス", english: "dance" },
             { japanese: "え", hiragana: "絵", english: "painting, picture" },
             { japanese: "じ", hiragana: "字", english: "letter (character)" },
             { japanese: "ローマじ", hiragana: "ローマ字", english: "Roman letters" },
             { japanese: "りょうり", hiragana: "料理", english: "cooking, cuisine" },
             { japanese: "わかります", hiragana: "わかります", english: "understand" },
             { japanese: "すきです", hiragana: "好きです", english: "like" },
             { japanese: "きらいです", hiragana: "嫌いです", english: "dislike" },
             { japanese: "じょうずです", hiragana: "上手です", english: "good at" },
             { japanese: "へたです", hiragana: "下手です", english: "poor at" },
             { japanese: "よく", hiragana: "よく", english: "well, often" },
             { japanese: "だいたい", hiragana: "だいたい", english: "mostly, usually" },
             { japanese: "すこし", hiragana: "少し", english: "a little" },
             { japanese: "あまり", hiragana: "あまり", english: "not much (used with negatives)" },
             { japanese: "ぜんぜん", hiragana: "全然", english: "not at all (used with negatives)" },
             { japanese: "はやく", hiragana: "早く／速く", english: "early / fast" },
             { japanese: "ざんねんですね。", hiragana: "残念ですね。", english: "That's a shame." },
             { japanese: "いっしょに いかがですか。", hiragana: "いっしょに いかがですか。", english: "Shall we go together?" },
             { japanese: "[～は] ちょっと…。", hiragana: "[～は] ちょっと…。", english: "... is a bit... (declining politely)" }
           ],
           grammar: [
             { pattern: "[Noun] が わかります。", meaning: "I understand [Noun] - Use が (subject particle) instead of は", example: "日本語が わかります。", translation: "I understand Japanese." },
             { pattern: "[Noun] が すきです / きらいです / じょうずです / へたです。", meaning: "I like/dislike/am good at/am bad at [Noun]", example: "すしが すきです。うたが じょうずです。サッカーが へたです。", translation: "I like sushi. I'm good at singing. I'm bad at soccer." },
             { pattern: "Adverbs of Degree/Frequency", meaning: "よく (often), だいたい (mostly), すこし (a little), あまり+negative (not much), ぜんぜん+negative (not at all)", example: "よく テレビを みます。すこし フランスごが わかります。あまり えいがを みません。", translation: "I often watch TV. I understand French a little. I don't watch movies much." },
             { pattern: "どんな + [Noun] が すきですか。", meaning: "What kind of [noun] do you like?", example: "どんな たべものが すきですか？", translation: "What kind of food do you like?" },
             { pattern: "～は ちょっと…。", meaning: "Polite way to decline or express hesitation", example: "ビールは ちょっと…。", translation: "Beer is not really my thing..." },
             { pattern: "が particle usage", meaning: "が marks subject with わかります, すきです, あります for intangible things, じょうずです, へたです", example: "おかねが たくさん あります。クラシックが すきです。", translation: "I have a lot of money. I like classical music." }
           ],
           reading: "わたしは クラシックおんがくが すきです。まいにち CDを ききます。スポーツは サッカーが すきです。でも、やきゅうは ちょっと……。",
           readingTranslation: "I like classical music. I listen to CDs every day. As for sports, I like soccer. But baseball is not really my thing...",
           listening: [
             "どんな スポーツが すきですか？ (What kind of sports do you like?)",
             "テニスが すきです。サッカーは ちょっと…… (I like tennis. Soccer is not really...)",
             "Conversations about hobbies and preferences",
             "Using correct particles (が) with verbs like わかります, すきです",
             "Polite ways to decline using ちょっと"
           ]
         },
         {
           lesson: 10,
           title: "Existence & Location (あります・います)",
           vocabulary: [
             { japanese: "コンビニ", hiragana: "コンビニ", english: "convenience store" },
             { japanese: "スーパー", hiragana: "スーパー", english: "supermarket" },
             { japanese: "びょういん", hiragana: "病院", english: "hospital" },
             { japanese: "ゆうびんきょく", hiragana: "郵便局", english: "post office" },
             { japanese: "ぎんこう", hiragana: "銀行", english: "bank" },
             { japanese: "としょかん", hiragana: "図書館", english: "library" },
             { japanese: "こうえん", hiragana: "公園", english: "park" },
             { japanese: "えき", hiragana: "駅", english: "station" },
             { japanese: "ビル", hiragana: "ビル", english: "building" },
             { japanese: "レストラン", hiragana: "レストラン", english: "restaurant" },
             { japanese: "おとこのひと", hiragana: "男の人", english: "man" },
             { japanese: "おんなのひと", hiragana: "女の人", english: "woman" },
             { japanese: "おとこのこ", hiragana: "男の子", english: "boy" },
             { japanese: "おんなのこ", hiragana: "女の子", english: "girl" },
             { japanese: "いぬ", hiragana: "犬", english: "dog" },
             { japanese: "ねこ", hiragana: "猫", english: "cat" },
             { japanese: "ひと", hiragana: "人", english: "person" },
             { japanese: "こども", hiragana: "子ども", english: "child" },
             { japanese: "テーブル", hiragana: "テーブル", english: "table" },
             { japanese: "いす", hiragana: "いす", english: "chair" },
             { japanese: "つくえ", hiragana: "机", english: "desk" },
             { japanese: "ほん", hiragana: "本", english: "book" },
             { japanese: "めがね", hiragana: "眼鏡", english: "glasses" },
             { japanese: "かばん", hiragana: "かばん", english: "bag" },
             { japanese: "でんわ", hiragana: "電話", english: "phone" },
             { japanese: "たな", hiragana: "棚", english: "shelf" },
             { japanese: "ポスト", hiragana: "ポスト", english: "mailbox" },
             { japanese: "うえ", hiragana: "上", english: "on, above" },
             { japanese: "した", hiragana: "下", english: "under, below" },
             { japanese: "まえ", hiragana: "前", english: "in front of" },
             { japanese: "うしろ", hiragana: "後ろ", english: "behind" },
             { japanese: "なか", hiragana: "中", english: "inside" },
             { japanese: "そと", hiragana: "外", english: "outside" },
             { japanese: "となり", hiragana: "隣", english: "next to" },
             { japanese: "よこ", hiragana: "横", english: "beside" },
             { japanese: "ちかく", hiragana: "近く", english: "near" },
             { japanese: "あいだ", hiragana: "間", english: "between" }
           ],
           grammar: [
             { pattern: "あります vs います", meaning: "あります = non-living things (objects, buildings, events), います = living things (people, animals)", example: "つくえの うえに ほんが あります。にわに いぬが います。", translation: "There is a book on the desk. There is a dog in the garden." },
             { pattern: "[Place] に [thing/person] が あります／います。", meaning: "Indicates existence at a place", example: "あそこに コンビニが あります。こうえんに こどもが います。", translation: "There is a convenience store over there. There is a child in the park." },
             { pattern: "[Noun] は [Place] に あります／います。", meaning: "Focus is on the item or person rather than the place", example: "ぎんこうは あのビルの となりに あります。", translation: "The bank is next to that building." },
             { pattern: "Position Words (location expressions)", meaning: "うえ (on/above), した (under/below), まえ (in front of), うしろ (behind), なか (inside), そと (outside), となり (next to), よこ (beside), ちかく (near), あいだ (between)", example: "テーブルの うえに りんごが あります。", translation: "There is an apple on the table." },
             { pattern: "[Noun] の [Position] に", meaning: "Used to describe location of one noun relative to another", example: "いすの したに ねこが います。わたしの うしろに たなかさんが います。", translation: "There is a cat under the chair. Mr. Tanaka is behind me." },
             { pattern: "[Thing] は [location] です。", meaning: "Simple location statement", example: "ゆうびんきょくは ぎんこうの となりです。", translation: "The post office is next to the bank." }
           ],
           reading: "つくえの うえに ほんと ノートが あります。つくえの したに ねこが います。",
           readingTranslation: "There is a book and notebook on the desk. There is a cat under the desk.",
           listening: [
             "ポストは どこに ありますか？ (Where is the mailbox?)",
             "あのビルの まえに あります。 (It's in front of that building.)",
             "Descriptions of where objects and people are",
             "Understanding location words in context",
             "Listening for あります／います distinctions"
           ]
         },
         {
           lesson: 11,
           title: "Existence Statements (います・あります)",
           vocabulary: [
             { japanese: "ともだち", hiragana: "友達", english: "friend" },
             { japanese: "トムさん", hiragana: "トムさん", english: "Tom (a person's name)" },
             { japanese: "いぬ", hiragana: "犬", english: "dog" },
             { japanese: "ねこ", hiragana: "猫", english: "cat" },
             { japanese: "こども", hiragana: "子ども", english: "child" },
             { japanese: "せんせい", hiragana: "先生", english: "teacher" },
             { japanese: "がくせい", hiragana: "学生", english: "student" },
             { japanese: "にほん", hiragana: "日本", english: "Japan" },
             { japanese: "こうえん", hiragana: "公園", english: "park" },
             { japanese: "がっこう", hiragana: "学校", english: "school" },
             { japanese: "いえ", hiragana: "家", english: "house, home" },
             { japanese: "きっさてん", hiragana: "喫茶店", english: "coffee shop, cafe" },
             { japanese: "ほん", hiragana: "本", english: "book" },
             { japanese: "ざっし", hiragana: "雑誌", english: "magazine" },
             { japanese: "じしょ", hiragana: "辞書", english: "dictionary" }
           ],
           grammar: [
             { pattern: "います vs あります", meaning: "います = living things (people, animals), あります = non-living things (objects, things)", example: "トムさんは にほんに います。ほんが つくえに あります。", translation: "Tom is in Japan. There is a book on the desk." },
             { pattern: "Negative forms: いません／ありません", meaning: "いません = not exist (living things), ありません = not exist (non-living things)", example: "いぬは いえに いません。ざっしは つくえに ありません。", translation: "The dog is not at home. There is no magazine on the desk." },
             { pattern: "[Place] に [person/thing] が います／あります。", meaning: "When focusing on place - There is [person/thing] at [place]", example: "がっこうに いぬが います。こうえんに こどもが いません。", translation: "There is a dog at the school. There are no children in the park." },
             { pattern: "[Person/thing] は [place] に います／あります。", meaning: "When focusing on person/thing - [Person/thing] is at [place]", example: "トムさんは がっこうに います。じしょは いえに あります。", translation: "Tom is at school. The dictionary is at home." },
             { pattern: "どこに [person/thing] が いますか／ありますか。", meaning: "Where is [person/thing]?", example: "トムさんは どこに いますか？ほんは どこに ありますか？", translation: "Where is Tom? Where is the book?" },
             { pattern: "Existence vs Non-existence", meaning: "Use います/あります for existence, いません/ありません for non-existence", example: "せんせいは がっこうに います。でも、がくせいは いません。", translation: "The teacher is at school. But there are no students." }
           ],
           reading: "トムさんは にほんに います。がっこうに いぬが います。いえに ねこが います。こうえんに こどもが いません。",
           readingTranslation: "Tom is in Japan. There is a dog at the school. There is a cat at home. There are no children in the park.",
           listening: [
             "トムさんは どこに いますか？ (Where is Tom?)",
             "トムさんは がっこうに います。 (Tom is at school.)",
             "Understanding existence statements with います／あります",
             "Identifying whether people or objects are present or absent",
             "Responding to questions about location and existence"
           ]
         },
         {
           lesson: 12,
           title: "Time Expressions & Reasons (から・まで)",
           vocabulary: [
             { japanese: "じ", hiragana: "時", english: "o'clock" },
             { japanese: "ふん", hiragana: "分", english: "minute" },
             { japanese: "はん", hiragana: "半", english: "half (30 minutes)" },
             { japanese: "まいにち", hiragana: "毎日", english: "every day" },
             { japanese: "げつようび", hiragana: "月曜日", english: "Monday" },
             { japanese: "かようび", hiragana: "火曜日", english: "Tuesday" },
             { japanese: "すいようび", hiragana: "水曜日", english: "Wednesday" },
             { japanese: "もくようび", hiragana: "木曜日", english: "Thursday" },
             { japanese: "きんようび", hiragana: "金曜日", english: "Friday" },
             { japanese: "どようび", hiragana: "土曜日", english: "Saturday" },
             { japanese: "にちようび", hiragana: "日曜日", english: "Sunday" },
             { japanese: "デパート", hiragana: "デパート", english: "department store" },
             { japanese: "いま", hiragana: "今", english: "now" },
             { japanese: "いえ", hiragana: "家", english: "house, home" },
             { japanese: "がっこう", hiragana: "学校", english: "school" },
             { japanese: "いきます", hiragana: "行きます", english: "go" },
             { japanese: "きます", hiragana: "来ます", english: "come" },
             { japanese: "かえります", hiragana: "帰ります", english: "return, go back" },
             { japanese: "べんきょうします", hiragana: "勉強します", english: "study" },
             { japanese: "あいます", hiragana: "会います", english: "meet" }
           ],
           grammar: [
             { pattern: "[Place] は [Time] から [Time] まで です。", meaning: "[Place] is open from [Time] to [Time]", example: "デパートは ９じから ７じまで です。", translation: "The department store is open from 9 to 7." },
             { pattern: "[Time] から [Time] まで", meaning: "from [Time] to [Time] - から means 'from', まで means 'until/to'", example: "わたしは ８じから ５じまで はたらきます。", translation: "I work from 8 to 5." },
             { pattern: "[Verb/Adjective] から、…", meaning: "Because/Since [verb/adjective], … - expressing reason or cause", example: "いそがしいから、いきません。", translation: "Because I'm busy, I won't go." },
             { pattern: "から and まで with activities", meaning: "Can be used with verbs and time expressions for duration", example: "９じから べんきょうします。５じまで はたらきます。", translation: "I study from 9 o'clock. I work until 5 o'clock." },
             { pattern: "Schedule expressions", meaning: "Common patterns for stating operating hours and daily schedules", example: "がっこうは ８じから ３じまで です。", translation: "School is from 8 to 3." },
             { pattern: "Time range questions", meaning: "何じから何じまで - What time to what time", example: "デパートは 何じから 何じまで ですか？", translation: "What time is the department store open from to?" }
           ],
           reading: "デパートは ９じから ７じまで です。がっこうは ８じから ３じまで です。わたしは ９じから ５じまで べんきょうします。",
           readingTranslation: "The department store is open from 9 to 7. The school is from 8 to 3. I study from 9 to 5.",
           listening: [
             "デパートは 何じから 何じまで ですか？ (What time is the department store open from to?)",
             "９じから ７じまで です。 (From 9 to 7.)",
             "Times and durations using から and まで",
             "Statements about schedules and opening hours",
             "Cause-and-effect sentences using から for reasons"
           ]
         },
         {
           lesson: 13,
           title: "Counters & Quantities (いっぽん・にさつ)",
           vocabulary: [
             { japanese: "ひとつ", hiragana: "ひとつ", english: "one (general counter)" },
             { japanese: "ふたつ", hiragana: "ふたつ", english: "two (general counter)" },
             { japanese: "みっつ", hiragana: "みっつ", english: "three (general counter)" },
             { japanese: "いっかい", hiragana: "一回", english: "one time/once" },
             { japanese: "にかい", hiragana: "二回", english: "two times/twice" },
             { japanese: "さんかい", hiragana: "三回", english: "three times" },
             { japanese: "いっぽん", hiragana: "一本", english: "one long cylindrical object" },
             { japanese: "にほん", hiragana: "二本", english: "two long cylindrical objects" },
             { japanese: "さんぼん", hiragana: "三本", english: "three long cylindrical objects" },
             { japanese: "いっさつ", hiragana: "一冊", english: "one book/volume" },
             { japanese: "にさつ", hiragana: "二冊", english: "two books/volumes" },
             { japanese: "さんさつ", hiragana: "三冊", english: "three books/volumes" },
             { japanese: "いっぱい", hiragana: "一杯", english: "one cup/glass/bowl" },
             { japanese: "にはい", hiragana: "二杯", english: "two cups/glasses/bowls" },
             { japanese: "さんばい", hiragana: "三杯", english: "three cups/glasses/bowls" },
             { japanese: "ペン", hiragana: "ペン", english: "pen" },
             { japanese: "ボールペン", hiragana: "ボールペン", english: "ballpoint pen" },
             { japanese: "えんぴつ", hiragana: "鉛筆", english: "pencil" },
             { japanese: "ノート", hiragana: "ノート", english: "notebook" },
             { japanese: "ざっし", hiragana: "雑誌", english: "magazine" },
             { japanese: "りんご", hiragana: "りんご", english: "apple" },
             { japanese: "みかん", hiragana: "みかん", english: "mandarin orange" },
             { japanese: "コーヒー", hiragana: "コーヒー", english: "coffee" },
             { japanese: "おちゃ", hiragana: "お茶", english: "tea" },
             { japanese: "ビール", hiragana: "ビール", english: "beer" },
             { japanese: "いくつ", hiragana: "いくつ", english: "how many (general)" },
             { japanese: "なんかい", hiragana: "何回", english: "how many times" },
             { japanese: "なんぼん", hiragana: "何本", english: "how many (long objects)" },
             { japanese: "なんさつ", hiragana: "何冊", english: "how many (books)" },
             { japanese: "なんばい", hiragana: "何杯", english: "how many (cups/glasses)" }
           ],
           grammar: [
             { pattern: "Counter Usage", meaning: "Different counters for different objects: ～つ (general), ～かい (times), ～ほん (long objects), ～さつ (books), ～はい (cups)", example: "りんごを みっつ かいました。ペンを いっぽん かいました。", translation: "I bought three apples. I bought one pen." },
             { pattern: "[Noun] を [number + counter] [verb]", meaning: "I [verb] [number] [counter of noun]", example: "ほんを さんさつ かいました。コーヒーを いっぱい のみました。", translation: "I bought 3 books. I drank one cup of coffee." },
             { pattern: "Special readings", meaning: "いっぽん (not いちほん), さんぼん (not さんほん), いっぱい (not いちはい), さんばい (not さんはい)", example: "ビールを いっぽん のみました。おちゃを さんばい のみました。", translation: "I drank one bottle of beer. I drank three cups of tea." },
             { pattern: "Quantity questions", meaning: "いくつ for general things, なん + counter for specific counters", example: "みかんを いくつ かいましたか？ペンを なんぼん かいましたか？", translation: "How many mandarins did you buy? How many pens did you buy?" },
             { pattern: "Frequency expressions", meaning: "Using ～かい to express how many times something happened", example: "にほんに さんかい いきました。", translation: "I went to Japan three times." },
             { pattern: "Number placement", meaning: "Number + counter can come before or after the object noun", example: "ほんを いっさつ よみました。いっさつ ほんを よみました。", translation: "I read one book. (Both patterns are correct)" }
           ],
           reading: "きのう、ほんを さんさつ かいました。コーヒーを いっぱい のみました。３かい でんしゃに のりました。",
           readingTranslation: "Yesterday, I bought 3 books. I drank a cup of coffee. I rode the train 3 times.",
           listening: [
             "ペンを なんぼん かいましたか？ (How many pens did you buy?)",
             "いっぽん かいました。 (I bought one.)",
             "Questions about quantity using different counters",
             "Answers with correct counter readings",
             "Conversations about buying or doing something a certain number of times"
           ]
         },
         {
           lesson: 14,
           title: "Past Tense & Action Locations (ました・で)",
           vocabulary: [
             { japanese: "レストラン", hiragana: "レストラン", english: "restaurant" },
             { japanese: "きのう", hiragana: "昨日", english: "yesterday" },
             { japanese: "たべます", hiragana: "食べます", english: "eat" },
             { japanese: "たべました", hiragana: "食べました", english: "ate (past)" },
             { japanese: "たべませんでした", hiragana: "食べませんでした", english: "did not eat (past negative)" },
             { japanese: "のみます", hiragana: "飲みます", english: "drink" },
             { japanese: "のみました", hiragana: "飲みました", english: "drank (past)" },
             { japanese: "いきます", hiragana: "行きます", english: "go" },
             { japanese: "いきました", hiragana: "行きました", english: "went (past)" },
             { japanese: "みます", hiragana: "見ます", english: "see/watch" },
             { japanese: "みました", hiragana: "見ました", english: "saw/watched (past)" },
             { japanese: "かいます", hiragana: "買います", english: "buy" },
             { japanese: "かいました", hiragana: "買いました", english: "bought (past)" },
             { japanese: "ききます", hiragana: "聞きます", english: "listen/ask" },
             { japanese: "ききました", hiragana: "聞きました", english: "listened/asked (past)" },
             { japanese: "はなします", hiragana: "話します", english: "speak/talk" },
             { japanese: "はなしました", hiragana: "話しました", english: "spoke/talked (past)" },
             { japanese: "かきます", hiragana: "書きます", english: "write" },
             { japanese: "かきました", hiragana: "書きました", english: "wrote (past)" },
             { japanese: "よみます", hiragana: "読みます", english: "read" },
             { japanese: "よみました", hiragana: "読みました", english: "read (past)" },
             { japanese: "カレー", hiragana: "カレー", english: "curry" },
             { japanese: "ビール", hiragana: "ビール", english: "beer" },
             { japanese: "えいが", hiragana: "映画", english: "movie" },
             { japanese: "おんがく", hiragana: "音楽", english: "music" },
             { japanese: "てがみ", hiragana: "手紙", english: "letter" },
             { japanese: "しんぶん", hiragana: "新聞", english: "newspaper" },
             { japanese: "ざっし", hiragana: "雑誌", english: "magazine" },
             { japanese: "ともだち", hiragana: "友達", english: "friend" },
             { japanese: "いっしょに", hiragana: "一緒に", english: "together" }
           ],
           grammar: [
             { pattern: "[Place] で [action]", meaning: "Doing [action] at [place] - で indicates location where action takes place", example: "レストランで たべました。がっこうで べんきょうしました。", translation: "I ate at the restaurant. I studied at school." },
             { pattern: "[Time] に [action]", meaning: "Doing [action] at [time] - に indicates when something happens", example: "きのうに えいがを みました。", translation: "I watched a movie yesterday." },
             { pattern: "～ました (Past tense affirmative)", meaning: "Past tense form of verbs", example: "たべました (ate), いきました (went), みました (saw)", translation: "Expresses completed actions in the past" },
             { pattern: "～ませんでした (Past tense negative)", meaning: "Past tense negative form", example: "たべませんでした (did not eat), いきませんでした (did not go)", translation: "Expresses actions that did not happen in the past" },
             { pattern: "～ませんか (Invitation)", meaning: "Won't you...? - polite invitation form", example: "いっしょに たべませんか。", translation: "Won't you eat together?" },
             { pattern: "[Question word] を [past verb]", meaning: "Asking what was done using question words", example: "なにを たべましたか。どこで かいましたか。", translation: "What did you eat? Where did you buy it?" }
           ],
           reading: "きのう レストランで カレーを たべました。ともだちと いっしょに ビールを のみました。えいがを みませんでした。",
           readingTranslation: "Yesterday, I ate curry at the restaurant. I drank beer with my friend. I did not watch a movie.",
           listening: [
             "きのう、どこで たべましたか？ (Where did you eat yesterday?)",
             "レストランで たべました。 (I ate at the restaurant.)",
             "いっしょに たべませんか？ (Won't you eat together?)",
             "Questions and answers about past actions at specific places or times",
             "Invitations using ～ませんか pattern"
           ]
         },
         {
           lesson: 15,
           title: "Verb Activities & Preferences (よむのがすき)",
           vocabulary: [
             { japanese: "しんぶん", hiragana: "新聞", english: "newspaper" },
             { japanese: "よみます", hiragana: "読みます", english: "read" },
             { japanese: "よむ", hiragana: "読む", english: "to read (dictionary form)" },
             { japanese: "すき", hiragana: "好き", english: "like" },
             { japanese: "きらい", hiragana: "嫌い", english: "dislike" },
             { japanese: "とくい", hiragana: "得意", english: "good at" },
             { japanese: "にがて", hiragana: "苦手", english: "bad at" },
             { japanese: "しゅくだい", hiragana: "宿題", english: "homework" },
             { japanese: "します", hiragana: "します", english: "do" },
             { japanese: "する", hiragana: "する", english: "to do (dictionary form)" },
             { japanese: "いっしょに", hiragana: "一緒に", english: "together" },
             { japanese: "べんきょうします", hiragana: "勉強します", english: "study" },
             { japanese: "べんきょうする", hiragana: "勉強する", english: "to study (dictionary form)" },
             { japanese: "かきます", hiragana: "書きます", english: "write" },
             { japanese: "かく", hiragana: "書く", english: "to write (dictionary form)" },
             { japanese: "ききます", hiragana: "聞きます", english: "listen" },
             { japanese: "きく", hiragana: "聞く", english: "to listen (dictionary form)" },
             { japanese: "はなします", hiragana: "話します", english: "speak" },
             { japanese: "はなす", hiragana: "話す", english: "to speak (dictionary form)" },
             { japanese: "みます", hiragana: "見ます", english: "watch/see" },
             { japanese: "みる", hiragana: "見る", english: "to watch/see (dictionary form)" },
             { japanese: "およぎます", hiragana: "泳ぎます", english: "swim" },
             { japanese: "およぐ", hiragana: "泳ぐ", english: "to swim (dictionary form)" },
             { japanese: "うたいます", hiragana: "歌います", english: "sing" },
             { japanese: "うたう", hiragana: "歌う", english: "to sing (dictionary form)" },
             { japanese: "おどります", hiragana: "踊ります", english: "dance" },
             { japanese: "おどる", hiragana: "踊る", english: "to dance (dictionary form)" },
             { japanese: "りょうりします", hiragana: "料理します", english: "cook" },
             { japanese: "りょうりする", hiragana: "料理する", english: "to cook (dictionary form)" },
             { japanese: "そうじします", hiragana: "掃除します", english: "clean" },
             { japanese: "そうじする", hiragana: "掃除する", english: "to clean (dictionary form)" }
           ],
           grammar: [
             { pattern: "[Verb dictionary form] + のが + [adjective]", meaning: "Expressing likes/dislikes/abilities with verb activities", example: "しんぶんを よむのが すきです。およぐのが とくいです。", translation: "I like reading newspapers. I am good at swimming." },
             { pattern: "のが すき/きらい/とくい/にがて", meaning: "すき (like), きらい (dislike), とくい (good at), にがて (bad at)", example: "うたうのが すきです。りょうりするのが にがてです。", translation: "I like singing. I am bad at cooking." },
             { pattern: "～ませんか (Invitation)", meaning: "Won't you...? - polite invitation to do something together", example: "いっしょに しゅくだいを しませんか。", translation: "Won't you do homework together?" },
             { pattern: "～ましょう (Suggestion)", meaning: "Let's... - polite suggestion to do something together", example: "しゅくだいを しましょう。べんきょうしましょう。", translation: "Let's do homework. Let's study." },
             { pattern: "Dictionary form usage", meaning: "Using the plain form of verbs before の to create noun phrases", example: "よむ→よむの, かく→かくの, およぐ→およぐの", translation: "Converting verbs to activities: reading, writing, swimming" },
             { pattern: "Activity preferences", meaning: "Expressing what activities you like or are good at", example: "なにをするのが すきですか。", translation: "What activities do you like doing?" }
           ],
           reading: "わたしは しんぶんを よむのが すきです。ともだちと いっしょに しゅくだいを します。きのうは しゅくだいを しませんでした。",
           readingTranslation: "I like reading newspapers. I do homework together with my friend. Yesterday, I did not do homework.",
           listening: [
             "しんぶんを よみますか？ (Do you read newspapers?)",
             "はい、よむのが すきです。 (Yes, I like reading.)",
             "いっしょに しゅくだいを しませんか？ (Won't you do homework together?)",
             "はい、しましょう。 (Yes, let's do it.)",
             "Questions about likes and dislikes with verb activities",
             "Invitations to do activities together using ～ませんか",
             "Suggestions using ～ましょう for group activities"
           ]
         },
         {
           lesson: 16,
           title: "Abilities & Making Things (つくります・できます)",
           vocabulary: [
             { japanese: "すし", hiragana: "寿司", english: "sushi" },
             { japanese: "つくります", hiragana: "作ります", english: "make" },
             { japanese: "つくる", hiragana: "作る", english: "to make (dictionary form)" },
             { japanese: "ピアノ", hiragana: "ピアノ", english: "piano" },
             { japanese: "ひきます", hiragana: "弾きます", english: "play (instrument)" },
             { japanese: "ひく", hiragana: "弾く", english: "to play (instrument, dictionary form)" },
             { japanese: "できます", hiragana: "できます", english: "can do" },
             { japanese: "できません", hiragana: "できません", english: "cannot do" },
             { japanese: "ケーキ", hiragana: "ケーキ", english: "cake" },
             { japanese: "りょうり", hiragana: "料理", english: "cooking, cuisine" },
             { japanese: "パン", hiragana: "パン", english: "bread" },
             { japanese: "おかし", hiragana: "お菓子", english: "sweets, snacks" },
             { japanese: "ギター", hiragana: "ギター", english: "guitar" },
             { japanese: "バイオリン", hiragana: "バイオリン", english: "violin" },
             { japanese: "うたいます", hiragana: "歌います", english: "sing" },
             { japanese: "うたう", hiragana: "歌う", english: "to sing (dictionary form)" },
             { japanese: "おどります", hiragana: "踊ります", english: "dance" },
             { japanese: "おどる", hiragana: "踊る", english: "to dance (dictionary form)" },
             { japanese: "およぎます", hiragana: "泳ぎます", english: "swim" },
             { japanese: "およぐ", hiragana: "泳ぐ", english: "to swim (dictionary form)" },
             { japanese: "はしります", hiragana: "走ります", english: "run" },
             { japanese: "はしる", hiragana: "走る", english: "to run (dictionary form)" },
             { japanese: "かきます", hiragana: "書きます", english: "write" },
             { japanese: "かく", hiragana: "書く", english: "to write (dictionary form)" },
             { japanese: "え", hiragana: "絵", english: "picture, painting" },
             { japanese: "しゃしん", hiragana: "写真", english: "photograph" },
             { japanese: "とります", hiragana: "撮ります", english: "take (photo)" },
             { japanese: "とる", hiragana: "撮る", english: "to take (photo, dictionary form)" },
             { japanese: "うんてん", hiragana: "運転", english: "driving" },
             { japanese: "うんてんします", hiragana: "運転します", english: "drive" },
             { japanese: "うんてんする", hiragana: "運転する", english: "to drive (dictionary form)" },
             { japanese: "こと", hiragana: "こと", english: "thing, matter (nominalizer)" },
             { japanese: "じょうずに", hiragana: "上手に", english: "skillfully" },
             { japanese: "へたに", hiragana: "下手に", english: "poorly" }
           ],
           grammar: [
             { pattern: "[Verb dictionary form] + ことが できます", meaning: "Can do [verb] - expressing ability", example: "ピアノを ひくことが できます。すしを つくることが できます。", translation: "I can play the piano. I can make sushi." },
             { pattern: "[Verb dictionary form] + ことが できません", meaning: "Cannot do [verb] - expressing inability", example: "ギターを ひくことが できません。", translation: "I cannot play the guitar." },
             { pattern: "[Verb dictionary form] + ことが すき/きらいです", meaning: "Like/dislike doing [verb]", example: "うたうことが すきです。はしることが きらいです。", translation: "I like singing. I dislike running." },
             { pattern: "[Object] を つくります", meaning: "Make [object] - を marks direct object", example: "ケーキを つくります。パンを つくります。", translation: "I make cake. I make bread." },
             { pattern: "こと nominalizer", meaning: "こと turns verbs into noun phrases", example: "およぐこと (swimming), うたうこと (singing)", translation: "Converting verbs to activities using こと" },
             { pattern: "Ability questions", meaning: "なにが できますか (What can you do?)", example: "なにが できますか。ピアノが できますか。", translation: "What can you do? Can you play piano?" }
           ],
           reading: "わたしは すしを つくることが できます。ピアノを ひくことが きらいです。ケーキを つくります。",
           readingTranslation: "I can make sushi. I dislike playing the piano. I make cake.",
           listening: [
             "ピアノを ひくことが できますか？ (Can you play the piano?)",
             "はい、できます。 (Yes, I can.)",
             "すしを つくることが すきですか？ (Do you like making sushi?)",
             "はい、すきです。 (Yes, I like it.)",
             "People talking about their abilities and skills",
             "Discussions about likes and dislikes of activities",
             "Conversations about making things and hobbies"
           ]
         },
         {
           lesson: 17,
           title: "Place Actions & Te-form Requests (どこで・ください)",
           vocabulary: [
             { japanese: "どこ", hiragana: "どこ", english: "where" },
             { japanese: "で", hiragana: "で", english: "at, in (place particle for actions)" },
             { japanese: "ください", hiragana: "ください", english: "please (give me/do for me)" },
             { japanese: "みせます", hiragana: "見せます", english: "show" },
             { japanese: "みせる", hiragana: "見せる", english: "to show (dictionary form)" },
             { japanese: "みせて", hiragana: "見せて", english: "show (te-form)" },
             { japanese: "たばこ", hiragana: "たばこ", english: "cigarette" },
             { japanese: "すいます", hiragana: "吸います", english: "smoke, suck" },
             { japanese: "すう", hiragana: "吸う", english: "to smoke/suck (dictionary form)" },
             { japanese: "すって", hiragana: "吸って", english: "smoke (te-form)" },
             { japanese: "あそびます", hiragana: "遊びます", english: "play" },
             { japanese: "あそぶ", hiragana: "遊ぶ", english: "to play (dictionary form)" },
             { japanese: "あそんで", hiragana: "遊んで", english: "play (te-form)" },
             { japanese: "こうえん", hiragana: "公園", english: "park" },
             { japanese: "レストラン", hiragana: "レストラン", english: "restaurant" },
             { japanese: "うち", hiragana: "うち", english: "home, house" },
             { japanese: "がっこう", hiragana: "学校", english: "school" },
             { japanese: "としょかん", hiragana: "図書館", english: "library" },
             { japanese: "びょういん", hiragana: "病院", english: "hospital" },
             { japanese: "スーパー", hiragana: "スーパー", english: "supermarket" },
             { japanese: "まって", hiragana: "待って", english: "wait (te-form)" },
             { japanese: "まちます", hiragana: "待ちます", english: "wait" },
             { japanese: "まつ", hiragana: "待つ", english: "to wait (dictionary form)" },
             { japanese: "きて", hiragana: "来て", english: "come (te-form)" },
             { japanese: "きます", hiragana: "来ます", english: "come" },
             { japanese: "くる", hiragana: "来る", english: "to come (dictionary form)" },
             { japanese: "いって", hiragana: "行って", english: "go (te-form)" },
             { japanese: "いきます", hiragana: "行きます", english: "go" },
             { japanese: "いく", hiragana: "行く", english: "to go (dictionary form)" },
             { japanese: "もいいです", hiragana: "もいいです", english: "it's okay to, may" },
             { japanese: "はいけません", hiragana: "はいけません", english: "must not, may not" },
             { japanese: "だめです", hiragana: "だめです", english: "no good, not allowed" },
             { japanese: "しゃしん", hiragana: "写真", english: "photograph" },
             { japanese: "とって", hiragana: "撮って", english: "take (photo, te-form)" },
             { japanese: "はいって", hiragana: "入って", english: "enter (te-form)" },
             { japanese: "はいります", hiragana: "入ります", english: "enter" },
             { japanese: "はいる", hiragana: "入る", english: "to enter (dictionary form)" }
           ],
           grammar: [
             { pattern: "[Place] で [verb]", meaning: "Do [verb] at [place] - で indicates place of action", example: "がっこうで べんきょうします。こうえんで あそびます。", translation: "I study at school. I play in the park." },
             { pattern: "[Verb te-form] + ください", meaning: "Please do [verb] - polite request", example: "みせてください。まってください。きてください。", translation: "Please show me. Please wait. Please come." },
             { pattern: "[Verb te-form] + もいいです", meaning: "It's okay to [verb] - giving/asking permission", example: "ここで しゃしんを とってもいいです。たばこを すってもいいですか。", translation: "It's okay to take photos here. May I smoke?" },
             { pattern: "[Verb te-form] + はいけません", meaning: "Must not [verb] - prohibition", example: "ここで たばこを すってはいけません。はいってはいけません。", translation: "You must not smoke here. You must not enter." },
             { pattern: "Te-form formation", meaning: "Converting verbs to te-form for requests and permissions", example: "みます→みて, あそびます→あそんで, まちます→まって", translation: "Different verb groups have different te-form patterns" },
             { pattern: "どこで + verb", meaning: "Where do you [verb]? - asking about place of action", example: "どこで つくりますか。どこで べんきょうしますか。", translation: "Where do you make it? Where do you study?" }
           ],
           reading: "すしは レストランで つくります。こうえんで あそんでも いいです。ここで たばこを すってはいけません。",
           readingTranslation: "Sushi is made at the restaurant. You may play in the park. You must not smoke here.",
           listening: [
             "どこで つくりますか？ (Where do you make it?)",
             "うちで つくります。 (I make it at home.)",
             "ここで あそんでも いいですか？ (May I play here?)",
             "はい、いいです。 (Yes, it's okay.)",
             "ここで たばこを すってはいけません。 (You must not smoke here.)",
             "Questions about where actions take place using で",
             "Polite requests using て-form + ください",
             "Permission and prohibition conversations"
           ]
         },
         {
           lesson: 18,
           title: "Time & Daily Routines (まいあさ・に・ごろ)",
           vocabulary: [
             { japanese: "まいあさ", hiragana: "毎朝", english: "every morning" },
             { japanese: "まいばん", hiragana: "毎晩", english: "every evening/night" },
             { japanese: "まいにち", hiragana: "毎日", english: "every day" },
             { japanese: "おきます", hiragana: "起きます", english: "get up, wake up" },
             { japanese: "おきる", hiragana: "起きる", english: "to get up (dictionary form)" },
             { japanese: "ねます", hiragana: "寝ます", english: "sleep, go to bed" },
             { japanese: "ねる", hiragana: "寝る", english: "to sleep (dictionary form)" },
             { japanese: "はやい", hiragana: "早い", english: "early" },
             { japanese: "おそい", hiragana: "遅い", english: "late" },
             { japanese: "に", hiragana: "に", english: "at (time particle)" },
             { japanese: "ごろ", hiragana: "ごろ", english: "around, about (approximate time)" },
             { japanese: "あさごはん", hiragana: "朝ごはん", english: "breakfast" },
             { japanese: "ひるごはん", hiragana: "昼ごはん", english: "lunch" },
             { japanese: "ばんごはん", hiragana: "晩ごはん", english: "dinner" },
             { japanese: "シャワー", hiragana: "シャワー", english: "shower" },
             { japanese: "あびます", hiragana: "浴びます", english: "take (a shower)" },
             { japanese: "あびる", hiragana: "浴びる", english: "to take (a shower, dictionary form)" },
             { japanese: "はみがき", hiragana: "歯磨き", english: "brushing teeth" },
             { japanese: "はを みがきます", hiragana: "歯を磨きます", english: "brush teeth" },
             { japanese: "みがく", hiragana: "磨く", english: "to brush, polish (dictionary form)" },
             { japanese: "しごと", hiragana: "仕事", english: "work, job" },
             { japanese: "はじまります", hiragana: "始まります", english: "begin, start" },
             { japanese: "はじまる", hiragana: "始まる", english: "to begin (dictionary form)" },
             { japanese: "おわります", hiragana: "終わります", english: "end, finish" },
             { japanese: "おわる", hiragana: "終わる", english: "to end (dictionary form)" },
             { japanese: "でかけます", hiragana: "出かけます", english: "go out" },
             { japanese: "でかける", hiragana: "出かける", english: "to go out (dictionary form)" },
             { japanese: "かえります", hiragana: "帰ります", english: "return home" },
             { japanese: "かえる", hiragana: "帰る", english: "to return (dictionary form)" },
             { japanese: "きのう", hiragana: "昨日", english: "yesterday" },
             { japanese: "きょう", hiragana: "今日", english: "today" },
             { japanese: "あした", hiragana: "明日", english: "tomorrow" },
             { japanese: "せんしゅう", hiragana: "先週", english: "last week" },
             { japanese: "こんしゅう", hiragana: "今週", english: "this week" },
             { japanese: "らいしゅう", hiragana: "来週", english: "next week" },
             { japanese: "なんじ", hiragana: "何時", english: "what time" },
             { japanese: "じかん", hiragana: "時間", english: "time" }
           ],
           grammar: [
             { pattern: "[Time] + に + [verb]", meaning: "Do [verb] at [exact time] - に indicates specific time", example: "6じに おきます。12じに ひるごはんを たべます。", translation: "I get up at 6. I eat lunch at 12." },
             { pattern: "[Time] + ごろ + [verb]", meaning: "Do [verb] around [time] - ごろ indicates approximate time", example: "6じごろ おきます。8じごろ でかけます。", translation: "I get up around 6. I go out around 8." },
             { pattern: "Past tense ～ました", meaning: "Did [verb] - past tense form", example: "きのう 7じに おきました。あさごはんを たべました。", translation: "Yesterday I got up at 7. I ate breakfast." },
             { pattern: "Daily routine vocabulary", meaning: "Words for describing daily activities", example: "まいあさ、シャワーを あびます。はを みがきます。", translation: "Every morning, I take a shower. I brush my teeth." },
             { pattern: "Time questions", meaning: "なんじに (at what time?)", example: "なんじに おきますか。なんじに ねますか。", translation: "What time do you get up? What time do you go to bed?" },
             { pattern: "Frequency expressions", meaning: "まいあさ (every morning), まいばん (every evening), まいにち (every day)", example: "まいにち 8じに しごとが はじまります。", translation: "Work starts at 8 every day." }
           ],
           reading: "まいあさ 6じに おきます。6じごろ あさごはんを たべます。きのうは 7じに おきました。",
           readingTranslation: "I get up at 6 every morning. I eat breakfast around 6 o'clock. Yesterday, I got up at 7.",
           listening: [
             "まいあさ なんじに おきますか？ (What time do you get up every morning?)",
             "6じに おきます。 (I get up at 6.)",
             "きのうは なんじに おきましたか？ (What time did you get up yesterday?)",
             "7じに おきました。 (I got up at 7.)",
             "Daily routine conversations with time expressions",
             "Past and present tense discussions about schedules",
             "Distinguishing between に (exact time) and ごろ (approximate time)"
           ]
         },
         {
           lesson: 19,
           title: "Skills & Abilities (じょうず・へた・わかります)",
           vocabulary: [
             { japanese: "じょうず", hiragana: "上手", english: "good at, skilled" },
             { japanese: "へた", hiragana: "下手", english: "bad at, unskilled" },
             { japanese: "わかります", hiragana: "分かります", english: "understand" },
             { japanese: "できます", hiragana: "できます", english: "can do, be able to" },
             { japanese: "テニス", hiragana: "テニス", english: "tennis" },
             { japanese: "うた", hiragana: "歌", english: "song, singing" },
             { japanese: "ピアノ", hiragana: "ピアノ", english: "piano" },
             { japanese: "ギター", hiragana: "ギター", english: "guitar" },
             { japanese: "ダンス", hiragana: "ダンス", english: "dance, dancing" },
             { japanese: "りょうり", hiragana: "料理", english: "cooking" },
             { japanese: "えいご", hiragana: "英語", english: "English language" },
             { japanese: "にほんご", hiragana: "日本語", english: "Japanese language" },
             { japanese: "ちゅうごくご", hiragana: "中国語", english: "Chinese language" },
             { japanese: "かんこくご", hiragana: "韓国語", english: "Korean language" },
             { japanese: "フランスご", hiragana: "フランス語", english: "French language" },
             { japanese: "スポーツ", hiragana: "スポーツ", english: "sports" },
             { japanese: "サッカー", hiragana: "サッカー", english: "soccer" },
             { japanese: "やきゅう", hiragana: "野球", english: "baseball" },
             { japanese: "バスケットボール", hiragana: "バスケットボール", english: "basketball" },
             { japanese: "すいえい", hiragana: "水泳", english: "swimming" },
             { japanese: "スキー", hiragana: "スキー", english: "skiing" },
             { japanese: "え", hiragana: "絵", english: "picture, painting" },
             { japanese: "しゃしん", hiragana: "写真", english: "photography" },
             { japanese: "コンピューター", hiragana: "コンピューター", english: "computer" },
             { japanese: "うんてん", hiragana: "運転", english: "driving" },
             { japanese: "はなします", hiragana: "話します", english: "speak, talk" },
             { japanese: "はなす", hiragana: "話す", english: "to speak (dictionary form)" },
             { japanese: "ききます", hiragana: "聞きます", english: "listen" },
             { japanese: "きく", hiragana: "聞く", english: "to listen (dictionary form)" },
             { japanese: "よみます", hiragana: "読みます", english: "read" },
             { japanese: "よむ", hiragana: "読む", english: "to read (dictionary form)" },
             { japanese: "かきます", hiragana: "書きます", english: "write" },
             { japanese: "かく", hiragana: "書く", english: "to write (dictionary form)" },
             { japanese: "れんしゅう", hiragana: "練習", english: "practice" },
             { japanese: "れんしゅうします", hiragana: "練習します", english: "practice" },
             { japanese: "べんきょう", hiragana: "勉強", english: "study" },
             { japanese: "おしえます", hiragana: "教えます", english: "teach" },
             { japanese: "おしえる", hiragana: "教える", english: "to teach (dictionary form)" }
           ],
           grammar: [
             { pattern: "[Person] は [Activity] が じょうずです", meaning: "[Person] is good at [activity] - が marks the skill", example: "たけしさんは テニスが じょうずです。さとうさんは りょうりが じょうずです。", translation: "Takeshi is good at tennis. Ms. Sato is good at cooking." },
             { pattern: "[Person] は [Activity] が へたです", meaning: "[Person] is bad at [activity]", example: "わたしは ダンスが へたです。かれは うたが へたです。", translation: "I am bad at dancing. He is bad at singing." },
             { pattern: "[Language/Subject] が わかります", meaning: "Understand [language/subject] - for knowledge/comprehension", example: "にほんごが わかります。すうがくが わかります。", translation: "I understand Japanese. I understand mathematics." },
             { pattern: "[Skill/Activity] が できます", meaning: "Can do [skill/activity] - for practical abilities", example: "ピアノが できます。うんてんが できます。", translation: "I can play piano. I can drive." },
             { pattern: "[Verb dictionary form] + のが + じょうず/へた/すきです", meaning: "Good at/bad at/like doing [verb]", example: "えいごを はなすのが じょうずです。りょうりするのが すきです。", translation: "I'm good at speaking English. I like cooking." },
             { pattern: "わかります vs できます", meaning: "わかります = understand (mental), できます = can do (physical skill)", example: "にほんごが わかります (understand Japanese) vs ピアノが できます (can play piano)", translation: "Different uses for understanding vs practical ability" }
           ],
           reading: "さとうさんは りょうりが じょうずです。わたしは ダンスが へたです。にほんごを はなすのが すきです。",
           readingTranslation: "Ms. Sato is good at cooking. I am bad at dancing. I like speaking Japanese.",
           listening: [
             "たけしさんは テニスが じょうずですね。 (Takeshi is good at tennis, isn't he?)",
             "はい、まいにち れんしゅうしています。 (Yes, he practices every day.)",
             "ピアノは？ (What about piano?)",
             "いいえ、ピアノは へたです。 (No, he's bad at piano.)",
             "Conversations about personal skills and abilities",
             "Comparing different people's talents",
             "Discussions about language abilities and hobbies"
           ]
         },
         {
           lesson: 20,
           title: "Desires & Purpose (たいです・に いきます)",
           vocabulary: [
             { japanese: "たいです", hiragana: "たいです", english: "want to (do)" },
             { japanese: "たくないです", hiragana: "たくないです", english: "don't want to (do)" },
             { japanese: "おおさか", hiragana: "大阪", english: "Osaka" },
             { japanese: "とうきょう", hiragana: "東京", english: "Tokyo" },
             { japanese: "きょうと", hiragana: "京都", english: "Kyoto" },
             { japanese: "なにか", hiragana: "何か", english: "something" },
             { japanese: "どこか", hiragana: "どこか", english: "somewhere" },
             { japanese: "だれか", hiragana: "誰か", english: "someone" },
             { japanese: "かいもの", hiragana: "買い物", english: "shopping" },
             { japanese: "たこやき", hiragana: "たこ焼き", english: "takoyaki (octopus balls)" },
             { japanese: "らーめん", hiragana: "ラーメン", english: "ramen" },
             { japanese: "おこのみやき", hiragana: "お好み焼き", english: "okonomiyaki (savory pancake)" },
             { japanese: "すし", hiragana: "寿司", english: "sushi" },
             { japanese: "てんぷら", hiragana: "天ぷら", english: "tempura" },
             { japanese: "やきとり", hiragana: "焼き鳥", english: "yakitori (grilled chicken)" },
             { japanese: "おちゃ", hiragana: "お茶", english: "tea" },
             { japanese: "コーヒー", hiragana: "コーヒー", english: "coffee" },
             { japanese: "ビール", hiragana: "ビール", english: "beer" },
             { japanese: "えいが", hiragana: "映画", english: "movie" },
             { japanese: "みます", hiragana: "見ます", english: "watch, see" },
             { japanese: "みる", hiragana: "見る", english: "to watch/see (dictionary form)" },
             { japanese: "みたい", hiragana: "見たい", english: "want to watch/see" },
             { japanese: "たべます", hiragana: "食べます", english: "eat" },
             { japanese: "たべる", hiragana: "食べる", english: "to eat (dictionary form)" },
             { japanese: "たべたい", hiragana: "食べたい", english: "want to eat" },
             { japanese: "のみます", hiragana: "飲みます", english: "drink" },
             { japanese: "のむ", hiragana: "飲む", english: "to drink (dictionary form)" },
             { japanese: "のみたい", hiragana: "飲みたい", english: "want to drink" },
             { japanese: "かいます", hiragana: "買います", english: "buy" },
             { japanese: "かう", hiragana: "買う", english: "to buy (dictionary form)" },
             { japanese: "かいたい", hiragana: "買いたい", english: "want to buy" },
             { japanese: "よみます", hiragana: "読みます", english: "read" },
             { japanese: "よむ", hiragana: "読む", english: "to read (dictionary form)" },
             { japanese: "よみたい", hiragana: "読みたい", english: "want to read" },
             { japanese: "ききます", hiragana: "聞きます", english: "listen" },
             { japanese: "きく", hiragana: "聞く", english: "to listen (dictionary form)" },
             { japanese: "ききたい", hiragana: "聞きたい", english: "want to listen" },
             { japanese: "やすみ", hiragana: "休み", english: "vacation, break" },
             { japanese: "りょこう", hiragana: "旅行", english: "travel, trip" },
             { japanese: "はくぶつかん", hiragana: "博物館", english: "museum" },
             { japanese: "びじゅつかん", hiragana: "美術館", english: "art museum" },
             { japanese: "おてら", hiragana: "お寺", english: "temple" },
             { japanese: "じんじゃ", hiragana: "神社", english: "shrine" },
             { japanese: "おんせん", hiragana: "温泉", english: "hot spring" }
           ],
           grammar: [
             { pattern: "[Verb masu-stem] + たいです", meaning: "Want to [verb] - expressing desire to do something", example: "おおさかへ いきたいです。すしを たべたいです。えいがを みたいです。", translation: "I want to go to Osaka. I want to eat sushi. I want to watch a movie." },
             { pattern: "[Verb masu-stem] + たくないです", meaning: "Don't want to [verb] - negative desire", example: "にくを たべたくないです。はやく おきたくないです。", translation: "I don't want to eat meat. I don't want to wake up early." },
             { pattern: "[Place] へ [Purpose] に いきます", meaning: "Go to [place] to [do purpose]", example: "スーパーへ かいものに いきます。としょかんへ べんきょうに いきます。", translation: "I go to the supermarket to shop. I go to the library to study." },
             { pattern: "なにか (something)", meaning: "Indefinite pronoun for things", example: "なにか たべたいです。なにか のみたいです。", translation: "I want to eat something. I want to drink something." },
             { pattern: "どこか (somewhere)", meaning: "Indefinite pronoun for places", example: "どこか いきたいです。どこか あたたかい ところへ いきたいです。", translation: "I want to go somewhere. I want to go somewhere warm." },
             { pattern: "だれか (someone)", meaning: "Indefinite pronoun for people", example: "だれかと えいがを みたいです。", translation: "I want to watch a movie with someone." }
           ],
           reading: "らいしゅう、おおさかへ いきたいです。おおさかで なにか おいしい ものを たべたいです。それから、かいものに いきます。",
           readingTranslation: "I want to go to Osaka next week. I want to eat something delicious in Osaka. After that, I'll go shopping.",
           listening: [
             "やすみに なにを したいですか？ (What do you want to do during the break?)",
             "おおさかへ いきたいです。 (I want to go to Osaka.)",
             "そうですか。なにか たべたい ものが ありますか？ (I see. Is there something you want to eat?)",
             "はい、たこやきを たべたいです！ (Yes, I want to eat takoyaki!)",
             "Conversations about travel desires and plans",
             "Discussions about food preferences and wants",
             "Planning activities using purpose expressions"
           ]
         },
         {
           lesson: 21,
           title: "Intentions & Probability (つもりです・でしょう・かもしれません)",
           vocabulary: [
             { japanese: "つもりです", hiragana: "つもりです", english: "intend to, plan to" },
             { japanese: "つもり", hiragana: "つもり", english: "intention, plan" },
             { japanese: "でしょう", hiragana: "でしょう", english: "probably, right?" },
             { japanese: "かもしれません", hiragana: "かもしれません", english: "might, may" },
             { japanese: "らいねん", hiragana: "来年", english: "next year" },
             { japanese: "きょねん", hiragana: "去年", english: "last year" },
             { japanese: "らいげつ", hiragana: "来月", english: "next month" },
             { japanese: "せんげつ", hiragana: "先月", english: "last month" },
             { japanese: "そつぎょう", hiragana: "卒業", english: "graduation" },
             { japanese: "そつぎょうします", hiragana: "卒業します", english: "graduate" },
             { japanese: "そつぎょうする", hiragana: "卒業する", english: "to graduate (dictionary form)" },
             { japanese: "あめ", hiragana: "雨", english: "rain" },
             { japanese: "ゆき", hiragana: "雪", english: "snow" },
             { japanese: "かぜ", hiragana: "風", english: "wind" },
             { japanese: "くもり", hiragana: "曇り", english: "cloudy weather" },
             { japanese: "はれ", hiragana: "晴れ", english: "clear weather" },
             { japanese: "てんき", hiragana: "天気", english: "weather" },
             { japanese: "ふります", hiragana: "降ります", english: "fall (rain/snow)" },
             { japanese: "ふる", hiragana: "降る", english: "to fall (rain/snow, dictionary form)" },
             { japanese: "ハイキング", hiragana: "ハイキング", english: "hiking" },
             { japanese: "ピクニック", hiragana: "ピクニック", english: "picnic" },
             { japanese: "パーティー", hiragana: "パーティー", english: "party" },
             { japanese: "けっこんしき", hiragana: "結婚式", english: "wedding ceremony" },
             { japanese: "しゅっちょう", hiragana: "出張", english: "business trip" },
             { japanese: "しゅっちょうします", hiragana: "出張します", english: "go on business trip" },
             { japanese: "しゅっちょうする", hiragana: "出張する", english: "to go on business trip (dictionary)" },
             { japanese: "ひっこし", hiragana: "引っ越し", english: "moving (residence)" },
             { japanese: "ひっこします", hiragana: "引っ越します", english: "move (residence)" },
             { japanese: "ひっこす", hiragana: "引っ越す", english: "to move (residence, dictionary)" },
             { japanese: "しけん", hiragana: "試験", english: "exam, test" },
             { japanese: "めんせつ", hiragana: "面接", english: "interview" },
             { japanese: "たいふう", hiragana: "台風", english: "typhoon" },
             { japanese: "じしん", hiragana: "地震", english: "earthquake" },
             { japanese: "コロナ", hiragana: "コロナ", english: "Corona(virus)" },
             { japanese: "はやります", hiragana: "流行ります", english: "spread, become popular" },
             { japanese: "はやる", hiragana: "流行る", english: "to spread/become popular (dictionary)" },
             { japanese: "いけません", hiragana: "行けません", english: "cannot go" },
             { japanese: "いける", hiragana: "行ける", english: "can go" },
             { japanese: "そのとき", hiragana: "その時", english: "at that time" },
             { japanese: "たぶん", hiragana: "多分", english: "probably, maybe" },
             { japanese: "きっと", hiragana: "きっと", english: "surely, certainly" },
             { japanese: "ぜったい", hiragana: "絶対", english: "absolutely" },
             { japanese: "だいがく", hiragana: "大学", english: "university" }
           ],
           grammar: [
             { pattern: "[Verb dictionary form] + つもりです", meaning: "Intend to/plan to [verb] - expressing personal intentions", example: "らいねん にほんへ いくつもりです。きょう べんきょうするつもりです。", translation: "I plan to go to Japan next year. I intend to study today." },
             { pattern: "[Verb/Adjective/Noun] + でしょう", meaning: "Probably [verb/adjective/noun] - expressing probability or seeking agreement", example: "あした あめが ふるでしょう。この レストランは おいしいでしょう？", translation: "It will probably rain tomorrow. This restaurant is delicious, right?" },
             { pattern: "[Verb/Adjective/Noun] + かもしれません", meaning: "Might/may [verb/adjective/noun] - expressing possibility or uncertainty", example: "たなかさんは くるかもしれません。あした ゆきかもしれません。", translation: "Mr. Tanaka might come. It might snow tomorrow." },
             { pattern: "Negative intentions", meaning: "つもりはありません (don't intend to), つもりじゃありません (didn't intend to)", example: "いくつもりはありません。そんなつもりじゃありませんでした。", translation: "I don't intend to go. I didn't mean it that way." },
             { pattern: "でしょう vs かもしれません", meaning: "でしょう = higher probability (70-80%), かもしれません = lower probability (30-50%)", example: "あした はれるでしょう (probably sunny) vs あした はれるかもしれません (might be sunny)", translation: "Different levels of certainty in predictions" },
             { pattern: "Time expressions with future plans", meaning: "らいねん (next year), らいげつ (next month), らいしゅう (next week)", example: "らいねん だいがくを そつぎょうするつもりです。", translation: "I plan to graduate from university next year." }
           ],
           reading: "らいねん、だいがくを そつぎょうするつもりです。それから、にほんへ いくつもりです。でも、コロナが また はやるかもしれません。そのときは、いけないでしょう。",
           readingTranslation: "I plan to graduate from university next year. After that, I intend to go to Japan. But COVID might spread again. In that case, I probably won't be able to go.",
           listening: [
             "らいしゅう、ハイキングに いくつもりです。 (I plan to go hiking next week.)",
             "てんきは いいでしょうか？ (Will the weather be good?)",
             "うーん、あめが ふるかもしれませんね。 (Hmm, it might rain.)",
             "でも、きっと たのしいでしょう！ (But it will surely be fun!)",
             "Conversations about future plans and intentions",
             "Weather predictions and discussions",
             "Expressing uncertainty about future events"
           ]
         },
         {
           lesson: 22,
           title: "Relative Clauses & Reported Speech (作った・と言います)",
           vocabulary: [
             { japanese: "つくりました", hiragana: "作りました", english: "made (past tense)" },
             { japanese: "つくった", hiragana: "作った", english: "made (plain past)" },
             { japanese: "よみました", hiragana: "読みました", english: "read (past tense)" },
             { japanese: "よんだ", hiragana: "読んだ", english: "read (plain past)" },
             { japanese: "みました", hiragana: "見ました", english: "watched/saw (past tense)" },
             { japanese: "みた", hiragana: "見た", english: "watched/saw (plain past)" },
             { japanese: "いいます", hiragana: "言います", english: "say" },
             { japanese: "いう", hiragana: "言う", english: "to say (dictionary form)" },
             { japanese: "いいました", hiragana: "言いました", english: "said" },
             { japanese: "いった", hiragana: "言った", english: "said (plain past)" },
             { japanese: "なまえ", hiragana: "名前", english: "name" },
             { japanese: "ひと", hiragana: "人", english: "person" },
             { japanese: "ほん", hiragana: "本", english: "book" },
             { japanese: "えいが", hiragana: "映画", english: "movie" },
             { japanese: "うた", hiragana: "歌", english: "song" },
             { japanese: "しゃしん", hiragana: "写真", english: "photograph" },
             { japanese: "てがみ", hiragana: "手紙", english: "letter" },
             { japanese: "にっき", hiragana: "日記", english: "diary" },
             { japanese: "レポート", hiragana: "レポート", english: "report" },
             { japanese: "しゅくだい", hiragana: "宿題", english: "homework" },
             { japanese: "カレー", hiragana: "カレー", english: "curry" },
             { japanese: "サラダ", hiragana: "サラダ", english: "salad" },
             { japanese: "スープ", hiragana: "スープ", english: "soup" },
             { japanese: "さくら", hiragana: "桜", english: "cherry blossom" },
             { japanese: "ふじさん", hiragana: "富士山", english: "Mount Fuji" },
             { japanese: "おんがく", hiragana: "音楽", english: "music" },
             { japanese: "ピアノ", hiragana: "ピアノ", english: "piano" },
             { japanese: "ひきます", hiragana: "弾きます", english: "play (instrument)" },
             { japanese: "ひく", hiragana: "弾く", english: "to play (instrument, dictionary)" },
             { japanese: "はなします", hiragana: "話します", english: "speak" },
             { japanese: "はなす", hiragana: "話す", english: "to speak (dictionary)" },
             { japanese: "べんきょうします", hiragana: "勉強します", english: "study" },
             { japanese: "べんきょうする", hiragana: "勉強する", english: "to study (dictionary)" },
             { japanese: "しごとします", hiragana: "仕事します", english: "work" },
             { japanese: "しごとする", hiragana: "仕事する", english: "to work (dictionary)" },
             { japanese: "おしえます", hiragana: "教えます", english: "teach" },
             { japanese: "おしえる", hiragana: "教える", english: "to teach (dictionary)" },
             { japanese: "きます", hiragana: "来ます", english: "come" },
             { japanese: "くる", hiragana: "来る", english: "to come (dictionary)" },
             { japanese: "また", hiragana: "また", english: "again" },
             { japanese: "もういちど", hiragana: "もう一度", english: "once more" },
             { japanese: "ざんねん", hiragana: "残念", english: "regrettable, pity" },
             { japanese: "うれしい", hiragana: "嬉しい", english: "happy, glad" }
           ],
           grammar: [
             { pattern: "[Plain verb] + [Noun]", meaning: "Relative clause - [noun] that [verb] - describes the noun with an action", example: "わたしが つくった ケーキ (the cake I made), きのう よんだ ほん (the book I read yesterday)", translation: "Using verbs to describe which specific noun we're talking about" },
             { pattern: "Past tense relative clauses", meaning: "Use plain past form (った/んだ/いた) before nouns", example: "きのう みた えいが (the movie I watched yesterday), せんしゅう かった ほん (the book I bought last week)", translation: "Describing completed actions that relate to nouns" },
             { pattern: "Present tense relative clauses", meaning: "Use dictionary form before nouns for habitual/general actions", example: "にほんごを はなす ひと (a person who speaks Japanese), ピアノを ひく ひと (a person who plays piano)", translation: "Describing general characteristics or abilities" },
             { pattern: "～と いいます", meaning: "It is called ~ / Someone says ~ - introducing names or quotes", example: "これは「さくら」と いいます。たなかさんは「きます」と いいました。", translation: "This is called 'sakura'. Mr. Tanaka said 'I will come'." },
             { pattern: "Reported speech structure", meaning: "「Quote」と いいます/いいました - what someone says/said", example: "せんせいは「しゅくだいを してください」と いいました。", translation: "The teacher said 'Please do your homework'." },
             { pattern: "Complex descriptions", meaning: "Combining multiple relative clauses for detailed descriptions", example: "きのう ともだちが つくって くれた ケーキ (the cake my friend made for me yesterday)", translation: "Building complex descriptive phrases using relative clauses" }
           ],
           reading: "これは わたしが きのう つくった カレーです。とても おいしいです。たなかさんは「また きます」と いいました。",
           readingTranslation: "This is the curry I made yesterday. It's very delicious. Mr. Tanaka said, 'I will come again'.",
           listening: [
             "この ひとは だれですか？ (Who is this person?)",
             "この ひとは ピアノを ひく ひとです。 (This person is someone who plays piano.)",
             "あ、この ひとは「おんがくが すき」と いいました。 (Ah, this person said 'I like music'.)",
             "きのう よんだ ほんは どうでしたか？ (How was the book you read yesterday?)",
             "Conversations using relative clauses to describe people and objects",
             "Reporting what people said using と言いました",
             "Asking about and describing past actions and experiences"
           ]
         },
         {
           lesson: 23,
           title: "Conditionals & Time Sequence (たら・前に・後で)",
           vocabulary: [
             { japanese: "あめ", hiragana: "雨", english: "rain" },
             { japanese: "ゆき", hiragana: "雪", english: "snow" },
             { japanese: "でかけます", hiragana: "出かけます", english: "go out" },
             { japanese: "でかける", hiragana: "出かける", english: "to go out (dictionary)" },
             { japanese: "でかけたら", hiragana: "出かけたら", english: "if go out" },
             { japanese: "じかん", hiragana: "時間", english: "time" },
             { japanese: "まえに", hiragana: "前に", english: "before" },
             { japanese: "あとで", hiragana: "後で", english: "after" },
             { japanese: "しょくじ", hiragana: "食事", english: "meal" },
             { japanese: "あさごはん", hiragana: "朝ごはん", english: "breakfast" },
             { japanese: "ひるごはん", hiragana: "昼ごはん", english: "lunch" },
             { japanese: "ばんごはん", hiragana: "晩ごはん", english: "dinner" },
             { japanese: "やすい", hiragana: "安い", english: "cheap" },
             { japanese: "やすかったら", hiragana: "安かったら", english: "if it's cheap" },
             { japanese: "いそがしい", hiragana: "忙しい", english: "busy" },
             { japanese: "いそがしかったら", hiragana: "忙しかったら", english: "if busy" },
             { japanese: "ひま", hiragana: "暇", english: "free (time)" },
             { japanese: "ひまだったら", hiragana: "暇だったら", english: "if free" },
             { japanese: "たかい", hiragana: "高い", english: "expensive" },
             { japanese: "たかかったら", hiragana: "高かったら", english: "if expensive" },
             { japanese: "あらいます", hiragana: "洗います", english: "wash" },
             { japanese: "あらう", hiragana: "洗う", english: "to wash (dictionary)" },
             { japanese: "て", hiragana: "手", english: "hand" },
             { japanese: "は", hiragana: "歯", english: "teeth" },
             { japanese: "みがきます", hiragana: "磨きます", english: "brush, polish" },
             { japanese: "みがく", hiragana: "磨く", english: "to brush (dictionary)" },
             { japanese: "さんぽ", hiragana: "散歩", english: "walk, stroll" },
             { japanese: "さんぽします", hiragana: "散歩します", english: "take a walk" },
             { japanese: "さんぽする", hiragana: "散歩する", english: "to take a walk (dictionary)" },
             { japanese: "しらべます", hiragana: "調べます", english: "check, investigate" },
             { japanese: "しらべる", hiragana: "調べる", english: "to check (dictionary)" },
             { japanese: "てんき", hiragana: "天気", english: "weather" },
             { japanese: "ゲーム", hiragana: "ゲーム", english: "game" },
             { japanese: "しゅくだい", hiragana: "宿題", english: "homework" },
             { japanese: "かいもの", hiragana: "買い物", english: "shopping" },
             { japanese: "そうじ", hiragana: "掃除", english: "cleaning" },
             { japanese: "せんたく", hiragana: "洗濯", english: "laundry" },
             { japanese: "シャワー", hiragana: "シャワー", english: "shower" },
             { japanese: "あびます", hiragana: "浴びます", english: "take (shower)" },
             { japanese: "あびる", hiragana: "浴びる", english: "to take (shower, dictionary)" },
             { japanese: "ねます", hiragana: "寝ます", english: "sleep, go to bed" },
             { japanese: "ねる", hiragana: "寝る", english: "to sleep (dictionary)" },
             { japanese: "おきます", hiragana: "起きます", english: "wake up, get up" },
             { japanese: "おきる", hiragana: "起きる", english: "to wake up (dictionary)" },
             { japanese: "もし", hiragana: "もし", english: "if (emphasis)" },
             { japanese: "～たら", hiragana: "～たら", english: "if/when ~ (conditional)" }
           ],
           grammar: [
             { pattern: "[Verb た-form] + ら", meaning: "If/when [verb] happens - conditional form", example: "あめが ふったら、いえに います。じかんが あったら、えいがを みます。", translation: "If it rains, I'll stay home. If I have time, I'll watch a movie." },
             { pattern: "[い-adjective stem] + かったら", meaning: "If [adjective] - conditional for i-adjectives", example: "やすかったら、かいます。いそがしかったら、いけません。", translation: "If it's cheap, I'll buy it. If I'm busy, I can't go." },
             { pattern: "[な-adjective/Noun] + だったら", meaning: "If [adjective/noun] - conditional for na-adjectives and nouns", example: "ひまだったら、あそびに きてください。げんきだったら、およぎましょう。", translation: "If you're free, please come hang out. If you're healthy, let's swim." },
             { pattern: "[Verb dictionary form] + まえに", meaning: "Before doing [verb]", example: "たべる まえに、てを あらいます。ねる まえに、はを みがきます。", translation: "Before eating, I wash my hands. Before sleeping, I brush my teeth." },
             { pattern: "[Verb た-form] + あとで", meaning: "After doing [verb]", example: "しょくじした あとで、さんぽします。べんきょうした あとで、ゲームをします。", translation: "After eating, I take a walk. After studying, I play games." },
             { pattern: "[Noun] + の + まえに/あとで", meaning: "Before/after [noun]", example: "がっこうの まえに、あさごはんを たべます。しごとの あとで、ともだちと あいます。", translation: "Before school, I eat breakfast. After work, I meet with friends." }
           ],
           reading: "あめが ふったら、でかけません。でかける まえに、てんきを しらべます。かいものを した あとで、ひるごはんを たべました。",
           readingTranslation: "If it rains, I won't go out. Before going out, I check the weather. After shopping, I ate lunch.",
           listening: [
             "やすかったら、なにを かいますか？ (If it's cheap, what will you buy?)",
             "にほんへ いく まえに、にほんごを べんきょうします。 (I will study Japanese before going to Japan.)",
             "しゅくだいを した あとで、ゲームを しても いいですか？ (Can I play games after finishing homework?)",
             "もし じかんが あったら、いっしょに いきませんか？ (If you have time, won't you go together?)",
             "Conditional conversations about plans and activities",
             "Sequencing daily activities using before and after",
             "Weather-related conditional statements"
           ]
         },
         {
           lesson: 24,
           title: "Honorifics & Hearsay (られます・そうです)",
           vocabulary: [
             { japanese: "そうです", hiragana: "そうです", english: "I heard that / It looks like" },
             { japanese: "けっこん", hiragana: "結婚", english: "marriage" },
             { japanese: "けっこんします", hiragana: "結婚します", english: "get married" },
             { japanese: "けっこんする", hiragana: "結婚する", english: "to get married (dictionary)" },
             { japanese: "いかれます", hiragana: "行かれます", english: "go (honorific)" },
             { japanese: "こられます", hiragana: "来られます", english: "come (honorific)" },
             { japanese: "おられます", hiragana: "おられます", english: "be (honorific)" },
             { japanese: "せんせい", hiragana: "先生", english: "teacher" },
             { japanese: "しゃちょう", hiragana: "社長", english: "company president" },
             { japanese: "かいぎ", hiragana: "会議", english: "meeting" },
             { japanese: "アメリカ", hiragana: "アメリカ", english: "America" },
             { japanese: "ちゅうごく", hiragana: "中国", english: "China" },
             { japanese: "かんこく", hiragana: "韓国", english: "Korea" },
             { japanese: "らいしゅう", hiragana: "来週", english: "next week" },
             { japanese: "らいねん", hiragana: "来年", english: "next year" },
             { japanese: "らいげつ", hiragana: "来月", english: "next month" },
             { japanese: "たのしい", hiragana: "楽しい", english: "fun, enjoyable" },
             { japanese: "たのしそう", hiragana: "楽しそう", english: "looks fun" },
             { japanese: "かなしい", hiragana: "悲しい", english: "sad" },
             { japanese: "かなしそう", hiragana: "悲しそう", english: "looks sad" },
             { japanese: "おいしい", hiragana: "おいしい", english: "delicious" },
             { japanese: "おいしそう", hiragana: "おいしそう", english: "looks delicious" },
             { japanese: "あつい", hiragana: "熱い", english: "hot" },
             { japanese: "あつそう", hiragana: "熱そう", english: "looks hot" },
             { japanese: "つめたい", hiragana: "冷たい", english: "cold" },
             { japanese: "つめたそう", hiragana: "冷たそう", english: "looks cold" },
             { japanese: "いそがしい", hiragana: "忙しい", english: "busy" },
             { japanese: "いそがしそう", hiragana: "忙しそう", english: "looks busy" },
             { japanese: "しずか", hiragana: "静か", english: "quiet" },
             { japanese: "しずかそう", hiragana: "静かそう", english: "looks quiet" },
             { japanese: "げんき", hiragana: "元気", english: "healthy, energetic" },
             { japanese: "げんきそう", hiragana: "元気そう", english: "looks healthy/energetic" },
             { japanese: "ケーキ", hiragana: "ケーキ", english: "cake" },
             { japanese: "スープ", hiragana: "スープ", english: "soup" },
             { japanese: "コーヒー", hiragana: "コーヒー", english: "coffee" },
             { japanese: "アイスクリーム", hiragana: "アイスクリーム", english: "ice cream" },
             { japanese: "やまだ", hiragana: "山田", english: "Yamada (surname)" },
             { japanese: "たなか", hiragana: "田中", english: "Tanaka (surname)" },
             { japanese: "かえります", hiragana: "帰ります", english: "return, go home" },
             { japanese: "かえる", hiragana: "帰る", english: "to return (dictionary)" },
             { japanese: "でんせつ", hiragana: "伝説", english: "legend, story" },
             { japanese: "うわさ", hiragana: "うわさ", english: "rumor" },
             { japanese: "ニュース", hiragana: "ニュース", english: "news" },
             { japanese: "しんぶん", hiragana: "新聞", english: "newspaper" }
           ],
           grammar: [
             { pattern: "[Plain form] + そうです (hearsay)", meaning: "I heard that... - reporting information you heard from others", example: "たなかさんは けっこんするそうです。らいしゅう あめが ふるそうです。", translation: "I heard Tanaka-san is getting married. I heard it will rain next week." },
             { pattern: "[Adjective/Verb stem] + そうです (appearance)", meaning: "It looks/seems... - describing how something appears", example: "あの ケーキは おいしそうです。あの ひとは かなしそうです。", translation: "That cake looks delicious. That person looks sad." },
             { pattern: "Honorific forms with られます", meaning: "Respectful form for others' actions - いきます→いかれます, きます→こられます, います→おられます", example: "せんせいは アメリカへ いかれます。しゃちょうは かいぎに こられます。", translation: "The teacher will go to America. The president will come to the meeting." },
             { pattern: "[Noun/な-adjective] + だそうです", meaning: "I heard it is [noun/adjective]", example: "たなかさんは いしゃだそうです。このレストランは ゆうめいだそうです。", translation: "I heard Tanaka-san is a doctor. I heard this restaurant is famous." },
             { pattern: "Hearsay vs Appearance そうです", meaning: "Plain form + そうです = hearsay, Stem + そうです = appearance", example: "あめが ふるそうです (I heard it will rain) vs あめが ふりそうです (It looks like it will rain)", translation: "Different meanings based on verb form used" },
             { pattern: "Honorific question forms", meaning: "Using られます in questions for polite inquiry", example: "せんせいは いつ こられますか。しゃちょうは なんじに いかれますか。", translation: "When will the teacher come? What time will the president go?" }
           ],
           reading: "せんせいは らいしゅう アメリカへ いかれるそうです。あの ケーキは とても おいしそうです。たなかさんは らいねん けっこんするそうです。",
           readingTranslation: "I heard the teacher is going to America next week. That cake looks very delicious. I heard Tanaka-san is getting married next year.",
           listening: [
             "やまださんは にほんに かえるそうです。 (I heard Yamada-san is returning to Japan.)",
             "しゃちょうは かいぎに こられます。 (The company president will come to the meeting.)",
             "この スープは あつそうです。 (This soup looks hot.)",
             "あの ひとは いそがしそうですね。 (That person looks busy, doesn't he/she?)",
             "Conversations reporting hearsay and rumors",
             "Polite discussions using honorific forms",
             "Describing appearances and impressions of things and people"
           ]
         },
         {
           lesson: 25,
           title: "Thoughts & Reported Speech (と思います・と言いました)",
           vocabulary: [
             { japanese: "おもいます", hiragana: "思います", english: "to think" },
             { japanese: "おもう", hiragana: "思う", english: "to think (dictionary)" },
             { japanese: "いいます", hiragana: "言います", english: "to say" },
             { japanese: "いう", hiragana: "言う", english: "to say (dictionary)" },
             { japanese: "しっています", hiragana: "知っています", english: "to know" },
             { japanese: "しる", hiragana: "知る", english: "to know (dictionary)" },
             { japanese: "わかりません", hiragana: "わかりません", english: "I don't know" },
             { japanese: "わからない", hiragana: "わからない", english: "don't know (plain)" },
             { japanese: "くる", hiragana: "来る", english: "to come (dictionary)" },
             { japanese: "いく", hiragana: "行く", english: "to go (dictionary)" },
             { japanese: "しゅっちょう", hiragana: "出張", english: "business trip" },
             { japanese: "しゅっちょうします", hiragana: "出張します", english: "go on business trip" },
             { japanese: "ぶちょう", hiragana: "部長", english: "manager, department head" },
             { japanese: "かちょう", hiragana: "課長", english: "section chief" },
             { japanese: "しゃちょう", hiragana: "社長", english: "company president" },
             { japanese: "なんじ", hiragana: "何時", english: "what time" },
             { japanese: "なんようび", hiragana: "何曜日", english: "what day of the week" },
             { japanese: "なんがつ", hiragana: "何月", english: "what month" },
             { japanese: "どこ", hiragana: "どこ", english: "where" },
             { japanese: "だれ", hiragana: "誰", english: "who" },
             { japanese: "なに", hiragana: "何", english: "what" },
             { japanese: "いつ", hiragana: "いつ", english: "when" },
             { japanese: "どうして", hiragana: "どうして", english: "why" },
             { japanese: "どのくらい", hiragana: "どのくらい", english: "how much/long" },
             { japanese: "かどうか", hiragana: "かどうか", english: "whether or not" },
             { japanese: "あした", hiragana: "明日", english: "tomorrow" },
             { japanese: "きょう", hiragana: "今日", english: "today" },
             { japanese: "らいねん", hiragana: "来年", english: "next year" },
             { japanese: "らいげつ", hiragana: "来月", english: "next month" },
             { japanese: "あめ", hiragana: "雨", english: "rain" },
             { japanese: "ゆき", hiragana: "雪", english: "snow" },
             { japanese: "はれ", hiragana: "晴れ", english: "clear weather" },
             { japanese: "くもり", hiragana: "曇り", english: "cloudy" },
             { japanese: "てんき", hiragana: "天気", english: "weather" },
             { japanese: "しけん", hiragana: "試験", english: "exam, test" },
             { japanese: "しゅくだい", hiragana: "宿題", english: "homework" },
             { japanese: "かいぎ", hiragana: "会議", english: "meeting" },
             { japanese: "やくそく", hiragana: "約束", english: "promise, appointment" },
             { japanese: "けっこん", hiragana: "結婚", english: "marriage" },
             { japanese: "りょこう", hiragana: "旅行", english: "trip, travel" },
             { japanese: "パーティー", hiragana: "パーティー", english: "party" },
             { japanese: "えいが", hiragana: "映画", english: "movie" },
             { japanese: "コンサート", hiragana: "コンサート", english: "concert" },
             { japanese: "にほんご", hiragana: "日本語", english: "Japanese language" },
             { japanese: "えいご", hiragana: "英語", english: "English language" }
           ],
           grammar: [
             { pattern: "[Plain form] + と思います", meaning: "I think that... - expressing personal opinion or prediction", example: "やまださんは くると おもいます。あした あめが ふると おもいます。", translation: "I think Yamada-san will come. I think it will rain tomorrow." },
             { pattern: "[Plain form] + と言いました", meaning: "(Someone) said that... - reporting what someone said using direct/indirect speech", example: "たなかさんは「いきません」と いいました。ぶちょうは しゅっちょうすると いいました。", translation: "Tanaka-san said 'I won't go.' The manager said he will go on a business trip." },
             { pattern: "[Question word] + [plain form] + か、わかりません", meaning: "I don't know [who/when/where/etc.] - expressing uncertainty about WH-questions", example: "やまださんが どこに いるか わかりません。なんじに くるか しっていますか。", translation: "I don't know where Yamada-san is. Do you know what time they will come?" },
             { pattern: "[Verb/plain form] + かどうか、わかりません", meaning: "I don't know whether or not... - expressing uncertainty about yes/no questions", example: "くるかどうか わかりません。にほんごが わかるかどうか きいてください。", translation: "I don't know whether he will come or not. Please ask whether they understand Japanese." },
             { pattern: "Plain form vs Polite form with と思います", meaning: "Always use plain form before と思います, regardless of the politeness level of the main sentence", example: "せんせいは くると おもいます。(not きますと おもいます)", translation: "I think the teacher will come." },
             { pattern: "Embedded questions with か", meaning: "Transform questions into embedded clauses for indirect speech", example: "「だれが きますか」→ だれが くるか わかりません", translation: "'Who will come?' → I don't know who will come." }
           ],
           reading: "わたしは やまださんが くると おもいます。でも、たなかさんは こないと いいました。やまださんが どこに いるか、わかりません。",
           readingTranslation: "I think Mr. Yamada will come. But Mr. Tanaka said he won't come. I don't know where Mr. Yamada is.",
           listening: [
             "あした あめが ふるかどうか、わかりません。 (I don't know whether it will rain tomorrow.)",
             "せんせいは なんじに くるか しっていますか。 (Do you know what time the teacher will come?)",
             "ぶちょうは しゅっちょうすると いいました。 (The manager said he will go on a business trip.)",
             "けっこんするかどうか、まだ わかりません。 (I don't know yet whether I'll get married.)",
             "Conversations about expressing opinions and thoughts",
             "Reporting what others have said in various contexts",
             "Asking and expressing uncertainty about future events and plans"
           ]
         }
         // Additional lessons would continue with similar structure...
  ];

  // Get current lesson data
  const currentLesson = lessons.find(l => l.lesson === selectedLesson) || lessons[0];

  // Games data for each lesson
  const games: Game[] = [
    {
      id: 'flashcards',
      title: '🃏 Vocabulary Flashcards',
      description: 'Practice vocabulary with digital flashcards',
      type: 'vocabulary'
    },
    {
      id: 'grammar-fill',
      title: '📝 Grammar Fill-in-the-Blank',
      description: 'Complete sentences using correct grammar patterns',
      type: 'grammar'
    },
    {
      id: 'pronunciation',
      title: '🎤 Pronunciation Practice',
      description: 'Record and compare your pronunciation',
      type: 'speaking'
    },
    {
      id: 'listening-quiz',
      title: '🎧 Listening Comprehension',
      description: 'Listen and answer questions',
      type: 'listening'
    },
    {
      id: 'reading-race',
      title: '⚡ Speed Reading',
      description: 'Read passages and answer quickly',
      type: 'reading'
    },
    {
      id: 'memory-match',
      title: '🧠 Memory Matching',
      description: 'Match Japanese words with meanings',
      type: 'memory'
    }
  ];

  // Exam questions for current lesson
  const generateExamQuestions = (): ExamQuestion[] => {
    const questions: ExamQuestion[] = [];
    
    // Vocabulary questions
    currentLesson.vocabulary.slice(0, 5).forEach((vocab, index) => {
      questions.push({
        type: 'vocabulary',
        question: `What does "${vocab.japanese}" mean?`,
        options: [
          vocab.english,
          'wrong answer 1',
          'wrong answer 2',
          'wrong answer 3'
        ].sort(() => Math.random() - 0.5),
        correct: vocab.english
      });
    });

    // Grammar questions
    currentLesson.grammar.slice(0, 3).forEach((grammar, index) => {
      questions.push({
        type: 'grammar',
        question: `Complete the sentence: わたし＿がくせいです。`,
        options: ['は', 'が', 'を', 'に'],
        correct: 'は'
      });
    });

    return questions;
  };

  const examQuestions = generateExamQuestions();

  const startGame = (gameType: string) => {
    setGameMode(gameType);
    setGameScore(0);
    setTimeLeft(gameType === 'reading-race' ? 60 : 30);
  };

  const startExam = () => {
    setExamMode(true);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer('');
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === examQuestions[currentQuestion]?.correct) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < examQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
      } else {
        setExamMode(false);
        alert(`Exam completed! Score: ${score + (answer === examQuestions[currentQuestion]?.correct ? 1 : 0)}/${examQuestions.length}`);
      }
    }, 1000);
  };

  // Timer effect for games
  useEffect(() => {
    if (gameMode && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameMode && timeLeft === 0) {
      setGameMode('');
      alert(`Game Over! Final Score: ${gameScore}`);
    }
  }, [gameMode, timeLeft, gameScore]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">📚 Minna no Nihongo N5 Lessons</h1>
              <p className="text-xl opacity-90">Complete 25 lessons with integrated practice</p>
            </div>
            <Link 
              to="/language/jlpt-n5"
              className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg hover:bg-white/30 transition-all flex items-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to N5 Course</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Lesson Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sticky top-4">
              <h3 className="text-xl font-bold text-white mb-4">📋 Lessons</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {Array.from({ length: 25 }, (_, i) => i + 1).map((lessonNum) => (
                  <button
                    key={lessonNum}
                    onClick={() => setSelectedLesson(lessonNum)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedLesson === lessonNum
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    <div className="font-semibold">Lesson {lessonNum}</div>
                    <div className="text-sm opacity-80">
                                                                                                 {lessonNum <= 25 ? lessons[lessonNum - 1]?.title : `Lesson ${lessonNum} Content`}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Navigation Tabs */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 mb-6">
              <div className="flex space-x-2">
                {[
                  { id: 'vocabulary', label: 'Vocabulary (たんご)', icon: '📚' },
                  { id: 'grammar', label: 'Grammar (ぶんぽう)', icon: '📖' },
                  { id: 'reading', label: 'Reading (どくしょ)', icon: '📄' },
                  { id: 'listening', label: 'Listening (ちょうかい)', icon: '🎧' },
                  { id: 'games', label: 'Games & Practice', icon: '🎮' },
                  { id: 'exam', label: 'Lesson Exam', icon: '📝' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSection(tab.id)}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                      activeSection === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-lg mb-1">{tab.icon}</div>
                    <div className="text-sm">{tab.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Sections */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              {/* Lesson Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  🗂️ Minna no Nihongo Lesson {selectedLesson} Overview
                </h2>
                <p className="text-xl text-white/80">{currentLesson.title}</p>
              </div>

              {/* Vocabulary Section */}
              {activeSection === 'vocabulary' && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">📘 1. Vocabulary (たんご)</h3>
                  
                  {/* Special Counters Button for Lesson 13 */}
                  {selectedLesson === 13 && (
                    <div className="mb-6">
                      <button
                        onClick={() => setShowCountersModal(true)}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center space-x-2"
                      >
                        <span>📊</span>
                        <span>Counters & Quantities</span>
                      </button>
                    </div>
                  )}
                  
                  <div className="overflow-x-auto">
                    <table className="w-full bg-white/20 rounded-lg">
                      <thead>
                        <tr className="bg-white/10">
                          <th className="px-6 py-3 text-left text-white font-bold">Japanese</th>
                          <th className="px-6 py-3 text-left text-white font-bold">Hiragana</th>
                          <th className="px-6 py-3 text-left text-white font-bold">English</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentLesson.vocabulary.map((word, index) => (
                          <tr key={index} className="border-b border-white/10 hover:bg-white/10">
                            <td className="px-6 py-4 text-white font-medium">{word.japanese}</td>
                            <td className="px-6 py-4 text-white/80">{word.hiragana}</td>
                            <td className="px-6 py-4 text-white/80">{word.english}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Grammar Section */}
              {activeSection === 'grammar' && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">🧠 2. Grammar Points (ぶんぽう)</h3>
                  <div className="space-y-6">
                    {currentLesson.grammar.map((rule, index) => (
                      <div key={index} className="bg-white/20 rounded-lg p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                            {index + 1}
                          </span>
                          <h4 className="text-xl font-bold text-white">{rule.pattern}</h4>
                        </div>
                        <p className="text-white/80 mb-3">Meaning: {rule.meaning}</p>
                        <div className="bg-white/10 rounded-lg p-4">
                          <p className="text-white font-medium">Example: {rule.example}</p>
                          <p className="text-white/70 mt-2">Translation: {rule.translation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reading Section */}
              {activeSection === 'reading' && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">📖 3. Reading Practice (どくしょ)</h3>
                  <div className="space-y-6">
                    <div className="bg-white/20 rounded-lg p-6">
                      <h4 className="text-lg font-bold text-white mb-4">Sample Reading Text:</h4>
                      <div className="bg-white/10 rounded-lg p-4 mb-4">
                        <p className="text-white text-lg leading-relaxed">{currentLesson.reading}</p>
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2">Translation:</h4>
                      <p className="text-white/80">{currentLesson.readingTranslation}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Listening Section */}
              {activeSection === 'listening' && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">🎧 4. Listening Practice (ちょうかい)</h3>
                  <div className="space-y-6">
                    <div className="bg-white/20 rounded-lg p-6">
                      <h4 className="text-lg font-bold text-white mb-4">Example Audio Questions:</h4>
                      <div className="space-y-4">
                        {currentLesson.listening.map((item, index) => (
                          <div key={index} className="bg-white/10 rounded-lg p-4 flex items-center space-x-4">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-colors">
                              <Play className="w-5 h-5" />
                            </button>
                            <span className="text-white">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Games Section */}
              {activeSection === 'games' && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">🎮 Interactive Games & Practice</h3>
                  
                  {!gameMode ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {games.map((game) => (
                        <div key={game.id} className="bg-white/20 rounded-lg p-6 hover:bg-white/30 transition-all">
                          <h4 className="text-xl font-bold text-white mb-3">{game.title}</h4>
                          <p className="text-white/80 mb-4">{game.description}</p>
                          <button
                            onClick={() => startGame(game.id)}
                            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-bold hover:from-green-600 hover:to-blue-600 transition-all"
                          >
                            Start Game
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white/20 rounded-lg p-8">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-2xl font-bold text-white">
                          {games.find(g => g.id === gameMode)?.title}
                        </h4>
                        <div className="flex items-center space-x-4">
                          <div className="text-white">
                            <Timer className="w-5 h-5 inline mr-2" />
                            {timeLeft}s
                          </div>
                          <div className="text-white">
                            <Star className="w-5 h-5 inline mr-2" />
                            {gameScore}
                          </div>
                          <button
                            onClick={() => setGameMode('')}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                          >
                            Exit
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-center text-white">
                        <p className="text-lg mb-4">Game in progress...</p>
                        <p className="text-white/80">Practice with vocabulary and grammar from Lesson {selectedLesson}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Exam Section */}
              {activeSection === 'exam' && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">📝 Lesson {selectedLesson} Exam</h3>
                  
                  {!examMode ? (
                    <div className="text-center">
                      <div className="bg-white/20 rounded-lg p-8 mb-6">
                        <h4 className="text-xl font-bold text-white mb-4">Ready for your exam?</h4>
                        <p className="text-white/80 mb-6">
                          Test your knowledge of Lesson {selectedLesson} vocabulary and grammar.
                          {examQuestions.length} questions • 10 minutes
                        </p>
                        <button
                          onClick={startExam}
                          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all"
                        >
                          Start Exam
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white/20 rounded-lg p-8">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-xl font-bold text-white">
                          Question {currentQuestion + 1} of {examQuestions.length}
                        </h4>
                        <div className="text-white">Score: {score}/{examQuestions.length}</div>
                      </div>

                      {examQuestions[currentQuestion] && (
                        <div>
                          <h5 className="text-lg font-medium text-white mb-6">
                            {examQuestions[currentQuestion].question}
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {examQuestions[currentQuestion].options.map((option: string, index: number) => (
                              <button
                                key={index}
                                onClick={() => handleAnswerSelect(option)}
                                disabled={selectedAnswer !== ''}
                                className={`p-4 rounded-lg text-left transition-all ${
                                  selectedAnswer === option
                                    ? option === examQuestions[currentQuestion].correct
                                      ? 'bg-green-500 text-white'
                                      : 'bg-red-500 text-white'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Counters & Quantities Modal */}
      {showCountersModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">📊 Japanese Counters & Quantities Reference</h2>
              <button
                onClick={() => setShowCountersModal(false)}
                className="text-white hover:text-gray-200 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold">Category</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold">Counter (Kanji)</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold">Reading</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold">Usage Description</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold">Example Objects / Notes</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold">Special Readings (1,3,6,8,10)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">General small things</td>
                      <td className="border border-gray-300 px-4 py-3 font-medium">つ</td>
                      <td className="border border-gray-300 px-4 py-3">ひとつ, ふたつ, みっつ...</td>
                      <td className="border border-gray-300 px-4 py-3">General things, often small or abstract</td>
                      <td className="border border-gray-300 px-4 py-3">もの (things), りんご (apple)</td>
                      <td className="border border-gray-300 px-4 py-3">No special reading</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">People</td>
                      <td className="border border-gray-300 px-4 py-3 font-medium">人</td>
                      <td className="border border-gray-300 px-4 py-3">ひとり, ふたり, さんにん...</td>
                      <td className="border border-gray-300 px-4 py-3">Counting people</td>
                      <td className="border border-gray-300 px-4 py-3">ともだち (friends), かぞく (family)</td>
                      <td className="border border-gray-300 px-4 py-3">ひとり (1), ふたり (2) special</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Small animals</td>
                      <td className="border border-gray-300 px-4 py-3 font-medium">匹</td>
                      <td className="border border-gray-300 px-4 py-3">いっぴき, にひき, さんびき...</td>
                      <td className="border border-gray-300 px-4 py-3">Small animals (cats, dogs, fish)</td>
                      <td className="border border-gray-300 px-4 py-3">ねこ (cat), いぬ (dog)</td>
                      <td className="border border-gray-300 px-4 py-3">いっぴき (1), さんびき (3) special</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Large animals</td>
                      <td className="border border-gray-300 px-4 py-3 font-medium">頭</td>
                      <td className="border border-gray-300 px-4 py-3">いっとう, にとう, さんとう...</td>
                      <td className="border border-gray-300 px-4 py-3">Large animals (cows, horses)</td>
                      <td className="border border-gray-300 px-4 py-3">うし (cow), うま (horse)</td>
                      <td className="border border-gray-300 px-4 py-3">No special reading</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Birds and rabbits</td>
                      <td className="border border-gray-300 px-4 py-3 font-medium">羽</td>
                      <td className="border border-gray-300 px-4 py-3">いちわ, にわ, さんわ...</td>
                      <td className="border border-gray-300 px-4 py-3">Birds, rabbits</td>
                      <td className="border border-gray-300 px-4 py-3">とり (bird), うさぎ (rabbit)</td>
                      <td className="border border-gray-300 px-4 py-3">No special reading</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Flat objects</td>
                      <td className="border border-gray-300 px-4 py-3 font-medium">枚</td>
                      <td className="border border-gray-300 px-4 py-3">いちまい, にまい, さんまい...</td>
                      <td className="border border-gray-300 px-4 py-3">Thin, flat objects</td>
                      <td className="border border-gray-300 px-4 py-3">かみ (paper), シャツ (shirt)</td>
                      <td className="border border-gray-300 px-4 py-3">No special reading</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Long cylindrical objects</td>
                      <td className="border border-gray-300 px-4 py-3 font-medium">本</td>
                      <td className="border border-gray-300 px-4 py-3">いっぽん, にほん, さんぼん...</td>
                      <td className="border border-gray-300 px-4 py-3">Bottles, pencils, trees</td>
                      <td className="border border-gray-300 px-4 py-3">ペン (pen), ビール (beer bottle)</td>
                      <td className="border border-gray-300 px-4 py-3">いっぽん (1), さんぼん (3), ろっぽん (6), はっぽん (8) special readings</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Bound volumes</td>
                      <td className="border border-gray-300 px-4 py-3 font-medium">冊</td>
                      <td className="border border-gray-300 px-4 py-3">いっさつ, にさつ, さんさつ...</td>
                      <td className="border border-gray-300 px-4 py-3">Books, magazines, notebooks</td>
                      <td className="border border-gray-300 px-4 py-3">本 (book), ノート (notebook)</td>
                      <td className="border border-gray-300 px-4 py-3">No special reading</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Cups, glasses, bowls</td>
                      <td className="border border-gray-300 px-4 py-3 font-medium">杯</td>
                      <td className="border border-gray-300 px-4 py-3">いっぱい, にはい, さんばい...</td>
                      <td className="border border-gray-300 px-4 py-3">Drinks and bowls</td>
                      <td className="border border-gray-300 px-4 py-3">コーヒー (coffee), さけ (sake)</td>
                      <td className="border border-gray-300 px-4 py-3">いっぱい (1), さんばい (3), ろっぱい (6), はっぱい (8) special readings</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Machines, vehicles</td>
                      <td className="border border-gray-300 px-4 py-3 font-medium">台</td>
                      <td className="border border-gray-300 px-4 py-3">いちだい, にだい, さんだい...</td>
                      <td className="border border-gray-300 px-4 py-3">Machines, vehicles</td>
                      <td className="border border-gray-300 px-4 py-3">くるま (car), じてんしゃ (bicycle)</td>
                      <td className="border border-gray-300 px-4 py-3">No special reading</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Floors (levels)</td>
                      <td className="border border-gray-300 px-4 py-3 font-medium">階</td>
                      <td className="border border-gray-300 px-4 py-3">いっかい, にかい, さんがい...</td>
                      <td className="border border-gray-300 px-4 py-3">Floors of buildings</td>
                      <td className="border border-gray-300 px-4 py-3">たてもの (building)</td>
                      <td className="border border-gray-300 px-4 py-3">さんがい (3rd floor) special reading</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Occurrences, frequency</td>
                      <td className="border border-gray-300 px-4 py-3 font-medium">回</td>
                      <td className="border border-gray-300 px-4 py-3">いっかい, にかい, さんかい...</td>
                      <td className="border border-gray-300 px-4 py-3">Number of times</td>
                      <td className="border border-gray-300 px-4 py-3">りょこう (trip), しゅくだい (homework)</td>
                      <td className="border border-gray-300 px-4 py-3">いっかい (1) special reading</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Small machines or units</td>
                      <td className="border border-gray-300 px-4 py-3 font-medium">個</td>
                      <td className="border border-gray-300 px-4 py-3">いっこ, にこ, さんこ...</td>
                      <td className="border border-gray-300 px-4 py-3">Small, round objects</td>
                      <td className="border border-gray-300 px-4 py-3">たまご (egg), りんご (apple)</td>
                      <td className="border border-gray-300 px-4 py-3">No special reading</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Books, papers, documents</td>
                      <td className="border border-gray-300 px-4 py-3 font-medium">箇所 / 箇所</td>
                      <td className="border border-gray-300 px-4 py-3">いっかしょ, にかしょ...</td>
                      <td className="border border-gray-300 px-4 py-3">Places, points</td>
                      <td className="border border-gray-300 px-4 py-3">けんさ (inspection points), しょるい (documents)</td>
                      <td className="border border-gray-300 px-4 py-3">No special reading</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Pairs</td>
                      <td className="border border-gray-300 px-4 py-3 font-medium">双 / 対</td>
                      <td className="border border-gray-300 px-4 py-3">いっそう, にそう, さんそう / いっつい, につい...</td>
                      <td className="border border-gray-300 px-4 py-3">Pairs (shoes, gloves)</td>
                      <td className="border border-gray-300 px-4 py-3">くつ (shoes), てぶくろ (gloves)</td>
                      <td className="border border-gray-300 px-4 py-3">No special reading</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Buildings</td>
                      <td className="border border-gray-300 px-4 py-3 font-medium">棟</td>
                      <td className="border border-gray-300 px-4 py-3">いっとう, にとう...</td>
                      <td className="border border-gray-300 px-4 py-3">Buildings</td>
                      <td className="border border-gray-300 px-4 py-3">いえ (house), ビル (building)</td>
                      <td className="border border-gray-300 px-4 py-3">No special reading</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Ships, boats</td>
                      <td className="border border-gray-300 px-4 py-3 font-medium">艘</td>
                      <td className="border border-gray-300 px-4 py-3">いっそう, にそう...</td>
                      <td className="border border-gray-300 px-4 py-3">Ships, boats</td>
                      <td className="border border-gray-300 px-4 py-3">ふね (ship), ボート (boat)</td>
                      <td className="border border-gray-300 px-4 py-3">No special reading</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Long thin flat objects</td>
                      <td className="border border-gray-300 px-4 py-3 font-medium">枝</td>
                      <td className="border border-gray-300 px-4 py-3">いっし, にし...</td>
                      <td className="border border-gray-300 px-4 py-3">Sticks, branches</td>
                      <td className="border border-gray-300 px-4 py-3">えだ (branch), つえ (cane)</td>
                      <td className="border border-gray-300 px-4 py-3">No special reading</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Documents, contracts</td>
                      <td className="border border-gray-300 px-4 py-3 font-medium">通</td>
                      <td className="border border-gray-300 px-4 py-3">いつう, につう...</td>
                      <td className="border border-gray-300 px-4 py-3">Copies of documents</td>
                      <td className="border border-gray-300 px-4 py-3">けいやくしょ (contract)</td>
                      <td className="border border-gray-300 px-4 py-3">No special reading</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-blue-800 mb-2">💡 Study Tips:</h3>
                <ul className="text-blue-700 space-y-1">
                  <li>• Focus on the most common counters first: つ, 人, 本, 冊, 杯, 回</li>
                  <li>• Pay special attention to irregular readings (いっぽん, さんぼん, いっぱい, さんばい)</li>
                  <li>• Practice by counting objects around you using the appropriate counter</li>
                  <li>• Remember that some counters change pronunciation based on the number (euphonic changes)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MinnaNoNihongoLessons; 