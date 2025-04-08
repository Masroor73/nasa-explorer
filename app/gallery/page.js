'use client';

import { useEffect, useState } from 'react';
import GalleryCard from '@/components/GalleryCard';
import Spinner from '@/components/Spinner';
import Navbar from '@/components/Navbar';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/context/ThemeContext';

const NASA_API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;

export default function GalleryPage() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(6);
  const [error, setError] = useState(null);
  const { isDark } = useTheme();

  const fetchGallery = async () => {
    setLoading(true);
    setError(null);
    const end = new Date();
    const urls = [];

    for (let i = 0; i < days; i++) {
      const d = new Date(end);
      d.setDate(end.getDate() - i);
      const formatted = d.toISOString().split('T')[0];
      urls.push(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${formatted}`);
    }

    try {
      const data = await Promise.all(urls.map(url => fetch(url).then(res => {
        if (!res.ok) throw new Error("Failed to fetch images.");
        return res.json();
      })));
      setGallery(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [days]);

  return (
    <main className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen transition-colors`}>
      <ThemeToggle />
      <Navbar />
      <section className="px-4 pt-28 pb-16">
        <h1 className="text-4xl font-bold text-center mb-10">🖼️ NASA Image Gallery</h1>
        {loading ? <Spinner /> : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {gallery.map((item, i) => (
              <GalleryCard key={i} item={item} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}






