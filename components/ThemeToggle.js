'use client';

import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-4 right-4 text-sm bg-gray-200 dark:bg-gray-800 dark:text-white text-black px-3 py-1 rounded transition-colors duration-300 shadow-md"
    >
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}



