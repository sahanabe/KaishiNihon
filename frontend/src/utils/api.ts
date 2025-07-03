import axios from 'axios';

// API Base URL - adjust based on your backend setup
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default configuration
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    
    // Only add token if it's valid and not for auth endpoints
    const isAuthEndpoint = config.url?.includes('/auth/login') || config.url?.includes('/auth/register');
    
    if (token && !isAuthEndpoint && token !== 'null' && token !== 'undefined' && token.length > 20) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('🌐 API Request:', config.method?.toUpperCase(), config.url, {
      hasToken: !!token,
      isAuthEndpoint,
      tokenLength: token?.length
    });
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common responses
api.interceptors.response.use(
  (response) => {
    console.log('🌐 API Response:', response.status, response.config.url, {
      status: response.data?.status || 'unknown'
    });
    return response;
  },
  (error) => {
    console.log('🌐 API Error:', error.response?.status, error.config?.url, {
      message: error.response?.data?.message || error.message,
      isAuthEndpoint: error.config?.url?.includes('/auth/')
    });
    
    if (error.response?.status === 401) {
      const isAuthEndpoint = error.config?.url?.includes('/auth/login') || error.config?.url?.includes('/auth/register');
      
      // Don't clear auth data during login/register attempts
      if (!isAuthEndpoint) {
        console.log('🔐 API: 401 error on non-auth endpoint, clearing auth data');
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        
        // Only redirect if not already on auth pages
        const currentPath = window.location.pathname;
        if (currentPath !== '/' && currentPath !== '/login') {
          window.location.href = '/';
        }
      } else {
        console.log('🔐 API: 401 error on auth endpoint, not clearing data');
      }
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  register: (userData: {
    name: string;
    email: string;
    password: string;
    nationality?: string;
    currentLocation?: string;
  }) => api.post('/auth/register', userData),
  
  googleAuth: (credential: string) =>
    api.post('/auth/google', { credential }),
  
  getProfile: () => api.get('/auth/profile'),
  
  updateProfile: (userData: any) => api.put('/auth/profile', userData),
};

// Visa API calls
export const visaAPI = {
  getTypes: () => api.get('/visa/types'),
  
  getRecommendations: (params: {
    japaneseLevel?: string;
    education?: string;
    workExperience?: string;
    purpose?: string;
  }) => api.get('/visa/recommendations', { params }),
  
  submitApplication: (applicationData: any) =>
    api.post('/visa/apply', applicationData),
  
  getUserApplications: (userId: string) =>
    api.get(`/visa/applications/${userId}`),
  
  getRequirements: (visaType: string) =>
    api.get(`/visa/requirements/${visaType}`),
};

// Language API calls
export const languageAPI = {
  getLevels: () => api.get('/language/levels'),
  
  getLevelDetails: (level: string) => api.get(`/language/levels/${level}`),
  
  getResources: (params: { level?: string; type?: string }) =>
    api.get('/language/resources', { params }),
  
  getSchools: (params: { location?: string }) =>
    api.get('/language/schools', { params }),
  
  submitSchoolApplication: (applicationData: any) =>
    api.post('/language/schools/apply', applicationData),
  
  takeAssessment: (answers: any[]) =>
    api.post('/language/assessment', { answers }),
  
  generateStudyPlan: (planData: {
    currentLevel: string;
    targetLevel: string;
    timeAvailable?: string;
    studyStyle?: string;
  }) => api.post('/language/study-plan', planData),
};

// Services API calls
export const servicesAPI = {
  getAllServices: () => api.get('/services'),
  
  getAirportPickup: (params: { airport?: string }) =>
    api.get('/services/airport-pickup', { params }),
  
  bookAirportPickup: (bookingData: any) =>
    api.post('/services/airport-pickup/book', bookingData),
  
  getAccommodation: (params: { type?: string; location?: string; maxPrice?: string }) =>
    api.get('/services/accommodation', { params }),
  
  requestAccommodation: (requestData: any) =>
    api.post('/services/accommodation/request', requestData),
  
  getTicketing: () => api.get('/services/ticketing'),
  
  bookTicketing: (bookingData: any) =>
    api.post('/services/ticketing/book', bookingData),
  
  getUserBookings: (userId: string) =>
    api.get(`/services/bookings/${userId}`),
  
  emergencyContact: (emergencyData: any) =>
    api.post('/services/emergency-contact', emergencyData),
};

// Consultation API calls
export const consultationAPI = {
  getLawyers: (params: {
    specialization?: string;
    location?: string;
    language?: string;
  }) => api.get('/consultation/lawyers', { params }),
  
  getLawyerDetails: (lawyerId: string) =>
    api.get(`/consultation/lawyers/${lawyerId}`),
  
  bookConsultation: (bookingData: any) =>
    api.post('/consultation/book', bookingData),
  
  requestFreeConsultation: (requestData: any) =>
    api.post('/consultation/free-consultation', requestData),
  
  getUserConsultations: (userId: string) =>
    api.get(`/consultation/user/${userId}`),
  
  getFAQ: (params: { category?: string }) =>
    api.get('/consultation/faq', { params }),
  
  checkDocuments: (documentsData: { documents: string[]; visaType: string }) =>
    api.post('/consultation/document-check', documentsData),
};

// Health check
export const healthAPI = {
  check: () => api.get('/health'),
};

// Utility function to clean corrupted auth data
export const cleanAuthData = () => {
  const token = localStorage.getItem('authToken');
  const user = localStorage.getItem('user');
  
  console.log('🧹 Cleaning auth data check:', { 
    hasToken: !!token, 
    tokenValid: token && token !== 'null' && token !== 'undefined' && token.length > 20,
    hasUser: !!user,
    userValid: user && user !== 'null' && user !== 'undefined'
  });
  
  // Clean invalid tokens
  if (token && (token === 'null' || token === 'undefined' || token.length < 20)) {
    console.log('🧹 Removing invalid token:', token);
    localStorage.removeItem('authToken');
  }
  
  // Clean invalid user data
  if (user && (user === 'null' || user === 'undefined')) {
    console.log('🧹 Removing invalid user data:', user);
    localStorage.removeItem('user');
  }
};

export default api; 