const router = require('express').Router();
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboardRoutes');

// get here by typing localhost:8080/api/...
router.use('/api', apiRoutes);
// get here by typing localhost:8080/...
router.use('/', dashboardRoutes);

module.exports = router;