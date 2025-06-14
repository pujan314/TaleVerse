import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen, Star, Clock, User } from 'lucide-react';
import { useNovels } from '../hooks/useSupabase';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import clsx from '../utils/clsx';

const genres = [
  'All',
  'Science Fiction',
  'Fantasy',
  'Mystery',
  'Romance',
  'Horror',
  'Literary Fiction',
  'Historical Fiction',
  'Poetry',
  'Non-Fiction'
];

const DiscoverPage = () => {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { novels, loading, fetchNovels } = useNovels();

  useEffect(() => {
    fetchNovels({ genre: selectedGenre, search: searchQuery });
  }, [selectedGenre, searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">
          Discover Stories
        </h1>
        <p className="text-[var(--text-secondary)]">
          Explore our collection of novels and stories from talented writers
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for novels, authors, or keywords..."
              value={searchQuery}
              onChange={handleSearch}
              className="input pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Filter by:</span>
          </div>
        </div>
        
        {/* Genre Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={clsx(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                selectedGenre === genre
                  ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-[var(--text-secondary)]">
          {novels.length} {novels.length === 1 ? 'novel' : 'novels'} found
        </p>
      </div>

      {/* Novels Grid */}
      {novels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {novels.map((novel) => (
            <Link key={novel.id} to={`/novel/${novel.id}`} className="group">
              <div className="card h-full flex flex-col transform transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                <div className="relative h-64 overflow-hidden rounded-t-lg">
                  <img 
                    src={novel.cover_image || 'https://images.pexels.com/photos/1646870/pexels-photo-1646870.jpeg?auto=compress&cs=tinysrgb&w=400'}
                    alt={novel.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.pexels.com/photos/1646870/pexels-photo-1646870.jpeg?auto=compress&cs=tinysrgb&w=400';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-primary-600 rounded-md mb-2">
                      {novel.genre}
                    </span>
                    <h3 className="text-lg font-medium font-serif line-clamp-2">{novel.title}</h3>
                    <p className="text-sm opacity-80">by {novel.author_name}</p>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <p className="text-[var(--text-secondary)] text-sm line-clamp-3 flex-1">
                    {novel.description}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--border-color)]">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{novel.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center text-[var(--text-secondary)]">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span className="text-sm">{novel.total_chapters} chapters</span>
                    </div>
                    <div className="flex items-center text-primary-600 dark:text-primary-400">
                      <span className="text-sm font-medium">
                        {novel.price > 0 ? `${novel.price} TALE` : 'Free'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No novels found
          </h3>
          <p className="text-[var(--text-secondary)]">
            {searchQuery || selectedGenre !== 'All' 
              ? 'Try adjusting your search or filter criteria'
              : 'Be the first to publish a novel on our platform!'
            }
          </p>
          <Link to="/publish" className="btn-primary mt-4">
            Publish Your Story
          </Link>
        </div>
      )}
    </div>
  );
};

export default DiscoverPage;