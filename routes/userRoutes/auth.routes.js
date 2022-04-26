const express = require('express');
const userRouter = express.Router();
const authController = require('../../controllers/userControllers/authenticationController');

userRouter.post('/login',authController.login);
userRouter.post('/signup',authController.signup);
userRouter.post('/isUserExitWithMobileNumber',authController.isUserExitWithMobileNumber);
userRouter.post('/userLoginByOTP',authController.userLoginUsingOTP);
userRouter.post('/userSignupByOTP',authController.userSignupUsingOTP);
userRouter.post('/getOTP',authController.getOTP);
userRouter.post('/verifyOTP',authController.verifyOTP);
userRouter.post('/googleLogin',authController.googleLogin);
userRouter.post('/facebookLogin',authController.facebookLogin);

module.exports = userRouter;