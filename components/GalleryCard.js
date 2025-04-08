'use client';

import { motion } from 'framer-motion';

export default function GalleryCard({ item }) {
  return (
    <motion.div
      className="bg-white text-black rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={item.url}
        alt={item.title}
        className="w-full h-64 object-cover"
        onError={(e) => {
          e.target.src = '/fallback.jpg'; // Fallback image (optional)
        }}
      />
      <div className="p-4">
        <h2 className="font-semibold text-lg mb-2">{item.title}</h2>
        <p className="text-sm text-gray-600">{item.date}</p>
      </div>
    </motion.div>
  );
}
