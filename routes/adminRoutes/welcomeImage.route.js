const express = require('express');
const {WelcomeController} = require('../../controllers/adminControllers');

const welcomeRoutes = express.Router();

welcomeRoutes.get('/',WelcomeController.getWelcomeImage);
welcomeRoutes.post('/',WelcomeController.createWelcomeImage);
welcomeRoutes.delete('/',WelcomeController.deleteWelcomeImage);

module.exports  = welcomeRoutes;