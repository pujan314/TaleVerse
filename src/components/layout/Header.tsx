import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Menu, Moon, Sun, Search, LogOut, User, Settings, Database } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ConnectWalletButton from '../web3/ConnectWalletButton';
import NotificationDropdown from '../notifications/NotificationDropdown';

interface HeaderProps {
  toggleSidebar: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header = ({ toggleSidebar, darkMode, toggleDarkMode }: HeaderProps) => {
  const { isLoggedIn, user, logout, isLoading } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Check if database is connected
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const isDatabaseConnected = supabaseUrl && supabaseKey && 
    supabaseUrl !== 'your_supabase_project_url' && 
    supabaseKey !== 'your_supabase_anon_key' &&
    !supabaseUrl.includes('placeholder');

  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
    navigate('/');
  };

  // Debug logging to see auth state
  console.log('Header render - auth state:', { 
    isLoggedIn, 
    user: user?.email, 
    isLoading,
    userTokens: user?.tokens,
    isDatabaseConnected
  });

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-[var(--border-color)] shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <Link to="/" className="flex items-center space-x-2 ml-2 lg:ml-0">
              <BookOpen className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-serif font-bold tracking-tight text-gray-900 dark:text-white">
                Taleverse
              </span>
            </Link>

            {/* Database Status Indicator */}
            {!isDatabaseConnected && (
              <div className="hidden md:flex items-center ml-4 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Database className="h-4 w-4 text-blue-600 mr-1" />
                <span className="text-xs text-blue-700 dark:text-blue-300">Demo Mode</span>
              </div>
            )}
          </div>
          
          <div className="hidden sm:flex items-center flex-1 max-w-lg mx-auto">
            <div className="w-full relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for novels, stories, authors..."
                className="input pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            {/* Show loading state only for initial auth check, not for tab focus */}
            {isLoading && !user ? (
              <div className="animate-pulse">
                <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ) : isLoggedIn && user ? (
              <>
                <NotificationDropdown />
                
                <div className="flex items-center space-x-2">
                  <span className="hidden sm:inline-block text-sm font-medium">
                    {user.tokens || 0} 
                    <span className="ml-1 text-primary-600">TALE</span>
                  </span>
                  
                  {/* Quick Logout Button - Visible on larger screens */}
                  <button
                    onClick={handleLogout}
                    className="hidden md:flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                  
                  <div className="relative">
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 dark:text-primary-300 font-medium hover:ring-2 hover:ring-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {user.username?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                    </button>

                    {showDropdown && (
                      <>
                        <div 
                          className="fixed inset-0 z-10"
                          onClick={() => setShowDropdown(false)}
                        />
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-20">
                          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {user.username || user.email}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {user.tokens || 0} TALE tokens
                            </p>
                          </div>
                          
                          <Link
                            to="/profile"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => setShowDropdown(false)}
                          >
                            <User className="h-4 w-4 mr-2" />
                            Profile
                          </Link>
                          <Link
                            to="/settings"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => setShowDropdown(false)}
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            Settings
                          </Link>
                          
                          <div className="border-t border-gray-200 dark:border-gray-700 mt-1">
                            <button
                              onClick={handleLogout}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              <LogOut className="h-4 w-4 mr-2" />
                              Logout
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <ConnectWalletButton />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;