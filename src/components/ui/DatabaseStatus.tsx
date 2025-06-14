import React from 'react';
import { Database, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';

interface DatabaseStatusProps {
  isConnected: boolean;
  className?: string;
}

const DatabaseStatus: React.FC<DatabaseStatusProps> = ({ isConnected, className = '' }) => {
  if (isConnected) {
    return (
      <div className={`flex items-center text-success-600 dark:text-success-400 ${className}`}>
        <CheckCircle className="h-4 w-4 mr-2" />
        <span className="text-sm">Database Connected</span>
      </div>
    );
  }

  return (
    <div className={`bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 ${className}`}>
      <div className="flex items-start">
        <Database className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
            Demo Mode Active
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
            Connect a database to enable user accounts, publishing, and full platform features.
          </p>
          <a
            href="https://github.com/yourusername/taleverse#database-setup"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mt-2"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Setup Guide
          </a>
        </div>
      </div>
    </div>
  );
};

export default DatabaseStatus;