import React from 'react';
import { BookOpen, Users, Award, Coins, Shield, Globe, Twitter, Instagram, Youtube } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">
          About Taleverse
        </h1>
        <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
          Taleverse is the world's first Web3-powered storytelling platform that connects readers and writers 
          through immersive narratives, interactive quizzes, and blockchain-based rewards.
        </p>
      </div>

      {/* Mission Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-8 text-center">
          Our Mission
        </h2>
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/30 dark:to-accent-900/30 rounded-xl p-8">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            We believe that storytelling is one of humanity's most powerful tools for connection, education, and inspiration. 
            Taleverse harnesses the power of blockchain technology to create a fair, transparent, and rewarding ecosystem 
            where writers can monetize their creativity and readers can engage with content in meaningful ways.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-8 text-center">
          What Makes Us Different
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card p-6 text-center">
            <BookOpen className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Immersive Reading</h3>
            <p className="text-[var(--text-secondary)]">
              Experience stories like never before with interactive elements and rich multimedia content.
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <Award className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Earn While Reading</h3>
            <p className="text-[var(--text-secondary)]">
              Complete quizzes and engage with content to earn TALE tokens and exclusive NFTs.
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <Users className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Community Driven</h3>
            <p className="text-[var(--text-secondary)]">
              Join a vibrant community of readers and writers who shape the platform's future.
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <Coins className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Fair Monetization</h3>
            <p className="text-[var(--text-secondary)]">
              Writers earn directly from their audience through transparent blockchain transactions.
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <Shield className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Ownership Rights</h3>
            <p className="text-[var(--text-secondary)]">
              Creators maintain full ownership of their work with immutable proof on the blockchain.
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <Globe className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Global Access</h3>
            <p className="text-[var(--text-secondary)]">
              Borderless platform accessible to readers and writers worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-8 text-center">
          Our Vision
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            We envision a future where storytelling transcends traditional boundaries, where every reader becomes 
            an active participant in the narrative ecosystem, and where writers are fairly compensated for their 
            creative contributions.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Through blockchain technology, we're building a sustainable economy that rewards quality content, 
            encourages meaningful engagement, and preserves the integrity of creative works for future generations.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-8">
          Join Our Growing Community
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">10K+</div>
            <div className="text-sm text-[var(--text-secondary)]">Active Readers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">500+</div>
            <div className="text-sm text-[var(--text-secondary)]">Published Stories</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">100+</div>
            <div className="text-sm text-[var(--text-secondary)]">Writers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">50K+</div>
            <div className="text-sm text-[var(--text-secondary)]">Tokens Earned</div>
          </div>
        </div>
      </div>

      {/* Social Media & Community Section */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl p-12 text-white">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Connect With Our Community
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Follow us on social media for updates, writing tips, and community highlights.
          </p>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="https://x.com/taleverse_co"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 p-4 rounded-full transition-all duration-200 hover:scale-110"
            >
              <Twitter className="h-8 w-8" />
            </a>
            <a
              href="https://www.instagram.com/taleverse.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 p-4 rounded-full transition-all duration-200 hover:scale-110"
            >
              <Instagram className="h-8 w-8" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCXP0strac180COKYhINMFRg"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 p-4 rounded-full transition-all duration-200 hover:scale-110"
            >
              <Youtube className="h-8 w-8" />
            </a>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn bg-white text-primary-700 hover:bg-gray-100 text-lg py-3 px-8">
              Start Reading
            </button>
            <button className="btn bg-primary-700 text-white hover:bg-primary-800 border border-primary-500 text-lg py-3 px-8">
              Become a Writer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;