import React from 'react';
import { Users, Vote, Coins, TrendingUp, Shield, Zap } from 'lucide-react';

const DAOGovernancePage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">
          DAO Governance
        </h1>
        <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
          Participate in the decentralized governance of Taleverse. Your voice shapes the future of our platform.
        </p>
      </div>

      {/* What is DAO */}
      <div className="mb-16">
        <div className="flex items-center mb-8">
          <Users className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
          <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white">
            What is a DAO?
          </h2>
        </div>
        
        <div className="card p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-[var(--text-secondary)] mb-6">
                A Decentralized Autonomous Organization (DAO) is a community-led entity with no central authority. 
                Taleverse DAO gives TALE token holders the power to propose and vote on platform decisions.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-3"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Democratic Decision Making:</strong> Every token holder has a voice in platform governance
                  </span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-3"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Transparent Process:</strong> All proposals and votes are recorded on the blockchain
                  </span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-3"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Community Ownership:</strong> Users collectively own and control the platform's future
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-xl p-8">
              <div className="text-center">
                <Users className="h-16 w-16 text-primary-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  5,000+
                </div>
                <div className="text-[var(--text-secondary)]">Active DAO Members</div>
                <div className="mt-4 text-sm text-[var(--text-secondary)]">
                  Growing community of engaged stakeholders
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Governance Process */}
      <div className="mb-16">
        <div className="flex items-center mb-8">
          <Vote className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
          <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white">
            Governance Process
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card p-6 text-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-600 dark:text-primary-400 text-2xl font-bold">1</span>
            </div>
            <h3 className="text-lg font-semibold mb-3">Proposal Submission</h3>
            <p className="text-[var(--text-secondary)] text-sm">
              Community members stake 1,000 TALE tokens to submit governance proposals
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-600 dark:text-primary-400 text-2xl font-bold">2</span>
            </div>
            <h3 className="text-lg font-semibold mb-3">Community Discussion</h3>
            <p className="text-[var(--text-secondary)] text-sm">
              7-day discussion period for community feedback and proposal refinement
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-600 dark:text-primary-400 text-2xl font-bold">3</span>
            </div>
            <h3 className="text-lg font-semibold mb-3">Voting Period</h3>
            <p className="text-[var(--text-secondary)] text-sm">
              5-day voting window where token holders cast their votes
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-600 dark:text-primary-400 text-2xl font-bold">4</span>
            </div>
            <h3 className="text-lg font-semibold mb-3">Implementation</h3>
            <p className="text-[var(--text-secondary)] text-sm">
              Approved proposals are implemented by the development team within 30 days
            </p>
          </div>
        </div>
      </div>

      {/* Voting Power */}
      <div className="mb-16">
        <div className="flex items-center mb-8">
          <Coins className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
          <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white">
            Voting Power & Requirements
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              How Voting Power is Calculated
            </h3>
            <div className="space-y-4">
              <div className="bg-primary-50 dark:bg-primary-900/30 rounded-lg p-4">
                <h4 className="font-medium text-primary-700 dark:text-primary-300 mb-2">
                  Base Voting Power
                </h4>
                <p className="text-primary-600 dark:text-primary-400 text-sm">
                  1 TALE token = 1 vote (for staked tokens)
                </p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">Platform Activity Multiplier</h4>
                  <ul className="text-[var(--text-secondary)] text-sm space-y-1">
                    <li>• Active readers: +10% voting power</li>
                    <li>• Content creators: +25% voting power</li>
                    <li>• Community moderators: +15% voting power</li>
                    <li>• Long-term stakers (6+ months): +20% voting power</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Participation Requirements
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">To Vote</h4>
                <ul className="text-[var(--text-secondary)] space-y-1 text-sm">
                  <li>• Minimum 100 staked TALE tokens</li>
                  <li>• Account age of at least 30 days</li>
                  <li>• Completed identity verification</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">To Submit Proposals</h4>
                <ul className="text-[var(--text-secondary)] space-y-1 text-sm">
                  <li>• Minimum 1,000 staked TALE tokens</li>
                  <li>• Account age of at least 90 days</li>
                  <li>• Previous community participation</li>
                  <li>• Proposal bond (returned if approved)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Governance Areas */}
      <div className="mb-16">
        <div className="flex items-center mb-8">
          <Shield className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
          <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white">
            What Can Be Governed
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card p-6">
            <TrendingUp className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Platform Features</h3>
            <ul className="text-[var(--text-secondary)] space-y-2 text-sm">
              <li>• New feature development priorities</li>
              <li>• User interface improvements</li>
              <li>• Reading and writing tools</li>
              <li>• Mobile app features</li>
            </ul>
          </div>
          
          <div className="card p-6">
            <Coins className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Token Economics</h3>
            <ul className="text-[var(--text-secondary)] space-y-2 text-sm">
              <li>• Reward distribution mechanisms</li>
              <li>• Token burn schedules</li>
              <li>• Staking reward rates</li>
              <li>• Fee structures</li>
            </ul>
          </div>
          
          <div className="card p-6">
            <Users className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Community Policies</h3>
            <ul className="text-[var(--text-secondary)] space-y-2 text-sm">
              <li>• Content moderation guidelines</li>
              <li>• Community rules and standards</li>
              <li>• Creator support programs</li>
              <li>• Partnership decisions</li>
            </ul>
          </div>
          
          <div className="card p-6">
            <Shield className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Treasury Management</h3>
            <ul className="text-[var(--text-secondary)] space-y-2 text-sm">
              <li>• Fund allocation for development</li>
              <li>• Marketing and growth initiatives</li>
              <li>• Community grants and bounties</li>
              <li>• Emergency fund usage</li>
            </ul>
          </div>
          
          <div className="card p-6">
            <Zap className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Technical Upgrades</h3>
            <ul className="text-[var(--text-secondary)] space-y-2 text-sm">
              <li>• Smart contract upgrades</li>
              <li>• Blockchain integrations</li>
              <li>• Security improvements</li>
              <li>• Performance optimizations</li>
            </ul>
          </div>
          
          <div className="card p-6">
            <Vote className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Governance Rules</h3>
            <ul className="text-[var(--text-secondary)] space-y-2 text-sm">
              <li>• Voting thresholds and quorums</li>
              <li>• Proposal requirements</li>
              <li>• Discussion period lengths</li>
              <li>• Emergency procedures</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Current Proposals */}
      <div className="mb-16">
        <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-8 text-center">
          Active Proposals
        </h2>
        
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  TIP-001: Implement Advanced Reader Analytics
                </h3>
                <p className="text-[var(--text-secondary)]">
                  Proposal to add detailed reading analytics for users to track their reading habits, 
                  preferences, and progress across different genres and authors.
                </p>
              </div>
              <span className="px-3 py-1 bg-success-100 dark:bg-success-900 text-success-700 dark:text-success-300 rounded-full text-sm">
                Voting
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-success-600">67%</div>
                <div className="text-sm text-[var(--text-secondary)]">Yes Votes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-error-600">23%</div>
                <div className="text-sm text-[var(--text-secondary)]">No Votes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">2 days</div>
                <div className="text-sm text-[var(--text-secondary)]">Remaining</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-[var(--text-secondary)]">
                Proposed by: @alexdev • 1,250 TALE staked
              </div>
              <button className="btn-primary text-sm">
                View Details & Vote
              </button>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  TIP-002: Increase Creator Revenue Share to 90%
                </h3>
                <p className="text-[var(--text-secondary)]">
                  Proposal to increase the creator revenue share from 85% to 90% to better support 
                  writers and encourage more high-quality content creation.
                </p>
              </div>
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm">
                Discussion
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">45</div>
                <div className="text-sm text-[var(--text-secondary)]">Comments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">156</div>
                <div className="text-sm text-[var(--text-secondary)]">Supporters</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">4 days</div>
                <div className="text-sm text-[var(--text-secondary)]">Until Voting</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-[var(--text-secondary)]">
                Proposed by: @writersunion • 2,500 TALE staked
              </div>
              <button className="btn-secondary text-sm">
                Join Discussion
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Get Involved */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl p-12 text-white">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Shape the Future of Taleverse
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Your participation in governance helps build a platform that serves the entire community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn bg-white text-primary-700 hover:bg-gray-100 text-lg py-3 px-8">
              Stake TALE Tokens
            </button>
            <button className="btn bg-primary-700 text-white hover:bg-primary-800 border border-primary-500 text-lg py-3 px-8">
              View All Proposals
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-primary-500/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm opacity-90">
              <div>
                <h4 className="font-medium mb-1">Minimum to Vote</h4>
                <p>100 staked TALE tokens</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Minimum to Propose</h4>
                <p>1,000 staked TALE tokens</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Voting Frequency</h4>
                <p>New proposals weekly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DAOGovernancePage;