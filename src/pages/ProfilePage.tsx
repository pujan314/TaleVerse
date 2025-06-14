import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProfile, useUserLibrary } from '../hooks/useSupabase';
import { BookOpen, Heart, Award, Coins, Settings, BookMarked, PenTool, Star, Clock, User } from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ProfilePage = () => {
  const { user, isLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const { library, loading: libraryLoading } = useUserLibrary();
  const [activeTab, setActiveTab] = useState<'library' | 'achievements' | 'stats'>('library');

  if (isLoading || profileLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Please sign in
        </h2>
        <p className="text-[var(--text-secondary)] mt-2">
          You need to be logged in to view your profile
        </p>
        <Link to="/login" className="btn-primary mt-4">
          Sign In
        </Link>
      </div>
    );
  }

  const mockAchievements = [
    {
      id: '1',
      title: 'Early Adopter',
      description: 'Joined during platform launch',
      icon: Award,
      earned: true,
      rarity: 'rare'
    },
    {
      id: '2',
      title: 'Bookworm',
      description: 'Read 5 novels',
      icon: BookOpen,
      earned: library.length >= 5,
      rarity: 'common'
    },
    {
      id: '3',
      title: 'Quiz Master',
      description: 'Scored 100% on 3 quizzes',
      icon: Star,
      earned: profile.nfts?.length > 0,
      rarity: 'legendary'
    },
    {
      id: '4',
      title: 'Token Collector',
      description: 'Earned 100 TALE tokens',
      icon: Coins,
      earned: profile.tokens >= 100,
      rarity: 'uncommon'
    }
  ];

  const stats = {
    booksRead: library.length,
    totalTokens: profile.tokens,
    nftsOwned: profile.nfts?.length || 0,
    achievementsUnlocked: mockAchievements.filter(a => a.earned).length,
    averageQuizScore: 85, // This would come from quiz_results table
    readingStreak: 7 // This would be calculated from reading activity
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 dark:text-primary-300 text-4xl font-medium">
            {profile.username?.charAt(0).toUpperCase() || profile.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {profile.username || `User_${profile.id.substring(0, 8)}`}
                </h1>
                <p className="text-[var(--text-secondary)] text-sm mt-1">
                  {profile.email}
                </p>
                {profile.bio && (
                  <p className="text-[var(--text-secondary)] mt-2">
                    {profile.bio}
                  </p>
                )}
              </div>
              
              <Link 
                to="/settings"
                className="btn-secondary"
              >
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center text-[var(--text-secondary)]">
                <BookOpen className="h-5 w-5 mr-2" />
                <span>{stats.booksRead} Books Read</span>
              </div>
              <div className="flex items-center text-[var(--text-secondary)]">
                <Award className="h-5 w-5 mr-2" />
                <span>{stats.achievementsUnlocked} Achievements</span>
              </div>
              <div className="flex items-center text-primary-600 dark:text-primary-400">
                <Coins className="h-5 w-5 mr-2" />
                <span>{stats.totalTokens} TALE Tokens</span>
              </div>
              {stats.nftsOwned > 0 && (
                <div className="flex items-center text-accent-600 dark:text-accent-400">
                  <Star className="h-5 w-5 mr-2" />
                  <span>{stats.nftsOwned} NFTs</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Tabs */}
      <div className="border-b border-[var(--border-color)] mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('library')}
            className={`py-4 px-1 relative font-medium text-sm ${
              activeTab === 'library'
                ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                : 'text-[var(--text-secondary)] hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            <BookMarked className="h-5 w-5 inline-block mr-2" />
            My Library ({stats.booksRead})
          </button>
          
          <button
            onClick={() => setActiveTab('achievements')}
            className={`py-4 px-1 relative font-medium text-sm ${
              activeTab === 'achievements'
                ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                : 'text-[var(--text-secondary)] hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            <Award className="h-5 w-5 inline-block mr-2" />
            Achievements ({stats.achievementsUnlocked})
          </button>
          
          <button
            onClick={() => setActiveTab('stats')}
            className={`py-4 px-1 relative font-medium text-sm ${
              activeTab === 'stats'
                ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                : 'text-[var(--text-secondary)] hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            <User className="h-5 w-5 inline-block mr-2" />
            Statistics
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'library' && (
        <div>
          {libraryLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : library.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {library.map((item) => (
                <Link key={item.id} to={`/novel/${item.novel_id}`} className="group">
                  <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <img 
                        src={item.novels?.cover_image || 'https://images.pexels.com/photos/1646870/pexels-photo-1646870.jpeg?auto=compress&cs=tinysrgb&w=400'}
                        alt={item.novels?.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.pexels.com/photos/1646870/pexels-photo-1646870.jpeg?auto=compress&cs=tinysrgb&w=400';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                          <div 
                            className="bg-primary-600 h-1.5 rounded-full"
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-white text-xs mt-1">{item.progress}% complete</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2">
                        {item.novels?.title}
                      </h3>
                      <p className="text-[var(--text-secondary)] text-sm">
                        by {item.novels?.author_name}
                      </p>
                      <div className="flex items-center mt-2 text-sm text-[var(--text-secondary)]">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span>{item.novels?.rating?.toFixed(1)}</span>
                        <span className="mx-2">•</span>
                        <span>{item.novels?.genre}</span>
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
                Your library is empty
              </h3>
              <p className="text-[var(--text-secondary)] mb-6">
                Start reading novels to build your personal library
              </p>
              <Link to="/discover" className="btn-primary">
                Discover Novels
              </Link>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAchievements.map((achievement) => (
            <div 
              key={achievement.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center space-x-4 ${
                achievement.earned 
                  ? 'border-l-4 border-primary-500' 
                  : 'opacity-60 border-l-4 border-gray-300 dark:border-gray-600'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                achievement.earned
                  ? achievement.rarity === 'legendary'
                    ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400'
                    : achievement.rarity === 'rare'
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400'
                    : achievement.rarity === 'uncommon'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                    : 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
              }`}>
                <achievement.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {achievement.title}
                  {achievement.earned && achievement.rarity === 'legendary' && ' 🏆'}
                  {achievement.earned && achievement.rarity === 'rare' && ' 💎'}
                  {achievement.earned && achievement.rarity === 'uncommon' && ' ⭐'}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm">
                  {achievement.description}
                </p>
                {achievement.earned && (
                  <span className="text-xs text-success-600 dark:text-success-400 font-medium">
                    Unlocked
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Books Read</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.booksRead}</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-secondary)]">TALE Tokens</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalTokens}</p>
              </div>
              <Coins className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-secondary)]">NFTs Owned</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.nftsOwned}</p>
              </div>
              <Star className="h-8 w-8 text-accent-600 dark:text-accent-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Achievements</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.achievementsUnlocked}</p>
              </div>
              <Award className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Avg Quiz Score</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.averageQuizScore}%</p>
              </div>
              <Star className="h-8 w-8 text-success-600 dark:text-success-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Reading Streak</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.readingStreak} days</p>
              </div>
              <Clock className="h-8 w-8 text-warning-600 dark:text-warning-400" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;