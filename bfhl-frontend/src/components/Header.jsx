// components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="bg-neutral-900 border-b-4 border-primary-600 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">🌲</span>
          </div>
          <span className="font-mono font-bold text-white tracking-wide text-sm sm:text-base">
            BFHL
          </span>
          <span className="hidden sm:inline-block w-px h-5 bg-neutral-700 mx-2" />
          <span className="hidden sm:inline text-neutral-400 text-xs tracking-wide">
            Full Stack Engineering Challenge
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-neutral-500 text-xs font-mono hidden sm:block">POST /bfhl</span>
          <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;