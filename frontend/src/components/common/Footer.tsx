import { motion } from 'framer-motion';
import { 
  Heart, 
  Crown, 
  Star, 
  Mail, 
  Phone, 
  MapPin, 
  Trophy, 
  Baby, 
  Users, 
  UserPlus, 
  Flag,
  Facebook,
  Instagram,
  Twitter,
  Youtube
} from 'lucide-react';

const Footer = () => {
  // Mock stats - in real app, these would come from your backend/context
  const footerStats = {
    contestants: 2847,
    votes: 15623
  };

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', url: '#', color: 'hover:text-blue-400' },
    { icon: Instagram, name: 'Instagram', url: '#', color: 'hover:text-pink-400' },
    { icon: Twitter, name: 'Twitter', url: '#', color: 'hover:text-blue-300' },
    { icon: Youtube, name: 'YouTube', url: '#', color: 'hover:text-red-400' }
  ];

  const traditionalAttire = [
    'Ankara Prints',
    'Aso-oke Weaves', 
    'Adire Patterns',
    'Hausa Traditional',
    'Igbo Heritage',
    'Yoruba Classic'
  ];

  const nigerianStates = {
    'North West': ['Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Sokoto', 'Zamfara', 'Jigawa'],
    'North East': ['Adamawa', 'Bauchi', 'Borno', 'Gombe', 'Taraba', 'Yobe'],
    'North Central': ['Benue', 'Kogi', 'Kwara', 'Nasarawa', 'Niger', 'Plateau', 'FCT'],
    'South West': ['Ekiti', 'Lagos', 'Ogun', 'Ondo', 'Osun', 'Oyo'],
    'South East': ['Abia', 'Anambra', 'Ebonyi', 'Enugu', 'Imo'],
    'South South': ['Akwa Ibom', 'Bayelsa', 'Cross River', 'Delta', 'Edo', 'Rivers']
  };

  return (
    <footer className="bg-gradient-to-br from-primary-green via-green-800 to-secondary-green text-white relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v-40c11.046 0 20 8.954 20 20zM0 20c0-11.046 8.954-20 20-20v40c-11.046 0-20-8.954-20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="page-container relative">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* About Our Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3">
                <Crown className="w-6 h-6 text-secondary-gold" />
                <h4 className="text-xl font-semibold text-secondary-gold">About Our Mission</h4>
              </div>
              
              <div className="space-y-4">
                <p className="text-green-100 leading-relaxed">
                  Celebrating and preserving Nigeria's rich cultural heritage through 
                  traditional attire contests for children aged 0-14 years.
                </p>
                <p className="text-green-100 leading-relaxed">
                  Every child is a cultural ambassador representing the beauty 
                  and diversity of Nigerian traditions.
                </p>
              </div>

              {/* Heritage Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                  <div className="text-2xl font-bold text-secondary-gold mb-1">
                    {footerStats.contestants.toLocaleString()}
                  </div>
                  <div className="text-sm text-green-200">Young Ambassadors</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                  <div className="text-2xl font-bold text-secondary-gold mb-1">
                    {footerStats.votes.toLocaleString()}
                  </div>
                  <div className="text-sm text-green-200">Votes of Support</div>
                </div>
              </div>
            </motion.div>

            {/* Contest Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <Trophy className="w-6 h-6 text-secondary-gold" />
                <h4 className="text-xl font-semibold text-secondary-gold">Contest Categories</h4>
              </div>
              
              <ul className="space-y-3">
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <a href="#" className="text-green-100 hover:text-secondary-gold transition-colors duration-200 flex items-center space-x-3">
                    <Baby className="w-4 h-4 text-secondary-gold" />
                    <span>Little Royalty (0-8 years)</span>
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <a href="#" className="text-green-100 hover:text-secondary-gold transition-colors duration-200 flex items-center space-x-3">
                    <Users className="w-4 h-4 text-secondary-gold" />
                    <span>Heritage Champions (8-14 years)</span>
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <a href="#" className="text-green-100 hover:text-secondary-gold transition-colors duration-200 flex items-center space-x-3">
                    <Heart className="w-4 h-4 text-secondary-gold" />
                    <span>Vote for Contestants</span>
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <a href="#" className="text-green-100 hover:text-secondary-gold transition-colors duration-200 flex items-center space-x-3">
                    <UserPlus className="w-4 h-4 text-secondary-gold" />
                    <span>Register Your Child</span>
                  </a>
                </motion.li>
              </ul>
            </motion.div>

            {/* Traditional Attire */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-2xl">👗</span>
                <h4 className="text-xl font-semibold text-secondary-gold">Traditional Attire</h4>
              </div>
              
              <ul className="space-y-2">
                {traditionalAttire.map((attire, index) => (
                  <li key={index} className="flex items-center space-x-2 text-green-100">
                    <Star className="w-3 h-3 text-secondary-gold fill-current" />
                    <span>{attire}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact & Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <Mail className="w-6 h-6 text-secondary-gold" />
                <h4 className="text-xl font-semibold text-secondary-gold">Get In Touch</h4>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary-gold/20 rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4 text-secondary-gold" />
                  </div>
                  <a href="mailto:info@nigerianattire.com" className="text-green-100 hover:text-secondary-gold transition-colors">
                    info@nigerianattire.com
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary-gold/20 rounded-full flex items-center justify-center">
                    <Phone className="w-4 h-4 text-secondary-gold" />
                  </div>
                  <a href="tel:+2341234567890" className="text-green-100 hover:text-secondary-gold transition-colors">
                    +234 123 456 7890
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary-gold/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-secondary-gold" />
                  </div>
                  <span className="text-green-100">Nigeria - Celebrating Every State</span>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="space-y-4">
                <h5 className="text-lg font-medium text-secondary-gold">Follow Us</h5>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.url}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all duration-300 ${social.color}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Follow us on ${social.name}`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Cultural Divider */}
        <hr className="border-green-700 my-8" />

        {/* Nigerian States Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 p-8 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Flag className="w-6 h-6 text-secondary-gold" />
              <h5 className="text-2xl font-bold text-secondary-gold">Representing All 36 States + FCT</h5>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(nigerianStates).map(([zone, states], index) => (
              <motion.div
                key={zone}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-4 bg-white/10 rounded-lg border-l-4 border-secondary-gold"
              >
                <h6 className="font-bold text-secondary-gold mb-2">{zone}:</h6>
                <p className="text-sm text-green-200 leading-relaxed">
                  {states.join(', ')}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cultural Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 p-8 bg-white/10 rounded-lg border-l-4 border-secondary-gold text-center backdrop-blur-sm"
        >
          <blockquote className="text-xl md:text-2xl font-light italic text-green-100 leading-relaxed">
            "When children wear traditional attire, they become living bridges between our past and future."
          </blockquote>
          <cite className="block mt-4 text-secondary-gold font-semibold">
            - Nigerian Heritage Foundation
          </cite>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-green-700 py-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-green-200 mb-2">
                © {new Date().getFullYear()} Nigerian Traditional Attire Kids Contest. All rights reserved.
              </p>
              <p className="text-sm text-green-300">
                Version 2.0 | 
                <a href="#" className="text-secondary-gold hover:text-yellow-300 transition-colors mx-2">Privacy Policy</a> |
                <a href="#" className="text-secondary-gold hover:text-yellow-300 transition-colors mx-2">Terms of Service</a>
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <motion.span 
                className="text-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🇳🇬
              </motion.span>
              <div className="flex items-center space-x-2 text-secondary-gold">
                <span>Made with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart className="w-4 h-4 fill-current" />
                </motion.div>
                <span>for Nigeria</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Nigerian Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute text-2xl opacity-20"
          style={{ top: '10%', left: '5%' }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🌟
        </motion.div>
        <motion.div 
          className="absolute text-2xl opacity-20"
          style={{ top: '20%', right: '8%' }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          👑
        </motion.div>
        <motion.div 
          className="absolute text-2xl opacity-20"
          style={{ bottom: '30%', left: '3%' }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 2 }}
        >
          💎
        </motion.div>
        <motion.div 
          className="absolute text-2xl opacity-20"
          style={{ bottom: '40%', right: '5%' }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        >
          🎭
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-gold/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary-gold/10 rounded-full translate-y-12 -translate-x-12"></div>
    </footer>
  );
};

export default Footer;