import React, { useState } from 'react';
import { Trophy, Medal, Star, BookOpen, Award, Users, TrendingUp, Crown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import DatabaseStatus from '../components/ui/DatabaseStatus';
import clsx from '../utils/clsx';

// Mock leaderboard data for demo mode
const mockLeaderboardData = {
  topReaders: [
    {
      id: '1',
      username: 'BookwormAlice',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      booksRead: 47,
      totalTokens: 2340,
      averageScore: 94,
      streak: 23,
      rank: 1
    },
    {
      id: '2',
      username: 'StorySeeker',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
      booksRead: 42,
      totalTokens: 2100,
      averageScore: 91,
      streak: 18,
      rank: 2
    },
    {
      id: '3',
      username: 'NovelNinja',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
      booksRead: 38,
      totalTokens: 1950,
      averageScore: 89,
      streak: 15,
      rank: 3
    },
    {
      id: '4',
      username: 'PageTurner',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      booksRead: 35,
      totalTokens: 1800,
      averageScore: 87,
      streak: 12,
      rank: 4
    },
    {
      id: '5',
      username: 'LitLover',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      booksRead: 33,
      totalTokens: 1650,
      averageScore: 85,
      streak: 10,
      rank: 5
    }
  ],
  topWriters: [
    {
      id: '1',
      username: 'Alex Blockman',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      worksPublished: 12,
      totalReads: 15420,
      averageRating: 4.8,
      totalEarnings: 3240,
      rank: 1
    },
    {
      id: '2',
      username: 'Maya Satoshi',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      worksPublished: 8,
      totalReads: 12800,
      averageRating: 4.5,
      totalEarnings: 2850,
      rank: 2
    },
    {
      id: '3',
      username: 'Sophia Merkle',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      worksPublished: 15,
      totalReads: 11200,
      averageRating: 4.7,
      totalEarnings: 2600,
      rank: 3
    }
  ],
  topQuizTakers: [
    {
      id: '1',
      username: 'QuizMaster',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
      quizzesTaken: 89,
      perfectScores: 34,
      averageScore: 96,
      tokensEarned: 1780,
      rank: 1
    },
    {
      id: '2',
      username: 'BrainBox',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
      quizzesTaken: 76,
      perfectScores: 28,
      averageScore: 94,
      tokensEarned: 1520,
      rank: 2
    },
    {
      id: '3',
      username: 'SmartReader',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      quizzesTaken: 68,
      perfectScores: 22,
      averageScore: 91,
      tokensEarned: 1360,
      rank: 3
    }
  ]
};

const LeaderboardPage = () => {
  const { user, isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState<'readers' | 'writers' | 'quiz'>('readers');

  // Check if database is connected
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const isDatabaseConnected = supabaseUrl && supabaseKey && 
    supabaseUrl !== 'your_supabase_project_url' && 
    supabaseKey !== 'your_supabase_anon_key' &&
    !supabaseUrl.includes('placeholder');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
          Community Leaderboard
        </h1>
        <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
          Celebrate the most active readers, talented writers, and quiz champions in our community.
        </p>
      </div>

      {/* Database Status */}
      {!isDatabaseConnected && (
        <DatabaseStatus isConnected={false} className="mb-8" />
      )}

      {/* Tabs */}
      <div className="border-b border-[var(--border-color)] mb-8">
        <nav className="flex justify-center space-x-8">
          {[
            { id: 'readers', label: 'Top Readers', icon: BookOpen },
            { id: 'writers', label: 'Top Writers', icon: Users },
            { id: 'quiz', label: 'Quiz Champions', icon: Trophy }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={clsx(
                "flex items-center px-1 py-4 border-b-2 font-medium text-sm transition-colors",
                activeTab === tab.id
                  ? "border-primary-600 text-primary-600"
                  : "border-transparent text-[var(--text-secondary)] hover:text-gray-700 hover:border-gray-300"
              )}
            >
              <tab.icon className="h-5 w-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Top Readers */}
      {activeTab === 'readers' && (
        <div className="space-y-6">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {mockLeaderboardData.topReaders.slice(0, 3).map((reader, index) => (
              <div key={reader.id} className={clsx(
                "card p-6 text-center relative",
                index === 0 && "md:order-2 transform md:scale-110",
                index === 1 && "md:order-1",
                index === 2 && "md:order-3"
              )}>
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className={clsx("px-3 py-1 rounded-full text-sm font-bold", getRankBadge(reader.rank))}>
                    #{reader.rank}
                  </div>
                </div>
                
                <div className="relative mb-4">
                  <img
                    src={reader.avatar}
                    alt={reader.username}
                    className="w-20 h-20 rounded-full mx-auto border-4 border-white dark:border-gray-800 shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2">
                    {getRankIcon(reader.rank)}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {reader.username}
                </h3>
                
                <div className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <div className="flex justify-between">
                    <span>Books Read:</span>
                    <span className="font-medium">{reader.booksRead}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TALE Tokens:</span>
                    <span className="font-medium">{reader.totalTokens.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg. Score:</span>
                    <span className="font-medium">{reader.averageScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Streak:</span>
                    <span className="font-medium">{reader.streak} days</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Rest of the leaderboard */}
          <div className="space-y-3">
            {mockLeaderboardData.topReaders.slice(3).map((reader) => (
              <div key={reader.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700">
                    <span className="text-sm font-bold text-gray-600 dark:text-gray-300">
                      #{reader.rank}
                    </span>
                  </div>
                  
                  <img
                    src={reader.avatar}
                    alt={reader.username}
                    className="w-12 h-12 rounded-full"
                  />
                  
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {reader.username}
                    </h4>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {reader.booksRead} books • {reader.averageScore}% avg score
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    {reader.totalTokens.toLocaleString()}
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">TALE tokens</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Writers */}
      {activeTab === 'writers' && (
        <div className="space-y-6">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {mockLeaderboardData.topWriters.slice(0, 3).map((writer, index) => (
              <div key={writer.id} className={clsx(
                "card p-6 text-center relative",
                index === 0 && "md:order-2 transform md:scale-110",
                index === 1 && "md:order-1",
                index === 2 && "md:order-3"
              )}>
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className={clsx("px-3 py-1 rounded-full text-sm font-bold", getRankBadge(writer.rank))}>
                    #{writer.rank}
                  </div>
                </div>
                
                <div className="relative mb-4">
                  <img
                    src={writer.avatar}
                    alt={writer.username}
                    className="w-20 h-20 rounded-full mx-auto border-4 border-white dark:border-gray-800 shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2">
                    {getRankIcon(writer.rank)}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {writer.username}
                </h3>
                
                <div className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <div className="flex justify-between">
                    <span>Works:</span>
                    <span className="font-medium">{writer.worksPublished}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Reads:</span>
                    <span className="font-medium">{writer.totalReads.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg. Rating:</span>
                    <span className="font-medium">{writer.averageRating}★</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Earnings:</span>
                    <span className="font-medium">{writer.totalEarnings} TALE</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quiz Champions */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {mockLeaderboardData.topQuizTakers.slice(0, 3).map((quizzer, index) => (
              <div key={quizzer.id} className={clsx(
                "card p-6 text-center relative",
                index === 0 && "md:order-2 transform md:scale-110",
                index === 1 && "md:order-1",
                index === 2 && "md:order-3"
              )}>
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className={clsx("px-3 py-1 rounded-full text-sm font-bold", getRankBadge(quizzer.rank))}>
                    #{quizzer.rank}
                  </div>
                </div>
                
                <div className="relative mb-4">
                  <img
                    src={quizzer.avatar}
                    alt={quizzer.username}
                    className="w-20 h-20 rounded-full mx-auto border-4 border-white dark:border-gray-800 shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2">
                    {getRankIcon(quizzer.rank)}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {quizzer.username}
                </h3>
                
                <div className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <div className="flex justify-between">
                    <span>Quizzes:</span>
                    <span className="font-medium">{quizzer.quizzesTaken}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Perfect Scores:</span>
                    <span className="font-medium">{quizzer.perfectScores}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg. Score:</span>
                    <span className="font-medium">{quizzer.averageScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tokens Earned:</span>
                    <span className="font-medium">{quizzer.tokensEarned}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User's Position */}
      {isLoggedIn && (
        <div className="mt-12 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/30 dark:to-accent-900/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
            Your Position
          </h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900">
                <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                  #42
                </span>
              </div>
              
              <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 text-lg font-medium">
                {user?.username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {user?.username || 'You'}
                </h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  Keep reading to climb the ranks!
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                {user?.tokens || 50}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">TALE tokens</div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-serif font-bold mb-4">
            Join the Competition!
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Read more, quiz better, and climb the leaderboard to earn recognition and rewards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isLoggedIn ? (
              <>
                <button className="btn bg-white text-primary-700 hover:bg-gray-100 text-lg py-3 px-8">
                  Sign Up to Compete
                </button>
                <button className="btn bg-primary-700 text-white hover:bg-primary-800 border border-primary-500 text-lg py-3 px-8">
                  Learn More
                </button>
              </>
            ) : (
              <>
                <button className="btn bg-white text-primary-700 hover:bg-gray-100 text-lg py-3 px-8">
                  Start Reading
                </button>
                <button className="btn bg-primary-700 text-white hover:bg-primary-800 border border-primary-500 text-lg py-3 px-8">
                  Take a Quiz
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;