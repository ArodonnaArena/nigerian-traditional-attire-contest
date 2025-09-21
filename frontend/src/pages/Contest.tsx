import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, 
  Trophy, 
  Users, 
  Filter, 
  Search, 
  Grid,
  List,
  ArrowUpDown,
  Eye,
  Heart,
  Share2,
  Star
} from 'lucide-react';
import toast from 'react-hot-toast';
import SubmissionForm from '../components/contest/SubmissionForm';
import VotingInterface from '../components/voting/VotingInterface';
import VoteBalanceWidget from '../components/voting/VoteBalanceWidget';
import { useLocation } from 'react-router-dom';

const Contest = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [contestants, setContestants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('votes');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedContestant, setSelectedContestant] = useState(null);
  const [showVotingModal, setShowVotingModal] = useState(false);
  const location = useLocation();

  // Sample contestants data (in production, this would come from your API)
  const sampleContestants = [
    {
      id: '1',
      name: 'Adunni Okafor',
      ethnic: 'Yoruba Traditional Attire',
      category: 'Yoruba',
      image: '/images/children/Stunning Yoruba child.png',
      votes: 1834,
      views: 6200,
      rank: 1,
      description: 'Beautiful Yoruba traditional attire with intricate details',
      location: 'Lagos, Nigeria'
    },
    {
      id: '2', 
      name: 'Chinedu Okwu',
      ethnic: 'Igbo Traditional Wear',
      category: 'Igbo',
      image: '/images/children/Stunning Igbo boy.png',
      votes: 1545,
      views: 5800,
      rank: 2,
      description: 'Stunning Igbo cultural heritage display',
      location: 'Enugu, Nigeria'
    },
    {
      id: '3',
      name: 'Osasu Osagie',
      ethnic: 'Edo Cultural Heritage',
      category: 'Edo',
      image: '/images/children/Stunning Edo child.png',
      votes: 1423,
      views: 5450,
      rank: 3,
      description: 'Elegant Edo traditional attire showcase',
      location: 'Benin City, Nigeria'
    },
    {
      id: '4',
      name: 'Ocholi Adamu',
      ethnic: 'Igala Royal Attire',
      category: 'Igala',
      image: '/images/children/Stunning Igala child.png',
      votes: 1312,
      views: 4900,
      rank: 4,
      description: 'Regal Igala traditional royal attire',
      location: 'Kogi, Nigeria'
    },
    {
      id: '5',
      name: 'Ene Ochoga',
      ethnic: 'Idoma Traditional Style',
      category: 'Idoma',
      image: '/images/children/stunning Idoma child.png',
      votes: 1198,
      views: 4650,
      rank: 5,
      description: 'Beautiful Idoma cultural expression',
      location: 'Benue, Nigeria'
    },
    {
      id: '6',
      name: 'Tersoo Aondo',
      ethnic: 'Tiv Cultural Dress',
      category: 'Tiv',
      image: '/images/children/stunning Tiv child.png',
      votes: 1087,
      views: 4200,
      rank: 6,
      description: 'Traditional Tiv cultural attire',
      location: 'Benue, Nigeria'
    }
  ];

  useEffect(() => {
    setContestants(sampleContestants);
    
    // Check if user came from voting button with specific vote type
    const searchParams = new URLSearchParams(location.search);
    const voteType = searchParams.get('vote');
    if (voteType) {
      setActiveTab('browse');
      toast(`Ready to vote! You can use ${voteType} voting power.`, {
        icon: '🗳️',
        style: {
          background: '#3B82F6',
          color: '#fff',
        },
      });
    }
  }, [location]);

  // Filter and sort contestants
  const filteredAndSortedContestants = contestants
    .filter(contestant => {
      const matchesSearch = contestant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           contestant.ethnic.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || contestant.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'votes':
          return b.votes - a.votes;
        case 'views':
          return b.views - a.views;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const categories = ['all', 'Yoruba', 'Igbo', 'Edo', 'Igala', 'Idoma', 'Tiv'];
  const sortOptions = [
    { value: 'votes', label: 'Most Votes' },
    { value: 'views', label: 'Most Views' },
    { value: 'name', label: 'Name A-Z' }
  ];

  const handleVoteSuccess = (contestant, votesCount) => {
    // Update contestant votes in local state
    setContestants(prev => 
      prev.map(c => 
        c.id === contestant.id 
          ? { ...c, votes: c.votes + votesCount }
          : c
      )
    );
    setShowVotingModal(false);
  };

  const openVotingModal = (contestant) => {
    setSelectedContestant(contestant);
    setShowVotingModal(true);
  };

  const tabs = [
    { id: 'browse', label: 'Browse & Vote', icon: Eye },
    { id: 'submit', label: 'Submit Entry', icon: Trophy }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary-green to-secondary-green text-white py-16">
        <div className="page-container">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-display font-bold mb-4"
              >
                Nigerian Traditional Attire Contest
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-green-100 max-w-2xl"
              >
                Vote for your favorite cultural ambassadors and submit your own entry
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <VoteBalanceWidget />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white shadow-sm sticky top-0 z-30">
        <div className="page-container">
          <div className="flex items-center space-x-8 py-4">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300
                    ${activeTab === tab.id 
                      ? 'bg-primary-green text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Area */}
      <div className="page-container py-8">
        {activeTab === 'browse' ? (
          <div className="space-y-8">
            {/* Search and Filter Controls */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="grid md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search contestants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>

                {/* Sort Options */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* View Mode Toggle */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${
                      viewMode === 'grid' ? 'bg-primary-green text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${
                      viewMode === 'list' ? 'bg-primary-green text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Contestants Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAndSortedContestants.map((contestant, index) => (
                  <motion.div
                    key={contestant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src={contestant.image}
                        alt={contestant.name}
                        className="w-full h-64 object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1594736797933-d0eeaa4d6689?w=400&h=600&fit=crop';
                        }}
                      />
                      <div className="absolute top-4 left-4">
                        <div className="bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                          #{contestant.rank}
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-black bg-opacity-50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{contestant.views.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{contestant.name}</h3>
                      <p className="text-gray-600 mb-1">{contestant.ethnic}</p>
                      <p className="text-sm text-gray-500 mb-4">{contestant.location}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Heart className="w-5 h-5 text-red-500 fill-current" />
                          <span className="font-bold text-gray-900">{contestant.votes.toLocaleString()}</span>
                          <span className="text-gray-500 text-sm">votes</span>
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                          <Share2 className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => openVotingModal(contestant)}
                        className="w-full bg-gradient-to-r from-primary-green to-secondary-green text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <Heart className="w-5 h-5" />
                        <span>Vote Now</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAndSortedContestants.map((contestant, index) => (
                  <motion.div
                    key={contestant.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <img
                          src={contestant.image}
                          alt={contestant.name}
                          className="w-24 h-24 object-cover rounded-xl"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1594736797933-d0eeaa4d6689?w=400&h=600&fit=crop';
                          }}
                        />
                        <div className="absolute -top-2 -left-2 bg-primary-green text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                          #{contestant.rank}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{contestant.name}</h3>
                        <p className="text-gray-600 mb-1">{contestant.ethnic}</p>
                        <p className="text-sm text-gray-500">{contestant.location}</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{contestant.votes.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">votes</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-700">{contestant.views.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">views</div>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openVotingModal(contestant)}
                        className="bg-gradient-to-r from-primary-green to-secondary-green text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                      >
                        <Heart className="w-4 h-4" />
                        <span>Vote</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* No Results */}
            {filteredAndSortedContestants.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No contestants found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <SubmissionForm />
          </div>
        )}
      </div>

      {/* Voting Modal */}
      {showVotingModal && selectedContestant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Cast Your Vote</h2>
                <button
                  onClick={() => setShowVotingModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <VotingInterface
                contestant={selectedContestant}
                onVoteSuccess={handleVoteSuccess}
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Contest;
