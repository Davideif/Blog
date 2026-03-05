import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-28 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900">
          Welcome to My Blog
        </h1>

        <p className="mt-6 text-xl md:text-2xl text-gray-600">
          Sets of notes about web development and more
        </p>
      </div>
    </section>
  );
};
export default HeroSection;