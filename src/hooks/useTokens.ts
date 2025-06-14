import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ui/Toaster';

// TALE Token Contract ABI (simplified)
const TALE_TOKEN_ABI = [
  {
    "inputs": [{"name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "to", "type": "address"},
      {"name": "amount", "type": "uint256"}
    ],
    "name": "transfer",
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "spender", "type": "address"},
      {"name": "amount", "type": "uint256"}
    ],
    "name": "approve",
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

// Contract addresses (replace with actual deployed addresses)
const TALE_TOKEN_ADDRESS = '0x1234567890123456789012345678901234567890' as const;

export function useTokens() {
  const { address } = useAccount();
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  const [isTransferring, setIsTransferring] = useState(false);

  // Read token balance from blockchain
  const { data: blockchainBalance, refetch: refetchBalance } = useReadContract({
    address: TALE_TOKEN_ADDRESS,
    abi: TALE_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  // Write contract hook for transfers
  const { writeContract, data: hash } = useWriteContract();

  // Wait for transaction confirmation
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Sync blockchain balance with database
  const syncTokenBalance = async () => {
    if (!blockchainBalance || !user) return;

    const blockchainTokens = Number(formatEther(blockchainBalance));
    const databaseTokens = user.tokens || 0;

    // If there's a discrepancy, update the database
    if (Math.abs(blockchainTokens - databaseTokens) > 0.001) {
      updateUser({ tokens: blockchainTokens });
    }
  };

  // Transfer tokens to another address
  const transferTokens = async (to: string, amount: number) => {
    if (!address) {
      addToast('Please connect your wallet', 'error');
      return;
    }

    try {
      setIsTransferring(true);
      
      writeContract({
        address: TALE_TOKEN_ADDRESS,
        abi: TALE_TOKEN_ABI,
        functionName: 'transfer',
        args: [to as `0x${string}`, parseEther(amount.toString())],
      });

    } catch (error: any) {
      addToast('Transfer failed', 'error');
      console.error('Token transfer error:', error);
      setIsTransferring(false);
    }
  };

  // Tip an author with tokens
  const tipAuthor = async (authorAddress: string, amount: number) => {
    await transferTokens(authorAddress, amount);
  };

  // Purchase content with tokens
  const purchaseContent = async (contentId: string, price: number) => {
    // This would interact with a marketplace contract
    // For now, we'll simulate the purchase
    if (!user || user.tokens < price) {
      addToast('Insufficient tokens', 'error');
      return false;
    }

    try {
      // Update user balance
      updateUser({ tokens: user.tokens - price });
      addToast(`Content purchased for ${price} TALE tokens`, 'success');
      return true;
    } catch (error) {
      addToast('Purchase failed', 'error');
      return false;
    }
  };

  // Claim rewards (mint tokens)
  const claimRewards = async (amount: number) => {
    if (!user) return;

    try {
      // In a real implementation, this would call a reward contract
      // For now, we'll update the database balance
      updateUser({ tokens: (user.tokens || 0) + amount });
      addToast(`Claimed ${amount} TALE tokens`, 'success');
    } catch (error) {
      addToast('Failed to claim rewards', 'error');
    }
  };

  useEffect(() => {
    if (isConfirmed) {
      setIsTransferring(false);
      addToast('Transfer completed successfully', 'success');
      refetchBalance();
    }
  }, [isConfirmed, refetchBalance, addToast]);

  useEffect(() => {
    syncTokenBalance();
  }, [blockchainBalance, user]);

  return {
    // Balances
    blockchainBalance: blockchainBalance ? Number(formatEther(blockchainBalance)) : 0,
    databaseBalance: user?.tokens || 0,
    
    // Actions
    transferTokens,
    tipAuthor,
    purchaseContent,
    claimRewards,
    syncTokenBalance,
    refetchBalance,
    
    // States
    isTransferring: isTransferring || isConfirming,
    isConfirmed,
  };
}