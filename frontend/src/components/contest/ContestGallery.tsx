import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Heart, 
  Eye, 
  Crown, 
  Star, 
  MapPin, 
  Calendar,
  Sparkles,
  ChevronDown,
  Grid3X3,
  Grid,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ContestEntry {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  images: string[];
  author: {
    name: string;
    avatar: string;
    location: string;
  };
  votes: number;
  views: number;
  createdAt: string;
  hasVoted: boolean;
}

// Mock data for contest entries
const mockEntries: ContestEntry[] = [
  {
    id: '1',
    title: 'Royal Blue Agbada with Golden Embroidery',
    description: 'A magnificent traditional Agbada worn during special ceremonies, featuring intricate golden embroidery that represents the rich heritage of Yoruba culture.',
    category: 'agbada',
    location: 'Lagos, Nigeria',
    images: ['/api/placeholder/400/600', '/api/placeholder/400/600'],
    author: {
      name: 'Adunni Okafor',
      avatar: '👸🏾',
      location: 'Lagos, Nigeria',
    },
    votes: 234,
    views: 1240,
    createdAt: '2024-01-15',
    hasVoted: false,
  },
  {
    id: '2',
    title: 'Vibrant Ankara Dress with Traditional Patterns',
    description: 'This stunning Ankara dress showcases the beautiful geometric patterns that tell stories of our ancestors and celebrate African creativity.',
    category: 'ankara',
    location: 'Abuja, Nigeria',
    images: ['/api/placeholder/400/600'],
    author: {
      name: 'Kemi Adeleke',
      avatar: '🤱🏾',
      location: 'Abuja, Nigeria',
    },
    votes: 189,
    views: 890,
    createdAt: '2024-01-14',
    hasVoted: true,
  },
  {
    id: '3',
    title: 'Traditional Gele Head Wrap Artistry',
    description: 'The art of Gele tying passed down through generations, representing elegance, beauty, and the strength of Nigerian women.',
    category: 'gele',
    location: 'Ibadan, Nigeria',
    images: ['/api/placeholder/400/600', '/api/placeholder/400/600', '/api/placeholder/400/600'],
    author: {
      name: 'Folake Adebayo',
      avatar: '👩🏾',
      location: 'Ibadan, Nigeria',
    },
    votes: 156,
    views: 650,
    createdAt: '2024-01-13',
    hasVoted: false,
  },
  {
    id: '4',
    title: 'Colorful Dashiki with Symbolic Motifs',
    description: 'Each symbol on this Dashiki tells a story of courage, wisdom, and unity. Worn with pride to honor our cultural heritage.',
    category: 'dashiki',
    location: 'Port Harcourt, Nigeria',
    images: ['/api/placeholder/400/600'],
    author: {
      name: 'Emeka Nwosu',
      avatar: '👨🏾',
      location: 'Port Harcourt, Nigeria',
    },
    votes: 203,
    views: 1100,
    createdAt: '2024-01-12',
    hasVoted: false,
  },
  {
    id: '5',
    title: 'Elegant Iro and Buba Ensemble',
    description: 'The classic Yoruba traditional wear combining the wrapper (Iro) and blouse (Buba) in perfect harmony of colors and patterns.',
    category: 'iro-buba',
    location: 'Osun, Nigeria',
    images: ['/api/placeholder/400/600', '/api/placeholder/400/600'],
    author: {
      name: 'Yetunde Oba',
      avatar: '👑',
      location: 'Osun, Nigeria',
    },
    votes: 178,
    views: 720,
    createdAt: '2024-01-11',
    hasVoted: false,
  },
];

const categories = [
  { value: 'all', label: 'All Categories', emoji: '🎭' },
  { value: 'agbada', label: 'Agbada', emoji: '👑' },
  { value: 'ankara', label: 'Ankara', emoji: '🎭' },
  { value: 'gele', label: 'Gele', emoji: '👸' },
  { value: 'dashiki', label: 'Dashiki', emoji: '🌟' },
  { value: 'iro-buba', label: 'Iro & Buba', emoji: '💎' },
  { value: 'kaftan', label: 'Kaftan', emoji: '✨' },
];

const sortOptions = [
  { value: 'votes', label: 'Most Voted' },
  { value: 'recent', label: 'Most Recent' },
  { value: 'views', label: 'Most Viewed' },
];

