import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Award, Crown, Zap } from 'lucide-react';
import { formatPrice } from '../../utils/env';

const VotePackageCard = ({ votePackage, onPurchase, isSelected = false, className = '' }) => {
  const getIcon = () => {
    switch (votePackage.id) {
      case 'single':
        return CheckCircle;
      case 'power':
        return Zap;
      case 'super':
        return Crown;
      default:
        return CheckCircle;
    }
  };

  const getColorClasses = () => {
    switch (votePackage.id) {
      case 'single':
        return {
          gradient: 'from-green-500 to-emerald-600',
          border: 'border-green-200',
          bg: 'bg-green-50',
          iconBg: 'bg-green-500',
          button: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700',
          checkmark: 'text-green-500'
        };
      case 'power':
        return {
          gradient: 'from-blue-500 to-purple-600',
          border: 'border-blue-200',
          bg: 'bg-blue-50',
          iconBg: 'bg-blue-500',
          button: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700',
          checkmark: 'text-blue-500'
        };
      case 'super':
        return {
          gradient: 'from-yellow-500 to-orange-500',
          border: 'border-yellow-200',
          bg: 'bg-yellow-50',
          iconBg: 'bg-yellow-500',
          button: 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600',
          checkmark: 'text-yellow-600'
        };
      default:
        return {
          gradient: 'from-gray-500 to-gray-600',
          border: 'border-gray-200',
          bg: 'bg-gray-50',
          iconBg: 'bg-gray-500',
          button: 'bg-gradient-to-r from-gray-500 to-gray-600',
          checkmark: 'text-gray-500'
        };
    }
  };

  const Icon = getIcon();
  const colors = getColorClasses();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`
        relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 overflow-hidden group
        ${votePackage.popular ? `${colors.border} ring-2 ring-yellow-300 ring-opacity-50` : 'border-gray-200'}
        ${isSelected ? 'ring-2 ring-blue-500' : ''}
        ${className}
      `}
    >
      {/* Popular Badge */}
      {votePackage.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <div className={`bg-gradient-to-r ${colors.gradient} text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg flex items-center space-x-1`}>
            <Award className="w-4 h-4" />
            <span>Most Popular</span>
          </div>
        </div>
      )}

      <div className="p-8 pt-10">
        {/* Icon and Title */}
        <div className="text-center mb-6">
          <div className={`w-16 h-16 ${colors.iconBg} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{votePackage.name}</h3>
          <div className="flex items-center justify-center space-x-2 text-3xl font-bold text-gray-900">
            <span>{formatPrice(votePackage.price)}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {votePackage.votes} {votePackage.votes === 1 ? 'Vote' : 'Votes'}
          </p>
        </div>

        {/* Description */}
        <p className="text-center text-gray-600 mb-6">{votePackage.description}</p>

        {/* Features */}
        <div className="space-y-3 mb-8">
          {votePackage.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <CheckCircle className={`w-5 h-5 ${colors.checkmark}`} />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        {/* Purchase Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPurchase(votePackage)}
          className={`
            w-full ${colors.button} text-white font-semibold py-3 px-6 rounded-full 
            shadow-lg hover:shadow-xl transition-all duration-300 text-sm
            ${votePackage.id === 'super' ? 'text-gray-900' : 'text-white'}
          `}
        >
          Choose {votePackage.name}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default VotePackageCard;
