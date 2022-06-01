const express = require('express');
const doctorRouter = express.Router();
const authRoutes = require('./doctorRoutes/authRoutes');
const doctorController = require('../controllers/doctorControllers/doctorController');
const jsonwebtoken = require('jsonwebtoken');
const appointmentRoutes = require('../routes/doctorRoutes/appointmetnRoutes');
const patientRoutes = require('../routes/doctorRoutes/patientRoutes');

doctorRouter.use('/auth',authRoutes);
doctorRouter.use(doctorAuth);
doctorRouter.use('/appointment',appointmentRoutes);
doctorRouter.use('/patient',patientRoutes);
doctorRouter.get('/notifications',doctorController.getNotifications);
doctorRouter.get('/',doctorController.getDoctor);
doctorRouter.post('/updateDoctor',doctorController.updateDoctor);
doctorRouter.post('/updateFirebaseToken',doctorController.updateFirebaseToken);


function doctorAuth(req,res,next){
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
module.exports = doctorRouter;