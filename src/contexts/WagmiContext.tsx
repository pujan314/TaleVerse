import React, { ReactNode } from 'react';
import { createConfig, http } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { QueryClient } from '@tanstack/react-query';
import { WagmiProvider as WagmiProviderCore } from 'wagmi';

const config = createConfig({
  chains: [mainnet, polygon, optimism, arbitrum],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
  },
});

interface WagmiProviderProps {
  children: ReactNode;
}

export function WagmiProvider({ children }: WagmiProviderProps) {
  return (
    <WagmiProviderCore config={config}>
      {children}
    </WagmiProviderCore>
  );
}