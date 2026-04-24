// components/StatCard.jsx
import React from 'react';

const StatCard = ({ label, value, color = 'blue' }) => {
  const bgColor = {
    blue: 'bg-blue-50',
    red: 'bg-red-50',
    amber: 'bg-amber-50',
    green: 'bg-green-50',
  }[color] || 'bg-neutral-50';

  const textColor = {
    blue: 'text-blue-700',
    red: 'text-red-700',
    amber: 'text-amber-700',
    green: 'text-green-700',
  }[color] || 'text-neutral-700';

  return (
    <div className={`${bgColor} rounded-lg p-4 border border-neutral-200 shadow-sm`}>
      <p className="text-xs font-mono font-semibold tracking-wide text-neutral-500 uppercase mb-1">
        {label}
      </p>
      <p className={`text-2xl font-mono font-bold ${textColor}`}>
        {value}
      </p>
    </div>
  );
};

export default StatCard;