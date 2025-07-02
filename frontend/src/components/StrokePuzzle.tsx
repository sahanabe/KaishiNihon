import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  RotateCcw, 
  Award, 
  Timer, 
  Target, 
  Sparkles, 
  Brain, 
  Star,
  Volume2,
  Lightbulb,
  Shuffle,
  CheckCircle2,
  ArrowRight,
  Zap
} from 'lucide-react';

interface StrokeComponent {
  id: string;
  path: number[][];
  type: 'horizontal' | 'vertical' | 'curve' | 'diagonal' | 'hook' | 'dot';
  color: string;
  angle: number;
  scale: number;
}

interface PuzzleCharacter {
  char: string;
  romaji: string;
  script: 'hiragana' | 'katakana';
  strokes: StrokeComponent[];
  difficulty: 'easy' | 'medium' | 'hard';
  hints: string[];
}

interface StrokePuzzleProps {
  onClose: () => void;
}

const StrokePuzzle: React.FC<StrokePuzzleProps> = ({ onClose }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentCharacter, setCurrentCharacter] = useState<PuzzleCharacter | null>(null);
  const [gamePhase, setGamePhase] = useState<'intro' | 'puzzle' | 'success' | 'complete'>('intro');
  const [selectedStrokes, setSelectedStrokes] = useState<string[]>([]);
  const [availableStrokes, setAvailableStrokes] = useState<StrokeComponent[]>([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);
  const [completedCharacters, setCompletedCharacters] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const assemblyCanvasRef = useRef<HTMLCanvasElement>(null);

  // Puzzle characters with stroke decomposition
  const puzzleCharacters: PuzzleCharacter[] = [
    {
      char: 'あ',
      romaji: 'a',
      script: 'hiragana',
      difficulty: 'easy',
      hints: ['Start with the horizontal line', 'Add the left vertical stroke', 'Finish with the curved right part'],
      strokes: [
        {
          id: 'stroke1',
          path: [[80, 80], [200, 80]],
          type: 'horizontal',
          color: '#3B82F6',
          angle: 0,
          scale: 1
        },
        {
          id: 'stroke2', 
          path: [[110, 60], [110, 220]],
          type: 'vertical',
          color: '#10B981',
          angle: 0,
          scale: 1
        },
        {
          id: 'stroke3',
          path: [[190, 100], [220, 200], [180, 250], [100, 240]],
          type: 'curve',
          color: '#F59E0B',
          angle: 0,
          scale: 1
        }
      ]
    },
    {
      char: 'か',
      romaji: 'ka', 
      script: 'hiragana',
      difficulty: 'medium',
      hints: ['Horizontal line first', 'Vertical stroke crosses it', 'Curved bottom completes it'],
      strokes: [
        {
          id: 'stroke1',
          path: [[80, 80], [200, 80]],
          type: 'horizontal',
          color: '#8B5CF6',
          angle: 0,
          scale: 1
        },
        {
          id: 'stroke2',
          path: [[110, 60], [110, 200]],
          type: 'vertical',
          color: '#EF4444',
          angle: 0,
          scale: 1
        },
        {
          id: 'stroke3',
          path: [[170, 100], [200, 150], [180, 200], [130, 200]],
          type: 'curve',
          color: '#06B6D4',
          angle: 0,
          scale: 1
        }
      ]
    },
    {
      char: 'ア',
      romaji: 'a',
      script: 'katakana', 
      difficulty: 'easy',
      hints: ['Diagonal line first', 'Horizontal line crosses it'],
      strokes: [
        {
          id: 'stroke1',
          path: [[100, 50], [80, 200]],
          type: 'diagonal',
          color: '#F97316',
          angle: -15,
          scale: 1
        },
        {
          id: 'stroke2',
          path: [[70, 120], [200, 120]],
          type: 'horizontal',
          color: '#84CC16',
          angle: 0,
          scale: 1
        }
      ]
    },
    {
      char: 'き',
      romaji: 'ki',
      script: 'hiragana',
      difficulty: 'hard',
      hints: ['Start with top horizontal', 'Add left vertical', 'Diagonal crossing', 'Bottom right stroke'],
      strokes: [
        {
          id: 'stroke1',
          path: [[70, 70], [150, 70]],
          type: 'horizontal',
          color: '#DC2626',
          angle: 0,
          scale: 1
        },
        {
          id: 'stroke2',
          path: [[90, 50], [90, 200]],
          type: 'vertical',
          color: '#059669',
          angle: 0,
          scale: 1
        },
        {
          id: 'stroke3',
          path: [[120, 90], [160, 170]],
          type: 'diagonal',
          color: '#7C3AED',
          angle: 45,
          scale: 1
        },
        {
          id: 'stroke4',
          path: [[110, 140], [190, 180]],
          type: 'diagonal',
          color: '#DB2777',
          angle: 30,
          scale: 1
        }
      ]
    }
  ];

  useEffect(() => {
    if (gamePhase === 'puzzle') {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gamePhase]);

  useEffect(() => {
    if (currentCharacter) {
      // Shuffle available strokes
      const shuffled = [...currentCharacter.strokes].sort(() => Math.random() - 0.5);
      setAvailableStrokes(shuffled);
    }
  }, [currentCharacter]);

  const startGame = () => {
    setCurrentLevel(1);
    setScore(0);
    setCombo(0);
    setTimeElapsed(0);
    setCompletedCharacters([]);
    loadLevel(1);
    setGamePhase('puzzle');
  };

  const loadLevel = (level: number) => {
    const character = puzzleCharacters[level - 1];
    if (character) {
      setCurrentCharacter(character);
      setSelectedStrokes([]);
      setShowHint(false);
    } else {
      setGamePhase('complete');
    }
  };

  const selectStroke = (strokeId: string) => {
    if (!selectedStrokes.includes(strokeId)) {
      const newSelected = [...selectedStrokes, strokeId];
      setSelectedStrokes(newSelected);
      
      // Check if puzzle is complete
      if (currentCharacter && newSelected.length === currentCharacter.strokes.length) {
        checkCompletion(newSelected);
      }
      
      drawAssembly(newSelected);
    }
  };

  const removeStroke = (strokeId: string) => {
    const newSelected = selectedStrokes.filter(id => id !== strokeId);
    setSelectedStrokes(newSelected);
    drawAssembly(newSelected);
  };

  const checkCompletion = (selected: string[]) => {
    if (!currentCharacter) return;
    
    const correctOrder = currentCharacter.strokes.map(s => s.id);
    const isCorrectOrder = selected.every((id, index) => id === correctOrder[index]);
    
    if (isCorrectOrder) {
      // Success!
      const baseScore = currentCharacter.difficulty === 'easy' ? 100 : 
                       currentCharacter.difficulty === 'medium' ? 200 : 300;
      const timeBonus = Math.max(0, 60 - timeElapsed) * 5;
      const comboBonus = combo * 50;
      const totalScore = baseScore + timeBonus + comboBonus;
      
      setScore(prev => prev + totalScore);
      setCombo(prev => prev + 1);
      setCompletedCharacters(prev => [...prev, currentCharacter.char]);
      
      createSuccessParticles();
      setGamePhase('success');
      
      setTimeout(() => {
        if (currentLevel < puzzleCharacters.length) {
          setCurrentLevel(prev => prev + 1);
          loadLevel(currentLevel + 1);
          setGamePhase('puzzle');
          setTimeElapsed(0);
        } else {
          setGamePhase('complete');
        }
      }, 2000);
    } else {
      // Wrong order, reset
      setCombo(0);
      setSelectedStrokes([]);
      drawAssembly([]);
    }
  };

  const createSuccessParticles = () => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 400,
      y: Math.random() * 300,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      life: 1,
      color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'][Math.floor(Math.random() * 5)]
    }));
    setParticles(newParticles);
    
    setTimeout(() => setParticles([]), 2000);
  };

  const drawAssembly = (selected: string[]) => {
    const canvas = assemblyCanvasRef.current;
    if (!canvas || !currentCharacter) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid background
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    for (let i = 0; i <= canvas.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i <= canvas.height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
    
    // Draw selected strokes
    selected.forEach((strokeId, index) => {
      const stroke = currentCharacter.strokes.find(s => s.id === strokeId);
      if (stroke) {
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Add glow effect
        ctx.shadowColor = stroke.color;
        ctx.shadowBlur = 10;
        
        ctx.beginPath();
        stroke.path.forEach((point, i) => {
          if (i === 0) {
            ctx.moveTo(point[0] * 0.8, point[1] * 0.8);
          } else {
            ctx.lineTo(point[0] * 0.8, point[1] * 0.8);
          }
        });
        ctx.stroke();
        
        // Reset shadow
        ctx.shadowBlur = 0;
        
        // Add stroke number
        const firstPoint = stroke.path[0];
        ctx.fillStyle = 'white';
        ctx.fillRect(firstPoint[0] * 0.8 - 15, firstPoint[1] * 0.8 - 15, 30, 30);
        ctx.fillStyle = stroke.color;
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText((index + 1).toString(), firstPoint[0] * 0.8, firstPoint[1] * 0.8 + 5);
      }
    });
  };

  const shuffleStrokes = () => {
    if (currentCharacter) {
      const shuffled = [...currentCharacter.strokes].sort(() => Math.random() - 0.5);
      setAvailableStrokes(shuffled);
    }
  };

  const resetPuzzle = () => {
    setSelectedStrokes([]);
    setTimeElapsed(0);
    if (currentCharacter) {
      drawAssembly([]);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">🧩 Stroke Puzzle</h2>
                <p className="text-purple-100">Reconstruct characters from stroke components</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {gamePhase !== 'intro' && (
            <div className="mt-4 grid grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-sm text-purple-100">Level</div>
                <div className="text-xl font-bold">{currentLevel}/4</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-sm text-purple-100">Score</div>
                <div className="text-xl font-bold">{score}</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-sm text-purple-100">Combo</div>
                <div className="text-xl font-bold">x{combo}</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-sm text-purple-100">Time</div>
                <div className="text-xl font-bold">{formatTime(timeElapsed)}</div>
              </div>
            </div>
          )}
        </div>

        {/* Game Content */}
        <div className="p-6">
          {gamePhase === 'intro' && (
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">🧩</div>
              <h3 className="text-3xl font-bold text-gray-900">Welcome to Stroke Puzzle!</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Experience the next level of Japanese character learning! Reconstruct characters by assembling 
                individual stroke components in the correct order. Each stroke has a unique color and must be 
                placed in proper sequence.
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 max-w-2xl mx-auto">
                <h4 className="text-xl font-bold text-gray-900 mb-4">🎯 How to Play</h4>
                <div className="text-left space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                    <div>
                      <div className="font-semibold">Select Stroke Components</div>
                      <div className="text-sm text-gray-600">Choose colorful stroke pieces in the correct order</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                    <div>
                      <div className="font-semibold">Watch Assembly</div>
                      <div className="text-sm text-gray-600">See your character come to life in real-time</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                    <div>
                      <div className="font-semibold">Earn Points & Combos</div>
                      <div className="text-sm text-gray-600">Speed and accuracy boost your score multiplier</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center space-x-2 mx-auto group"
              >
                <Sparkles className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Start Puzzle Adventure</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {gamePhase === 'puzzle' && currentCharacter && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Panel - Assembly Area */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Assemble: <span className="text-4xl text-purple-600">{currentCharacter.char}</span>
                  </h3>
                  <p className="text-gray-600">Character: {currentCharacter.romaji} ({currentCharacter.script})</p>
                  <div className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full mt-2">
                    <span className="text-sm font-semibold text-purple-800">
                      Difficulty: {currentCharacter.difficulty.charAt(0).toUpperCase() + currentCharacter.difficulty.slice(1)}
                    </span>
                  </div>
                </div>
                
                {/* Assembly Canvas */}
                <div className="bg-gray-50 rounded-xl p-4 relative">
                  <canvas
                    ref={assemblyCanvasRef}
                    width={400}
                    height={300}
                    className="mx-auto bg-white rounded-lg shadow-inner"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                  
                  {/* Assembly Info */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Progress: {selectedStrokes.length}/{currentCharacter.strokes.length} strokes
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setShowHint(!showHint)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-yellow-600 transition-colors flex items-center space-x-1"
                      >
                        <Lightbulb className="w-4 h-4" />
                        <span>Hint</span>
                      </button>
                      <button
                        onClick={resetPuzzle}
                        className="bg-gray-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-gray-600 transition-colors flex items-center space-x-1"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Reset</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Hint Display */}
                  {showHint && (
                    <div className="mt-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <div className="font-semibold text-yellow-800 mb-1">
                            Step {selectedStrokes.length + 1}:
                          </div>
                          <div className="text-yellow-700 text-sm">
                            {currentCharacter.hints[selectedStrokes.length] || 'Complete the character!'}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Panel - Stroke Components */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">🎨 Stroke Components</h3>
                  <button
                    onClick={shuffleStrokes}
                    className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors flex items-center space-x-1"
                  >
                    <Shuffle className="w-4 h-4" />
                    <span>Shuffle</span>
                  </button>
                </div>
                
                {/* Available Strokes */}
                <div className="grid grid-cols-2 gap-4">
                  {availableStrokes.map((stroke, index) => (
                    <div
                      key={stroke.id}
                      className={`relative bg-white border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                        selectedStrokes.includes(stroke.id)
                          ? 'border-gray-300 opacity-50 cursor-not-allowed'
                          : 'border-gray-200 hover:border-purple-300 hover:shadow-lg transform hover:scale-105'
                      }`}
                      onClick={() => selectStroke(stroke.id)}
                    >
                      <div className="text-center mb-2">
                        <div className={`inline-block w-4 h-4 rounded-full`} style={{ backgroundColor: stroke.color }}></div>
                        <div className="text-sm font-semibold text-gray-700 mt-1">
                          {stroke.type.charAt(0).toUpperCase() + stroke.type.slice(1)}
                        </div>
                      </div>
                      
                      {/* Stroke Preview */}
                      <div className="h-20 flex items-center justify-center bg-gray-50 rounded-lg relative overflow-hidden">
                        <svg width="60" height="40" viewBox="0 0 100 60">
                          <path
                            d={`M ${stroke.path.map(p => `${p[0] * 0.3} ${p[1] * 0.2}`).join(' L ')}`}
                            stroke={stroke.color}
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        
                        {selectedStrokes.includes(stroke.id) && (
                          <div className="absolute inset-0 bg-gray-900/20 flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Selected Strokes Order */}
                {selectedStrokes.length > 0 && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">📝 Selected Order</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedStrokes.map((strokeId, index) => {
                        const stroke = currentCharacter.strokes.find(s => s.id === strokeId);
                        return stroke ? (
                          <div
                            key={strokeId}
                            className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border cursor-pointer hover:bg-gray-50"
                            onClick={() => removeStroke(strokeId)}
                          >
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stroke.color }}></div>
                            <span className="text-sm font-medium">{index + 1}</span>
                            <X className="w-3 h-3 text-gray-500" />
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {gamePhase === 'success' && (
            <div className="text-center space-y-6 relative">
              {/* Particle Animation */}
              <div className="absolute inset-0 pointer-events-none">
                {particles.map(particle => (
                  <div
                    key={particle.id}
                    className="absolute w-2 h-2 rounded-full animate-bounce"
                    style={{
                      left: particle.x,
                      top: particle.y,
                      backgroundColor: particle.color,
                      animationDelay: `${particle.id * 0.1}s`
                    }}
                  />
                ))}
              </div>
              
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-3xl font-bold text-green-600">Perfect Assembly!</h3>
              <div className="text-8xl font-bold text-purple-600 mb-4">
                {currentCharacter?.char}
              </div>
              <p className="text-lg text-gray-600">
                You successfully reconstructed <strong>{currentCharacter?.romaji}</strong>!
              </p>
              
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 max-w-md mx-auto">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">+{combo * 50}</div>
                    <div className="text-sm text-gray-600">Combo Bonus</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">x{combo}</div>
                    <div className="text-sm text-gray-600">Streak</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {gamePhase === 'complete' && (
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-3xl font-bold text-purple-600">Puzzle Master!</h3>
              <p className="text-lg text-gray-600">
                You've completed all stroke puzzles with amazing skill!
              </p>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 max-w-lg mx-auto">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{score}</div>
                    <div className="text-sm text-gray-600">Total Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-600">{completedCharacters.length}</div>
                    <div className="text-sm text-gray-600">Characters</div>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <div className="text-lg">Completed: {completedCharacters.join(', ')}</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={startGame}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center space-x-2 mx-auto"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Play Again</span>
                </button>
                <button
                  onClick={onClose}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                >
                  Back to Practice
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StrokePuzzle; 