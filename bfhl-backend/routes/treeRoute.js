const express = require('express');
const router = express.Router();
const treeController = require('../controllers/treeController');

// just a log page so that theres no error on startup
router.get('/', (req, res) => {
    res.send('<p>Server is online!</p>');
});

router.post('/bfhl', treeController.getAnswer);



module.exports = router;