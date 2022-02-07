const express = require('express');
const doctorRouter = express.Router();
const authRoutes = require('./userRoutes/authRoutes');
const doctorController = require('../controllers/doctorControllers/doctorController');
const jsonwebtoken = require('jsonwebtoken');

doctorRouter.use('/auth',authRoutes);
doctorRouter.use(doctorAuth);
doctorRouter.get('/notifications',doctorController.getNotifications);
doctorRouter.get('/',doctorController.getDoctor);


function doctorAuth(req,res,next){
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
module.exports = doctorRouter;