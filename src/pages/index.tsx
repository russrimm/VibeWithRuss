import * as React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center py-8">
      <div className="w-full max-w-2xl rounded-3xl bg-white/90 shadow-2xl border border-blue-100 p-8 sm:p-16 mx-2 flex flex-col items-center text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-blue-900 mb-4 drop-shadow-lg">Welcome!</h1>
        <p className="text-xl text-blue-700 mb-6 font-medium">We're glad you're here. Discover our curated collection of products, handpicked just for you.</p>
        <Link href="/products" legacyBehavior>
          <a className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-xl px-8 py-4 shadow-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all text-xl">
            View Products
          </a>
        </Link>
      </div>
    </div>
  );
};

export default HomePage; 