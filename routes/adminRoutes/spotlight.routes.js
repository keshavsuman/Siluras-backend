const express = require('express');
const {SpotlightController} = require('../../controllers/adminControllers');
const spotlightRoutes = express.Router();

spotlightRoutes.route('/')
.post(SpotlightController.createSpotlight)
.delete(SpotlightController.deleteSpotlight);

module.exports  = spotlightRoutes;