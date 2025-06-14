import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Github, Twitter, Instagram, Facebook, Youtube, Linkedin, MessageCircle, Zap } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://x.com/taleverse_co',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/taleverse.co/',
      color: 'hover:text-pink-400'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://www.youtube.com/channel/UCXP0strac180COKYhINMFRg',
      color: 'hover:text-red-500'
    },
    {
      name: 'Discord',
      icon: MessageCircle,
      url: 'https://discord.gg/taleverse',
      color: 'hover:text-indigo-500'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/taleverse',
      color: 'hover:text-gray-600 dark:hover:text-gray-300'
    }
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-[var(--border-color)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6 text-primary-600" />
              <span className="text-lg font-serif font-bold text-gray-900 dark:text-white">
                Taleverse
              </span>
            </Link>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              Web3-powered platform for immersive storytelling and literary experiences.
            </p>
            
            {/* Social Media Links */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 transition-all duration-200 ${social.color} hover:scale-110 hover:shadow-md`}
                  title={`Follow us on ${social.name}`}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-[var(--text-secondary)] hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-sm text-[var(--text-secondary)] hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-[var(--text-secondary)] hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-[var(--text-secondary)] hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/writer-guidelines" className="text-sm text-[var(--text-secondary)] hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Writer Guidelines
                </Link>
              </li>
              <li>
                <Link to="/community-rules" className="text-sm text-[var(--text-secondary)] hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Community Rules
                </Link>
              </li>
              <li>
                <Link to="/token-economy" className="text-sm text-[var(--text-secondary)] hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Token Economy
                </Link>
              </li>
              <li>
                <Link to="/help-center" className="text-sm text-[var(--text-secondary)] hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-sm text-[var(--text-secondary)] hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-sm text-[var(--text-secondary)] hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/copyright" className="text-sm text-[var(--text-secondary)] hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Copyright
                </Link>
              </li>
              <li>
                <Link to="/dao-governance" className="text-sm text-[var(--text-secondary)] hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  DAO Governance
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-[var(--border-color)]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <p className="text-sm text-[var(--text-secondary)]">
                &copy; {new Date().getFullYear()} Taleverse. All rights reserved.
              </p>
              
              {/* Built on Bolt Badge */}
              <a
                href="https://bolt.new"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white text-sm font-medium rounded-full hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
                title="Built on Bolt - AI-powered full-stack web development"
              >
                <Zap className="h-4 w-4" />
                <span>Built on Bolt</span>
              </a>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <p className="text-sm text-[var(--text-secondary)]">
                Powered by decentralized technology
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-[var(--text-secondary)]">Follow us:</span>
                <div className="flex space-x-2">
                  <a
                    href="https://x.com/taleverse_co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.instagram.com/taleverse.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-pink-400 transition-colors"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCXP0strac180COKYhINMFRg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Youtube className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;