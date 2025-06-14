import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, BookOpen, Coins, Users, Shield } from 'lucide-react';

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: "Getting Started",
      icon: BookOpen,
      faqs: [
        {
          question: "How do I create an account on Taleverse?",
          answer: "Creating an account is simple! Click the 'Sign Up' button in the top right corner, enter your email and create a password. You'll receive 50 TALE tokens as a welcome bonus to start exploring premium content."
        },
        {
          question: "Is Taleverse free to use?",
          answer: "Yes! Taleverse offers a free tier that includes access to all free stories, preview chapters of premium content, basic quiz participation, and community features. You can upgrade to premium plans for unlimited access to all content."
        },
        {
          question: "What devices can I use to access Taleverse?",
          answer: "Taleverse works on all modern devices including desktop computers, tablets, and smartphones. Our responsive design ensures a great reading experience across all screen sizes."
        },
        {
          question: "How do I start reading stories?",
          answer: "Browse our 'Discover' section to find stories by genre, popularity, or author. Click on any story to start reading. Free stories are immediately accessible, while premium stories may require tokens or a subscription."
        }
      ]
    },
    {
      title: "TALE Tokens & Rewards",
      icon: Coins,
      faqs: [
        {
          question: "What are TALE tokens and how do I earn them?",
          answer: "TALE tokens are our platform currency. You can earn them by completing quizzes (2-10 tokens based on score), participating in community activities, and through daily reading streaks. Tokens can be used to purchase premium stories and tip authors."
        },
        {
          question: "How do quizzes work and what rewards can I earn?",
          answer: "After reading a story, you can take a comprehension quiz. Scores of 60%+ earn 2 tokens, 80%+ earn 5 tokens, 95%+ earn 10 tokens, and perfect scores (100%) earn an exclusive NFT plus tokens."
        },
        {
          question: "Can I purchase TALE tokens?",
          answer: "Yes! We offer token packages starting at $4.99 for 100 tokens. Larger packages include bonus tokens. You can also earn tokens for free through reading and quiz activities."
        },
        {
          question: "What are NFTs and how do I earn them?",
          answer: "NFTs are unique digital collectibles that prove your achievements on the platform. You can earn them by scoring 100% on quizzes, completing reading challenges, or participating in special events. They're stored in your profile and can be traded."
        }
      ]
    },
    {
      title: "For Writers & Creators",
      icon: Users,
      faqs: [
        {
          question: "How do I publish my story on Taleverse?",
          answer: "Sign up for a Creator account, then use our publishing tools to upload your story chapter by chapter. You can set pricing, create quizzes, and choose which chapters to offer as previews. Stories are reviewed within 24 hours."
        },
        {
          question: "How much can I earn as a writer?",
          answer: "Writers keep 85% of revenue from story sales and tips. Earnings depend on your story's popularity, pricing, and reader engagement. Top writers earn hundreds of dollars monthly, while new writers typically start with $10-50."
        },
        {
          question: "Can I set my own prices for stories?",
          answer: "Yes! You have full control over pricing. You can offer stories for free, set a token price per chapter or for the full story, or use a subscription model. We recommend starting with lower prices to build an audience."
        },
        {
          question: "Do I retain rights to my work?",
          answer: "Absolutely! You retain full ownership and copyright of your work. Taleverse only has the right to display and distribute your content on our platform. You can remove your work at any time."
        }
      ]
    },
    {
      title: "Technical & Security",
      icon: Shield,
      faqs: [
        {
          question: "How secure is my data on Taleverse?",
          answer: "We use industry-standard encryption and security measures. Your personal data is protected, and blockchain technology ensures transparent and immutable records of your achievements and transactions."
        },
        {
          question: "What blockchain does Taleverse use?",
          answer: "Taleverse is built on Ethereum and compatible networks, ensuring security, transparency, and interoperability with other Web3 platforms. Your tokens and NFTs are stored securely on-chain."
        },
        {
          question: "Can I export my data?",
          answer: "Yes! You can export your reading history, earned tokens, NFTs, and other data at any time. We believe in data portability and user ownership."
        },
        {
          question: "What happens if I forget my password?",
          answer: "Use the 'Forgot Password' link on the login page to reset your password via email. For additional security, we recommend enabling two-factor authentication in your account settings."
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-[var(--text-secondary)] mb-8">
          Find answers to common questions about Taleverse, tokens, and storytelling.
        </p>
        
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="space-y-8">
        {filteredFAQs.map((category, categoryIndex) => (
          <div key={categoryIndex} className="card p-6">
            <div className="flex items-center mb-6">
              <category.icon className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
              <h2 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white">
                {category.title}
              </h2>
            </div>
            
            <div className="space-y-4">
              {category.faqs.map((faq, faqIndex) => {
                const globalIndex = categoryIndex * 100 + faqIndex;
                const isOpen = openItems.includes(globalIndex);
                
                return (
                  <div key={faqIndex} className="border border-[var(--border-color)] rounded-lg">
                    <button
                      onClick={() => toggleItem(globalIndex)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <span className="font-medium text-gray-900 dark:text-white pr-4">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    
                    {isOpen && (
                      <div className="px-6 pb-4">
                        <p className="text-[var(--text-secondary)] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {searchTerm && filteredFAQs.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No results found
          </h3>
          <p className="text-[var(--text-secondary)]">
            Try searching with different keywords or browse our categories above.
          </p>
        </div>
      )}

      {/* Contact Section */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/30 dark:to-accent-900/30 rounded-xl p-8">
          <h3 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white mb-4">
            Still have questions?
          </h3>
          <p className="text-[var(--text-secondary)] mb-6">
            Our support team is here to help you get the most out of Taleverse.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Contact Support
            </button>
            <button className="btn-secondary">
              Join Community Discord
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;