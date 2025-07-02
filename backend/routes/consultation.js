const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Mock consultation data
const lawyers = [
  {
    id: 'lawyer-1',
    name: 'Tanaka Hiroshi',
    specialization: ['Student Visa', 'Work Visa', 'SSW'],
    experience: '15 years',
    languages: ['Japanese', 'English', 'Korean'],
    location: 'Tokyo',
    rating: 4.8,
    consultationFee: '¥15,000/hour',
    contactInfo: {
      phone: '+81-3-1234-5678',
      email: 'tanaka@immigration-law.jp'
    }
  },
  {
    id: 'lawyer-2',
    name: 'Suzuki Yuki',
    specialization: ['Family Visa', 'Permanent Residence', 'Naturalization'],
    experience: '12 years',
    languages: ['Japanese', 'English', 'Chinese'],
    location: 'Osaka',
    rating: 4.9,
    consultationFee: '¥18,000/hour',
    contactInfo: {
      phone: '+81-6-2345-6789',
      email: 'suzuki@osaka-immigration.jp'
    }
  },
  {
    id: 'lawyer-3',
    name: 'Yamamoto Kenji',
    specialization: ['Business Visa', 'Investor Visa', 'Corporate Immigration'],
    experience: '20 years',
    languages: ['Japanese', 'English', 'Spanish'],
    location: 'Tokyo',
    rating: 4.7,
    consultationFee: '¥25,000/hour',
    contactInfo: {
      phone: '+81-3-3456-7890',
      email: 'yamamoto@business-visa.jp'
    }
  }
];

const consultations = [];
const consultationRequests = [];

