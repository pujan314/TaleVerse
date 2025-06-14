import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, MessageCircle, Award, Bookmark, Heart, Share, Search, Twitter, Instagram, Youtube } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const CommunityPage = () => {
  const { isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState<'discussions' | 'writers' | 'readers'>('discussions');

  const discussions = [
    {
      id: '1',
      title: 'What makes a great sci-fi novel in the Web3 era?',
      author: 'Alex Blockman',
      authorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      category: 'Writing Tips',
      replies: 24,
      likes: 156,
      timestamp: '2h ago'
    },
    {
      id: '2',
      title: 'Monthly Book Club: The Ethereum Chronicles Discussion',
      author: 'Maya Satoshi',
      authorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      category: 'Book Club',
      replies: 89,
      likes: 234,
      timestamp: '5h ago'
    },
    {
      id: '3',
      title: 'How to earn more tokens through quality content',
      author: 'Sophia Merkle',
      authorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      category: 'Platform Tips',
      replies: 45,
      likes: 178,
      timestamp: '8h ago'
    }
  ];

  const writers = [
    {
      id: '1',
      name: 'Alex Blockman',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      genre: 'Science Fiction',
      works: 12,
      followers: 3420,
      awards: 5
    },
    {
      id: '2',
      name: 'Maya Satoshi',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      genre: 'Mystery',
      works: 8,
      followers: 2850,
      awards: 3
    },
    {
      id: '3',
      name: 'Sophia Merkle',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      genre: 'Romance',
      works: 15,
      followers: 4200,
      awards: 7
    }
  ];

  const readers = [
    {
      id: '1',
      name: 'John Web3',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
      booksRead: 145,
      reviews: 89,
      achievements: 12
    },
    {
      id: '2',
      name: 'Alice Chain',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      booksRead: 203,
      reviews: 156,
      achievements: 18
    },
    {
      id: '3',
      name: 'Bob Token',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
      booksRead: 167,
      reviews: 102,
      achievements: 15
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">
            Community
          </h1>
          <p className="text-[var(--text-secondary)]">
            Connect with fellow readers and writers
          </p>
        </div>

        {isLoggedIn ? (
          <Link
            to="/messages"
            className="btn-primary mt-4 md:mt-0"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Open Messages
          </Link>
        ) : (
          <Link
            to="/login"
            className="btn-primary mt-4 md:mt-0"
          >
            Connect Wallet to Join
          </Link>
        )}
      </div>

      {/* Social Media Links */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/30 dark:to-accent-900/30 rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Join Our Social Communities
            </h3>
            <p className="text-[var(--text-secondary)]">
              Stay updated with the latest news, writing tips, and community events
            </p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://x.com/taleverse_co"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Twitter className="h-4 w-4" />
              <span>Twitter</span>
            </a>
            <a
              href="https://www.instagram.com/taleverse.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Instagram className="h-4 w-4" />
              <span>Instagram</span>
            </a>
            <a
              href="https://www.youtube.com/channel/UCXP0strac180COKYhINMFRg"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Youtube className="h-4 w-4" />
              <span>YouTube</span>
            </a>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search discussions, writers, or readers..."
          className="input pl-10"
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-[var(--border-color)] mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'discussions', label: 'Discussions', icon: MessageCircle },
            { id: 'writers', label: 'Writers', icon: Users },
            { id: 'readers', label: 'Readers', icon: Bookmark }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`
                flex items-center px-1 py-4 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-[var(--text-secondary)] hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <tab.icon className="h-5 w-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'discussions' && (
        <div className="space-y-4">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="card p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <img
                    src={discussion.authorAvatar}
                    alt={discussion.author}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {discussion.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-[var(--text-secondary)]">
                        by {discussion.author}
                      </span>
                      <span className="text-[var(--text-secondary)]">•</span>
                      <span className="text-sm text-[var(--text-secondary)]">
                        {discussion.timestamp}
                      </span>
                      <span className="text-[var(--text-secondary)]">•</span>
                      <span className="text-sm text-primary-600 dark:text-primary-400">
                        {discussion.category}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="text-[var(--text-secondary)] hover:text-gray-500">
                  <Share className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center space-x-6 mt-4">
                <button className="flex items-center space-x-2 text-[var(--text-secondary)] hover:text-primary-600">
                  <MessageCircle className="h-5 w-5" />
                  <span>{discussion.replies} replies</span>
                </button>
                <button className="flex items-center space-x-2 text-[var(--text-secondary)] hover:text-primary-600">
                  <Heart className="h-5 w-5" />
                  <span>{discussion.likes} likes</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'writers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {writers.map((writer) => (
            <div key={writer.id} className="card p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={writer.avatar}
                  alt={writer.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {writer.name}
                  </h3>
                  <p className="text-sm text-primary-600 dark:text-primary-400">
                    {writer.genre}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {writer.works}
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">Works</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {writer.followers.toLocaleString()}
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">Followers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {writer.awards}
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">Awards</div>
                </div>
              </div>
              <button className="btn-secondary w-full mt-6">
                Follow Writer
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'readers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {readers.map((reader) => (
            <div key={reader.id} className="card p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={reader.avatar}
                  alt={reader.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {reader.name}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Active Reader
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {reader.booksRead}
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">Books Read</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {reader.reviews}
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">Reviews</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {reader.achievements}
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">Achievements</div>
                </div>
              </div>
              <button className="btn-secondary w-full mt-6">
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityPage;