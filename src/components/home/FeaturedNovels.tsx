import React from 'react';
import { Link } from 'react-router-dom';
import { Star, BookOpen, Clock } from 'lucide-react';
import { mockNovels } from '../../data/mockNovels';

const FeaturedNovels = () => {
  const featuredNovels = mockNovels.slice(0, 4).map(n => ({
    id: n.id,
    title: n.title,
    author: n.author_name,
    coverImage: n.cover_image || '',
    genre: n.genre,
    rating: n.rating,
    readTime: (n.total_chapters || 1) * 30,
    description: n.description,
  }));

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