// Configure nodemailer (mock configuration)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'kaishi.nihon@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Get all immigration lawyers
router.get('/lawyers', (req, res) => {
  const { specialization, location, language } = req.query;

  let filteredLawyers = lawyers;

  if (specialization) {
    filteredLawyers = filteredLawyers.filter(lawyer =>
      lawyer.specialization.some(spec => 
        spec.toLowerCase().includes(specialization.toLowerCase())
      )
    );
  }

  if (location) {
    filteredLawyers = filteredLawyers.filter(lawyer =>
      lawyer.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  if (language) {
    filteredLawyers = filteredLawyers.filter(lawyer =>
      lawyer.languages.some(lang => 
        lang.toLowerCase().includes(language.toLowerCase())
      )
    );
  }

  res.json({
    message: 'Immigration lawyers retrieved',
    lawyers: filteredLawyers,
    filters: { specialization, location, language }
  });
});

// Get specific lawyer details
router.get('/lawyers/:lawyerId', (req, res) => {
  const { lawyerId } = req.params;
  const lawyer = lawyers.find(l => l.id === lawyerId);

  if (!lawyer) {
    return res.status(404).json({ message: 'Lawyer not found' });
  }

  res.json({
    message: 'Lawyer details retrieved',
    lawyer
  });
});

// Book consultation appointment
router.post('/book', (req, res) => {
  try {
    const {
      userId,
      lawyerId,
      consultationType,
      preferredDate,
      preferredTime,
      duration,
      isUrgent,
      consultationMethod,
      clientInfo,
      caseDetails
    } = req.body;

    if (!userId || !lawyerId || !preferredDate) {
      return res.status(400).json({ message: 'Required booking information missing' });
    }

    const lawyer = lawyers.find(l => l.id === lawyerId);
    if (!lawyer) {
      return res.status(404).json({ message: 'Lawyer not found' });
    }

    const consultation = {
      id: Date.now().toString(),
      userId,
      lawyer,
      consultationType,
      preferredDate,
      preferredTime,
      duration: duration || '1 hour',
      isUrgent,
      consultationMethod: consultationMethod || 'online',
      clientInfo,
      caseDetails,
      status: 'pending',
      bookedAt: new Date().toISOString(),
      estimatedCost: lawyer.consultationFee
    };

    consultations.push(consultation);

    // Send confirmation email (mock)
    const emailContent = {
      to: clientInfo?.email,
      subject: 'Consultation Booking Confirmation - Kaishi Nihon',
      html: `
        <h2>Consultation Booking Confirmed</h2>
        <p>Dear ${clientInfo?.name},</p>
        <p>Your consultation with ${lawyer.name} has been booked.</p>
        <ul>
          <li><strong>Date:</strong> ${preferredDate}</li>
          <li><strong>Time:</strong> ${preferredTime}</li>
          <li><strong>Method:</strong> ${consultationMethod}</li>
          <li><strong>Fee:</strong> ${lawyer.consultationFee}</li>
        </ul>
        <p>We will contact you soon to confirm the appointment details.</p>
        <p>Best regards,<br>Kaishi Nihon Team</p>
      `
    };

    res.status(201).json({
      message: 'Consultation booked successfully',
      consultation: {
        id: consultation.id,
        lawyer: consultation.lawyer.name,
        preferredDate: consultation.preferredDate,
        preferredTime: consultation.preferredTime,
        status: consultation.status,
        estimatedCost: consultation.estimatedCost
      }
    });
  } catch (error) {
    console.error('Consultation booking error:', error);
    res.status(500).json({ message: 'Server error during booking' });
  }
});

// Free consultation request
router.post('/free-consultation', (req, res) => {
  try {
    const {
      userId,
      personalInfo,
      currentSituation,
      visaGoals,
      questions,
      urgencyLevel,
      preferredContactMethod
    } = req.body;

    if (!personalInfo || !currentSituation || !questions) {
      return res.status(400).json({ message: 'Required information missing' });
    }

    const request = {
      id: Date.now().toString(),
      userId,
      personalInfo,
      currentSituation,
      visaGoals,
      questions,
      urgencyLevel: urgencyLevel || 'normal',
      preferredContactMethod: preferredContactMethod || 'email',
      status: 'received',
      submittedAt: new Date().toISOString(),
      responseTime: urgencyLevel === 'urgent' ? '24 hours' : '48-72 hours'
    };

    consultationRequests.push(request);

    res.status(201).json({
      message: 'Free consultation request submitted successfully',
      request: {
        id: request.id,
        status: request.status,
        responseTime: request.responseTime,
        submittedAt: request.submittedAt
      }
    });
  } catch (error) {
    console.error('Free consultation request error:', error);
    res.status(500).json({ message: 'Server error during request submission' });
  }
});

// Get user's consultations
router.get('/user/:userId', (req, res) => {
  const { userId } = req.params;
  const userConsultations = consultations.filter(consultation => consultation.userId === userId);
  const userRequests = consultationRequests.filter(request => request.userId === userId);

  res.json({
    message: 'User consultations retrieved',
    consultations: userConsultations.map(consultation => ({
      id: consultation.id,
      lawyer: consultation.lawyer.name,
      type: consultation.consultationType,
      date: consultation.preferredDate,
      time: consultation.preferredTime,
      status: consultation.status,
      cost: consultation.estimatedCost
    })),
    requests: userRequests.map(request => ({
      id: request.id,
      status: request.status,
      submittedAt: request.submittedAt,
      responseTime: request.responseTime
    }))
  });
});

// Update consultation status
router.put('/consultations/:consultationId/status', (req, res) => {
  const { consultationId } = req.params;
  const { status, notes, actualDate, actualTime } = req.body;

  const consultationIndex = consultations.findIndex(consultation => consultation.id === consultationId);
  if (consultationIndex === -1) {
    return res.status(404).json({ message: 'Consultation not found' });
  }

  consultations[consultationIndex].status = status;
  consultations[consultationIndex].notes = notes;
  if (actualDate) consultations[consultationIndex].actualDate = actualDate;
  if (actualTime) consultations[consultationIndex].actualTime = actualTime;
  consultations[consultationIndex].updatedAt = new Date().toISOString();

  res.json({
    message: 'Consultation status updated',
    consultation: {
      id: consultations[consultationIndex].id,
      status: consultations[consultationIndex].status,
      notes: consultations[consultationIndex].notes,
      updatedAt: consultations[consultationIndex].updatedAt
    }
  });
});

// FAQ endpoint
router.get('/faq', (req, res) => {
  const faqs = [
    {
      category: 'General',
      question: 'How long does the visa application process take?',
      answer: 'The processing time varies by visa type: Student visa (4-6 weeks), Work visa (6-8 weeks), SSW (8-12 weeks). This includes document preparation and government processing.'
    },
    {
      category: 'Student Visa',
      question: 'Can I work part-time with a student visa?',
      answer: 'Yes, with proper permission from immigration. You can work up to 28 hours per week with a part-time work permit.'
    },
    {
      category: 'Language Requirements',
      question: 'Is N2 level required for all work visas?',
      answer: 'Not necessarily. While N2 is preferred for most professional positions, some technical roles may accept lower levels with strong technical skills.'
    },
    {
      category: 'Financial',
      question: 'How much money do I need to show for visa application?',
      answer: 'Generally 1.5-2 million yen in bank statements for student visa, and 6 months of living expenses for work visa. Requirements vary by visa type.'
    },
    {
      category: 'Documents',
      question: 'Do I need my documents translated?',
      answer: 'Yes, all foreign documents must be translated into Japanese by a certified translator and apostilled if from non-Hague convention countries.'
    }
  ];

  const { category } = req.query;
  let filteredFaqs = faqs;

  if (category) {
    filteredFaqs = faqs.filter(faq => 
      faq.category.toLowerCase() === category.toLowerCase()
    );
  }

  res.json({
    message: 'FAQ retrieved',
    faqs: filteredFaqs,
    categories: [...new Set(faqs.map(faq => faq.category))]
  });
});

// Document verification service
router.post('/document-check', (req, res) => {
  const { documents, visaType } = req.body;

  if (!documents || !Array.isArray(documents)) {
    return res.status(400).json({ message: 'Documents list required' });
  }

  const requiredDocs = {
    student: ['passport', 'coe', 'school_acceptance', 'financial_proof', 'academic_transcripts'],
    work: ['passport', 'coe', 'degree_certificate', 'employment_contract', 'jlpt_certificate'],
    ssw: ['passport', 'coe', 'skills_certificate', 'jlpt_or_jft', 'work_contract']
  };

  const required = requiredDocs[visaType] || [];
  const missing = required.filter(doc => !documents.includes(doc));
  const completionRate = ((required.length - missing.length) / required.length * 100).toFixed(1);

  res.json({
    message: 'Document verification completed',
    completionRate: `${completionRate}%`,
    missingDocuments: missing,
    requiredDocuments: required,
    submittedDocuments: documents
  });
});

module.exports = router; 