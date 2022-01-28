const express = require('express');
const userRouter = express.Router();
const authRoutes = require('./userRoutes/auhtRoutes');
const appointmentRoutes = require('./userRoutes/auhtRoutes');
const userController = require('../controllers/userControllers/userController');

userRouter.use('/auth',authRoutes);
userRouter.use(patientAuth);
userRouter.use('/appoitment',appointmentRoutes);
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