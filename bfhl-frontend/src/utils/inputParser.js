// utils/inputParser.js

/**
 * Parses and validates the input string into an array of entries
 * Supports comma-separated or newline-separated values
 * 
 * @param {string} input - Raw input string from textarea
 * @returns {string[]} - Array of trimmed, non-empty entries
 */
export const validateAndParseInput = (input) => {
  if (!input || typeof input !== 'string') return [];
  
  // Split by commas OR newlines, then clean up each entry
  const entries = input
    .split(/[\n,]+/)  // Split on commas or newlines
    .map(s => s.trim())  // Trim whitespace
    .filter(Boolean);  // Remove empty strings
    
  return entries;
};

/**
 * Validates if an entry follows the format X->Y
 * @param {string} entry - Single entry like "A->B"
 * @returns {boolean} - True if valid format
 */
export const isValidEntry = (entry) => {
  return /^[A-Za-z0-9]+\s*->\s*[A-Za-z0-9]+$/.test(entry);
};

/**
 * Parses a valid entry into source and target nodes
 * @param {string} entry - Valid entry like "A->B"
 * @returns {{source: string, target: string}} - Source and target nodes
 */
export const parseEntry = (entry) => {
  const [source, target] = entry.split('->').map(s => s.trim());
  return { source, target };
};

/**
 * Extracts all unique nodes from entries
 * @param {string[]} entries - Array of entries
 * @returns {string[]} - Unique node names
 */
export const extractUniqueNodes = (entries) => {
  const nodes = new Set();
  entries.forEach(entry => {
    if (isValidEntry(entry)) {
      const { source, target } = parseEntry(entry);
      nodes.add(source);
      nodes.add(target);
    }
  });
  return Array.from(nodes);
};