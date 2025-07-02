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
  GraduationCap,
  Crown
} from 'lucide-react';

const JLPTN1: React.FC = () => {
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
    literature: 0,
    research: 0,
    exams: 0
  });

  // Learning path steps for N1
  const learningSteps = [
    {
      id: 1,
      title: 'Master-Level Kanji System',
      description: 'Master 2,000+ complex N1 Kanji with literary readings',
      duration: '24-30 weeks',
      icon: <span className="text-lg font-bold">漢</span>,
      color: 'from-indigo-500 to-indigo-600',
      details: ['Literary kanji mastery', 'Classical Japanese readings', 'Specialized technical kanji', 'Historical character variants']
    },
    {
      id: 2,
      title: 'Elite Vocabulary Mastery',
      description: '10,000+ advanced vocabulary including literary terms',
      duration: '300 days',
      icon: <Brain className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      details: ['Literary vocabulary sets', 'Academic research terminology', 'Specialized field vocabulary', 'Classical expressions']
    },
    {
      id: 3,
      title: 'Advanced Grammar Mastery',
      description: 'Complex literary patterns and classical expressions',
      duration: '18-24 weeks',
      icon: <Target className="w-6 h-6" />,
      color: 'from-violet-500 to-violet-600',
      details: ['Classical Japanese grammar', 'Literary expression patterns', 'Complex abstract concepts', 'Academic writing structures']
    },
    {
      id: 4,
      title: 'Literary Reading Mastery',
      description: 'Classical literature, research papers, and complex texts',
      duration: '15-20 weeks',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      details: ['Classical Japanese literature', 'Academic research papers', 'Legal and governmental documents', 'Scientific publications']
    },
    {
      id: 5,
      title: 'Elite Listening Skills',
      description: 'Academic conferences, debates, and complex discussions',
      duration: '12-16 weeks',
      icon: <Volume2 className="w-6 h-6" />,
      color: 'from-cyan-500 to-cyan-600',
      details: ['Academic conferences', 'Political debates', 'Scientific presentations', 'Cultural discussions']
    },
    {
      id: 6,
      title: 'Professional Excellence',
      description: 'Executive-level business and academic communication',
      duration: '10-12 weeks',
      icon: <Crown className="w-6 h-6" />,
      color: 'from-teal-500 to-teal-600',
      details: ['Executive communications', 'Academic research writing', 'International negotiations', 'Cultural diplomacy']
    },
    {
      id: 7,
      title: 'Research & Literature',
      description: 'Advanced research methodology and literary analysis',
      duration: '8-10 weeks',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      details: ['Research methodology', 'Literary criticism', 'Historical analysis', 'Cultural studies']
    },
    {
      id: 8,
      title: 'Master-Level Assessment',
      description: 'Comprehensive JLPT N1 and professional certification',
      duration: 'Ongoing',
      icon: <Award className="w-6 h-6" />,
      color: 'from-emerald-500 to-emerald-600',
      details: ['Vocabulary tests (100 questions)', 'Grammar tests (120 questions)', 'Reading comprehension (50 questions)', 'Listening practice (100 questions)']
    }
  ];

  // AI Features for N1
  const aiFeatures = [
    {
      title: 'Master-Level AI Intelligence',
      description: 'AI with deep understanding of literary and academic Japanese',
      icon: <Brain className="w-8 h-8 text-indigo-600" />
    },
    {
      title: 'Literary Context Analysis',
      description: 'Advanced AI understanding of classical and modern literature',
      icon: <RotateCcw className="w-8 h-8 text-purple-600" />
    },
    {
      title: 'Elite Speech Mastery',
      description: 'Master-level pronunciation and presentation coaching',
      icon: <Volume2 className="w-8 h-8 text-violet-600" />
    },
    {
      title: 'Academic Excellence Planning',
      description: 'AI-driven academic and research career optimization',
      icon: <Calendar className="w-8 h-8 text-blue-600" />
    }
  ];

  // Exam structure for N1
  const examStructure = [
    {
      type: 'Master Vocabulary & Kanji',
      questions: 100,
      timeLimit: '60 minutes',
      description: 'Literary vocabulary, complex kanji readings, and specialized terminology'
    },
    {
      type: 'Advanced Grammar Mastery',
      questions: 120,
      timeLimit: '75 minutes',
      description: 'Classical grammar patterns, literary expressions, and complex structures'
    },
    {
      type: 'Literary Reading Comprehension',
      questions: 50,
      timeLimit: '90 minutes',
      description: 'Classical literature, academic papers, and complex analytical texts'
    },
    {
      type: 'Elite Listening Mastery',
      questions: 100,
      timeLimit: '80 minutes',
      description: 'Academic lectures, debates, and sophisticated conversations'
    }
  ];

  // Statistics for N1
  const stats = [
    { label: 'Kanji Characters', value: '2,000+', icon: <span className="text-2xl">漢</span> },
    { label: 'Vocabulary Words', value: '10,000', icon: <BookOpen className="w-6 h-6" /> },
    { label: 'Grammar Patterns', value: '300+', icon: <Target className="w-6 h-6" /> },
    { label: 'Study Duration', value: '18-24 months', icon: <Clock className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Crown className="w-8 h-8 text-yellow-300" />
              <span className="bg-yellow-300 text-indigo-900 px-3 py-1 rounded-full text-sm font-bold">
                Master-Level AI
              </span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              JLPT N1 <span className="text-yellow-300">Elite Mastery Course</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Achieve native-level fluency with our elite AI system. 
              Master N1 level in 18-24 months for academic excellence and professional leadership in Japan.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="bg-yellow-400 text-indigo-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all duration-300 flex items-center space-x-2 group">
                <PlayCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Begin Elite Training</span>
              </button>
              <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 flex items-center space-x-2 group">
                <Users className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Join Master N1 Classes</span>
              </button>
              <button className="bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300">
                Watch Master Demo
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
                    ? 'border-indigo-500 text-indigo-600'
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
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white">
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
            <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-6">Why Choose Our Elite N1 Course?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Crown className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Elite Level Mastery</h3>
                    <p className="text-indigo-100">Native-level fluency for academic and professional excellence</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Academic Research Ready</h3>
                    <p className="text-indigo-100">PhD-level Japanese for research and academic excellence</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Master AI Technology</h3>
                    <p className="text-indigo-100">Most advanced AI for elite-level language mastery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'learning-path' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Elite N1 Learning Journey</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A comprehensive 18-24 month program designed to achieve native-level Japanese fluency
              </p>
            </div>

            <div className="space-y-6">
              {learningSteps.map((step, index) => (
                <div key={step.id} className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100">
                  <div className="flex items-start space-x-6">
                    <div className={`p-4 bg-gradient-to-r ${step.color} rounded-xl text-white flex-shrink-0`}>
                      {step.icon}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center space-x-4 mb-4">
                        <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
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
                    <div className="text-2xl font-bold text-indigo-500">
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
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Master-Level AI Learning Technology</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experience the pinnacle of AI technology designed for native-level Japanese mastery
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {aiFeatures.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-indigo-100">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg">
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
              <h2 className="text-3xl font-bold text-gray-800 mb-4">JLPT N1 Master Exam Structure</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Comprehensive testing covering all aspects of native-level Japanese proficiency
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {examStructure.map((exam, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white">
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
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Elite Vocabulary Mastery</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Master 10,000 advanced vocabulary words including literary and academic terms
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-indigo-100">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  漢
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Master Vocabulary Builder</h3>
                <p className="text-gray-600 mb-6">
                  Experience our elite vocabulary learning system with advanced spaced repetition and AI-powered literary analysis
                </p>
                <button
                  onClick={() => setShowVocabularyBuilder(true)}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 flex items-center space-x-2 mx-auto"
                >
                  <PlayCircle className="w-5 h-5" />
                  <span>Launch N1 Elite Vocabulary</span>
                </button>
              </div>
            </div>

            {showVocabularyBuilder && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800">N1 Elite Vocabulary Builder</h3>
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
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Track Your Elite Progress</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Monitor your advancement toward native-level Japanese mastery with detailed analytics
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(userProgress).map(([key, value]) => (
                <div key={key} className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                    <span className="text-2xl font-bold text-indigo-600">{value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {value === 0 ? 'Not started' : value < 30 ? 'Beginning mastery' : value < 70 ? 'Advanced progress' : 'Near native level'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Achieve Native-Level Mastery?</h2>
          <p className="text-xl mb-8">
            Join the elite circle of students who achieved N1 certification and native-level fluency
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-yellow-400 text-indigo-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all duration-300 flex items-center space-x-2">
              <Crown className="w-6 h-6" />
              <span>Begin Elite Journey</span>
            </button>
            <Link
              to="/language/jlpt-n2"
              className="bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center space-x-2"
            >
              <ChevronRight className="w-5 h-5" />
              <span>Explore N2 Course</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JLPTN1; 