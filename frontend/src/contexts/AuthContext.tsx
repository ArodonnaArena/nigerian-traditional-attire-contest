import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { toast } from 'react-hot-toast';

// Types
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  location?: string;
  isAdmin?: boolean;
  submissions?: number;
  votes?: number;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  refreshToken: () => Promise<void>;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location?: string;
}

// Actions
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_FAILURE' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'LOGOUT' };

// Initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  isAuthenticated: false,
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
      };

    case 'AUTH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };

    case 'AUTH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };

    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };

    default:
      return state;
  }
};

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Validate token and get user data
      validateToken(token);
    }
  }, []);

  const validateToken = async (token: string) => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      // In a real app, this would be an API call
      // For now, we'll simulate with mock data
      const mockUser: User = {
        id: '1',
        email: 'user@example.com',
        firstName: 'Adaora',
        lastName: 'Okafor',
        avatar: '👩🏾',
        location: 'Lagos, Nigeria',
        isAdmin: false,
        submissions: 3,
        votes: 127,
        createdAt: new Date().toISOString(),
      };

      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: mockUser, token },
      });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE' });
      localStorage.removeItem('token');
    }
  };

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'AUTH_START' });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock successful login
      const mockUser: User = {
        id: '1',
        email,
        firstName: 'Adaora',
        lastName: 'Okafor',
        avatar: '👩🏾',
        location: 'Lagos, Nigeria',
        isAdmin: email.includes('admin'),
        submissions: 3,
        votes: 127,
        createdAt: new Date().toISOString(),
      };

      const mockToken = 'mock-jwt-token-' + Date.now();

      localStorage.setItem('token', mockToken);

      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: mockUser, token: mockToken },
      });

      toast.success(`Welcome back, ${mockUser.firstName}! 🎉`, {
        icon: '👑',
        duration: 4000,
      });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE' });
      toast.error('Login failed. Please check your credentials.', {
        icon: '❌',
      });
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      dispatch({ type: 'AUTH_START' });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful registration
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        location: userData.location,
        avatar: '👤',
        isAdmin: false,
        submissions: 0,
        votes: 0,
        createdAt: new Date().toISOString(),
      };

      const mockToken = 'mock-jwt-token-' + Date.now();

      localStorage.setItem('token', mockToken);

      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: newUser, token: mockToken },
      });

      toast.success(`Welcome to the Nigerian Traditional Attire Contest, ${newUser.firstName}! 🇳🇬✨`, {
        icon: '🎭',
        duration: 5000,
      });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE' });
      toast.error('Registration failed. Please try again.', {
        icon: '❌',
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    toast.success('You have been logged out successfully! 👋', {
      icon: '✨',
    });
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      if (!state.user) return;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedUser = { ...state.user, ...userData };

      dispatch({ type: 'UPDATE_USER', payload: updatedUser });

      toast.success('Profile updated successfully! 🎉', {
        icon: '✅',
      });
    } catch (error) {
      toast.error('Failed to update profile. Please try again.', {
        icon: '❌',
      });
      throw error;
    }
  };

  const refreshToken = async () => {
    try {
      // Simulate token refresh
      const newToken = 'refreshed-mock-jwt-token-' + Date.now();
      localStorage.setItem('token', newToken);
      
      // Update token in state
      if (state.user) {
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user: state.user, token: newToken },
        });
      }
    } catch (error) {
      logout();
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;