import { motion } from 'framer-motion';
import { Settings, Users, BarChart } from 'lucide-react';

const Admin = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Settings className="w-16 h-16 text-secondary-gold mx-auto mb-6" />
          <h1 className="section-title">Admin Dashboard</h1>
          <p className="text-xl text-gray-600">Manage contest settings and participants</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;