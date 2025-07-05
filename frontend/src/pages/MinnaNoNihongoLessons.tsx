import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Users,
  ChevronRight,
  ChevronLeft,
  Home,
  Book,
  GraduationCap,
  Lightbulb,
  CheckSquare,
  Square,
  AlertCircle
} from 'lucide-react';

// Minna no Nihongo Lesson Data (Lessons 26-50)
const lessonData = [
  {
    lessonNumber: 26,
    title: "Basic Conditionals",
    grammarPoints: [
      {
        pattern: "〜たら",
        explanation: "If/When (conditional)",
        examples: [
          { japanese: "雨が降ったら、家にいます。", english: "If it rains, I'll stay home.", reading: "あめがふったら、いえにいます。" },
          { japanese: "暇だったら、映画を見ましょう。", english: "If you're free, let's watch a movie.", reading: "ひまだったら、えいがをみましょう。" }
        ]
      },
      {
        pattern: "〜ば",
        explanation: "If (conditional)",
        examples: [
          { japanese: "早く起きれば、電車に間に合います。", english: "If you wake up early, you'll catch the train.", reading: "はやくおきれば、でんしゃにまにあいます。" },
          { japanese: "勉強すれば、試験に合格できます。", english: "If you study, you can pass the exam.", reading: "べんきょうすれば、しけんにごうかくできます。" }
        ]
      }
    ],
    exercises: [
      {
        type: "fill_blank",
        question: "暇（　　）、映画を見ましょう。",
        answer: "だったら",
        options: ["だったら", "なら", "たら", "ば"]
      },
      {
        type: "translation",
        question: "Translate: If you study, you can pass the exam.",
        answer: "勉強すれば、試験に合格できます。",
        hint: "Use 〜ば form"
      }
    ]
  },
  {
    lessonNumber: 27,
    title: "Expressing Possibility",
    grammarPoints: [
      {
        pattern: "〜かもしれません",
        explanation: "Maybe/Perhaps",
        examples: [
          { japanese: "彼は来るかもしれません。", english: "He might come.", reading: "かれはくるかもしれません。" },
          { japanese: "明日は雨かもしれません。", english: "It might rain tomorrow.", reading: "あしたはあめかもしれません。" }
        ]
      },
      {
        pattern: "〜でしょう",
        explanation: "Probably/Will (prediction)",
        examples: [
          { japanese: "明日は晴れるでしょう。", english: "It will probably be sunny tomorrow.", reading: "あしたははれるでしょう。" },
          { japanese: "彼は来るでしょう。", english: "He will probably come.", reading: "かれはくるでしょう。" }
        ]
      }
    ],
    exercises: [
      {
        type: "fill_blank",
        question: "明日は雨（　　）。",
        answer: "かもしれません",
        options: ["かもしれません", "でしょう", "です", "でした"]
      }
    ]
  },
  {
    lessonNumber: 28,
    title: "Giving and Receiving",
    grammarPoints: [
      {
        pattern: "あげる・くれる・もらう",
        explanation: "Giving and receiving verbs",
        examples: [
          { japanese: "友達に本をあげました。", english: "I gave a book to my friend.", reading: "ともだちにほんをあげました。" },
          { japanese: "先生に手紙をもらいました。", english: "I received a letter from my teacher.", reading: "せんせいにてがみをもらいました。" }
        ]
      }
    ],
    exercises: [
      {
        type: "fill_blank",
        question: "友達にプレゼントを（　　）。",
        answer: "あげました",
        options: ["あげました", "くれました", "もらいました", "しました"]
      }
    ]
  },
  {
    lessonNumber: 29,
    title: "Passive Form",
    grammarPoints: [
      {
        pattern: "Passive Form (〜られる)",
        explanation: "Passive voice",
        examples: [
          { japanese: "私は先生に褒められました。", english: "I was praised by the teacher.", reading: "わたしはせんせいにほめられました。" },
          { japanese: "この本は多くの人に読まれています。", english: "This book is read by many people.", reading: "このほんはおおくのひとによまれています。" }
        ]
      }
    ],
    exercises: [
      {
        type: "fill_blank",
        question: "私は先生に（　　）。",
        answer: "褒められました",
        options: ["褒められました", "褒めました", "褒めます", "褒めています"]
      }
    ]
  },
  {
    lessonNumber: 30,
    title: "Causative Form",
    grammarPoints: [
      {
        pattern: "Causative Form (〜させる)",
        explanation: "Make/Let someone do something",
        examples: [
          { japanese: "子供に宿題をさせました。", english: "I made the child do homework.", reading: "こどもにしゅくだいをさせました。" },
          { japanese: "学生に本を読ませました。", english: "I made the students read the book.", reading: "がくせいにほんをよませました。" }
        ]
      }
    ],
    exercises: [
      {
        type: "fill_blank",
        question: "子供に宿題を（　　）。",
        answer: "させました",
        options: ["させました", "しました", "やりました", "しました"]
      }
    ]
  }
];

