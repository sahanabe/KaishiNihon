const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'kaishi-nihon-secret-key';

// Simple in-memory user store (for testing only)
const users = [];

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, nationality, currentLocation } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.email === email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Email already registered'
      });
    }

    // Create new user
    const userId = Date.now().toString(); // Simple ID generation
    const user = {
      id: userId,
      name,
      email: email.toLowerCase(),
      password, // In production, this should be hashed
      nationality,
      currentLocation,
      japaneseLevel: 'beginner',
      visaStatus: 'planning',
      isActive: true,
      createdAt: new Date()
    };

    users.push(user);

    // Generate token
    const token = generateToken(userId);

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          nationality: user.nationality,
          currentLocation: user.currentLocation,
          japaneseLevel: user.japaneseLevel,
          visaStatus: user.visaStatus
        },
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error during registration'
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('🔐 Login attempt:', { 
      email, 
      password: password ? '***' : 'missing',
      totalUsers: users.length,
      userEmails: users.map(u => u.email)
    });

    if (!email || !password) {
      console.log('❌ Login failed: Missing credentials');
      return res.status(400).json({
        status: 'error',
        message: 'Email and password are required'
      });
    }

    // Find user
    const user = users.find(user => user.email === email.toLowerCase());
    if (!user) {
      console.log('❌ Login failed: User not found for email:', email);
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        status: 'error',
        message: 'Account is deactivated'
      });
    }

    // Check password (in production, use proper password hashing)
    if (user.password !== password) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    // Update last login
    user.lastLogin = new Date();

    // Generate token
    const token = generateToken(user.id);

    res.json({
      status: 'success',
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          nationality: user.nationality,
          currentLocation: user.currentLocation,
          japaneseLevel: user.japaneseLevel,
          visaStatus: user.visaStatus
        },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error during login'
    });
  }
});

// Get current user profile
router.get('/profile', (req, res) => {
  try {
    // Simple auth check (in production, use proper middleware)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        message: 'No token provided'
      });
    }

    const token = authHeader.substring(7);
    
    // Check if token is valid format
    if (!token || token.length < 20 || token === 'null' || token === 'undefined') {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token format'
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (jwtError) {
      console.error('JWT verification failed:', jwtError.message);
      return res.status(401).json({
        status: 'error',
        message: 'Invalid or expired token'
      });
    }

    const user = users.find(u => u.id === decoded.userId);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Profile retrieved successfully',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          nationality: user.nationality,
          currentLocation: user.currentLocation,
          japaneseLevel: user.japaneseLevel,
          visaStatus: user.visaStatus
        }
      }
    });
  } catch (error) {
    console.error('Profile retrieval error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error retrieving profile'
    });
  }
});

module.exports = router; 