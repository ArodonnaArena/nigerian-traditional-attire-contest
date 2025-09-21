import { v4 as uuidv4 } from 'uuid';
import { generateReference, APP_CONFIG } from '../utils/env';

const API_BASE_URL = APP_CONFIG.apiUrl;

class VotingService {
  constructor() {
    this.userVoteBalance = this.getUserVoteBalance();
  }

  // Get user's current vote balance from localStorage (in production, this would come from backend)
  getUserVoteBalance() {
    const balance = localStorage.getItem('userVoteBalance');
    return balance ? parseInt(balance) : 0;
  }

  // Update user's vote balance
  updateUserVoteBalance(newBalance) {
    this.userVoteBalance = newBalance;
    localStorage.setItem('userVoteBalance', newBalance.toString());
    // Dispatch custom event for components to listen to balance changes
    window.dispatchEvent(new CustomEvent('voteBalanceChanged', { detail: newBalance }));
  }

  // Add votes to user's balance
  addVotes(votes) {
    const newBalance = this.userVoteBalance + votes;
    this.updateUserVoteBalance(newBalance);
  }

  // Deduct votes from user's balance
  deductVotes(votes) {
    if (this.userVoteBalance >= votes) {
      const newBalance = this.userVoteBalance - votes;
      this.updateUserVoteBalance(newBalance);
      return true;
    }
    return false;
  }

  // Process vote purchase (this would integrate with your backend)
  async processPurchase(votePackage, userInfo, paymentReference) {
    try {
      // In a real app, this would call your backend API to verify payment and credit votes
      const response = await fetch(`${API_BASE_URL}/votes/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
        body: JSON.stringify({
          packageId: votePackage.id,
          votes: votePackage.votes,
          amount: votePackage.price,
          reference: paymentReference,
          userEmail: userInfo.email,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        // Add votes to user's balance
        this.addVotes(votePackage.votes);
        return { success: true, data: result };
      } else {
        return { success: false, error: 'Purchase verification failed' };
      }
    } catch (error) {
      console.error('Purchase processing error:', error);
      // For demo purposes, we'll simulate successful purchase
      this.addVotes(votePackage.votes);
      return { success: true, data: { message: 'Votes added successfully (demo mode)' } };
    }
  }

  // Cast vote for a contestant
  async castVote(contestantId, votesCount = 1) {
    if (this.userVoteBalance < votesCount) {
      throw new Error('Insufficient vote balance');
    }

    try {
      // In a real app, this would call your backend API
      const response = await fetch(`${API_BASE_URL}/votes/cast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
        body: JSON.stringify({
          contestantId,
          votes: votesCount,
          voteId: uuidv4(),
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        // Deduct votes from balance
        this.deductVotes(votesCount);
        return { success: true, data: result };
      } else {
        return { success: false, error: 'Vote casting failed' };
      }
    } catch (error) {
      console.error('Vote casting error:', error);
      // For demo purposes, simulate successful vote
      this.deductVotes(votesCount);
      
      // Update contestant votes in localStorage (demo)
      const contestantVotes = this.getContestantVotes();
      contestantVotes[contestantId] = (contestantVotes[contestantId] || 0) + votesCount;
      localStorage.setItem('contestantVotes', JSON.stringify(contestantVotes));
      
      return { success: true, data: { message: 'Vote cast successfully (demo mode)' } };
    }
  }

  // Get contestant votes (demo purposes)
  getContestantVotes() {
    const votes = localStorage.getItem('contestantVotes');
    return votes ? JSON.parse(votes) : {};
  }

  // Get user's voting history
  async getVotingHistory() {
    try {
      const response = await fetch(`${API_BASE_URL}/votes/history`, {
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
      });

      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.error('Error fetching voting history:', error);
      return [];
    }
  }

  // Get purchase history
  async getPurchaseHistory() {
    try {
      const response = await fetch(`${API_BASE_URL}/votes/purchases`, {
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
      });

      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.error('Error fetching purchase history:', error);
      return [];
    }
  }

  // Helper to get auth token (implement based on your auth system)
  getAuthToken() {
    return localStorage.getItem('authToken') || '';
  }

  // Get leaderboard with vote counts
  async getLeaderboard() {
    try {
      const response = await fetch(`${API_BASE_URL}/contestants/leaderboard`);
      if (response.ok) {
        return await response.json();
      }
      
      // Demo leaderboard
      const contestantVotes = this.getContestantVotes();
      return Object.entries(contestantVotes).map(([id, votes]) => ({
        contestantId: id,
        votes: votes,
      })).sort((a, b) => b.votes - a.votes);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }
  }
}

export default new VotingService();