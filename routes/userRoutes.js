const express = require('express');
const userRouter = express.Router();
const authRoutes = require('./userRoutes/authRoutes');
const appointmentRoutes = require('./userRoutes/appointmentRoutes');
const userController = require('../controllers/userControllers/userController');
const jsonwebtoken = require('jsonwebtoken');

userRouter.use('/auth',authRoutes);
userRouter.use(patientAuth);
userRouter.use('/appointment',appointmentRoutes);
userRouter.get('/notifications',userController.getNotifications);
userRouter.get('/visits',userController.getVisits);
userRouter.get('/',userController.getUser);

function patientAuth(req,res,next){
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

module.exports = userRouter;