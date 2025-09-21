import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, Crown, Star, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onClose?: () => void;
  onSwitchToRegister?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onSwitchToRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      onClose?.();
    } catch (error) {
      // Error is handled in the context
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md w-full mx-4 relative"
    >
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23116530' fill-opacity='0.1'%3E%3Cpolygon points='30 15 26.18 25.82 15 30 26.18 34.18 30 45 33.82 34.18 45 30 33.82 25.82'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <div className="bg-gradient-to-br from-primary-green to-secondary-green px-8 py-6 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-gold/10 rounded-full -translate-y-16 translate-x-16"></div>
        
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center relative z-10"
        >
          <div className="flex items-center justify-center mb-4">
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
              className="mr-2"
            >
              <Crown className="w-8 h-8 text-secondary-gold" />
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
              className="ml-2"
            >
              <Crown className="w-8 h-8 text-secondary-gold" />
            </motion.div>
          </div>
          
          <h2 className="text-2xl font-display font-bold text-white mb-2">
            Welcome Back!
          </h2>
          <div className="flex items-center justify-center space-x-1 text-secondary-gold text-sm">
            <Star className="w-3 h-3 fill-current" />
            <span>Join the Cultural Celebration</span>
            <Star className="w-3 h-3 fill-current" />
          </div>
        </motion.div>
      </div>

      {/* Form */}
      <motion.form
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 space-y-6 relative"
      >
        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Please enter a valid email address',
                },
              })}
              type="email"
              className="input-field pl-10 transition-all duration-200 focus:ring-primary-green focus:border-primary-green"
              placeholder="Enter your email"
            />
          </div>
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-sm text-red-500"
              >
                {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              type={showPassword ? 'text' : 'password'}
              className="input-field pl-10 pr-10 transition-all duration-200 focus:ring-primary-green focus:border-primary-green"
              placeholder="Enter your password"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </motion.button>
          </div>
          <AnimatePresence>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-sm text-red-500"
              >
                {errors.password.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <motion.button
            whileHover={{ scale: 1.02 }}
            type="button"
            className="text-sm text-primary-green hover:text-secondary-green font-medium"
          >
            Forgot your password?
          </motion.button>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
          type="submit"
          className="w-full bg-gradient-to-r from-primary-green to-secondary-green text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              <span>Signing In...</span>
            </>
          ) : (
            <>
              <Crown className="w-5 h-5" />
              <span>Sign In</span>
            </>
          )}
        </motion.button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            className="w-full border-2 border-gray-300 hover:border-primary-green text-gray-700 font-medium py-2 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span className="text-lg">🇬</span>
            <span className="text-sm">Google</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            className="w-full border-2 border-gray-300 hover:border-primary-green text-gray-700 font-medium py-2 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span className="text-lg">📘</span>
            <span className="text-sm">Facebook</span>
          </motion.button>
        </div>

        {/* Switch to Register */}
        <div className="text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <motion.button
            whileHover={{ scale: 1.02 }}
            type="button"
            onClick={onSwitchToRegister}
            className="text-primary-green hover:text-secondary-green font-semibold"
          >
            Create Account
          </motion.button>
        </div>
      </motion.form>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-secondary-gold rounded-full opacity-20"
            animate={{
              y: [-10, -50],
              x: [0, Math.random() * 20 - 10],
              opacity: [0.2, 0, 0.2],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LoginForm;