import Link from 'next/link';
import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-surface py-12 px-6 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        
        <h1 className="text-5xl md:text-5xl font-extrabold tracking-tight text-text-primary">
          Welcome to My Blog
        </h1>

        <p className="text-xl md:text-2xl text-text-muted max-w-2xl">
          Sets of notes about web development and more
        </p>

        <Link href="/blog" className="bg-brand-500 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-brand-600 transition-colors">
          Explore the Blog
        </Link>

      </div>
    </section>
  );
};
export default HeroSection;