import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { 
  Crown, 
  Star, 
  Users, 
  Trophy, 
  Camera, 
  Sparkles, 
  ArrowRight, 
  Play, 
  Heart, 
  Eye, 
  Award,
  Shield,
  Zap,
  Globe,
  CheckCircle,
  TrendingUp,
  Calendar,
  MapPin,
  Quote
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  // Handler functions for button clicks
  const handleJoinContest = () => {
    toast.success('🎉 Redirecting to Contest Page!');
    setTimeout(() => {
      navigate('/contest');
    }, 500);
  };

  const handleWatchDemo = () => {
    toast.success('📺 Scrolling to features demo!');
    // For now, scroll to features section or open a modal
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleVoting = (voteType) => {
    const voteTypeText = voteType.charAt(0).toUpperCase() + voteType.slice(1);
    toast.success(`🗳️ Redirecting to ${voteTypeText} Voting!`);
    // Navigate to contest page with vote type parameter
    setTimeout(() => {
      navigate(`/contest?vote=${voteType}`);
    }, 500);
  };

  const handleViewAllVotingOptions = () => {
    toast.success('👀 Viewing all voting options!');
    setTimeout(() => {
      navigate('/contest');
    }, 500);
  };

  const handleLearnMore = () => {
    toast.success('📚 Learning more about our culture!');
    setTimeout(() => {
      navigate('/about');
    }, 500);
  };

  // Image component with fallback handling
  const ImageWithFallback = ({ src, fallback, alt, className, ...props }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);

    const handleError = () => {
      setImgSrc(fallback);
    };

    const handleLoad = () => {
      setIsLoading(false);
    };

    return (
      <div className={`relative overflow-hidden ${className}`}>
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-400">Loading...</div>
          </div>
        )}
        <img
          src={imgSrc}
          alt={alt}
          onError={handleError}
          onLoad={handleLoad}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          {...props}
        />
      </div>
    );
  };

  const features = [
    {
      icon: Crown,
      title: 'Premium Contest Platform',
      description: 'State-of-the-art platform designed specifically for showcasing Nigerian traditional attire with advanced voting systems.',
      color: 'text-secondary-gold'
    },
    {
      icon: Shield,
      title: 'Secure & Fair Judging',
      description: 'Transparent judging process with blockchain-verified voting to ensure fairness and authenticity in every contest.',
      color: 'text-green-600'
    },
    {
      icon: Globe,
      title: 'Global Nigerian Community',
      description: 'Connect with Nigerians worldwide and celebrate our rich cultural heritage through traditional fashion.',
      color: 'text-blue-600'
    },
    {
      icon: Zap,
      title: 'Instant Recognition',
      description: 'Get instant feedback and recognition from the community with real-time voting and engagement features.',
      color: 'text-purple-600'
    },
  ];

  const testimonials = [
    {
      name: 'Adunni Okafor',
      location: 'Lagos, Nigeria',
      title: 'Fashion Designer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      text: 'This platform has revolutionized how we celebrate Nigerian fashion. The community engagement is incredible!',
      rating: 5
    },
    {
      name: 'Dr. Emeka Nwosu',
      location: 'Abuja, Nigeria',
      title: 'Cultural Historian',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      text: 'A beautiful way to preserve and promote our traditional attire. Every Nigerian should participate in this cultural celebration.',
      rating: 5
    },
    {
      name: 'Kemi Adeleke',
      location: 'London, UK',
      title: 'Diaspora Community Leader',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      text: 'Perfect platform for diaspora Nigerians to stay connected with our roots and showcase our heritage with pride.',
      rating: 5
    }
  ];

  const galleryItems = [
    { id: 1, image: '/images/children/Stunning Yoruba child.png', category: 'Yoruba', votes: 1834, views: 6200, title: 'Stunning Yoruba Child', ethnic: 'Yoruba Traditional Attire', fallback: 'https://images.unsplash.com/photo-1594736797933-d0eeaa4d6689?w=400&h=600&fit=crop' },
    { id: 2, image: '/images/children/Stunning Igbo boy.png', category: 'Igbo', votes: 1545, views: 5800, title: 'Stunning Igbo Boy', ethnic: 'Igbo Traditional Wear', fallback: 'https://images.unsplash.com/photo-1583391733956-6c6b8b6d2b67?w=400&h=600&fit=crop' },
    { id: 3, image: '/images/children/Stunning Hausa Child.png', category: 'Hausa', votes: 1698, views: 5950, title: 'Stunning Hausa Child', ethnic: 'Hausa Traditional Attire', fallback: 'https://images.unsplash.com/photo-1596265371388-43edbaadab94?w=400&h=600&fit=crop' },
    { id: 4, image: '/images/children/Stunning Edo child.png', category: 'Edo', votes: 1423, views: 5450, title: 'Stunning Edo Child', ethnic: 'Edo Cultural Heritage', fallback: 'https://images.unsplash.com/photo-1596265371388-43edbaadab94?w=400&h=600&fit=crop' },
    { id: 5, image: '/images/children/Stunning Igala child.png', category: 'Igala', votes: 1312, views: 4900, title: 'Stunning Igala Child', ethnic: 'Igala Royal Attire', fallback: 'https://images.unsplash.com/photo-1586240847919-ef5c31a4f27a?w=400&h=600&fit=crop' },
    { id: 6, image: '/images/children/Stunning Ebira Child.png', category: 'Ebira', votes: 1276, views: 4750, title: 'Stunning Ebira Child', ethnic: 'Ebira Cultural Heritage', fallback: 'https://images.unsplash.com/photo-1595777216528-85038c02d1ea?w=400&h=600&fit=crop' },
    { id: 7, image: '/images/children/stunning Fulani child.png', category: 'Fulani', votes: 1254, views: 4680, title: 'Stunning Fulani Child', ethnic: 'Fulani Traditional Style', fallback: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?w=400&h=600&fit=crop' },
    { id: 8, image: '/images/children/stunning Idoma child.png', category: 'Idoma', votes: 1198, views: 4650, title: 'Stunning Idoma Child', ethnic: 'Idoma Traditional Style', fallback: 'https://images.unsplash.com/photo-1595777216528-85038c02d1ea?w=400&h=600&fit=crop' },
    { id: 9, image: '/images/children/stunning Tiv child.png', category: 'Tiv', votes: 1087, views: 4200, title: 'Stunning Tiv Child', ethnic: 'Tiv Cultural Dress', fallback: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?w=400&h=600&fit=crop' }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Register & Create Profile',
      description: 'Sign up and create your contestant profile with your cultural background and fashion interests.',
      icon: Users
    },
    {
      step: '02', 
      title: 'Upload Your Attire',
      description: 'Submit high-quality photos of your traditional Nigerian attire with detailed descriptions.',
      icon: Camera
    },
    {
      step: '03',
      title: 'Community Voting',
      description: 'Engage with the community as they vote and provide feedback on your cultural fashion.',
      icon: Heart
    },
    {
      step: '04',
      title: 'Win Amazing Prizes',
      description: 'Top participants receive cash prizes, fashion vouchers, and cultural experience packages.',
      icon: Trophy
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full-Page Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/images/children/Hero-image.png"
            fallback="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop"
            alt="Nigerian Children in Traditional Attire - Cultural Heritage Contest"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50"></div>
        
        {/* Additional overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-green/20 via-transparent to-secondary-gold/20"></div>
        
        <div className="page-container relative z-20">
          <div className="text-center space-y-12">
            {/* Logo/Crown animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex items-center justify-center space-x-4 mb-8"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="filter drop-shadow-2xl"
              >
                <Crown className="w-20 h-20 text-secondary-gold" />
              </motion.div>
              <Sparkles className="w-10 h-10 text-white drop-shadow-lg" />
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="relative">
                {/* Text background for better readability */}
                <div className="absolute inset-0 bg-black/30 rounded-3xl blur-2xl"></div>
                
                <h1 className="relative text-5xl md:text-7xl lg:text-8xl font-display font-black leading-tight text-white drop-shadow-2xl">
                  Nigerian Traditional
                  <br />
                  <span className="bg-gradient-to-r from-secondary-gold via-yellow-300 to-secondary-gold bg-clip-text text-transparent">
                    Attire Contest
                  </span>
                </h1>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="relative"
              >
                {/* Background for subtitle */}
                <div className="absolute inset-0 bg-black/20 rounded-2xl blur-xl"></div>
                
                <p className="relative text-xl md:text-3xl text-white max-w-4xl mx-auto leading-relaxed font-light drop-shadow-lg">
                  ✨ Celebrate the rich heritage of Nigeria through our prestigious traditional attire contest.
                  <br className="hidden md:block" />
                  <span className="text-secondary-gold font-medium">Join thousands showcasing the beauty of our cultural fashion!</span> 🇳🇬
                </p>
              </motion.div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8"
            >
              <motion.button
                whileHover={{ scale: 1.08, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleJoinContest}
                className="bg-gradient-to-r from-secondary-gold via-yellow-400 to-secondary-gold text-gray-900 font-bold px-10 py-5 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-3 text-lg backdrop-blur-sm border-2 border-white/30 cursor-pointer"
              >
                <Trophy className="w-6 h-6" />
                <span>Join Contest Now</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWatchDemo}
                className="border-3 border-white text-white hover:bg-white hover:text-gray-900 font-bold px-10 py-5 rounded-full transition-all duration-300 flex items-center space-x-3 text-lg backdrop-blur-sm bg-white/10 shadow-xl hover:shadow-2xl cursor-pointer"
              >
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </motion.button>
            </motion.div>
            
            {/* Scroll Down Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center space-y-2 text-white/80 cursor-pointer hover:text-white transition-colors"
              >
                <span className="text-sm font-medium">Discover More</span>
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1 h-3 bg-white/70 rounded-full mt-2"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Floating sparkle elements for hero */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full shadow-lg"
            animate={{
              y: [-30, -100],
              x: [0, Math.random() * 80 - 40],
              opacity: [0.8, 0, 0.8],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(0.5px)',
            }}
          />
        ))}
        
        {/* Golden sparkle elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`gold-${i}`}
            className="absolute w-2 h-2 bg-secondary-gold rounded-full shadow-xl"
            animate={{
              y: [-20, -60],
              x: [0, Math.random() * 60 - 30],
              opacity: [0.6, 0, 0.6],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </section>


      {/* Cultural Diversity Showcase */}
      <section className="py-16 bg-gradient-to-br from-primary-green/5 via-secondary-gold/5 to-primary-green/5">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Celebrating Nigeria's Rich Cultural Diversity
              <span className="block text-lg font-normal text-primary-green mt-2">30+ Major Ethnic Groups</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nigeria is home to over 250 ethnic groups! Our contest celebrates the beautiful diversity of traditional attire 
              across the major tribes from the North, Middle Belt, West, East, and South regions of our great nation.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {[
              // Major Tribes - Northern Nigeria
              { name: 'Hausa', color: 'bg-emerald-600', pattern: '🕌', region: 'North' },
              { name: 'Fulani', color: 'bg-amber-600', pattern: '🐄', region: 'North' },
              { name: 'Kanuri', color: 'bg-indigo-600', pattern: '🏜️', region: 'North' },
              { name: 'Nupe', color: 'bg-teal-600', pattern: '🎵', region: 'North' },
              { name: 'Gbagyi', color: 'bg-rose-600', pattern: '🌿', region: 'North' },
              { name: 'Berom', color: 'bg-violet-600', pattern: '⛰️', region: 'North' },
              { name: 'Tiv', color: 'bg-orange-600', pattern: '🌾', region: 'North' },
              { name: 'Jukun', color: 'bg-cyan-600', pattern: '🎯', region: 'North' },
              
              // Major Tribes - Middle Belt
              { name: 'Idoma', color: 'bg-blue-600', pattern: '💎', region: 'Middle' },
              { name: 'Igala', color: 'bg-purple-600', pattern: '🌟', region: 'Middle' },
              { name: 'Ebira', color: 'bg-pink-600', pattern: '🎨', region: 'Middle' },
              { name: 'Bassa', color: 'bg-lime-600', pattern: '🍊', region: 'Middle' },
              { name: 'Gwari', color: 'bg-stone-600', pattern: '🪨', region: 'Middle' },
              { name: 'Koro', color: 'bg-slate-600', pattern: '🎶', region: 'Middle' },
              
              // Major Tribes - Western Nigeria
              { name: 'Yoruba', color: 'bg-red-600', pattern: '🏛️', region: 'West' },
              { name: 'Edo', color: 'bg-yellow-600', pattern: '👑', region: 'West' },
              { name: 'Urhobo', color: 'bg-green-700', pattern: '🛯', region: 'West' },
              { name: 'Isoko', color: 'bg-blue-700', pattern: '🌊', region: 'West' },
              { name: 'Itsekiri', color: 'bg-purple-700', pattern: '⚓', region: 'West' },
              { name: 'Esan', color: 'bg-orange-700', pattern: '🌽', region: 'West' },
              { name: 'Ibibio', color: 'bg-teal-700', pattern: '🌴', region: 'West' },
              
              // Major Tribes - Eastern Nigeria
              { name: 'Igbo', color: 'bg-green-600', pattern: '⚡', region: 'East' },
              { name: 'Efik', color: 'bg-indigo-700', pattern: '🌊', region: 'East' },
              { name: 'Annang', color: 'bg-rose-700', pattern: '🌺', region: 'East' },
              { name: 'Ekoi', color: 'bg-emerald-700', pattern: '🌲', region: 'East' },
              { name: 'Ogoni', color: 'bg-amber-700', pattern: '⛽', region: 'East' },
              { name: 'Kalabari', color: 'bg-cyan-700', pattern: '🎣', region: 'East' },
              { name: 'Okrika', color: 'bg-violet-700', pattern: '🚢', region: 'East' },
              { name: 'Ndokwa', color: 'bg-lime-700', pattern: '🌾', region: 'East' },
              
              // Additional Tribes
              { name: 'Ijaw', color: 'bg-sky-600', pattern: '🌊', region: 'South' },
              { name: 'Ogbia', color: 'bg-emerald-800', pattern: '🌴', region: 'South' },
              { name: 'Nembe', color: 'bg-blue-800', pattern: '🌊', region: 'South' },
              { name: 'Brass', color: 'bg-yellow-700', pattern: '🎺', region: 'South' },
              { name: 'Tangale', color: 'bg-red-700', pattern: '🏔️', region: 'North' },
              { name: 'Bachama', color: 'bg-orange-800', pattern: '🌾', region: 'North' },
              { name: 'Margi', color: 'bg-purple-800', pattern: '🍂', region: 'North' },
              { name: 'Bura', color: 'bg-green-800', pattern: '🌳', region: 'North' }
            ].map((group, index) => (
              <motion.div
                key={group.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.02 }}
                whileHover={{ scale: 1.08, y: -5 }}
                className="text-center group cursor-pointer bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className={`w-12 h-12 ${group.color} rounded-xl flex items-center justify-center text-white text-lg mx-auto mb-2 shadow-md group-hover:shadow-lg transition-all duration-300`}>
                  {group.pattern}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{group.name}</h3>
                <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{group.region}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the most comprehensive platform for celebrating Nigerian traditional fashion 
              with advanced features and a vibrant community.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 group"
              >
                <div className="mb-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.color} bg-gradient-to-br from-gray-50 to-gray-100 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our contest in four simple steps and showcase your traditional Nigerian attire to the world.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center group"
              >
                <div className="relative mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-green to-secondary-green text-white rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary-gold text-white text-sm font-bold rounded-full flex items-center justify-center shadow-md">
                    {step.step}
                  </div>
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full">
                      <ArrowRight className="w-6 h-6 text-gray-300 ml-4" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              Our Cultural Ambassadors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet our stunning young cultural ambassadors representing the rich diversity of Nigerian ethnic groups. 
              Each child beautifully showcases their traditional heritage through authentic cultural attire.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 group"
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <ImageWithFallback
                    src={item.image}
                    fallback={item.fallback}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span className="font-medium">{item.votes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span className="font-medium">{item.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-primary-green font-medium mb-3">{item.ethnic}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span>{item.votes} votes</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4 text-blue-500" />
                      <span>{item.views} views</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary-green to-secondary-green text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
            >
              <Camera className="w-5 h-5" />
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from our amazing participants who are celebrating Nigerian heritage through fashion.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 relative"
              >
                <div className="absolute top-6 right-6">
                  <Quote className="w-6 h-6 text-gray-300" />
                </div>
                
                <div className="flex items-start space-x-4 mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.title}</p>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Revolution Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="page-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Crown className="w-12 h-12 text-secondary-gold" />
                </motion.div>
                <Sparkles className="w-8 h-8 text-primary-green" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900">
                Join the Cultural Revolution!
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-green to-secondary-gold mx-auto rounded-full"></div>
            </div>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Be part of Nigeria's largest celebration of traditional attire for children. Help us preserve 
              and promote our rich cultural heritage for future generations.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-6 mt-12">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary-green to-secondary-green text-white font-semibold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center space-x-3"
              >
                <Users className="w-5 h-5" />
                <span>Register Your Child Today</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white font-semibold px-10 py-4 rounded-full transition-all duration-300 text-lg flex items-center space-x-3"
              >
                <Heart className="w-5 h-5" />
                <span>Support Our Children</span>
              </motion.button>
            </div>
            
            <div className="mt-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 inline-block">
              <div className="flex items-center space-x-3 text-primary-green">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">100% Safe, Secure, and Celebrating Nigerian Culture</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Subtle decorative elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-green/10 rounded-full"
            animate={{
              y: [-15, -60],
              x: [0, Math.random() * 80 - 40],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </section>

      {/* Cultural Ambassadors Support Section */}
      <section className="py-24 bg-white relative">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Heart className="w-12 h-12 text-secondary-gold" />
                <Trophy className="w-10 h-10 text-primary-green" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900">
                Support Our <span className="text-primary-green">Cultural Ambassadors</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-green to-secondary-gold mx-auto rounded-full"></div>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Help our young cultural ambassadors showcase the beauty of Nigerian traditional attire
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Single Vote Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 group"
            >
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-green to-secondary-green rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Single</div>
                  <div className="text-4xl font-bold text-gray-900">₦50.00</div>
                  <div className="text-sm text-gray-600">Per Vote</div>
                </div>
                
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary-green" />
                    <span className="text-sm text-gray-700">Support young ambassadors</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary-green" />
                    <span className="text-sm text-gray-700">Promote Nigerian heritage</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary-green" />
                    <span className="text-sm text-gray-700">Help preserve our culture</span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleVoting('single')}
                  className="w-full bg-gradient-to-r from-primary-green to-secondary-green text-white font-semibold py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  Choose Single Vote
                </motion.button>
              </div>
            </motion.div>

            {/* Power Vote Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 group"
            >
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <span className="text-3xl font-bold text-white">5</span>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Power</div>
                  <div className="text-4xl font-bold text-gray-900">₦250.00</div>
                  <div className="text-sm text-gray-600">5 Votes Bundle</div>
                </div>
                
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-700">Support young ambassadors</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-700">Promote Nigerian heritage</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-700">Help preserve our culture</span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleVoting('power')}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  Choose Power Vote
                </motion.button>
              </div>
            </motion.div>

            {/* Super Vote Card - Most Popular */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative bg-gradient-to-br from-primary-green/5 to-secondary-gold/5 p-8 rounded-2xl shadow-lg hover:shadow-xl border-2 border-secondary-gold/20 transition-all duration-300 group"
            >
              {/* Most Popular Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-secondary-gold to-yellow-400 text-gray-900 text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                  Most Popular
                </div>
              </div>
              
              <div className="text-center space-y-6 pt-4">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary-gold to-yellow-400 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <span className="text-3xl font-bold text-gray-900">10</span>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Super</div>
                  <div className="text-4xl font-bold text-gray-900">₦500.00</div>
                  <div className="text-sm text-gray-600">10 Votes + Bonus</div>
                </div>
                
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-secondary-gold" />
                    <span className="text-sm text-gray-700">Support young ambassadors</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-secondary-gold" />
                    <span className="text-sm text-gray-700">Promote Nigerian heritage</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-secondary-gold" />
                    <span className="text-sm text-gray-700">Help preserve our culture</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-secondary-gold" />
                    <span className="text-sm text-gray-700 font-medium">Receive digital certificate</span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleVoting('super')}
                  className="w-full bg-gradient-to-r from-secondary-gold to-yellow-400 text-gray-900 font-semibold py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  Choose Super Vote
                </motion.button>
              </div>
            </motion.div>
          </div>
          
          {/* View All Options Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewAllVotingOptions}
              className="bg-gradient-to-r from-primary-green to-secondary-green text-white font-semibold px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center space-x-3 mx-auto cursor-pointer"
            >
              <Eye className="w-5 h-5" />
              <span>View All Voting Options</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-green via-secondary-green to-primary-green text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'white\' fill-opacity=\'0.1\'%3E%3Cpolygon points=\'30 15 26.18 25.82 15 30 26.18 34.18 30 45 33.82 34.18 45 30 33.82 25.82\'/%3E%3C/g%3E%3C/svg%3E")'
          }}></div>
        </div>
        
        <div className="page-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight">
                Ready to Showcase Your Heritage?
              </h2>
              <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
                Join thousands of Nigerians worldwide in celebrating our rich cultural heritage. 
                Submit your traditional attire photos and be part of this amazing community.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleJoinContest}
                className="bg-white text-gray-800 font-semibold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 cursor-pointer"
              >
                <Crown className="w-6 h-6 text-secondary-gold" />
                <span>Join Contest Now</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLearnMore}
                className="border-2 border-white text-white hover:bg-white hover:text-gray-800 font-semibold px-10 py-4 rounded-full transition-all duration-300 flex items-center space-x-3 cursor-pointer"
              >
                <Sparkles className="w-5 h-5" />
                <span>Learn More</span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Subtle floating elements */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            animate={{
              y: [-10, -50],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;