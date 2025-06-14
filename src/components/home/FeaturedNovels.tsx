import React from 'react';
import { Link } from 'react-router-dom';
import { Star, BookOpen, Clock } from 'lucide-react';

// Mock data for featured novels
const featuredNovels = [
  {
    id: '1',
    title: 'The Ethereum Chronicles',
    author: 'Alex Blockman',
    coverImage: 'https://images.pexels.com/photos/1646870/pexels-photo-1646870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    genre: 'Sci-Fi',
    rating: 4.8,
    readTime: 240, // minutes
    description: 'A thrilling adventure through a digital world where code is law and decentralized societies thrive.'
  },
  {
    id: '2',
    title: 'Whispers of the Blockchain',
    author: 'Maya Satoshi',
    coverImage: 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    genre: 'Mystery',
    rating: 4.5,
    readTime: 180,
    description: 'A detective story set in 2040 where crimes leave traces on an immutable ledger.'
  },
  {
    id: '3',
    title: 'Love in the Age of Smart Contracts',
    author: 'Sophia Merkle',
    coverImage: 'https://images.pexels.com/photos/9638689/pexels-photo-9638689.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    genre: 'Romance',
    rating: 4.7,
    readTime: 210,
    description: 'When two engineers fall in love, they discover that relationships are more complex than any algorithm.'
  },
  {
    id: '4',
    title: 'The Last Validator',
    author: 'James Buterin',
    coverImage: 'https://images.pexels.com/photos/7034127/pexels-photo-7034127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    genre: 'Fantasy',
    rating: 4.9,
    readTime: 300,
    description: 'In a world where computation is scarce, one person holds the key to validating the final block.'
  }
];

const FeaturedNovels = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredNovels.map((novel) => (
        <Link key={novel.id} to={`/novel/${novel.id}`} className="group">
          <div className="card h-full flex flex-col transform transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
            <div className="relative h-64 overflow-hidden rounded-t-lg">
              <img 
                src={novel.coverImage} 
                alt={novel.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-primary-600 rounded-md mb-2">
                  {novel.genre}
                </span>
                <h3 className="text-lg font-medium font-serif">{novel.title}</h3>
                <p className="text-sm opacity-80">by {novel.author}</p>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <p className="text-[var(--text-secondary)] text-sm line-clamp-3 flex-1">
                {novel.description}
              </p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--border-color)]">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{novel.rating}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-[var(--text-secondary)] mr-1" />
                  <span className="text-sm text-[var(--text-secondary)]">
                    {Math.floor(novel.readTime / 60)}h {novel.readTime % 60}m
                  </span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 text-[var(--text-secondary)] mr-1" />
                  <span className="text-sm text-[var(--text-secondary)]">Start</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FeaturedNovels;