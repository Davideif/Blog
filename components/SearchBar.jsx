'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="border rounded-md px-3 py-1.5 text-sm w-48 focus:outline-none focus:ring-2"
      />
      <button type="submit" className="text-sm px-3 py-1.5 bg-brand-500 text-white rounded-md hover:bg-brand-600 transition-colors">
        Search
      </button>
    </form>
  );
}