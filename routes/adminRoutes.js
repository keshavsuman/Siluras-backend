const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const adminRouter = express.Router();
const authRoutes = require('./adminRoutes/authRoutes');
const medicineRoutes = require('../routes/adminRoutes/medicineRoutes');
const doctorRoutes = require('../routes/adminRoutes/doctorRoutes');
const appointmentRoutes = require('../routes/adminRoutes/appointmentRoutes');
const patientRoutes = require('../routes/adminRoutes/patientRoutes');
const storeRoutes = require('../routes/adminRoutes/storeRoutes');
const diagnosticRoutes = require('./adminRoutes/diagnosticsRoutes');
const uploadRouter = require('./adminRoutes/uploadFile');

adminRouter.use('/auth',authRoutes);
adminRouter.use(adminAuth);
adminRouter.use('/doctor',doctorRoutes);
adminRouter.use('/appointment',appointmentRoutes);
adminRouter.use('/patient',patientRoutes);
adminRouter.use('/medicine',medicineRoutes);
adminRouter.use('/store',storeRoutes);
adminRouter.use('/diagnostics',diagnosticRoutes);
adminRouter.use('/uploadFileandGetURL',uploadRouter);

function adminAuth(req,res,next){
    try {
        const data = jsonwebtoken.verify(req.headers.authorization.split(" ").pop(),"Hello world");
        req.user = data;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}
module.exports = adminRouter;