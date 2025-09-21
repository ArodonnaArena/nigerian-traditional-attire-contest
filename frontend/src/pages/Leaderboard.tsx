import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Crown, Star, Sparkles, TrendingUp, Eye, Heart, MapPin } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  location: string;
  votes: number;
  prize: string;
  position: number;
  image: string;
  category: string;
  trend: 'up' | 'down' | 'same';
}

const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: '1',
    name: 'Adunni Okafor',
    avatar: '👸🏾',
    location: 'Lagos, Nigeria',
    votes: 2543,
    prize: '₦500,000',
    position: 1,
    image: '/api/placeholder/300/400',
    category: 'Agbada',
    trend: 'up',
  },
  {
    id: '2',
    name: 'Emeka Nwosu',
    avatar: '👨🏾',
    location: 'Port Harcourt, Nigeria',
    votes: 2401,
    prize: '₦300,000',
    position: 2,
    image: '/api/placeholder/300/400',
    category: 'Dashiki',
    trend: 'same',
  },
  {
    id: '3',
    name: 'Kemi Adeleke',
    avatar: '🤱🏾',
    location: 'Abuja, Nigeria',
    votes: 2289,
    prize: '₦200,000',
    position: 3,
    image: '/api/placeholder/300/400',
    category: 'Ankara',
    trend: 'up',
  },
  {
    id: '4',
    name: 'Yetunde Oba',
    avatar: '👑',
    location: 'Osun, Nigeria',
    votes: 1876,
    prize: '₦150,000',
    position: 4,
    image: '/api/placeholder/300/400',
    category: 'Iro & Buba',
    trend: 'down',
  },
  {
    id: '5',
    name: 'Folake Adebayo',
    avatar: '👩🏾',
    location: 'Ibadan, Nigeria',
    votes: 1654,
    prize: '₦100,000',
    position: 5,
    image: '/api/placeholder/300/400',
    category: 'Gele',
    trend: 'up',
  },
];