// Additional lessons 31-50 (simplified for brevity)
const additionalLessons = [
  { lessonNumber: 31, title: "Honorific Language (敬語)", description: "Respectful speech patterns" },
  { lessonNumber: 32, title: "Humble Language (謙譲語)", description: "Humble speech patterns" },
  { lessonNumber: 33, title: "Polite Language (丁寧語)", description: "Polite speech patterns" },
  { lessonNumber: 34, title: "Complex Modifying Clauses", description: "Advanced sentence structures" },
  { lessonNumber: 35, title: "Reported Speech", description: "Indirect speech patterns" },
  { lessonNumber: 36, title: "Expressing Purpose", description: "Purpose and intention" },
  { lessonNumber: 37, title: "Expressing Reason", description: "Cause and effect" },
  { lessonNumber: 38, title: "Expressing Contrast", description: "Contrasting ideas" },
  { lessonNumber: 39, title: "Expressing Addition", description: "Adding information" },
  { lessonNumber: 40, title: "Expressing Sequence", description: "Order and sequence" },
  { lessonNumber: 41, title: "Expressing Condition", description: "Advanced conditionals" },
  { lessonNumber: 42, title: "Expressing Concession", description: "Conceding points" },
  { lessonNumber: 43, title: "Expressing Emphasis", description: "Emphasizing points" },
  { lessonNumber: 44, title: "Expressing Approximation", description: "Approximate expressions" },
  { lessonNumber: 45, title: "Expressing Frequency", description: "Frequency and repetition" },
  { lessonNumber: 46, title: "Expressing Duration", description: "Time duration" },
  { lessonNumber: 47, title: "Expressing Extent", description: "Degree and extent" },
  { lessonNumber: 48, title: "Expressing Manner", description: "How something is done" },
  { lessonNumber: 49, title: "Expressing Comparison", description: "Comparing things" },
  { lessonNumber: 50, title: "Complex Sentence Patterns", description: "Advanced sentence combinations" }
];

