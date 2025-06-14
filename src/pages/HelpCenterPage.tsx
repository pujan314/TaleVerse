import React, { useState } from 'react';
import { Search, BookOpen, Coins, Users, Settings, MessageCircle, ExternalLink } from 'lucide-react';

const HelpCenterPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: BookOpen },
    { id: 'getting-started', name: 'Getting Started', icon: BookOpen },
    { id: 'tokens', name: 'Tokens & Rewards', icon: Coins },
    { id: 'community', name: 'Community', icon: Users },
    { id: 'account', name: 'Account & Settings', icon: Settings },
  ];

  const helpArticles = [
    {
      id: 1,
      title: 'How to Create Your First Account',
      category: 'getting-started',
      description: 'Step-by-step guide to joining Taleverse and setting up your profile.',
      readTime: '3 min read',
      popular: true
    },
    {
      id: 2,
      title: 'Understanding TALE Tokens',
      category: 'tokens',
      description: 'Learn how to earn, spend, and manage your TALE tokens effectively.',
      readTime: '5 min read',
      popular: true
    },
    {
      id: 3,
      title: 'Taking Quizzes and Earning Rewards',
      category: 'tokens',
      description: 'Maximize your earnings by mastering the quiz system.',
      readTime: '4 min read',
      popular: false
    },
    {
      id: 4,
      title: 'Publishing Your First Story',
      category: 'getting-started',
      description: 'Complete guide to writing, formatting, and publishing content.',
      readTime: '8 min read',
      popular: true
    },
    {
      id: 5,
      title: 'Community Guidelines and Best Practices',
      category: 'community',
      description: 'How to be a positive member of the Taleverse community.',
      readTime: '6 min read',
      popular: false
    },
    {
      id: 6,
      title: 'Managing Your Profile and Privacy Settings',
      category: 'account',
      description: 'Customize your profile and control your privacy preferences.',
      readTime: '4 min read',
      popular: false
    },
    {
      id: 7,
      title: 'Troubleshooting Common Issues',
      category: 'account',
      description: 'Solutions to frequently encountered technical problems.',
      readTime: '7 min read',
      popular: true
    },
    {
      id: 8,
      title: 'Connecting with Other Readers and Writers',
      category: 'community',
      description: 'Build relationships and grow your network on Taleverse.',
      readTime: '5 min read',
      popular: false
    }
  ];

  const filteredArticles = helpArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularArticles = helpArticles.filter(article => article.popular);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">
          Help Center
        </h1>
        <p className="text-xl text-[var(--text-secondary)] mb-8">
          Find answers, get support, and learn how to make the most of Taleverse.
        </p>
        
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for help articles, guides, and tutorials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10 text-lg py-4"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="card p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
          <MessageCircle className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Contact Support</h3>
          <p className="text-[var(--text-secondary)] text-sm mb-4">
            Get personalized help from our support team
          </p>
          <button className="btn-primary text-sm">
            Send Message
          </button>
        </div>
        
        <div className="card p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
          <Users className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Community Forum</h3>
          <p className="text-[var(--text-secondary)] text-sm mb-4">
            Ask questions and get help from other users
          </p>
          <button className="btn-secondary text-sm">
            Visit Forum
          </button>
        </div>
        
        <div className="card p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
          <ExternalLink className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Video Tutorials</h3>
          <p className="text-[var(--text-secondary)] text-sm mb-4">
            Watch step-by-step video guides
          </p>
          <button className="btn-secondary text-sm">
            Watch Now
          </button>
        </div>
      </div>

      {/* Popular Articles */}
      {!searchTerm && selectedCategory === 'all' && (
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white mb-6">
            Popular Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {popularArticles.map((article) => (
              <div key={article.id} className="card p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {article.title}
                </h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  {article.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--text-secondary)]">
                    {article.readTime}
                  </span>
                  <span className="text-primary-600 dark:text-primary-400 text-sm font-medium">
                    Read Article →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <category.icon className="h-4 w-4 mr-2" />
            {category.name}
          </button>
        ))}
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white">
          {selectedCategory === 'all' ? 'All Articles' : categories.find(c => c.id === selectedCategory)?.name}
          <span className="text-[var(--text-secondary)] text-lg font-normal ml-2">
            ({filteredArticles.length} articles)
          </span>
        </h2>
        
        {filteredArticles.length > 0 ? (
          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <div key={article.id} className="card p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {article.title}
                      </h3>
                      {article.popular && (
                        <span className="ml-2 px-2 py-1 text-xs bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-[var(--text-secondary)] mb-3">
                      {article.description}
                    </p>
                    <div className="flex items-center text-sm text-[var(--text-secondary)]">
                      <span>{article.readTime}</span>
                      <span className="mx-2">•</span>
                      <span className="capitalize">
                        {categories.find(c => c.id === article.category)?.name}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <ExternalLink className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No articles found
            </h3>
            <p className="text-[var(--text-secondary)]">
              Try adjusting your search terms or browse different categories.
            </p>
          </div>
        )}
      </div>

      {/* Contact Section */}
      <div className="mt-16">
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/30 dark:to-accent-900/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white mb-4">
            Still Need Help?
          </h3>
          <p className="text-[var(--text-secondary)] mb-6">
            Our support team is available 24/7 to assist you with any questions or issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Contact Support Team
            </button>
            <button className="btn-secondary">
              Schedule a Call
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">Email Support</h4>
                <p className="text-[var(--text-secondary)]">support@taleverse.com</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">Response Time</h4>
                <p className="text-[var(--text-secondary)]">Usually within 2 hours</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">Live Chat</h4>
                <p className="text-[var(--text-secondary)]">Available 9 AM - 6 PM EST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;