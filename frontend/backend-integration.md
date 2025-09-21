# Backend Integration Guide for Nigerian Traditional Attire Contest

This document provides guidance on implementing the backend endpoints required for the voting and payment system.

## Required Environment Variables

### Paystack
```bash
PAYSTACK_SECRET_KEY=sk_live_your_secret_key_here
PAYSTACK_PUBLIC_KEY=pk_live_your_public_key_here
```

### Database
```bash
DATABASE_URL=your_database_connection_string
```

## Required API Endpoints

### 1. Vote Purchase Verification
```
POST /api/votes/purchase
```

**Request Body:**
```json
{
  "packageId": "single|power|super",
  "votes": 1,
  "amount": 5000,
  "reference": "ntac_1640995200000_123456",
  "userEmail": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transactionId": "txn_12345",
    "votesAdded": 1,
    "newBalance": 5
  }
}
```

### 2. Cast Vote
```
POST /api/votes/cast
```

**Request Body:**
```json
{
  "contestantId": "contestant_123",
  "votes": 1,
  "voteId": "vote_unique_id",
  "timestamp": "2023-12-01T10:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "voteId": "vote_unique_id",
    "contestantVotes": 1835,
    "userBalance": 4
  }
}
```

### 3. Get Vote Balance
```
GET /api/votes/balance
```

**Response:**
```json
{
  "balance": 10,
  "totalPurchased": 25,
  "totalSpent": 15
}
```

### 4. Get Voting History
```
GET /api/votes/history
```

**Response:**
```json
{
  "votes": [
    {
      "id": "vote_123",
      "contestantId": "contestant_123",
      "contestantName": "Adunni Okafor",
      "votes": 1,
      "timestamp": "2023-12-01T10:00:00Z"
    }
  ]
}
```

### 5. Get Purchase History
```
GET /api/votes/purchases
```

**Response:**
```json
{
  "purchases": [
    {
      "id": "purchase_123",
      "packageId": "single",
      "votes": 1,
      "amount": 5000,
      "reference": "ntac_1640995200000_123456",
      "timestamp": "2023-12-01T09:00:00Z"
    }
  ]
}
```

### 6. Get Contestants Leaderboard
```
GET /api/contestants/leaderboard
```

**Response:**
```json
{
  "contestants": [
    {
      "id": "contestant_123",
      "name": "Adunni Okafor",
      "votes": 1835,
      "rank": 1
    }
  ]
}
```

## Sample Backend Implementation (Node.js/Express)

### Payment Verification
```javascript
const crypto = require('crypto');
const axios = require('axios');

// Verify Paystack payment
async function verifyPaystackPayment(reference) {
  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Payment verification error:', error);
    throw error;
  }
}

// Purchase votes endpoint
app.post('/api/votes/purchase', async (req, res) => {
  try {
    const { packageId, votes, amount, reference, userEmail } = req.body;
    
    // 1. Verify payment with Paystack
    const paymentData = await verifyPaystackPayment(reference);
    
    if (!paymentData.status || paymentData.data.status !== 'success') {
      return res.status(400).json({
        success: false,
        error: 'Payment verification failed'
      });
    }
    
    // 2. Verify amount matches
    if (paymentData.data.amount !== amount) {
      return res.status(400).json({
        success: false,
        error: 'Payment amount mismatch'
      });
    }
    
    // 3. Check if transaction already processed
    const existingTransaction = await Transaction.findOne({ reference });
    if (existingTransaction) {
      return res.status(400).json({
        success: false,
        error: 'Transaction already processed'
      });
    }
    
    // 4. Save transaction and add votes to user balance
    const transaction = new Transaction({
      reference,
      userEmail,
      packageId,
      votes,
      amount,
      status: 'completed'
    });
    await transaction.save();
    
    const user = await User.findOne({ email: userEmail });
    user.voteBalance += votes;
    await user.save();
    
    res.json({
      success: true,
      data: {
        transactionId: transaction._id,
        votesAdded: votes,
        newBalance: user.voteBalance
      }
    });
    
  } catch (error) {
    console.error('Purchase error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Cast vote endpoint
app.post('/api/votes/cast', async (req, res) => {
  try {
    const { contestantId, votes, voteId } = req.body;
    const userId = req.user.id; // From auth middleware
    
    // 1. Check user has sufficient balance
    const user = await User.findById(userId);
    if (user.voteBalance < votes) {
      return res.status(400).json({
        success: false,
        error: 'Insufficient vote balance'
      });
    }
    
    // 2. Deduct votes from balance
    user.voteBalance -= votes;
    await user.save();
    
    // 3. Add votes to contestant
    const contestant = await Contestant.findById(contestantId);
    contestant.totalVotes += votes;
    await contestant.save();
    
    // 4. Record vote transaction
    const vote = new Vote({
      voteId,
      userId,
      contestantId,
      votes,
      timestamp: new Date()
    });
    await vote.save();
    
    res.json({
      success: true,
      data: {
        voteId,
        contestantVotes: contestant.totalVotes,
        userBalance: user.voteBalance
      }
    });
    
  } catch (error) {
    console.error('Vote casting error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});
```

### Database Schema Examples

#### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  vote_balance INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Transactions Table
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference VARCHAR(255) UNIQUE NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  package_id VARCHAR(50) NOT NULL,
  votes INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Votes Table
```sql
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vote_id VARCHAR(255) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id),
  contestant_id UUID REFERENCES contestants(id),
  votes INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Contestants Table
```sql
CREATE TABLE contestants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  ethnic VARCHAR(255),
  category VARCHAR(100),
  image_url TEXT,
  total_votes INTEGER DEFAULT 0,
  total_views INTEGER DEFAULT 0,
  location VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Security Considerations

1. **Payment Verification**: Always verify payments server-side with Paystack
2. **Rate Limiting**: Implement rate limiting for voting endpoints
3. **Authentication**: Secure all endpoints with proper authentication
4. **Input Validation**: Validate and sanitize all inputs
5. **Transaction Atomicity**: Use database transactions for vote operations
6. **Audit Logging**: Log all vote and payment activities

## Testing

Use Paystack test keys for development:
- Public Key: `pk_test_...`
- Secret Key: `sk_test_...`

Test card numbers:
- Success: `4084084084084081`
- Insufficient funds: `4084084084084099`

## Production Deployment

1. Set up proper environment variables
2. Configure database with proper indexes
3. Set up monitoring and alerts
4. Implement backup strategies
5. Use HTTPS for all endpoints
6. Set up proper logging and error tracking