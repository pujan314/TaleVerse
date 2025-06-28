import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base, sepolia } from 'wagmi/chains';
import '@rainbow-me/rainbowkit/styles.css';

// Use a public demo Project ID that works with localhost and WebContainer environments
const config = getDefaultConfig({
  appName: 'Taleverse',
  projectId: 'c4f79cc821944d9680842e34466bfb',
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  ssr: false,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30000,
    },
  },
});

interface Web3ContextType {
  isConnected: boolean;
  reconnect: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const [isConnected, setIsConnected] = useState(false);

  const reconnect = async () => {
    try {
      // Attempt to reconnect wallet
      if (typeof window !== 'undefined' && window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsConnected(true);
      }
    } catch (error) {
      console.warn('Failed to reconnect wallet:', error);
      setIsConnected(false);
    }
  };

  useEffect(() => {
    // Handle page visibility changes for Web3
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Page became visible, check wallet connection
        if (typeof window !== 'undefined' && window.ethereum) {
          window.ethereum.request({ method: 'eth_accounts' })
            .then((accounts: string[]) => {
              setIsConnected(accounts.length > 0);
            })
            .catch(() => {
              setIsConnected(false);
            });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Web3Context.Provider value={{ isConnected, reconnect }}>
            {children}
          </Web3Context.Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}