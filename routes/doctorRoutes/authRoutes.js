const express = require("express");
const authenticationController = require("../../controllers/doctorControllers/authentication.controller");
const authRoutes = express.Router();

authRoutes.post('/login',authenticationController.login);
authRoutes.post('/signup',authenticationController.signup);
authRoutes.post('/forgot-password',authenticationController.forgetPassword);
authRoutes.post('/reset-password',authenticationController.resetPassword);
module.exports = authRoutes;