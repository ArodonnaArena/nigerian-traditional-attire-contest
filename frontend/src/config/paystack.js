// Paystack Configuration
export const PAYSTACK_CONFIG = {
  // Use a fallback test key for development
  publicKey: typeof process !== 'undefined' && process.env ? 
    process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || 'pk_test_b74e1c9073cdc8ba6bb746e4aa09763ac7de980f' : 
    'pk_test_b74e1c9073cdc8ba6bb746e4aa09763ac7de980f',
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
  return `ntac_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
};