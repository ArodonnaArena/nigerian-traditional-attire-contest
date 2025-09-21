import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Crown, Star, Sparkles, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../auth/AuthModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const navigation = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Contest', href: '/contest', icon: '🎭' },
    { name: 'Gallery', href: '/gallery', icon: '🖼️' },
    { name: 'Leaderboard', href: '/leaderboard', icon: '🏆' },
    { name: 'About', href: '/about', icon: 'ℹ️' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-green-100'
          : 'bg-transparent'
      }`}
    >
      <div className="page-container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary-green to-secondary-green rounded-full flex items-center justify-center shadow-lg">
                <Crown className="w-6 h-6 text-secondary-gold" />
              </div>
              {/* Sparkle effect */}
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className="w-4 h-4 text-secondary-gold" />
              </motion.div>
            </motion.div>
            <div className="hidden sm:block">
              <motion.h1
                whileHover={{ scale: 1.05 }}
                className="text-xl lg:text-2xl font-display font-bold bg-gradient-to-r from-primary-green to-secondary-green bg-clip-text text-transparent"
              >
                Nigerian Traditional Attire Contest
              </motion.h1>
              <div className="flex items-center space-x-1 text-xs text-secondary-gold font-medium">
                <Star className="w-3 h-3 fill-current" />
                <span>Celebrating Heritage</span>
                <Star className="w-3 h-3 fill-current" />
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="relative group"
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    location.pathname === item.href
                      ? 'bg-gradient-to-r from-primary-green to-secondary-green text-white shadow-lg'
                      : 'text-gray-700 hover:text-primary-green hover:bg-green-50'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.name}</span>
                  {location.pathname === item.href && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-primary-green to-secondary-green rounded-full -z-10"
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 bg-gradient-to-r from-primary-green/10 to-secondary-green/10 hover:from-primary-green/20 hover:to-secondary-green/20 px-4 py-2 rounded-full transition-all duration-200 border border-primary-green/20"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-green to-secondary-green rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user?.avatar || user?.firstName?.charAt(0) || 'U'}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-primary-green">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.submissions || 0} submissions
                    </p>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                    >
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-primary-green transition-colors duration-200"
                      >
                        <User className="w-4 h-4" />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        to="/contest"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-primary-green transition-colors duration-200"
                      >
                        <Crown className="w-4 h-4" />
                        <span>My Submissions</span>
                      </Link>
                      {user?.isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-primary-green transition-colors duration-200"
                        >
                          <Star className="w-4 h-4" />
                          <span>Admin Panel</span>
                        </Link>
                      )}
                      <hr className="my-2 border-gray-100" />
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAuthModal(true)}
                className="bg-gradient-to-r from-secondary-gold to-yellow-400 text-gray-800 font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
              >
                <Crown className="w-4 h-4" />
                <span>Join Contest</span>
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-gradient-to-r from-primary-green to-secondary-green text-white shadow-lg"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2 bg-white/95 backdrop-blur-lg rounded-b-2xl shadow-xl border-t border-green-100 mt-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-6 py-3 text-base font-medium transition-all duration-200 ${
                        location.pathname === item.href
                          ? 'bg-gradient-to-r from-primary-green to-secondary-green text-white shadow-md mx-4 rounded-xl'
                          : 'text-gray-700 hover:text-primary-green hover:bg-green-50 mx-4 rounded-xl'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navigation.length * 0.1 }}
                  className="px-6 pt-4"
                >
                  <button className="w-full bg-gradient-to-r from-secondary-gold to-yellow-400 text-gray-800 font-semibold px-6 py-3 rounded-full shadow-lg flex items-center justify-center space-x-2">
                    <Crown className="w-4 h-4" />
                    <span>Join Contest</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="login"
      />
    </motion.header>
  );
};

export default Header;
