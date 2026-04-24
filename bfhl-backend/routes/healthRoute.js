const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');

router.get('/pinger', healthController.ping);
 
module.exports = router;