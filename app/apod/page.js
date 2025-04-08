'use client';

import { useEffect, useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import Spinner from '@/components/Spinner';
import Navbar from '@/components/Navbar';
import { useTheme } from '@/context/ThemeContext';

const NASA_API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;
const BASE_URL = 'https://api.nasa.gov/planetary/apod';

function getRandomDate() {
  const start = new Date(1995, 5, 16);
  const end = new Date();
  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(randomTime).toISOString().split('T')[0];
}

export default function ApodPage() {
  const { isDark } = useTheme();
  const [apod, setApod] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAPOD = async (date = '') => {
    try {
      setLoading(true);
      setError(null);
      const url = `${BASE_URL}?api_key=${NASA_API_KEY}${date ? `&date=${date}` : ''}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Could not fetch image.");
      const data = await res.json();
      setApod(data);
      checkFavorite(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkFavorite = (data) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const exists = favorites.some((item) => item.date === data.date);
    setIsFavorite(exists);
  };

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      favorites = favorites.filter((item) => item.date !== apod.date);
      setIsFavorite(false);
    } else {
      favorites.push(apod);
      setIsFavorite(true);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  useEffect(() => {
    fetchAPOD();
  }, []);

  return (
    <main className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen transition-colors`}>
      <ThemeToggle />
      <Navbar />
      <section className="flex flex-col items-center justify-center px-4 pt-28 pb-16 text-center">
        <h1 className="text-4xl font-bold mb-6">🚀 Astronomy Picture of the Day</h1>

        {loading && <Spinner />}
        {error && <p className="text-red-500">{error}</p>}

        {apod && (
          <>
            <div className={`${isDark ? 'bg-white text-black' : 'bg-black text-white'} rounded-lg shadow-lg p-6 max-w-2xl w-full`}>
              <h2 className="text-2xl font-semibold mb-2">{apod.title}</h2>
              <p className="text-sm mb-4 text-gray-600">{apod.date}</p>
              {apod.media_type === 'image' ? (
                <img src={apod.url} alt={apod.title} className="w-full rounded-lg mb-4 max-h-[500px] object-contain" />
              ) : (
                <div className="p-4 text-center mb-4">
                  <p>🎥 This is a video. View it <a href={apod.url} className="text-blue-400 underline" target="_blank">here</a>.</p>
                </div>
              )}
              <p>{apod.explanation}</p>
              <button
                onClick={toggleFavorite}
                className={`${isFavorite ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-700 hover:bg-gray-800'} text-white font-semibold py-2 px-4 rounded mt-6`}
              >
                {isFavorite ? '★ Remove Favorite' : '☆ Add to Favorites'}
              </button>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => fetchAPOD()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                Today’s Image
              </button>
              <button
                onClick={() => fetchAPOD(getRandomDate())}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
              >
                Random Image
              </button>
            </div>

            <div className="mt-6">
              <label htmlFor="date" className="block mb-2 font-semibold">
                Pick a Date:
              </label>
              <input
                type="date"
                id="date"
                name="date"
                max={new Date().toISOString().split('T')[0]}
                className={`${isDark ? 'bg-gray-800 text-white border-gray-600' : 'bg-gray-200 text-black border-gray-400'} border px-4 py-2 rounded`}
                onChange={(e) => fetchAPOD(e.target.value)}
              />
            </div>
          </>
        )}
      </section>
    </main>
  );
}










