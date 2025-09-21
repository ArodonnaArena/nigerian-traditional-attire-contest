// Environment configuration utility
// This handles environment variables safely for both development and production

/**
 * Get environment variable with fallback
 * @param {string} key - Environment variable key
 * @param {string} fallback - Fallback value if env var is not found
 * @returns {string} Environment variable value or fallback
 */
export const getEnvVar = (key, fallback = '') => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    // In browser, use window._env_ if available (for containerized deployments)
    if (window._env_ && window._env_[key]) {
      return window._env_[key];
    }
  }
  
  // Check if process is available (Node.js environment or bundled)
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || fallback;
  }
  
  return fallback;
};

// App configuration
export const APP_CONFIG = {
  name: getEnvVar('REACT_APP_APP_NAME', 'Nigerian Traditional Attire Contest'),
  url: getEnvVar('REACT_APP_APP_URL', 'http://localhost:3000'),
  apiUrl: getEnvVar('REACT_APP_API_URL', 'http://localhost:5000/api'),
  isDevelopment: getEnvVar('NODE_ENV', 'development') === 'development',
  isProduction: getEnvVar('NODE_ENV', 'development') === 'production',
};

// Paystack configuration
export const PAYSTACK_CONFIG = {
  publicKey: getEnvVar(
    'REACT_APP_PAYSTACK_PUBLIC_KEY', 
    'pk_test_b74e1c9073cdc8ba6bb746e4aa09763ac7de980f' // Default test key
  ),
  currency: 'NGN',
  channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
};

// Vote package configurations
export const VOTE_PACKAGES = [
  {
    id: 'single',
    name: 'Single Vote',
    votes: 1,
    price: 5000, // in kobo (₦50.00)
    color: 'primary-green',
    description: 'Support young cultural ambassadors',
    features: [
      'Support young ambassadors',
      'Promote Nigerian heritage', 
      'Help preserve our culture'
    ]
  },
  {
    id: 'power',
    name: 'Power Vote',
    votes: 5,
    price: 25000, // in kobo (₦250.00)
    color: 'blue-500',
    description: 'Get more voting power with 5 votes',
    features: [
      'Support young ambassadors',
      'Promote Nigerian heritage',
      'Help preserve our culture',
      'Better value for money'
    ]
  },
  {
    id: 'super',
    name: 'Super Vote',
    votes: 10,
    price: 50000, // in kobo (₦500.00)
    color: 'secondary-gold',
    description: 'Maximum impact with 10 votes + bonus features',
    popular: true,
    features: [
      'Support young ambassadors',
      'Promote Nigerian heritage',
      'Help preserve our culture',
      'Receive digital certificate',
      'Priority contest updates'
    ]
  }
];

// Format price for display
export const formatPrice = (priceInKobo) => {
  const naira = priceInKobo / 100;
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(naira);
};

// Generate unique reference for transactions
export const generateReference = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000000);
  return `ntac_${timestamp}_${random}`;
};

// Development helpers
export const isDevelopment = () => APP_CONFIG.isDevelopment;
export const isProduction = () => APP_CONFIG.isProduction;

// Debug logging (only in development)
export const debugLog = (message, data = null) => {
  if (isDevelopment()) {
    console.log(`[NTAC Debug] ${message}`, data || '');
  }
};

// Error logging
export const errorLog = (message, error = null) => {
  console.error(`[NTAC Error] ${message}`, error || '');
};

// Success logging (only in development)
export const successLog = (message, data = null) => {
  if (isDevelopment()) {
    console.log(`[NTAC Success] ${message}`, data || '');
  }
};