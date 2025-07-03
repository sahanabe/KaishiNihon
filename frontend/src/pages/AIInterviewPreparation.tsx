import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  MessageCircle, 
  BookOpen, 
  Target, 
  Clock,
  Award, 
  PlayCircle, 
  CheckCircle, 
  Star,
  Zap,
  Globe,
  FileText,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Volume2,
  RotateCcw,
  Calendar,
  Trophy,
  ArrowLeft,
  BarChart3,
  Timer,
  CheckSquare,
  XCircle,
  Mic,
  Video,
  Headphones,
  Smile,
  Heart,
  Shield,
  Lightbulb
} from 'lucide-react';

const AIInterviewPreparation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [interviewProgress, setInterviewProgress] = useState({
    mockInterviews: 0,
    commonQuestions: 0,
    culturalEtiquette: 0,
    confidenceBuilding: 0
  });

  const interviewModules = [
    {
      id: 'mockInterviews',
      title: 'Mock Interviews',
      description: 'Practice with AI interviewer simulating real language school scenarios',
      sessions: 5,
      duration: '15-20 minutes each',
      icon: <Video className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      progress: interviewProgress.mockInterviews,
      status: interviewProgress.mockInterviews === 100 ? 'completed' : interviewProgress.mockInterviews > 0 ? 'in-progress' : 'not-started'
    },
    {
      id: 'commonQuestions',
      title: 'Common Questions',
      description: 'Master typical language school interview questions and responses',
      sessions: 3,
      duration: '30 minutes each',
      icon: <MessageCircle className="w-8 h-8" />,
      color: 'from-green-500 to-green-600',
      progress: interviewProgress.commonQuestions,
      status: interviewProgress.commonQuestions === 100 ? 'completed' : interviewProgress.commonQuestions > 0 ? 'in-progress' : 'not-started'
    },
    {
      id: 'culturalEtiquette',
      title: 'Cultural Etiquette',
      description: 'Learn proper Japanese interview manners and cultural customs',
      sessions: 2,
      duration: '45 minutes each',
      icon: <Heart className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600',
      progress: interviewProgress.culturalEtiquette,
      status: interviewProgress.culturalEtiquette === 100 ? 'completed' : interviewProgress.culturalEtiquette > 0 ? 'in-progress' : 'not-started'
    },
    {
      id: 'confidenceBuilding',
      title: 'Confidence Building',
      description: 'Develop self-assurance and presentation skills for interviews',
      sessions: 4,
      duration: '20 minutes each',
      icon: <Smile className="w-8 h-8" />,
      color: 'from-orange-500 to-orange-600',
      progress: interviewProgress.confidenceBuilding,
      status: interviewProgress.confidenceBuilding === 100 ? 'completed' : interviewProgress.confidenceBuilding > 0 ? 'in-progress' : 'not-started'
    }
  ];

  const commonQuestions = [
    {
      category: 'Personal Information',
      questions: [
        'What is your name and age?',
        'Where are you from?',
        'What do you do for work?',
        'Why do you want to study Japanese?',
        'How long have you been studying Japanese?'
      ]
    },
    {
      category: 'Study Goals',
      questions: [
        'What are your goals for studying Japanese?',
        'How do you plan to use Japanese in the future?',
        'What level of Japanese do you want to achieve?',
        'Are you planning to take the JLPT?',
        'How much time can you dedicate to studying?'
      ]
    },
    {
      category: 'Learning Experience',
      questions: [
        'What Japanese learning methods have you tried?',
        'What is your biggest challenge in learning Japanese?',
        'How do you practice Japanese outside of class?',
        'What Japanese media do you consume?',
        'Have you visited Japan before?'
      ]
    }
  ];

  const culturalTips = [
    {
      title: 'Greeting Etiquette',
      description: 'Proper bowing and greeting customs',
      icon: <Heart className="w-6 h-6" />,
      tips: ['Bow slightly when greeting', 'Use polite language (keigo)', 'Maintain eye contact appropriately']
    },
    {
      title: 'Communication Style',
      description: 'Japanese communication patterns',
      icon: <MessageCircle className="w-6 h-6" />,
      tips: ['Listen carefully before responding', 'Use humble language', 'Avoid direct confrontation']
    },
    {
      title: 'Body Language',
      description: 'Appropriate gestures and posture',
      icon: <Smile className="w-6 h-6" />,
      tips: ['Sit up straight', 'Keep hands visible', 'Nod to show understanding']
    },
    {
      title: 'Dress Code',
      description: 'Professional appearance standards',
      icon: <Shield className="w-6 h-6" />,
      tips: ['Wear conservative, clean clothing', 'Avoid flashy accessories', 'Ensure neat appearance']
    }
  ];

  const handleStartModule = (moduleId: string) => {
    setActiveSection(moduleId);
    console.log(`Starting ${moduleId} module`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-6 h-6 text-yellow-600" />;
      default:
        return <PlayCircle className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      default:
        return 'Not Started';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/language/jlpt-n5"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to N5 Course</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-purple-500" />
              <span className="font-semibold text-gray-900">AI Interview Preparation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Users className="w-8 h-8 text-yellow-300" />
              <span className="bg-yellow-300 text-purple-900 px-3 py-1 rounded-full text-sm font-bold">
                AI-Powered Training
              </span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              AI School <span className="text-yellow-300">Interview Preparation</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Master your language school interview with our AI-powered training system. 
              Practice with realistic scenarios and build confidence for success.
            </p>
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <Video className="w-5 h-5 text-purple-400" />
                <span>5 Mock Interviews</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-pink-400" />
                <span>Common Questions</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-orange-400" />
                <span>Cultural Training</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Progress Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Interview Preparation Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {interviewModules.map((module) => (
              <div key={module.id} className="text-center">
                <div className={`w-20 h-20 bg-gradient-to-r ${module.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {module.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{module.title}</h3>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className={`bg-gradient-to-r ${module.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${module.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">{module.progress}% Complete</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interview Modules */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Interview Preparation Modules</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete all modules to be fully prepared for your language school interview
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {interviewModules.map((module) => (
              <div key={module.id} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${module.color} rounded-lg flex items-center justify-center text-white`}>
                      {module.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{module.title}</h3>
                      <p className="text-gray-600">{module.description}</p>
                    </div>
                  </div>
                  {getStatusIcon(module.status)}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Video className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Sessions</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{module.sessions}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Timer className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Duration</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{module.duration}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      module.status === 'completed' ? 'bg-green-100 text-green-800' :
                      module.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {getStatusText(module.status)}
                    </span>
                    {module.progress > 0 && (
                      <span className="text-sm text-gray-600">{module.progress}%</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleStartModule(module.id)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                      module.status === 'completed' 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : `bg-gradient-to-r ${module.color} text-white hover:scale-105`
                    }`}
                  >
                    <span>
                      {module.status === 'completed' ? 'Review Module' : 'Start Module'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Questions Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Common Interview Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {commonQuestions.map((category, index) => (
              <div key={index} className="space-y-4">
                <h4 className="text-xl font-bold text-gray-900 mb-4">{category.category}</h4>
                <div className="space-y-3">
                  {category.questions.map((question, qIndex) => (
                    <div key={qIndex} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-purple-600 text-sm font-bold">{qIndex + 1}</span>
                        </div>
                        <p className="text-gray-700">{question}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cultural Etiquette Tips */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-8">
          <h3 className="text-3xl font-bold mb-8 text-center">Cultural Etiquette Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {culturalTips.map((tip, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  {tip.icon}
                  <h4 className="font-bold">{tip.title}</h4>
                </div>
                <p className="text-purple-100 text-sm mb-4">{tip.description}</p>
                <ul className="space-y-2">
                  {tip.tips.map((tipText, tipIndex) => (
                    <li key={tipIndex} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-purple-100 text-sm">{tipText}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* AI Features */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">AI-Powered Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mic className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Voice Recognition</h4>
                  <p className="text-gray-600">AI analyzes your pronunciation and speaking pace in real-time</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Smart Feedback</h4>
                  <p className="text-gray-600">Get personalized suggestions to improve your responses</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Headphones className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Audio Practice</h4>
                  <p className="text-gray-600">Practice with native Japanese pronunciation examples</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Progress Tracking</h4>
                  <p className="text-gray-600">Monitor your improvement across all interview skills</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Ace Your Interview?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Start your AI-powered interview preparation and build confidence for success
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={() => handleStartModule('mockInterviews')}
              className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all duration-300 flex items-center space-x-2 group"
            >
              <Video className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Start Mock Interview</span>
            </button>
            <Link 
              to="/language/jlpt-n5"
              className="bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300"
            >
              Back to N5 Course
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInterviewPreparation; 