const router = require('express').Router();

const apiRoutes = require('./api');
// homepageroutes.js 
const homeRoutes = require('./homepageroutes.js');
// dashboardroutes.js
const userPageRoutes = require('./userPageRoutes.js');

router.use('/api', apiRoutes);

router.use('/', homeRoutes);

router.use('/dashboard', userPageRoutes);

module.exports = router;