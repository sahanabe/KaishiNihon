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

const JLPTN3: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showVocabularyBuilder, setShowVocabularyBuilder] = useState(false);
  const [userProgress] = useState({
    kanji: 0,
    vocabulary: 0,
    grammar: 0,
    reading: 0,
    listening: 0,
    business: 0,
    exams: 0,
    interview: 0
  });

  // Learning path steps for N3
  const learningSteps = [
    {
      id: 1,
      title: 'Advanced Kanji System',
      description: 'Master 650 complex N3 Kanji with advanced compounds',
      duration: '12-15 weeks',
      icon: <span className="text-lg font-bold">漢</span>,
      color: 'from-emerald-500 to-emerald-600',
      details: ['Complex compound readings', 'Advanced stroke combinations', 'Business kanji mastery', 'Literary character usage']
    },
    {
      id: 2,
      title: 'Professional Vocabulary',
      description: '3,000 advanced words including business terminology',
      duration: '150 days',
      icon: <Brain className="w-6 h-6" />,
      color: 'from-teal-500 to-teal-600',
      details: ['Business vocabulary sets', 'Academic terminology', 'Technical expressions', 'Cultural idioms']
    },
    {
      id: 3,
      title: 'Complex Grammar Mastery',
      description: 'Advanced patterns, keigo, and nuanced expressions',
      duration: '10-12 weeks',
      icon: <Target className="w-6 h-6" />,
      color: 'from-cyan-500 to-cyan-600',
      details: ['Advanced keigo (honorific/humble)', 'Complex conditional patterns', 'Formal written expressions', 'Nuanced particle usage']
    },
    {
      id: 4,
      title: 'Advanced Reading Skills',
      description: 'Newspapers, novels, and technical documents',
      duration: '8-10 weeks',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      details: ['Newspaper articles', 'Business reports', 'Academic papers', 'Literary works']
    },
    {
      id: 5,
      title: 'Professional Listening',
      description: 'Business meetings, news, and formal presentations',
      duration: '8-10 weeks',
      icon: <Volume2 className="w-6 h-6" />,
      color: 'from-indigo-500 to-indigo-600',
      details: ['Business meetings', 'News broadcasts', 'Academic lectures', 'Formal interviews']
    },
    {
      id: 6,
      title: 'Business Japanese Fluency',
      description: 'Professional communication and business culture',
      duration: '6-8 weeks',
      icon: <Users className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      details: ['Business email writing', 'Meeting facilitation', 'Presentation skills', 'Negotiation language']
    },
    {
      id: 7,
      title: 'Comprehensive N3 Testing',
      description: 'Advanced JLPT N3 and business proficiency tests',
      duration: 'Ongoing',
      icon: <Award className="w-6 h-6" />,
      color: 'from-violet-500 to-violet-600',
      details: ['Vocabulary tests (60 questions)', 'Grammar tests (70 questions)', 'Reading comprehension (25 questions)', 'Listening practice (60 questions)']
    },
    {
      id: 8,
      title: 'Executive Interview Mastery',
      description: 'Executive-level interview and presentation skills',
      duration: '4-5 weeks',
      icon: <Trophy className="w-6 h-6" />,
      color: 'from-pink-500 to-pink-600',
      details: ['Executive interviews', 'Board presentations', 'International negotiations', 'Leadership communication']
    }
  ];

  // AI Features
  const aiFeatures = [
    {
      title: 'Executive-Level AI Coaching',
      description: 'AI designed for professional and executive-level Japanese communication',
      icon: <Brain className="w-8 h-8 text-emerald-600" />
    },
    {
      title: 'Business Context Analysis',
      description: 'Advanced AI understanding of business and professional contexts',
      icon: <RotateCcw className="w-8 h-8 text-teal-600" />
    },
    {
      title: 'Professional Speech Mastery',
      description: 'Executive-level pronunciation and presentation coaching',
      icon: <Volume2 className="w-8 h-8 text-cyan-600" />
    },
    {
      title: 'Career Acceleration Planning',
      description: 'AI creates executive career development pathways in Japan',
      icon: <Calendar className="w-8 h-8 text-blue-600" />
    }
  ];

  // Exam structure for N3
  const examStructure = [
    {
      type: 'Advanced Vocabulary',
      questions: 60,
      timeLimit: '35 minutes',
      description: 'Professional vocabulary, business terms, and complex expressions'
    },
    {
      type: 'Complex Grammar',
      questions: 70,
      timeLimit: '45 minutes',
      description: 'Advanced grammar patterns, keigo, and formal expressions'
    },
    {
      type: 'Advanced Reading',
      questions: 25,
      timeLimit: '50 minutes',
      description: 'Business documents, news articles, and academic texts'
    },
    {
      type: 'Professional Listening',
      questions: 60,
      timeLimit: '50 minutes',
      description: 'Business meetings, presentations, and formal communications'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="w-8 h-8 text-yellow-300" />
              <span className="bg-yellow-300 text-emerald-900 px-3 py-1 rounded-full text-sm font-bold">
                Executive AI Learning
              </span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              JLPT N3 <span className="text-yellow-300">Executive Mastery Course</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Achieve upper-intermediate fluency with our executive-grade AI system. 
              Master N3 level in 10 months for professional success in Japan.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="bg-yellow-400 text-emerald-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all duration-300 flex items-center space-x-2 group">
                <PlayCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Start Executive Learning</span>
              </button>
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center space-x-2 group">
                <Users className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Join Executive N3 Classes</span>
              </button>
              <button className="bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300">
                Watch Executive Demo
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
                    ? 'border-emerald-600 text-emerald-600'
                    : 'border-transparent text-gray-600 hover:text-emerald-600'
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
                { label: 'Executive Students', value: '15,000+', icon: <Users className="w-8 h-8" />, color: 'text-emerald-600' },
                { label: 'Success Rate', value: '94.5%', icon: <TrendingUp className="w-8 h-8" />, color: 'text-teal-600' },
                { label: 'Course Duration', value: '10 Months', icon: <Clock className="w-8 h-8" />, color: 'text-cyan-600' },
                { label: 'Executive Placements', value: '3,500+', icon: <Globe className="w-8 h-8" />, color: 'text-blue-600' }
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Executive N3 Mastery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { title: '650 Kanji', subtitle: 'Advanced Characters', icon: '漢', bg: 'bg-emerald-100' },
                  { title: '3,000 Vocabulary', subtitle: 'Professional Terms', icon: '語', bg: 'bg-teal-100' },
                  { title: 'Advanced Grammar', subtitle: 'Keigo & Complex Forms', icon: '文', bg: 'bg-cyan-100' },
                  { title: 'Business Reading', subtitle: 'Professional Documents', icon: '読', bg: 'bg-blue-100' },
                  { title: 'Executive Listening', subtitle: 'Formal Communications', icon: '聞', bg: 'bg-indigo-100' },
                  { title: 'Business Fluency', subtitle: 'Professional Japanese', icon: '職', bg: 'bg-purple-100' },
                  { title: 'Cultural Mastery', subtitle: 'Executive Etiquette', icon: '礼', bg: 'bg-violet-100' },
                  { title: 'Leadership Skills', subtitle: 'Management Japanese', icon: '管', bg: 'bg-pink-100' }
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
            <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Users className="w-8 h-8 text-yellow-300" />
                  <span className="bg-yellow-300 text-emerald-900 px-3 py-1 rounded-full text-sm font-bold">
                    Executive Classes
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-4">Join Executive N3 Classes & Business Mentors</h2>
                <p className="text-lg text-emerald-100 max-w-3xl mx-auto">
                  Master business Japanese with our executive-level live classes and experienced business mentors
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-emerald-900" />
                    </div>
                    <h3 className="text-xl font-bold">Executive-Level Sessions</h3>
                  </div>
                  <ul className="space-y-2 text-emerald-100">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Business Japanese sessions with executive trainers</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Focus on keigo and professional communication</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Small executive groups (max 6 participants)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Real business scenarios and case studies</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-emerald-900" />
                    </div>
                    <h3 className="text-xl font-bold">Business Mentors & Coaches</h3>
                  </div>
                  <ul className="space-y-2 text-emerald-100">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Executive coaches with Fortune 500 experience</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Specialized in international business Japanese</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Executive career pathway planning</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Leadership development in Japanese context</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <button className="bg-yellow-400 text-emerald-900 px-10 py-4 rounded-xl font-bold text-xl hover:bg-yellow-300 transition-all duration-300 flex items-center space-x-3 mx-auto group">
                  <Users className="w-7 h-7 group-hover:scale-110 transition-transform" />
                  <span>Join Executive N3 Classes</span>
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-emerald-100 text-sm mt-4">
                  🎯 Executive trial session • 📅 Flexible executive scheduling • 🌍 Global business access
                </p>
              </div>
            </div>

            {/* Learning Methodology */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-8 text-center">Executive AI Learning System</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Executive AI Intelligence</h3>
                  <p className="text-cyan-100">
                    Our most advanced AI understands business context, cultural nuances, 
                    and executive communication patterns for professional success.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Business-Grade Feedback</h3>
                  <p className="text-cyan-100">
                    Get executive-level corrections for complex business communication, 
                    formal presentations, and international negotiations.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Executive Career Path</h3>
                  <p className="text-cyan-100">
                    Personalized learning designed for executive advancement, 
                    board positions, and international business leadership.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'curriculum' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Executive Learning Journey</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Follow our proven 8-step executive methodology for upper-intermediate Japanese mastery
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
                        <button className={`bg-gradient-to-r ${step.color} text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center space-x-2`}>
                          <span>Start Step {step.id}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
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
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Executive AI Technology</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the most sophisticated AI designed for business Japanese mastery
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
            <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-2xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4">Executive AI in Action</h3>
                <p className="text-emerald-100 text-lg">
                  See how our executive AI handles complex business Japanese scenarios
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="aspect-video bg-black/20 rounded-lg flex items-center justify-center">
                  <button className="bg-white text-emerald-600 w-16 h-16 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <PlayCircle className="w-8 h-8" />
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-emerald-100">Executive AI Demo - N3 Business Level - 5 minutes</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exams' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Executive Testing System</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive N3-level assessments for upper-intermediate proficiency validation
              </p>
            </div>

            {/* Exam Schedule */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">N3 Executive Exam Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-emerald-50 p-6 rounded-lg">
                  <h4 className="font-bold text-emerald-900 mb-2">Monthly Assessments</h4>
                  <p className="text-emerald-700">Executive progress evaluations</p>
                </div>
                <div className="bg-teal-50 p-6 rounded-lg">
                  <h4 className="font-bold text-teal-900 mb-2">N3 Mock Exams</h4>
                  <p className="text-teal-700">Official JLPT N3 format tests</p>
                </div>
                <div className="bg-cyan-50 p-6 rounded-lg">
                  <h4 className="font-bold text-cyan-900 mb-2">Business Proficiency</h4>
                  <p className="text-cyan-700">Executive Japanese certification</p>
                </div>
              </div>
            </div>

            {/* Exam Structure */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">N3 Executive Exam Structure</h3>
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
            <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Executive Testing Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-2">📝 Executive MCQ Format</h4>
                  <p className="text-emerald-100">Complex business scenarios with nuanced professional answers</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">🌐 Business Environment</h4>
                  <p className="text-emerald-100">Executive-level testing environment with business contexts</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">🎧 Professional Audio</h4>
                  <p className="text-emerald-100">Business meetings, executive presentations, and formal communications</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">📊 Executive Analytics</h4>
                  <p className="text-emerald-100">Advanced performance analysis with career development insights</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'certificate' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Executive Japanese Kaishi Test Certificate</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Earn your internationally recognized N3 upper-intermediate executive certificate
              </p>
            </div>

            {/* Certificate Preview */}
            <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-2xl p-8">
              <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl mx-auto">
                <div className="text-center border-4 border-emerald-400 p-8 rounded-lg">
                  <div className="text-4xl mb-4">🏆</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Executive Certificate of Mastery</h3>
                  <h4 className="text-xl text-emerald-600 font-bold mb-4">Japanese Kaishi Test - JLPT N3</h4>
                  <p className="text-gray-600 mb-4">This certifies that</p>
                  <p className="text-2xl font-bold text-gray-900 mb-4">[Your Name]</p>
                  <p className="text-gray-600 mb-6">
                    has successfully completed the Japanese Kaishi Test N3 level with upper-intermediate 
                    executive proficiency equivalent to JLPT N3 standard
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div>Certificate ID: KT-N3-2024-XXXX</div>
                    <div>Date: [Completion Date]</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate Benefits */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">N3 Executive Certificate Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">Executive Recognition</h4>
                      <p className="text-gray-600">Accepted by Fortune 500 companies and top Japanese corporations</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">Blockchain Verification</h4>
                      <p className="text-gray-600">Executive-grade security with international verification</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">Executive Career Advancement</h4>
                      <p className="text-gray-600">Qualify for senior management positions in Japan</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">Pathway to N2</h4>
                      <p className="text-gray-600">Direct access to N2 advanced business course</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interview Preparation */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4">Executive Interview Mastery</h3>
                <p className="text-cyan-100 text-lg">
                  Advanced training for executive and leadership positions in Japan
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <Users className="w-8 h-8 mb-4" />
                  <h4 className="font-bold mb-2">Executive Interviews</h4>
                  <p className="text-cyan-100 text-sm">C-level interview scenarios and board presentation skills</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <FileText className="w-8 h-8 mb-4" />
                  <h4 className="font-bold mb-2">Graduate School Prep</h4>
                  <p className="text-cyan-100 text-sm">MBA and graduate program interview preparation</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <Star className="w-8 h-8 mb-4" />
                  <h4 className="font-bold mb-2">Leadership Etiquette</h4>
                  <p className="text-cyan-100 text-sm">Executive-level business manners and international protocol</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready for Executive Japanese Mastery?</h2>
          <p className="text-xl mb-8 text-emerald-100">
            Join 15,000+ executives who chose our AI-powered N3 course for international career success
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-yellow-400 text-emerald-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all duration-300 flex items-center space-x-2 group">
              <Sparkles className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Start Executive Journey - ¥4,999/month</span>
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center space-x-2 group">
              <Users className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Join Executive Classes</span>
            </button>
            <button className="text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
              Try Executive Free Trial
            </button>
          </div>
          <p className="text-sm text-emerald-200 mt-4">
            Executive support • Business curriculum • International career guidance
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

export default JLPTN3; 