const express = require('express');
const router = express.Router();

// Mock service data
const services = {
  airportPickup: [
    {
      id: 'narita-standard',
      airport: 'Narita (NRT)',
      type: 'Standard Car',
      capacity: '3 passengers + luggage',
      price: '¥15,000',
      duration: '60-90 minutes to Tokyo'
    },
    {
      id: 'narita-premium',
      airport: 'Narita (NRT)',
      type: 'Premium Car',
      capacity: '3 passengers + luggage',
      price: '¥25,000',
      duration: '60-90 minutes to Tokyo'
    },
    {
      id: 'haneda-standard',
      airport: 'Haneda (HND)',
      type: 'Standard Car',
      capacity: '3 passengers + luggage',
      price: '¥10,000',
      duration: '30-45 minutes to Tokyo'
    },
    {
      id: 'haneda-premium',
      airport: 'Haneda (HND)',
      type: 'Premium Car',
      capacity: '3 passengers + luggage',
      price: '¥18,000',
      duration: '30-45 minutes to Tokyo'
    }
  ],
  accommodation: [
    {
      id: 'share-house-tokyo',
      type: 'Share House',
      location: 'Tokyo',
      price: '¥50,000 - ¥80,000/month',
      features: ['Furnished', 'Utilities included', 'International community'],
      description: 'Affordable shared living with other international residents'
    },
    {
      id: 'apartment-tokyo',
      type: 'Private Apartment',
      location: 'Tokyo',
      price: '¥80,000 - ¥150,000/month',
      features: ['Fully furnished', 'Kitchen', 'Private bathroom'],
      description: 'Independent living in your own apartment'
    },
    {
      id: 'student-dorm',
      type: 'Student Dormitory',
      location: 'Various cities',
      price: '¥40,000 - ¥70,000/month',
      features: ['Near schools', 'Study areas', 'Student community'],
      description: 'Accommodation specifically for students'
    },
    {
      id: 'hotel-weekly',
      type: 'Weekly Hotel',
      location: 'Major cities',
      price: '¥5,000 - ¥12,000/night',
      features: ['Daily cleaning', 'Front desk service', 'Central location'],
      description: 'Temporary accommodation while searching for permanent housing'
    }
  ],
  ticketing: [
    {
      type: 'Flight Booking',
      description: 'International and domestic flight reservations',
      features: ['Best price guarantee', 'Flexible dates', '24/7 support'],
      commission: '3-5% of ticket price'
    },
    {
      type: 'JR Pass',
      description: 'Japan Rail Pass for unlimited train travel',
      options: ['7 days: ¥29,650', '14 days: ¥47,250', '21 days: ¥60,450'],
      features: ['Nationwide coverage', 'Reserved seats', 'Easy exchange']
    },
    {
      type: 'IC Card Setup',
      description: 'Transportation cards for trains and buses',
      options: ['Suica', 'Pasmo', 'Icoca'],
      features: ['Contactless payment', 'Works nationwide', 'Rechargeable']
    }
  ]
};

const serviceBookings = [];

// Get all services
router.get('/', (req, res) => {
  res.json({
    message: 'All services retrieved',
    services
  });
});

// Get airport pickup services
router.get('/airport-pickup', (req, res) => {
  const { airport } = req.query;

  let pickupServices = services.airportPickup;

  if (airport) {
    pickupServices = pickupServices.filter(service => 
      service.airport.toLowerCase().includes(airport.toLowerCase())
    );
  }

  res.json({
    message: 'Airport pickup services retrieved',
    services: pickupServices,
    filters: { airport }
  });
});

