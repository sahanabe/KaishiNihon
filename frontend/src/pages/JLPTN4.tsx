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

const JLPTN4: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showVocabularyBuilder, setShowVocabularyBuilder] = useState(false);
  const [userProgress] = useState({
    kanji: 0,
    vocabulary: 0,
    grammar: 0,
    reading: 0,
    listening: 0,
    exams: 0,
    interview: 0
  });

  // Learning path steps for N4
  const learningSteps = [
    {
      id: 1,
      title: 'Advanced Kanji Mastery',
      description: 'Learn 300 essential N4 Kanji characters',
      duration: '8-10 weeks',
      icon: <span className="text-lg font-bold">漢</span>,
      color: 'from-red-500 to-red-600',
      details: ['Advanced stroke patterns', 'Complex readings (on/kun)', 'Compound word formations', 'Contextual usage practice']
    },
    {
      id: 2,
      title: 'N4 Vocabulary Expansion',
      description: '1,500 intermediate words, 15 words per day',
      duration: '100 days',
      icon: <Brain className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      details: ['Thematic vocabulary groups', 'Collocations and phrases', 'Business and formal language', 'Idiomatic expressions']
    },
    {
      id: 3,
      title: 'Intermediate Grammar Structures',
      description: 'Complex sentence patterns and conditionals',
      duration: '6-8 weeks',
      icon: <Target className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      details: ['Conditional forms (ば、と、たら)', 'Passive and causative', 'Honorific and humble forms', 'Complex modifying clauses']
    },
    {
      id: 4,
      title: 'Reading Comprehension',
      description: 'Longer texts and complex materials',
      duration: '4-6 weeks',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      details: ['News articles', 'Formal documents', 'Literary excerpts', 'Technical manuals']
    },
    {
      id: 5,
      title: 'Listening Skills Development',
      description: 'Natural conversation and formal speech',
      duration: '6-8 weeks',
      icon: <Volume2 className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600',
      details: ['Natural speech patterns', 'Formal presentations', 'Telephone conversations', 'News broadcasts']
    },
    {
      id: 6,
      title: 'Comprehensive Testing',
      description: 'Advanced JLPT N4 practice tests',
      duration: 'Ongoing',
      icon: <Award className="w-6 h-6" />,
      color: 'from-indigo-500 to-indigo-600',
      details: ['Vocabulary tests (40 questions)', 'Grammar tests (50 questions)', 'Reading comprehension (15 questions)', 'Listening practice (45 questions)']
    },
    {
      id: 7,
      title: 'Professional Interview Preparation',
      description: 'Advanced interview skills for work/study',
      duration: '3-4 weeks',
      icon: <Users className="w-6 h-6" />,
      color: 'from-pink-500 to-pink-600',
      details: ['Business interview scenarios', 'University interview preparation', 'Professional communication', 'Cultural competency']
    }
  ];

  // AI Features
  const aiFeatures = [
    {
      title: 'Advanced Adaptive Learning',
      description: 'AI analyzes complex patterns in your learning for N4-level optimization',
      icon: <Brain className="w-8 h-8 text-purple-600" />
    },
    {
      title: 'Intelligent Content Sequencing',
      description: 'Smart algorithm optimizes learning order for complex grammar structures',
      icon: <RotateCcw className="w-8 h-8 text-blue-600" />
    },
    {
      title: 'Advanced Speech Recognition',
      description: 'Enhanced pronunciation analysis for natural conversation patterns',
      icon: <Volume2 className="w-8 h-8 text-green-600" />
    },
    {
      title: 'Professional Study Planning',
      description: 'AI creates advanced study plans for working professionals and students',
      icon: <Calendar className="w-8 h-8 text-orange-600" />
    }
  ];

  // Exam structure for N4
  const examStructure = [
    {
      type: 'Vocabulary Test',
      questions: 40,
      timeLimit: '25 minutes',
      description: 'Advanced vocabulary, synonyms, and contextual usage'
    },
    {
      type: 'Grammar Test',
      questions: 50,
      timeLimit: '35 minutes',
      description: 'Complex grammar patterns, conditionals, and sentence structures'
    },
    {
      type: 'Reading Comprehension',
      questions: 15,
      timeLimit: '35 minutes',
      description: 'Longer passages with inference and analysis questions'
    },
    {
      type: 'Listening Test',
      questions: 45,
      timeLimit: '40 minutes',
      description: 'Natural conversations, formal presentations, and announcements'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="w-8 h-8 text-yellow-300" />
              <span className="bg-yellow-300 text-purple-900 px-3 py-1 rounded-full text-sm font-bold">
                Advanced AI Learning
              </span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              JLPT N4 <span className="text-yellow-300">AI Mastery Course</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Advance to intermediate Japanese with our cutting-edge AI system. 
              Master N4 level in 8 months with personalized, professional-grade learning.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all duration-300 flex items-center space-x-2 group">
                <PlayCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Start Advanced Learning</span>
              </button>
              <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2 group">
                <Users className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Join Advanced N4 Classes</span>
              </button>
              <button className="bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300">
                Watch N4 Demo
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
                { label: 'N4 Students', value: '25,000+', icon: <Users className="w-8 h-8" />, color: 'text-purple-600' },
                { label: 'Pass Rate', value: '96.8%', icon: <TrendingUp className="w-8 h-8" />, color: 'text-green-600' },
                { label: 'Course Duration', value: '8 Months', icon: <Clock className="w-8 h-8" />, color: 'text-pink-600' },
                { label: 'Career Placements', value: '2,500+', icon: <Globe className="w-8 h-8" />, color: 'text-red-600' }
              ].map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className={`${stat.color} mb-3`}>{stat.icon}</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* What You'll Master */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Advanced N4 Mastery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { title: '300 Kanji', subtitle: 'Advanced Characters', icon: '漢', bg: 'bg-red-100' },
                  { title: '1,500 Vocabulary', subtitle: 'Intermediate Words', icon: '語', bg: 'bg-green-100' },
                  { title: 'Complex Grammar', subtitle: 'Conditionals & Forms', icon: '文', bg: 'bg-purple-100' },
                  { title: 'Reading Skills', subtitle: 'Longer Texts', icon: '読', bg: 'bg-blue-100' },
                  { title: 'Listening Skills', subtitle: 'Natural Conversation', icon: '聞', bg: 'bg-orange-100' },
                  { title: 'Professional Skills', subtitle: 'Business Japanese', icon: '職', bg: 'bg-pink-100' },
                  { title: 'Cultural Fluency', subtitle: 'Advanced Etiquette', icon: '礼', bg: 'bg-indigo-100' }
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
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Users className="w-8 h-8 text-yellow-300" />
                  <span className="bg-yellow-300 text-purple-900 px-3 py-1 rounded-full text-sm font-bold">
                    Advanced Classes
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-4">Join Advanced N4 Classes & Expert Instructors</h2>
                <p className="text-lg text-purple-100 max-w-3xl mx-auto">
                  Take your Japanese to the next level with our intermediate-level live classes and professional instructors
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-900" />
                    </div>
                    <h3 className="text-xl font-bold">Advanced Interactive Sessions</h3>
                  </div>
                  <ul className="space-y-2 text-purple-100">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Intensive sessions with N4-certified instructors</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Focus on complex grammar and conversation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Small groups (max 8 students) for personalized attention</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Business Japanese and professional scenarios</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-purple-900" />
                    </div>
                    <h3 className="text-xl font-bold">Professional N4 Instructors</h3>
                  </div>
                  <ul className="space-y-2 text-purple-100">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Advanced-level certified Japanese instructors</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Specialized in business and academic Japanese</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Professional development guidance</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Career pathway consultation and support</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <button className="bg-yellow-400 text-purple-900 px-10 py-4 rounded-xl font-bold text-xl hover:bg-yellow-300 transition-all duration-300 flex items-center space-x-3 mx-auto group">
                  <Users className="w-7 h-7 group-hover:scale-110 transition-transform" />
                  <span>Join Advanced N4 Classes</span>
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-purple-100 text-sm mt-4">
                  🎯 Advanced trial class • 📅 Professional scheduling • 🌍 Global access
                </p>
              </div>
            </div>

            {/* Learning Methodology */}
            <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-8 text-center">Advanced AI Learning System</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Advanced AI Analysis</h3>
                  <p className="text-red-100">
                    Our enhanced AI understands complex language patterns and adapts to your 
                    intermediate learning needs with sophisticated algorithms.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Professional Feedback</h3>
                  <p className="text-red-100">
                    Get advanced corrections for complex grammar, nuanced expressions, 
                    and professional Japanese communication patterns.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Career-Focused Path</h3>
                  <p className="text-red-100">
                    Personalized learning journey designed for professional advancement 
                    and academic success in Japan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'curriculum' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Advanced Learning Journey</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Follow our proven 7-step advanced methodology for intermediate Japanese mastery
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
                    <div className="flex-1 bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`text-gray-600`}>{step.icon}</div>
                          <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                        </div>
                        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {step.duration}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-6">{step.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{detail}</span>
                          </div>
                        ))}
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Progress</span>
                          <span className="text-sm text-gray-500">
                            {Object.values(userProgress)[index] || 0}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`bg-gradient-to-r ${step.color} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${Object.values(userProgress)[index] || 0}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="mt-6">
                        {step.id === 1 ? (
                          <button className={`bg-gradient-to-r ${step.color} text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center space-x-2`}>
                            <span>Start Step {step.id}</span>
                            <ChevronRight className="w-4 h-4" />
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
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Advanced AI Technology</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience next-generation AI designed for intermediate Japanese learners
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
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4">Advanced AI in Action</h3>
                <p className="text-purple-100 text-lg">
                  See how our enhanced AI handles complex Japanese language patterns
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="aspect-video bg-black/20 rounded-lg flex items-center justify-center">
                  <button className="bg-white text-purple-600 w-16 h-16 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <PlayCircle className="w-8 h-8" />
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-purple-100">Advanced AI Demo - N4 Level - 4 minutes</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exams' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Advanced Testing System</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive N4-level assessments for intermediate proficiency validation
              </p>
            </div>

            {/* Exam Schedule */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">N4 Exam Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-bold text-purple-900 mb-2">Bi-weekly Assessments</h4>
                  <p className="text-purple-700">Advanced progress evaluations</p>
                </div>
                <div className="bg-pink-50 p-6 rounded-lg">
                  <h4 className="font-bold text-pink-900 mb-2">N4 Mock Exams</h4>
                  <p className="text-pink-700">Official JLPT N4 format tests</p>
                </div>
                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="font-bold text-red-900 mb-2">Professional Tests</h4>
                  <p className="text-red-700">Business Japanese proficiency</p>
                </div>
              </div>
            </div>

            {/* Exam Structure */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">N4 Exam Structure</h3>
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
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Advanced Testing Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-2">📝 Advanced MCQ Format</h4>
                  <p className="text-purple-100">Complex multiple choice with nuanced answer options</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">🌐 Professional Environment</h4>
                  <p className="text-purple-100">Business-level testing environment simulation</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">🎧 Natural Audio</h4>
                  <p className="text-purple-100">Native speaker conversations and formal presentations</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">📊 Detailed Analytics</h4>
                  <p className="text-purple-100">Comprehensive performance analysis and improvement suggestions</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'certificate' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Advanced Japanese Kaishi Test Certificate</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Earn your internationally recognized N4 intermediate proficiency certificate
              </p>
            </div>

            {/* Certificate Preview */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
              <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl mx-auto">
                <div className="text-center border-4 border-purple-400 p-8 rounded-lg">
                  <div className="text-4xl mb-4">🏆</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Advanced Certificate of Completion</h3>
                  <h4 className="text-xl text-purple-600 font-bold mb-4">Japanese Kaishi Test - JLPT N4</h4>
                  <p className="text-gray-600 mb-4">This certifies that</p>
                  <p className="text-2xl font-bold text-gray-900 mb-4">[Your Name]</p>
                  <p className="text-gray-600 mb-6">
                    has successfully completed the Japanese Kaishi Test N4 level with intermediate 
                    proficiency equivalent to JLPT N4 standard
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div>Certificate ID: KT-N4-2024-XXXX</div>
                    <div>Date: [Completion Date]</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate Benefits */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">N4 Certificate Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">Professional Recognition</h4>
                      <p className="text-gray-600">Accepted by Japanese companies and universities</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">Advanced Verification</h4>
                      <p className="text-gray-600">Blockchain-secured with QR code verification</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">Career Advancement</h4>
                      <p className="text-gray-600">Qualify for intermediate Japanese positions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">Pathway to N3</h4>
                      <p className="text-gray-600">Direct access to N3 advanced course</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interview Preparation */}
            <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4">Professional Interview Preparation</h3>
                <p className="text-red-100 text-lg">
                  Advanced training for professional and academic interviews in Japan
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <Users className="w-8 h-8 mb-4" />
                  <h4 className="font-bold mb-2">Professional Interviews</h4>
                  <p className="text-red-100 text-sm">Advanced business interview scenarios and professional communication</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <FileText className="w-8 h-8 mb-4" />
                  <h4 className="font-bold mb-2">University Applications</h4>
                  <p className="text-red-100 text-sm">Academic interview preparation for Japanese universities</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <Star className="w-8 h-8 mb-4" />
                  <h4 className="font-bold mb-2">Professional Etiquette</h4>
                  <p className="text-red-100 text-sm">Advanced business manners and cultural competency</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready for Intermediate Japanese Mastery?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Join 25,000+ professionals who chose our AI-powered N4 course for career advancement
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all duration-300 flex items-center space-x-2 group">
              <Sparkles className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Start N4 Journey - ¥2,999/month</span>
            </button>
            <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2 group">
              <Users className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Join Advanced Classes</span>
            </button>
            <button className="text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
              Try Advanced Free Trial
            </button>
          </div>
          <p className="text-sm text-purple-200 mt-4">
            Professional support • Advanced curriculum • Career pathway guidance
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

export default JLPTN4; 