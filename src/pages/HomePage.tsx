import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, Users, Coins, TrendingUp, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNovels } from '../hooks/useSupabase';
import LoadingSpinner from '../components/ui/LoadingSpinner';

// Mock data as fallback when database is not available
const mockFeaturedNovels = [
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
  }
];

const HomePage = () => {
  const { isLoggedIn, user } = useAuth();
  const { novels, loading } = useNovels();
  const [featuredNovels, setFeaturedNovels] = useState<any[]>([]);
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  useEffect(() => {
    // Set a timeout to use mock data if loading takes too long (5 seconds)
    const timeout = setTimeout(() => {
      if (loading) {
        setLoadingTimeout(true);
        setFeaturedNovels(mockFeaturedNovels);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [loading]);

  useEffect(() => {
    if (novels.length > 0) {
      // Get top 4 novels by rating
      const featured = novels
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);
      setFeaturedNovels(featured);
      setLoadingTimeout(false);
    } else if (!loading && novels.length === 0) {
      // If not loading and no novels found, use mock data
      setFeaturedNovels(mockFeaturedNovels);
    }
  }, [novels, loading]);

  // Use mock data immediately if we detect connection issues
  useEffect(() => {
    if (loadingTimeout || (!loading && novels.length === 0)) {
      setFeaturedNovels(mockFeaturedNovels);
    }
  }, [loadingTimeout, loading, novels.length]);

  const displayNovels = featuredNovels.length > 0 ? featuredNovels : mockFeaturedNovels;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 -mx-4 sm:-mx-6 lg:-mx-8 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight mb-6 animate-fade-in">
            Discover Immersive Stories on the Web3 Reading Platform
          </h1>
          <p className="text-xl sm:text-2xl max-w-3xl mx-auto mb-8 text-primary-100 animate-fade-in opacity-90">
            Taleverse connects readers and writers through engaging stories, 
            quizzes, and rewards on a decentralized platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in">
            <Link to="/discover" className="btn bg-white text-primary-700 hover:bg-gray-100 text-lg py-3 px-8">
              Explore Stories
            </Link>
            {!isLoggedIn ? (
              <Link to="/signup" className="btn bg-primary-700 text-white hover:bg-primary-800 border border-primary-500 text-lg py-3 px-8">
                Join Taleverse
              </Link>
            ) : (
              <Link to="/publish" className="btn bg-primary-700 text-white hover:bg-primary-800 border border-primary-500 text-lg py-3 px-8">
                Start Writing
              </Link>
            )}
          </div>
          
          {isLoggedIn && user && (
            <div className="mt-8 p-4 bg-primary-700/50 rounded-lg backdrop-blur-sm">
              <p className="text-primary-100 mb-2">Welcome back, {user.username || 'Reader'}!</p>
              <div className="flex justify-center items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <Coins className="h-4 w-4 mr-1" />
                  <span>{user.tokens} TALE tokens</span>
                </div>
                {user.nfts && user.nfts.length > 0 && (
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    <span>{user.nfts.length} NFTs</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Platform Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {displayNovels.length}
            </div>
            <div className="text-sm text-[var(--text-secondary)]">Published Novels</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {displayNovels.reduce((sum, novel) => sum + (novel.total_chapters || 0), 0)}
            </div>
            <div className="text-sm text-[var(--text-secondary)]">Total Chapters</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {new Set(displayNovels.map(novel => novel.author_name)).size}
            </div>
            <div className="text-sm text-[var(--text-secondary)]">Active Writers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {displayNovels.reduce((sum, novel) => sum + Math.floor((novel.rating || 0) * 10), 0)}
            </div>
            <div className="text-sm text-[var(--text-secondary)]">Total Ratings</div>
          </div>
        </div>
      </section>

      {/* Featured Novels Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-serif font-semibold tracking-tight text-gray-900 dark:text-white">
              Featured Novels
            </h2>
            <p className="text-[var(--text-secondary)] mt-2">
              Top-rated stories from our community
            </p>
          </div>
          <Link 
            to="/discover" 
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
          >
            View all
          </Link>
        </div>
        
        {loading && !loadingTimeout ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayNovels.map((novel) => (
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
        )}
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <h2 className="text-3xl font-serif font-semibold tracking-tight text-center text-gray-900 dark:text-white mb-12">
          How Taleverse Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              icon: BookOpen, 
              title: "Read Immersive Stories", 
              description: "Explore a vast collection of novels and short stories across genres.",
              step: "1"
            },
            { 
              icon: Award, 
              title: "Take Quizzes & Earn", 
              description: "Test your comprehension and earn tokens for high scores.",
              step: "2"
            },
            { 
              icon: Users, 
              title: "Join the Community", 
              description: "Connect with other readers and writers who share your interests.",
              step: "3"
            },
            { 
              icon: Coins, 
              title: "Web3 Rewards", 
              description: "Earn exclusive NFTs and tokens with real-world value.",
              step: "4"
            }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center relative">
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4 relative">
                <item.icon className="h-8 w-8" />
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-[var(--text-secondary)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-accent-50 dark:bg-accent-900/20 rounded-xl text-center">
        <h2 className="text-3xl font-serif font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
          Join thousands of readers and writers already exploring the future of decentralized literature.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {isLoggedIn ? (
            <>
              <Link to="/publish\" className="btn-accent text-lg py-3 px-8">
                Start Writing
              </Link>
              <Link to="/discover" className="btn-secondary text-lg py-3 px-8">
                Discover Stories
              </Link>
            </>
          ) : (
            <>
              <Link to="/signup" className="btn-accent text-lg py-3 px-8">
                Join Taleverse
              </Link>
              <Link to="/discover" className="btn-secondary text-lg py-3 px-8">
                Browse Stories
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;