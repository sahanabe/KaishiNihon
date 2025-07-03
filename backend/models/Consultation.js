const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lawyerId: {
    type: String,
    required: true
  },
  lawyerInfo: {
    name: String,
    specialization: [String],
    languages: [String],
    location: String,
    contactInfo: {
      phone: String,
      email: String
    }
  },
  consultationType: {
    type: String,
    enum: ['Free Initial', 'Standard', 'Premium', 'Emergency'],
    required: true
  },
  appointmentDetails: {
    preferredDate: Date,
    preferredTime: String,
    confirmedDate: Date,
    confirmedTime: String,
    duration: {
      type: Number,
      default: 60 // minutes
    },
    method: {
      type: String,
      enum: ['Online', 'In-person', 'Phone'],
      default: 'Online'
    },
    meetingLink: String,
    location: String
  },
  clientInfo: {
    name: String,
    email: String,
    phone: String,
    nationality: String,
    currentLocation: String,
    preferredLanguage: String
  },
  caseDetails: {
    visaType: String,
    currentStatus: String,
    urgency: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Emergency'],
      default: 'Medium'
    },
    description: String,
    previousApplications: Boolean,
    hasLegalIssues: Boolean,
    documentsAvailable: [String],
    specificQuestions: [String]
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Rescheduled', 'Completed', 'Cancelled', 'No-show'],
    default: 'Pending'
  },
  payment: {
    amount: Number,
    currency: {
      type: String,
      default: 'JPY'
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
      default: 'Pending'
    },
    paymentMethod: String,
    transactionId: String,
    paymentDate: Date
  },
  consultation: {
    startTime: Date,
    endTime: Date,
    actualDuration: Number,
    summary: String,
    recommendations: [String],
    nextSteps: [String],
    followUpRequired: Boolean,
    followUpDate: Date,
    documents: [{
      name: String,
      type: String,
      url: String,
      uploadDate: Date
    }]
  },
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    wouldRecommend: Boolean,
    submittedAt: Date
  },
  notes: String,
  internalNotes: String // Only visible to lawyers/admin
}, {
  timestamps: true
});

// Index for efficient queries
consultationSchema.index({ userId: 1, createdAt: -1 });
consultationSchema.index({ lawyerId: 1, 'appointmentDetails.confirmedDate': 1 });
consultationSchema.index({ status: 1, 'appointmentDetails.confirmedDate': 1 });

// Method to check if consultation is upcoming
consultationSchema.methods.isUpcoming = function() {
  const now = new Date();
  const appointmentDate = this.appointmentDetails.confirmedDate;
  return appointmentDate && appointmentDate > now && this.status === 'Confirmed';
};

// Method to calculate total cost
consultationSchema.methods.calculateCost = function() {
  const baseRates = {
    'Free Initial': 0,
    'Standard': 15000,
    'Premium': 25000,
    'Emergency': 35000
  };
  
  const baseRate = baseRates[this.consultationType] || 0;
  const duration = this.appointmentDetails.duration || 60;
  const hourlyRate = baseRate;
  
  return Math.round((duration / 60) * hourlyRate);
};

module.exports = mongoose.model('Consultation', consultationSchema); 