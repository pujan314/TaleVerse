import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { Wallet, Coins, Award, TrendingUp, Send, Plus, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTokens } from '../hooks/useTokens';
import { useNFTs } from '../hooks/useNFTs';
import TokenBalance from '../components/web3/TokenBalance';
import NFTGallery from '../components/web3/NFTGallery';
import WalletButton from '../components/web3/WalletButton';

const Web3DashboardPage = () => {
  const { isConnected, address } = useAccount();
  const { user } = useAuth();
  const { transferTokens, tipAuthor, claimRewards } = useTokens();
  const { nfts } = useNFTs();
  const [activeTab, setActiveTab] = useState<'overview' | 'tokens' | 'nfts' | 'transactions'>('overview');

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Please sign in
        </h2>
        <p className="text-[var(--text-secondary)] mt-2">
          You need to be logged in to access your Web3 dashboard
        </p>
      </div>
    );
  }

  const stats = [
    {
      label: 'TALE Tokens',
      value: user.tokens || 0,
      icon: Coins,
      color: 'text-primary-600',
      bgColor: 'bg-primary-100 dark:bg-primary-900'
    },
    {
      label: 'NFTs Owned',
      value: nfts.length,
      icon: Award,
      color: 'text-accent-600',
      bgColor: 'bg-accent-100 dark:bg-accent-900'
    },
    {
      label: 'Total Earned',
      value: `${(user.tokens || 0) * 0.1}`, // Mock USD value
      icon: TrendingUp,
      color: 'text-success-600',
      bgColor: 'bg-success-100 dark:bg-success-900',
      prefix: '$'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">
            Web3 Dashboard
          </h1>
          <p className="text-[var(--text-secondary)]">
            Manage your tokens, NFTs, and blockchain interactions
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <WalletButton />
        </div>
      </div>

      {/* Wallet Status */}
      {!isConnected && (
        <div className="bg-warning-50 dark:bg-warning-900/30 border border-warning-200 dark:border-warning-800 rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <Wallet className="h-5 w-5 text-warning-600 mr-2" />
            <p className="text-warning-800 dark:text-warning-200">
              Connect your wallet to access full Web3 features and sync your tokens with the blockchain.
            </p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-secondary)]">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.prefix}{typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-[var(--border-color)] mb-8">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'tokens', label: 'Tokens', icon: Coins },
            { id: 'nfts', label: 'NFTs', icon: Award },
            { id: 'transactions', label: 'Transactions', icon: ExternalLink }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-[var(--text-secondary)] hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-5 w-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TokenBalance showActions={true} />
          <NFTGallery maxItems={4} />
        </div>
      )}

      {activeTab === 'tokens' && (
        <div className="space-y-8">
          <TokenBalance showActions={true} />
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Token Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="btn-primary flex items-center justify-center space-x-2">
                <Send className="h-4 w-4" />
                <span>Send Tokens</span>
              </button>
              <button className="btn-secondary flex items-center justify-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Buy Tokens</span>
              </button>
              <button className="btn-accent flex items-center justify-center space-x-2">
                <Award className="h-4 w-4" />
                <span>Claim Rewards</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'nfts' && (
        <NFTGallery />
      )}

      {activeTab === 'transactions' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Transactions
          </h3>
          <div className="text-center py-8">
            <ExternalLink className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-[var(--text-secondary)]">
              Transaction history will appear here once you start using Web3 features.
            </p>
            {isConnected && address && (
              <a
                href={`https://etherscan.io/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary mt-4 inline-flex items-center space-x-2"
              >
                <ExternalLink className="h-4 w-4" />
                <span>View on Etherscan</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Web3DashboardPage;