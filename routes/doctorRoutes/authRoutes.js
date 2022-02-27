const express = require("express");
const authenticationController = require("../../controllers/doctorControllers/authenticationController");
const authRoutes = express.Router();

authRoutes.post('/login',authenticationController.login);
authRoutes.post('/signup',authenticationController.signup);
authRoutes.post('/loginUsingMobileNumber',authenticationController.loginUsingMobileNumber);
authRoutes.post('/singupUsingMobileNumber',authenticationController.signupUsingMobileNumber);
authRoutes.post('/isDoctorExitWithMobileNumber',authenticationController.isDoctorExitWithMobileNumber);

module.exports = authRoutes;