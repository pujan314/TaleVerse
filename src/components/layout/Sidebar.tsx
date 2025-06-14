import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, PenTool, Users, Trophy, BookMarked, MessageSquare, Wallet } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import clsx from '../../utils/clsx';

interface SidebarProps {
  open: boolean;
}

const Sidebar = ({ open }: SidebarProps) => {
  const { isLoggedIn, user } = useAuth();
  const location = useLocation();
  
  const navigationItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Discover', href: '/discover', icon: BookOpen },
    { name: 'Publish', href: '/publish', icon: PenTool, requireAuth: true },
    { name: 'Library', href: '/library', icon: BookMarked, requireAuth: true },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
    { name: 'Messages', href: '/messages', icon: MessageSquare, requireAuth: true },
    { name: 'Web3 Dashboard', href: '/web3', icon: Wallet, requireAuth: true },
  ];

  return (
    <aside 
      className={clsx(
        "fixed inset-y-0 left-0 z-20 transform lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-300 ease-in-out",
        open ? "translate-x-0" : "-translate-x-full",
        "w-64 bg-white dark:bg-gray-900 border-r border-[var(--border-color)] pt-16 lg:pt-0"
      )}
    >
      <div className="h-full flex flex-col overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigationItems.map((item) => {
            if (item.requireAuth && !isLoggedIn) return null;
            
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={clsx(
                  isActive
                    ? "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800",
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors"
                )}
              >
                <item.icon 
                  className={clsx(
                    isActive 
                      ? "text-primary-600 dark:text-primary-400" 
                      : "text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300",
                    "mr-3 flex-shrink-0 h-5 w-5 transition-colors"
                  )} 
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        {isLoggedIn && user?.isWriter && (
          <div className="p-4 border-t border-[var(--border-color)]">
            <div className="rounded-md bg-gradient-to-r from-primary-500 to-primary-700 p-4 text-white">
              <h3 className="text-sm font-medium">Writer Dashboard</h3>
              <p className="text-xs mt-1 text-primary-100">Track your earnings and engagement.</p>
              <Link 
                to="/writer-dashboard"
                className="mt-3 text-xs font-medium inline-flex items-center text-white hover:text-primary-100"
              >
                View Dashboard <span className="ml-1 text-lg">→</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;