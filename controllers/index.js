const router = require('express').Router();
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboardRoutes');
const userPageRoutes = require('./userPageRoutes');
// get here by typing localhost:8080/api/...
router.use('/api', apiRoutes);
// get here by typing localhost:8080/dashboard/...
router.use('/', dashboardRoutes);
// get here by typing localhost:8080/user/...
router.use('/user', userPageRoutes);

module.exports = router;