// components/ResponseViewer.jsx
import React, { useState } from 'react';
import TreeView from './TreeView';
import Badge from './Badge';
import StatCard from './StatCard';
import HierarchyCard from './HierarchyCard';
import TagList from './TagList';

const ResponseViewer = ({ response, error }) => {
  const [showRaw, setShowRaw] = useState(false);

  if (error) {
    return (
      <div className="mt-8 p-5 bg-red-50 border-l-4 border-red-500 rounded-md shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-red-600 font-mono text-xs font-bold tracking-wide">⚠ API Error</span>
        </div>
        <p className="text-red-700 font-mono text-sm">{error}</p>
      </div>
    );
  }

  if (!response) return null;

  return (
    <div className="mt-8 space-y-6">
      {/* Identity Section */}
      <div className="bg-neutral-900 rounded-lg p-5 text-white space-y-3 sm:space-y-0 sm:flex sm:justify-between sm:items-center gap-4">
        <div>
          <p className="text-neutral-400 text-xs font-mono tracking-wider">USER ID</p>
          <p className="font-mono text-amber-400 font-semibold text-sm">{response.user_id}</p>
        </div>
        <div className="w-px h-8 bg-neutral-700 hidden sm:block" />
        <div>
          <p className="text-neutral-400 text-xs font-mono tracking-wider">EMAIL</p>
          <p className="font-mono text-sm">{response.email_id}</p>
        </div>
        <div className="w-px h-8 bg-neutral-700 hidden sm:block" />
        <div>
          <p className="text-neutral-400 text-xs font-mono tracking-wider">ROLL NUMBER</p>
          <p className="font-mono text-sm">{response.college_roll_number}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Total Trees" value={response.summary?.total_trees ?? 0} color="blue" />
        <StatCard label="Total Cycles" value={response.summary?.total_cycles ?? 0} color="red" />
        <StatCard label="Largest Tree Root" value={response.summary?.largest_tree_root || '—'} color="amber" />
        <StatCard label="Hierarchies" value={response.hierarchies?.length ?? 0} color="green" />
      </div>

      {/* Hierarchies */}
      {response.hierarchies && response.hierarchies.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-neutral-900">Hierarchies</h2>
            <Badge bg="primary">{response.hierarchies.length}</Badge>
          </div>
          <div className="space-y-4">
            {response.hierarchies.map((hierarchy, idx) => (
              <HierarchyCard key={idx} hierarchy={hierarchy} index={idx} />
            ))}
          </div>
        </div>
      )}

      {/* Invalid and Duplicates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border border-neutral-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-bold text-neutral-800">Invalid Entries</h3>
            <Badge bg="red" text="white">{response.invalid_entries?.length || 0}</Badge>
          </div>
          <TagList items={response.invalid_entries} color="red" />
        </div>
        <div className="bg-white border border-neutral-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-bold text-neutral-800">Duplicate Edges</h3>
            <Badge bg="amber" text="neutral-900">{response.duplicate_edges?.length || 0}</Badge>
          </div>
          <TagList items={response.duplicate_edges} color="amber" />
        </div>
      </div>

      {/* Raw JSON Toggle */}
      <div className="border border-neutral-200 rounded-lg overflow-hidden shadow-sm">
        <button
          onClick={() => setShowRaw(!showRaw)}
          className="w-full flex justify-between items-center p-4 bg-neutral-50 hover:bg-neutral-100 transition-colors"
        >
          <span className="font-mono text-xs font-bold tracking-wider text-neutral-600">RAW JSON RESPONSE</span>
          <span className="text-neutral-500 text-sm">{showRaw ? '↑ hide' : '↓ show'}</span>
        </button>
        {showRaw && (
          <pre className="p-4 bg-neutral-900 text-green-400 font-mono text-xs overflow-x-auto">
            {JSON.stringify(response, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};

export default ResponseViewer;