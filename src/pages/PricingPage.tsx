import React, { useState } from 'react';
import { Check, Star, Zap, Crown } from 'lucide-react';

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Reader",
      icon: Star,
      price: { monthly: 0, annual: 0 },
      description: "Perfect for casual readers who want to explore stories",
      features: [
        "Access to all free stories",
        "Preview chapters for premium content",
        "Basic quiz participation",
        "Community forum access",
        "50 TALE tokens to start",
        "Mobile app access"
      ],
      limitations: [
        "Limited premium content access",
        "Standard customer support"
      ],
      buttonText: "Get Started Free",
      popular: false,
      color: "primary"
    },
    {
      name: "Enthusiast",
      icon: Zap,
      price: { monthly: 9.99, annual: 99.99 },
      description: "For avid readers who want unlimited access",
      features: [
        "Everything in Reader plan",
        "Unlimited access to premium stories",
        "Advanced quiz features with higher rewards",
        "Priority customer support",
        "Monthly bonus TALE tokens",
        "Early access to new releases",
        "Exclusive author Q&A sessions",
        "Reading analytics dashboard"
      ],
      limitations: [],
      buttonText: "Start Free Trial",
      popular: true,
      color: "accent"
    },
    {
      name: "Creator",
      icon: Crown,
      price: { monthly: 19.99, annual: 199.99 },
      description: "For writers who want to monetize their stories",
      features: [
        "Everything in Enthusiast plan",
        "Unlimited story publishing",
        "Advanced creator analytics",
        "Revenue sharing (85% to creator)",
        "Custom quiz creation tools",
        "Priority story promotion",
        "Direct reader messaging",
        "Collaborative writing tools",
        "NFT minting capabilities",
        "Dedicated creator support"
      ],
      limitations: [],
      buttonText: "Start Creating",
      popular: false,
      color: "primary"
    }
  ];

  const tokenPackages = [
    { amount: 100, price: 4.99, bonus: 0 },
    { amount: 500, price: 19.99, bonus: 50 },
    { amount: 1000, price: 34.99, bonus: 150 },
    { amount: 2500, price: 79.99, bonus: 500 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">
          Choose Your Plan
        </h1>
        <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-8">
          Start reading for free, or unlock premium features to enhance your storytelling experience.
        </p>
        
        {/* Billing Toggle */}
        <div className="flex items-center justify-center space-x-4">
          <span className={`text-sm ${!isAnnual ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isAnnual ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isAnnual ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm ${isAnnual ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500'}`}>
            Annual
          </span>
          {isAnnual && (
            <span className="text-sm bg-success-100 dark:bg-success-900 text-success-700 dark:text-success-300 px-2 py-1 rounded-full">
              Save 17%
            </span>
          )}
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`card relative ${
              plan.popular 
                ? 'border-2 border-accent-500 shadow-xl scale-105' 
                : 'border border-[var(--border-color)]'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-accent-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="p-8">
              <div className="flex items-center mb-4">
                <plan.icon className={`h-8 w-8 text-${plan.color}-600 mr-3`} />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${isAnnual ? plan.price.annual : plan.price.monthly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-[var(--text-secondary)] ml-2">
                      /{isAnnual ? 'year' : 'month'}
                    </span>
                  )}
                </div>
                <p className="text-[var(--text-secondary)] mt-2">
                  {plan.description}
                </p>
              </div>
              
              <button
                className={`btn-${plan.popular ? 'accent' : 'primary'} w-full mb-6`}
              >
                {plan.buttonText}
              </button>
              
              <div className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Token Packages */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-4">
            TALE Token Packages
          </h2>
          <p className="text-lg text-[var(--text-secondary)]">
            Purchase TALE tokens to unlock premium content and support your favorite authors
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tokenPackages.map((pkg, index) => (
            <div key={index} className="card p-6 text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {pkg.amount}
                {pkg.bonus > 0 && (
                  <span className="text-lg text-success-600 dark:text-success-400">
                    +{pkg.bonus}
                  </span>
                )}
              </div>
              <div className="text-sm text-[var(--text-secondary)] mb-4">
                TALE Tokens
                {pkg.bonus > 0 && (
                  <div className="text-success-600 dark:text-success-400">
                    Bonus: {pkg.bonus} tokens
                  </div>
                )}
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                ${pkg.price}
              </div>
              <button className="btn-secondary w-full">
                Purchase
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-12 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Can I change my plan anytime?
              </h3>
              <p className="text-[var(--text-secondary)]">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                What are TALE tokens used for?
              </h3>
              <p className="text-[var(--text-secondary)]">
                TALE tokens can be used to purchase premium stories, tip authors, and participate in platform governance.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Is there a free trial?
              </h3>
              <p className="text-[var(--text-secondary)]">
                Yes, all paid plans come with a 7-day free trial. No credit card required to start.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                How do creators earn money?
              </h3>
              <p className="text-[var(--text-secondary)]">
                Creators earn through story purchases, tips, and our revenue sharing program (85% to creators).
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Are NFTs included in all plans?
              </h3>
              <p className="text-[var(--text-secondary)]">
                NFT rewards are earned through quiz completion and special achievements, available to all users.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-[var(--text-secondary)]">
                We accept all major credit cards, PayPal, and cryptocurrency payments.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl p-12 text-white">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of readers and writers on Taleverse today.
          </p>
          <button className="btn bg-white text-primary-700 hover:bg-gray-100 text-lg py-3 px-8">
            Get Started Free
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;