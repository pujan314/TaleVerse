import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ui/Toaster';

export function useWallet() {
  const { address, isConnected, isConnecting } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();

  const { data: balance } = useBalance({
    address: address,
  });

  const connectWallet = async () => {
    try {
      if (openConnectModal) {
        openConnectModal();
      }
    } catch (error: any) {
      addToast('Failed to connect wallet', 'error');
      console.error('Wallet connection error:', error);
    }
  };

  const disconnectWallet = async () => {
    try {
      disconnect();
      addToast('Wallet disconnected', 'success');
    } catch (error: any) {
      addToast('Failed to disconnect wallet', 'error');
      console.error('Wallet disconnection error:', error);
    }
  };

  // Link wallet to user profile
  const linkWalletToProfile = async () => {
    if (!address || !user) return;

    try {
      // Update user profile with wallet address
      updateUser({ 
        wallet_address: address,
        wallet_connected: true 
      });
      addToast('Wallet linked to profile', 'success');
    } catch (error: any) {
      addToast('Failed to link wallet', 'error');
      console.error('Wallet linking error:', error);
    }
  };

  return {
    address,
    isConnected,
    isConnecting,
    balance,
    connectWallet,
    disconnectWallet,
    linkWalletToProfile,
    connectors,
  };
}