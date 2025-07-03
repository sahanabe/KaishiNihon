const mongoose = require('mongoose');

const visaApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  visaType: {
    type: String,
    required: true,
    enum: ['Student', 'Work', 'SSW', 'Senmon', 'Family', 'Business', 'Tourist', 'Working Holiday']
  },
  status: {
    type: String,
    enum: ['Draft', 'Submitted', 'Under Review', 'Additional Documents Required', 'Approved', 'Denied'],
    default: 'Draft'
  },
  applicationDetails: {
    purposeOfStay: String,
    intendedStayDuration: String,
    plannedEntryDate: Date,
    plannedDepartureDate: Date,
    financialSupport: {
      type: String,
      enum: ['Self-funded', 'Sponsor', 'Scholarship', 'Company']
    },
    accommodation: {
      type: String,
      address: String,
      contactPerson: String
    }
  },
  documents: [{
    name: String,
    type: String,
    status: {
      type: String,
      enum: ['Required', 'Submitted', 'Approved', 'Rejected'],
      default: 'Required'
    },
    uploadDate: Date,
    fileUrl: String,
    notes: String
  }],
  requirements: [{
    category: String,
    description: String,
    isCompleted: {
      type: Boolean,
      default: false
    },
    completedDate: Date,
    notes: String
  }],
  timeline: [{
    event: String,
    date: Date,
    status: String,
    notes: String
  }],
  sponsorInformation: {
    name: String,
    relationship: String,
    address: String,
    income: Number,
    occupation: String,
    documents: [String]
  },
  educationDetails: {
    institution: String,
    program: String,
    duration: String,
    startDate: Date,
    tuitionFee: Number,
    admissionStatus: String
  },
  employmentDetails: {
    company: String,
    position: String,
    salary: Number,
    contractType: String,
    startDate: Date,
    jobDescription: String
  },
  submissionDate: Date,
  reviewDate: Date,
  decisionDate: Date,
  applicationFee: {
    amount: Number,
    currency: String,
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed'],
      default: 'Pending'
    },
    paymentDate: Date
  },
  notes: String,
  assignedOfficer: String
}, {
  timestamps: true
});

// Index for efficient queries
visaApplicationSchema.index({ userId: 1, status: 1 });
visaApplicationSchema.index({ visaType: 1, status: 1 });

module.exports = mongoose.model('VisaApplication', visaApplicationSchema); 