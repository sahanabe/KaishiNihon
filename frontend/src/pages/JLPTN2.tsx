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
  Trophy,
  Briefcase,
  GraduationCap
} from 'lucide-react';

const JLPTN2: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showVocabularyBuilder, setShowVocabularyBuilder] = useState(false);
  const [userProgress] = useState({
    kanji: 0,
    vocabulary: 0,
    grammar: 0,
    reading: 0,
    listening: 0,
    business: 0,
    academic: 0,
    exams: 0
  });

  // Learning path steps for N2
  const learningSteps = [
    {
      id: 1,
      title: 'Advanced Kanji Mastery',
      description: 'Master 1,000 complex N2 Kanji with intricate readings',
      duration: '16-20 weeks',
      icon: <span className="text-lg font-bold">漢</span>,
      color: 'from-amber-500 to-amber-600',
      details: ['Complex compound readings', 'Multiple pronunciation patterns', 'Advanced stroke combinations', 'Academic and formal kanji']
    },
    {
      id: 2,
      title: 'Extensive Vocabulary Bank',
      description: '6,000 advanced vocabulary including specialized terms',
      duration: '200 days',
      icon: <Brain className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600',
      details: ['Academic vocabulary sets', 'Technical terminology', 'Business expressions', 'Cultural and historical terms']
    },
    {
      id: 3,
      title: 'Advanced Grammar Patterns',
      description: 'Complex grammar, formal expressions, and nuanced usage',
      duration: '12-15 weeks',
      icon: <Target className="w-6 h-6" />,
      color: 'from-red-500 to-red-600',
      details: ['Advanced conditional forms', 'Complex keigo expressions', 'Formal written patterns', 'Abstract concept expressions']
    },
    {
      id: 4,
      title: 'Professional Reading Skills',
      description: 'Academic papers, business documents, and complex texts',
      duration: '10-12 weeks',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-rose-500 to-rose-600',
      details: ['Academic research papers', 'Legal documents', 'Technical manuals', 'Editorial articles']
    },
    {
      id: 5,
      title: 'Advanced Listening Comprehension',
      description: 'Academic lectures, business discussions, and complex dialogue',
      duration: '10-12 weeks',
      icon: <Volume2 className="w-6 h-6" />,
      color: 'from-pink-500 to-pink-600',
      details: ['University lectures', 'Business conferences', 'Technical presentations', 'Abstract discussions']
    },
    {
      id: 6,
      title: 'Academic & Business Fluency',
      description: 'Professional and academic communication mastery',
      duration: '8-10 weeks',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'from-violet-500 to-violet-600',
      details: ['Academic writing skills', 'Research presentation', 'Professional negotiations', 'Cross-cultural communication']
    },
    {
      id: 7,
      title: 'Comprehensive N2 Assessment',
      description: 'Intensive JLPT N2 and professional competency testing',
      duration: 'Ongoing',
      icon: <Award className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      details: ['Vocabulary tests (75 questions)', 'Grammar tests (85 questions)', 'Reading comprehension (35 questions)', 'Listening practice (75 questions)']
    }
  ];

  // AI Features for N2
  const aiFeatures = [
    {
      title: 'Advanced Adaptive Intelligence',
      description: 'AI with deep understanding of complex Japanese language nuances',
      icon: <Brain className="w-8 h-8 text-amber-600" />
    },
    {
      title: 'Context-Aware Learning',
      description: 'Advanced AI that adapts to academic and professional contexts',
      icon: <RotateCcw className="w-8 h-8 text-orange-600" />
    },
    {
      title: 'Sophisticated Speech Analysis',
      description: 'Advanced pronunciation coaching for complex expressions',
      icon: <Volume2 className="w-8 h-8 text-red-600" />
    },
    {
      title: 'Professional Path Optimization',
      description: 'AI-driven career and academic advancement planning',
      icon: <Calendar className="w-8 h-8 text-rose-600" />
    }
  ];

  // Exam structure for N2
  const examStructure = [
    {
      type: 'Advanced Vocabulary & Kanji',
      questions: 75,
      timeLimit: '45 minutes',
      description: 'Complex vocabulary, advanced kanji readings, and specialized terminology'
    },
    {
      type: 'Complex Grammar Patterns',
      questions: 85,
      timeLimit: '55 minutes',
      description: 'Advanced grammar structures, formal expressions, and nuanced patterns'
    },
    {
      type: 'Advanced Reading Comprehension',
      questions: 35,
      timeLimit: '70 minutes',
      description: 'Academic papers, business reports, and complex literary texts'
    },
    {
      type: 'Professional Listening',
      questions: 75,
      timeLimit: '60 minutes',
      description: 'Academic lectures, business meetings, and complex conversations'
    }
  ];

  // Statistics for N2
  const stats = [
    { label: 'Kanji Characters', value: '1,000', icon: <span className="text-2xl">漢</span> },
    { label: 'Vocabulary Words', value: '6,000', icon: <BookOpen className="w-6 h-6" /> },
    { label: 'Grammar Patterns', value: '200+', icon: <Target className="w-6 h-6" /> },
    { label: 'Study Duration', value: '12-15 months', icon: <Clock className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="w-8 h-8 text-yellow-300" />
              <span className="bg-yellow-300 text-amber-900 px-3 py-1 rounded-full text-sm font-bold">
                Advanced AI Intelligence
              </span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              JLPT N2 <span className="text-yellow-300">Advanced Mastery Course</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Achieve upper-intermediate fluency with our cutting-edge AI system. 
              Master N2 level in 12-15 months for academic and professional excellence in Japan.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="bg-yellow-400 text-amber-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all duration-300 flex items-center space-x-2 group">
                <PlayCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Start Advanced Learning</span>
              </button>
              <button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 flex items-center space-x-2 group">
                <Users className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Join Advanced N2 Classes</span>
              </button>
              <button className="bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300">
                Watch Advanced Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Course Overview', icon: <Globe className="w-4 h-4" /> },
              { id: 'learning-path', label: 'Learning Path', icon: <TrendingUp className="w-4 h-4" /> },
              { id: 'ai-features', label: 'AI Features', icon: <Brain className="w-4 h-4" /> },
              { id: 'exam-structure', label: 'Exam Structure', icon: <Award className="w-4 h-4" /> },
              { id: 'vocabulary', label: 'Vocabulary Practice', icon: <BookOpen className="w-4 h-4" /> },
              { id: 'progress', label: 'Progress Tracking', icon: <Target className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg text-white">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                      <p className="text-gray-600">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Course Features */}
            <div className="bg-gradient-to-r from-amber-500 to-red-500 rounded-xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-6">Why Choose Our N2 Course?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Academic Excellence</h3>
                    <p className="text-amber-100">Prepare for university entrance and advanced studies</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Professional Ready</h3>
                    <p className="text-amber-100">Advanced business Japanese for career advancement</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">AI-Powered</h3>
                    <p className="text-amber-100">Advanced AI adaptation for complex language patterns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'learning-path' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Your N2 Learning Journey</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A comprehensive 12-15 month program designed to take you from intermediate to upper-intermediate fluency
              </p>
            </div>

            <div className="space-y-6">
              {learningSteps.map((step, index) => (
                <div key={step.id} className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                  <div className="flex items-start space-x-6">
                    <div className={`p-4 bg-gradient-to-r ${step.color} rounded-xl text-white flex-shrink-0`}>
                      {step.icon}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center space-x-4 mb-4">
                        <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                        <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-700">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-amber-500">
                      {step.id}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ai-features' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Advanced AI Learning Technology</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experience next-generation AI designed specifically for advanced Japanese language learning
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {aiFeatures.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-amber-100">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'exam-structure' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">JLPT N2 Exam Structure</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Comprehensive testing covering all aspects of upper-intermediate Japanese proficiency
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {examStructure.map((exam, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg text-white">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{exam.type}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{exam.questions} questions</span>
                        <span>•</span>
                        <span>{exam.timeLimit}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{exam.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'vocabulary' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Advanced Vocabulary Practice</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Master 6,000 advanced vocabulary words with our AI-powered learning system
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-amber-100">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  漢
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Interactive Vocabulary Builder</h3>
                <p className="text-gray-600 mb-6">
                  Experience our advanced vocabulary learning system with spaced repetition and AI-powered insights
                </p>
                <button
                  onClick={() => setShowVocabularyBuilder(true)}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 flex items-center space-x-2 mx-auto"
                >
                  <PlayCircle className="w-5 h-5" />
                  <span>Launch N2 Vocabulary Builder</span>
                </button>
              </div>
            </div>

            {showVocabularyBuilder && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800">N2 Vocabulary Builder</h3>
                    <button
                      onClick={() => setShowVocabularyBuilder(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="p-6">
                    <VocabularyBuilder onClose={() => setShowVocabularyBuilder(false)} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Track Your N2 Progress</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Monitor your advancement through advanced Japanese proficiency with detailed analytics
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(userProgress).map(([key, value]) => (
                <div key={key} className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                    <span className="text-2xl font-bold text-amber-600">{value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {value === 0 ? 'Not started' : value < 30 ? 'Getting started' : value < 70 ? 'Making progress' : 'Nearly complete'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Master JLPT N2?</h2>
          <p className="text-xl mb-8">
            Join thousands of successful students who achieved N2 certification with our advanced AI system
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-yellow-400 text-amber-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all duration-300 flex items-center space-x-2">
              <PlayCircle className="w-6 h-6" />
              <span>Start Your N2 Journey</span>
            </button>
            <Link
              to="/language/jlpt-n3"
              className="bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center space-x-2"
            >
              <ChevronRight className="w-5 h-5" />
              <span>Explore N3 Course</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JLPTN2; 