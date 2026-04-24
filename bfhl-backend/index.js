const express = require('express');
const cors = require('cors');
const treeRoutes = require('./routes/treeRoute');
const healthRoutes = require('./routes/healthRoute');


const app = express();

// This allows the entire internet to access 
app.use(cors());
app.use(express.json());

// / for bfhl and /internal for health checks
app.use('/', treeRoutes);
app.use('/internal', healthRoutes);


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});