const express = require('express');
const {WelcomeController} = require('../../controllers/adminControllers');

const welcomeRoutes = express.Router();

welcomeRoutes.route('/').get(WelcomeController.getWelcomeImage)
.post(WelcomeController.createWelcomeImage)
.delete(WelcomeController.deleteWelcomeImage)

module.exports  = welcomeRoutes;