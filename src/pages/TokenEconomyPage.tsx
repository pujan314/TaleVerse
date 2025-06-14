import React from 'react';
import { Coins, TrendingUp, Award, Users, Zap, Shield } from 'lucide-react';

const TokenEconomyPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">
          TALE Token Economy
        </h1>
        <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
          Discover how TALE tokens power the Taleverse ecosystem, creating value for readers, writers, and the community.
        </p>
      </div>

      {/* Token Overview */}
      <div className="mb-16">
        <div className="flex items-center mb-8">
          <Coins className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
          <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white">
            What are TALE Tokens?
          </h2>
        </div>
        
        <div className="card p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-[var(--text-secondary)] mb-6">
                TALE tokens are the native currency of the Taleverse platform, designed to create a sustainable 
                economy that rewards quality content creation and meaningful reader engagement.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-3"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Utility Token:</strong> Used for purchasing content, tipping creators, and platform governance
                  </span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-3"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Reward Mechanism:</strong> Earned through reading, quiz completion, and community participation
                  </span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-3"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Governance Rights:</strong> Stake tokens to vote on platform decisions and feature development
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-xl p-8">
              <div className="text-center">
                <Coins className="h-16 w-16 text-primary-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  1,000,000,000
                </div>
                <div className="text-[var(--text-secondary)]">Total Supply</div>
                <div className="mt-4 text-sm text-[var(--text-secondary)]">
                  Fixed supply with deflationary mechanisms
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How to Earn Tokens */}
      <div className="mb-16">
        <div className="flex items-center mb-8">
          <TrendingUp className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
          <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white">
            How to Earn TALE Tokens
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card p-6">
            <Award className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Quiz Completion</h3>
            <div className="space-y-2 text-[var(--text-secondary)]">
              <div className="flex justify-between">
                <span>60-79% Score:</span>
                <span className="font-medium">2 TALE</span>
              </div>
              <div className="flex justify-between">
                <span>80-94% Score:</span>
                <span className="font-medium">5 TALE</span>
              </div>
              <div className="flex justify-between">
                <span>95-99% Score:</span>
                <span className="font-medium">10 TALE</span>
              </div>
              <div className="flex justify-between">
                <span>100% Score:</span>
                <span className="font-medium">10 TALE + NFT</span>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <Users className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Community Engagement</h3>
            <div className="space-y-2 text-[var(--text-secondary)]">
              <div className="flex justify-between">
                <span>Daily Login:</span>
                <span className="font-medium">1 TALE</span>
              </div>
              <div className="flex justify-between">
                <span>Story Review:</span>
                <span className="font-medium">2 TALE</span>
              </div>
              <div className="flex justify-between">
                <span>Forum Participation:</span>
                <span className="font-medium">1-3 TALE</span>
              </div>
              <div className="flex justify-between">
                <span>Referral Bonus:</span>
                <span className="font-medium">25 TALE</span>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <Zap className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Creator Rewards</h3>
            <div className="space-y-2 text-[var(--text-secondary)]">
              <div className="flex justify-between">
                <span>Story Sales (85%):</span>
                <span className="font-medium">Variable</span>
              </div>
              <div className="flex justify-between">
                <span>Reader Tips:</span>
                <span className="font-medium">100%</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Bonus:</span>
                <span className="font-medium">50-500 TALE</span>
              </div>
              <div className="flex justify-between">
                <span>Achievement Rewards:</span>
                <span className="font-medium">10-100 TALE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Token Utility */}
      <div className="mb-16">
        <div className="flex items-center mb-8">
          <Shield className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
          <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white">
            Token Utility & Use Cases
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              For Readers
            </h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-3"></div>
                <span>Purchase premium stories and exclusive content</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-3"></div>
                <span>Tip favorite authors to show appreciation</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-3"></div>
                <span>Access premium features and early releases</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-3"></div>
                <span>Participate in exclusive events and contests</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-3"></div>
                <span>Vote on platform governance proposals</span>
              </li>
            </ul>
          </div>
          
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              For Writers
            </h3>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-3"></div>
                <span>Monetize content through direct sales</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-3"></div>
                <span>Receive tips and donations from readers</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-3"></div>
                <span>Promote stories through featured placements</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-3"></div>
                <span>Access advanced analytics and tools</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-3"></div>
                <span>Stake tokens for higher revenue sharing</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tokenomics */}
      <div className="mb-16">
        <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-8 text-center">
          Token Distribution
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Initial Distribution
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-primary-500 rounded mr-3"></div>
                  <span>Community Rewards</span>
                </div>
                <span className="font-medium">40%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-accent-500 rounded mr-3"></div>
                  <span>Creator Incentives</span>
                </div>
                <span className="font-medium">25%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-success-500 rounded mr-3"></div>
                  <span>Platform Development</span>
                </div>
                <span className="font-medium">20%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-warning-500 rounded mr-3"></div>
                  <span>Team & Advisors</span>
                </div>
                <span className="font-medium">10%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-500 rounded mr-3"></div>
                  <span>Reserve Fund</span>
                </div>
                <span className="font-medium">5%</span>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Deflationary Mechanisms
            </h3>
            <div className="space-y-4 text-[var(--text-secondary)]">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Token Burns</h4>
                <p className="text-sm">
                  5% of all platform fees are permanently removed from circulation quarterly.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Staking Rewards</h4>
                <p className="text-sm">
                  Stake tokens to earn 8-12% APY while supporting platform governance.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Buyback Program</h4>
                <p className="text-sm">
                  Platform profits are used to buy back tokens from the market monthly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Governance */}
      <div className="mb-16">
        <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-8 text-center">
          Governance & Voting
        </h2>
        
        <div className="card p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Proposal Submission</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Stake 1,000 TALE tokens to submit governance proposals for community voting.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Voting Power</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Your voting power is proportional to your staked token balance and platform activity.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Implementation</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Approved proposals are implemented by the development team within 30 days.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl p-12 text-white">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Start Earning TALE Tokens Today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join the Taleverse economy and be rewarded for your participation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn bg-white text-primary-700 hover:bg-gray-100 text-lg py-3 px-8">
              Start Reading & Earning
            </button>
            <button className="btn bg-primary-700 text-white hover:bg-primary-800 border border-primary-500 text-lg py-3 px-8">
              Become a Creator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenEconomyPage;