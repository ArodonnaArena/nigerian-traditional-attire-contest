import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Upload, 
  X, 
  Camera, 
  Image as ImageIcon, 
  Crown, 
  Star, 
  Sparkles,
  FileImage,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SubmissionFormData {
  title: string;
  description: string;
  category: string;
  location: string;
  images: File[];
}

interface ImagePreview {
  file: File;
  url: string;
  id: string;
}

const categories = [
  { value: 'agbada', label: '👑 Agbada', description: 'Traditional flowing robe' },
  { value: 'ankara', label: '🎭 Ankara', description: 'Vibrant printed fabric styles' },
  { value: 'gele', label: '👸 Gele', description: 'Traditional head wrap' },
  { value: 'dashiki', label: '🌟 Dashiki', description: 'Colorful traditional shirt' },
  { value: 'iro-buba', label: '💎 Iro & Buba', description: 'Yoruba traditional wear' },
  { value: 'kaftan', label: '✨ Kaftan', description: 'Elegant flowing garment' },
  { value: 'other', label: '🎪 Other', description: 'Other traditional styles' },
];

const SubmissionForm: React.FC = () => {
  const { user } = useAuth();
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<SubmissionFormData>();

  const selectedCategory = watch('category');

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    imageFiles.forEach(file => {
      if (images.length < 5) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage: ImagePreview = {
            file,
            url: e.target?.result as string,
            id: Math.random().toString(36).substr(2, 9),
          };
          setImages(prev => [...prev, newImage]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const onSubmit = async (data: SubmissionFormData) => {
    if (images.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Mock submission
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Success feedback
      alert('🎉 Your submission has been uploaded successfully!');
      
      // Reset form
      reset();
      setImages([]);
    } catch (error) {
      alert('Failed to submit. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
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
          Submit Your Traditional Attire
        </h1>
        <div className="flex items-center justify-center space-x-1 text-secondary-gold text-lg mb-6">
          <Star className="w-4 h-4 fill-current" />
          <span>Showcase the Beauty of Nigerian Heritage</span>
          <Star className="w-4 h-4 fill-current" />
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Upload stunning photos of your traditional Nigerian attire and join thousands 
          celebrating our rich cultural heritage.
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {/* Image Upload Section */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <Camera className="w-6 h-6 text-primary-green" />
            <span>Upload Photos</span>
            <span className="text-sm font-normal text-gray-500">
              (Up to 5 images, max 10MB each)
            </span>
          </h2>

          {/* Drop Zone */}
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
              isDragOver
                ? 'border-primary-green bg-green-50 scale-105'
                : 'border-gray-300 hover:border-primary-green hover:bg-green-50/50'
            }`}
          >
            <input
              type="file"
              id="file-upload"
              multiple
              accept="image/*"
              onChange={onFileInputChange}
              className="sr-only"
              disabled={images.length >= 5}
            />

            {images.length === 0 ? (
              <motion.div
                animate={{ y: isDragOver ? -10 : 0 }}
                className="space-y-4"
              >
                <motion.div
                  animate={{
                    scale: isDragOver ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-24 h-24 bg-gradient-to-br from-primary-green to-secondary-green rounded-full flex items-center justify-center mx-auto shadow-lg"
                >
                  <Upload className="w-12 h-12 text-white" />
                </motion.div>
                
                <div>
                  <p className="text-xl font-semibold text-gray-900 mb-2">
                    {isDragOver ? 'Drop your photos here!' : 'Upload Your Beautiful Photos'}
                  </p>
                  <p className="text-gray-600 mb-4">
                    Drag and drop your images here, or{' '}
                    <label
                      htmlFor="file-upload"
                      className="text-primary-green hover:text-secondary-green font-semibold cursor-pointer"
                    >
                      browse files
                    </label>
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG, GIF up to 10MB each
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <p className="text-lg font-semibold text-gray-900">
                  {images.length}/5 Photos Uploaded
                </p>
                {images.length < 5 && (
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center space-x-2 bg-primary-green text-white px-6 py-2 rounded-full hover:bg-green-700 cursor-pointer transition-colors duration-200"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Add More Photos</span>
                  </label>
                )}
              </div>
            )}
          </div>

          {/* Image Previews */}
          <AnimatePresence>
            {images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8"
              >
                {images.map((image) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative group"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-lg">
                      <img
                        src={image.url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Remove button */}
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeImage(image.id)}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                    
                    {/* File info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <p className="truncate">{image.file.name}</p>
                      <p>{(image.file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Form Details */}
        <div className="card p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <FileImage className="w-6 h-6 text-primary-green" />
            <span>Submission Details</span>
          </h2>

          {/* Title */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              {...register('title', {
                required: 'Please provide a title for your submission',
                minLength: {
                  value: 5,
                  message: 'Title must be at least 5 characters',
                },
              })}
              className="input-field"
              placeholder="e.g., Royal Blue Agbada with Golden Embroidery"
            />
            <AnimatePresence>
              {errors.title && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-sm text-red-500 flex items-center space-x-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.title.message}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {categories.map((category) => (
                <motion.label
                  key={category.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative cursor-pointer p-4 border-2 rounded-xl transition-all duration-200 ${
                    selectedCategory === category.value
                      ? 'border-primary-green bg-green-50 shadow-md'
                      : 'border-gray-200 hover:border-primary-green hover:bg-green-50/50'
                  }`}
                >
                  <input
                    {...register('category', { required: 'Please select a category' })}
                    type="radio"
                    value={category.value}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="text-2xl mb-2">{category.label}</div>
                    <div className="text-sm text-gray-600">{category.description}</div>
                  </div>
                  {selectedCategory === category.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2"
                    >
                      <CheckCircle className="w-5 h-5 text-primary-green" />
                    </motion.div>
                  )}
                </motion.label>
              ))}
            </div>
            <AnimatePresence>
              {errors.category && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-sm text-red-500 flex items-center space-x-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.category.message}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <motion.textarea
              whileFocus={{ scale: 1.02 }}
              {...register('description', {
                required: 'Please provide a description',
                minLength: {
                  value: 20,
                  message: 'Description must be at least 20 characters',
                },
              })}
              rows={4}
              className="input-field resize-none"
              placeholder="Describe your traditional attire, its cultural significance, and what makes it special..."
            />
            <AnimatePresence>
              {errors.description && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-sm text-red-500 flex items-center space-x-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.description.message}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              {...register('location')}
              className="input-field"
              placeholder={user?.location || "Lagos, Nigeria"}
            />
            <p className="text-sm text-gray-500">
              Where was this photo taken or where are you from?
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            disabled={isUploading || images.length === 0}
            type="submit"
            className="bg-gradient-to-r from-primary-green to-secondary-green text-white font-bold px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 mx-auto text-lg"
          >
            {isUploading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                />
                <span>Uploading... {uploadProgress}%</span>
              </>
            ) : (
              <>
                <Crown className="w-6 h-6" />
                <span>Submit to Contest</span>
                <Sparkles className="w-5 h-5" />
              </>
            )}
          </motion.button>
          
          {isUploading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4"
            >
              <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  className="h-full bg-gradient-to-r from-primary-green to-secondary-green rounded-full"
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.form>
    </div>
  );
};

export default SubmissionForm;