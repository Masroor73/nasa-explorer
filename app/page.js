'use client';

import Navbar from '@/components/Navbar';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/context/ThemeContext';

export default function HomePage() {
  const { isDark } = useTheme();

  return (
    <main className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen transition-colors`}>
      <ThemeToggle />
      <Navbar />
      <section className="flex flex-col items-center justify-center text-center px-6 pt-28 pb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 flex items-center gap-3">
          <span role="img" aria-label="milky way">🌌</span>
          Welcome to NASA Explorer
        </h1>
        <p className="text-base sm:text-lg mb-8 max-w-2xl leading-relaxed">
          Discover awe-inspiring images from NASA's Astronomy Picture of the Day. Choose a date, go random, or check today's featured snapshot of the cosmos.
        </p>
        <a
          href="/explore"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition-all duration-300"
        >
          Start Exploring
        </a>
      </section>
    </main>
  );
}











