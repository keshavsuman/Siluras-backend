const express = require('express');
const jsonwebtoken = require('jsonwebtoken');

const authRoutes = require('./auth.routes');
const medicineRoutes = require('./medicine.routes');
const doctorRoutes = require('./doctor.routes');
const appointmentRoutes = require('./appointment.routes');
const patientRoutes = require('./patient.routes');
const storeRoutes = require('./store.routes');
const diagnosticRoutes = require('./diagnostics.routes');
const uploadRouter = require('./uploadFile');
const healthArticlesRoutes = require('./healtharticle.route');
const welcomeRouter = require('./welcomeImage.route');

const adminRouter = express.Router();

adminRouter.use('/auth',authRoutes);
adminRouter.use(adminAuth);
adminRouter.use('/healthArticles',healthArticlesRoutes);
adminRouter.use('/doctor',doctorRoutes);
adminRouter.use('/appointment',appointmentRoutes);
adminRouter.use('/patient',patientRoutes);
adminRouter.use('/medicine',medicineRoutes);
adminRouter.use('/store',storeRoutes);
adminRouter.use('/diagnostics',diagnosticRoutes);
adminRouter.use('/uploadFileandGetURL',uploadRouter);
adminRouter.use('/welcomeImage',welcomeRouter);

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