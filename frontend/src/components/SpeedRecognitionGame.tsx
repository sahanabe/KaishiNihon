import React, { useState, useEffect, useCallback, useRef } from 'react';
import { RotateCcw, Home, Trophy, Clock, Star, Volume2, Zap, Target, Brain, Eye, Flame, Shield, Sparkles } from 'lucide-react';

interface Character {
  char: string;
  romaji: string;
  script: 'hiragana' | 'katakana';
  group: string;
}

interface GameStats {
  score: number;
  streak: number;
  maxStreak: number;
  correct: number;
  incorrect: number;
  timeElapsed: number;
  accuracy: number;
  level: number;
  powerUps: number;
}

interface Challenge {
  character: Character;
  options: string[];
  correctAnswer: string;
  timeLimit: number;
}

const SpeedRecognitionGame: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [gameStats, setGameStats] = useState<GameStats>({
    score: 0,
    streak: 0,
    maxStreak: 0,
    correct: 0,
    incorrect: 0,
    timeElapsed: 0,
    accuracy: 0,
    level: 1,
    powerUps: 0
  });
  const [timeLeft, setTimeLeft] = useState(5);
  const [gameMode, setGameMode] = useState<'classic' | 'zen' | 'lightning' | 'survival'>('classic');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'expert'>('easy');
  const [selectedScript, setSelectedScript] = useState<'hiragana' | 'katakana' | 'both'>('both');
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; type: 'success' | 'error' | 'streak' | 'powerup' } | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [comboMultiplier, setComboMultiplier] = useState(1);
  const [powerUpActive, setPowerUpActive] = useState<'slow' | 'hint' | 'shield' | null>(null);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);
  const [aiCoach, setAiCoach] = useState<string | null>(null);
  const [challengeCount, setChallengeCount] = useState(0);
  
  const gameRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Complete character sets
  const allCharacters: Character[] = [
    // Hiragana basic
    { char: 'あ', romaji: 'a', script: 'hiragana', group: 'vowels' },
    { char: 'い', romaji: 'i', script: 'hiragana', group: 'vowels' },
    { char: 'う', romaji: 'u', script: 'hiragana', group: 'vowels' },
    { char: 'え', romaji: 'e', script: 'hiragana', group: 'vowels' },
    { char: 'お', romaji: 'o', script: 'hiragana', group: 'vowels' },
    { char: 'か', romaji: 'ka', script: 'hiragana', group: 'k-sounds' },
    { char: 'き', romaji: 'ki', script: 'hiragana', group: 'k-sounds' },
    { char: 'く', romaji: 'ku', script: 'hiragana', group: 'k-sounds' },
    { char: 'け', romaji: 'ke', script: 'hiragana', group: 'k-sounds' },
    { char: 'こ', romaji: 'ko', script: 'hiragana', group: 'k-sounds' },
    { char: 'さ', romaji: 'sa', script: 'hiragana', group: 's-sounds' },
    { char: 'し', romaji: 'shi', script: 'hiragana', group: 's-sounds' },
    { char: 'す', romaji: 'su', script: 'hiragana', group: 's-sounds' },
    { char: 'せ', romaji: 'se', script: 'hiragana', group: 's-sounds' },
    { char: 'そ', romaji: 'so', script: 'hiragana', group: 's-sounds' },
    { char: 'た', romaji: 'ta', script: 'hiragana', group: 't-sounds' },
    { char: 'ち', romaji: 'chi', script: 'hiragana', group: 't-sounds' },
    { char: 'つ', romaji: 'tsu', script: 'hiragana', group: 't-sounds' },
    { char: 'て', romaji: 'te', script: 'hiragana', group: 't-sounds' },
    { char: 'と', romaji: 'to', script: 'hiragana', group: 't-sounds' },
    // Katakana basic
    { char: 'ア', romaji: 'a', script: 'katakana', group: 'vowels' },
    { char: 'イ', romaji: 'i', script: 'katakana', group: 'vowels' },
    { char: 'ウ', romaji: 'u', script: 'katakana', group: 'vowels' },
    { char: 'エ', romaji: 'e', script: 'katakana', group: 'vowels' },
    { char: 'オ', romaji: 'o', script: 'katakana', group: 'vowels' },
    { char: 'カ', romaji: 'ka', script: 'katakana', group: 'k-sounds' },
    { char: 'キ', romaji: 'ki', script: 'katakana', group: 'k-sounds' },
    { char: 'ク', romaji: 'ku', script: 'katakana', group: 'k-sounds' },
    { char: 'ケ', romaji: 'ke', script: 'katakana', group: 'k-sounds' },
    { char: 'コ', romaji: 'ko', script: 'katakana', group: 'k-sounds' },
    // Add more characters for higher difficulties...
  ];

  // Generate wrong answers that are similar
  const generateWrongAnswers = (correct: string, script: 'hiragana' | 'katakana') => {
    const similarSounds = allCharacters
      .filter(c => c.romaji !== correct && c.script === script)
      .map(c => c.romaji);
    
    const shuffled = similarSounds.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  };

  // Generate new challenge
  const generateChallenge = useCallback(() => {
    const availableChars = allCharacters.filter(char => {
      if (selectedScript === 'hiragana') return char.script === 'hiragana';
      if (selectedScript === 'katakana') return char.script === 'katakana';
      return true;
    });

    const character = availableChars[Math.floor(Math.random() * availableChars.length)];
    const wrongAnswers = generateWrongAnswers(character.romaji, character.script);
    const options = [character.romaji, ...wrongAnswers].sort(() => Math.random() - 0.5);
    
    const baseTime = gameMode === 'lightning' ? 3 : gameMode === 'zen' ? 10 : 5;
    const difficultyMultiplier = difficulty === 'easy' ? 1.5 : difficulty === 'medium' ? 1.2 : difficulty === 'hard' ? 1 : 0.8;
    const timeLimit = Math.max(2, Math.floor(baseTime * difficultyMultiplier));

    return {
      character,
      options,
      correctAnswer: character.romaji,
      timeLimit: powerUpActive === 'slow' ? timeLimit * 2 : timeLimit
    };
  }, [selectedScript, gameMode, difficulty, powerUpActive]);

  // Handle answer selection
  const handleAnswer = (answer: string) => {
    if (isAnswering || !currentChallenge) return;
    
    setIsAnswering(true);
    setSelectedAnswer(answer);
    
    const isCorrect = answer === currentChallenge.correctAnswer;
    const timeBonus = Math.max(0, timeLeft);
    
    if (isCorrect) {
      const points = (100 + timeBonus * 10) * comboMultiplier;
      const newStreak = gameStats.streak + 1;
      
      setGameStats(prev => ({
        ...prev,
        score: prev.score + points,
        streak: newStreak,
        maxStreak: Math.max(prev.maxStreak, newStreak),
        correct: prev.correct + 1,
        accuracy: Math.round(((prev.correct + 1) / (prev.correct + prev.incorrect + 1)) * 100)
      }));

      // Combo system
      if (newStreak % 5 === 0) {
        setComboMultiplier(prev => Math.min(prev + 0.5, 3));
        setFeedbackMessage({ text: `🔥 ${newStreak} STREAK! Combo x${comboMultiplier + 0.5}`, type: 'streak' });
        spawnParticles('streak');
      } else {
        setFeedbackMessage({ text: `✨ Correct! +${points}pts`, type: 'success' });
        spawnParticles('success');
      }

      // Power-up rewards
      if (newStreak > 0 && newStreak % 10 === 0) {
        setGameStats(prev => ({ ...prev, powerUps: prev.powerUps + 1 }));
        setFeedbackMessage({ text: `⚡ POWER-UP EARNED!`, type: 'powerup' });
      }

      // AI Coach encouragement
      if (newStreak === 5) setAiCoach("🤖 Excellent pattern recognition! You're in the zone!");
      if (newStreak === 15) setAiCoach("🤖 Incredible! Your brain is processing characters like lightning!");
      
    } else {
      setGameStats(prev => ({
        ...prev,
        streak: powerUpActive === 'shield' ? prev.streak : 0,
        incorrect: prev.incorrect + 1,
        accuracy: Math.round((prev.correct / (prev.correct + prev.incorrect + 1)) * 100)
      }));
      
      setComboMultiplier(1);
      setFeedbackMessage({ 
        text: powerUpActive === 'shield' ? `🛡️ Shield protected your streak!` : `❌ ${currentChallenge.correctAnswer}`, 
        type: 'error' 
      });
      
      if (powerUpActive === 'shield') {
        setPowerUpActive(null);
        spawnParticles('shield');
      }
    }

    // Continue to next challenge
    setTimeout(() => {
      setIsAnswering(false);
      setSelectedAnswer(null);
      setFeedbackMessage(null);
      setAiCoach(null);
      
      const newCount = challengeCount + 1;
      setChallengeCount(newCount);
      
      if (gameMode === 'classic' && newCount >= 20) {
        setGameComplete(true);
      } else if (gameMode === 'survival' && !isCorrect && powerUpActive !== 'shield') {
        setGameComplete(true);
      } else {
        setCurrentChallenge(generateChallenge());
        setTimeLeft(generateChallenge().timeLimit);
      }
    }, 1500);
  };

  // Spawn visual particles
  const spawnParticles = (type: 'success' | 'streak' | 'shield') => {
    const colors = {
      success: ['#10B981', '#34D399', '#6EE7B7'],
      streak: ['#F59E0B', '#FBBF24', '#FCD34D'],
      shield: ['#3B82F6', '#60A5FA', '#93C5FD']
    };
    
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[type][Math.floor(Math.random() * colors[type].length)]
    }));
    
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 2000);
  };

  // Timer effect
  useEffect(() => {
    if (gameStarted && !gameComplete && !isAnswering && currentChallenge) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleAnswer(''); // Time's up
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStarted, gameComplete, isAnswering, currentChallenge]);

  // Start game
  const startGame = () => {
    setGameStarted(true);
    setGameComplete(false);
    setChallengeCount(0);
    setGameStats({
      score: 0,
      streak: 0,
      maxStreak: 0,
      correct: 0,
      incorrect: 0,
      timeElapsed: 0,
      accuracy: 0,
      level: 1,
      powerUps: 0
    });
    const challenge = generateChallenge();
    setCurrentChallenge(challenge);
    setTimeLeft(challenge.timeLimit);
  };

  // Use power-up
  const handlePowerUp = (type: 'slow' | 'hint' | 'shield') => {
    if (gameStats.powerUps <= 0) return;
    
    setGameStats(prev => ({ ...prev, powerUps: prev.powerUps - 1 }));
    setPowerUpActive(type);
    
    if (type === 'slow') {
      setTimeLeft(prev => prev * 2);
      setTimeout(() => setPowerUpActive(null), 10000);
    } else if (type === 'hint') {
      // Remove 2 wrong answers
      if (currentChallenge) {
        const wrongOptions = currentChallenge.options.filter(opt => opt !== currentChallenge.correctAnswer);
        const toRemove = wrongOptions.slice(0, 2);
        // Visual hint implementation would go here
      }
      setTimeout(() => setPowerUpActive(null), 5000);
    } else if (type === 'shield') {
      // Shield lasts for one wrong answer
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 z-50 overflow-auto" ref={gameRef}>
      {/* Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full animate-ping pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
          }}
        />
      ))}

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
            ⚡ Speed Recognition Challenge
          </h1>

          <div className="flex items-center space-x-4 text-white">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Trophy className="w-5 h-5 inline mr-2" />
              {gameStats.score}
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Flame className="w-5 h-5 inline mr-2" />
              {gameStats.streak}
            </div>
          </div>
        </div>

        {!gameStarted ? (
          // Game Setup Screen
          <div className="max-w-6xl mx-auto">
            {/* Game Mode Selection */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">🎮 Choose Your Challenge Mode</h2>
              
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                {[
                  { 
                    mode: 'classic', 
                    title: '🎯 Classic', 
                    desc: '20 challenges, balanced pace',
                    color: 'blue'
                  },
                  { 
                    mode: 'zen', 
                    title: '🧘 Zen Mode', 
                    desc: 'No pressure, learn at your pace',
                    color: 'green'
                  },
                  { 
                    mode: 'lightning', 
                    title: '⚡ Lightning', 
                    desc: 'Ultra-fast 3-second challenges',
                    color: 'yellow'
                  },
                  { 
                    mode: 'survival', 
                    title: '💀 Survival', 
                    desc: 'One mistake and you\'re out!',
                    color: 'red'
                  }
                ].map((option) => (
                  <button
                    key={option.mode}
                    onClick={() => setGameMode(option.mode as any)}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      gameMode === option.mode
                        ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300 transform scale-105'
                        : 'border-white/30 bg-white/10 text-white hover:border-yellow-400/50 hover:scale-105'
                    }`}
                  >
                    <div className="text-2xl mb-3">{option.title}</div>
                    <div className="text-sm opacity-80">{option.desc}</div>
                  </button>
                ))}
              </div>

              {/* Settings */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Script Type</h3>
                  <div className="space-y-3">
                    {[
                      { value: 'hiragana', label: 'Hiragana あ', icon: 'あ' },
                      { value: 'katakana', label: 'Katakana ア', icon: 'ア' },
                      { value: 'both', label: 'Mixed Challenge', icon: 'あア' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSelectedScript(option.value as any)}
                        className={`w-full p-3 rounded-lg border transition-all ${
                          selectedScript === option.value
                            ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300'
                            : 'border-white/30 bg-white/10 text-white hover:border-yellow-400/50'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Difficulty</h3>
                  <div className="space-y-3">
                    {[
                      { value: 'easy', label: 'Beginner', desc: 'Basic characters, more time' },
                      { value: 'medium', label: 'Intermediate', desc: 'Mixed characters, normal time' },
                      { value: 'hard', label: 'Advanced', desc: 'All characters, less time' },
                      { value: 'expert', label: 'Master', desc: 'Lightning fast, everything' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setDifficulty(option.value as any)}
                        className={`w-full p-3 rounded-lg border transition-all text-left ${
                          difficulty === option.value
                            ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300'
                            : 'border-white/30 bg-white/10 text-white hover:border-yellow-400/50'
                        }`}
                      >
                        <div className="font-semibold">{option.label}</div>
                        <div className="text-sm opacity-80">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={startGame}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-xl font-bold text-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  🚀 Start Challenge
                </button>
              </div>
            </div>
          </div>
        ) : gameComplete ? (
          // Game Complete Screen
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 text-center">
              <div className="text-6xl mb-4">
                {gameStats.accuracy >= 90 ? '🏆' : gameStats.accuracy >= 75 ? '🥈' : '🥉'}
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Challenge Complete!</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-yellow-400">{gameStats.score}</div>
                  <div className="text-white/80">Final Score</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-orange-400">{gameStats.maxStreak}</div>
                  <div className="text-white/80">Best Streak</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-400">{gameStats.accuracy}%</div>
                  <div className="text-white/80">Accuracy</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-400">{gameStats.correct}</div>
                  <div className="text-white/80">Correct</div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={startGame}
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
          <div className="max-w-4xl mx-auto">
            {/* Game HUD */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex space-x-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
                  <Clock className="w-5 h-5 inline mr-2" />
                  {timeLeft}s
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
                  <Target className="w-5 h-5 inline mr-2" />
                  {gameStats.accuracy}%
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
                  <Sparkles className="w-5 h-5 inline mr-2" />
                  x{comboMultiplier}
                </div>
              </div>

              {/* Power-ups */}
              <div className="flex space-x-2">
                {gameStats.powerUps > 0 && (
                  <>
                    <button
                      onClick={() => handlePowerUp('slow')}
                      className="bg-blue-500/20 text-blue-300 p-2 rounded-lg hover:bg-blue-500/30 transition-colors"
                      title="Slow Time (2x time)"
                    >
                      <Clock className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handlePowerUp('hint')}
                      className="bg-yellow-500/20 text-yellow-300 p-2 rounded-lg hover:bg-yellow-500/30 transition-colors"
                      title="Remove 2 wrong answers"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handlePowerUp('shield')}
                      className="bg-green-500/20 text-green-300 p-2 rounded-lg hover:bg-green-500/30 transition-colors"
                      title="Protect next mistake"
                    >
                      <Shield className="w-5 h-5" />
                    </button>
                  </>
                )}
                <div className="bg-white/20 rounded-lg px-3 py-2 text-white text-sm">
                  ⚡ {gameStats.powerUps}
                </div>
              </div>
            </div>

            {/* AI Coach */}
            {aiCoach && (
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 rounded-lg p-4 mb-6">
                <p className="text-center text-cyan-300 font-semibold">{aiCoach}</p>
              </div>
            )}

            {/* Feedback */}
            {feedbackMessage && (
              <div className={`border rounded-lg p-4 mb-6 text-center ${
                feedbackMessage.type === 'success' ? 'bg-green-500/20 border-green-400/50 text-green-300' :
                feedbackMessage.type === 'error' ? 'bg-red-500/20 border-red-400/50 text-red-300' :
                feedbackMessage.type === 'streak' ? 'bg-yellow-500/20 border-yellow-400/50 text-yellow-300' :
                'bg-purple-500/20 border-purple-400/50 text-purple-300'
              }`}>
                <p className="text-xl font-bold">{feedbackMessage.text}</p>
              </div>
            )}

            {/* Main Challenge */}
            {currentChallenge && (
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-12 border border-white/20 text-center">
                {/* Character Display */}
                <div className="mb-8">
                  <div className={`text-9xl font-bold mb-4 ${
                    currentChallenge.character.script === 'hiragana' ? 'text-blue-300' : 'text-orange-300'
                  }`}>
                    {currentChallenge.character.char}
                  </div>
                  <div className="text-2xl text-white/80">
                    What sound does this make?
                  </div>
                </div>

                {/* Answer Options */}
                <div className="grid grid-cols-2 gap-6">
                  {currentChallenge.options.map((option, index) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      disabled={isAnswering}
                      className={`p-6 rounded-xl border-2 transition-all text-2xl font-bold ${
                        selectedAnswer === option
                          ? option === currentChallenge.correctAnswer
                            ? 'border-green-400 bg-green-500/20 text-green-300'
                            : 'border-red-400 bg-red-500/20 text-red-300'
                          : 'border-white/30 bg-white/10 text-white hover:border-yellow-400/50 hover:bg-yellow-400/10 hover:scale-105'
                      } ${isAnswering ? 'pointer-events-none' : ''}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {/* Timer Bar */}
                <div className="mt-8">
                  <div className="w-full bg-white/20 rounded-full h-4">
                    <div 
                      className={`h-4 rounded-full transition-all duration-1000 ${
                        timeLeft <= 2 ? 'bg-red-500' : timeLeft <= 4 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ 
                        width: `${(timeLeft / (currentChallenge.timeLimit || 5)) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeedRecognitionGame; 