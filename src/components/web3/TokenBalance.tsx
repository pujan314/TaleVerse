import React from 'react';
import { Coins, RefreshCw, Send, Plus } from 'lucide-react';
import { useTokens } from '../../hooks/useTokens';
import { useAuth } from '../../contexts/AuthContext';

interface TokenBalanceProps {
  showActions?: boolean;
  className?: string;
}

export default function TokenBalance({ showActions = false, className = '' }: TokenBalanceProps) {
  const { blockchainBalance, databaseBalance, isTransferring, syncTokenBalance } = useTokens();
  const { user } = useAuth();

  const displayBalance = user?.tokens || databaseBalance;
  const hasDiscrepancy = Math.abs(blockchainBalance - displayBalance) > 0.001;

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Coins className="h-6 w-6 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            TALE Tokens
          </h3>
        </div>
        
        <button
          onClick={syncTokenBalance}
          className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Sync balance"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[var(--text-secondary)]">Platform Balance:</span>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {displayBalance.toFixed(2)}
          </span>
        </div>

        {blockchainBalance > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-[var(--text-secondary)]">Wallet Balance:</span>
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {blockchainBalance.toFixed(2)}
            </span>
          </div>
        )}

        {hasDiscrepancy && (
          <div className="bg-warning-50 dark:bg-warning-900/30 border border-warning-200 dark:border-warning-800 rounded-lg p-3">
            <p className="text-warning-800 dark:text-warning-200 text-sm">
              Balance mismatch detected. Click sync to update.
            </p>
          </div>
        )}
      </div>

      {showActions && (
        <div className="flex space-x-2 mt-4">
          <button className="btn-secondary flex-1 flex items-center justify-center space-x-2">
            <Send className="h-4 w-4" />
            <span>Send</span>
          </button>
          <button className="btn-primary flex-1 flex items-center justify-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Buy</span>
          </button>
        </div>
      )}

      {isTransferring && (
        <div className="mt-4 bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 rounded-lg p-3">
          <p className="text-primary-800 dark:text-primary-200 text-sm">
            Transaction in progress...
          </p>
        </div>
      )}
    </div>
  );
}