const express = require('express');
const userRouter = express.Router();
const authRoutes = require('./auth.routes');
const healthArticleRoutes = require('./healthArticle.routes');
const appointmentRoutes = require('./appointment.routes');
const storeRoutes = require('./store.routes');
const medicalRoutes = require('./medicalRecords');
const diagnosticsRoutes = require('./diagnostics.routes');
const healthCareRoutes = require('./homeCare.routes');
const ambulanceRoutes = require('./ambulance.routes');
const chatRoutes = require('./chat.routes');

const userController = require('../../controllers/userControllers/user.controller');
const jsonwebtoken = require('jsonwebtoken');

userRouter.use('/auth',authRoutes);
userRouter.use('/healthArticles',healthArticleRoutes);
userRouter.use(patientAuth);
userRouter.use('/appointment',appointmentRoutes);
userRouter.use('/store',storeRoutes);
userRouter.use('/medicalRecords',medicalRoutes);
userRouter.use('/diagnostics',diagnosticsRoutes);
userRouter.use('/healthCare',healthCareRoutes);
userRouter.get('/notifications',userController.getNotifications);
userRouter.get('/visits',userController.getVisits);
userRouter.get('/',userController.getUser);
userRouter.post('/updateUser',userController.updateUser);
userRouter.post('/contactUs',userController.contactUs);
userRouter.get('/welcomeImage',userController.getWelcomeImage);
userRouter.get('/getSpotlight',userController.getSpotlight);
userRouter.use('/ambulance',ambulanceRoutes);
userRouter.use('/chat',chatRoutes);

function patientAuth(req,res,next){
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

module.exports = userRouter;