const mongoose = require('mongoose');

const serviceBookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  serviceType: {
    type: String,
    required: true,
    enum: ['Airport Pickup', 'Accommodation', 'Flight Booking', 'JR Pass', 'IC Card', 'Emergency Support', 'Translation', 'Document Assistance']
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled', 'Refunded'],
    default: 'Pending'
  },
  bookingDetails: {
    // Airport Pickup
    airportPickup: {
      airport: String,
      flightNumber: String,
      arrivalDate: Date,
      arrivalTime: String,
      destination: String,
      passengers: Number,
      luggage: String,
      specialRequests: String
    },
    
    // Accommodation
    accommodation: {
      type: String, // 'Share House', 'Apartment', 'Dormitory', 'Hotel'
      checkInDate: Date,
      checkOutDate: Date,
      location: String,
      numberOfGuests: Number,
      budget: {
        min: Number,
        max: Number,
        currency: String
      },
      preferences: {
        furnishing: String,
        utilities: [String],
        amenities: [String],
        roomType: String
      }
    },
    
    // Flight Booking
    flight: {
      from: String,
      to: String,
      departureDate: Date,
      returnDate: Date,
      passengers: Number,
      class: String,
      preferences: String
    },
    
    // JR Pass
    jrPass: {
      type: String, // '7-day', '14-day', '21-day'
      startDate: Date,
      deliveryAddress: String,
      quantity: Number
    },
    
    // IC Card
    icCard: {
      type: String, // 'Suica', 'Pasmo'
      amount: Number,
      deliveryMethod: String
    },
    
    // Emergency Support
    emergency: {
      type: String,
      description: String,
      urgency: String,
      location: String,
      contactNumber: String
    }
  },
  customerInfo: {
    name: String,
    email: String,
    phone: String,
    nationality: String,
    passportNumber: String,
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String
    }
  },
  pricing: {
    basePrice: Number,
    additionalFees: [{
      name: String,
      amount: Number,
      description: String
    }],
    discount: {
      amount: Number,
      reason: String
    },
    totalAmount: Number,
    currency: {
      type: String,
      default: 'JPY'
    }
  },
  payment: {
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed', 'Refunded', 'Partially Paid'],
      default: 'Pending'
    },
    method: String,
    transactionId: String,
    paidAmount: Number,
    paymentDate: Date,
    dueDate: Date
  },
  provider: {
    name: String,
    contactInfo: {
      phone: String,
      email: String
    },
    assignedStaff: String
  },
  timeline: [{
    event: String,
    date: Date,
    status: String,
    notes: String
  }],
  documents: [{
    name: String,
    type: String,
    url: String,
    uploadDate: Date,
    isRequired: Boolean
  }],
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    serviceQuality: Number,
    communication: Number,
    valueForMoney: Number,
    wouldRecommend: Boolean,
    submittedAt: Date
  },
  notes: String,
  internalNotes: String
}, {
  timestamps: true
});

// Index for efficient queries
serviceBookingSchema.index({ userId: 1, createdAt: -1 });
serviceBookingSchema.index({ serviceType: 1, status: 1 });
serviceBookingSchema.index({ status: 1, createdAt: -1 });

// Method to calculate total cost
serviceBookingSchema.methods.calculateTotal = function() {
  let total = this.pricing.basePrice || 0;
  
  if (this.pricing.additionalFees) {
    total += this.pricing.additionalFees.reduce((sum, fee) => sum + (fee.amount || 0), 0);
  }
  
  if (this.pricing.discount) {
    total -= this.pricing.discount.amount || 0;
  }
  
  return Math.max(0, total);
};

// Method to check if service is active
serviceBookingSchema.methods.isActive = function() {
  return ['Pending', 'Confirmed', 'In Progress'].includes(this.status);
};

module.exports = mongoose.model('ServiceBooking', serviceBookingSchema); 