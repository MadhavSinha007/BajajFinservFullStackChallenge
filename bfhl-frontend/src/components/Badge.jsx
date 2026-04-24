// components/Badge.jsx
import React from 'react';

const Badge = ({ children, bg = 'neutral-200', text = 'neutral-800' }) => {
  const bgColor = {
    primary: 'bg-primary-100',
    red: 'bg-red-100',
    amber: 'bg-amber-100',
    green: 'bg-green-100',
    blue: 'bg-blue-100',
  }[bg] || `bg-${bg}`;
  
  const textColor = {
    primary: 'text-primary-800',
    red: 'text-red-800',
    amber: 'text-amber-800',
    green: 'text-green-800',
    blue: 'text-blue-800',
  }[text] || `text-${text}`;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono font-semibold ${bgColor} ${textColor}`}>
      {children}
    </span>
  );
};

export default Badge;