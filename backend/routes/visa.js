const express = require('express');
const router = express.Router();

// Mock visa data
const visaTypes = [
  {
    id: 'student',
    name: 'Student Visa',
    requirements: ['N5 or N4 Japanese level', 'Acceptance letter from Japanese Language School'],
    description: 'For students wanting to study Japanese language or attend educational institutions',
    duration: '6 months to 2 years',
    workPermit: 'Part-time (28 hours/week) with permission'
  },
  {
    id: 'ssw',
    name: 'Specified Skilled Worker (SSW)',
    requirements: ['N4 Japanese level or JFT', 'Skills test in specific industry'],
    description: 'For skilled workers in designated industries',
    duration: 'Up to 5 years',
    workPermit: 'Full-time in designated field'
  },
  {
    id: 'senmon',
    name: 'Senmon Gakkou (Specialized School)',
    requirements: ['N2 Japanese level', 'High school diploma or equivalent'],
    description: 'For attending specialized professional schools',
    duration: '1-3 years',
    workPermit: 'Part-time (28 hours/week) with permission'
  },
  {
    id: 'work',
    name: 'Work Visa (Engineer/Specialist)',
    requirements: ['N2 Japanese level', 'University degree', 'Job offer from Japanese company'],
    description: 'For professionals with university degrees working in Japan',
    duration: '1-5 years (renewable)',
    workPermit: 'Full-time in field of expertise'
  }
];

const visaApplications = [];

// Get all visa types
router.get('/types', (req, res) => {
  res.json({
    message: 'Visa types retrieved successfully',
    visaTypes
  });
});

// Get visa recommendations based on user profile
router.get('/recommendations', (req, res) => {
  const { japaneseLevel, education, workExperience, purpose } = req.query;

  let recommendations = [];

  if (japaneseLevel === 'N5' || japaneseLevel === 'N4') {
    recommendations.push(visaTypes.find(v => v.id === 'student'));
    if (japaneseLevel === 'N4') {
      recommendations.push(visaTypes.find(v => v.id === 'ssw'));
    }
  }

  if (japaneseLevel === 'N2' || japaneseLevel === 'N1') {
    recommendations.push(visaTypes.find(v => v.id === 'senmon'));
    if (education === 'university') {
      recommendations.push(visaTypes.find(v => v.id === 'work'));
    }
  }

  res.json({
    message: 'Visa recommendations generated',
    recommendations: recommendations.filter(Boolean),
    userProfile: { japaneseLevel, education, workExperience, purpose }
  });
});

// Submit visa application
router.post('/apply', (req, res) => {
  try {
    const {
      userId,
      visaType,
      personalInfo,
      documents,
      purpose,
      financialInfo,
      educationInfo,
      workExperience
    } = req.body;

    if (!userId || !visaType || !personalInfo) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const application = {
      id: Date.now().toString(),
      userId,
      visaType,
      personalInfo,
      documents: documents || [],
      purpose,
      financialInfo,
      educationInfo,
      workExperience,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      estimatedProcessingTime: '2-4 weeks'
    };

    visaApplications.push(application);

    res.status(201).json({
      message: 'Visa application submitted successfully',
      application: {
        id: application.id,
        visaType: application.visaType,
        status: application.status,
        submittedAt: application.submittedAt,
        estimatedProcessingTime: application.estimatedProcessingTime
      }
    });
  } catch (error) {
    console.error('Visa application error:', error);
    res.status(500).json({ message: 'Server error during visa application' });
  }
});

// Get user's visa applications
router.get('/applications/:userId', (req, res) => {
  const { userId } = req.params;
  const userApplications = visaApplications.filter(app => app.userId === userId);

  res.json({
    message: 'User visa applications retrieved',
    applications: userApplications.map(app => ({
      id: app.id,
      visaType: app.visaType,
      status: app.status,
      submittedAt: app.submittedAt,
      estimatedProcessingTime: app.estimatedProcessingTime
    }))
  });
});

// Update visa application status
router.put('/applications/:applicationId/status', (req, res) => {
  const { applicationId } = req.params;
  const { status, notes } = req.body;

  const applicationIndex = visaApplications.findIndex(app => app.id === applicationId);
  if (applicationIndex === -1) {
    return res.status(404).json({ message: 'Application not found' });
  }

  visaApplications[applicationIndex].status = status;
  visaApplications[applicationIndex].notes = notes;
  visaApplications[applicationIndex].updatedAt = new Date().toISOString();

  res.json({
    message: 'Application status updated',
    application: {
      id: visaApplications[applicationIndex].id,
      status: visaApplications[applicationIndex].status,
      notes: visaApplications[applicationIndex].notes,
      updatedAt: visaApplications[applicationIndex].updatedAt
    }
  });
});

// Get visa requirements checklist
router.get('/requirements/:visaType', (req, res) => {
  const { visaType } = req.params;
  const visa = visaTypes.find(v => v.id === visaType);

  if (!visa) {
    return res.status(404).json({ message: 'Visa type not found' });
  }

  const detailedRequirements = {
    student: [
      'Valid passport',
      'Certificate of Eligibility (COE)',
      'Acceptance letter from Japanese Language School',
      'Proof of financial support (bank statements)',
      'Academic transcripts',
      'Japanese language proficiency certificate (N5 or N4)',
      'Health certificate',
      'Passport-sized photos'
    ],
    ssw: [
      'Valid passport',
      'Certificate of Eligibility (COE)',
      'Skills test certificate',
      'Japanese language proficiency (N4 or JFT)',
      'Work contract from Japanese employer',
      'Health certificate',
      'Criminal background check',
      'Passport-sized photos'
    ],
    senmon: [
      'Valid passport',
      'Certificate of Eligibility (COE)',
      'Acceptance letter from specialized school',
      'High school diploma or equivalent',
      'Japanese language proficiency certificate (N2)',
      'Proof of financial support',
      'Academic transcripts',
      'Health certificate'
    ],
    work: [
      'Valid passport',
      'Certificate of Eligibility (COE)',
      'University degree certificate',
      'Employment contract',
      'Japanese language proficiency certificate (N2)',
      'Company registration documents',
      'Tax certificates',
      'Health certificate'
    ]
  };

  res.json({
    message: 'Visa requirements retrieved',
    visaType: visa,
    requirements: detailedRequirements[visaType] || visa.requirements
  });
});

module.exports = router; 