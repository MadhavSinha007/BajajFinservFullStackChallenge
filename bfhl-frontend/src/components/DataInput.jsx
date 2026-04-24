// components/DataInput.jsx
import React from 'react';

const DataInput = ({ input, setInput }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <label className="block font-mono text-xs font-semibold tracking-wider text-neutral-500 uppercase">
          Node Entries
        </label>
        <span className="text-[10px] text-neutral-400 font-mono">comma or newline separated</span>
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={6}
        placeholder="Input with quotes"
        className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all font-mono text-sm resize-y"
      />
      <p className="text-xs text-neutral-400">
        Example: A-&gt;B, B-&gt;C, X-&gt;Y
      </p>
    </div>
  );
};

export default DataInput;