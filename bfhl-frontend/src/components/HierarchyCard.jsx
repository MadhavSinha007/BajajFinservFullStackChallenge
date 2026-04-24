// components/HierarchyCard.jsx
import React, { useState } from 'react';
import TreeView from './TreeView';

const HierarchyCard = ({ hierarchy, index }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isCycle = hierarchy.has_cycle === true;

  return (
    <div className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-hidden">
      <div 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`
          flex items-center justify-between p-4 cursor-pointer select-none transition-colors
          ${isCycle ? 'bg-red-600' : 'bg-blue-600'}
        `}
      >
        <div className="flex items-center gap-3">
          <span className="text-white/70 font-mono text-xs font-bold">
            #{String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-white font-mono font-bold text-lg">
            {hierarchy.root}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {isCycle ? (
            <span className="bg-white text-red-600 px-2 py-1 text-[10px] font-mono font-bold border border-white">
              ⟳ CYCLE
            </span>
          ) : (
            <span className="bg-white text-blue-600 px-2 py-1 text-[10px] font-mono font-bold border border-white">
              DEPTH: {hierarchy.depth}
            </span>
          )}
          <span className="text-white font-mono text-lg">
            {isCollapsed ? '↓' : '↑'}
          </span>
        </div>
      </div>
      
      {!isCollapsed && (
        <div className="p-5">
          {isCycle ? (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded text-red-700 font-mono text-sm">
              <span className="text-xl">⟳</span>
              Cycle detected — no tree structure available.
            </div>
          ) : (
            <TreeView tree={hierarchy.tree} root={hierarchy.root} />
          )}
        </div>
      )}
    </div>
  );
};

export default HierarchyCard;