// components/TagList.jsx
import React from 'react';

const TagList = ({ items, color = 'neutral' }) => {
  if (!items || items.length === 0) {
    return <span className="text-neutral-400 text-sm font-mono italic">none</span>;
  }

  const colorStyles = {
    red: 'bg-red-50 text-red-700 border-red-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    neutral: 'bg-neutral-100 text-neutral-700 border-neutral-200',
  };

  const selectedStyle = colorStyles[color] || colorStyles.neutral;

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, idx) => (
        <span 
          key={idx}
          className={`inline-flex px-2.5 py-1 rounded-md text-xs font-mono font-medium border ${selectedStyle}`}
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default TagList;