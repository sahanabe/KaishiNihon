import React from 'react';
import { Globe, Book, Award, Clock } from 'lucide-react';

const Language: React.FC = () => {
  return (
    <div className="page-container">
      <div className="section-container py-16">
        <div className="text-center mb-12">
          <Globe className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Japanese Language Learning</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master Japanese from N5 to N1 with our comprehensive learning platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="card text-center">
            <Book className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">JLPT Preparation</h3>
            <p className="text-gray-600">Comprehensive courses for all JLPT levels from N5 to N1</p>
          </div>
          
          <div className="card text-center">
            <Award className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Assessment Tools</h3>
            <p className="text-gray-600">Test your current level and track your progress</p>
          </div>
          
          <div className="card text-center">
            <Clock className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Study Plans</h3>
            <p className="text-gray-600">Personalized learning paths based on your goals</p>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-block bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 japanese-text">
              日本語を一緒に学びましょう！
            </h2>
            <p className="text-gray-600 mb-6">Let's learn Japanese together!</p>
            <button className="btn btn-primary">
              Start Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Language; 