import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Star, Clock, User, Search, Filter, BookMarked, Heart, Download } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useUserLibrary } from '../hooks/useSupabase';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import DatabaseStatus from '../components/ui/DatabaseStatus';
import clsx from '../utils/clsx';

// Mock library data for demo mode
const mockLibraryData = [
  {
    id: '1',
    novel_id: '1',
    progress: 75,
    is_purchased: true,
    added_at: '2024-01-15',
    novels: {
      id: '1',
      title: 'The Ethereum Chronicles',
      author_name: 'Alex Blockman',
      cover_image: 'https://images.pexels.com/photos/1646870/pexels-photo-1646870.jpeg?auto=compress&cs=tinysrgb&w=400',
      genre: 'Science Fiction',
      rating: 4.8,
      total_chapters: 12,
      price: 0
    }
  },
  {
    id: '2',
    novel_id: '2',
    progress: 45,
    is_purchased: true,
    added_at: '2024-01-10',
    novels: {
      id: '2',
      title: 'Whispers of the Blockchain',
      author_name: 'Maya Satoshi',
      cover_image: 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=400',
      genre: 'Mystery',
      rating: 4.5,
      total_chapters: 8,
      price: 5
    }
  },
  {
    id: '3',
    novel_id: '3',
    progress: 100,
    is_purchased: true,
    added_at: '2024-01-05',
    novels: {
      id: '3',
      title: 'Love in the Age of Smart Contracts',
      author_name: 'Sophia Merkle',
      cover_image: 'https://images.pexels.com/photos/9638689/pexels-photo-9638689.jpeg?auto=compress&cs=tinysrgb&w=400',
      genre: 'Romance',
      rating: 4.7,
      total_chapters: 15,
      price: 3
    }
  }
];

