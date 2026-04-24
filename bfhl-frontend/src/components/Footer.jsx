// components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-neutral-200 bg-white mt-12 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-neutral-500">
        <span className="font-mono">BFHL — SRM Full Stack Challenge</span>
        <span className="font-mono">POST /bfhl</span>
      </div>
    </footer>
  );
};

export default Footer;