const mongoose = require('mongoose');

const languageAssessmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assessmentType: {
    type: String,
    required: true,
    enum: ['Initial Assessment', 'JLPT Practice', 'Progress Test', 'Mock Exam', 'Final Assessment']
  },
  level: {
    type: String,
    enum: ['N5', 'N4', 'N3', 'N2', 'N1'],
    required: true
  },
  results: {
    overallScore: {
      type: Number,
      min: 0,
      max: 100
    },
    sections: {
      vocabulary: {
        score: Number,
        maxScore: Number,
        percentage: Number
      },
      grammar: {
        score: Number,
        maxScore: Number,
        percentage: Number
      },
      reading: {
        score: Number,
        maxScore: Number,
        percentage: Number
      },
      listening: {
        score: Number,
        maxScore: Number,
        percentage: Number
      },
      kanji: {
        score: Number,
        maxScore: Number,
        percentage: Number
      }
    },
    timeSpent: Number, // in minutes
    isPassed: Boolean,
    passingScore: Number
  },
  strengths: [String],
  weaknesses: [String],
  recommendations: [String],
  studyPlan: {
    recommendedLevel: String,
    studyHours: Number,
    focusAreas: [String],
    resources: [{
      name: String,
      type: String, // 'book', 'app', 'course', 'video'
      url: String,
      description: String
    }],
    timeline: {
      shortTerm: String, // 1-3 months
      mediumTerm: String, // 3-6 months
      longTerm: String // 6+ months
    }
  },
  nextAssessmentDate: Date,
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: Date,
  notes: String
}, {
  timestamps: true
});

// Index for efficient queries
languageAssessmentSchema.index({ userId: 1, createdAt: -1 });
languageAssessmentSchema.index({ level: 1, assessmentType: 1 });

// Method to calculate overall progress
languageAssessmentSchema.methods.calculateProgress = function() {
  const sections = this.results.sections;
  const sectionNames = Object.keys(sections);
  
  if (sectionNames.length === 0) return 0;
  
  const totalPercentage = sectionNames.reduce((sum, section) => {
    return sum + (sections[section].percentage || 0);
  }, 0);
  
  return Math.round(totalPercentage / sectionNames.length);
};

module.exports = mongoose.model('LanguageAssessment', languageAssessmentSchema); 