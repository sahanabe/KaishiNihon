import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Home, Trophy, Clock, Star, Volume2 } from 'lucide-react';

interface Card {
  id: string;
  character: string;
  romaji: string;
  type: 'character' | 'romaji';
  isFlipped: boolean;
  isMatched: boolean;
  script: 'hiragana' | 'katakana';
}

interface GameStats {
  score: number;
  matches: number;
  attempts: number;
  timeElapsed: number;
  level: number;
}

const MemoryCardGame: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [gameStats, setGameStats] = useState<GameStats>({
    score: 0,
    matches: 0,
    attempts: 0,
    timeElapsed: 0,
    level: 1
  });
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [selectedScript, setSelectedScript] = useState<'hiragana' | 'katakana' | 'both'>('both');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Complete character sets including all variations
  const allCharacters = {
    hiragana: {
      gojuon: [
        { char: 'あ', romaji: 'a' }, { char: 'い', romaji: 'i' }, { char: 'う', romaji: 'u' }, { char: 'え', romaji: 'e' }, { char: 'お', romaji: 'o' },
        { char: 'か', romaji: 'ka' }, { char: 'き', romaji: 'ki' }, { char: 'く', romaji: 'ku' }, { char: 'け', romaji: 'ke' }, { char: 'こ', romaji: 'ko' },
        { char: 'さ', romaji: 'sa' }, { char: 'し', romaji: 'shi' }, { char: 'す', romaji: 'su' }, { char: 'せ', romaji: 'se' }, { char: 'そ', romaji: 'so' },
        { char: 'た', romaji: 'ta' }, { char: 'ち', romaji: 'chi' }, { char: 'つ', romaji: 'tsu' }, { char: 'て', romaji: 'te' }, { char: 'と', romaji: 'to' },
        { char: 'な', romaji: 'na' }, { char: 'に', romaji: 'ni' }, { char: 'ぬ', romaji: 'nu' }, { char: 'ね', romaji: 'ne' }, { char: 'の', romaji: 'no' },
        { char: 'は', romaji: 'ha' }, { char: 'ひ', romaji: 'hi' }, { char: 'ふ', romaji: 'fu' }, { char: 'へ', romaji: 'he' }, { char: 'ほ', romaji: 'ho' },
        { char: 'ま', romaji: 'ma' }, { char: 'み', romaji: 'mi' }, { char: 'む', romaji: 'mu' }, { char: 'め', romaji: 'me' }, { char: 'も', romaji: 'mo' },
        { char: 'や', romaji: 'ya' }, { char: 'ゆ', romaji: 'yu' }, { char: 'よ', romaji: 'yo' },
        { char: 'ら', romaji: 'ra' }, { char: 'り', romaji: 'ri' }, { char: 'る', romaji: 'ru' }, { char: 'れ', romaji: 're' }, { char: 'ろ', romaji: 'ro' },
        { char: 'わ', romaji: 'wa' }, { char: 'を', romaji: 'wo' }, { char: 'ん', romaji: 'n' }
      ],
      dakuten: [
        { char: 'が', romaji: 'ga' }, { char: 'ぎ', romaji: 'gi' }, { char: 'ぐ', romaji: 'gu' }, { char: 'げ', romaji: 'ge' }, { char: 'ご', romaji: 'go' },
        { char: 'ざ', romaji: 'za' }, { char: 'じ', romaji: 'ji' }, { char: 'ず', romaji: 'zu' }, { char: 'ぜ', romaji: 'ze' }, { char: 'ぞ', romaji: 'zo' },
        { char: 'だ', romaji: 'da' }, { char: 'ぢ', romaji: 'di' }, { char: 'づ', romaji: 'du' }, { char: 'で', romaji: 'de' }, { char: 'ど', romaji: 'do' },
        { char: 'ば', romaji: 'ba' }, { char: 'び', romaji: 'bi' }, { char: 'ぶ', romaji: 'bu' }, { char: 'べ', romaji: 'be' }, { char: 'ぼ', romaji: 'bo' }
      ],
      handakuten: [
        { char: 'ぱ', romaji: 'pa' }, { char: 'ぴ', romaji: 'pi' }, { char: 'ぷ', romaji: 'pu' }, { char: 'ぺ', romaji: 'pe' }, { char: 'ぽ', romaji: 'po' }
      ],
      yoon: [
        { char: 'きゃ', romaji: 'kya' }, { char: 'きゅ', romaji: 'kyu' }, { char: 'きょ', romaji: 'kyo' },
        { char: 'ぎゃ', romaji: 'gya' }, { char: 'ぎゅ', romaji: 'gyu' }, { char: 'ぎょ', romaji: 'gyo' },
        { char: 'しゃ', romaji: 'sha' }, { char: 'しゅ', romaji: 'shu' }, { char: 'しょ', romaji: 'sho' },
        { char: 'じゃ', romaji: 'ja' }, { char: 'じゅ', romaji: 'ju' }, { char: 'じょ', romaji: 'jo' },
        { char: 'ちゃ', romaji: 'cha' }, { char: 'ちゅ', romaji: 'chu' }, { char: 'ちょ', romaji: 'cho' },
        { char: 'ぢゃ', romaji: 'dja' }, { char: 'ぢゅ', romaji: 'dju' }, { char: 'ぢょ', romaji: 'djo' },
        { char: 'にゃ', romaji: 'nya' }, { char: 'にゅ', romaji: 'nyu' }, { char: 'にょ', romaji: 'nyo' },
        { char: 'ひゃ', romaji: 'hya' }, { char: 'ひゅ', romaji: 'hyu' }, { char: 'ひょ', romaji: 'hyo' },
        { char: 'びゃ', romaji: 'bya' }, { char: 'びゅ', romaji: 'byu' }, { char: 'びょ', romaji: 'byo' },
        { char: 'ぴゃ', romaji: 'pya' }, { char: 'ぴゅ', romaji: 'pyu' }, { char: 'ぴょ', romaji: 'pyo' },
        { char: 'みゃ', romaji: 'mya' }, { char: 'みゅ', romaji: 'myu' }, { char: 'みょ', romaji: 'myo' },
        { char: 'りゃ', romaji: 'rya' }, { char: 'りゅ', romaji: 'ryu' }, { char: 'りょ', romaji: 'ryo' }
      ]
    },
    katakana: {
      gojuon: [
        { char: 'ア', romaji: 'a' }, { char: 'イ', romaji: 'i' }, { char: 'ウ', romaji: 'u' }, { char: 'エ', romaji: 'e' }, { char: 'オ', romaji: 'o' },
        { char: 'カ', romaji: 'ka' }, { char: 'キ', romaji: 'ki' }, { char: 'ク', romaji: 'ku' }, { char: 'ケ', romaji: 'ke' }, { char: 'コ', romaji: 'ko' },
        { char: 'サ', romaji: 'sa' }, { char: 'シ', romaji: 'shi' }, { char: 'ス', romaji: 'su' }, { char: 'セ', romaji: 'se' }, { char: 'ソ', romaji: 'so' },
        { char: 'タ', romaji: 'ta' }, { char: 'チ', romaji: 'chi' }, { char: 'ツ', romaji: 'tsu' }, { char: 'テ', romaji: 'te' }, { char: 'ト', romaji: 'to' },
        { char: 'ナ', romaji: 'na' }, { char: 'ニ', romaji: 'ni' }, { char: 'ヌ', romaji: 'nu' }, { char: 'ネ', romaji: 'ne' }, { char: 'ノ', romaji: 'no' },
        { char: 'ハ', romaji: 'ha' }, { char: 'ヒ', romaji: 'hi' }, { char: 'フ', romaji: 'fu' }, { char: 'ヘ', romaji: 'he' }, { char: 'ホ', romaji: 'ho' },
        { char: 'マ', romaji: 'ma' }, { char: 'ミ', romaji: 'mi' }, { char: 'ム', romaji: 'mu' }, { char: 'メ', romaji: 'me' }, { char: 'モ', romaji: 'mo' },
        { char: 'ヤ', romaji: 'ya' }, { char: 'ユ', romaji: 'yu' }, { char: 'ヨ', romaji: 'yo' },
        { char: 'ラ', romaji: 'ra' }, { char: 'リ', romaji: 'ri' }, { char: 'ル', romaji: 'ru' }, { char: 'レ', romaji: 're' }, { char: 'ロ', romaji: 'ro' },
        { char: 'ワ', romaji: 'wa' }, { char: 'ヲ', romaji: 'wo' }, { char: 'ン', romaji: 'n' }
      ],
      dakuten: [
        { char: 'ガ', romaji: 'ga' }, { char: 'ギ', romaji: 'gi' }, { char: 'グ', romaji: 'gu' }, { char: 'ゲ', romaji: 'ge' }, { char: 'ゴ', romaji: 'go' },
        { char: 'ザ', romaji: 'za' }, { char: 'ジ', romaji: 'ji' }, { char: 'ズ', romaji: 'zu' }, { char: 'ゼ', romaji: 'ze' }, { char: 'ゾ', romaji: 'zo' },
        { char: 'ダ', romaji: 'da' }, { char: 'ヂ', romaji: 'di' }, { char: 'ヅ', romaji: 'du' }, { char: 'デ', romaji: 'de' }, { char: 'ド', romaji: 'do' },
        { char: 'バ', romaji: 'ba' }, { char: 'ビ', romaji: 'bi' }, { char: 'ブ', romaji: 'bu' }, { char: 'ベ', romaji: 'be' }, { char: 'ボ', romaji: 'bo' }
      ],
      handakuten: [
        { char: 'パ', romaji: 'pa' }, { char: 'ピ', romaji: 'pi' }, { char: 'プ', romaji: 'pu' }, { char: 'ペ', romaji: 'pe' }, { char: 'ポ', romaji: 'po' }
      ],
      yoon: [
        { char: 'キャ', romaji: 'kya' }, { char: 'キュ', romaji: 'kyu' }, { char: 'キョ', romaji: 'kyo' },
        { char: 'ギャ', romaji: 'gya' }, { char: 'ギュ', romaji: 'gyu' }, { char: 'ギョ', romaji: 'gyo' },
        { char: 'シャ', romaji: 'sha' }, { char: 'シュ', romaji: 'shu' }, { char: 'ショ', romaji: 'sho' },
        { char: 'ジャ', romaji: 'ja' }, { char: 'ジュ', romaji: 'ju' }, { char: 'ジョ', romaji: 'jo' },
        { char: 'チャ', romaji: 'cha' }, { char: 'チュ', romaji: 'chu' }, { char: 'チョ', romaji: 'cho' },
        { char: 'ヂャ', romaji: 'dja' }, { char: 'ヂュ', romaji: 'dju' }, { char: 'ヂョ', romaji: 'djo' },
        { char: 'ニャ', romaji: 'nya' }, { char: 'ニュ', romaji: 'nyu' }, { char: 'ニョ', romaji: 'nyo' },
        { char: 'ヒャ', romaji: 'hya' }, { char: 'ヒュ', romaji: 'hyu' }, { char: 'ヒョ', romaji: 'hyo' },
        { char: 'ビャ', romaji: 'bya' }, { char: 'ビュ', romaji: 'byu' }, { char: 'ビョ', romaji: 'byo' },
        { char: 'ピャ', romaji: 'pya' }, { char: 'ピュ', romaji: 'pyu' }, { char: 'ピョ', romaji: 'pyo' },
        { char: 'ミャ', romaji: 'mya' }, { char: 'ミュ', romaji: 'myu' }, { char: 'ミョ', romaji: 'myo' },
        { char: 'リャ', romaji: 'rya' }, { char: 'リュ', romaji: 'ryu' }, { char: 'リョ', romaji: 'ryo' }
      ]
    }
  };

  // Generate cards based on difficulty and script selection
  const generateCards = useCallback(() => {
    let selectedChars: Array<{ char: string; romaji: string; script: 'hiragana' | 'katakana' }> = [];

    if (selectedScript === 'hiragana' || selectedScript === 'both') {
      const allHiragana = [
        ...allCharacters.hiragana.gojuon.map(c => ({ ...c, script: 'hiragana' as const })),
        ...(difficulty !== 'easy' ? allCharacters.hiragana.dakuten.map(c => ({ ...c, script: 'hiragana' as const })) : []),
        ...(difficulty !== 'easy' ? allCharacters.hiragana.handakuten.map(c => ({ ...c, script: 'hiragana' as const })) : []),
        ...(difficulty === 'hard' ? allCharacters.hiragana.yoon.map(c => ({ ...c, script: 'hiragana' as const })) : [])
      ];
      selectedChars.push(...allHiragana);
    }

    if (selectedScript === 'katakana' || selectedScript === 'both') {
      const allKatakana = [
        ...allCharacters.katakana.gojuon.map(c => ({ ...c, script: 'katakana' as const })),
        ...(difficulty !== 'easy' ? allCharacters.katakana.dakuten.map(c => ({ ...c, script: 'katakana' as const })) : []),
        ...(difficulty !== 'easy' ? allCharacters.katakana.handakuten.map(c => ({ ...c, script: 'katakana' as const })) : []),
        ...(difficulty === 'hard' ? allCharacters.katakana.yoon.map(c => ({ ...c, script: 'katakana' as const })) : [])
      ];
      selectedChars.push(...allKatakana);
    }

    // Limit cards based on difficulty
    const maxCards = difficulty === 'easy' ? 20 : difficulty === 'medium' ? 40 : 60;
    const shuffled = selectedChars.sort(() => Math.random() - 0.5).slice(0, maxCards);

    // Create card pairs
    const cardPairs: Card[] = [];
    shuffled.forEach((char, index) => {
      cardPairs.push(
        {
          id: `${char.char}-char-${index}`,
          character: char.char,
          romaji: char.romaji,
          type: 'character',
          isFlipped: false,
          isMatched: false,
          script: char.script
        },
        {
          id: `${char.char}-romaji-${index}`,
          character: char.char,
          romaji: char.romaji,
          type: 'romaji',
          isFlipped: false,
          isMatched: false,
          script: char.script
        }
      );
    });

    return cardPairs.sort(() => Math.random() - 0.5);
  }, [selectedScript, difficulty]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !gameComplete) {
      interval = setInterval(() => {
        setGameStats(prev => ({ ...prev, timeElapsed: prev.timeElapsed + 1 }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameComplete]);

  // Initialize game
  const startGame = () => {
    const newCards = generateCards();
    setCards(newCards);
    setGameStarted(true);
    setGameComplete(false);
    setFlippedCards([]);
    setGameStats({
      score: 0,
      matches: 0,
      attempts: 0,
      timeElapsed: 0,
      level: 1
    });
  };

  // Reset game
  const resetGame = () => {
    setGameStarted(false);
    setGameComplete(false);
    setCards([]);
    setFlippedCards([]);
    setGameStats({
      score: 0,
      matches: 0,
      attempts: 0,
      timeElapsed: 0,
      level: 1
    });
  };

  // Handle card click
  const handleCardClick = (cardId: string) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(cardId)) return;
    if (cards.find(c => c.id === cardId)?.isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // Update cards to show flipped state
    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, isFlipped: true } : card
    ));

    if (newFlippedCards.length === 2) {
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstCardId);
      const secondCard = cards.find(c => c.id === secondCardId);

      setGameStats(prev => ({ ...prev, attempts: prev.attempts + 1 }));

      if (firstCard && secondCard && 
          firstCard.character === secondCard.character && 
          firstCard.type !== secondCard.type) {
        // Match found!
        setFeedbackMessage({ 
          text: `🎉 Perfect! ${firstCard.character} = ${firstCard.romaji}`, 
          type: 'success' 
        });
        
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            (card.id === firstCardId || card.id === secondCardId) 
              ? { ...card, isMatched: true }
              : card
          ));
          setGameStats(prev => ({ 
            ...prev, 
            matches: prev.matches + 1, 
            score: prev.score + (100 - prev.timeElapsed)
          }));
          setFlippedCards([]);
          setFeedbackMessage(null);

          // Check if game is complete
          const totalPairs = cards.length / 2;
          if (gameStats.matches + 1 === totalPairs) {
            setGameComplete(true);
          }
        }, 1500);
      } else {
        // No match
        setFeedbackMessage({ 
          text: `❌ Not a match! Try again`, 
          type: 'error' 
        });
        
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            (card.id === firstCardId || card.id === secondCardId)
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
          setFeedbackMessage(null);
        }, 1500);
      }
    }
  };

  // Play pronunciation
  const playPronunciation = (romaji: string) => {
    // TODO: Implement actual audio playback
    console.log(`Playing pronunciation for: ${romaji}`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 z-50 overflow-auto">
      <div className="min-h-screen p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onClose}
            className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Back to Learning</span>
          </button>

          <h1 className="text-4xl font-bold text-white text-center">
            🎴 Memory Card Challenge
          </h1>

          <div className="flex items-center space-x-4 text-white">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5 inline mr-2" />
              {formatTime(gameStats.timeElapsed)}
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Trophy className="w-5 h-5 inline mr-2" />
              {gameStats.score}
            </div>
          </div>
        </div>

        {!gameStarted ? (
          // Game Setup Screen
          <div className="max-w-6xl mx-auto">
            {/* How to Play Instructions */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">🎯 How to Play Memory Cards</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-6">
                {/* Game Rules */}
                <div>
                  <h3 className="text-xl font-bold text-yellow-300 mb-4">📜 Game Rules</h3>
                  <div className="space-y-3 text-white/90">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">1️⃣</span>
                      <p>Click any card to flip it over and see what's underneath</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">2️⃣</span>
                      <p>Click a second card to try and find its matching pair</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">3️⃣</span>
                      <p>Match Japanese characters with their English sounds (romaji)</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">4️⃣</span>
                      <p>Find all pairs to win! Try to do it in the fewest attempts</p>
                    </div>
                  </div>
                </div>

                {/* Visual Examples */}
                <div>
                  <h3 className="text-xl font-bold text-green-300 mb-4">👀 What to Match</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-4 bg-white/5 rounded-lg p-4">
                      <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-4 text-white text-center min-w-[80px]">
                        <div className="text-3xl font-bold">あ</div>
                        <div className="text-xs mt-1">Character</div>
                      </div>
                      <div className="text-white text-2xl">↔️</div>
                      <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-4 text-white text-center min-w-[80px]">
                        <div className="text-lg font-bold">a</div>
                        <div className="text-xs mt-1">Sound</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-4 bg-white/5 rounded-lg p-4">
                      <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg p-4 text-white text-center min-w-[80px]">
                        <div className="text-3xl font-bold">カ</div>
                        <div className="text-xs mt-1">Character</div>
                      </div>
                      <div className="text-white text-2xl">↔️</div>
                      <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg p-4 text-white text-center min-w-[80px]">
                        <div className="text-lg font-bold">ka</div>
                        <div className="text-xs mt-1">Sound</div>
                      </div>
                    </div>
                    
                    <div className="text-center text-white/80 text-sm mt-4">
                      <p>🔵 Blue cards = Hiragana characters</p>
                      <p>🟠 Orange cards = Katakana characters</p>
                      <p>🟢 Green cards = Successfully matched!</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-bold text-purple-300 mb-3">💡 Pro Tips</h3>
                <div className="grid md:grid-cols-3 gap-4 text-white/90 text-sm">
                  <div className="flex items-start space-x-2">
                    <span>🎯</span>
                    <p>Start with Easy mode to learn basic characters first</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span>🔊</span>
                    <p>Click the speaker icon on sound cards to hear pronunciation</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span>⚡</span>
                    <p>Faster matches give you higher scores!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Choose Your Challenge</h2>
              
              {/* Script Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Script Type</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'hiragana', label: 'Hiragana Only', icon: 'あ' },
                    { value: 'katakana', label: 'Katakana Only', icon: 'ア' },
                    { value: 'both', label: 'Both Scripts', icon: 'あア' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedScript(option.value as any)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedScript === option.value
                          ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300'
                          : 'border-white/30 bg-white/10 text-white hover:border-yellow-400/50'
                      }`}
                    >
                      <div className="text-3xl mb-2">{option.icon}</div>
                      <div className="font-semibold">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Difficulty Level</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'easy', label: 'Easy', desc: 'Gojuon only (20 pairs)', color: 'green' },
                    { value: 'medium', label: 'Medium', desc: 'Gojuon + Dakuten (40 pairs)', color: 'yellow' },
                    { value: 'hard', label: 'Hard', desc: 'All characters + Yōon (60 pairs)', color: 'red' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setDifficulty(option.value as any)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        difficulty === option.value
                          ? `border-${option.color}-400 bg-${option.color}-400/20 text-${option.color}-300`
                          : 'border-white/30 bg-white/10 text-white hover:border-white/50'
                      }`}
                    >
                      <div className="font-semibold text-lg mb-1">{option.label}</div>
                      <div className="text-sm opacity-80">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Start Button */}
              <div className="text-center">
                <button
                  onClick={startGame}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-xl font-bold text-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  Start Memory Challenge
                </button>
              </div>
            </div>
          </div>
        ) : gameComplete ? (
          // Game Complete Screen
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-white mb-4">Congratulations!</h2>
              <p className="text-xl text-white/80 mb-8">You've completed the memory challenge!</p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-yellow-400">{gameStats.score}</div>
                  <div className="text-white/80">Final Score</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-400">{formatTime(gameStats.timeElapsed)}</div>
                  <div className="text-white/80">Time Taken</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-400">{gameStats.matches}</div>
                  <div className="text-white/80">Matches</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-red-400">{gameStats.attempts}</div>
                  <div className="text-white/80">Attempts</div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={resetGame}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  <RotateCcw className="w-5 h-5 inline mr-2" />
                  Play Again
                </button>
                <button
                  onClick={onClose}
                  className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-all"
                >
                  <Home className="w-5 h-5 inline mr-2" />
                  Return Home
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Game Board
          <div className="max-w-7xl mx-auto">
            {/* Game Instructions Banner */}
            {gameStats.matches === 0 && gameStats.attempts === 0 && (
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center space-x-4 text-white">
                  <span className="text-2xl">👋</span>
                  <p className="text-lg font-semibold">Click any two cards to find matching pairs!</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">あ</div>
                    <span>+</span>
                    <div className="w-8 h-8 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">a</div>
                    <span>=</span>
                    <span className="text-green-400 font-bold">Match!</span>
                  </div>
                </div>
              </div>
            )}

            {/* Current Status */}
            {flippedCards.length === 1 && !feedbackMessage && (
              <div className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-3 mb-4">
                <p className="text-center text-white font-semibold">
                  🎯 Good! Now click another card to find its match
                </p>
              </div>
            )}

            {/* Feedback Messages */}
            {feedbackMessage && (
              <div className={`border rounded-lg p-3 mb-4 ${
                feedbackMessage.type === 'success' 
                  ? 'bg-green-500/20 border-green-400/50' 
                  : 'bg-red-500/20 border-red-400/50'
              }`}>
                <p className="text-center text-white font-semibold">
                  {feedbackMessage.text}
                </p>
              </div>
            )}

            {/* Game Stats */}
            <div className="flex justify-center space-x-6 mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
                <span className="font-semibold">Matches: {gameStats.matches}/{cards.length / 2}</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
                <span className="font-semibold">Attempts: {gameStats.attempts}</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
                <span className="font-semibold">Score: {gameStats.score}</span>
              </div>
            </div>

            {/* Cards Grid */}
            <div className={`grid gap-4 ${
              cards.length <= 40 ? 'grid-cols-8' : 
              cards.length <= 80 ? 'grid-cols-10' : 
              'grid-cols-12'
            }`}>
              {cards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`aspect-square cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    card.isMatched ? 'opacity-50 pointer-events-none' : ''
                  }`}
                >
                  <div 
                    className="w-full h-full rounded-lg shadow-lg transition-all duration-500 relative"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: card.isFlipped || card.isMatched ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                  >
                    {/* Card Back */}
                    <div 
                      className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="text-white text-2xl font-bold">🎴</div>
                    </div>
                    
                    {/* Card Front */}
                    <div 
                      className={`absolute inset-0 w-full h-full rounded-lg flex flex-col items-center justify-center ${
                        card.script === 'hiragana' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : 'bg-gradient-to-br from-orange-500 to-red-500'
                      } ${card.isMatched ? 'bg-gradient-to-br from-green-500 to-emerald-500' : ''}`}
                      style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <div className="text-white font-bold text-center">
                        {card.type === 'character' ? (
                          <div className="text-3xl mb-1">{card.character}</div>
                        ) : (
                          <div className="text-lg">{card.romaji}</div>
                        )}
                      </div>
                      {card.type === 'romaji' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playPronunciation(card.romaji);
                          }}
                          className="mt-1 text-white/80 hover:text-white transition-colors"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reset Button */}
            <div className="text-center mt-8">
              <button
                onClick={resetGame}
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-colors"
              >
                <RotateCcw className="w-5 h-5 inline mr-2" />
                Reset Game
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryCardGame; 