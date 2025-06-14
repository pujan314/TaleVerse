import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen, PenTool, Users, X, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import clsx from '../../utils/clsx';

interface MobileNavProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MobileNav = ({ open, setOpen }: MobileNavProps) => {
  const { isLoggedIn, user, logout } = useAuth();
  
  const handleLogout = async () => {
    await logout();
    setOpen(false);
  };
  
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setOpen(false)}
      />
      
      {/* Mobile menu */}
      <div className="fixed inset-0 z-50 flex">
        <div className="relative mr-16 flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-gray-900 pt-5 pb-4">
          <div className="flex items-center justify-between px-4">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary-600" />
              <span className="text-lg font-serif font-bold text-gray-900 dark:text-white">
                Taleverse
              </span>
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={() => setOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <nav className="px-2 space-y-1">
              <Link 
                to="/"
                className="text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 group flex items-center px-3 py-2 text-base font-medium rounded-md"
                onClick={() => setOpen(false)}
              >
                <Home className="text-gray-500 dark:text-gray-400 mr-4 h-6 w-6" />
                Home
              </Link>
              
              <Link 
                to="/discover"
                className="text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 group flex items-center px-3 py-2 text-base font-medium rounded-md"
                onClick={() => setOpen(false)}
              >
                <BookOpen className="text-gray-500 dark:text-gray-400 mr-4 h-6 w-6" />
                Discover
              </Link>
              
              {isLoggedIn && (
                <Link 
                  to="/publish"
                  className="text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 group flex items-center px-3 py-2 text-base font-medium rounded-md"
                  onClick={() => setOpen(false)}
                >
                  <PenTool className="text-gray-500 dark:text-gray-400 mr-4 h-6 w-6" />
                  Publish
                </Link>
              )}
              
              <Link 
                to="/community"
                className="text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 group flex items-center px-3 py-2 text-base font-medium rounded-md"
                onClick={() => setOpen(false)}
              >
                <Users className="text-gray-500 dark:text-gray-400 mr-4 h-6 w-6" />
                Community
              </Link>
            </nav>
          </div>
          
          <div className="border-t border-[var(--border-color)] p-4">
            {isLoggedIn ? (
              <div className="space-y-3">
                <Link
                  to="/profile"
                  className="flex items-center"
                  onClick={() => setOpen(false)}
                >
                  <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 dark:text-primary-300 font-medium">
                    {user?.username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="ml-3">
                    <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                      {user?.username || 'Account'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user?.tokens} TALE tokens
                    </p>
                  </div>
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center px-4 py-2 border border-red-300 dark:border-red-700 rounded-md shadow-sm text-base font-medium text-red-600 dark:text-red-400 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
                onClick={() => setOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;