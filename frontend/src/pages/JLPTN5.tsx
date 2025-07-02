import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VocabularyBuilder from '../components/VocabularyBuilder';
import { 
  BookOpen, 
  Brain, 
  Target, 
  Clock,
  Award, 
  PlayCircle, 
  CheckCircle, 
  Star,
  Zap,
  Users,
  Globe,
  FileText,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Volume2,
  RotateCcw,
  Calendar,
  Trophy
} from 'lucide-react';

const JLPTN5: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showVocabularyBuilder, setShowVocabularyBuilder] = useState(false);
  const [userProgress] = useState({
    hiragana: 0,
    katakana: 0,
    vocabulary: 0,
    grammar: 0,
    minnaLessons: 0,
    exams: 0,
    interview: 0,
    application: 0
  });

  // Function to check if a step is locked
  const isStepLocked = (stepId: number) => {
    if (stepId === 8) {
      // Step 8 is locked until all previous steps are completed
      const previousStepsProgress = [
        userProgress.hiragana,
        userProgress.vocabulary,
        userProgress.grammar,
        userProgress.minnaLessons,
        userProgress.exams,
        userProgress.interview
      ];
      return previousStepsProgress.some(progress => progress < 100);
    }
    return false;
  };

  // Learning path steps
  const learningSteps = [
    {
      id: 1,
      title: 'Hiragana & Katakana Mastery',
      description: 'Master all 46 Hiragana and 46 Katakana characters',
      duration: '2-3 weeks',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      details: ['Interactive character practice', 'Stroke order animation', 'Memory techniques', 'Daily quizzes']
    },
    {
      id: 2,
      title: 'N5 Vocabulary Building',
      description: '800 essential words, 10 words per day',
      duration: '80 days',
      icon: <Brain className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      details: ['Spaced repetition system', 'Audio pronunciation', 'Visual mnemonics', 'Context sentences']
    },
    {
      id: 3,
      title: 'Essential Kanji Mastery',
      description: '110 fundamental Kanji, 3 characters per day',
      duration: '37 days',
      icon: <span className="text-lg font-bold">漢</span>,
      color: 'from-rose-500 to-rose-600',
      details: ['Stroke order practice', 'Multiple readings (on/kun)', 'Character meanings', 'Usage examples'],
      kanjiSets: [
        { week: 1, days: '1-7', kanji: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万', '円', '年', '月', '日', '時', '分', '秒', '今'] },
        { week: 2, days: '8-14', kanji: ['人', '大', '小', '中', '上', '下', '前', '後', '左', '右', '東', '西', '南', '北', '国', '京', '都', '府', '県', '市', '町'] },
        { week: 3, days: '15-21', kanji: ['山', '川', '田', '村', '木', '森', '水', '火', '土', '金', '空', '雨', '雪', '雲', '風', '天', '気', '晴', '暑', '寒', '温'] },
        { week: 4, days: '22-28', kanji: ['車', '電', '道', '駅', '店', '買', '売', '商', '品', '物', '食', '飲', '米', '肉', '魚', '野', '菜', '果', '茶', '酒'] },
        { week: 5, days: '29-35', kanji: ['学', '校', '先', '生', '友', '達', '家', '族', '父', '母', '子', '男', '女', '兄', '弟', '姉', '妹', '妻', '夫', '出'] },
        { week: 6, days: '36-37', kanji: ['見', '聞', '話', '読', '書', '言', '語', '英', '文', '字', '手', '足', '目', '耳', '口', '頭', '心', '体', '元', '気', '病', '来', '行', '入', '立', '休', '働', '作', '使', '住', '知', '思', '好', '新', '古', '高', '安', '長', '短'] }
      ]
    },
    {
      id: 4,
      title: 'Grammar Fundamentals',
      description: 'All N5 particles and basic grammar patterns',
      duration: '4-6 weeks',
      icon: <Target className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      details: ['Particle usage patterns', 'Sentence structure', 'Conjugation rules', 'Practice exercises']
    },
    {
      id: 5,
      title: 'Minna no Nihongo Lessons',
      description: 'Complete lessons 1-25 with integrated practice',
      duration: '12-15 weeks',
      icon: <FileText className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600',
      details: ['Structured curriculum', 'Conversation practice', 'Cultural context', 'Progressive difficulty']
    },
    {
      id: 6,
      title: 'Comprehensive Testing',
      description: 'Regular exams and JLPT practice tests',
      duration: 'Ongoing',
      icon: <Award className="w-6 h-6" />,
      color: 'from-red-500 to-red-600',
      details: ['Vocabulary tests (25 questions)', 'Grammar tests (35 questions)', 'Reading comprehension (5 questions)', 'Listening practice (30 questions)']
    },
    {
      id: 7,
      title: 'Interview Preparation',
      description: 'Language school interview training',
      duration: '2-3 weeks',
      icon: <Users className="w-6 h-6" />,
      color: 'from-indigo-500 to-indigo-600',
      details: ['Mock interviews', 'Common questions', 'Cultural etiquette', 'Confidence building']
    },
    {
      id: 8,
      title: 'Apply for Japanese Language School in Japan',
      description: 'Complete application process for language schools in Japan',
      duration: '4-6 weeks',
      icon: <Globe className="w-6 h-6" />,
      color: 'from-emerald-500 to-emerald-600',
      details: ['School selection guidance', 'Application documentation', 'Visa assistance', 'Pre-departure preparation'],
      locked: true
    }
  ];

  // AI Features
  const aiFeatures = [
    {
      title: 'Adaptive Learning Path',
      description: 'AI analyzes your progress and adjusts difficulty in real-time',
      icon: <Brain className="w-8 h-8 text-purple-600" />
    },
    {
      title: 'Intelligent Spaced Repetition',
      description: 'Smart algorithm determines optimal review timing for maximum retention',
      icon: <RotateCcw className="w-8 h-8 text-blue-600" />
    },
    {
      title: 'Real-time Pronunciation Analysis',
      description: 'Advanced speech recognition provides instant feedback on pronunciation',
      icon: <Volume2 className="w-8 h-8 text-green-600" />
    },
    {
      title: 'Personalized Study Schedule',
      description: 'AI creates optimal study plans based on your availability and goals',
      icon: <Calendar className="w-8 h-8 text-orange-600" />
    }
  ];

  // Exam structure
  const examStructure = [
    {
      type: 'Vocabulary Test',
      questions: 25,
      timeLimit: '15 minutes',
      description: 'Multiple choice questions testing word meanings and usage'
    },
    {
      type: 'Grammar Test',
      questions: 35,
      timeLimit: '25 minutes',
      description: 'Particle usage, sentence structure, and grammar patterns'
    },
    {
      type: 'Reading Comprehension',
      questions: 5,
      timeLimit: '20 minutes',
      description: 'Short passages with comprehension questions'
    },
    {
      type: 'Listening Test',
      questions: 30,
      timeLimit: '30 minutes',
      description: 'Audio-based questions testing listening comprehension'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="w-8 h-8 text-yellow-300" />
              <span className="bg-yellow-300 text-purple-900 px-3 py-1 rounded-full text-sm font-bold">
                AI-Powered Learning
              </span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              JLPT N5 <span className="text-yellow-300">AI Mastery Course</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Experience the future of Japanese learning with our revolutionary AI system. 
              Complete N5 mastery in just 6 months with personalized, adaptive learning.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all duration-300 flex items-center space-x-2 group">
                <PlayCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Start Learning Now</span>
              </button>
              <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2 group">
                <Users className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Join Real Online N5 Classes</span>
              </button>
              <button className="bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300">
                Watch Demo Video
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Course Overview', icon: <BookOpen className="w-4 h-4" /> },
              { id: 'curriculum', label: 'Learning Path', icon: <Target className="w-4 h-4" /> },
              { id: 'ai-features', label: 'AI Features', icon: <Brain className="w-4 h-4" /> },
              { id: 'exams', label: 'Testing System', icon: <Award className="w-4 h-4" /> },
              { id: 'certificate', label: 'Certification', icon: <Trophy className="w-4 h-4" /> }
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
            {/* Course Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Students', value: '50,000+', icon: <Users className="w-8 h-8" />, color: 'text-blue-600' },
                { label: 'Success Rate', value: '98.5%', icon: <TrendingUp className="w-8 h-8" />, color: 'text-green-600' },
                { label: 'Course Duration', value: '6 Months', icon: <Clock className="w-8 h-8" />, color: 'text-purple-600' },
                { label: 'Global Access', value: '150+ Countries', icon: <Globe className="w-8 h-8" />, color: 'text-orange-600' }
              ].map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className={`${stat.color} mb-3`}>{stat.icon}</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* What You'll Learn */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What You'll Master</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { title: '92 Characters', subtitle: 'Hiragana & Katakana', icon: 'あ', bg: 'bg-blue-100' },
                  { title: '800 Vocabulary', subtitle: 'Essential N5 Words', icon: '語', bg: 'bg-green-100' },
                  { title: '110 Kanji', subtitle: '3 per day, 37 days', icon: '漢', bg: 'bg-rose-100' },
                  { title: '25 Lessons', subtitle: 'Minna no Nihongo', icon: '本', bg: 'bg-purple-100' },
                  { title: 'All Particles', subtitle: 'は、が、を、に、で...', icon: 'を', bg: 'bg-orange-100' },
                  { title: 'Grammar Patterns', subtitle: 'Core N5 Structures', icon: '文', bg: 'bg-red-100' },
                  { title: 'Interview Skills', subtitle: 'Language School Prep', icon: '話', bg: 'bg-indigo-100' }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className={`${item.bg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <span className="text-2xl font-bold">{item.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Online Classes Section */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Users className="w-8 h-8 text-yellow-300" />
                  <span className="bg-yellow-300 text-green-900 px-3 py-1 rounded-full text-sm font-bold">
                    Live Classes
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-4">Join Real Online N5 Classes & Meet Your Lecturers</h2>
                <p className="text-lg text-green-100 max-w-3xl mx-auto">
                  Experience the perfect blend of AI-powered learning and human expertise with our live online classes
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-green-900" />
                    </div>
                    <h3 className="text-xl font-bold">Live Interactive Classes</h3>
                  </div>
                  <ul className="space-y-2 text-green-100">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Daily live sessions with expert Japanese teachers</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Real-time interaction and instant Q&A</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Small class sizes (max 12 students)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Multiple time zones available globally</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-green-900" />
                    </div>
                    <h3 className="text-xl font-bold">Meet Your Expert Lecturers</h3>
                  </div>
                  <ul className="space-y-2 text-green-100">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Native Japanese speakers with teaching certifications</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>1-on-1 mentorship sessions available</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Cultural insights and pronunciation coaching</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Personal progress tracking and feedback</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <button className="bg-yellow-400 text-green-900 px-10 py-4 rounded-xl font-bold text-xl hover:bg-yellow-300 transition-all duration-300 flex items-center space-x-3 mx-auto group">
                  <Users className="w-7 h-7 group-hover:scale-110 transition-transform" />
                  <span>Join Live Classes & Meet Lecturers</span>
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-green-100 text-sm mt-4">
                  🎯 Free trial class available • 📅 Flexible scheduling • 🌍 Global access
                </p>
              </div>
            </div>

            {/* Learning Methodology */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-8 text-center">Revolutionary AI Learning System</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Adaptive AI</h3>
                  <p className="text-purple-100">
                    Our AI continuously analyzes your learning patterns and adjusts content difficulty, 
                    pacing, and focus areas for optimal progress.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Instant Feedback</h3>
                  <p className="text-purple-100">
                    Get immediate corrections, explanations, and guidance. No waiting for teacher reviews - 
                    learn and improve in real-time.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Personalized Path</h3>
                  <p className="text-purple-100">
                    Every student follows a unique learning journey tailored to their strengths, 
                    weaknesses, and learning preferences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'curriculum' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Complete Learning Journey</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Follow our proven 6-step methodology that has helped over 50,000 students achieve N5 mastery
              </p>
            </div>

            {/* Learning Steps */}
            <div className="space-y-8">
              {learningSteps.map((step, index) => (
                <div key={step.id} className="relative">
                  <div className="flex items-start space-x-6">
                    {/* Step Number */}
                    <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                      {step.id}
                    </div>

                    {/* Step Content */}
                    <div className={`flex-1 rounded-xl shadow-lg p-8 transition-shadow ${
                      isStepLocked(step.id) 
                        ? 'bg-gray-100 opacity-75' 
                        : 'bg-white hover:shadow-xl'
                    }`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`${isStepLocked(step.id) ? 'text-gray-400' : 'text-gray-600'}`}>
                            {step.icon}
                          </div>
                          <h3 className={`text-2xl font-bold ${isStepLocked(step.id) ? 'text-gray-500' : 'text-gray-900'}`}>
                            {step.title}
                            {isStepLocked(step.id) && (
                              <span className="ml-2 text-sm bg-gray-300 text-gray-600 px-2 py-1 rounded-full">
                                🔒 Locked
                              </span>
                            )}
                          </h3>
                        </div>
                        <div className={`text-sm px-3 py-1 rounded-full ${
                          isStepLocked(step.id) 
                            ? 'text-gray-500 bg-gray-200' 
                            : 'text-gray-500 bg-gray-100'
                        }`}>
                          {step.duration}
                        </div>
                      </div>
                      
                      <p className={`mb-6 ${isStepLocked(step.id) ? 'text-gray-500' : 'text-gray-600'}`}>
                        {isStepLocked(step.id) 
                          ? 'Complete all previous steps to unlock this module'
                          : step.description
                        }
                      </p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center space-x-2">
                            <CheckCircle className={`w-4 h-4 flex-shrink-0 ${
                              isStepLocked(step.id) ? 'text-gray-400' : 'text-green-600'
                            }`} />
                            <span className={`text-sm ${
                              isStepLocked(step.id) ? 'text-gray-500' : 'text-gray-700'
                            }`}>
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-sm font-medium ${
                            isStepLocked(step.id) ? 'text-gray-500' : 'text-gray-700'
                          }`}>
                            {isStepLocked(step.id) ? 'Locked' : 'Progress'}
                          </span>
                          <span className={`text-sm ${
                            isStepLocked(step.id) ? 'text-gray-500' : 'text-gray-500'
                          }`}>
                            {isStepLocked(step.id) ? '0%' : `${Object.values(userProgress)[index] || 0}%`}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              isStepLocked(step.id) 
                                ? 'bg-gray-300' 
                                : `bg-gradient-to-r ${step.color}`
                            }`}
                            style={{ width: isStepLocked(step.id) ? '0%' : `${Object.values(userProgress)[index] || 0}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Kanji Learning Plan - Special section for step 3 */}
                      {step.id === 3 && step.kanjiSets && (
                        <div className="mt-6 mb-6">
                          <h4 className="text-lg font-bold text-gray-900 mb-4">📅 6-Week Learning Plan (3 Kanji per Day)</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {step.kanjiSets.map((weekSet, weekIndex) => (
                              <div key={weekIndex} className="bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <h5 className="font-bold text-rose-800">Week {weekSet.week}</h5>
                                  <span className="text-xs bg-rose-200 text-rose-800 px-2 py-1 rounded-full">
                                    Days {weekSet.days}
                                  </span>
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center">
                                  {weekSet.kanji.map((kanji, kanjiIndex) => (
                                    <div 
                                      key={kanjiIndex}
                                      className="w-8 h-8 bg-white border border-rose-300 rounded flex items-center justify-center text-sm font-bold text-gray-900 hover:bg-rose-100 transition-colors cursor-pointer"
                                      title={`Day ${Math.floor(kanjiIndex / 3) + 1 + (weekSet.week - 1) * 7}: ${kanji}`}
                                    >
                                      {kanji}
                                    </div>
                                  ))}
                                </div>
                                <div className="mt-2 text-xs text-rose-600">
                                  {weekSet.kanji.length} characters • {Math.ceil(weekSet.kanji.length / 3)} days
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-start space-x-3">
                              <div className="text-2xl">💡</div>
                              <div>
                                <h5 className="font-bold text-yellow-800 mb-1">Learning Strategy</h5>
                                <p className="text-sm text-yellow-700">
                                  Each day focuses on 3 kanji with stroke order, readings (on-yomi/kun-yomi), meanings, and real-world usage examples. 
                                  Spaced repetition ensures long-term retention.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Button */}
                      <div className="mt-6">
                        {step.id === 1 ? (
                          <Link 
                            to="/language/hiragana-katakana"
                            className={`bg-gradient-to-r ${step.color} text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center space-x-2 inline-flex`}
                          >
                            <span>Start Step {step.id}</span>
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        ) : step.id === 2 ? (
                          <Link 
                            to="/language/n5-vocabulary"
                            className={`bg-gradient-to-r ${step.color} text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center space-x-2 inline-flex`}
                          >
                            <span>Start Step {step.id}</span>
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        ) : step.id === 3 ? (
                          <Link 
                            to="/language/kanji-mastery"
                            className={`bg-gradient-to-r ${step.color} text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center space-x-2 inline-flex`}
                          >
                            <span>Start Step {step.id}</span>
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        ) : step.id === 4 ? (
                          <Link 
                            to="/language/grammar-fundamentals"
                            className={`bg-gradient-to-r ${step.color} text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center space-x-2 inline-flex`}
                          >
                            <span>Start Step {step.id}</span>
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        ) : step.id === 5 ? (
                          <Link 
                            to="/language/minna-no-nihongo"
                            className={`bg-gradient-to-r ${step.color} text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center space-x-2 inline-flex`}
                          >
                            <span>Start Step {step.id}</span>
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        ) : step.id === 6 ? (
                          <Link 
                            to="/language/comprehensive-testing-n5"
                            className={`bg-gradient-to-r ${step.color} text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center space-x-2 inline-flex`}
                          >
                            <span>Start Step {step.id}</span>
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        ) : step.id === 7 ? (
                          <Link 
                            to="/language/ai-interview-preparation"
                            className={`bg-gradient-to-r ${step.color} text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center space-x-2 inline-flex`}
                          >
                            <span>Start Step {step.id}</span>
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        ) : step.id === 8 ? (
                          <button 
                            disabled={isStepLocked(step.id)}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                              isStepLocked(step.id)
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : `bg-gradient-to-r ${step.color} text-white hover:scale-105`
                            }`}
                          >
                            <span>
                              {isStepLocked(step.id) ? '🔒 Complete Previous Steps' : 'Start Step 8'}
                            </span>
                            {!isStepLocked(step.id) && <ChevronRight className="w-4 h-4" />}
                          </button>
                        ) : (
                          <button className={`bg-gradient-to-r ${step.color} text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center space-x-2`}>
                            <span>Start Step {step.id}</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Connecting Line */}
                  {index < learningSteps.length - 1 && (
                    <div className="absolute left-8 top-16 w-0.5 h-8 bg-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ai-features' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Cutting-Edge AI Technology</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the most advanced Japanese learning AI ever created
              </p>
            </div>

            {/* AI Features Grid */}
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

            {/* AI Demo Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4">See AI in Action</h3>
                <p className="text-blue-100 text-lg">
                  Watch how our AI adapts to your learning style in real-time
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="aspect-video bg-black/20 rounded-lg flex items-center justify-center">
                  <button className="bg-white text-purple-600 w-16 h-16 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <PlayCircle className="w-8 h-8" />
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-blue-100">Interactive AI Demo - 3 minutes</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exams' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Testing System</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Regular assessments ensure solid progress and JLPT readiness
              </p>
            </div>

            {/* Exam Schedule */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Exam Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-bold text-blue-900 mb-2">Every 10 Lessons</h4>
                  <p className="text-blue-700">Comprehensive progress evaluation</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-bold text-green-900 mb-2">JLPT Mock Tests</h4>
                  <p className="text-green-700">Official format practice exams</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-bold text-purple-900 mb-2">Kaishi Practice Tests</h4>
                  <p className="text-purple-700">Adaptive difficulty assessments</p>
                </div>
              </div>
            </div>

            {/* Exam Structure */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Exam Structure</h3>
              {examStructure.map((exam, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold text-gray-900">{exam.type}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{exam.questions} Questions</span>
                      <span>{exam.timeLimit}</span>
                    </div>
                  </div>
                  <p className="text-gray-600">{exam.description}</p>
                </div>
              ))}
            </div>

            {/* Special Features */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Special Testing Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-2">📝 All MCQ Format</h4>
                  <p className="text-green-100">Every question is multiple choice for clear, objective assessment</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">🌍 Global Accessibility</h4>
                  <p className="text-green-100">Take exams from any country, available 24/7</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">🎧 Audio Integration</h4>
                  <p className="text-green-100">High-quality audio for listening comprehension tests</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">📊 Instant Results</h4>
                  <p className="text-green-100">Get detailed feedback immediately after completion</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'certificate' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Japanese Kaishi Test Certificate</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Earn your internationally recognized N5 proficiency certificate
              </p>
            </div>

            {/* Certificate Preview */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8">
              <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl mx-auto">
                <div className="text-center border-4 border-yellow-400 p-8 rounded-lg">
                  <div className="text-4xl mb-4">🏆</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Certificate of Completion</h3>
                  <h4 className="text-xl text-yellow-600 font-bold mb-4">Japanese Kaishi Test - JLPT N5</h4>
                  <p className="text-gray-600 mb-4">This certifies that</p>
                  <p className="text-2xl font-bold text-gray-900 mb-4">[Your Name]</p>
                  <p className="text-gray-600 mb-6">
                    has successfully completed the Japanese Kaishi Test N5 level with proficiency 
                    equivalent to JLPT N5 standard
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div>Certificate ID: KT-N5-2024-XXXX</div>
                    <div>Date: [Completion Date]</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate Benefits */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Certificate Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">International Recognition</h4>
                      <p className="text-gray-600">Accepted by language schools worldwide</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">Digital Verification</h4>
                      <p className="text-gray-600">Blockchain-secured certificate authenticity</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">Career Advancement</h4>
                      <p className="text-gray-600">Boost your resume with Japanese proficiency</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">Pathway to Higher Levels</h4>
                      <p className="text-gray-600">Direct access to N4 course upon completion</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interview Preparation */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4">Language School Interview Preparation</h3>
                <p className="text-purple-100 text-lg">
                  Complete your journey with professional interview training
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <Users className="w-8 h-8 mb-4" />
                  <h4 className="font-bold mb-2">Mock Interviews</h4>
                  <p className="text-purple-100 text-sm">Practice with AI interviewer simulating real scenarios</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <FileText className="w-8 h-8 mb-4" />
                  <h4 className="font-bold mb-2">Common Questions</h4>
                  <p className="text-purple-100 text-sm">Prepare for standard language school interview questions</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <Star className="w-8 h-8 mb-4" />
                  <h4 className="font-bold mb-2">Cultural Etiquette</h4>
                  <p className="text-purple-100 text-sm">Learn proper Japanese interview manners and customs</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Master Japanese?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Join 50,000+ students who chose the AI-powered path to JLPT success
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all duration-300 flex items-center space-x-2 group">
              <Sparkles className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Start Your Journey - ¥1,999/month</span>
            </button>
            <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2 group">
              <Users className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Join Live Classes</span>
            </button>
            <button className="text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
              Try Free for 7 Days
            </button>
          </div>
          <p className="text-sm text-purple-200 mt-4">
            No commitment • Cancel anytime • 30-day money-back guarantee
          </p>
        </div>
      </div>

      {/* VocabularyBuilder Modal */}
      {showVocabularyBuilder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
          </div>
        </div>
      )}
    </div>
  );
};

export default JLPTN5; 