const MinnaNoNihongoLessons: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{[key: string]: string}>({});
  const [exerciseResults, setExerciseResults] = useState<{[key: string]: boolean}>({});
  const [progress, setProgress] = useState(0);
  const [studyMode, setStudyMode] = useState<'grammar' | 'exercise' | 'quiz'>('grammar');
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const currentLessonData = lessonData[currentLesson];
  const allLessons = [...lessonData, ...additionalLessons];

  // Calculate progress
  useEffect(() => {
    const completedLessons = Object.keys(exerciseResults).filter(key => exerciseResults[key]).length;
    const totalLessons = lessonData.length;
    setProgress(Math.round((completedLessons / totalLessons) * 100));
  }, [exerciseResults]);

  const handleExerciseSubmit = (exerciseIndex: number, answer: string) => {
    const exercise = currentLessonData.exercises[exerciseIndex];
    const isCorrect = answer === exercise.answer;
    
    setUserAnswers(prev => ({ ...prev, [`${currentLesson}-${exerciseIndex}`]: answer }));
    setExerciseResults(prev => ({ ...prev, [`${currentLesson}-${exerciseIndex}`]: isCorrect }));
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setTotalQuestions(prev => prev + 1);
  };

  const nextLesson = () => {
    if (currentLesson < lessonData.length - 1) {
      setCurrentLesson(currentLesson + 1);
      setShowAnswer(false);
      setCurrentExercise(0);
    }
  };

  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
      setShowAnswer(false);
      setCurrentExercise(0);
    }
  };

  const resetProgress = () => {
    setUserAnswers({});
    setExerciseResults({});
    setScore(0);
    setTotalQuestions(0);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/language/jlpt-n4" className="text-purple-600 hover:text-purple-800">
              <ArrowLeft className="w-5 h-5" />
            </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Minna no Nihongo Lessons 26-50</h1>
                <p className="text-gray-600">Essential Grammar Structures for N4 Level</p>
          </div>
        </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Progress</div>
                <div className="text-lg font-bold text-purple-600">{progress}%</div>
      </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
                    </div>
            </div>
              </div>
            </div>
          </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Lesson Navigation */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Lesson {currentLessonData.lessonNumber}: {currentLessonData.title}
            </h2>
            <div className="flex items-center space-x-2">
                  <button
                onClick={prevLesson}
                disabled={currentLesson === 0}
                className="p-2 rounded-lg bg-white shadow-sm border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                  </button>
              <span className="text-sm text-gray-600">
                {currentLesson + 1} of {lessonData.length}
              </span>
              <button
                onClick={nextLesson}
                disabled={currentLesson === lessonData.length - 1}
                className="p-2 rounded-lg bg-white shadow-sm border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              </div>
            </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${((currentLesson + 1) / lessonData.length) * 100}%` }}
            ></div>
          </div>
              </div>

        {/* Study Mode Tabs */}
                    <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { id: 'grammar', label: 'Grammar', icon: <BookOpen className="w-4 h-4" /> },
              { id: 'exercise', label: 'Exercises', icon: <Target className="w-4 h-4" /> },
              { id: 'quiz', label: 'Quiz', icon: <Award className="w-4 h-4" /> }
            ].map((tab) => (
                      <button
                key={tab.id}
                onClick={() => setStudyMode(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  studyMode === tab.id
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                      </button>
            ))}
                  </div>
                </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {studyMode === 'grammar' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Grammar Points</h3>
                  <div className="space-y-6">
                  {currentLessonData.grammarPoints.map((point, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Lightbulb className="w-5 h-5 text-yellow-500" />
                        <h4 className="font-semibold text-gray-900">{point.pattern}</h4>
                        </div>
                      <p className="text-gray-600 mb-4">{point.explanation}</p>
                      <div className="space-y-3">
                        {point.examples.map((example, exIndex) => (
                          <div key={exIndex} className="bg-gray-50 rounded-lg p-3">
                            <div className="text-lg font-medium text-gray-900 mb-1">
                              {example.japanese}
                        </div>
                            <div className="text-sm text-gray-600 mb-1">
                              {example.reading}
                      </div>
                            <div className="text-gray-700">
                              {example.english}
                  </div>
                </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              )}

            {studyMode === 'exercise' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Practice Exercises</h3>
                {currentLessonData.exercises.length > 0 ? (
                  <div className="space-y-6">
                    {currentLessonData.exercises.map((exercise, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-4">
                          <Target className="w-5 h-5 text-blue-500" />
                          <h4 className="font-semibold text-gray-900">Exercise {index + 1}</h4>
                          </div>
                        
                        <div className="mb-4">
                          <p className="text-gray-900 mb-2">{exercise.question}</p>
                          {exercise.hint && (
                            <p className="text-sm text-gray-600 italic">Hint: {exercise.hint}</p>
                          )}
                        </div>

                        {exercise.type === 'fill_blank' && exercise.options && (
                          <div className="space-y-2">
                            {exercise.options.map((option, optIndex) => (
                          <button
                                key={optIndex}
                                onClick={() => handleExerciseSubmit(index, option)}
                                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                                  userAnswers[`${currentLesson}-${index}`] === option
                                    ? exerciseResults[`${currentLesson}-${index}`]
                                      ? 'border-green-500 bg-green-50'
                                      : 'border-red-500 bg-red-50'
                                    : 'border-gray-200 hover:border-purple-300'
                                }`}
                              >
                                {option}
                          </button>
                      ))}
                    </div>
                        )}

                        {exercise.type === 'translation' && (
                          <div className="space-y-2">
                            <input
                              type="text"
                              placeholder="Type your answer..."
                              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                              value={userAnswers[`${currentLesson}-${index}`] || ''}
                              onChange={(e) => setUserAnswers(prev => ({ ...prev, [`${currentLesson}-${index}`]: e.target.value }))}
                            />
                          <button
                              onClick={() => handleExerciseSubmit(index, userAnswers[`${currentLesson}-${index}`] || '')}
                              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                          >
                              Check Answer
                          </button>
                        </div>
                        )}

                        {userAnswers[`${currentLesson}-${index}`] && (
                          <div className={`mt-3 p-3 rounded-lg ${
                            exerciseResults[`${currentLesson}-${index}`]
                              ? 'bg-green-50 border border-green-200'
                              : 'bg-red-50 border border-red-200'
                          }`}>
                            <div className="flex items-center space-x-2">
                              {exerciseResults[`${currentLesson}-${index}`] ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-600" />
                              )}
                              <span className={`font-medium ${
                                exerciseResults[`${currentLesson}-${index}`] ? 'text-green-800' : 'text-red-800'
                              }`}>
                                {exerciseResults[`${currentLesson}-${index}`] ? 'Correct!' : 'Incorrect'}
                              </span>
                      </div>
                            {!exerciseResults[`${currentLesson}-${index}`] && (
                              <p className="text-sm text-gray-700 mt-2">
                                Correct answer: <span className="font-medium">{exercise.answer}</span>
                              </p>
                  )}
                </div>
              )}
                      </div>
                    ))}
                    </div>
                  ) : (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No exercises available for this lesson yet.</p>
                      </div>
                )}
              </div>
            )}

            {studyMode === 'quiz' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Lesson Quiz</h3>
                <div className="text-center py-8">
                  <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Quiz feature coming soon!</p>
                  <p className="text-sm text-gray-500">Complete the exercises first to unlock the quiz.</p>
                          </div>
                        </div>
                      )}
                    </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lesson Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Lesson Overview</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Current Lesson:</span>
                  <span className="font-medium">{currentLessonData.lessonNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Grammar Points:</span>
                  <span className="font-medium">{currentLessonData.grammarPoints.length}</span>
            </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Exercises:</span>
                  <span className="font-medium">{currentLessonData.exercises.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Score:</span>
                  <span className="font-medium">{score}/{totalQuestions}</span>
          </div>
        </div>
      </div>

            {/* Lesson List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">All Lessons</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {allLessons.map((lesson, index) => (
              <button
                    key={index}
                    onClick={() => {
                      if (index < lessonData.length) {
                        setCurrentLesson(index);
                        setShowAnswer(false);
                        setCurrentExercise(0);
                      }
                    }}
                    className={`w-full text-left p-2 rounded-lg transition-colors ${
                      index === currentLesson
                        ? 'bg-purple-100 text-purple-700 border border-purple-200'
                        : 'hover:bg-gray-50'
                    } ${index >= lessonData.length ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={index >= lessonData.length}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Lesson {lesson.lessonNumber}</div>
                        <div className="text-sm text-gray-600">{lesson.title}</div>
                      </div>
                      {index < lessonData.length && exerciseResults[`${index}-0`] && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </div>
              </button>
                ))}
            </div>
              </div>
              
            {/* Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={resetProgress}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Progress</span>
                </button>
                <Link
                  to="/language/jlpt-n4"
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Home className="w-4 h-4" />
                  <span>Back to N4 Course</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinnaNoNihongoLessons; 