const express = require('express');
const jsonwebtoken = require('jsonwebtoken');

const authRoutes = require('./doctorRoutes/authRoutes');
const doctorController = require('../controllers/doctorControllers/doctorController');
const appointmentRoutes = require('./doctorRoutes/appointmentRoutes');
const patientRoutes = require('../routes/doctorRoutes/patientRoutes');
const {isDoctorKycVerified} = require('../helpers/kyc.helper');
const {Doctor} = require('../models');

const doctorRouter = express.Router();

doctorRouter.use('/auth',authRoutes);
doctorRouter.use(doctorAuth);
doctorRouter.use('/appointment',appointmentRoutes);
doctorRouter.use('/patient',patientRoutes);
doctorRouter.get('/notifications',doctorController.getNotifications);
doctorRouter.get('/',doctorController.getDoctor);
doctorRouter.post('/updateDoctor',doctorController.updateDoctor);
doctorRouter.post('/updateFirebaseToken',doctorController.updateFirebaseToken);


async function doctorAuth(req,res,next){
    try {
        const data = jsonwebtoken.verify(req.headers.authorization.split(" ").pop(),process.env.SECRET);
        req.user = await Doctor.findById(data.id);
        // isDoctorKycVerified(req.user);
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}
module.exports = doctorRouter;