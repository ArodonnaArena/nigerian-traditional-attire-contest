import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock, AlertCircle } from 'lucide-react';
import { usePaystackPayment } from 'react-paystack';
import toast from 'react-hot-toast';
import { PAYSTACK_CONFIG, formatPrice, generateReference } from '../../utils/env';
import votingService from '../../services/votingService';

const PaystackPaymentModal = ({ 
  isOpen, 
  onClose, 
  votePackage, 
  userInfo = { email: 'user@example.com', name: 'Demo User' }
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [userEmail, setUserEmail] = useState(userInfo.email || '');
  const [userName, setUserName] = useState(userInfo.name || '');

  const config = {
    reference: generateReference(),
    email: userEmail,
    amount: votePackage?.price || 0,
    publicKey: PAYSTACK_CONFIG.publicKey,
    currency: PAYSTACK_CONFIG.currency,
    channels: PAYSTACK_CONFIG.channels,
    metadata: {
      custom_fields: [
        {
          display_name: "Vote Package",
          variable_name: "vote_package",
          value: votePackage?.name
        },
        {
          display_name: "Vote Count",
          variable_name: "vote_count", 
          value: votePackage?.votes
        }
      ]
    }
  };

  const initializePayment = usePaystackPayment(config);

  const handlePaymentSuccess = async (reference) => {
    setIsProcessing(true);
    try {
      // Process the purchase with our backend
      const result = await votingService.processPurchase(
        votePackage, 
        { email: userEmail, name: userName }, 
        reference.reference
      );

      if (result.success) {
        toast.success(`🎉 Successfully purchased ${votePackage.votes} ${votePackage.votes === 1 ? 'vote' : 'votes'}!`);
        onClose();
        
        // Optionally refresh the page or update UI
        window.dispatchEvent(new CustomEvent('purchaseComplete', { 
          detail: { votePackage, reference } 
        }));
      } else {
        toast.error('Payment verification failed. Please contact support.');
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      toast.error('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentClose = () => {
    toast('Payment cancelled', {
      icon: '⚠️',
      style: {
        background: '#F59E0B',
        color: '#fff',
      },
    });
    setIsProcessing(false);
  };

  const startPayment = () => {
    if (!userEmail || !userName) {
      toast.error('Please fill in your details');
      return;
    }

    if (!userEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsProcessing(true);
    
    initializePayment(
      handlePaymentSuccess, 
      handlePaymentClose
    );
  };

  if (!isOpen || !votePackage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Purchase</h2>
            <p className="text-gray-600">Secure payment powered by Paystack</p>
          </div>

          {/* Package Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">{votePackage.name}</h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{votePackage.votes} {votePackage.votes === 1 ? 'Vote' : 'Votes'}</span>
              <span className="text-xl font-bold text-gray-900">{formatPrice(votePackage.price)}</span>
            </div>
          </div>

          {/* User Details Form */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Security Note */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6 p-3 bg-blue-50 rounded-lg">
            <Lock className="w-4 h-4 text-blue-500" />
            <span>Your payment is secured with 256-bit SSL encryption</span>
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Accepted Payment Methods:</p>
            <div className="flex space-x-2 text-xs text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded">Card</span>
              <span className="bg-gray-100 px-2 py-1 rounded">Bank Transfer</span>
              <span className="bg-gray-100 px-2 py-1 rounded">USSD</span>
              <span className="bg-gray-100 px-2 py-1 rounded">Mobile Money</span>
            </div>
          </div>

          {/* Pay Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={startPayment}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                <span>Pay {formatPrice(votePackage.price)}</span>
              </>
            )}
          </motion.button>

          {/* Disclaimer */}
          <div className="flex items-start space-x-2 mt-4 text-xs text-gray-500">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>
              By proceeding with this payment, you agree to purchase voting credits that will be added to your account. 
              Votes are non-refundable once purchased.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaystackPaymentModal;