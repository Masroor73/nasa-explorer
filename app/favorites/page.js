'use client';

import { useEffect, useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import Navbar from '@/components/Navbar';
import GalleryCard from '@/components/GalleryCard';
import { useTheme } from '@/context/ThemeContext';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const { isDark } = useTheme();

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  return (
    <main className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen transition-colors`}>
      <ThemeToggle />
      <Navbar />
      <div className="px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-10 mt-6">⭐ Your Favorites</h1>
        {favorites.length === 0 ? (
          <p className="text-center text-gray-400">No favorites yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map((item, i) => (
              <GalleryCard key={i} item={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}



