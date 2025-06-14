import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen, Star, Clock, User, Database, ExternalLink } from 'lucide-react';
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

// Mock data for demo mode
const mockNovels = [
  {
    id: '1',
    title: 'The Ethereum Chronicles',
    author_name: 'Alex Blockman',
    cover_image: 'https://images.pexels.com/photos/1646870/pexels-photo-1646870.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: 'Science Fiction',
    rating: 4.8,
    total_chapters: 12,
    price: 0,
    description: 'A thrilling adventure through a digital world where code is law and decentralized societies thrive.'
  },
  {
    id: '2',
    title: 'Whispers of the Blockchain',
    author_name: 'Maya Satoshi',
    cover_image: 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: 'Mystery',
    rating: 4.5,
    total_chapters: 8,
    price: 5,
    description: 'A detective story set in 2040 where crimes leave traces on an immutable ledger.'
  },
  {
    id: '3',
    title: 'Love in the Age of Smart Contracts',
    author_name: 'Sophia Merkle',
    cover_image: 'https://images.pexels.com/photos/9638689/pexels-photo-9638689.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: 'Romance',
    rating: 4.7,
    total_chapters: 15,
    price: 3,
    description: 'When two engineers fall in love, they discover that relationships are more complex than any algorithm.'
  },
  {
    id: '4',
    title: 'The Last Validator',
    author_name: 'James Buterin',
    cover_image: 'https://images.pexels.com/photos/7034127/pexels-photo-7034127.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: 'Fantasy',
    rating: 4.9,
    total_chapters: 20,
    price: 10,
    description: 'In a world where computation is scarce, one person holds the key to validating the final block.'
  },
  {
    id: '5',
    title: 'Quantum Dreams',
    author_name: 'Alice Quantum',
    cover_image: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: 'Science Fiction',
    rating: 4.6,
    total_chapters: 18,
    price: 7,
    description: 'In a world where consciousness can be digitized and dreams can be shared.'
  },
  {
    id: '6',
    title: 'Digital Hearts',
    author_name: 'Cyber Romeo',
    cover_image: 'https://images.pexels.com/photos/8566474/pexels-photo-8566474.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: 'Romance',
    rating: 4.4,
    total_chapters: 12,
    price: 4,
    description: 'A romance between an AI and a human in a world where emotions become blurred.'
  }
];

const DiscoverPage = () => {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { novels, loading, fetchNovels } = useNovels();

  // Check if database is connected
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const isDatabaseConnected = supabaseUrl && supabaseKey && 
    supabaseUrl !== 'your_supabase_project_url' && 
    supabaseKey !== 'your_supabase_anon_key' &&
    !supabaseUrl.includes('placeholder');

  // Use database novels if available, otherwise use mock data
  const displayNovels = isDatabaseConnected && novels.length > 0 ? novels : mockNovels;

  useEffect(() => {
    if (isDatabaseConnected) {
      fetchNovels({ genre: selectedGenre, search: searchQuery });
    }
  }, [selectedGenre, searchQuery, isDatabaseConnected]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter mock data when not using database
  const filteredNovels = isDatabaseConnected ? displayNovels : displayNovels.filter(novel => {
    const matchesGenre = selectedGenre === 'All' || novel.genre === selectedGenre;
    const matchesSearch = !searchQuery || 
      novel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      novel.author_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      novel.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  if (loading && isDatabaseConnected) {
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

      {/* Database Status Banner */}
      {!isDatabaseConnected && (
        <div className="mb-8 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start">
            <Database className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Demo Mode - Sample Content
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                You're viewing sample novels. Connect a database to see real user-generated content and enable full platform features.
              </p>
              <a
                href="/SUPABASE_SETUP.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mt-2"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Database Setup Guide
              </a>
            </div>
          </div>
        </div>
      )}

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
          {filteredNovels.length} {filteredNovels.length === 1 ? 'novel' : 'novels'} found
          {!isDatabaseConnected && ' (sample content)'}
        </p>
      </div>

      {/* Novels Grid */}
      {filteredNovels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredNovels.map((novel) => (
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
                      <span className="text-sm font-medium">{(novel.rating || 0).toFixed(1)}</span>
                    </div>
                    <div className="flex items-center text-[var(--text-secondary)]">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span className="text-sm">{novel.total_chapters || 0} chapters</span>
                    </div>
                    <div className="flex items-center text-primary-600 dark:text-primary-400">
                      <span className="text-sm font-medium">
                        {(novel.price || 0) > 0 ? `${novel.price} TALE` : 'Free'}
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
          {isDatabaseConnected && (
            <Link to="/publish" className="btn-primary mt-4">
              Publish Your Story
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default DiscoverPage;