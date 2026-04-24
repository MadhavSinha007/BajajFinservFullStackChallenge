const treeService = require('../service/treeService');

exports.getAnswer = (req, res) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({ 
                error: "Invalid input. 'data' must be an array of strings." 
            });
        }

        const result = treeService.processEdges(data);
        return res.status(200).json(result);
        
    } catch (error) {
        console.error("Controller Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};