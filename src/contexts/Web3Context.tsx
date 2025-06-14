import React, { createContext, useContext, ReactNode } from 'react';
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

const queryClient = new QueryClient();

interface Web3ProviderProps {
  children: ReactNode;
}

const Web3Context = createContext<{} | undefined>(undefined);

export function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Web3Context.Provider value={{}}>
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