require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');
const User = require('./models/User');

const API_BASE_URL = 'http://localhost:5000/api';

async function testAuth() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kaishi-nihon');
    console.log('✅ Connected to MongoDB');

    // Clear existing test user
    await User.deleteOne({ email: 'test@example.com' });
    console.log('🧹 Cleared existing test user');

    // Test 1: Register a new user
    console.log('\n🔐 Testing user registration...');
    const registerResponse = await axios.post(`${API_BASE_URL}/auth/register`, {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      nationality: 'USA',
      currentLocation: 'Tokyo'
    });

    console.log('✅ Registration successful:', {
      user: registerResponse.data.data.user,
      hasToken: !!registerResponse.data.data.token
    });

    // Test 2: Login with the registered user
    console.log('\n🔓 Testing user login...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
    });

    console.log('✅ Login successful:', {
      user: loginResponse.data.data.user,
      hasToken: !!loginResponse.data.data.token
    });

    // Test 3: Verify token works
    console.log('\n👤 Testing profile retrieval...');
    const profileResponse = await axios.get(`${API_BASE_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${loginResponse.data.data.token}`
      }
    });

    console.log('✅ Profile retrieval successful:', profileResponse.data.data.user);

    console.log('\n🎉 All authentication tests passed!');
    console.log('\n📝 Test credentials:');
    console.log('   Email: test@example.com');
    console.log('   Password: password123');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

testAuth(); 