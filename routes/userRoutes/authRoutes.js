const express = require('express');
const userRouter = express.Router();
const authController = require('../../controllers/userControllers/authenticationController');

userRouter.post('/login',authController.login);
userRouter.post('/signup',authController.signup);
userRouter.post('/isUserExitWithMobileNumber',authController.isUserExitWithMobileNumber);
userRouter.post('/userLoginUsingOTP',authController.userLoginUsingOTP);
userRouter.post('/userSignupUsingOTP',authController.userSignupUsingOTP);
userRouter.post('/getOTP',authController.getOTP);

module.exports = userRouter;