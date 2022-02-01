const express = require('express');
const userRouter = express.Router();
const authController = require('../../controllers/userControllers/authenticationController');

userRouter.post('/login',authController.login);
userRouter.post('/signup',authController.signup);


module.exports = userRouter;