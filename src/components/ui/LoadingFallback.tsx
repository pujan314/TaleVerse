import React from 'react';
import { BookOpen } from 'lucide-react';

interface LoadingFallbackProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingFallback: React.FC<LoadingFallbackProps> = ({ 
  message = 'Loading...', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'h-32',
    md: 'h-64',
    lg: 'min-h-screen'
  };

  const spinnerSizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className={`flex items-center justify-center ${sizeClasses[size]} bg-gray-50 dark:bg-gray-900`}>
      <div className="text-center">
        <div className="relative">
          <BookOpen className={`${spinnerSizes[size]} text-primary-600 mx-auto mb-4 animate-pulse`} />
          <div className={`absolute inset-0 ${spinnerSizes[size]} mx-auto animate-spin rounded-full border-2 border-primary-200 border-t-primary-600`}></div>
        </div>
        <p className="text-gray-600 dark:text-gray-400">{message}</p>
      </div>
    </div>
  );
};

export default LoadingFallback;