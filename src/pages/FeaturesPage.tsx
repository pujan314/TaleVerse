import React from 'react';
import { BookOpen, Award, Users, Coins, Shield, Zap, Heart, TrendingUp } from 'lucide-react';

const FeaturesPage = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Immersive Reading Experience",
      description: "Rich, interactive stories with multimedia elements that bring narratives to life.",
      benefits: [
        "Chapter-by-chapter reading with progress tracking",
        "Preview chapters available for all users",
        "Responsive design for all devices",
        "Dark mode for comfortable reading"
      ]
    },
    {
      icon: Award,
      title: "Interactive Quizzes & Rewards",
      description: "Test your comprehension and earn tokens and NFTs for high scores.",
      benefits: [
        "Earn TALE tokens for quiz completion",
        "Unlock exclusive NFTs for perfect scores",
        "Track your reading comprehension progress",
        "Compete with other readers on leaderboards"
      ]
    },
    {
      icon: Users,
      title: "Vibrant Community",
      description: "Connect with fellow readers and writers in a supportive ecosystem.",
      benefits: [
        "Discussion forums for each novel",
        "Direct messaging with authors",
        "Book clubs and reading groups",
        "Community-driven content curation"
      ]
    },
    {
      icon: Coins,
      title: "Token Economy",
      description: "Earn and spend TALE tokens within the platform ecosystem.",
      benefits: [
        "Earn tokens through reading and quizzes",
        "Purchase premium content with tokens",
        "Support your favorite authors directly",
        "Stake tokens for governance voting"
      ]
    },
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Immutable ownership and transparent transactions powered by blockchain.",
      benefits: [
        "Permanent proof of authorship",
        "Transparent revenue sharing",
        "Secure digital asset ownership",
        "Decentralized content storage"
      ]
    },
    {
      icon: Zap,
      title: "Creator Tools",
      description: "Powerful publishing tools for writers to create and monetize content.",
      benefits: [
        "Easy-to-use story editor",
        "Chapter management system",
        "Analytics and earnings dashboard",
        "Automated quiz generation"
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">
          Platform Features
        </h1>
        <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
          Discover the innovative features that make Taleverse the premier destination 
          for Web3-powered storytelling and reading experiences.
        </p>
      </div>

      {/* Features Grid */}
      <div className="space-y-16">
        {features.map((feature, index) => (
          <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
            <div className="flex-1">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-4">
                  <feature.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h2>
              </div>
              
              <p className="text-lg text-[var(--text-secondary)] mb-6">
                {feature.description}
              </p>
              
              <ul className="space-y-3">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex-1">
              <div className="card p-8 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/30 dark:to-accent-900/30">
                <div className="w-full h-64 bg-gradient-to-br from-primary-200 to-accent-200 dark:from-primary-800 to-accent-800 rounded-lg flex items-center justify-center">
                  <feature.icon className="h-24 w-24 text-primary-600 dark:text-primary-400 opacity-50" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Features */}
      <div className="mt-20">
        <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-12 text-center">
          More Features Coming Soon
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card p-6 text-center opacity-75">
            <Heart className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">AI-Powered Recommendations</h3>
            <p className="text-[var(--text-secondary)]">
              Personalized story recommendations based on your reading history and preferences.
            </p>
          </div>
          
          <div className="card p-6 text-center opacity-75">
            <TrendingUp className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Advanced Analytics</h3>
            <p className="text-[var(--text-secondary)]">
              Detailed insights for authors on reader engagement and story performance.
            </p>
          </div>
          
          <div className="card p-6 text-center opacity-75">
            <Users className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Collaborative Writing</h3>
            <p className="text-[var(--text-secondary)]">
              Tools for multiple authors to collaborate on stories and share revenue.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-20 text-center">
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl p-12 text-white">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Ready to Experience the Future of Storytelling?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of readers and writers already exploring Taleverse.
          </p>
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

export default FeaturesPage;