const ContestGallery: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [entries, setEntries] = useState<ContestEntry[]>(mockEntries);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('votes');
  const [viewMode, setViewMode] = useState<'grid' | 'large'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<ContestEntry | null>(null);

  const filteredAndSortedEntries = useMemo(() => {
    let filtered = entries;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(entry => 
        entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(entry => entry.category === selectedCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'votes':
          return b.votes - a.votes;
        case 'recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'views':
          return b.views - a.views;
        default:
          return 0;
      }
    });

    return filtered;
  }, [entries, searchTerm, selectedCategory, sortBy]);

  const handleVote = async (entryId: string) => {
    if (!isAuthenticated) {
      alert('Please sign in to vote!');
      return;
    }

    setEntries(prev => prev.map(entry => {
      if (entry.id === entryId) {
        return {
          ...entry,
          votes: entry.hasVoted ? entry.votes - 1 : entry.votes + 1,
          hasVoted: !entry.hasVoted,
        };
      }
      return entry;
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
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
            <Crown className="w-10 h-10 text-secondary-gold" />
          </motion.div>
          <Sparkles className="w-6 h-6 text-secondary-gold" />
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
            <Crown className="w-10 h-10 text-secondary-gold" />
          </motion.div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-green mb-4">
          Contest Gallery
        </h1>
        <div className="flex items-center justify-center space-x-1 text-secondary-gold text-lg mb-6">
          <Star className="w-4 h-4 fill-current" />
          <span>Stunning Collection of Nigerian Traditional Attire</span>
          <Star className="w-4 h-4 fill-current" />
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field pr-8 appearance-none cursor-pointer"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.emoji} {category.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field pr-8 appearance-none cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* View Mode */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-primary-green text-white' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('large')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'large' 
                    ? 'bg-primary-green text-white' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredAndSortedEntries.length} {filteredAndSortedEntries.length === 1 ? 'entry' : 'entries'}
        </div>
      </motion.div>

      {/* Gallery Grid */}
      <motion.div
        layout
        className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1 lg:grid-cols-2'
        }`}
      >
        <AnimatePresence>
          {filteredAndSortedEntries.map((entry, index) => (
            <motion.div
              key={entry.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="card overflow-hidden group cursor-pointer"
              onClick={() => setSelectedEntry(entry)}
            >
              {/* Image */}
              <div className={`relative ${viewMode === 'grid' ? 'aspect-[3/4]' : 'aspect-[4/3]'} overflow-hidden`}>
                <img
                  src={entry.images[0]}
                  alt={entry.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Image count */}
                {entry.images.length > 1 && (
                  <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-sm flex items-center space-x-1">
                    <Camera className="w-3 h-3" />
                    <span>{entry.images.length}</span>
                  </div>
                )}

                {/* Quick actions */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVote(entry.id);
                    }}
                    className={`p-2 rounded-full shadow-lg transition-colors duration-200 ${
                      entry.hasVoted 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${entry.hasVoted ? 'fill-current' : ''}`} />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category badge */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-2 py-1 bg-primary-green text-white text-xs font-medium rounded-full">
                    {categories.find(c => c.value === entry.category)?.emoji} {' '}
                    {categories.find(c => c.value === entry.category)?.label || entry.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {entry.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {entry.description}
                </p>

                {/* Author */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-green to-secondary-green rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {entry.author.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{entry.author.name}</p>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{entry.author.location}</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Heart className={`w-4 h-4 ${entry.hasVoted ? 'text-red-500 fill-current' : ''}`} />
                      <span>{entry.votes}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Eye className="w-4 h-4" />
                      <span>{entry.views}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No results */}
      {filteredAndSortedEntries.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No entries found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </motion.div>
      )}

      {/* Entry Modal */}
      <AnimatePresence>
        {selectedEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEntry(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedEntry(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image carousel */}
              <div className="aspect-[4/3] bg-gray-100">
                <img
                  src={selectedEntry.images[0]}
                  alt={selectedEntry.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="px-3 py-1 bg-primary-green text-white text-sm font-medium rounded-full">
                        {categories.find(c => c.value === selectedEntry.category)?.emoji} {' '}
                        {categories.find(c => c.value === selectedEntry.category)?.label || selectedEntry.category}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedEntry.title}</h2>
                    <p className="text-gray-600 text-lg leading-relaxed">{selectedEntry.description}</p>
                  </div>
                </div>

                {/* Author and stats */}
                <div className="flex items-center justify-between py-6 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-green to-secondary-green rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {selectedEntry.author.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{selectedEntry.author.name}</p>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedEntry.author.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleVote(selectedEntry.id)}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-colors duration-200 ${
                        selectedEntry.hasVoted 
                          ? 'bg-red-500 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${selectedEntry.hasVoted ? 'fill-current' : ''}`} />
                      <span>{selectedEntry.votes}</span>
                    </motion.button>
                    
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Eye className="w-5 h-5" />
                      <span>{selectedEntry.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContestGallery;