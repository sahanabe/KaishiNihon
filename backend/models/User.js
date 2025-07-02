const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxLength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in queries by default
  },
  nationality: {
    type: String,
    trim: true
  },
  currentLocation: {
    type: String,
    trim: true
  },
  japaneseLevel: {
    type: String,
    enum: ['Beginner', 'N5', 'N4', 'N3', 'N2', 'N1', 'Native'],
    default: 'Beginner'
  },
  visaStatus: {
    type: String,
    enum: ['Planning', 'Applied', 'Approved', 'In Japan', 'Denied'],
    default: 'Planning'
  },
  profile: {
    dateOfBirth: Date,
    phoneNumber: String,
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String
    },
    education: [{
      institution: String,
      degree: String,
      field: String,
      graduationYear: Number,
      country: String
    }],
    workExperience: [{
      company: String,
      position: String,
      startDate: Date,
      endDate: Date,
      description: String
    }],
    languageSkills: [{
      language: String,
      level: String,
      certification: String
    }]
  },
  preferences: {
    preferredCity: String,
    visaType: String,
    careerField: String,
    studyGoals: String
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  lastLogin: Date,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Remove sensitive data when converting to JSON
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.emailVerificationToken;
  delete userObject.passwordResetToken;
  delete userObject.passwordResetExpires;
  return userObject;
};

module.exports = mongoose.model('User', userSchema); 