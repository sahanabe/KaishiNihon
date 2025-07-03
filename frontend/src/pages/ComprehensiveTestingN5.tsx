import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  ArrowLeft,
  BarChart3,
  Timer,
  CheckSquare,
  XCircle
} from 'lucide-react';

const ComprehensiveTestingN5: React.FC = () => {
  const [activeTest, setActiveTest] = useState<string | null>(null);
  const [testProgress, setTestProgress] = useState({
    vocabulary: 0,
    grammar: 0,
    reading: 0,
    listening: 0
  });

  const testTypes = [
    {
      id: 'vocabulary',
      title: 'Vocabulary Tests',
      description: 'Test your knowledge of N5 vocabulary with 25 multiple choice questions',
      questions: 25,
      timeLimit: '15 minutes',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      progress: testProgress.vocabulary,
      status: testProgress.vocabulary === 100 ? 'completed' : testProgress.vocabulary > 0 ? 'in-progress' : 'not-started'
    },
    {
      id: 'grammar',
      title: 'Grammar Tests',
      description: 'Assess your understanding of N5 grammar patterns and particle usage',
      questions: 35,
      timeLimit: '25 minutes',
      icon: <Target className="w-8 h-8" />,
      color: 'from-green-500 to-green-600',
      progress: testProgress.grammar,
      status: testProgress.grammar === 100 ? 'completed' : testProgress.grammar > 0 ? 'in-progress' : 'not-started'
    },
    {
      id: 'reading',
      title: 'Reading Comprehensions',
      description: 'Practice reading short passages and answer comprehension questions',
      questions: 5,
      timeLimit: '20 minutes',
      icon: <FileText className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600',
      progress: testProgress.reading,
      status: testProgress.reading === 100 ? 'completed' : testProgress.reading > 0 ? 'in-progress' : 'not-started'
    },
    {
      id: 'listening',
      title: 'Listening Practice',
      description: 'Improve your listening skills with audio-based questions',
      questions: 30,
      timeLimit: '30 minutes',
      icon: <Volume2 className="w-8 h-8" />,
      color: 'from-orange-500 to-orange-600',
      progress: testProgress.listening,
      status: testProgress.listening === 100 ? 'completed' : testProgress.listening > 0 ? 'in-progress' : 'not-started'
    }
  ];

  const handleStartTest = (testId: string) => {
    setActiveTest(testId);
    // Here you would typically navigate to the actual test page
    console.log(`Starting ${testId} test`);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
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
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span className="font-semibold text-gray-900">JLPT N5 Testing Center</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Award className="w-8 h-8 text-yellow-300" />
              <span className="bg-yellow-300 text-purple-900 px-3 py-1 rounded-full text-sm font-bold">
                Comprehensive Testing
              </span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              JLPT N5 <span className="text-yellow-300">Testing Center</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Assess your N5 proficiency with our comprehensive testing system. 
              Track your progress and identify areas for improvement.
            </p>
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <CheckSquare className="w-5 h-5 text-green-400" />
                <span>95 Questions Total</span>
              </div>
              <div className="flex items-center space-x-2">
                <Timer className="w-5 h-5 text-blue-400" />
                <span>90 Minutes Total</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                <span>Instant Results</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Progress Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Progress Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {testTypes.map((test) => (
              <div key={test.id} className="text-center">
                <div className={`w-20 h-20 bg-gradient-to-r ${test.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {test.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{test.title}</h3>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className={`bg-gradient-to-r ${test.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${test.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">{test.progress}% Complete</p>
              </div>
            ))}
          </div>
        </div>

        {/* Test Categories */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Available Practice Tests</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose a test category to begin your assessment. Each test is designed to evaluate specific aspects of your N5 proficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testTypes.map((test) => (
              <div key={test.id} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${test.color} rounded-lg flex items-center justify-center text-white`}>
                      {test.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{test.title}</h3>
                      <p className="text-gray-600">{test.description}</p>
                    </div>
                  </div>
                  {getStatusIcon(test.status)}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckSquare className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Questions</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{test.questions}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Timer className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Time Limit</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{test.timeLimit}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      test.status === 'completed' ? 'bg-green-100 text-green-800' :
                      test.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {getStatusText(test.status)}
                    </span>
                    {test.progress > 0 && (
                      <span className="text-sm text-gray-600">{test.progress}%</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleStartTest(test.id)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                      test.status === 'completed' 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : `bg-gradient-to-r ${test.color} text-white hover:scale-105`
                    }`}
                  >
                    <span>
                      {test.status === 'completed' ? 'View All Tests' : 'View All Tests'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Test Features */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-8">
          <h3 className="text-3xl font-bold mb-8 text-center">Test Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckSquare className="w-8 h-8" />
              </div>
              <h4 className="font-bold mb-2">Multiple Choice</h4>
              <p className="text-green-100 text-sm">All questions are multiple choice for clear assessment</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8" />
              </div>
              <h4 className="font-bold mb-2">Instant Results</h4>
              <p className="text-green-100 text-sm">Get detailed feedback immediately after completion</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8" />
              </div>
              <h4 className="font-bold mb-2">24/7 Access</h4>
              <p className="text-green-100 text-sm">Take tests anytime from anywhere in the world</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Volume2 className="w-8 h-8" />
              </div>
              <h4 className="font-bold mb-2">Audio Support</h4>
              <p className="text-green-100 text-sm">High-quality audio for listening comprehension</p>
            </div>
          </div>
        </div>

        {/* Register for Kaishi Test */}
        <div className="mt-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Register for the Kaishi Test</h3>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Take the official Kaishi Japanese Test and earn your internationally recognized N5 certificate
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pricing */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">¥5,000</div>
                <p className="text-gray-600">One-time registration fee</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Official Kaishi Test Certificate</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Internationally recognized</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Digital certificate delivery</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Detailed score report</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Valid for 2 years</span>
                </div>
              </div>
              <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                Register Now - ¥5,000
              </button>
            </div>

            {/* Test Dates */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">Upcoming Test Dates</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg opacity-60">
                  <div>
                    <div className="font-semibold text-gray-500">January 2025</div>
                    <div className="text-sm text-gray-400">Second Sunday</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-500">Jan 12</div>
                    <div className="text-xs text-gray-400">Locked</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg opacity-60">
                  <div>
                    <div className="font-semibold text-gray-500">February 2025</div>
                    <div className="text-sm text-gray-400">Second Sunday</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-500">Feb 9</div>
                    <div className="text-xs text-gray-400">Locked</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg opacity-60">
                  <div>
                    <div className="font-semibold text-gray-500">March 2025</div>
                    <div className="text-sm text-gray-400">Second Sunday</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-500">Mar 9</div>
                    <div className="text-xs text-gray-400">Locked</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg opacity-60">
                  <div>
                    <div className="font-semibold text-gray-500">April 2025</div>
                    <div className="text-sm text-gray-400">Second Sunday</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-500">Apr 13</div>
                    <div className="text-xs text-gray-400">Locked</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg opacity-60">
                  <div>
                    <div className="font-semibold text-gray-500">May 2025</div>
                    <div className="text-sm text-gray-400">Second Sunday</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-500">May 11</div>
                    <div className="text-xs text-gray-400">Locked</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg opacity-60">
                  <div>
                    <div className="font-semibold text-gray-500">June 2025</div>
                    <div className="text-sm text-gray-400">Second Sunday</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-500">Jun 8</div>
                    <div className="text-xs text-gray-400">Locked</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                  <div>
                    <div className="font-semibold text-gray-900">July 2025</div>
                    <div className="text-sm text-gray-600">Second Sunday</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-orange-600">Jul 13</div>
                    <div className="text-xs text-orange-600">Register by Jul 11</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">August 2025</div>
                    <div className="text-sm text-gray-600">Second Sunday</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">Aug 10</div>
                    <div className="text-xs text-blue-600">Register by Aug 8</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">September 2025</div>
                    <div className="text-sm text-gray-600">Second Sunday</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">Sep 14</div>
                    <div className="text-xs text-green-600">Register by Sep 12</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">October 2025</div>
                    <div className="text-sm text-gray-600">Second Sunday</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-purple-600">Oct 12</div>
                    <div className="text-xs text-purple-600">Register by Oct 10</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">November 2025</div>
                    <div className="text-sm text-gray-600">Second Sunday</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-red-600">Nov 9</div>
                    <div className="text-xs text-red-600">Register by Nov 7</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">December 2025</div>
                    <div className="text-sm text-gray-600">Second Sunday</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-indigo-600">Dec 14</div>
                    <div className="text-xs text-indigo-600">Register by Dec 12</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800 text-center">
                  <strong>Note:</strong> Tests are held every month on the second Sunday. Registration opens one month before and closes 2 days before each test date.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Study Tips */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Study Tips for Success</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Review Before Testing</h4>
                  <p className="text-gray-600">Complete the corresponding lessons before taking each test</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Time Management</h4>
                  <p className="text-gray-600">Practice with time limits to build test-taking confidence</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Focus on Weak Areas</h4>
                  <p className="text-gray-600">Use test results to identify and improve weak points</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-600 font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Regular Practice</h4>
                  <p className="text-gray-600">Take tests regularly to track your progress over time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Test Your N5 Skills?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Start with any test category and track your progress toward JLPT N5 mastery
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={() => handleStartTest('vocabulary')}
              className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all duration-300 flex items-center space-x-2 group"
            >
              <Brain className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Start Vocabulary Test</span>
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

export default ComprehensiveTestingN5; 