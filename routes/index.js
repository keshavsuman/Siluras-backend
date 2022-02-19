const express = require('express');
const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');
const doctorRoutes = require('./doctorRoutes');
const router = express.Router();
const HMS = require('../sockets/100ms');

router.use('/user',userRoutes);
router.use('/admin',adminRoutes);
router.use('/doctor',doctorRoutes);

router.get('/getToken',(req,res)=>{
    const hms = new HMS();
     res.send(hms.appToken());
});

module.exports = router;