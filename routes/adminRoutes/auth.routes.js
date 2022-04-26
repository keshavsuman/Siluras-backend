const express = require('express');
const authRouter = express.Router();
const {AuthenticationController} = require('../../controllers/adminControllers');

authRouter.post('/login',AuthenticationController.login);
authRouter.post('/signup',AuthenticationController.signup);


module.exports = authRouter;