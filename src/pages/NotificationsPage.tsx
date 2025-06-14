import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Award, BookOpen, Users, MessageCircle, Check, CheckCheck, Filter, Search, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import clsx from '../utils/clsx';

interface Notification {
  id: string;
  type: 'quiz_reward' | 'new_chapter' | 'comment' | 'achievement' | 'system' | 'follow' | 'tip';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  metadata?: {
    tokens?: number;
    nft?: boolean;
    novelTitle?: string;
    chapterTitle?: string;
    username?: string;
    achievementName?: string;
  };
}

const NotificationsPage = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock notifications - in a real app, these would come from your backend
  useEffect(() => {
    if (user) {
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'quiz_reward',
          title: 'Perfect Quiz Score!',
          message: 'You earned 10 TALE tokens and an exclusive NFT for scoring 100% on "The Ethereum Chronicles" quiz',
          timestamp: '2 minutes ago',
          read: false,
          actionUrl: '/profile',
          metadata: { tokens: 10, nft: true, novelTitle: 'The Ethereum Chronicles' }
        },
        {
          id: '2',
          type: 'new_chapter',
          title: 'New Chapter Available',
          message: 'Chapter 3 "The Smart Contract Killer" of "Whispers of the Blockchain" has been published',
          timestamp: '1 hour ago',
          read: false,
          actionUrl: '/novel/2',
          metadata: { novelTitle: 'Whispers of the Blockchain', chapterTitle: 'The Smart Contract Killer' }
        },
        {
          id: '3',
          type: 'tip',
          title: 'You Received a Tip!',
          message: 'A reader tipped you 5 TALE tokens for your story "Digital Hearts"',
          timestamp: '2 hours ago',
          read: false,
          actionUrl: '/profile',
          metadata: { tokens: 5, novelTitle: 'Digital Hearts' }
        },
        {
          id: '4',
          type: 'comment',
          title: 'New Comment',
          message: 'Alex Blockman replied to your comment: "Great analysis of the consensus mechanism!"',
          timestamp: '3 hours ago',
          read: true,
          actionUrl: '/novel/1',
          metadata: { username: 'Alex Blockman', novelTitle: 'The Ethereum Chronicles' }
        },
        {
          id: '5',
          type: 'achievement',
          title: 'Achievement Unlocked!',
          message: 'You\'ve earned the "Bookworm" achievement for reading 5 novels',
          timestamp: '5 hours ago',
          read: true,
          actionUrl: '/profile',
          metadata: { achievementName: 'Bookworm' }
        },
        {
          id: '6',
          type: 'follow',
          title: 'New Follower',
          message: 'Maya Satoshi started following you',
          timestamp: '1 day ago',
          read: true,
          actionUrl: '/profile',
          metadata: { username: 'Maya Satoshi' }
        },
        {
          id: '7',
          type: 'quiz_reward',
          title: 'Quiz Completed',
          message: 'You earned 5 TALE tokens for scoring 85% on "Love in the Age of Smart Contracts" quiz',
          timestamp: '1 day ago',
          read: true,
          actionUrl: '/profile',
          metadata: { tokens: 5, novelTitle: 'Love in the Age of Smart Contracts' }
        },
        {
          id: '8',
          type: 'new_chapter',
          title: 'New Chapter Available',
          message: 'Chapter 2 "Consensus Mechanism" of "The Ethereum Chronicles" has been published',
          timestamp: '2 days ago',
          read: true,
          actionUrl: '/novel/1',
          metadata: { novelTitle: 'The Ethereum Chronicles', chapterTitle: 'Consensus Mechanism' }
        },
        {
          id: '9',
          type: 'system',
          title: 'Welcome to Taleverse!',
          message: 'Your account has been created successfully. You\'ve received 50 TALE tokens to get started!',
          timestamp: '3 days ago',
          read: true,
          actionUrl: '/discover',
          metadata: { tokens: 50 }
        }
      ];
      setNotifications(mockNotifications);
    }
  }, [user]);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'quiz_reward':
        return Award;
      case 'new_chapter':
        return BookOpen;
      case 'comment':
        return MessageCircle;
      case 'achievement':
        return Award;
      case 'follow':
        return Users;
      case 'tip':
        return Award;
      case 'system':
        return Bell;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'quiz_reward':
        return 'text-success-600 bg-success-100 dark:bg-success-900/30';
      case 'new_chapter':
        return 'text-primary-600 bg-primary-100 dark:bg-primary-900/30';
      case 'comment':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'achievement':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'follow':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';
      case 'tip':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'system':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const filteredNotifications = notifications.filter(notification => {
    // Filter by read status
    if (filter === 'unread' && notification.read) return false;
    if (filter === 'read' && !notification.read) return false;
    
    // Filter by type
    if (typeFilter !== 'all' && notification.type !== typeFilter) return false;
    
    // Filter by search term
    if (searchTerm && !notification.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !notification.message.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Please sign in
        </h2>
        <p className="text-[var(--text-secondary)] mt-2">
          You need to be logged in to view notifications
        </p>
        <Link to="/login" className="btn-primary mt-4">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">
            Notifications
          </h1>
          <p className="text-[var(--text-secondary)]">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="btn-secondary mt-4 sm:mt-0"
          >
            <CheckCheck className="h-4 w-4 mr-2" />
            Mark all as read
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>
          
          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="input"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
          
          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="input"
          >
            <option value="all">All Types</option>
            <option value="quiz_reward">Quiz Rewards</option>
            <option value="new_chapter">New Chapters</option>
            <option value="comment">Comments</option>
            <option value="achievement">Achievements</option>
            <option value="follow">Follows</option>
            <option value="tip">Tips</option>
            <option value="system">System</option>
          </select>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => {
            const IconComponent = getNotificationIcon(notification.type);
            const colorClasses = getNotificationColor(notification.type);
            
            return (
              <div
                key={notification.id}
                className={clsx(
                  "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-200 hover:shadow-lg",
                  !notification.read && "ring-2 ring-primary-200 dark:ring-primary-800"
                )}
              >
                <div className="flex items-start space-x-4">
                  <div className={clsx("flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center", colorClasses)}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={clsx(
                            "text-lg font-medium",
                            notification.read 
                              ? "text-gray-700 dark:text-gray-300" 
                              : "text-gray-900 dark:text-white"
                          )}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                          )}
                        </div>
                        
                        <p className="text-[var(--text-secondary)] mb-3">
                          {notification.message}
                        </p>
                        
                        {/* Metadata */}
                        {notification.metadata && (
                          <div className="flex items-center space-x-4 mb-3">
                            {notification.metadata.tokens && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300">
                                +{notification.metadata.tokens} TALE
                              </span>
                            )}
                            {notification.metadata.nft && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">
                                🏆 NFT Earned
                              </span>
                            )}
                            {notification.metadata.novelTitle && (
                              <span className="text-xs text-primary-600 dark:text-primary-400">
                                {notification.metadata.novelTitle}
                              </span>
                            )}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {notification.timestamp}
                          </p>
                          
                          <div className="flex items-center space-x-2">
                            {notification.actionUrl && (
                              <Link
                                to={notification.actionUrl}
                                onClick={() => markAsRead(notification.id)}
                                className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                              >
                                View →
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            title="Mark as read"
                          >
                            <Check className="h-4 w-4 text-gray-500" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-gray-500 hover:text-red-600"
                          title="Delete notification"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm || filter !== 'all' || typeFilter !== 'all' 
                ? 'No notifications match your filters' 
                : 'No notifications yet'
              }
            </h3>
            <p className="text-[var(--text-secondary)]">
              {searchTerm || filter !== 'all' || typeFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Start reading stories and taking quizzes to receive notifications!'
              }
            </p>
            {(searchTerm || filter !== 'all' || typeFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilter('all');
                  setTypeFilter('all');
                }}
                className="btn-secondary mt-4"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;