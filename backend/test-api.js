const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🧪 Testing Kaishi Nihon Backend API...\n');

  try {
    // Test server health
    console.log('1. Testing server health...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Server is running:', healthResponse.data);
    
    // Test registration
    console.log('\n2. Testing user registration...');
    const registerData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword123'
    };
    
    try {
      const registerResponse = await axios.post(`${BASE_URL}/auth/register`, registerData);
      console.log('✅ Registration successful:', registerResponse.data);
    } catch (error) {
      if (error.response?.status === 409) {
        console.log('⚠️  User already exists (expected for testing)');
      } else {
        console.log('❌ Registration failed:', error.response?.data || error.message);
      }
    }
    
    // Test login
    console.log('\n3. Testing user login...');
    const loginData = {
      email: 'test@example.com',
      password: 'testpassword123'
    };
    
    try {
      const loginResponse = await axios.post(`${BASE_URL}/auth/login`, loginData);
      console.log('✅ Login successful:', loginResponse.data);
      
      const token = loginResponse.data.token;
      
      // Test protected route
      console.log('\n4. Testing protected route...');
      const protectedResponse = await axios.get(`${BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Protected route accessible:', protectedResponse.data);
      
    } catch (error) {
      console.log('❌ Login failed:', error.response?.data || error.message);
    }
    
    console.log('\n🎉 API testing completed!');
    
  } catch (error) {
    console.log('❌ API test failed:', error.message);
    console.log('Make sure the backend server is running on port 5000');
  }
}

testAPI(); 