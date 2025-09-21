import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Plus, TrendingUp } from 'lucide-react';
import votingService from '../../services/votingService';
import { VOTE_PACKAGES } from '../../utils/env';
import PaystackPaymentModal from './PaystackPaymentModal';

const VoteBalanceWidget = ({ className = '' }) => {
  const [voteBalance, setVoteBalance] = useState(0);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [balanceChange, setBalanceChange] = useState(0);
  const [showBalanceAnimation, setShowBalanceAnimation] = useState(false);

  useEffect(() => {
    loadVoteBalance();
    
    // Listen for balance changes
    const handleBalanceChange = (event) => {
      const newBalance = event.detail;
      const change = newBalance - voteBalance;
      
      if (change !== 0) {
        setBalanceChange(change);
        setShowBalanceAnimation(true);
        setTimeout(() => setShowBalanceAnimation(false), 2000);
      }
      
      setVoteBalance(newBalance);
    };
    
    // Listen for purchase completion
    const handlePurchaseComplete = (event) => {
      loadVoteBalance();
      setShowPurchaseModal(false);
      setSelectedPackage(null);
    };

    window.addEventListener('voteBalanceChanged', handleBalanceChange);
    window.addEventListener('purchaseComplete', handlePurchaseComplete);

    return () => {
      window.removeEventListener('voteBalanceChanged', handleBalanceChange);
      window.removeEventListener('purchaseComplete', handlePurchaseComplete);
    };
  }, [voteBalance]);

  const loadVoteBalance = () => {
    setIsLoading(true);
    const balance = votingService.getUserVoteBalance();
    setVoteBalance(balance);
    setIsLoading(false);
  };

  const handleQuickPurchase = (packageId) => {
    const votePackage = VOTE_PACKAGES.find(pkg => pkg.id === packageId);
    if (votePackage) {
      setSelectedPackage(votePackage);
    }
  };

  return (
    <>
      <div className={`relative ${className}`}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-lg shadow-md border border-gray-200 p-3 cursor-pointer"
          onClick={() => setShowPurchaseModal(true)}
        >
          <div className="flex items-center space-x-3">
            <div className="bg-primary-green bg-opacity-10 p-2 rounded-full">
              <Wallet className="w-5 h-5 text-primary-green" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600">Vote Balance</span>
                {showBalanceAnimation && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      balanceChange > 0 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {balanceChange > 0 ? '+' : ''}{balanceChange}
                  </motion.div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-primary-green border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span className="text-lg font-bold text-gray-900">{voteBalance.toLocaleString()}</span>
                )}
                
                {voteBalance > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full flex items-center space-x-1"
                  >
                    <TrendingUp className="w-3 h-3" />
                    <span>Active</span>
                  </motion.div>
                )}
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-primary-green text-white p-2 rounded-full shadow-md hover:bg-secondary-green transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setShowPurchaseModal(true);
              }}
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Quick Purchase Buttons */}
        {voteBalance === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-10"
          >
            <div className="text-xs text-gray-500 mb-2">Quick Purchase:</div>
            <div className="flex space-x-2">
              {VOTE_PACKAGES.slice(0, 2).map(pkg => (
                <motion.button
                  key={pkg.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuickPurchase(pkg.id)}
                  className="flex-1 bg-gray-50 hover:bg-primary-green hover:text-white text-gray-700 text-xs font-medium py-2 px-3 rounded-md transition-all duration-200"
                >
                  {pkg.votes} votes
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Purchase Vote Credits</h2>
                  <p className="text-gray-600">
                    Current balance: <span className="font-semibold text-primary-green">{voteBalance} votes</span>
                  </p>
                </div>
                <button
                  onClick={() => setShowPurchaseModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {VOTE_PACKAGES.map(pkg => (
                  <motion.div
                    key={pkg.id}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-gray-50 rounded-xl p-6 border-2 border-transparent hover:border-primary-green transition-all duration-300 cursor-pointer"
                    onClick={() => handleQuickPurchase(pkg.id)}
                  >
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        {pkg.votes}
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        {pkg.votes === 1 ? 'Vote' : 'Votes'}
                      </div>
                      <div className="text-2xl font-bold text-primary-green mb-4">
                        ₦{(pkg.price / 100).toLocaleString()}
                      </div>
                      <div className="bg-primary-green text-white py-2 px-4 rounded-full text-sm font-medium">
                        {pkg.name}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Paystack Payment Modal */}
      <PaystackPaymentModal
        isOpen={!!selectedPackage}
        onClose={() => setSelectedPackage(null)}
        votePackage={selectedPackage}
        userInfo={{ email: 'user@example.com', name: 'Demo User' }}
      />
    </>
  );
};

export default VoteBalanceWidget;