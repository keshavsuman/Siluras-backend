const express = require('express');
const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');
const doctorRoutes = require('./doctorRoutes');
const router = express.Router();

router.use('/user',userRoutes);
router.use('/admin',adminRoutes);
router.use('/doctor',doctorRoutes);

module.exports = router;