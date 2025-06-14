import { useState, useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ui/Toaster';

// NFT Contract ABI (simplified ERC-721)
const NFT_ABI = [
  {
    "inputs": [{"name": "owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "owner", "type": "address"},
      {"name": "index", "type": "uint256"}
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "tokenId", "type": "uint256"}],
    "name": "tokenURI",
    "outputs": [{"name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Contract address (replace with actual deployed address)
const NFT_CONTRACT_ADDRESS = '0x1234567890123456789012345678901234567891' as const;

export interface NFTMetadata {
  id: string;
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
  achievement?: string;
  novelId?: string;
  quizScore?: number;
}

export function useNFTs() {
  const { address } = useAccount();
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  const [nfts, setNfts] = useState<NFTMetadata[]>([]);
  const [loading, setLoading] = useState(false);

  // Read NFT balance
  const { data: nftBalance } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  // Fetch NFT metadata
  const fetchNFTMetadata = async (tokenId: number): Promise<NFTMetadata | null> => {
    try {
      // In a real implementation, this would call tokenURI and fetch metadata
      // For now, we'll return mock data based on user's NFTs
      const mockNFTs: Record<string, NFTMetadata> = {
        'novel_1_perfect_score': {
          id: 'novel_1_perfect_score',
          name: 'Perfect Scholar',
          description: 'Achieved 100% on The Ethereum Chronicles quiz',
          image: 'https://images.pexels.com/photos/1646870/pexels-photo-1646870.jpeg?auto=compress&cs=tinysrgb&w=400',
          attributes: [
            { trait_type: 'Achievement', value: 'Perfect Quiz Score' },
            { trait_type: 'Novel', value: 'The Ethereum Chronicles' },
            { trait_type: 'Rarity', value: 'Legendary' }
          ],
          achievement: 'Perfect Quiz Score',
          novelId: '1',
          quizScore: 100
        },
        'early_adopter': {
          id: 'early_adopter',
          name: 'Early Adopter',
          description: 'One of the first 1000 users on Taleverse',
          image: 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=400',
          attributes: [
            { trait_type: 'Achievement', value: 'Early Adopter' },
            { trait_type: 'Rarity', value: 'Rare' },
            { trait_type: 'User Number', value: tokenId }
          ],
          achievement: 'Early Adopter'
        },
        'bookworm': {
          id: 'bookworm',
          name: 'Bookworm',
          description: 'Read 10 novels on Taleverse',
          image: 'https://images.pexels.com/photos/9638689/pexels-photo-9638689.jpeg?auto=compress&cs=tinysrgb&w=400',
          attributes: [
            { trait_type: 'Achievement', value: 'Bookworm' },
            { trait_type: 'Books Read', value: 10 },
            { trait_type: 'Rarity', value: 'Common' }
          ],
          achievement: 'Bookworm'
        }
      };

      // Return mock NFT based on user's NFT list
      const userNFTs = user?.nfts || [];
      const nftKey = userNFTs[tokenId];
      return mockNFTs[nftKey] || null;
    } catch (error) {
      console.error('Error fetching NFT metadata:', error);
      return null;
    }
  };

  // Load user's NFTs
  const loadUserNFTs = async () => {
    if (!user?.nfts || user.nfts.length === 0) {
      setNfts([]);
      return;
    }

    setLoading(true);
    try {
      const nftPromises = user.nfts.map(async (nftId, index) => {
        return await fetchNFTMetadata(index);
      });

      const nftResults = await Promise.all(nftPromises);
      const validNFTs = nftResults.filter((nft): nft is NFTMetadata => nft !== null);
      setNfts(validNFTs);
    } catch (error) {
      console.error('Error loading NFTs:', error);
      addToast('Failed to load NFTs', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Mint NFT for achievement
  const mintAchievementNFT = async (achievementType: string, metadata: Partial<NFTMetadata>) => {
    if (!user) return;

    try {
      // In a real implementation, this would call a mint function on the contract
      // For now, we'll add to the user's NFT list in the database
      const newNFTId = `${achievementType}_${Date.now()}`;
      const updatedNFTs = [...(user.nfts || []), newNFTId];
      
      updateUser({ nfts: updatedNFTs });
      addToast(`NFT minted: ${metadata.name}`, 'success');
      
      // Reload NFTs to show the new one
      await loadUserNFTs();
    } catch (error) {
      console.error('Error minting NFT:', error);
      addToast('Failed to mint NFT', 'error');
    }
  };

  // Check if user has specific NFT
  const hasNFT = (nftId: string): boolean => {
    return user?.nfts?.includes(nftId) || false;
  };

  // Get NFT rarity color
  const getRarityColor = (rarity: string): string => {
    switch (rarity.toLowerCase()) {
      case 'legendary':
        return 'text-yellow-500';
      case 'rare':
        return 'text-purple-500';
      case 'uncommon':
        return 'text-blue-500';
      case 'common':
      default:
        return 'text-green-500';
    }
  };

  useEffect(() => {
    loadUserNFTs();
  }, [user?.nfts]);

  return {
    nfts,
    loading,
    nftBalance: nftBalance ? Number(nftBalance) : 0,
    loadUserNFTs,
    mintAchievementNFT,
    hasNFT,
    getRarityColor,
  };
}