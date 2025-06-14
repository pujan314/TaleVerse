import React, { ReactNode, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true' || 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', (!darkMode).toString());
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50/30 via-transparent to-accent-50/30 dark:from-primary-950/30 dark:to-accent-950/30">
      <Header 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <div className="flex-1 flex">
        <Sidebar open={sidebarOpen} />
        
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 transition-all duration-200">
          <div className="max-w-8xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      <MobileNav open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <Footer />
    </div>
  );
};

export default Layout;