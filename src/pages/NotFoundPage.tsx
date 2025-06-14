import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary-600 dark:text-primary-400 mb-4">404</h1>
        <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back to exploring amazing stories.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="btn-primary inline-flex items-center justify-center"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <Link 
            to="/discover" 
            className="btn-secondary inline-flex items-center justify-center"
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Discover Stories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;