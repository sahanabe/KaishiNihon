const express = require('express');
const router = express.Router();

// Mock language data
const languageLevels = [
  {
    level: 'N5',
    name: 'Basic Level',
    description: 'Can understand basic Japanese used in everyday situations',
    kanji: '100 kanji characters',
    vocabulary: '800 words',
    grammar: 'Basic sentence patterns',
    studyTime: '150-300 hours',
    canApplyFor: ['Student Visa (Language School)']
  },
  {
    level: 'N4',
    name: 'Elementary Level',
    description: 'Can understand basic Japanese used in everyday situations and some simple texts',
    kanji: '300 kanji characters',
    vocabulary: '1,500 words',
    grammar: 'Basic grammar and sentence structures',
    studyTime: '300-600 hours',
    canApplyFor: ['Student Visa (Language School)', 'SSW Visa']
  },
  {
    level: 'N3',
    name: 'Intermediate Level',
    description: 'Can understand Japanese used in everyday situations to a certain degree',
    kanji: '650 kanji characters',
    vocabulary: '3,700 words',
    grammar: 'Intermediate grammar patterns',
    studyTime: '450-900 hours',
    canApplyFor: ['Better job opportunities', 'University applications']
  },
  {
    level: 'N2',
    name: 'Upper Intermediate',
    description: 'Can understand Japanese used in everyday situations and in a variety of circumstances',
    kanji: '1,000 kanji characters',
    vocabulary: '6,000 words',
    grammar: 'Advanced grammar structures',
    studyTime: '600-1,200 hours',
    canApplyFor: ['Senmon Gakkou', 'Professional Jobs', 'University']
  },
  {
    level: 'N1',
    name: 'Advanced Level',
    description: 'Can understand Japanese used in a variety of circumstances',
    kanji: '2,000+ kanji characters',
    vocabulary: '10,000+ words',
    grammar: 'Complex grammar and expressions',
    studyTime: '900-1,800 hours',
    canApplyFor: ['All visa types', 'Professional careers', 'Graduate studies']
  }
];

const studyResources = [
  {
    type: 'textbook',
    name: 'Genki Series',
    levels: ['N5', 'N4'],
    description: 'Comprehensive Japanese textbook series for beginners',
    price: 'Paid'
  },
  {
    type: 'app',
    name: 'Duolingo',
    levels: ['N5', 'N4'],
    description: 'Free language learning app with gamified lessons',
    price: 'Free/Premium'
  },
  {
    type: 'website',
    name: 'WaniKani',
    levels: ['N5', 'N4', 'N3', 'N2', 'N1'],
    description: 'Kanji and vocabulary learning system',
    price: 'Subscription'
  },
  {
    type: 'textbook',
    name: 'Tobira',
    levels: ['N3', 'N2'],
    description: 'Gateway to advanced Japanese learning',
    price: 'Paid'
  },
  {
    type: 'website',
    name: 'Bunpro',
    levels: ['N5', 'N4', 'N3', 'N2', 'N1'],
    description: 'Japanese grammar learning platform',
    price: 'Subscription'
  }
];

const languageSchools = [
  {
    name: 'Tokyo International Language School',
    location: 'Tokyo',
    programs: ['General Japanese', 'JLPT Preparation', 'Business Japanese'],
    levels: ['Beginner to Advanced'],
    duration: '3 months to 2 years',
    tuition: '¥600,000 - ¥800,000 per year'
  },
  {
    name: 'Osaka Japanese Language Academy',
    location: 'Osaka',
    programs: ['Intensive Japanese', 'University Preparation'],
    levels: ['N5 to N1'],
    duration: '6 months to 18 months',
    tuition: '¥550,000 - ¥750,000 per year'
  },
  {
    name: 'Kyoto Institute of Culture and Language',
    location: 'Kyoto',
    programs: ['Cultural Japanese', 'Traditional Arts'],
    levels: ['Beginner to Intermediate'],
    duration: '1 year to 2 years',
    tuition: '¥650,000 - ¥850,000 per year'
  }
];

// Get all JLPT levels
router.get('/levels', (req, res) => {
  res.json({
    message: 'Japanese language levels retrieved',
    levels: languageLevels
  });
});