const Leaderboard = () => {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>(mockLeaderboard);
  const [selectedView, setSelectedView] = useState<'top10' | 'all'>('top10');

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLeaders(prev => 
        prev.map(leader => ({
          ...leader,
          votes: leader.votes + Math.floor(Math.random() * 3),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getPrizeColor = (position: number) => {
    switch (position) {
      case 1:
        return 'text-yellow-500';
      case 2:
        return 'text-gray-400';
      case 3:
        return 'text-yellow-600';
      default:
        return 'text-primary-green';
    }
  };

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="w-8 h-8 text-yellow-500" />;
      case 2:
        return <Medal className="w-8 h-8 text-gray-400" />;
      case 3:
        return <Medal className="w-8 h-8 text-yellow-600" />;
      default:
        return (
          <div className="w-8 h-8 bg-gradient-to-br from-primary-green to-secondary-green rounded-full flex items-center justify-center text-white font-bold text-lg">
            {position}
          </div>
        );
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default:
        return <div className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="page-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mr-3"
            >
              <Crown className="w-12 h-12 text-secondary-gold" />
            </motion.div>
            <Sparkles className="w-8 h-8 text-secondary-gold" />
            <motion.div
              animate={{
                rotate: -360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
              className="ml-3"
            >
              <Crown className="w-12 h-12 text-secondary-gold" />
            </motion.div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-green mb-4">
            Contest Leaderboard
          </h1>
          <div className="flex items-center justify-center space-x-1 text-secondary-gold text-lg mb-6">
            <Star className="w-4 h-4 fill-current" />
            <span>Current Contest Standings</span>
            <Star className="w-4 h-4 fill-current" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Vote for your favorite traditional attire and see the live rankings! 
            Winners will be announced at the end of the contest period.
          </p>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Second Place */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="order-2 md:order-1"
            >
              <div className="card overflow-hidden">
                <div className="relative">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={leaders[1]?.image}
                      alt={leaders[1]?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-3 left-3">
                    <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center shadow-lg">
                      <Medal className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
                    {leaders[1]?.category}
                  </div>
                </div>
                <div className="p-6 text-center">
                  <div className="text-3xl mb-2">{leaders[1]?.avatar}</div>
                  <h3 className="font-bold text-lg mb-1">{leaders[1]?.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 flex items-center justify-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{leaders[1]?.location}</span>
                  </p>
                  <div className="text-2xl font-bold text-gray-400 mb-1">{leaders[1]?.votes?.toLocaleString()} votes</div>
                  <div className="text-lg font-semibold text-gray-400">{leaders[1]?.prize}</div>
                </div>
              </div>
            </motion.div>

            {/* First Place */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="order-1 md:order-2 transform md:scale-110 z-10"
            >
              <div className="card overflow-hidden border-4 border-yellow-400 shadow-2xl">
                <div className="relative">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={leaders[0]?.image}
                      alt={leaders[0]?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-3 left-3">
                    <motion.div
                      animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Crown className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>WINNER</span>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
                    {leaders[0]?.category}
                  </div>
                </div>
                <div className="p-6 text-center bg-gradient-to-b from-yellow-50 to-white">
                  <div className="text-4xl mb-2">{leaders[0]?.avatar}</div>
                  <h3 className="font-bold text-xl mb-1">{leaders[0]?.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 flex items-center justify-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{leaders[0]?.location}</span>
                  </p>
                  <div className="text-3xl font-bold text-yellow-500 mb-1">{leaders[0]?.votes?.toLocaleString()} votes</div>
                  <div className="text-xl font-semibold text-yellow-500">{leaders[0]?.prize}</div>
                </div>
              </div>
            </motion.div>

            {/* Third Place */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="order-3 md:order-3"
            >
              <div className="card overflow-hidden">
                <div className="relative">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={leaders[2]?.image}
                      alt={leaders[2]?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-3 left-3">
                    <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                      <Medal className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
                    {leaders[2]?.category}
                  </div>
                </div>
                <div className="p-6 text-center">
                  <div className="text-3xl mb-2">{leaders[2]?.avatar}</div>
                  <h3 className="font-bold text-lg mb-1">{leaders[2]?.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 flex items-center justify-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{leaders[2]?.location}</span>
                  </p>
                  <div className="text-2xl font-bold text-yellow-600 mb-1">{leaders[2]?.votes?.toLocaleString()} votes</div>
                  <div className="text-lg font-semibold text-yellow-600">{leaders[2]?.prize}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4 max-w-6xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Complete Rankings</h2>
          
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -2, scale: 1.01 }}
              className={`card p-6 flex items-center space-x-6 transition-all duration-200 ${
                leader.position <= 3 
                  ? `bg-gradient-to-r ${leader.position === 1 
                      ? 'from-yellow-50 to-yellow-100 border-2 border-yellow-400' 
                      : leader.position === 2 
                      ? 'from-gray-50 to-gray-100 border-2 border-gray-400' 
                      : 'from-yellow-50/50 to-yellow-100/50 border-2 border-yellow-300'
                    } shadow-lg` 
                  : 'hover:shadow-lg'
              }`}
            >
              {/* Position & Image */}
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {getPositionIcon(leader.position)}
                </div>
                <div className="w-16 h-16 rounded-full overflow-hidden shadow-md">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-1">
                  <h3 className="text-xl font-bold text-gray-900 truncate">{leader.name}</h3>
                  <div className="text-2xl">{leader.avatar}</div>
                  {getTrendIcon(leader.trend)}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{leader.location}</span>
                  </div>
                  <span className="bg-primary-green text-white px-2 py-1 rounded-full text-xs font-medium">
                    {leader.category}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="text-right space-y-1">
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getPrizeColor(leader.position)}`}>
                      {leader.votes.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">votes</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-bold ${getPrizeColor(leader.position)}`}>
                      {leader.prize}
                    </div>
                    <div className="text-sm text-gray-600">prize</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contest Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-16 text-center"
        >
          <div className="card p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Contest Information</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-green">{leaders.length}</div>
                <div className="text-gray-600">Total Participants</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-green">
                  {leaders.reduce((sum, leader) => sum + leader.votes, 0).toLocaleString()}
                </div>
                <div className="text-gray-600">Total Votes Cast</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-green">₦1.5M</div>
                <div className="text-gray-600">Total Prize Money</div>
              </div>
            </div>
            <p className="text-gray-600 mt-6">
              Voting closes in 5 days. Make sure to vote for your favorite traditional attire!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;