// Book airport pickup
router.post('/airport-pickup/book', (req, res) => {
  try {
    const {
      userId,
      serviceId,
      flightDetails,
      passengerInfo,
      destination,
      specialRequests
    } = req.body;

    if (!userId || !serviceId || !flightDetails) {
      return res.status(400).json({ message: 'Required booking information missing' });
    }

    const service = services.airportPickup.find(s => s.id === serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const booking = {
      id: Date.now().toString(),
      type: 'airport-pickup',
      userId,
      service,
      flightDetails,
      passengerInfo,
      destination,
      specialRequests,
      status: 'confirmed',
      bookedAt: new Date().toISOString(),
      totalPrice: service.price
    };

    serviceBookings.push(booking);

    res.status(201).json({
      message: 'Airport pickup booked successfully',
      booking: {
        id: booking.id,
        service: booking.service,
        status: booking.status,
        totalPrice: booking.totalPrice,
        bookedAt: booking.bookedAt
      }
    });
  } catch (error) {
    console.error('Airport pickup booking error:', error);
    res.status(500).json({ message: 'Server error during booking' });
  }
});

// Get accommodation options
router.get('/accommodation', (req, res) => {
  const { type, location, maxPrice } = req.query;

  let accommodations = services.accommodation;

  if (type) {
    accommodations = accommodations.filter(acc => 
      acc.type.toLowerCase().includes(type.toLowerCase())
    );
  }

  if (location) {
    accommodations = accommodations.filter(acc => 
      acc.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  res.json({
    message: 'Accommodation options retrieved',
    accommodations,
    filters: { type, location, maxPrice }
  });
});

// Request accommodation assistance
router.post('/accommodation/request', (req, res) => {
  try {
    const {
      userId,
      accommodationType,
      location,
      budget,
      moveInDate,
      duration,
      preferences,
      personalInfo
    } = req.body;

    if (!userId || !accommodationType || !location) {
      return res.status(400).json({ message: 'Required information missing' });
    }

    const request = {
      id: Date.now().toString(),
      type: 'accommodation-request',
      userId,
      accommodationType,
      location,
      budget,
      moveInDate,
      duration,
      preferences,
      personalInfo,
      status: 'processing',
      requestedAt: new Date().toISOString()
    };

    serviceBookings.push(request);

    res.status(201).json({
      message: 'Accommodation request submitted successfully',
      request: {
        id: request.id,
        accommodationType: request.accommodationType,
        location: request.location,
        status: request.status,
        requestedAt: request.requestedAt
      }
    });
  } catch (error) {
    console.error('Accommodation request error:', error);
    res.status(500).json({ message: 'Server error during request' });
  }
});

// Get ticketing services
router.get('/ticketing', (req, res) => {
  res.json({
    message: 'Ticketing services retrieved',
    services: services.ticketing
  });
});

// Book ticketing service
router.post('/ticketing/book', (req, res) => {
  try {
    const {
      userId,
      ticketType,
      travelDetails,
      passengerInfo,
      preferences
    } = req.body;

    if (!userId || !ticketType || !travelDetails) {
      return res.status(400).json({ message: 'Required booking information missing' });
    }

    const booking = {
      id: Date.now().toString(),
      type: 'ticketing',
      userId,
      ticketType,
      travelDetails,
      passengerInfo,
      preferences,
      status: 'processing',
      bookedAt: new Date().toISOString()
    };

    serviceBookings.push(booking);

    res.status(201).json({
      message: 'Ticket booking request submitted successfully',
      booking: {
        id: booking.id,
        ticketType: booking.ticketType,
        status: booking.status,
        bookedAt: booking.bookedAt
      }
    });
  } catch (error) {
    console.error('Ticket booking error:', error);
    res.status(500).json({ message: 'Server error during booking' });
  }
});

// Get user's service bookings
router.get('/bookings/:userId', (req, res) => {
  const { userId } = req.params;
  const userBookings = serviceBookings.filter(booking => booking.userId === userId);

  res.json({
    message: 'User service bookings retrieved',
    bookings: userBookings.map(booking => ({
      id: booking.id,
      type: booking.type,
      status: booking.status,
      bookedAt: booking.bookedAt,
      details: booking.service || booking.accommodationType || booking.ticketType
    }))
  });
});

// Update booking status
router.put('/bookings/:bookingId/status', (req, res) => {
  const { bookingId } = req.params;
  const { status, notes } = req.body;

  const bookingIndex = serviceBookings.findIndex(booking => booking.id === bookingId);
  if (bookingIndex === -1) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  serviceBookings[bookingIndex].status = status;
  serviceBookings[bookingIndex].notes = notes;
  serviceBookings[bookingIndex].updatedAt = new Date().toISOString();

  res.json({
    message: 'Booking status updated',
    booking: {
      id: serviceBookings[bookingIndex].id,
      status: serviceBookings[bookingIndex].status,
      notes: serviceBookings[bookingIndex].notes,
      updatedAt: serviceBookings[bookingIndex].updatedAt
    }
  });
});

// Emergency contact service
router.post('/emergency-contact', (req, res) => {
  const { userId, emergencyType, message, contactInfo } = req.body;

  const emergencyRequest = {
    id: Date.now().toString(),
    userId,
    emergencyType,
    message,
    contactInfo,
    status: 'urgent',
    reportedAt: new Date().toISOString()
  };

  // In a real application, this would trigger immediate notifications
  console.log('EMERGENCY REQUEST:', emergencyRequest);

  res.json({
    message: 'Emergency contact request received. We will contact you immediately.',
    requestId: emergencyRequest.id,
    emergencyHotline: '+81-3-1234-5678'
  });
});

module.exports = router; 