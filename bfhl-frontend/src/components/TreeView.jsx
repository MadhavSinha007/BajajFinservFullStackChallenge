// components/TreeView.jsx
import React, { useState } from 'react';

const TreeNode = ({ label, children, isRoot = false, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = children && Object.keys(children).length > 0;
  const paddingLeft = depth === 0 ? 'pl-0' : 'pl-6';

  return (
    <div className={`relative ${paddingLeft}`}>
      <div 
        className="flex items-center gap-2 mb-1 cursor-pointer group"
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        {hasChildren ? (
          <div className="w-5 h-5 flex items-center justify-center bg-amber-400 text-neutral-900 border border-neutral-800 rounded text-xs font-bold">
            {isOpen ? '−' : '+'}
          </div>
        ) : (
          <div className="w-5" />
        )}
        <div className={`
          w-8 h-8 flex items-center justify-center font-mono font-bold text-sm border-2 border-neutral-900
          ${isRoot ? 'bg-neutral-900 text-white' : 'bg-neutral-900 text-white'}
        `}>
          {label}
        </div>
        {isRoot && (
          <span className="text-[10px] font-mono font-bold bg-blue-600 text-white px-2 py-0.5 border border-neutral-900">
            ROOT
          </span>
        )}
        {!hasChildren && !isRoot && (
          <span className="text-[10px] font-mono font-bold bg-blue-600 text-white px-2 py-0.5 border border-neutral-900">
            LEAF
          </span>
        )}
      </div>
      {hasChildren && isOpen && (
        <div className="ml-4 pl-4 border-l-2 border-dashed border-neutral-300 mt-1 space-y-1">
          {Object.entries(children).map(([childLabel, grandChildren]) => (
            <TreeNode
              key={childLabel}
              label={childLabel}
              children={grandChildren}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TreeView = ({ tree, root }) => {
  if (!tree || Object.keys(tree).length === 0) return null;

  return (
    <div className="py-2">
      <TreeNode label={root} children={tree[root] || {}} isRoot depth={0} />
    </div>
  );
};

export default TreeView;