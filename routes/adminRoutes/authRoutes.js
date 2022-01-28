const express = require('express');
const authRouter = express.Router();
const authenticationController = require('../../controllers/adminControllers/authenticationController');

authRouter.post('/login',authenticationController.login);
authRouter.post('/signup',authenticationController.signup);


module.exports = authRouter;