// Get specific level details
router.get('/levels/:level', (req, res) => {
  const { level } = req.params;
  const levelData = languageLevels.find(l => l.level.toLowerCase() === level.toLowerCase());

  if (!levelData) {
    return res.status(404).json({ message: 'Language level not found' });
  }

  res.json({
    message: 'Language level details retrieved',
    level: levelData
  });
});

// Get study resources
router.get('/resources', (req, res) => {
  const { level, type } = req.query;

  let filteredResources = studyResources;

  if (level) {
    filteredResources = filteredResources.filter(resource => 
      resource.levels.includes(level.toUpperCase())
    );
  }

  if (type) {
    filteredResources = filteredResources.filter(resource => 
      resource.type === type.toLowerCase()
    );
  }

  res.json({
    message: 'Study resources retrieved',
    resources: filteredResources,
    filters: { level, type }
  });
});

// Get language schools
router.get('/schools', (req, res) => {
  const { location } = req.query;

  let filteredSchools = languageSchools;

  if (location) {
    filteredSchools = filteredSchools.filter(school => 
      school.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  res.json({
    message: 'Language schools retrieved',
    schools: filteredSchools,
    filters: { location }
  });
});

// Submit language school application
router.post('/schools/apply', (req, res) => {
  try {
    const {
      userId,
      schoolName,
      program,
      startDate,
      duration,
      currentLevel,
      targetLevel,
      personalInfo
    } = req.body;

    if (!userId || !schoolName || !program) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const application = {
      id: Date.now().toString(),
      userId,
      schoolName,
      program,
      startDate,
      duration,
      currentLevel,
      targetLevel,
      personalInfo,
      status: 'submitted',
      submittedAt: new Date().toISOString()
    };

    res.status(201).json({
      message: 'Language school application submitted successfully',
      application: {
        id: application.id,
        schoolName: application.schoolName,
        program: application.program,
        status: application.status,
        submittedAt: application.submittedAt
      }
    });
  } catch (error) {
    console.error('Language school application error:', error);
    res.status(500).json({ message: 'Server error during application' });
  }
});

// Assessment test (mock)
router.post('/assessment', (req, res) => {
  const { answers } = req.body;

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ message: 'Answers array required' });
  }

  // Mock assessment logic
  const score = Math.floor(Math.random() * 100);
  let estimatedLevel;

  if (score >= 90) estimatedLevel = 'N2-N1';
  else if (score >= 75) estimatedLevel = 'N3';
  else if (score >= 60) estimatedLevel = 'N4';
  else if (score >= 40) estimatedLevel = 'N5';
  else estimatedLevel = 'Beginner';

  res.json({
    message: 'Assessment completed',
    score,
    estimatedLevel,
    recommendations: languageLevels.filter(level => 
      level.level === estimatedLevel || estimatedLevel.includes(level.level)
    )
  });
});

// Study plan generator
router.post('/study-plan', (req, res) => {
  const { currentLevel, targetLevel, timeAvailable, studyStyle } = req.body;

  if (!currentLevel || !targetLevel) {
    return res.status(400).json({ message: 'Current and target levels required' });
  }

  const studyPlan = {
    duration: '6-12 months',
    weeklyHours: timeAvailable || '10-15 hours',
    phases: [
      {
        phase: 1,
        duration: '2-3 months',
        focus: 'Vocabulary and basic grammar',
        resources: ['Genki textbooks', 'Anki flashcards', 'WaniKani']
      },
      {
        phase: 2,
        duration: '2-3 months',
        focus: 'Reading comprehension and listening',
        resources: ['News articles', 'Anime with subtitles', 'Podcast listening']
      },
      {
        phase: 3,
        duration: '2-3 months',
        focus: 'JLPT preparation and practice tests',
        resources: ['Past JLPT papers', 'Mock tests', 'Speaking practice']
      }
    ]
  };

  res.json({
    message: 'Personalized study plan generated',
    studyPlan,
    userGoals: { currentLevel, targetLevel, timeAvailable, studyStyle }
  });
});

module.exports = router; 