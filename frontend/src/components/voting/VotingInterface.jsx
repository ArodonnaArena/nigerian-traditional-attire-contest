import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Plus, 
  Minus, 
  Wallet, 
  ShoppingCart, 
  Award,
  TrendingUp,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import votingService from '../../services/votingService';
import { VOTE_PACKAGES } from '../../utils/env';
import VotePackageCard from './VotePackageCard';
import PaystackPaymentModal from './PaystackPaymentModal';

const VotingInterface = ({ contestant, onVoteSuccess, className = '' }) => {
  const [voteBalance, setVoteBalance] = useState(0);
  const [votesToCast, setVotesToCast] = useState(1);
  const [isVoting, setIsVoting] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [contestantVotes, setContestantVotes] = useState(0);
  const [userVotesForContestant, setUserVotesForContestant] = useState(0);
  const [votingHistory, setVotingHistory] = useState([]);
  const [showVoteHistory, setShowVoteHistory] = useState(false);

  // Load initial data
  useEffect(() => {
    loadVoteBalance();
    loadContestantVotes();
    loadVotingHistory();
    
    // Listen for balance changes
    const handleBalanceChange = (event) => {
      setVoteBalance(event.detail);
    };
    
    // Listen for purchase completion
    const handlePurchaseComplete = (event) => {
      loadVoteBalance();
      toast.success('Votes added to your balance!');
    };

    window.addEventListener('voteBalanceChanged', handleBalanceChange);
    window.addEventListener('purchaseComplete', handlePurchaseComplete);

    return () => {
      window.removeEventListener('voteBalanceChanged', handleBalanceChange);
      window.removeEventListener('purchaseComplete', handlePurchaseComplete);
    };
  }, []);

  // Load user's vote balance
  const loadVoteBalance = () => {
    const balance = votingService.getUserVoteBalance();
    setVoteBalance(balance);
  };

  // Load contestant's current vote count
  const loadContestantVotes = () => {
    const votes = votingService.getContestantVotes();
    const contestantVoteCount = votes[contestant.id] || 0;
    setContestantVotes(contestantVoteCount);
    
    // Get user's votes for this specific contestant from localStorage
    const userVotes = JSON.parse(localStorage.getItem(`userVotes_${contestant.id}`) || '0');
    setUserVotesForContestant(userVotes);
  };

  // Load voting history
  const loadVotingHistory = async () => {
    try {
      const history = await votingService.getVotingHistory();
      setVotingHistory(history);
    } catch (error) {
      console.error('Error loading voting history:', error);
    }
  };

  // Handle vote casting
  const handleVote = async () => {
    if (voteBalance < votesToCast) {
      toast.error('Insufficient vote balance! Please purchase more votes.');
      setShowPurchaseModal(true);
      return;
    }

    if (votesToCast < 1) {
      toast.error('Please select at least 1 vote to cast.');
      return;
    }

    setIsVoting(true);
    
    try {
      const result = await votingService.castVote(contestant.id, votesToCast);
      
      if (result.success) {
        // Update local state
        setContestantVotes(prev => prev + votesToCast);
        setUserVotesForContestant(prev => {
          const newTotal = prev + votesToCast;
          localStorage.setItem(`userVotes_${contestant.id}`, JSON.stringify(newTotal));
          return newTotal;
        });
        
        // Reset votes to cast
        setVotesToCast(1);
        
        // Show success message
        toast.success(
          `🎉 Successfully cast ${votesToCast} ${votesToCast === 1 ? 'vote' : 'votes'} for ${contestant.name}!`,
          { duration: 4000 }
        );
        
        // Call success callback
        if (onVoteSuccess) {
          onVoteSuccess(contestant, votesToCast);
        }
        
        // Reload data
        loadVoteBalance();
        loadVotingHistory();
        
      } else {
        toast.error(result.error || 'Failed to cast vote. Please try again.');
      }
    } catch (error) {
      console.error('Voting error:', error);
      toast.error(error.message || 'Failed to cast vote. Please try again.');
    } finally {
      setIsVoting(false);
    }
  };

  // Handle vote package purchase
  const handlePurchasePackage = (votePackage) => {
    setSelectedPackage(votePackage);
    setShowPurchaseModal(true);
  };

  // Adjust votes to cast
  const adjustVotes = (change) => {
    const newVotes = votesToCast + change;
    if (newVotes >= 1 && newVotes <= Math.min(voteBalance, 50)) {
      setVotesToCast(newVotes);
    }
  };

  // Quick vote buttons
  const quickVoteOptions = [1, 5, 10, 25];

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-green to-secondary-green text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">Vote for {contestant.name}</h3>
            <p className="text-green-100 text-sm">{contestant.ethnic || 'Cultural Ambassador'}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{contestantVotes.toLocaleString()}</div>
            <p className="text-green-100 text-sm">Total Votes</p>
          </div>
        </div>
      </div>

      {/* Vote Balance Display */}
      <div className="p-4 bg-gray-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wallet className="w-5 h-5 text-primary-green" />
            <span className="font-semibold text-gray-700">Your Vote Balance:</span>
            <span className="text-xl font-bold text-primary-green">{voteBalance}</span>
          </div>
          <button
            onClick={() => setShowPurchaseModal(true)}
            className="bg-primary-green text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary-green transition-colors flex items-center space-x-1"
          >
            <Plus className="w-4 h-4" />
            <span>Buy Votes</span>
          </button>
        </div>
        
        {userVotesForContestant > 0 && (
          <div className="mt-2 text-sm text-gray-600">
            You've cast {userVotesForContestant} {userVotesForContestant === 1 ? 'vote' : 'votes'} for this contestant
          </div>
        )}
      </div>

      {/* Voting Controls */}
      <div className="p-6">
        {voteBalance > 0 ? (
          <div className="space-y-4">
            {/* Vote Amount Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Votes to Cast
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => adjustVotes(-1)}
                  disabled={votesToCast <= 1}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                
                <div className="flex-1 text-center">
                  <div className="text-3xl font-bold text-gray-900">{votesToCast}</div>
                  <div className="text-sm text-gray-500">
                    {votesToCast === 1 ? 'vote' : 'votes'}
                  </div>
                </div>
                
                <button
                  onClick={() => adjustVotes(1)}
                  disabled={votesToCast >= Math.min(voteBalance, 50)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Vote Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quick Select
              </label>
              <div className="flex space-x-2">
                {quickVoteOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => setVotesToCast(Math.min(option, voteBalance))}
                    disabled={option > voteBalance}
                    className={`
                      px-3 py-1 rounded-full text-sm font-medium transition-colors
                      ${votesToCast === option 
                        ? 'bg-primary-green text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                      ${option > voteBalance ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Vote Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleVote}
              disabled={isVoting || votesToCast > voteBalance}
              className="w-full bg-gradient-to-r from-primary-green to-secondary-green text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isVoting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Casting Votes...</span>
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5 fill-current" />
                  <span>Cast {votesToCast} {votesToCast === 1 ? 'Vote' : 'Votes'}</span>
                </>
              )}
            </motion.button>

            {/* Vote Impact Preview */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-blue-800 mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium text-sm">Vote Impact</span>
              </div>
              <div className="text-sm text-blue-700">
                Your {votesToCast} {votesToCast === 1 ? 'vote' : 'votes'} will increase {contestant.name}'s total to{' '}
                <span className="font-bold">{(contestantVotes + votesToCast).toLocaleString()}</span> votes
              </div>
            </div>
          </div>
        ) : (
          // No votes available
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">No Votes Available</h4>
            <p className="text-gray-600 mb-4">
              You need to purchase votes to participate in the contest
            </p>
            <button
              onClick={() => setShowPurchaseModal(true)}
              className="bg-primary-green text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary-green transition-colors flex items-center space-x-2 mx-auto"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Purchase Votes</span>
            </button>
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm font-semibold text-gray-900">{contestantVotes.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Total Votes</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">{userVotesForContestant}</div>
            <div className="text-xs text-gray-500">Your Votes</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">#{contestant.rank || '?'}</div>
            <div className="text-xs text-gray-500">Current Rank</div>
          </div>
        </div>
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
                  <p className="text-gray-600">Choose a package to add votes to your balance</p>
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
                  <VotePackageCard
                    key={pkg.id}
                    votePackage={pkg}
                    onPurchase={handlePurchasePackage}
                  />
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
    </div>
  );
};

export default VotingInterface;