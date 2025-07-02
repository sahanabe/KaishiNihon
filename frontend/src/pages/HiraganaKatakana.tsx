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

  // Complete Hiragana characters with stroke order and mnemonics  
  const hiraganaCharacters = [
    // Vowels (あいうえお)
    { 
      char: 'あ', romaji: 'a', sound: '/a/', mnemonic: 'A woman with Arms open wide', strokes: 3, group: 'vowels',
      strokePaths: [
        // First stroke: horizontal line across top
        [[80, 60], [100, 58], [120, 56], [140, 55], [160, 56], [180, 58], [200, 60], [220, 62]],
        // Second stroke: vertical line on left side
        [[110, 40], [108, 60], [106, 80], [104, 100], [102, 120], [100, 140], [98, 160], [96, 180], [94, 200], [96, 220], [98, 240]],
        // Third stroke: large curved stroke forming right part
        [[190, 80], [195, 90], [200, 105], [205, 120], [210, 135], [215, 150], [220, 165], [225, 180], [228, 195], [230, 210], [228, 225], [225, 240], [220, 252], [210, 262], [195, 270], [180, 275], [165, 278], [150, 278], [135, 275], [122, 270], [112, 262], [105, 252], [100, 240], [98, 225], [100, 210], [105, 198], [115, 188], [130, 180], [150, 175], [170, 172], [190, 175], [205, 180], [215, 188], [220, 198]]
      ]
    },
    { 
      char: 'い', romaji: 'i', sound: '/i/', mnemonic: 'Two sticks like roman numeral II', strokes: 2, group: 'vowels',
      strokePaths: [
        // First stroke: left vertical line
        [[100, 50], [98, 70], [96, 90], [94, 110], [92, 130], [90, 150], [88, 170], [86, 190], [84, 210], [86, 230], [88, 250]],
        // Second stroke: right vertical with hook
        [[200, 65], [198, 85], [196, 105], [194, 125], [192, 145], [190, 165], [188, 185], [186, 205], [184, 225], [180, 245], [175, 260], [165, 270], [150, 275], [130, 278]]
      ]
    },
    { 
      char: 'う', romaji: 'u', sound: '/u/', mnemonic: 'A smiling face with a Unibrow', strokes: 2, group: 'vowels',
      strokePaths: [
        // First stroke: horizontal line with slight curve
        [[70, 110], [90, 108], [110, 106], [130, 105], [150, 104], [170, 105], [190, 106], [210, 108], [230, 110]],
        // Second stroke: bottom curved stroke resembling う shape
        [[80, 160], [100, 170], [120, 180], [140, 188], [160, 195], [180, 200], [200, 203], [220, 205], [240, 203], [255, 198], [265, 190], [270, 180], [272, 168], [270, 155], [265, 143], [255, 133], [240, 125], [220, 120], [200, 118], [180, 120], [160, 125], [142, 133], [128, 143], [118, 155], [112, 168], [110, 180], [112, 193], [118, 205], [128, 215], [142, 222], [160, 227], [180, 230], [200, 230]]
      ]
    },
    { 
      char: 'え', romaji: 'e', sound: '/e/', mnemonic: 'An Exotic bird with a long neck', strokes: 2, group: 'vowels',
      strokePaths: [
        // First stroke: top horizontal line
        [[70, 90], [90, 88], [110, 86], [130, 85], [150, 86], [170, 88], [190, 90]],
        // Second stroke: bottom curved line with extensions
        [[60, 160], [80, 158], [100, 156], [120, 155], [140, 156], [160, 158], [180, 160], [200, 163], [218, 168], [233, 175], [245, 185], [250, 195], [248, 205], [240, 213], [225, 218], [205, 220], [180, 218], [155, 213], [135, 205], [120, 195], [110, 183], [105, 170]]
      ]
    },
    { 
      char: 'お', romaji: 'o', sound: '/o/', mnemonic: 'UFO with Orbit lines around it', strokes: 3, group: 'vowels',
      strokePaths: [
        // First stroke: left vertical line
        [[80, 50], [78, 70], [76, 90], [74, 110], [72, 130], [70, 150], [68, 170], [66, 190], [64, 210], [66, 230], [68, 250]],
        // Second stroke: top horizontal line
        [[110, 85], [130, 83], [150, 82], [170, 83], [190, 85]],
        // Third stroke: bottom horizontal with right extension
        [[110, 170], [130, 168], [150, 167], [170, 168], [190, 170], [210, 173], [228, 178], [243, 185], [253, 195], [258, 205], [260, 218], [258, 230], [253, 240], [243, 248], [228, 253], [210, 255], [190, 253], [170, 250], [153, 245], [138, 238], [126, 228], [118, 215], [115, 200], [118, 188], [126, 178], [138, 170]]
      ]
    },
    // K-sounds (かきくけこ)
    { 
      char: 'か', romaji: 'ka', sound: '/ka/', mnemonic: 'A Karate chop breaking a stick', strokes: 3, group: 'k-sounds',
      strokePaths: [
        // First stroke: horizontal line
        [[80, 80], [100, 78], [120, 76], [140, 75], [160, 76], [180, 78], [200, 80]],
        // Second stroke: vertical line
        [[110, 60], [108, 80], [106, 100], [104, 120], [102, 140], [100, 160], [98, 180], [96, 200], [98, 220]],
        // Third stroke: right curved stroke
        [[170, 100], [175, 110], [180, 125], [185, 140], [190, 155], [195, 170], [200, 185], [202, 200], [200, 215], [195, 228], [185, 238], [170, 245], [150, 248], [130, 245], [115, 238], [105, 228], [100, 215]]
      ]
    },
    { 
      char: 'き', romaji: 'ki', sound: '/ki/', mnemonic: 'A Key with teeth pointing up', strokes: 4, group: 'k-sounds',
      strokePaths: [
        // First stroke: horizontal top line
        [[70, 70], [90, 68], [110, 67], [130, 68], [150, 70]],
        // Second stroke: left vertical
        [[90, 50], [88, 70], [86, 90], [84, 110], [82, 130], [80, 150], [78, 170], [76, 190], [78, 210]],
        // Third stroke: diagonal crossing
        [[120, 90], [125, 100], [130, 110], [135, 120], [140, 130], [145, 140], [150, 150], [155, 160], [160, 170]],
        // Fourth stroke: bottom right stroke
        [[110, 140], [120, 145], [130, 150], [140, 155], [150, 160], [160, 165], [170, 170], [180, 175], [190, 180]]
      ]
    },
    { 
      char: 'く', romaji: 'ku', sound: '/ku/', mnemonic: 'A bird\'s beak saying "Coo"', strokes: 1, group: 'k-sounds',
      strokePaths: [
        // Single stroke: curved line like a beak
        [[200, 80], [190, 90], [180, 105], [170, 120], [160, 135], [150, 150], [140, 165], [130, 180], [125, 195], [122, 210], [125, 225], [135, 235], [150, 240]]
      ]
    },
    { 
      char: 'け', romaji: 'ke', sound: '/ke/', mnemonic: 'A Keg on its side', strokes: 3, group: 'k-sounds',
      strokePaths: [
        // First stroke: top horizontal
        [[70, 80], [90, 78], [110, 76], [130, 75], [150, 76], [170, 78], [190, 80]],
        // Second stroke: left vertical with curve
        [[100, 60], [98, 80], [96, 100], [94, 120], [92, 140], [90, 160], [88, 180], [86, 200], [88, 220], [92, 235]],
        // Third stroke: right diagonal with hook
        [[160, 110], [165, 120], [170, 130], [175, 140], [180, 150], [185, 160], [190, 170], [192, 180], [190, 190], [185, 198], [175, 203], [160, 205]]
      ]
    },
    { 
      char: 'こ', romaji: 'ko', sound: '/ko/', mnemonic: 'Two horizontal lines like a Comb', strokes: 2, group: 'k-sounds',
      strokePaths: [
        // First stroke: top horizontal
        [[80, 100], [100, 98], [120, 96], [140, 95], [160, 96], [180, 98], [200, 100]],
        // Second stroke: bottom horizontal
        [[80, 160], [100, 158], [120, 156], [140, 155], [160, 156], [180, 158], [200, 160], [220, 162]]
      ]
    },
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
  ];

  // Complete Katakana characters
  const katakanaCharacters = [
    // Vowels (アイウエオ)
    { 
      char: 'ア', romaji: 'a', sound: '/a/', mnemonic: 'An Axe chopping wood', strokes: 2, group: 'vowels',
      strokePaths: [
        // First stroke: left diagonal line (like axe handle)
        [[95, 45], [92, 65], [89, 85], [86, 105], [83, 125], [80, 145], [77, 165], [74, 185], [71, 205]],
        // Second stroke: horizontal crossing line
        [[75, 115], [95, 113], [115, 111], [135, 110], [155, 111], [175, 113], [195, 115]]
      ]
    },
    { 
      char: 'イ', romaji: 'i', sound: '/i/', mnemonic: 'An Eagle\'s beak pointing right', strokes: 2, group: 'vowels',
      strokePaths: [
        // First stroke: left vertical line
        [[75, 50], [73, 70], [71, 90], [69, 110], [67, 130], [65, 150], [63, 170], [61, 190], [59, 210]],
        // Second stroke: right diagonal line slanting down
        [[155, 60], [150, 80], [145, 100], [140, 120], [135, 140], [130, 160], [125, 180], [120, 200], [115, 220]]
      ]
    },
    { 
      char: 'ウ', romaji: 'u', sound: '/u/', mnemonic: 'A Warrior\'s helmet', strokes: 3, group: 'vowels',
      strokePaths: [
        // First stroke: top horizontal line
        [[65, 65], [85, 63], [105, 62], [125, 63], [145, 65]],
        // Second stroke: left diagonal down and curve
        [[75, 100], [80, 115], [85, 130], [90, 145], [95, 160], [100, 170]],
        // Third stroke: right diagonal down
        [[135, 100], [130, 115], [125, 130], [120, 145], [115, 160], [110, 170]]
      ]
    },
    { 
      char: 'エ', romaji: 'e', sound: '/e/', mnemonic: 'An Elevator shaft', strokes: 3, group: 'vowels',
      strokePaths: [
        // First stroke: top horizontal
        [[70, 70], [90, 68], [110, 67], [130, 68], [150, 70]],
        // Second stroke: middle horizontal
        [[70, 110], [90, 108], [110, 107], [130, 108], [150, 110]],
        // Third stroke: bottom horizontal (longest)
        [[70, 150], [90, 148], [110, 147], [130, 148], [150, 150], [170, 152], [190, 154]]
      ]
    },
    { 
      char: 'オ', romaji: 'o', sound: '/o/', mnemonic: 'An Opera singer\'s mouth', strokes: 3, group: 'vowels',
      strokePaths: [
        // First stroke: top horizontal
        [[70, 70], [90, 68], [110, 67], [130, 68], [150, 70]],
        // Second stroke: left vertical line
        [[90, 50], [88, 80], [86, 110], [84, 140], [82, 170], [80, 200]],
        // Third stroke: right vertical with slight curve
        [[140, 90], [138, 120], [136, 150], [134, 180], [132, 210]]
      ]
    },
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
    { name: 'W-sounds & N (わをん/ワヲン)', count: 3, color: 'bg-teal-100 text-teal-800' }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Memory Card Game Modal */}
      {showMemoryGame && (
        <MemoryCardGame onClose={() => setShowMemoryGame(false)} />
      )}

      {/* Speed Recognition Game Modal */}
      {showSpeedGame && (
        <SpeedRecognitionGame onClose={() => setShowSpeedGame(false)} />
      )}

      {/* Stroke Puzzle Game Modal */}
      {showStrokePuzzle && (
        <StrokePuzzle onClose={() => setShowStrokePuzzle(false)} />
      )}
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <Link 
              to="/language/jlpt-n5" 
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to JLPT N5 Course</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Home className="w-5 h-5" />
              <span className="text-sm">Step 1 of 6</span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Pen className="w-8 h-8 text-yellow-300" />
              <span className="bg-yellow-300 text-purple-900 px-3 py-1 rounded-full text-sm font-bold">
                AI-Powered Writing System
              </span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Master <span className="text-yellow-300">Hiragana & Katakana</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Learn all 92 characters with the world's most advanced AI writing system. 
              Perfect stroke order, pronunciation, and memory techniques.
            </p>
            
            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-2">ひらがな Hiragana</h3>
                <div className="flex items-center justify-between mb-2">
                  <span>Progress</span>
                  <span>{userProgress.hiragana.learned}/46</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div 
                    className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(userProgress.hiragana.learned / 46) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-2">カタカナ Katakana</h3>
                <div className="flex items-center justify-between mb-2">
                  <span>Progress</span>
                  <span>{userProgress.katakana.learned}/46</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div 
                    className="bg-green-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(userProgress.katakana.learned / 46) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Learning Overview', icon: <BookOpen className="w-4 h-4" /> },
              { id: 'practice', label: 'Character Practice', icon: <Pen className="w-4 h-4" /> },
              { id: 'memory', label: 'Memory Training', icon: <Brain className="w-4 h-4" /> },
              { id: 'exam', label: 'Mastery Exam', icon: <Award className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-purple-600'
                }`}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* AI Features */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">World's Most Advanced Character Learning System</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our AI analyzes your writing patterns, adapts to your learning style, and creates personalized memory techniques
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {aiFeatures.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{feature.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Complete Character Tables */}
            <div className="space-y-8">
              {/* Hiragana Table */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <h3 className="text-3xl font-bold text-gray-900">🟩 Hiragana (ひらがな)</h3>
                </div>
                
                {/* Basic Gojūon */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-blue-600 mb-4">🔹 Basic (Gojūon)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="p-3 text-left font-bold text-gray-600">Sound</th>
                          <th className="p-3 text-center font-bold text-blue-600">A</th>
                          <th className="p-3 text-center font-bold text-blue-600">I</th>
                          <th className="p-3 text-center font-bold text-blue-600">U</th>
                          <th className="p-3 text-center font-bold text-blue-600">E</th>
                          <th className="p-3 text-center font-bold text-blue-600">O</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 font-semibold">-</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded" 
                              onClick={() => handleCharacterClick('あ', 'hiragana')}
                          >あ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('い', 'hiragana')}
                          >い</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('う', 'hiragana')}
                          >う</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('え', 'hiragana')}
                          >え</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('お', 'hiragana')}
                          >お</td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 font-semibold">K</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('か', 'hiragana')}
                          >か</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('き', 'hiragana')}
                          >き</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('く', 'hiragana')}
                          >く</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('け', 'hiragana')}
                          >け</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('こ', 'hiragana')}
                          >こ</td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 font-semibold">S</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('さ', 'hiragana')}
                          >さ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('し', 'hiragana')}
                          >し</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('す', 'hiragana')}
                          >す</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('せ', 'hiragana')}
                          >せ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('そ', 'hiragana')}
                          >そ</td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 font-semibold">T</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('た', 'hiragana')}
                          >た</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('ち', 'hiragana')}
                          >ち</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('つ', 'hiragana')}
                          >つ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('て', 'hiragana')}
                          >て</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('と', 'hiragana')}
                          >と</td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 font-semibold">N</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('な', 'hiragana')}
                          >な</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('に', 'hiragana')}
                          >に</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('ぬ', 'hiragana')}
                          >ぬ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('ね', 'hiragana')}
                          >ね</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('の', 'hiragana')}
                          >の</td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 font-semibold">H</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('は', 'hiragana')}
                          >は</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('ひ', 'hiragana')}
                          >ひ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('ふ', 'hiragana')}
                          >ふ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('へ', 'hiragana')}
                          >へ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('ほ', 'hiragana')}
                          >ほ</td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 font-semibold">M</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('ま', 'hiragana')}
                          >ま</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('み', 'hiragana')}
                          >み</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('む', 'hiragana')}
                          >む</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('め', 'hiragana')}
                          >め</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('も', 'hiragana')}
                          >も</td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 font-semibold">Y</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('や', 'hiragana')}
                          >や</td>
                          <td className="p-3 text-center text-gray-400">-</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('ゆ', 'hiragana')}
                          >ゆ</td>
                          <td className="p-3 text-center text-gray-400">-</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('よ', 'hiragana')}
                          >よ</td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 font-semibold">R</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('ら', 'hiragana')}
                          >ら</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('り', 'hiragana')}
                          >り</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('る', 'hiragana')}
                          >る</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('れ', 'hiragana')}
                          >れ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('ろ', 'hiragana')}
                          >ろ</td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 font-semibold">W</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('わ', 'hiragana')}
                          >わ</td>
                          <td className="p-3 text-center text-gray-400">-</td>
                          <td className="p-3 text-center text-gray-400">-</td>
                          <td className="p-3 text-center text-gray-400">-</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('を', 'hiragana')}
                          >を</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="p-3 font-semibold">N</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('ん', 'hiragana')}
                          >ん</td>
                          <td className="p-3 text-center text-gray-400"></td>
                          <td className="p-3 text-center text-gray-400"></td>
                          <td className="p-3 text-center text-gray-400"></td>
                          <td className="p-3 text-center text-gray-400"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Dakuten and Handakuten */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-lg font-bold text-blue-600 mb-3">🔹 With Dakuten (゛)</h4>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="font-semibold text-gray-600">G</div>
                      <div className="font-semibold text-gray-600">Z</div>
                      <div className="font-semibold text-gray-600">D</div>
                      <div className="font-semibold text-gray-600">B</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-blue-100 rounded p-2">が</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-blue-100 rounded p-2">ざ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-blue-100 rounded p-2">だ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-blue-100 rounded p-2">ば</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-blue-100 rounded p-2">ぎ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-blue-100 rounded p-2">じ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-blue-100 rounded p-2">ぢ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-blue-100 rounded p-2">び</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-blue-100 rounded p-2">ぐ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-blue-100 rounded p-2">ず</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-blue-100 rounded p-2">づ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-blue-100 rounded p-2">ぶ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-blue-100 rounded p-2">げ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-blue-100 rounded p-2">ぜ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-blue-100 rounded p-2">で</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-blue-100 rounded p-2">べ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-blue-100 rounded p-2">ご</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-blue-100 rounded p-2">ぞ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-blue-100 rounded p-2">ど</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-blue-100 rounded p-2">ぼ</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold text-blue-600 mb-3">🔹 With Handakuten (゜)</h4>
                    <div className="text-center">
                      <div className="font-semibold text-gray-600 mb-2">P</div>
                      <div className="grid grid-cols-5 gap-2">
                        <div className="text-xl font-bold cursor-pointer hover:bg-blue-100 rounded p-2">ぱ</div>
                        <div className="text-xl font-bold cursor-pointer hover:bg-blue-100 rounded p-2">ぴ</div>
                        <div className="text-xl font-bold cursor-pointer hover:bg-blue-100 rounded p-2">ぷ</div>
                        <div className="text-xl font-bold cursor-pointer hover:bg-blue-100 rounded p-2">ぺ</div>
                        <div className="text-xl font-bold cursor-pointer hover:bg-blue-100 rounded p-2">ぽ</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Yōon (Combinations) */}
                <div>
                  <h4 className="text-lg font-bold text-blue-600 mb-3">🔹 Yōon (Combinations)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="p-2 text-left font-bold text-gray-600">Sound</th>
                          <th className="p-2 text-center font-bold text-blue-600">K</th>
                          <th className="p-2 text-center font-bold text-blue-600">G</th>
                          <th className="p-2 text-center font-bold text-blue-600">S</th>
                          <th className="p-2 text-center font-bold text-blue-600">Z</th>
                          <th className="p-2 text-center font-bold text-blue-600">T</th>
                          <th className="p-2 text-center font-bold text-blue-600">D</th>
                          <th className="p-2 text-center font-bold text-blue-600">N</th>
                          <th className="p-2 text-center font-bold text-blue-600">H</th>
                          <th className="p-2 text-center font-bold text-blue-600">B</th>
                          <th className="p-2 text-center font-bold text-blue-600">P</th>
                          <th className="p-2 text-center font-bold text-blue-600">M</th>
                          <th className="p-2 text-center font-bold text-blue-600">R</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-2 font-semibold">YA</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('きゃ', 'hiragana')}
                          >きゃ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('ぎゃ', 'hiragana')}
                          >ぎゃ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('しゃ', 'hiragana')}
                          >しゃ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('じゃ', 'hiragana')}
                          >じゃ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('ちゃ', 'hiragana')}
                          >ちゃ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('ぢゃ', 'hiragana')}
                          >ぢゃ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('にゃ', 'hiragana')}
                          >にゃ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('ひゃ', 'hiragana')}
                          >ひゃ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('びゃ', 'hiragana')}
                          >びゃ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('ぴゃ', 'hiragana')}
                          >ぴゃ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('みゃ', 'hiragana')}
                          >みゃ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('りゃ', 'hiragana')}
                          >りゃ</td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-2 font-semibold">YU</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('きゅ', 'hiragana')}
                          >きゅ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('ぎゅ', 'hiragana')}
                          >ぎゅ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('しゅ', 'hiragana')}
                          >しゅ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('じゅ', 'hiragana')}
                          >じゅ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('ちゅ', 'hiragana')}
                          >ちゅ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('ぢゅ', 'hiragana')}
                          >ぢゅ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('にゅ', 'hiragana')}
                          >にゅ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('ひゅ', 'hiragana')}
                          >ひゅ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('びゅ', 'hiragana')}
                          >びゅ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('ぴゅ', 'hiragana')}
                          >ぴゅ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('みゅ', 'hiragana')}
                          >みゅ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('りゅ', 'hiragana')}
                          >りゅ</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="p-2 font-semibold">YO</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('きょ', 'hiragana')}
                          >きょ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('ぎょ', 'hiragana')}
                          >ぎょ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('しょ', 'hiragana')}
                          >しょ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('じょ', 'hiragana')}
                          >じょ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('ちょ', 'hiragana')}
                          >ちょ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('ぢょ', 'hiragana')}
                          >ぢょ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('にょ', 'hiragana')}
                          >にょ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('ひょ', 'hiragana')}
                          >ひょ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('びょ', 'hiragana')}
                          >びょ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('ぴょ', 'hiragana')}
                          >ぴょ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('みょ', 'hiragana')}
                          >みょ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-blue-100 rounded"
                              onClick={() => handleCharacterClick('りょ', 'hiragana')}
                          >りょ</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Katakana Table */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                  <h3 className="text-3xl font-bold text-gray-900">🟧 Katakana (カタカナ)</h3>
                </div>
                
                {/* Basic Gojūon */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-orange-600 mb-4">🔹 Basic (Gojūon)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="p-3 text-left font-bold text-gray-600">Sound</th>
                          <th className="p-3 text-center font-bold text-orange-600">A</th>
                          <th className="p-3 text-center font-bold text-orange-600">I</th>
                          <th className="p-3 text-center font-bold text-orange-600">U</th>
                          <th className="p-3 text-center font-bold text-orange-600">E</th>
                          <th className="p-3 text-center font-bold text-orange-600">O</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 font-semibold">-</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded" 
                              onClick={() => handleCharacterClick('ア', 'katakana')}
                          >ア</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('イ', 'katakana')}
                          >イ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ウ', 'katakana')}
                          >ウ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('エ', 'katakana')}
                          >エ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('オ', 'katakana')}
                          >オ</td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 font-semibold">K</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('カ', 'katakana')}
                          >カ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('キ', 'katakana')}
                          >キ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ク', 'katakana')}
                          >ク</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ケ', 'katakana')}
                          >ケ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('コ', 'katakana')}
                          >コ</td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 font-semibold">S</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('サ', 'katakana')}
                          >サ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('シ', 'katakana')}
                          >シ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ス', 'katakana')}
                          >ス</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('セ', 'katakana')}
                          >セ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ソ', 'katakana')}
                          >ソ</td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 font-semibold">T</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('タ', 'katakana')}
                          >タ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('チ', 'katakana')}
                          >チ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ツ', 'katakana')}
                          >ツ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('テ', 'katakana')}
                          >テ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ト', 'katakana')}
                          >ト</td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 font-semibold">N</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ナ', 'katakana')}
                          >ナ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ニ', 'katakana')}
                          >ニ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ヌ', 'katakana')}
                          >ヌ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ネ', 'katakana')}
                          >ネ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ノ', 'katakana')}
                          >ノ</td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 font-semibold">H</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ハ', 'katakana')}
                          >ハ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ヒ', 'katakana')}
                          >ヒ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('フ', 'katakana')}
                          >フ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ヘ', 'katakana')}
                          >ヘ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ホ', 'katakana')}
                          >ホ</td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 font-semibold">M</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('マ', 'katakana')}
                          >マ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ミ', 'katakana')}
                          >ミ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ム', 'katakana')}
                          >ム</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('メ', 'katakana')}
                          >メ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('モ', 'katakana')}
                          >モ</td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 font-semibold">Y</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ヤ', 'katakana')}
                          >ヤ</td>
                          <td className="p-3 text-center text-gray-400">-</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ユ', 'katakana')}
                          >ユ</td>
                          <td className="p-3 text-center text-gray-400">-</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ヨ', 'katakana')}
                          >ヨ</td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 font-semibold">R</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ラ', 'katakana')}
                          >ラ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('リ', 'katakana')}
                          >リ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ル', 'katakana')}
                          >ル</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('レ', 'katakana')}
                          >レ</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ロ', 'katakana')}
                          >ロ</td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3 font-semibold">W</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ワ', 'katakana')}
                          >ワ</td>
                          <td className="p-3 text-center text-gray-400">-</td>
                          <td className="p-3 text-center text-gray-400">-</td>
                          <td className="p-3 text-center text-gray-400">-</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ヲ', 'katakana')}
                          >ヲ</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="p-3 font-semibold">N</td>
                          <td className="p-3 text-center text-2xl font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ン', 'katakana')}
                          >ン</td>
                          <td className="p-3 text-center text-gray-400"></td>
                          <td className="p-3 text-center text-gray-400"></td>
                          <td className="p-3 text-center text-gray-400"></td>
                          <td className="p-3 text-center text-gray-400"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Dakuten and Handakuten for Katakana */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-bold text-orange-600 mb-3">🔹 With Dakuten (゛)</h4>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="font-semibold text-gray-600">G</div>
                      <div className="font-semibold text-gray-600">Z</div>
                      <div className="font-semibold text-gray-600">D</div>
                      <div className="font-semibold text-gray-600">B</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-orange-100 rounded p-2">ガ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-orange-100 rounded p-2">ザ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-orange-100 rounded p-2">ダ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-orange-100 rounded p-2">バ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-orange-100 rounded p-2">ギ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-orange-100 rounded p-2">ジ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-orange-100 rounded p-2">ヂ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-orange-100 rounded p-2">ビ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-orange-100 rounded p-2">グ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-orange-100 rounded p-2">ズ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-orange-100 rounded p-2">ヅ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-orange-100 rounded p-2">ブ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-orange-100 rounded p-2">ゲ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-orange-100 rounded p-2">ゼ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-orange-100 rounded p-2">デ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-orange-100 rounded p-2">ベ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-orange-100 rounded p-2">ゴ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-orange-100 rounded p-2">ゾ</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-orange-100 rounded p-2">ド</div>
                      <div className="text-xl font-bold cursor-pointer hover:bg-orange-100 rounded p-2">ボ</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold text-orange-600 mb-3">🔹 With Handakuten (゜)</h4>
                    <div className="text-center">
                      <div className="font-semibold text-gray-600 mb-2">P</div>
                      <div className="grid grid-cols-5 gap-2">
                        <div className="text-xl font-bold cursor-pointer hover:bg-orange-100 rounded p-2">パ</div>
                        <div className="text-xl font-bold cursor-pointer hover:bg-orange-100 rounded p-2">ピ</div>
                        <div className="text-xl font-bold cursor-pointer hover:bg-orange-100 rounded p-2">プ</div>
                        <div className="text-xl font-bold cursor-pointer hover:bg-orange-100 rounded p-2">ペ</div>
                        <div className="text-xl font-bold cursor-pointer hover:bg-orange-100 rounded p-2">ポ</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Yōon (Combinations) */}
                <div>
                  <h4 className="text-lg font-bold text-orange-600 mb-3">🔹 Yōon (Combinations)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="p-2 text-left font-bold text-gray-600">Sound</th>
                          <th className="p-2 text-center font-bold text-orange-600">K</th>
                          <th className="p-2 text-center font-bold text-orange-600">G</th>
                          <th className="p-2 text-center font-bold text-orange-600">S</th>
                          <th className="p-2 text-center font-bold text-orange-600">Z</th>
                          <th className="p-2 text-center font-bold text-orange-600">T</th>
                          <th className="p-2 text-center font-bold text-orange-600">D</th>
                          <th className="p-2 text-center font-bold text-orange-600">N</th>
                          <th className="p-2 text-center font-bold text-orange-600">H</th>
                          <th className="p-2 text-center font-bold text-orange-600">B</th>
                          <th className="p-2 text-center font-bold text-orange-600">P</th>
                          <th className="p-2 text-center font-bold text-orange-600">M</th>
                          <th className="p-2 text-center font-bold text-orange-600">R</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-2 font-semibold">YA</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('キャ', 'katakana')}
                          >キャ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ギャ', 'katakana')}
                          >ギャ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('シャ', 'katakana')}
                          >シャ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ジャ', 'katakana')}
                          >ジャ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('チャ', 'katakana')}
                          >チャ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ヂャ', 'katakana')}
                          >ヂャ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ニャ', 'katakana')}
                          >ニャ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ヒャ', 'katakana')}
                          >ヒャ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ビャ', 'katakana')}
                          >ビャ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ピャ', 'katakana')}
                          >ピャ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ミャ', 'katakana')}
                          >ミャ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('リャ', 'katakana')}
                          >リャ</td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-2 font-semibold">YU</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('キュ', 'katakana')}
                          >キュ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ギュ', 'katakana')}
                          >ギュ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('シュ', 'katakana')}
                          >シュ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ジュ', 'katakana')}
                          >ジュ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('チュ', 'katakana')}
                          >チュ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ヂュ', 'katakana')}
                          >ヂュ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ニュ', 'katakana')}
                          >ニュ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ヒュ', 'katakana')}
                          >ヒュ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ビュ', 'katakana')}
                          >ビュ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ピュ', 'katakana')}
                          >ピュ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ミュ', 'katakana')}
                          >ミュ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('リュ', 'katakana')}
                          >リュ</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="p-2 font-semibold">YO</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('キョ', 'katakana')}
                          >キョ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ギョ', 'katakana')}
                          >ギョ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ショ', 'katakana')}
                          >ショ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ジョ', 'katakana')}
                          >ジョ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('チョ', 'katakana')}
                          >チョ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ヂョ', 'katakana')}
                          >ヂョ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ニョ', 'katakana')}
                          >ニョ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ヒョ', 'katakana')}
                          >ヒョ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ビョ', 'katakana')}
                          >ビョ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ピョ', 'katakana')}
                          >ピョ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('ミョ', 'katakana')}
                          >ミョ</td>
                          <td className="p-2 text-center text-lg font-bold cursor-pointer hover:bg-orange-100 rounded"
                              onClick={() => handleCharacterClick('リョ', 'katakana')}
                          >リョ</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Character Groups Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Learning Structure</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {characterGroups.map((group, index) => (
                  <div key={index} className={`${group.color} p-4 rounded-lg`}>
                    <div className="font-bold text-lg">{group.name}</div>
                    <div className="text-sm opacity-75">{group.count} characters</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Start Learning Section */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-8 text-center">
              <h3 className="text-3xl font-bold mb-4">Ready to Start?</h3>
              <p className="text-xl mb-8 text-purple-100">
                Begin with the first character and master the foundation of Japanese writing
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button 
                  onClick={() => setActiveTab('practice')}
                  className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all duration-300 flex items-center space-x-2 group"
                >
                  <Pen className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <span>Start Learning Characters</span>
                </button>
                <button className="bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300">
                  Take Placement Test
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-8">
            {/* Script Selector */}
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => {
                  setCurrentScript('hiragana');
                  setCurrentCharacterIndex(0);
                  setFeedbackType('neutral');
                  setFeedback('Practice drawing this character. Use the animation as a guide for proper stroke order.');
                  clearCanvas();
                }}
                className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${
                  currentScript === 'hiragana'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                ひらがな Hiragana
              </button>
              <button
                onClick={() => {
                  setCurrentScript('katakana');
                  setCurrentCharacterIndex(0);
                  setFeedbackType('neutral');
                  setFeedback('Practice drawing this character. Use the animation as a guide for proper stroke order.');
                  clearCanvas();
                }}
                className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${
                  currentScript === 'katakana'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                カタカナ Katakana
              </button>
            </div>

            {/* Character Learning Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Character Display */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-8">
                  <div className="text-8xl font-bold text-gray-900 mb-4">
                    {currentCharacter.char}
                  </div>
                  <div className="text-2xl text-gray-600 mb-2">
                    {currentCharacter.romaji}
                  </div>
                  <div className="text-lg text-purple-600 font-semibold">
                    {currentCharacter.sound}
                  </div>
                </div>

                {/* Audio Controls */}
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <button
                    onClick={playPronunciation}
                    className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <Volume2 className="w-6 h-6" />
                  </button>
                  <span className="text-gray-600">Listen to pronunciation</span>
                </div>

                {/* Video Demonstration */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <PlayCircle className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-purple-800">Video Guide</span>
                  </div>
                  <div className="relative bg-white rounded-lg p-3 border-2 border-purple-200">
                    <video 
                      className="w-full h-32 rounded-lg object-cover bg-gray-100"
                      controls
                      poster={`/api/video-poster/${currentCharacter.char}`}
                      key={currentCharacter.char} // Force reload when character changes
                    >
                      <source src={`/api/character-videos/${currentCharacter.char}.mp4`} type="video/mp4" />
                      <source src={`/api/character-videos/${currentCharacter.char}.webm`} type="video/webm" />
                      {/* Fallback to demo video */}
                      <source src="/videos/character-demo.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="mt-2 text-center">
                      <p className="text-sm text-purple-600">
                        Watch stroke-by-stroke demonstration for <span className="font-bold text-lg">{currentCharacter.char}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Memory Mnemonic */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                    <span className="font-semibold text-yellow-800">Memory Technique</span>
                  </div>
                  <p className="text-yellow-700">{currentCharacter.mnemonic}</p>
                </div>
              </div>

              {/* Stroke Order Practice */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Stroke Order Practice</h3>
                  <div className="text-sm text-gray-600">
                    {currentCharacter.strokes} stroke{currentCharacter.strokes > 1 ? 's' : ''} total
                  </div>
                </div>

                {/* Practice Canvas */}
                <div className="relative bg-gray-50 rounded-lg p-8 mb-6">
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600">
                      Watch the animation and practice drawing the character
                    </p>
                  </div>
                  <canvas
                    ref={canvasRef}
                    width={300}
                    height={300}
                    className="border-2 border-dashed border-gray-300 rounded-lg mx-auto block cursor-crosshair bg-white shadow-inner"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onTouchMove={handleTouchMove}
                  />

                  <div className="text-center mt-4">
                    <div className="text-xs text-gray-500">
                      🔵 Purple = Animation • ⚫ Gray = Your Drawing
                    </div>
                  </div>
                </div>

                {/* Stroke Controls */}
                <div className="flex items-center justify-center mb-6">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={markCorrect}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors" 
                      title="Mark as correct"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={markIncorrect}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors" 
                      title="Mark as incorrect - try again"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* AI Feedback */}
                <div className={`rounded-lg p-4 ${
                  feedbackType === 'positive' ? 'bg-green-50 border border-green-200' :
                  feedbackType === 'negative' ? 'bg-red-50 border border-red-200' :
                  'bg-blue-50 border border-blue-200'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain className={`w-5 h-5 ${
                      feedbackType === 'positive' ? 'text-green-600' :
                      feedbackType === 'negative' ? 'text-red-600' :
                      'text-blue-600'
                    }`} />
                    <span className={`font-semibold ${
                      feedbackType === 'positive' ? 'text-green-800' :
                      feedbackType === 'negative' ? 'text-red-800' :
                      'text-blue-800'
                    }`}>AI Feedback</span>
                  </div>
                  <p className={`text-sm ${
                    feedbackType === 'positive' ? 'text-green-700' :
                    feedbackType === 'negative' ? 'text-red-700' :
                    'text-blue-700'
                  }`}>
                    {feedback}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={previousCharacter}
                disabled={currentCharacterIndex === 0}
                className="flex items-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Previous Character</span>
              </button>

              <div className="text-center">
                <div className="text-lg font-semibold text-gray-700">
                  Character {currentCharacterIndex + 1} of {getCurrentCharacters().length}
                </div>
                <div className="text-sm text-gray-500">
                  {currentCharacter.group}
                </div>
              </div>

              <button
                onClick={nextCharacter}
                disabled={currentCharacterIndex === getCurrentCharacters().length - 1}
                className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next Character</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'memory' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">AI Memory Training</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Personalized memory techniques that adapt to your learning style and cultural background
              </p>
            </div>

            {/* Memory Games */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4 text-center">🎴</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Memory Cards</h3>
                <p className="text-gray-600 mb-4">Flip cards to match characters with their sounds</p>
                <button 
                  onClick={() => setShowMemoryGame(true)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Start Game
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4 text-center">🎯</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Speed Recognition</h3>
                <p className="text-gray-600 mb-4">Quick-fire character identification challenges</p>
                <button 
                  onClick={() => setShowSpeedGame(true)}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Start Game
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4 text-center">🧩</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Stroke Puzzle</h3>
                <p className="text-gray-600 mb-4">Reconstruct characters from stroke components</p>
                <button 
                  onClick={() => setShowStrokePuzzle(true)}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Start Game
                </button>
              </div>
            </div>

            {/* Spaced Repetition Schedule */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Review Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-red-600 font-bold text-lg">Due Now</div>
                  <div className="text-2xl font-bold text-red-800">12</div>
                  <div className="text-sm text-red-600">characters</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-yellow-600 font-bold text-lg">Due Today</div>
                  <div className="text-2xl font-bold text-yellow-800">8</div>
                  <div className="text-sm text-yellow-600">characters</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-green-600 font-bold text-lg">Learned</div>
                  <div className="text-2xl font-bold text-green-800">35</div>
                  <div className="text-sm text-green-600">characters</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-blue-600 font-bold text-lg">Mastered</div>
                  <div className="text-2xl font-bold text-blue-800">18</div>
                  <div className="text-sm text-blue-600">characters</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exam' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Mastery Examination</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive test of your Hiragana and Katakana knowledge
              </p>
            </div>

            {/* Exam Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Practice Exam</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Questions:</span>
                    <span className="font-semibold">50 (25 Hiragana + 25 Katakana)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Limit:</span>
                    <span className="font-semibold">20 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Passing Score:</span>
                    <span className="font-semibold">80%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Question Types:</span>
                    <span className="font-semibold">Reading & Writing</span>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors">
                  Start Practice Exam
                </button>
              </div>

              <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-4">Official Mastery Test</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Questions:</span>
                    <span className="font-semibold">92 (All Characters)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Limit:</span>
                    <span className="font-semibold">45 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Passing Score:</span>
                    <span className="font-semibold">90%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Certification:</span>
                    <span className="font-semibold">Kaishi Certificate</span>
                  </div>
                </div>
                <button className="w-full bg-yellow-400 text-purple-900 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors">
                  Take Official Exam
                </button>
              </div>
            </div>

            {/* Previous Results */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Previous Results</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-green-800">Hiragana Practice Test</div>
                    <div className="text-sm text-green-600">March 15, 2024</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-800">92%</div>
                    <div className="text-sm text-green-600">Passed</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-yellow-800">Katakana Practice Test</div>
                    <div className="text-sm text-yellow-600">March 12, 2024</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-yellow-800">76%</div>
                    <div className="text-sm text-yellow-600">Needs Review</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
