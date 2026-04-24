exports.processEdges = (edgesInput) => {
    const hierarchies = [];
    const invalid_entries = [];
    const duplicate_edges = [];
    
    const seenEdges = new Set();
    const childHasParent = new Set();
    const adj = {};
    const reverseAdj = {}; // Needed to find the "whole" component (up and down)
    const inDegree = {};
    
    const discoveryOrder = [];
    const nodesSeen = new Set();

    const trackNode = (node) => {
        if (!nodesSeen.has(node)) {
            nodesSeen.add(node);
            discoveryOrder.push(node);
        }
    };

    // 1. Parse and filter (First Parent Wins)
    edgesInput.forEach(entry => {
        const trimmed = entry.trim();
        const match = trimmed.match(/^([A-Z])->([A-Z])$/);
        
        if (!match) {
            invalid_entries.push(entry);
            return;
        }

        const [_, parent, child] = match;
        if (parent === child) { 
            invalid_entries.push(entry); 
            return; 
        }

        if (seenEdges.has(trimmed)) {
            duplicate_edges.push(trimmed);
            return;
        }
        seenEdges.add(trimmed);

        trackNode(parent);
        trackNode(child);

        // Rule 4: Diamond case - discard subsequent parents
        if (childHasParent.has(child)) return;

        childHasParent.add(child);
        if (!adj[parent]) adj[parent] = [];
        adj[parent].push(child);

        // Track reverse for component discovery
        if (!reverseAdj[child]) reverseAdj[child] = [];
        reverseAdj[child].push(parent);

        inDegree[child] = (inDegree[child] || 0) + 1;
        if (!(parent in inDegree)) inDegree[parent] = 0;
    });

    const visitedGlobal = new Set();

    // Helper: Build the nested object
    const buildTree = (node, path = new Set()) => {
        if (path.has(node)) return { tree: {}, depth: 0, cycle: true };
        path.add(node);
        
        const children = (adj[node] || []).sort();
        let maxSubDepth = 0;
        const treeObj = {};
        let cycleDetected = false;

        for (const child of children) {
            const result = buildTree(child, new Set(path));
            treeObj[child] = result.tree;
            if (result.cycle) cycleDetected = true;
            maxSubDepth = Math.max(maxSubDepth, result.depth);
        }
        return { tree: treeObj, depth: 1 + maxSubDepth, cycle: cycleDetected };
    };

    // 2. Process in Discovery Order
    discoveryOrder.forEach(startNode => {
        if (visitedGlobal.has(startNode)) return;

        // Find every node in this connected cluster (up and down)
        const componentNodes = [];
        const queue = [startNode];
        const seenInSearch = new Set([startNode]);

        while (queue.length > 0) {
            const curr = queue.shift();
            componentNodes.push(curr);
            visitedGlobal.add(curr);

            const neighbors = [...(adj[curr] || []), ...(reverseAdj[curr] || [])];
            neighbors.forEach(neighbor => {
                if (!seenInSearch.has(neighbor)) {
                    seenInSearch.add(neighbor);
                    queue.push(neighbor);
                }
            });
        }

        // Rule 4: Identify the Root
        // A root is a node in this component with inDegree 0.
        // If no node has inDegree 0, it's a pure cycle (use lexicographical smallest).
        const naturalRoots = componentNodes.filter(n => inDegree[n] === 0);
        let root;
        let isPureCycle = false;

        if (naturalRoots.length > 0) {
            // Due to "first parent wins", there will be only one 0-in-degree node per component
            root = naturalRoots[0];
        } else {
            root = componentNodes.sort()[0];
            isPureCycle = true;
        }

        // 3. Build Hierarchy Object
        const { tree, depth, cycle } = buildTree(root);

        if (cycle || isPureCycle) {
            hierarchies.push({
                root,
                tree: {},
                has_cycle: true
            });
        } else {
            hierarchies.push({
                root,
                tree: { [root]: tree },
                depth
            });
        }
    });

    // 4. Summary Calculation
    const validTrees = hierarchies.filter(h => !h.has_cycle);
    let largestTreeRoot = "";
    if (validTrees.length > 0) {
        const sortedForSummary = [...validTrees].sort((a, b) => {
            if (b.depth !== a.depth) return b.depth - a.depth;
            return a.root.localeCompare(b.root);
        });
        largestTreeRoot = sortedForSummary[0].root;
    }

    return {
        user_id: "madhavsinha_02022006",
        email_id: "ms5253@srmist.edu.in",
        college_roll_number: "RA2311003020108",
        hierarchies,
        invalid_entries,
        duplicate_edges,
        summary: {
            total_trees: validTrees.length,
            total_cycles: hierarchies.length - validTrees.length,
            largest_tree_root: largestTreeRoot
        }
    };
};