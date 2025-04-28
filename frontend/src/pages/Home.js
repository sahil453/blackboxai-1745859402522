import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Welcome to DishFinder</h1>
      <p className="text-lg text-gray-700 max-w-xl text-center">
        Discover the best dishes and restaurants based on real user reviews.
      </p>
      {/* Search bar, featured dishes, and other homepage components will be added here */}
    </div>
  );
}
