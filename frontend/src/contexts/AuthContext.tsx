import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI, cleanAuthData } from '../utils/api';

interface User {
  id: string;
  name: string;
  email: string;
  nationality?: string;
  currentLocation?: string;
  japaneseLevel?: string;
  visaStatus?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'CLEAR_ERROR' };

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('authToken'),
  loading: false,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    
    case 'LOGIN_SUCCESS':
      console.log('🔥 AuthReducer: LOGIN_SUCCESS with payload:', action.payload);
      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      console.log('🔥 AuthReducer: Saved to localStorage, returning new state');
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      };
    
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload };
    
    case 'LOGOUT':
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      return { ...state, user: null, token: null, error: null };
    
    case 'UPDATE_USER':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    default:
      return state;
  }
};

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    nationality?: string;
    currentLocation?: string;
  }) => Promise<void>;
  googleSignIn: (credential: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is logged in on app start
  useEffect(() => {
    const initializeAuth = async () => {
      // Clean any corrupted auth data first
      cleanAuthData();
      
      const token = localStorage.getItem('authToken');
      const userStr = localStorage.getItem('user');
      
      console.log('🔄 AuthContext: Initializing auth on app start', { 
        hasToken: !!token, 
        hasUser: !!userStr,
        tokenLength: token?.length,
        tokenStart: token?.substring(0, 20) + '...'
      });
      
      if (token && userStr && token !== 'null' && token !== 'undefined') {
        try {
          const user = JSON.parse(userStr);
          console.log('🔄 AuthContext: Restoring user from localStorage:', user);
          dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
          
          // Only verify token if it looks valid (JWT format: xxx.yyy.zzz)
          if (token.split('.').length === 3) {
            try {
              await authAPI.getProfile();
              console.log('🔄 AuthContext: Token verified successfully');
            } catch (error) {
              console.log('🔄 AuthContext: Token verification failed, but keeping user logged in');
              // Keep user logged in even if verification fails, but don't crash
            }
          } else {
            console.log('🔄 AuthContext: Token format invalid, clearing auth data');
            dispatch({ type: 'LOGOUT' });
          }
        } catch (error) {
          console.log('🔄 AuthContext: Error parsing user data, clearing auth data', error);
          // Clear invalid data
          dispatch({ type: 'LOGOUT' });
        }
      } else {
        console.log('🔄 AuthContext: No valid auth data found');
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Clean any corrupted auth data before attempting login
    cleanAuthData();
    
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await authAPI.login({ email, password });
      const { user, token } = response.data.data; // Fix: Access from response.data.data
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
    } catch (error: any) {
      console.error('Login error details:', error);
      let errorMessage = 'Login failed';
      
      if (error.code === 'ERR_NETWORK') {
        errorMessage = 'Cannot connect to server. Please make sure the backend is running.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    nationality?: string;
    currentLocation?: string;
  }) => {
    console.log('🔥 AuthContext: Starting registration process');
    
    // Clean any corrupted auth data before attempting registration
    cleanAuthData();
    
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await authAPI.register(userData);
      console.log('🔥 AuthContext: Registration response:', response.data);
      const { user, token } = response.data.data; // Fix: Access from response.data.data
      console.log('🔥 AuthContext: Extracted user and token:', { user, token });
      console.log('🔥 AuthContext: Dispatching LOGIN_SUCCESS');
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
      console.log('🔥 AuthContext: Registration complete - user should be logged in');
    } catch (error: any) {
      console.error('Registration error details:', error);
      let errorMessage = 'Registration failed';
      
      if (error.code === 'ERR_NETWORK') {
        errorMessage = 'Cannot connect to server. Please make sure the backend is running.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const googleSignIn = async (credential: string) => {
    console.log('🔥 AuthContext: Starting Google sign-in process');
    
    // Clean any corrupted auth data before attempting Google sign-in
    cleanAuthData();
    
    dispatch({ type: 'LOGIN_START' });
    try {
      // Send the Google credential token to our backend for verification
      const response = await authAPI.googleAuth(credential);
      console.log('🔥 AuthContext: Google auth response:', response.data);
      const { user, token } = response.data.data;
      console.log('🔥 AuthContext: Extracted user and token from Google auth:', { user, token });
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
      console.log('🔥 AuthContext: Google sign-in complete - user should be logged in');
    } catch (error: any) {
      console.error('Google sign-in error details:', error);
      let errorMessage = 'Google sign-in failed';
      
      if (error.code === 'ERR_NETWORK') {
        errorMessage = 'Cannot connect to server. Please make sure the backend is running.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      const response = await authAPI.updateProfile(userData);
      dispatch({ type: 'UPDATE_USER', payload: response.data.data.user }); // Fix: Access from response.data.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Profile update failed';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: AuthContextType = {
    state,
    login,
    register,
    googleSignIn,
    logout,
    updateProfile,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 