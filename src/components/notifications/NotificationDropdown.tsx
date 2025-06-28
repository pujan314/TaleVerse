import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, X, Check, Clock, Award, BookOpen, Users, MessageCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import clsx from '../../utils/clsx';

interface Notification {
  id: string;
  type: 'quiz_reward' | 'new_chapter' | 'comment' | 'achievement' | 'system';
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
  };
}

const NotificationDropdown = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mock notifications - in a real app, these would come from your backend
  useEffect(() => {
    if (user) {
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'quiz_reward',
          title: 'Quiz Completed!',
          message: 'You earned 10 TALE tokens for scoring 100% on "The Ethereum Chronicles" quiz',
          timestamp: '2 minutes ago',
          read: false,
          actionUrl: '/profile',
          metadata: { tokens: 10, nft: true, novelTitle: 'The Ethereum Chronicles' }
        },
        {
          id: '2',
          type: 'new_chapter',
          title: 'New Chapter Available',
          message: 'Chapter 3 of "Whispers of the Blockchain" has been published',
          timestamp: '1 hour ago',
          read: false,
          actionUrl: '/novel/2',
          metadata: { novelTitle: 'Whispers of the Blockchain', chapterTitle: 'The Smart Contract Killer' }
        },
        {
          id: '3',
          type: 'comment',
          title: 'New Comment',
          message: 'Alex Blockman replied to your comment on "The Ethereum Chronicles"',
          timestamp: '3 hours ago',
          read: true,
          actionUrl: '/novel/1',
          metadata: { username: 'Alex Blockman', novelTitle: 'The Ethereum Chronicles' }
        },
        {
          id: '4',
          type: 'achievement',
          title: 'Achievement Unlocked!',
          message: 'You\'ve earned the "Bookworm" achievement for reading 5 novels',
          timestamp: '1 day ago',
          read: true,
          actionUrl: '/profile',
          metadata: {}
        },
        {
          id: '5',
          type: 'system',
          title: 'Welcome to Taleverse!',
          message: 'Your account has been created successfully. Start exploring amazing stories!',
          timestamp: '2 days ago',
          read: true,
          actionUrl: '/discover',
          metadata: {}
        }
      ];
      setNotifications(mockNotifications);
    }
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

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
      case 'system':
        return Bell;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'quiz_reward':
        return 'text-success-600';
      case 'new_chapter':
        return 'text-primary-600';
      case 'comment':
        return 'text-blue-600';
      case 'achievement':
        return 'text-yellow-600';
      case 'system':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  // Don't render if user is not available (prevents flash during auth refresh)
  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 relative transition-colors"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 block h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center ring-2 ring-white dark:ring-gray-900">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-96 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-20 max-h-96 overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Notifications
              </h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                  >
                    Mark all read
                  </button>
                )}
                <Link
                  to="/notifications"
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                >
                  View all
                </Link>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.slice(0, 5).map((notification) => {
                  const IconComponent = getNotificationIcon(notification.type);
                  const iconColor = getNotificationColor(notification.type);
                  
                  return (
                    <div
                      key={notification.id}
                      className={clsx(
                        "px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
                        !notification.read && "bg-primary-50 dark:bg-primary-900/20"
                      )}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={clsx("flex-shrink-0 mt-1", iconColor)}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className={clsx(
                                "text-sm font-medium",
                                notification.read 
                                  ? "text-gray-700 dark:text-gray-300" 
                                  : "text-gray-900 dark:text-white"
                              )}>
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {notification.message}
                              </p>
                              
                              {/* Metadata */}
                              {notification.metadata && (
                                <div className="mt-2 flex items-center space-x-3 text-xs">
                                  {notification.metadata.tokens && (
                                    <span className="text-success-600 dark:text-success-400 font-medium">
                                      +{notification.metadata.tokens} TALE
                                    </span>
                                  )}
                                  {notification.metadata.nft && (
                                    <span className="text-yellow-600 dark:text-yellow-400 font-medium">
                                      🏆 NFT Earned
                                    </span>
                                  )}
                                </div>
                              )}
                              
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                {notification.timestamp}
                              </p>
                            </div>
                            
                            <div className="flex items-center space-x-1 ml-2">
                              {!notification.read && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification.id);
                                  }}
                                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                  title="Mark as read"
                                >
                                  <Check className="h-3 w-3 text-gray-500" />
                                </button>
                              )}
                            </div>
                          </div>
                          
                          {notification.actionUrl && (
                            <Link
                              to={notification.actionUrl}
                              onClick={() => {
                                setIsOpen(false);
                                markAsRead(notification.id);
                              }}
                              className="inline-block mt-2 text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                            >
                              View →
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="px-4 py-8 text-center">
                  <Bell className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No notifications yet
                  </p>
                </div>
              )}
            </div>

            {notifications.length > 5 && (
              <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-center">
                <Link
                  to="/notifications"
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                >
                  View all {notifications.length} notifications
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;