const LibraryPage = () => {
  const { user, isLoggedIn } = useAuth();
  const { library, loading } = useUserLibrary();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'reading' | 'completed' | 'purchased'>('all');

  // Check if database is connected
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const isDatabaseConnected = supabaseUrl && supabaseKey && 
    supabaseUrl !== 'your_supabase_project_url' && 
    supabaseKey !== 'your_supabase_anon_key' &&
    !supabaseUrl.includes('placeholder');

  // Use database library if available and user is logged in, otherwise use mock data for demo
  const displayLibrary = isDatabaseConnected && isLoggedIn && library.length > 0 
    ? library 
    : (isLoggedIn ? mockLibraryData : []);

  // Filter library items
  const filteredLibrary = displayLibrary.filter(item => {
    const matchesSearch = !searchTerm || 
      item.novels?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.novels?.author_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterBy === 'all' || 
      (filterBy === 'reading' && item.progress > 0 && item.progress < 100) ||
      (filterBy === 'completed' && item.progress === 100) ||
      (filterBy === 'purchased' && item.is_purchased);
    
    return matchesSearch && matchesFilter;
  });

  if (!isLoggedIn) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <BookMarked className="h-16 w-16 text-gray-400 mx-auto mb-6" />
          <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Your Personal Library
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
            Sign in to access your personal library, track reading progress, and manage your collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login" className="btn-primary">
              Sign In
            </Link>
            <Link to="/signup" className="btn-secondary">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">
            My Library
          </h1>
          <p className="text-[var(--text-secondary)]">
            {filteredLibrary.length} {filteredLibrary.length === 1 ? 'book' : 'books'} in your collection
          </p>
        </div>
        
        <Link to="/discover" className="btn-primary mt-4 md:mt-0">
          <BookOpen className="h-4 w-4 mr-2" />
          Discover More
        </Link>
      </div>

      {/* Database Status */}
      {!isDatabaseConnected && (
        <DatabaseStatus isConnected={false} className="mb-8" />
      )}

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search your library..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>
          
          {/* Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as typeof filterBy)}
              className="input"
            >
              <option value="all">All Books</option>
              <option value="reading">Currently Reading</option>
              <option value="completed">Completed</option>
              <option value="purchased">Purchased</option>
            </select>
          </div>
        </div>
      </div>

      {/* Library Content */}
      {loading && isDatabaseConnected ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : filteredLibrary.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredLibrary.map((item) => (
            <div key={item.id} className="group">
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <Link to={`/novel/${item.novel_id}`}>
                    <img 
                      src={item.novels?.cover_image || 'https://images.pexels.com/photos/1646870/pexels-photo-1646870.jpeg?auto=compress&cs=tinysrgb&w=400'}
                      alt={item.novels?.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.pexels.com/photos/1646870/pexels-photo-1646870.jpeg?auto=compress&cs=tinysrgb&w=400';
                      }}
                    />
                  </Link>
                  
                  {/* Progress Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                      <div 
                        className={clsx(
                          "h-2 rounded-full transition-all duration-300",
                          item.progress === 100 ? "bg-success-500" : "bg-primary-600"
                        )}
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-white text-xs">
                      {item.progress === 100 ? 'Completed' : `${item.progress}% complete`}
                    </p>
                  </div>

                  {/* Status Badges */}
                  <div className="absolute top-2 right-2 flex flex-col space-y-1">
                    {item.is_purchased && (
                      <span className="bg-success-500 text-white text-xs px-2 py-1 rounded-full">
                        Owned
                      </span>
                    )}
                    {item.progress === 100 && (
                      <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                        ✓ Done
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-4">
                  <Link to={`/novel/${item.novel_id}`}>
                    <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      {item.novels?.title}
                    </h3>
                  </Link>
                  <p className="text-[var(--text-secondary)] text-sm mt-1">
                    by {item.novels?.author_name}
                  </p>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center text-sm text-[var(--text-secondary)]">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span>{item.novels?.rating?.toFixed(1)}</span>
                      <span className="mx-2">•</span>
                      <span>{item.novels?.genre}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <Link 
                      to={`/novel/${item.novel_id}`}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
                    >
                      {item.progress === 0 ? 'Start Reading' : item.progress === 100 ? 'Read Again' : 'Continue'}
                    </Link>
                    
                    <div className="flex items-center space-x-2">
                      <button 
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove from library"
                      >
                        <Heart className="h-4 w-4" />
                      </button>
                      <button 
                        className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                        title="Download for offline"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookMarked className="h-16 w-16 text-gray-400 mx-auto mb-6" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            {searchTerm || filterBy !== 'all' ? 'No books match your filters' : 'Your library is empty'}
          </h3>
          <p className="text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
            {searchTerm || filterBy !== 'all' 
              ? 'Try adjusting your search or filter criteria to find more books.'
              : 'Start building your personal library by discovering and adding novels you love.'
            }
          </p>
          
          {searchTerm || filterBy !== 'all' ? (
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterBy('all');
              }}
              className="btn-secondary mr-4"
            >
              Clear Filters
            </button>
          ) : null}
          
          <Link to="/discover" className="btn-primary">
            <BookOpen className="h-4 w-4 mr-2" />
            Discover Novels
          </Link>
        </div>
      )}

      {/* Reading Stats */}
      {filteredLibrary.length > 0 && (
        <div className="mt-12 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/30 dark:to-accent-900/30 rounded-xl p-8">
          <h3 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Your Reading Stats
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                {displayLibrary.length}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">Books in Library</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-success-600 dark:text-success-400">
                {displayLibrary.filter(item => item.progress === 100).length}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">Completed</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-warning-600 dark:text-warning-400">
                {displayLibrary.filter(item => item.progress > 0 && item.progress < 100).length}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">In Progress</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-600 dark:text-accent-400">
                {Math.round(displayLibrary.reduce((sum, item) => sum + item.progress, 0) / displayLibrary.length) || 0}%
              </div>
              <div className="text-sm text-[var(--text-secondary)]">Avg. Progress</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryPage;