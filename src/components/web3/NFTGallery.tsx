import React from 'react';
import { Award, ExternalLink, Star } from 'lucide-react';
import { useNFTs } from '../../hooks/useNFTs';
import LoadingSpinner from '../ui/LoadingSpinner';

interface NFTGalleryProps {
  className?: string;
  showTitle?: boolean;
  maxItems?: number;
}

export default function NFTGallery({ className = '', showTitle = true, maxItems }: NFTGalleryProps) {
  const { nfts, loading, getRarityColor } = useNFTs();

  if (loading) {
    return (
      <div className={`flex justify-center items-center p-8 ${className}`}>
        <LoadingSpinner />
      </div>
    );
  }

  const displayNFTs = maxItems ? nfts.slice(0, maxItems) : nfts;

  return (
    <div className={className}>
      {showTitle && (
        <div className="flex items-center space-x-2 mb-6">
          <Award className="h-6 w-6 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            NFT Collection ({nfts.length})
          </h3>
        </div>
      )}

      {nfts.length === 0 ? (
        <div className="text-center py-8">
          <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No NFTs Yet
          </h3>
          <p className="text-[var(--text-secondary)]">
            Complete quizzes and achievements to earn exclusive NFTs!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayNFTs.map((nft) => (
            <div key={nft.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  {nft.attributes.find(attr => attr.trait_type === 'Rarity') && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium bg-white/90 ${getRarityColor(nft.attributes.find(attr => attr.trait_type === 'Rarity')?.value as string || 'common')}`}>
                      {nft.attributes.find(attr => attr.trait_type === 'Rarity')?.value}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {nft.name}
                </h4>
                <p className="text-[var(--text-secondary)] text-sm mb-3">
                  {nft.description}
                </p>
                
                <div className="space-y-2">
                  {nft.attributes.slice(0, 3).map((attr, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-[var(--text-secondary)]">{attr.trait_type}:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{attr.value}</span>
                    </div>
                  ))}
                </div>

                {nft.quizScore === 100 && (
                  <div className="mt-3 flex items-center justify-center space-x-1 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-lg p-2">
                    <Star className="h-4 w-4" />
                    <span className="text-sm font-medium">Perfect Score!</span>
                  </div>
                )}
                
                <button className="mt-4 w-full btn-secondary text-sm flex items-center justify-center space-x-2">
                  <ExternalLink className="h-4 w-4" />
                  <span>View on OpenSea</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {maxItems && nfts.length > maxItems && (
        <div className="text-center mt-6">
          <button className="btn-secondary">
            View All NFTs ({nfts.length})
          </button>
        </div>
      )}
    </div>
  );
}