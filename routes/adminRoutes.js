const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const adminRouter = express.Router();
const authRoutes = require('./adminRoutes/auth.routes');
const medicineRoutes = require('../routes/adminRoutes/medicine.routes');
const doctorRoutes = require('../routes/adminRoutes/doctor.routes');
const appointmentRoutes = require('../routes/adminRoutes/appointment.routes');
const patientRoutes = require('../routes/adminRoutes/patient.routes');
const storeRoutes = require('../routes/adminRoutes/store.routes');
const diagnosticRoutes = require('./adminRoutes/diagnostics.routes');
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
        const data = jsonwebtoken.verify(req.headers.authorization.split(" ").pop(),process.env.SECRET);
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