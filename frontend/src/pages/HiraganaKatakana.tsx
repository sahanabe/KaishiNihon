import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Brain, 
  Clock, 
  Award, 
  PlayCircle, 
  ChevronRight,
  ChevronLeft,
  Volume2,
  Pen,
  Lightbulb,
  ArrowLeft,
  Mic,
  Check,
  X,
  Home
} from 'lucide-react';
import MemoryCardGame from '../components/MemoryCardGame';
import SpeedRecognitionGame from '../components/SpeedRecognitionGame';
import StrokePuzzle from '../components/StrokePuzzle';
import JapaneseTest from '../components/JapaneseTest';

const HiraganaKatakana: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentScript, setCurrentScript] = useState<'hiragana' | 'katakana'>('hiragana');
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [showMemoryGame, setShowMemoryGame] = useState(false);
  const [showSpeedGame, setShowSpeedGame] = useState(false);
  const [showStrokePuzzle, setShowStrokePuzzle] = useState(false);
  const [userProgress] = useState({
    hiragana: { learned: 0, mastered: 0 },
    katakana: { learned: 0, mastered: 0 }
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [feedback, setFeedback] = useState<string>('Practice drawing this character. Use the animation as a guide for proper stroke order.');
  const [feedbackType, setFeedbackType] = useState<'positive' | 'negative' | 'neutral'>('neutral');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Stroke Order Practice State
  const [strokeOrderMode, setStrokeOrderMode] = useState<'learn' | 'practice'>('learn');
  const [currentStrokeIndex, setCurrentStrokeIndex] = useState(0);
  const [userStrokes, setUserStrokes] = useState<Array<Array<[number, number]>>>([]);
  const [drawingPath, setDrawingPath] = useState<Array<[number, number]>>([]);
  const [strokeOrderScore, setStrokeOrderScore] = useState(0);
  const [showStrokeGuide, setShowStrokeGuide] = useState(true);
  const [practiceMode, setPracticeMode] = useState<'free' | 'guided' | 'challenge'>('guided');

  // Reset stroke order practice when character changes
  useEffect(() => {
    if (activeTab === 'stroke-order') {
      resetStrokeOrderPractice();
    }
  }, [currentCharacterIndex, currentScript]);

  // Complete Hiragana characters with stroke order and mnemonics  
  const hiraganaCharacters: Array<{
    char: string;
    romaji: string;
    sound: string;
    mnemonic: string;
    strokes: number;
    group: string;
    strokePaths?: number[][][];
  }> = [
    // Basic Hiragana (Gojuon Table – あ～ん)
    // Vowels (あいうえお)
    { char: 'あ', romaji: 'a', sound: '/a/', mnemonic: 'A woman with Arms open wide', strokes: 3, group: 'vowels' },
    { char: 'い', romaji: 'i', sound: '/i/', mnemonic: 'Two sticks like roman numeral II', strokes: 2, group: 'vowels' },
    { char: 'う', romaji: 'u', sound: '/u/', mnemonic: 'A smiling face with a Unibrow', strokes: 2, group: 'vowels' },
    { char: 'え', romaji: 'e', sound: '/e/', mnemonic: 'An Exotic bird with a long neck', strokes: 2, group: 'vowels' },
    { char: 'お', romaji: 'o', sound: '/o/', mnemonic: 'UFO with Orbit lines around it', strokes: 3, group: 'vowels' },
    
    // K-sounds (かきくけこ)
    { char: 'か', romaji: 'ka', sound: '/ka/', mnemonic: 'A Karate chop breaking a stick', strokes: 3, group: 'k-sounds' },
    { char: 'き', romaji: 'ki', sound: '/ki/', mnemonic: 'A Key with teeth pointing up', strokes: 4, group: 'k-sounds' },
    { char: 'く', romaji: 'ku', sound: '/ku/', mnemonic: 'A bird\'s beak saying "Coo"', strokes: 1, group: 'k-sounds' },
    { char: 'け', romaji: 'ke', sound: '/ke/', mnemonic: 'A Keg on its side', strokes: 3, group: 'k-sounds' },
    { char: 'こ', romaji: 'ko', sound: '/ko/', mnemonic: 'Two horizontal lines like a Comb', strokes: 2, group: 'k-sounds' },
    
    // S-sounds (さしすせそ)
    { char: 'さ', romaji: 'sa', sound: '/sa/', mnemonic: 'A Samurai\'s sword cutting down', strokes: 3, group: 's-sounds' },
    { char: 'し', romaji: 'shi', sound: '/ʃi/', mnemonic: 'A fishing hook catching a fish', strokes: 1, group: 's-sounds' },
    { char: 'す', romaji: 'su', sound: '/su/', mnemonic: 'A Swing hanging from a tree', strokes: 2, group: 's-sounds' },
    { char: 'せ', romaji: 'se', sound: '/se/', mnemonic: 'A Say-so gesture pointing', strokes: 3, group: 's-sounds' },
    { char: 'そ', romaji: 'so', sound: '/so/', mnemonic: 'A Sewing needle and thread', strokes: 1, group: 's-sounds' },
    
    // T-sounds (たちつてと)
    { char: 'た', romaji: 'ta', sound: '/ta/', mnemonic: 'A Taekwondo kick', strokes: 4, group: 't-sounds' },
    { char: 'ち', romaji: 'chi', sound: '/tʃi/', mnemonic: 'A Cheerleader with pom-poms', strokes: 3, group: 't-sounds' },
    { char: 'つ', romaji: 'tsu', sound: '/tsu/', mnemonic: 'A Tsunami wave', strokes: 1, group: 't-sounds' },
    { char: 'て', romaji: 'te', sound: '/te/', mnemonic: 'A Telephone pole', strokes: 3, group: 't-sounds' },
    { char: 'と', romaji: 'to', sound: '/to/', mnemonic: 'A Toe with a nail', strokes: 2, group: 't-sounds' },
    
    // N-sounds (なにぬねの)
    { char: 'な', romaji: 'na', sound: '/na/', mnemonic: 'A knife cutting', strokes: 4, group: 'n-sounds' },
    { char: 'に', romaji: 'ni', sound: '/ni/', mnemonic: 'A knee bent', strokes: 3, group: 'n-sounds' },
    { char: 'ぬ', romaji: 'nu', sound: '/nu/', mnemonic: 'Noodles on chopsticks', strokes: 2, group: 'n-sounds' },
    { char: 'ね', romaji: 'ne', sound: '/ne/', mnemonic: 'A cat with a long neck', strokes: 2, group: 'n-sounds' },
    { char: 'の', romaji: 'no', sound: '/no/', mnemonic: 'A lasso knot', strokes: 1, group: 'n-sounds' },
    
    // H-sounds (はひふへほ)
    { char: 'は', romaji: 'ha', sound: '/ha/', mnemonic: 'A happy face laughing', strokes: 3, group: 'h-sounds' },
    { char: 'ひ', romaji: 'hi', sound: '/hi/', mnemonic: 'A heel and leg', strokes: 1, group: 'h-sounds' },
    { char: 'ふ', romaji: 'fu', sound: '/ɸu/', mnemonic: 'Mount Fuji', strokes: 4, group: 'h-sounds' },
    { char: 'へ', romaji: 'he', sound: '/he/', mnemonic: 'A helmet', strokes: 1, group: 'h-sounds' },
    { char: 'ほ', romaji: 'ho', sound: '/ho/', mnemonic: 'A house with a chimney', strokes: 4, group: 'h-sounds' },
    
    // M-sounds (まみむめも)
    { char: 'ま', romaji: 'ma', sound: '/ma/', mnemonic: 'A mama with flowing hair', strokes: 3, group: 'm-sounds' },
    { char: 'み', romaji: 'mi', sound: '/mi/', mnemonic: 'A river meandering', strokes: 2, group: 'm-sounds' },
    { char: 'む', romaji: 'mu', sound: '/mu/', mnemonic: 'A cow saying moo', strokes: 3, group: 'm-sounds' },
    { char: 'め', romaji: 'me', sound: '/me/', mnemonic: 'An eye and eyebrow', strokes: 2, group: 'm-sounds' },
    { char: 'も', romaji: 'mo', sound: '/mo/', mnemonic: 'More fish on a hook', strokes: 3, group: 'm-sounds' },
    
    // Y-sounds (やゆよ)
    { char: 'や', romaji: 'ya', sound: '/ja/', mnemonic: 'A yacht with sails', strokes: 3, group: 'y-sounds' },
    { char: 'ゆ', romaji: 'yu', sound: '/ju/', mnemonic: 'A U-turn arrow', strokes: 2, group: 'y-sounds' },
    { char: 'よ', romaji: 'yo', sound: '/jo/', mnemonic: 'A yoga pose', strokes: 2, group: 'y-sounds' },
    
    // R-sounds (らりるれろ)
    { char: 'ら', romaji: 'ra', sound: '/ɾa/', mnemonic: 'A rabbit running', strokes: 2, group: 'r-sounds' },
    { char: 'り', romaji: 'ri', sound: '/ɾi/', mnemonic: 'A reed in water', strokes: 2, group: 'r-sounds' },
    { char: 'る', romaji: 'ru', sound: '/ɾu/', mnemonic: 'A loop and curve', strokes: 1, group: 'r-sounds' },
    { char: 'れ', romaji: 're', sound: '/ɾe/', mnemonic: 'A racquet', strokes: 1, group: 'r-sounds' },
    { char: 'ろ', romaji: 'ro', sound: '/ɾo/', mnemonic: 'A road winding', strokes: 3, group: 'r-sounds' },
    
    // W-sounds and N (わをん)
    { char: 'わ', romaji: 'wa', sound: '/wa/', mnemonic: 'A waterfall', strokes: 3, group: 'w-sounds' },
    { char: 'を', romaji: 'wo', sound: '/wo/', mnemonic: 'Wolverine claws', strokes: 3, group: 'w-sounds' },
    { char: 'ん', romaji: 'n', sound: '/n/', mnemonic: 'A nun bowing', strokes: 1, group: 'n-final' },
    
    // Voiced Sounds (Dakuten – ゛)
    // G-sounds (がぎぐげご)
    { char: 'が', romaji: 'ga', sound: '/ga/', mnemonic: 'Garden with a gate', strokes: 3, group: 'g-sounds' },
    { char: 'ぎ', romaji: 'gi', sound: '/gi/', mnemonic: 'Gift with a bow', strokes: 4, group: 'g-sounds' },
    { char: 'ぐ', romaji: 'gu', sound: '/gu/', mnemonic: 'Good luck charm', strokes: 1, group: 'g-sounds' },
    { char: 'げ', romaji: 'ge', sound: '/ge/', mnemonic: 'Gentle breeze', strokes: 3, group: 'g-sounds' },
    { char: 'ご', romaji: 'go', sound: '/go/', mnemonic: 'Go sign pointing forward', strokes: 2, group: 'g-sounds' },
    
    // Z-sounds (ざじずぜぞ)
    { char: 'ざ', romaji: 'za', sound: '/za/', mnemonic: 'Zebra stripes', strokes: 3, group: 'z-sounds' },
    { char: 'じ', romaji: 'ji', sound: '/dʒi/', mnemonic: 'Jewel shining bright', strokes: 1, group: 'z-sounds' },
    { char: 'ず', romaji: 'zu', sound: '/zu/', mnemonic: 'Zoo with animals', strokes: 2, group: 'z-sounds' },
    { char: 'ぜ', romaji: 'ze', sound: '/ze/', mnemonic: 'Zen meditation', strokes: 3, group: 'z-sounds' },
    { char: 'ぞ', romaji: 'zo', sound: '/zo/', mnemonic: 'Zombie walking', strokes: 1, group: 'z-sounds' },
    
    // D-sounds (だぢづでど)
    { char: 'だ', romaji: 'da', sound: '/da/', mnemonic: 'Dance moves', strokes: 4, group: 'd-sounds' },
    { char: 'ぢ', romaji: 'ji', sound: '/dʒi/', mnemonic: 'Rare sound, like じ', strokes: 3, group: 'd-sounds' },
    { char: 'づ', romaji: 'zu', sound: '/zu/', mnemonic: 'Rare sound, like ず', strokes: 1, group: 'd-sounds' },
    { char: 'で', romaji: 'de', sound: '/de/', mnemonic: 'Desk with papers', strokes: 3, group: 'd-sounds' },
    { char: 'ど', romaji: 'do', sound: '/do/', mnemonic: 'Door opening', strokes: 2, group: 'd-sounds' },
    
    // B-sounds (ばびぶべぼ)
    { char: 'ば', romaji: 'ba', sound: '/ba/', mnemonic: 'Baby crying', strokes: 3, group: 'b-sounds' },
    { char: 'び', romaji: 'bi', sound: '/bi/', mnemonic: 'Bee buzzing', strokes: 1, group: 'b-sounds' },
    { char: 'ぶ', romaji: 'bu', sound: '/bu/', mnemonic: 'Bubble floating', strokes: 4, group: 'b-sounds' },
    { char: 'べ', romaji: 'be', sound: '/be/', mnemonic: 'Bell ringing', strokes: 1, group: 'b-sounds' },
    { char: 'ぼ', romaji: 'bo', sound: '/bo/', mnemonic: 'Boat sailing', strokes: 4, group: 'b-sounds' },
    
    // P-sounds (Handakuten – ゜)
    { char: 'ぱ', romaji: 'pa', sound: '/pa/', mnemonic: 'Party balloon', strokes: 3, group: 'p-sounds' },
    { char: 'ぴ', romaji: 'pi', sound: '/pi/', mnemonic: 'Pizza slice', strokes: 1, group: 'p-sounds' },
    { char: 'ぷ', romaji: 'pu', sound: '/pu/', mnemonic: 'Puppy playing', strokes: 4, group: 'p-sounds' },
    { char: 'ぺ', romaji: 'pe', sound: '/pe/', mnemonic: 'Pen writing', strokes: 1, group: 'p-sounds' },
    { char: 'ぽ', romaji: 'po', sound: '/po/', mnemonic: 'Pole vaulting', strokes: 4, group: 'p-sounds' },
    
    // Combined Sounds (Youon – Small や, ゆ, よ)
    // K + Y combinations
    { char: 'きゃ', romaji: 'kya', sound: '/kja/', mnemonic: 'Key + ya = kya', strokes: 4, group: 'ky-sounds' },
    { char: 'きゅ', romaji: 'kyu', sound: '/kju/', mnemonic: 'Key + yu = kyu', strokes: 4, group: 'ky-sounds' },
    { char: 'きょ', romaji: 'kyo', sound: '/kjo/', mnemonic: 'Key + yo = kyo', strokes: 4, group: 'ky-sounds' },
    
    // G + Y combinations
    { char: 'ぎゃ', romaji: 'gya', sound: '/gja/', mnemonic: 'Gift + ya = gya', strokes: 4, group: 'gy-sounds' },
    { char: 'ぎゅ', romaji: 'gyu', sound: '/gju/', mnemonic: 'Gift + yu = gyu', strokes: 4, group: 'gy-sounds' },
    { char: 'ぎょ', romaji: 'gyo', sound: '/gjo/', mnemonic: 'Gift + yo = gyo', strokes: 4, group: 'gy-sounds' },
    
    // S + Y combinations
    { char: 'しゃ', romaji: 'sha', sound: '/ʃa/', mnemonic: 'Ship + ya = sha', strokes: 1, group: 'sy-sounds' },
    { char: 'しゅ', romaji: 'shu', sound: '/ʃu/', mnemonic: 'Ship + yu = shu', strokes: 1, group: 'sy-sounds' },
    { char: 'しょ', romaji: 'sho', sound: '/ʃo/', mnemonic: 'Ship + yo = sho', strokes: 1, group: 'sy-sounds' },
    
    // J + Y combinations
    { char: 'じゃ', romaji: 'ja', sound: '/dʒa/', mnemonic: 'Jewel + ya = ja', strokes: 1, group: 'jy-sounds' },
    { char: 'じゅ', romaji: 'ju', sound: '/dʒu/', mnemonic: 'Jewel + yu = ju', strokes: 1, group: 'jy-sounds' },
    { char: 'じょ', romaji: 'jo', sound: '/dʒo/', mnemonic: 'Jewel + yo = jo', strokes: 1, group: 'jy-sounds' },
    
    // T + Y combinations
    { char: 'ちゃ', romaji: 'cha', sound: '/tʃa/', mnemonic: 'Cheer + ya = cha', strokes: 3, group: 'ty-sounds' },
    { char: 'ちゅ', romaji: 'chu', sound: '/tʃu/', mnemonic: 'Cheer + yu = chu', strokes: 3, group: 'ty-sounds' },
    { char: 'ちょ', romaji: 'cho', sound: '/tʃo/', mnemonic: 'Cheer + yo = cho', strokes: 3, group: 'ty-sounds' },
    
    // N + Y combinations
    { char: 'にゃ', romaji: 'nya', sound: '/nja/', mnemonic: 'Knee + ya = nya', strokes: 3, group: 'ny-sounds' },
    { char: 'にゅ', romaji: 'nyu', sound: '/nju/', mnemonic: 'Knee + yu = nyu', strokes: 3, group: 'ny-sounds' },
    { char: 'にょ', romaji: 'nyo', sound: '/njo/', mnemonic: 'Knee + yo = nyo', strokes: 3, group: 'ny-sounds' },
    
    // H + Y combinations
    { char: 'ひゃ', romaji: 'hya', sound: '/hja/', mnemonic: 'Heel + ya = hya', strokes: 1, group: 'hy-sounds' },
    { char: 'ひゅ', romaji: 'hyu', sound: '/hju/', mnemonic: 'Heel + yu = hyu', strokes: 1, group: 'hy-sounds' },
    { char: 'ひょ', romaji: 'hyo', sound: '/hjo/', mnemonic: 'Heel + yo = hyo', strokes: 1, group: 'hy-sounds' },
    
    // B + Y combinations
    { char: 'びゃ', romaji: 'bya', sound: '/bja/', mnemonic: 'Bee + ya = bya', strokes: 1, group: 'by-sounds' },
    { char: 'びゅ', romaji: 'byu', sound: '/bju/', mnemonic: 'Bee + yu = byu', strokes: 1, group: 'by-sounds' },
    { char: 'びょ', romaji: 'byo', sound: '/bjo/', mnemonic: 'Bee + yo = byo', strokes: 1, group: 'by-sounds' },
    
    // P + Y combinations
    { char: 'ぴゃ', romaji: 'pya', sound: '/pja/', mnemonic: 'Pizza + ya = pya', strokes: 1, group: 'py-sounds' },
    { char: 'ぴゅ', romaji: 'pyu', sound: '/pju/', mnemonic: 'Pizza + yu = pyu', strokes: 1, group: 'py-sounds' },
    { char: 'ぴょ', romaji: 'pyo', sound: '/pjo/', mnemonic: 'Pizza + yo = pyo', strokes: 1, group: 'py-sounds' },
    
    // M + Y combinations
    { char: 'みゃ', romaji: 'mya', sound: '/mja/', mnemonic: 'Mama + ya = mya', strokes: 3, group: 'my-sounds' },
    { char: 'みゅ', romaji: 'myu', sound: '/mju/', mnemonic: 'Mama + yu = myu', strokes: 3, group: 'my-sounds' },
    { char: 'みょ', romaji: 'myo', sound: '/mjo/', mnemonic: 'Mama + yo = myo', strokes: 3, group: 'my-sounds' },
    
    // R + Y combinations
    { char: 'りゃ', romaji: 'rya', sound: '/ɾja/', mnemonic: 'Rabbit + ya = rya', strokes: 2, group: 'ry-sounds' },
    { char: 'りゅ', romaji: 'ryu', sound: '/ɾju/', mnemonic: 'Rabbit + yu = ryu', strokes: 2, group: 'ry-sounds' },
    { char: 'りょ', romaji: 'ryo', sound: '/ɾjo/', mnemonic: 'Rabbit + yo = ryo', strokes: 2, group: 'ry-sounds' },
  ];

  // Complete Katakana characters
  const katakanaCharacters: Array<{
    char: string;
    romaji: string;
    sound: string;
    mnemonic: string;
    strokes: number;
    group: string;
    strokePaths?: number[][][];
  }> = [
    // Basic Katakana (Gojuon Table – ア～ン)
    // Vowels (アイウエオ)
    { char: 'ア', romaji: 'a', sound: '/a/', mnemonic: 'An Axe chopping wood', strokes: 2, group: 'vowels' },
    { char: 'イ', romaji: 'i', sound: '/i/', mnemonic: 'An Eagle\'s beak pointing right', strokes: 2, group: 'vowels' },
    { char: 'ウ', romaji: 'u', sound: '/u/', mnemonic: 'A Warrior\'s helmet', strokes: 3, group: 'vowels' },
    { char: 'エ', romaji: 'e', sound: '/e/', mnemonic: 'An Elevator shaft', strokes: 3, group: 'vowels' },
    { char: 'オ', romaji: 'o', sound: '/o/', mnemonic: 'An Opera singer\'s mouth', strokes: 3, group: 'vowels' },
    
    // K-sounds (カキクケコ)
    { char: 'カ', romaji: 'ka', sound: '/ka/', mnemonic: 'A Cutter blade', strokes: 2, group: 'k-sounds' },
    { char: 'キ', romaji: 'ki', sound: '/ki/', mnemonic: 'A Key\'s teeth', strokes: 3, group: 'k-sounds' },
    { char: 'ク', romaji: 'ku', sound: '/ku/', mnemonic: 'A bird\'s Claw', strokes: 2, group: 'k-sounds' },
    { char: 'ケ', romaji: 'ke', sound: '/ke/', mnemonic: 'A Keg tipped over', strokes: 3, group: 'k-sounds' },
    { char: 'コ', romaji: 'ko', sound: '/ko/', mnemonic: 'A Corner of a building', strokes: 2, group: 'k-sounds' },
    
    // S-sounds (サシスセソ)
    { char: 'サ', romaji: 'sa', sound: '/sa/', mnemonic: 'A Samurai sword', strokes: 3, group: 's-sounds' },
    { char: 'シ', romaji: 'shi', sound: '/ʃi/', mnemonic: 'She has long hair', strokes: 3, group: 's-sounds' },
    { char: 'ス', romaji: 'su', sound: '/su/', mnemonic: 'A swing set', strokes: 2, group: 's-sounds' },
    { char: 'セ', romaji: 'se', sound: '/se/', mnemonic: 'A say sign', strokes: 2, group: 's-sounds' },
    { char: 'ソ', romaji: 'so', sound: '/so/', mnemonic: 'A sewing needle', strokes: 2, group: 's-sounds' },
    
    // T-sounds (タチツテト)
    { char: 'タ', romaji: 'ta', sound: '/ta/', mnemonic: 'A table with legs', strokes: 3, group: 't-sounds' },
    { char: 'チ', romaji: 'chi', sound: '/tʃi/', mnemonic: 'A cheerful wave', strokes: 3, group: 't-sounds' },
    { char: 'ツ', romaji: 'tsu', sound: '/tsu/', mnemonic: 'A tsunami wave', strokes: 2, group: 't-sounds' },
    { char: 'テ', romaji: 'te', sound: '/te/', mnemonic: 'A television antenna', strokes: 3, group: 't-sounds' },
    { char: 'ト', romaji: 'to', sound: '/to/', mnemonic: 'A toe nail', strokes: 2, group: 't-sounds' },
    
    // N-sounds (ナニヌネノ)
    { char: 'ナ', romaji: 'na', sound: '/na/', mnemonic: 'A nail being hammered', strokes: 4, group: 'n-sounds' },
    { char: 'ニ', romaji: 'ni', sound: '/ni/', mnemonic: 'Two lines like needles', strokes: 3, group: 'n-sounds' },
    { char: 'ヌ', romaji: 'nu', sound: '/nu/', mnemonic: 'A nude figure with curves', strokes: 2, group: 'n-sounds' },
    { char: 'ネ', romaji: 'ne', sound: '/ne/', mnemonic: 'A cat with a long neck', strokes: 4, group: 'n-sounds' },
    { char: 'ノ', romaji: 'no', sound: '/no/', mnemonic: 'A diagonal line saying no', strokes: 1, group: 'n-sounds' },
    
    // H-sounds (ハヒフヘホ)
    { char: 'ハ', romaji: 'ha', sound: '/ha/', mnemonic: 'A happy face laughing', strokes: 3, group: 'h-sounds' },
    { char: 'ヒ', romaji: 'hi', sound: '/hi/', mnemonic: 'A heel and leg', strokes: 2, group: 'h-sounds' },
    { char: 'フ', romaji: 'fu', sound: '/ɸu/', mnemonic: 'A hook fishing', strokes: 1, group: 'h-sounds' },
    { char: 'ヘ', romaji: 'he', sound: '/he/', mnemonic: 'A mountain peak', strokes: 1, group: 'h-sounds' },
    { char: 'ホ', romaji: 'ho', sound: '/ho/', mnemonic: 'A house with cross beams', strokes: 4, group: 'h-sounds' },
    
    // M-sounds (マミムメモ)
    { char: 'マ', romaji: 'ma', sound: '/ma/', mnemonic: 'A mama with flowing hair', strokes: 2, group: 'm-sounds' },
    { char: 'ミ', romaji: 'mi', sound: '/mi/', mnemonic: 'Three lines like musical notes', strokes: 3, group: 'm-sounds' },
    { char: 'ム', romaji: 'mu', sound: '/mu/', mnemonic: 'A cow saying moo', strokes: 2, group: 'm-sounds' },
    { char: 'メ', romaji: 'me', sound: '/me/', mnemonic: 'An eye and eyebrow', strokes: 2, group: 'm-sounds' },
    { char: 'モ', romaji: 'mo', sound: '/mo/', mnemonic: 'More horizontal lines', strokes: 3, group: 'm-sounds' },
    
    // Y-sounds (ヤユヨ)
    { char: 'ヤ', romaji: 'ya', sound: '/ja/', mnemonic: 'A yacht with sails', strokes: 3, group: 'y-sounds' },
    { char: 'ユ', romaji: 'yu', sound: '/ju/', mnemonic: 'A U-turn with extra line', strokes: 2, group: 'y-sounds' },
    { char: 'ヨ', romaji: 'yo', sound: '/jo/', mnemonic: 'A yoga pose with balance', strokes: 3, group: 'y-sounds' },
    
    // R-sounds (ラリルレロ)
    { char: 'ラ', romaji: 'ra', sound: '/ɾa/', mnemonic: 'A rabbit running right', strokes: 2, group: 'r-sounds' },
    { char: 'リ', romaji: 'ri', sound: '/ɾi/', mnemonic: 'A reed swaying', strokes: 2, group: 'r-sounds' },
    { char: 'ル', romaji: 'ru', sound: '/ɾu/', mnemonic: 'A loop with tail', strokes: 2, group: 'r-sounds' },
    { char: 'レ', romaji: 're', sound: '/ɾe/', mnemonic: 'A left turn arrow', strokes: 1, group: 'r-sounds' },
    { char: 'ロ', romaji: 'ro', sound: '/ɾo/', mnemonic: 'A square box road', strokes: 3, group: 'r-sounds' },
    
    // W-sounds and N (ワヲン)
    { char: 'ワ', romaji: 'wa', sound: '/wa/', mnemonic: 'A waterfall flow', strokes: 2, group: 'w-sounds' },
    { char: 'ヲ', romaji: 'wo', sound: '/wo/', mnemonic: 'Wolverine claws extended', strokes: 3, group: 'w-sounds' },
    { char: 'ン', romaji: 'n', sound: '/n/', mnemonic: 'A vertical line with curve', strokes: 1, group: 'n-final' },
    
    // Voiced Sounds (Dakuten – ゛)
    // G-sounds (ガギグゲゴ)
    { char: 'ガ', romaji: 'ga', sound: '/ga/', mnemonic: 'Garden gate', strokes: 2, group: 'g-sounds' },
    { char: 'ギ', romaji: 'gi', sound: '/gi/', mnemonic: 'Gift with bow', strokes: 3, group: 'g-sounds' },
    { char: 'グ', romaji: 'gu', sound: '/gu/', mnemonic: 'Good luck charm', strokes: 2, group: 'g-sounds' },
    { char: 'ゲ', romaji: 'ge', sound: '/ge/', mnemonic: 'Gentle breeze', strokes: 3, group: 'g-sounds' },
    { char: 'ゴ', romaji: 'go', sound: '/go/', mnemonic: 'Go sign pointing forward', strokes: 2, group: 'g-sounds' },
    
    // Z-sounds (ザジズゼゾ)
    { char: 'ザ', romaji: 'za', sound: '/za/', mnemonic: 'Zebra stripes', strokes: 3, group: 'z-sounds' },
    { char: 'ジ', romaji: 'ji', sound: '/dʒi/', mnemonic: 'Jewel shining bright', strokes: 3, group: 'z-sounds' },
    { char: 'ズ', romaji: 'zu', sound: '/zu/', mnemonic: 'Zoo with animals', strokes: 2, group: 'z-sounds' },
    { char: 'ゼ', romaji: 'ze', sound: '/ze/', mnemonic: 'Zen meditation', strokes: 2, group: 'z-sounds' },
    { char: 'ゾ', romaji: 'zo', sound: '/zo/', mnemonic: 'Zombie walking', strokes: 2, group: 'z-sounds' },
    
    // D-sounds (ダヂヅデド)
    { char: 'ダ', romaji: 'da', sound: '/da/', mnemonic: 'Dance moves', strokes: 3, group: 'd-sounds' },
    { char: 'ヂ', romaji: 'ji', sound: '/dʒi/', mnemonic: 'Rare sound, like ジ', strokes: 3, group: 'd-sounds' },
    { char: 'ヅ', romaji: 'zu', sound: '/zu/', mnemonic: 'Rare sound, like ズ', strokes: 2, group: 'd-sounds' },
    { char: 'デ', romaji: 'de', sound: '/de/', mnemonic: 'Desk with papers', strokes: 3, group: 'd-sounds' },
    { char: 'ド', romaji: 'do', sound: '/do/', mnemonic: 'Door opening', strokes: 2, group: 'd-sounds' },
    
    // B-sounds (バビブベボ)
    { char: 'バ', romaji: 'ba', sound: '/ba/', mnemonic: 'Baby crying', strokes: 3, group: 'b-sounds' },
    { char: 'ビ', romaji: 'bi', sound: '/bi/', mnemonic: 'Bee buzzing', strokes: 2, group: 'b-sounds' },
    { char: 'ブ', romaji: 'bu', sound: '/bu/', mnemonic: 'Bubble floating', strokes: 1, group: 'b-sounds' },
    { char: 'ベ', romaji: 'be', sound: '/be/', mnemonic: 'Bell ringing', strokes: 1, group: 'b-sounds' },
    { char: 'ボ', romaji: 'bo', sound: '/bo/', mnemonic: 'Boat sailing', strokes: 4, group: 'b-sounds' },
    
    // P-sounds (Handakuten – ゜)
    { char: 'パ', romaji: 'pa', sound: '/pa/', mnemonic: 'Party balloon', strokes: 3, group: 'p-sounds' },
    { char: 'ピ', romaji: 'pi', sound: '/pi/', mnemonic: 'Pizza slice', strokes: 2, group: 'p-sounds' },
    { char: 'プ', romaji: 'pu', sound: '/pu/', mnemonic: 'Puppy playing', strokes: 1, group: 'p-sounds' },
    { char: 'ペ', romaji: 'pe', sound: '/pe/', mnemonic: 'Pen writing', strokes: 1, group: 'p-sounds' },
    { char: 'ポ', romaji: 'po', sound: '/po/', mnemonic: 'Pole vaulting', strokes: 4, group: 'p-sounds' },
    
    // Combined Sounds (Youon – Small ヤ, ユ, ヨ)
    // K + Y combinations
    { char: 'キャ', romaji: 'kya', sound: '/kja/', mnemonic: 'Key + ya = kya', strokes: 3, group: 'ky-sounds' },
    { char: 'キュ', romaji: 'kyu', sound: '/kju/', mnemonic: 'Key + yu = kyu', strokes: 3, group: 'ky-sounds' },
    { char: 'キョ', romaji: 'kyo', sound: '/kjo/', mnemonic: 'Key + yo = kyo', strokes: 3, group: 'ky-sounds' },
    
    // G + Y combinations
    { char: 'ギャ', romaji: 'gya', sound: '/gja/', mnemonic: 'Gift + ya = gya', strokes: 3, group: 'gy-sounds' },
    { char: 'ギュ', romaji: 'gyu', sound: '/gju/', mnemonic: 'Gift + yu = gyu', strokes: 3, group: 'gy-sounds' },
    { char: 'ギョ', romaji: 'gyo', sound: '/gjo/', mnemonic: 'Gift + yo = gyo', strokes: 3, group: 'gy-sounds' },
    
    // S + Y combinations
    { char: 'シャ', romaji: 'sha', sound: '/ʃa/', mnemonic: 'Ship + ya = sha', strokes: 3, group: 'sy-sounds' },
    { char: 'シュ', romaji: 'shu', sound: '/ʃu/', mnemonic: 'Ship + yu = shu', strokes: 3, group: 'sy-sounds' },
    { char: 'ショ', romaji: 'sho', sound: '/ʃo/', mnemonic: 'Ship + yo = sho', strokes: 3, group: 'sy-sounds' },
    
    // J + Y combinations
    { char: 'ジャ', romaji: 'ja', sound: '/dʒa/', mnemonic: 'Jewel + ya = ja', strokes: 3, group: 'jy-sounds' },
    { char: 'ジュ', romaji: 'ju', sound: '/dʒu/', mnemonic: 'Jewel + yu = ju', strokes: 3, group: 'jy-sounds' },
    { char: 'ジョ', romaji: 'jo', sound: '/dʒo/', mnemonic: 'Jewel + yo = jo', strokes: 3, group: 'jy-sounds' },
    
    // T + Y combinations
    { char: 'チャ', romaji: 'cha', sound: '/tʃa/', mnemonic: 'Cheer + ya = cha', strokes: 3, group: 'ty-sounds' },
    { char: 'チュ', romaji: 'chu', sound: '/tʃu/', mnemonic: 'Cheer + yu = chu', strokes: 3, group: 'ty-sounds' },
    { char: 'チョ', romaji: 'cho', sound: '/tʃo/', mnemonic: 'Cheer + yo = cho', strokes: 3, group: 'ty-sounds' },
    
    // N + Y combinations
    { char: 'ニャ', romaji: 'nya', sound: '/nja/', mnemonic: 'Knee + ya = nya', strokes: 4, group: 'ny-sounds' },
    { char: 'ニュ', romaji: 'nyu', sound: '/nju/', mnemonic: 'Knee + yu = nyu', strokes: 4, group: 'ny-sounds' },
    { char: 'ニョ', romaji: 'nyo', sound: '/njo/', mnemonic: 'Knee + yo = nyo', strokes: 4, group: 'ny-sounds' },
    
    // H + Y combinations
    { char: 'ヒャ', romaji: 'hya', sound: '/hja/', mnemonic: 'Heel + ya = hya', strokes: 2, group: 'hy-sounds' },
    { char: 'ヒュ', romaji: 'hyu', sound: '/hju/', mnemonic: 'Heel + yu = hyu', strokes: 2, group: 'hy-sounds' },
    { char: 'ヒョ', romaji: 'hyo', sound: '/hjo/', mnemonic: 'Heel + yo = hyo', strokes: 2, group: 'hy-sounds' },
    
    // B + Y combinations
    { char: 'ビャ', romaji: 'bya', sound: '/bja/', mnemonic: 'Bee + ya = bya', strokes: 2, group: 'by-sounds' },
    { char: 'ビュ', romaji: 'byu', sound: '/bju/', mnemonic: 'Bee + yu = byu', strokes: 2, group: 'by-sounds' },
    { char: 'ビョ', romaji: 'byo', sound: '/bjo/', mnemonic: 'Bee + yo = byo', strokes: 2, group: 'by-sounds' },
    
    // P + Y combinations
    { char: 'ピャ', romaji: 'pya', sound: '/pja/', mnemonic: 'Pizza + ya = pya', strokes: 2, group: 'py-sounds' },
    { char: 'ピュ', romaji: 'pyu', sound: '/pju/', mnemonic: 'Pizza + yu = pyu', strokes: 2, group: 'py-sounds' },
    { char: 'ピョ', romaji: 'pyo', sound: '/pjo/', mnemonic: 'Pizza + yo = pyo', strokes: 2, group: 'py-sounds' },
    
    // M + Y combinations
    { char: 'ミャ', romaji: 'mya', sound: '/mja/', mnemonic: 'Mama + ya = mya', strokes: 2, group: 'my-sounds' },
    { char: 'ミュ', romaji: 'myu', sound: '/mju/', mnemonic: 'Mama + yu = myu', strokes: 2, group: 'my-sounds' },
    { char: 'ミョ', romaji: 'myo', sound: '/mjo/', mnemonic: 'Mama + yo = myo', strokes: 2, group: 'my-sounds' },
    
    // R + Y combinations
    { char: 'リャ', romaji: 'rya', sound: '/ɾja/', mnemonic: 'Rabbit + ya = rya', strokes: 2, group: 'ry-sounds' },
    { char: 'リュ', romaji: 'ryu', sound: '/ɾju/', mnemonic: 'Rabbit + yu = ryu', strokes: 2, group: 'ry-sounds' },
    { char: 'リョ', romaji: 'ryo', sound: '/ɾjo/', mnemonic: 'Rabbit + yo = ryo', strokes: 2, group: 'ry-sounds' },
  ];

  const getCurrentCharacters = () => {
    return currentScript === 'hiragana' ? hiraganaCharacters : katakanaCharacters;
  };

  const currentCharacter = getCurrentCharacters()[currentCharacterIndex];

  // Helper function to find character index in arrays
  const findCharacterIndex = (character: string, script: 'hiragana' | 'katakana') => {
    const characters = script === 'hiragana' ? hiraganaCharacters : katakanaCharacters;
    return characters.findIndex(char => char.char === character);
  };

  // Helper function to handle character click
  const handleCharacterClick = (character: string, script: 'hiragana' | 'katakana') => {
    const index = findCharacterIndex(character, script);
    if (index !== -1) {
      setCurrentScript(script);
      setCurrentCharacterIndex(index);
      setActiveTab('practice');
    }
  };

  // AI Learning Features
  const aiFeatures = [
    {
      title: 'Stroke Order AI',
      description: 'Watch perfect stroke animations and get real-time feedback on your writing',
      icon: <Pen className="w-8 h-8 text-blue-600" />
    },
    {
      title: 'Memory Palace AI',
      description: 'Personalized mnemonics that adapt to your cultural background and interests',
      icon: <Brain className="w-8 h-8 text-purple-600" />
    },
    {
      title: 'Pronunciation AI',
      description: 'Advanced speech recognition for perfect pronunciation training',
      icon: <Mic className="w-8 h-8 text-green-600" />
    },
    {
      title: 'Adaptive Spacing',
      description: 'AI determines optimal review timing for 99% retention rate',
      icon: <Clock className="w-8 h-8 text-orange-600" />
    }
  ];

  // Character Groups
  const characterGroups = [
    { name: 'Vowels (あいうえお/アイウエオ)', count: 5, color: 'bg-red-100 text-red-800' },
    { name: 'K-sounds (か行/カ行)', count: 5, color: 'bg-blue-100 text-blue-800' },
    { name: 'S-sounds (さ行/サ行)', count: 5, color: 'bg-green-100 text-green-800' },
    { name: 'T-sounds (た行/タ行)', count: 5, color: 'bg-yellow-100 text-yellow-800' },
    { name: 'N-sounds (な行/ナ行)', count: 5, color: 'bg-purple-100 text-purple-800' },
    { name: 'H-sounds (は行/ハ行)', count: 5, color: 'bg-pink-100 text-pink-800' },
    { name: 'M-sounds (ま行/マ行)', count: 5, color: 'bg-indigo-100 text-indigo-800' },
    { name: 'Y-sounds (や行/ヤ行)', count: 3, color: 'bg-gray-100 text-gray-800' },
    { name: 'R-sounds (ら行/ラ行)', count: 5, color: 'bg-orange-100 text-orange-800' },
    { name: 'W-sounds & N (わをん/ワヲン)', count: 3, color: 'bg-teal-100 text-teal-800' },
    { name: 'G-sounds (が行/ガ行)', count: 5, color: 'bg-emerald-100 text-emerald-800' },
    { name: 'Z-sounds (ざ行/ザ行)', count: 5, color: 'bg-cyan-100 text-cyan-800' },
    { name: 'D-sounds (だ行/ダ行)', count: 5, color: 'bg-amber-100 text-amber-800' },
    { name: 'B-sounds (ば行/バ行)', count: 5, color: 'bg-rose-100 text-rose-800' },
    { name: 'P-sounds (ぱ行/パ行)', count: 5, color: 'bg-violet-100 text-violet-800' },
    { name: 'KY-sounds (きゃ行/キャ行)', count: 3, color: 'bg-sky-100 text-sky-800' },
    { name: 'GY-sounds (ぎゃ行/ギャ行)', count: 3, color: 'bg-lime-100 text-lime-800' },
    { name: 'SY-sounds (しゃ行/シャ行)', count: 3, color: 'bg-fuchsia-100 text-fuchsia-800' },
    { name: 'JY-sounds (じゃ行/ジャ行)', count: 3, color: 'bg-stone-100 text-stone-800' },
    { name: 'TY-sounds (ちゃ行/チャ行)', count: 3, color: 'bg-slate-100 text-slate-800' },
    { name: 'NY-sounds (にゃ行/ニャ行)', count: 3, color: 'bg-zinc-100 text-zinc-800' },
    { name: 'HY-sounds (ひゃ行/ヒャ行)', count: 3, color: 'bg-neutral-100 text-neutral-800' },
    { name: 'BY-sounds (びゃ行/ビャ行)', count: 3, color: 'bg-red-50 text-red-700' },
    { name: 'PY-sounds (ぴゃ行/ピャ行)', count: 3, color: 'bg-blue-50 text-blue-700' },
    { name: 'MY-sounds (みゃ行/ミャ行)', count: 3, color: 'bg-green-50 text-green-700' },
    { name: 'RY-sounds (りゃ行/リャ行)', count: 3, color: 'bg-yellow-50 text-yellow-700' }
  ];

  const nextCharacter = () => {
    if (currentCharacterIndex < getCurrentCharacters().length - 1) {
      setCurrentCharacterIndex(currentCharacterIndex + 1);
      setFeedbackType('neutral');
      setFeedback('Practice drawing this character. Use the animation as a guide for proper stroke order.');
      clearCanvas();
    }
  };

  const previousCharacter = () => {
    if (currentCharacterIndex > 0) {
      setCurrentCharacterIndex(currentCharacterIndex - 1);
      setFeedbackType('neutral');
      setFeedback('Practice drawing this character. Use the animation as a guide for proper stroke order.');
      clearCanvas();
    }
  };

  const playStrokeAnimation = () => {
    const canvas = canvasRef.current;
    if (!canvas || !currentCharacter.strokePaths) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    setIsPlaying(true);
    
    let strokeIndex = 0;
    
    const animateStroke = (pathIndex: number) => {
      if (pathIndex >= currentCharacter.strokePaths!.length) {
        setIsPlaying(false);
        return;
      }
      
      const path = currentCharacter.strokePaths![pathIndex];
      let pointIndex = 0;
      
      // Set stroke style
      ctx.strokeStyle = '#4F46E5'; // Purple color
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
             const drawStrokePath = () => {
         if (pointIndex >= path.length - 1) {
           // Add stroke number indicator
           ctx.fillStyle = '#4F46E5';
           ctx.font = 'bold 14px Arial';
           ctx.fillText((pathIndex + 1).toString(), path[0][0] - 15, path[0][1] - 5);
           
           setTimeout(() => animateStroke(pathIndex + 1), 1200); // Pause between strokes
           return;
         }
         
         const currentPoint = path[pointIndex];
         const nextPoint = path[pointIndex + 1];
         
         // Draw line segment with smooth animation
         ctx.beginPath();
         ctx.moveTo(currentPoint[0], currentPoint[1]);
         ctx.lineTo(nextPoint[0], nextPoint[1]);
         ctx.stroke();
         
         // Add arrow direction indicator for first few points
         if (pointIndex === 1 && pathIndex === 0) {
           ctx.fillStyle = '#10B981';
           ctx.beginPath();
           ctx.arc(currentPoint[0], currentPoint[1], 3, 0, 2 * Math.PI);
           ctx.fill();
         }
         
         pointIndex++;
         setTimeout(drawStrokePath, 80); // Slightly faster drawing
       };
      
      drawStrokePath();
    };
    
    animateStroke(0);
  };

  const playPronunciation = () => {
    // TODO: Implement actual audio playback
  };

  const markCorrect = () => {
    setFeedback('Excellent! Perfect stroke order and form. You\'re mastering this character!');
    setFeedbackType('positive');
    // Auto-advance to next character after a delay
    setTimeout(() => {
      nextCharacter();
    }, 2000);
  };

  const markIncorrect = () => {
    setFeedback('Try again! Focus on the stroke order and direction. Watch the animation for guidance.');
    setFeedbackType('negative');
    clearCanvas();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCharacterGuide();
  };

  const showStrokeOrder = () => {
    const canvas = canvasRef.current;
    if (!canvas || !currentCharacter.strokePaths || isPlaying) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsPlaying(true);
    clearCanvas(); // Start with clean slate

    let currentStrokeIndex = 0;

    const drawNextStroke = () => {
      if (currentStrokeIndex >= currentCharacter.strokePaths!.length) {
        setIsPlaying(false);
        return;
      }

      const strokePath = currentCharacter.strokePaths![currentStrokeIndex];
      if (strokePath.length > 0) {
        // Draw this stroke in red color
        ctx.strokeStyle = '#dc2626'; // Red color for demonstration
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        ctx.moveTo(strokePath[0][0], strokePath[0][1]);
        
        for (let i = 1; i < strokePath.length; i++) {
          ctx.lineTo(strokePath[i][0], strokePath[i][1]);
        }
        ctx.stroke();

        // Show stroke number
        ctx.font = 'bold 20px Arial';
        ctx.fillStyle = '#dc2626';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText((currentStrokeIndex + 1).toString(), strokePath[0][0] - 15, strokePath[0][1] - 15);
      }

      currentStrokeIndex++;

      // Continue to next stroke after delay
      setTimeout(drawNextStroke, 1500);
    };

    drawNextStroke();
  };

  const drawCharacterGuide = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas first to prevent overlapping
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw light gray character background as guide
    ctx.font = 'bold 160px serif';
    ctx.fillStyle = 'rgba(107, 114, 128, 0.3)'; // Light gray, semi-transparent
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(currentCharacter.char, canvas.width / 2, canvas.height / 2);

    // For characters with stroke data, show minimal stroke indicators
    if (currentCharacter.strokePaths && currentCharacter.strokePaths.length > 0) {
      ctx.font = 'bold 12px Arial';
      ctx.fillStyle = '#6b7280';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      currentCharacter.strokePaths.forEach((strokePath, index) => {
        if (strokePath.length > 0) {
          const startPoint = strokePath[0];
          const strokeNumber = (index + 1).toString();
          // Draw small stroke number at stroke start
          ctx.strokeText(strokeNumber, startPoint[0], startPoint[1]);
          ctx.fillText(strokeNumber, startPoint[0], startPoint[1]);
        }
      });
    }
    
    // Show stroke count at bottom for all characters
    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = '#6b7280';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${currentCharacter.strokes} strokes`, canvas.width / 2, canvas.height - 15);
  };

  // Draw guide when character changes and ensure clean start
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Always start with a completely clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCharacterGuide();
  }, [currentCharacterIndex, currentScript, drawCharacterGuide]);

  // Initialize canvas on first load
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCharacterGuide();
  }, [drawCharacterGuide]);

  // Mouse drawing functionality
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState<{x: number, y: number} | null>(null);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setLastPosition({x, y});
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPosition) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.strokeStyle = '#1F2937'; // Dark gray for user drawing
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    setLastPosition({x, y});
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPosition(null);
  };

  // Touch drawing functionality for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    setIsDrawing(true);
    setLastPosition({x, y});
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing || !lastPosition) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    ctx.strokeStyle = '#1F2937';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    setLastPosition({x, y});
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDrawing(false);
    setLastPosition(null);
  };

  // Enhanced Stroke Order Practice Functions
  const startStrokeDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (strokeOrderMode !== 'practice') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setDrawingPath([[x, y]]);
  };

  const continueStrokeDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || strokeOrderMode !== 'practice') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setDrawingPath(prev => [...prev, [x, y]]);
    
    // Draw the stroke in real-time
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      const lastPoint = drawingPath[drawingPath.length - 1];
      if (lastPoint) {
        ctx.beginPath();
        ctx.moveTo(lastPoint[0], lastPoint[1]);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }
  };

  const endStrokeDrawing = () => {
    if (!isDrawing || strokeOrderMode !== 'practice') return;
    
    setIsDrawing(false);
    
    if (drawingPath.length > 5) { // Minimum stroke length
      setUserStrokes(prev => [...prev, drawingPath]);
      
      // Check if stroke order is correct
      if (currentCharacter.strokePaths && currentStrokeIndex < currentCharacter.strokePaths.length) {
        const accuracy = calculateStrokeAccuracy(drawingPath, currentCharacter.strokePaths[currentStrokeIndex]);
        if (accuracy > 0.7) { // 70% accuracy threshold
          setCurrentStrokeIndex(prev => prev + 1);
          setStrokeOrderScore(prev => prev + 10);
          setFeedback('Great stroke! Move to the next one.');
          setFeedbackType('positive');
        } else {
          setFeedback('Try again. Focus on the stroke direction and shape.');
          setFeedbackType('negative');
        }
      }
    }
    
    setDrawingPath([]);
  };

  const calculateStrokeAccuracy = (userStroke: Array<[number, number]>, targetStroke: number[][]) => {
    // Simple accuracy calculation based on stroke direction and length
    if (userStroke.length < 2 || targetStroke.length < 2) return 0;
    
    const userDirection = Math.atan2(
      userStroke[userStroke.length - 1][1] - userStroke[0][1],
      userStroke[userStroke.length - 1][0] - userStroke[0][0]
    );
    
    const targetDirection = Math.atan2(
      targetStroke[targetStroke.length - 1][1] - targetStroke[0][1],
      targetStroke[targetStroke.length - 1][0] - targetStroke[0][0]
    );
    
    const directionDiff = Math.abs(userDirection - targetDirection);
    const directionAccuracy = Math.max(0, 1 - directionDiff / Math.PI);
    
    const userLength = Math.sqrt(
      Math.pow(userStroke[userStroke.length - 1][0] - userStroke[0][0], 2) +
      Math.pow(userStroke[userStroke.length - 1][1] - userStroke[0][1], 2)
    );
    
    const targetLength = Math.sqrt(
      Math.pow(targetStroke[targetStroke.length - 1][0] - targetStroke[0][0], 2) +
      Math.pow(targetStroke[targetStroke.length - 1][1] - targetStroke[0][1], 2)
    );
    
    const lengthAccuracy = Math.min(userLength, targetLength) / Math.max(userLength, targetLength);
    
    return (directionAccuracy + lengthAccuracy) / 2;
  };

  const resetStrokeOrderPractice = () => {
    setCurrentStrokeIndex(0);
    setUserStrokes([]);
    setStrokeOrderScore(0);
    setFeedback('Start practicing the stroke order. Follow the numbered guide.');
    setFeedbackType('neutral');
    clearCanvas();
  };

  const completeStrokeOrderPractice = () => {
    if (currentCharacter.strokePaths && currentStrokeIndex >= currentCharacter.strokePaths.length) {
      setFeedback('Excellent! You\'ve completed all strokes correctly!');
      setFeedbackType('positive');
      setStrokeOrderScore(prev => prev + 50); // Bonus for completion
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      {/* Modals */}
      {showMemoryGame && <MemoryCardGame onClose={() => setShowMemoryGame(false)} />}
      {showSpeedGame && <SpeedRecognitionGame onClose={() => setShowSpeedGame(false)} />}
      {showStrokePuzzle && <StrokePuzzle onClose={() => setShowStrokePuzzle(false)} />}
      {/* Hero Section, Navigation Tabs, and Tab Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Hero Content */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              Hiragana & Katakana Mastery
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Master the Japanese syllabaries with interactive learning tools
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setCurrentScript('hiragana')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  currentScript === 'hiragana'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                Hiragana (ひらがな)
              </button>
              <button
                onClick={() => setCurrentScript('katakana')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  currentScript === 'katakana'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                Katakana (カタカナ)
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-2 mb-8">
            <div className="flex space-x-2">
              {[
                { id: 'overview', label: 'Overview', icon: BookOpen },
                { id: 'practice', label: 'Practice', icon: Pen },
                { id: 'stroke-order', label: 'Stroke Order', icon: PlayCircle },
                { id: 'memory', label: 'Memory Games', icon: Brain },
                { id: 'exam', label: 'Exam', icon: Award }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-gray-900 shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <tab.icon size={20} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Learning Path */}
                <div className="bg-white/5 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">6-Step Learning Path</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { step: 1, title: 'Learn Characters', desc: 'Study each character with mnemonics', icon: BookOpen },
                      { step: 2, title: 'Practice Writing', desc: 'Master stroke order and writing', icon: Pen },
                      { step: 3, title: 'Memory Games', desc: 'Reinforce through interactive games', icon: Brain },
                      { step: 4, title: 'Speed Recognition', desc: 'Build quick character recognition', icon: Clock },
                      { step: 5, title: 'Stroke Puzzles', desc: 'Advanced stroke order challenges', icon: Award },
                      { step: 6, title: 'Final Exam', desc: 'Test your complete mastery', icon: Award }
                    ].map((item) => (
                      <div key={item.step} className="bg-white/10 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                            {item.step}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{item.title}</h3>
                            <p className="text-sm text-gray-300">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Character Tables */}
                <div className="bg-white/5 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {currentScript === 'hiragana' ? 'Hiragana' : 'Katakana'} Character Table
                  </h2>
                  
                  {currentScript === 'hiragana' ? (
                    <div className="space-y-8">
                      {/* Basic Hiragana (Gojuon Table) */}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4">📘 Basic Hiragana (Gojuon Table – あ～ん)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {/* Vowels */}
                          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">Vowels (あいうえお)</h4>
                            <div className="grid grid-cols-5 gap-2">
                              {['あ', 'い', 'う', 'え', 'お'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'hiragana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* K-sounds */}
                          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">K-sounds (かきくけこ)</h4>
                            <div className="grid grid-cols-5 gap-2">
                              {['か', 'き', 'く', 'け', 'こ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'hiragana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* S-sounds */}
                          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">S-sounds (さしすせそ)</h4>
                            <div className="grid grid-cols-5 gap-2">
                              {['さ', 'し', 'す', 'せ', 'そ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'hiragana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* T-sounds */}
                          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">T-sounds (たちつてと)</h4>
                            <div className="grid grid-cols-5 gap-2">
                              {['た', 'ち', 'つ', 'て', 'と'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'hiragana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* N-sounds */}
                          <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">N-sounds (なにぬねの)</h4>
                            <div className="grid grid-cols-5 gap-2">
                              {['な', 'に', 'ぬ', 'ね', 'の'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'hiragana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* H-sounds */}
                          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">H-sounds (はひふへほ)</h4>
                            <div className="grid grid-cols-5 gap-2">
                              {['は', 'ひ', 'ふ', 'へ', 'ほ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'hiragana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* M-sounds */}
                          <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">M-sounds (まみむめも)</h4>
                            <div className="grid grid-cols-5 gap-2">
                              {['ま', 'み', 'む', 'め', 'も'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'hiragana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Y-sounds */}
                          <div className="bg-gradient-to-br from-rose-500 to-red-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">Y-sounds (やゆよ)</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {['や', 'ゆ', 'よ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'hiragana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* R-sounds */}
                          <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">R-sounds (らりるれろ)</h4>
                            <div className="grid grid-cols-5 gap-2">
                              {['ら', 'り', 'る', 'れ', 'ろ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'hiragana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* W-sounds */}
                          <div className="bg-gradient-to-br from-orange-500 to-yellow-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">W-sounds (わをん)</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {['わ', 'を', 'ん'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'hiragana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Voiced Sounds (Dakuten) */}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4">📘 Voiced Sounds (Dakuten – ゛)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {/* G-sounds */}
                          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">G-sounds (がぎぐげご)</h4>
                            <div className="grid grid-cols-5 gap-2">
                              {['が', 'ぎ', 'ぐ', 'げ', 'ご'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'hiragana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Z-sounds */}
                          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">Z-sounds (ざじずぜぞ)</h4>
                            <div className="grid grid-cols-5 gap-2">
                              {['ざ', 'じ', 'ず', 'ぜ', 'ぞ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'hiragana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* D-sounds */}
                          <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">D-sounds (だぢづでど)</h4>
                            <div className="grid grid-cols-5 gap-2">
                              {['だ', 'ぢ', 'づ', 'で', 'ど'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'hiragana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* B-sounds */}
                          <div className="bg-gradient-to-br from-rose-500 to-red-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">B-sounds (ばびぶべぼ)</h4>
                            <div className="grid grid-cols-5 gap-2">
                              {['ば', 'び', 'ぶ', 'べ', 'ぼ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'hiragana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* P-sounds (Handakuten) */}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4">📘 P-sounds (Handakuten – ゜)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {/* P-sounds */}
                          <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">P-sounds (ぱぴぷぺぽ)</h4>
                            <div className="grid grid-cols-5 gap-2">
                              {['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'hiragana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Combined Sounds (Youon) */}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4">📘 Combined Sounds (Youon – Small や, ゆ, よ)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {/* K + Y combinations */}
                          <div className="bg-gradient-to-br from-orange-500 to-yellow-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">K + Y (きゃきゅきょ)</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {['きゃ', 'きゅ', 'きょ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'hiragana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* G + Y combinations */}
                          <div className="bg-gradient-to-br from-yellow-500 to-lime-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">G + Y (ぎゃぎゅぎょ)</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {['ぎゃ', 'ぎゅ', 'ぎょ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'hiragana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* S + Y combinations */}
                          <div className="bg-gradient-to-br from-lime-500 to-green-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">S + Y (しゃしゅしょ)</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {['しゃ', 'しゅ', 'しょ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'hiragana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* J + Y combinations */}
                          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">J + Y (じゃじゅじょ)</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {['じゃ', 'じゅ', 'じょ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'hiragana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* T + Y combinations */}
                          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">T + Y (ちゃちゅちょ)</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {['ちゃ', 'ちゅ', 'ちょ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'hiragana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* N + Y combinations */}
                          <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">N + Y (にゃにゅにょ)</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {['にゃ', 'にゅ', 'にょ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'hiragana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* H + Y combinations */}
                          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">H + Y (ひゃひゅひょ)</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {['ひゃ', 'ひゅ', 'ひょ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'hiragana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* B + Y combinations */}
                          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">B + Y (びゃびゅびょ)</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {['びゃ', 'びゅ', 'びょ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'hiragana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* P + Y combinations */}
                          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">P + Y (ぴゃぴゅぴょ)</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {['ぴゃ', 'ぴゅ', 'ぴょ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'hiragana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* M + Y combinations */}
                          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">M + Y (みゃみゅみょ)</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {['みゃ', 'みゅ', 'みょ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'hiragana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* R + Y combinations */}
                          <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">R + Y (りゃりゅりょ)</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {['りゃ', 'りゅ', 'りょ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'hiragana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {/* Basic Katakana (Gojuon Table) */}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4">📘 Basic Katakana (Gojuon Table – ア～ン)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {/* Vowels */}
                          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">Vowels (アイウエオ)</h4>
                            <div className="grid grid-cols-5 gap-2">
                              {['ア', 'イ', 'ウ', 'エ', 'オ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'katakana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* K-sounds */}
                          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">K-sounds (カキクケコ)</h4>
                            <div className="grid grid-cols-5 gap-2">
                              {['カ', 'キ', 'ク', 'ケ', 'コ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'katakana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* S-sounds */}
                          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">S-sounds (サシスセソ)</h4>
                            <div className="grid grid-cols-5 gap-2">
                              {['サ', 'シ', 'ス', 'セ', 'ソ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'katakana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* T-sounds */}
                          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">T-sounds (タチツテト)</h4>
                            <div className="grid grid-cols-5 gap-2">
                              {['タ', 'チ', 'ツ', 'テ', 'ト'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'katakana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* N-sounds */}
                          <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">N-sounds (ナニヌネノ)</h4>
                            <div className="grid grid-cols-5 gap-2">
                              {['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'katakana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* H-sounds */}
                          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">H-sounds (ハヒフヘホ)</h4>
                            <div className="grid grid-cols-5 gap-2">
                              {['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'katakana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* M-sounds */}
                          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">M-sounds (マミムメモ)</h4>
                            <div className="grid grid-cols-5 gap-2">
                              {['マ', 'ミ', 'ム', 'メ', 'モ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'katakana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Y-sounds */}
                          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">Y-sounds (ヤユヨ)</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {['ヤ', 'ユ', 'ヨ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'katakana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* R-sounds */}
                          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">R-sounds (ラリルレロ)</h4>
                            <div className="grid grid-cols-5 gap-2">
                              {['ラ', 'リ', 'ル', 'レ', 'ロ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'katakana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* W-sounds and N */}
                          <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">W-sounds & N (ワヲン)</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {['ワ', 'ヲ', 'ン'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'katakana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Voiced Sounds (Dakuten) */}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4">📘 Voiced Sounds (Dakuten – ゛)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {/* G-sounds */}
                          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">G-sounds (ガギグゲゴ)</h4>
                            <div className="grid grid-cols-5 gap-2">
                              {['ガ', 'ギ', 'グ', 'ゲ', 'ゴ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'katakana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Z-sounds */}
                          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">Z-sounds (ザジズゼゾ)</h4>
                            <div className="grid grid-cols-5 gap-2">
                              {['ザ', 'ジ', 'ズ', 'ゼ', 'ゾ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'katakana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* D-sounds */}
                          <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">D-sounds (ダヂヅデド)</h4>
                            <div className="grid grid-cols-5 gap-2">
                              {['ダ', 'ヂ', 'ヅ', 'デ', 'ド'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'katakana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* B-sounds */}
                          <div className="bg-gradient-to-br from-rose-500 to-red-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">B-sounds (バビブベボ)</h4>
                            <div className="grid grid-cols-5 gap-2">
                              {['バ', 'ビ', 'ブ', 'ベ', 'ボ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'katakana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* P-sounds (Handakuten) */}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4">📘 P-sounds (Handakuten – ゜)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {/* P-sounds */}
                          <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">P-sounds (パピプペポ)</h4>
                            <div className="grid grid-cols-5 gap-2">
                              {['パ', 'ピ', 'プ', 'ペ', 'ポ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'katakana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Combined Sounds (Youon) */}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4">📘 Combined Sounds (Youon – Small ヤ, ユ, ヨ)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {/* K + Y combinations */}
                          <div className="bg-gradient-to-br from-orange-500 to-yellow-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">K + Y (キャキュキョ)</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {['キャ', 'キュ', 'キョ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'katakana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* G + Y combinations */}
                          <div className="bg-gradient-to-br from-yellow-500 to-lime-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">G + Y (ギャギュギョ)</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {['ギャ', 'ギュ', 'ギョ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'katakana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* S + Y combinations */}
                          <div className="bg-gradient-to-br from-lime-500 to-green-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">S + Y (シャシュショ)</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {['シャ', 'シュ', 'ショ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'katakana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* J + Y combinations */}
                          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">J + Y (ジャジュジョ)</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {['ジャ', 'ジュ', 'ジョ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'katakana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* T + Y combinations */}
                          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">T + Y (チャチュチョ)</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {['チャ', 'チュ', 'チョ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'katakana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* N + Y combinations */}
                          <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">N + Y (ニャニュニョ)</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {['ニャ', 'ニュ', 'ニョ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'katakana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* H + Y combinations */}
                          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">H + Y (ヒャヒュヒョ)</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {['ヒャ', 'ヒュ', 'ヒョ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'katakana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* B + Y combinations */}
                          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">B + Y (ビャビュビョ)</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {['ビャ', 'ビュ', 'ビョ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'katakana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* P + Y combinations */}
                          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">P + Y (ピャピュピョ)</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {['ピャ', 'ピュ', 'ピョ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'katakana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* M + Y combinations */}
                          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">M + Y (ミャミュミョ)</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {['ミャ', 'ミュ', 'ミョ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'katakana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* R + Y combinations */}
                          <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-4">
                            <h4 className="text-lg font-bold text-white mb-3">R + Y (リャリュリョ)</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {['リャ', 'リュ', 'リョ'].map((char) => (
                                <div
                                  key={char}
                                  className="japanese-character bg-white/20 rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-all"
                                  onClick={() => handleCharacterClick(char, 'katakana')}
                                >
                                  {char}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'practice' && (
              <div className="space-y-8">
                {/* Character Practice */}
                <div className="bg-white/5 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Character Practice</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Character Display */}
                    <div className="bg-white/10 rounded-xl p-6">
                      <div className="text-center mb-6">
                        <div className="text-8xl font-bold text-white mb-4 japanese-character">
                          {currentCharacter?.char || 'あ'}
                        </div>
                        <div className="text-xl text-gray-300 mb-2">
                          Romaji: <span className="text-white font-semibold">{currentCharacter?.romaji || 'a'}</span>
                        </div>
                        <div className="text-lg text-gray-300">
                          Sound: <span className="text-white font-semibold">{currentCharacter?.sound || '/a/'}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-center space-x-4 mb-6">
                        <button
                          onClick={previousCharacter}
                          className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button
                          onClick={playPronunciation}
                          className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Volume2 size={24} />
                        </button>
                        <button
                          onClick={nextCharacter}
                          className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-gray-300 mb-4">
                          Character {currentCharacterIndex + 1} of {getCurrentCharacters().length}
                        </p>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((currentCharacterIndex + 1) / getCurrentCharacters().length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Practice Canvas */}
                    <div className="bg-white/10 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Practice Writing</h3>
                      <div className="bg-white rounded-lg p-4 mb-4">
                        <canvas
                          ref={canvasRef}
                          width={300}
                          height={300}
                          className="border border-gray-300 rounded cursor-crosshair w-full"
                          onMouseDown={startDrawing}
                          onMouseMove={draw}
                          onMouseUp={stopDrawing}
                          onMouseLeave={stopDrawing}
                          onTouchStart={handleTouchStart}
                          onTouchMove={handleTouchMove}
                          onTouchEnd={handleTouchEnd}
                        />
                      </div>
                      <div className="flex justify-between">
                        <button
                          onClick={clearCanvas}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Clear
                        </button>
                        <button
                          onClick={showStrokeOrder}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Show Stroke Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mnemonics */}
                <div className="bg-white/5 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Memory Tips</h2>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      <Lightbulb className="text-yellow-400 mt-1" size={24} />
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Mnemonic</h3>
                        <p className="text-gray-300">{currentCharacter?.mnemonic || 'A woman with Arms open wide'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'stroke-order' && (
              <div className="space-y-8">
                {/* Stroke Order Practice */}
                <div className="bg-white/5 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Stroke Order Practice</h2>
                  
                  {/* Practice Mode Selection */}
                  <div className="mb-6">
                    <div className="flex space-x-4 mb-4">
                      {[
                        { id: 'guided', label: 'Guided', desc: 'Follow numbered strokes' },
                        { id: 'free', label: 'Free Practice', desc: 'Practice without guidance' },
                        { id: 'challenge', label: 'Challenge', desc: 'Test your accuracy' }
                      ].map((mode) => (
                        <button
                          key={mode.id}
                          onClick={() => setPracticeMode(mode.id as 'free' | 'guided' | 'challenge')}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            practiceMode === mode.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-white/10 text-gray-300 hover:bg-white/20'
                          }`}
                        >
                          <div className="text-sm font-bold">{mode.label}</div>
                          <div className="text-xs opacity-75">{mode.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Character Guide */}
                    <div className="bg-white/10 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Character Guide</h3>
                      <div className="text-center mb-6">
                        <div className="text-6xl font-bold text-white mb-4 japanese-character">
                          {currentCharacter?.char || 'あ'}
                        </div>
                        <div className="text-lg text-gray-300">
                          Strokes: {currentCharacter?.strokes || 3}
                        </div>
                      </div>
                      
                      <div className="flex justify-center space-x-4 mb-6">
                        <button
                          onClick={playStrokeAnimation}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Play Animation
                        </button>
                        <button
                          onClick={resetStrokeOrderPractice}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Reset
                        </button>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm text-gray-300 mb-2">Score: {strokeOrderScore}</div>
                        <div className="text-sm text-gray-300">
                          Stroke {currentStrokeIndex + 1} of {currentCharacter?.strokes || 3}
                        </div>
                      </div>
                    </div>

                    {/* Practice Canvas */}
                    <div className="bg-white/10 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Practice Area</h3>
                      <div className="bg-white rounded-lg p-4 mb-4">
                        <canvas
                          ref={canvasRef}
                          width={300}
                          height={300}
                          className="border border-gray-300 rounded cursor-crosshair w-full"
                          onMouseDown={startStrokeDrawing}
                          onMouseMove={continueStrokeDrawing}
                          onMouseUp={endStrokeDrawing}
                          onMouseLeave={endStrokeDrawing}
                        />
                      </div>
                      
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className={`text-center p-3 rounded-lg ${
                          feedbackType === 'positive' ? 'bg-green-500/20 text-green-300' :
                          feedbackType === 'negative' ? 'bg-red-500/20 text-red-300' :
                          'bg-blue-500/20 text-blue-300'
                        }`}>
                          {feedback}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'memory' && (
              <div className="space-y-8">
                {/* Memory Games */}
                <div className="bg-white/5 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Memory Games</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white/10 rounded-xl p-6 text-center">
                      <Brain className="text-blue-400 mx-auto mb-4" size={48} />
                      <h3 className="text-xl font-bold text-white mb-2">Memory Card Game</h3>
                      <p className="text-gray-300 mb-4">Match hiragana and katakana characters</p>
                      <button
                        onClick={() => setShowMemoryGame(true)}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Start Game
                      </button>
                    </div>
                    
                    <div className="bg-white/10 rounded-xl p-6 text-center">
                      <Clock className="text-green-400 mx-auto mb-4" size={48} />
                      <h3 className="text-xl font-bold text-white mb-2">Speed Recognition</h3>
                      <p className="text-gray-300 mb-4">Quick character recognition challenge</p>
                      <button
                        onClick={() => setShowSpeedGame(true)}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Start Game
                      </button>
                    </div>
                    
                    <div className="bg-white/10 rounded-xl p-6 text-center">
                      <Award className="text-purple-400 mx-auto mb-4" size={48} />
                      <h3 className="text-xl font-bold text-white mb-2">Stroke Puzzle</h3>
                      <p className="text-gray-300 mb-4">Arrange stroke pieces correctly</p>
                      <button
                        onClick={() => setShowStrokePuzzle(true)}
                        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Start Game
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'exam' && (
              <div className="space-y-8">
                {/* Exam Section */}
                <div className="bg-white/5 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Final Exam</h2>
                  <div className="bg-white/10 rounded-xl p-6 text-center">
                    <Award className="text-yellow-400 mx-auto mb-4" size={64} />
                    <h3 className="text-2xl font-bold text-white mb-4">Test Your Mastery</h3>
                    <p className="text-gray-300 mb-6">
                      Take a comprehensive exam to test your knowledge of hiragana and katakana.
                    </p>
                    <button
                      onClick={() => setShowSpeedGame(true)}
                      className="px-8 py-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-lg font-semibold"
                    >
                      Start Exam
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm text-gray-500">
              {userProgress.hiragana.learned + userProgress.katakana.learned}/92 characters
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((userProgress.hiragana.learned + userProgress.katakana.learned) / 92) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiraganaKatakana;
