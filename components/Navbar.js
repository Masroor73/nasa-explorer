'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'APOD', href: '/apod' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Explore', href: '/explore' },
  { label: 'Favorites', href: '/favorites' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-black text-white shadow-md py-4 px-6 flex justify-center">
      <div className="flex space-x-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium transition-all duration-300 ${
              pathname === link.href
                ? 'text-yellow-300 border-b-2 border-yellow-300'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

