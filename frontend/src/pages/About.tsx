import { motion } from 'framer-motion';
import { Info, Heart, Star } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Info className="w-16 h-16 text-secondary-gold mx-auto mb-6" />
          <h1 className="section-title">About Our Contest</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrating the rich cultural heritage of Nigerian traditional attire through 
            a vibrant community platform that brings together fashion, culture, and tradition.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ y: -5 }}
            className="card p-8 text-center"
          >
            <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-600">To celebrate and preserve Nigerian cultural heritage through traditional fashion.</p>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -5 }}
            className="card p-8 text-center"
          >
            <Star className="w-12 h-12 text-secondary-gold mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-600">To become the premier platform for Nigerian traditional fashion showcase.</p>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -5 }}
            className="card p-8 text-center"
          >
            <Info className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-4">Our Values</h3>
            <p className="text-gray-600">Heritage, Beauty, Community, and Cultural Pride guide everything we do.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;