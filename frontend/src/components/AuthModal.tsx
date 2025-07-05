import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Extend Window interface for Google Identity Services
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, config: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialTab = 'register' }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('register');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, register, googleSignIn } = useAuth();
  const googleButtonRef = useRef<HTMLButtonElement>(null);
  
  // Form states
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: ''
  });

  // Reset tab and clear data when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      console.log('🚀 Modal opened - FORCING tab to register');
      setActiveTab('register'); // ALWAYS force register tab
      setError('');
    } else {
      console.log('🚫 Modal closed - clearing all data');
      // Clear form data when modal closes
      setLoginData({ email: '', password: '' });
      setRegisterData({
        firstName: '',
        lastName: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
      });
      setError('');
      setIsLoading(false);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open and preserve scroll position
  useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      // Return cleanup function
      return () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Clear errors when switching tabs
  useEffect(() => {
    setError('');
  }, [activeTab]);

  // Initialize Google Sign-In
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined' && window.google) {
      try {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || '1043051612385-tgo9aev45uemk89svnj4e9sicjo6r9sd.apps.googleusercontent.com',
          callback: handleGoogleSignIn,
          auto_select: false,
        });

        // Render the button if the ref exists
        if (googleButtonRef.current) {
          window.google.accounts.id.renderButton(googleButtonRef.current, {
            theme: 'outline',
            size: 'large',
            width: 250,
            text: activeTab === 'register' ? 'signup_with' : 'signin_with',
          });
        }
      } catch (error) {
        console.error('Error initializing Google Sign-In:', error);
      }
    }
  }, [isOpen, activeTab]);

  const handleGoogleSignIn = async (response: any) => {
    setIsLoading(true);
    setError('');

    try {
      console.log('🔐 Google Sign-In response received:', response);
      await googleSignIn(response.credential);
      console.log('✅ Google Sign-In successful!');
      onClose(); // Close modal on successful sign-in
    } catch (err: any) {
      console.error('❌ Google Sign-In failed:', err);
      setError(err.message || 'Google Sign-In failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleButtonClick = () => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.prompt();
    } else {
      setError('Google Sign-In is not available. Please try again later.');
    }
  };

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    console.log('🔐 Attempting login with:', { email: loginData.email, password: '***' });
    
    try {
      await login(loginData.email, loginData.password);
      console.log('✅ Login successful!');
      onClose(); // Close modal on successful login
    } catch (err: any) {
      console.error('❌ Login failed:', err);
      console.error('Error details:', {
        message: err.message,
        code: err.code,
        response: err.response?.data
      });
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic validation
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (registerData.email !== registerData.confirmEmail) {
      setError('Email addresses do not match');
      setIsLoading(false);
      return;
    }
    
    const userData = {
      name: `${registerData.firstName} ${registerData.lastName}`,
      email: registerData.email,
      password: registerData.password
    };
    
    console.log('📝 Attempting registration with:', { ...userData, password: '***' });
    
    try {
      await register(userData);
      console.log('✅ Registration successful! User will remain logged in.');
      console.log('🔒 Closing modal and keeping user logged in...');
      console.log('🎉 SUCCESS: User should now see their name in the header!');
      
      // Ensure loading is stopped first
      setIsLoading(false);
      
      // Clear all form data before closing
      setRegisterData({
        firstName: '',
        lastName: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
      });
      
      // Close modal immediately after successful registration
      // The AuthContext will handle setting the user as logged in
      // Force immediate close without any delays that might cause issues
      console.log('⚡ Executing immediate modal close after successful registration');
      
      // Small delay to ensure auth state propagates
      setTimeout(() => {
        onClose();
      }, 100);
      
    } catch (err: any) {
      console.error('❌ Registration failed:', err);
      console.error('Error details:', {
        message: err.message,
        code: err.code,
        response: err.response?.data
      });
      setError(err.message || 'Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
      ></div>

      {/* Modal - Always centered in viewport */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 mx-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 pb-0">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">始</span>
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Kaishi Nihon
              </h2>
            </div>
            <p className="text-gray-600 text-sm">
              {activeTab === 'register' 
                ? '✨ Create your account to start your Japan journey!' 
                : 'Welcome back to your Japan journey'
              }
            </p>
            {activeTab === 'login' && (
              <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-700 text-xs">
                  💡 New to Kaishi Nihon? Click "Sign Up" to create your account first!
                </p>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'register'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              ✨ Sign Up (New Users)
            </button>
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'login'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Forms */}
        <div className="px-6 pb-6">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          {/* Register Form */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-2">
              {/* First Name and Last Name Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={registerData.firstName}
                      onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                      className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 auth-input-visible"
                      placeholder="First name"
                      required
                      style={{ 
                        color: '#000000', 
                        backgroundColor: '#ffffff',
                        opacity: 1,
                        WebkitTextFillColor: '#000000',
                        border: '2px solid #000000'
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={registerData.lastName}
                      onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                      className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 auth-input-visible"
                      placeholder="Last name"
                      required
                      style={{ 
                        color: '#000000', 
                        backgroundColor: '#ffffff',
                        opacity: 1,
                        WebkitTextFillColor: '#000000',
                        border: '2px solid #000000'
                      }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 auth-input-visible"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Confirm Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={registerData.confirmEmail}
                    onChange={(e) => setRegisterData({ ...registerData, confirmEmail: e.target.value })}
                    className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 auth-input-visible"
                    placeholder="Confirm your email"
                    required
                  />
                </div>
              </div>

              {/* Password and Confirm Password Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      className="block w-full pl-9 pr-9 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 auth-input-visible"
                      placeholder="Create password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      className="block w-full pl-9 pr-9 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 auth-input-visible"
                      placeholder="Confirm password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-3 w-3 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-xs text-gray-700">
                  I agree to the{' '}
                  <button type="button" className="text-purple-600 hover:text-purple-700 underline">Terms of Service</button>
                  {' '}and{' '}
                  <button type="button" className="text-purple-600 hover:text-purple-700 underline">Privacy Policy</button>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center space-x-2 group text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                )}
                <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
              </button>

            </form>
          )}

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 auth-input-visible"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="block w-full pl-9 pr-9 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 auth-input-visible"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-3 w-3 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-xs text-gray-700">
                    Remember me
                  </label>
                </div>
                <button type="button" className="text-xs text-purple-600 hover:text-purple-700">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center space-x-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
              </button>
            </form>
          )}

          {/* Social Login */}
          <div className="mt-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="w-full flex justify-center">
                <button 
                  ref={googleButtonRef}
                  onClick={handleGoogleButtonClick}
                  className="w-full inline-flex justify-center py-1.5 px-3 border border-gray-300 rounded-lg shadow-sm bg-white text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                  disabled={isLoading}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="ml-2">
                    {activeTab === 'register' ? 'Sign up with Google' : 'Sign in with Google'}
                  </span>
                </button>
              </div>
              
              <button className="w-full inline-flex justify-center py-1.5 px-3 border border-gray-300 rounded-lg shadow-sm bg-white text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.111.222.82.402-.088.402-.286 1.411-.325 1.608-.051.266-.165.323-.381.194C2.954 16.477 1.99 13.982 1.99 11.877c0-4.298 3.134-8.235 9.033-8.235 4.741 0 8.428 3.379 8.428 7.906 0 4.718-2.977 8.515-7.114 8.515-1.388 0-2.692-.721-3.138-1.583 0 0-.686 2.615-.853 3.256-.309 1.199-1.141 2.7-1.699 3.614C9.639 23.738 10.8 24 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
                <span className="ml-2">GitHub</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal; 