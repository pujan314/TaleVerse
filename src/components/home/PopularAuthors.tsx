import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award } from 'lucide-react';
import clsx from '../../utils/clsx';

// Mock data for popular authors
const popularAuthors = [
  {
    id: '1',
    name: 'Alex Blockman',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    works: 12,
    followers: 3420,
    awards: 5,
    bio: 'Speculative fiction author exploring the intersection of technology and society.'
  },
  {
    id: '2',
    name: 'Maya Satoshi',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    works: 8,
    followers: 2850,
    awards: 3,
    bio: 'Mystery and thriller writer with a passion for cryptography and digital forensics.'
  },
  {
    id: '3',
    name: 'Sophia Merkle',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    works: 15,
    followers: 4200,
    awards: 7,
    bio: 'Romance and relationship storyteller for the digital age.'
  },
  {
    id: '4',
    name: 'James Buterin',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    works: 6,
    followers: 2100,
    awards: 2,
    bio: 'Fantasy and science fiction author creating immersive worlds for the next generation.'
  }
];

const PopularAuthors = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {popularAuthors.map((author, idx) => (
        <Link 
          key={author.id} 
          to={`/author/${author.id}`}
          className={clsx(
            "group relative rounded-lg overflow-hidden bg-white dark:bg-gray-800 border border-[var(--border-color)] p-5 hover:shadow-lg transition-all duration-300",
            idx === 0 && "border-primary-200 dark:border-primary-800",
          )}
        >
          {idx === 0 && (
            <div className="absolute top-0 right-0">
              <div className="bg-primary-600 text-white text-xs px-2 py-1 rounded-bl-lg">
                Top Author
              </div>
            </div>
          )}
          
          <div className="flex flex-col items-center text-center">
            <div className="relative w-24 h-24 mb-4">
              <img 
                src={author.avatar} 
                alt={author.name}
                className="w-full h-full object-cover rounded-full border-2 border-primary-100 dark:border-primary-900"
              />
            </div>
            
            <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {author.name}
            </h3>
            
            <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
              {author.bio}
            </p>
            
            <div className="flex justify-between w-full text-sm text-[var(--text-secondary)] pt-4 border-t border-[var(--border-color)]">
              <div className="flex flex-col items-center">
                <BookOpen className="h-4 w-4 mb-1" />
                <span>{author.works}</span>
                <span className="text-xs">Works</span>
              </div>
              
              <div className="flex flex-col items-center">
                <Users className="h-4 w-4 mb-1" />
                <span>{author.followers.toLocaleString()}</span>
                <span className="text-xs">Followers</span>
              </div>
              
              <div className="flex flex-col items-center">
                <Award className="h-4 w-4 mb-1" />
                <span>{author.awards}</span>
                <span className="text-xs">Awards</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PopularAuthors;