const express = require('express');
const ambulanceController = require('../../controllers/userControllers/ambulanceController');
const ambulanceRoutes = express.Router();

ambulanceRoutes.post('/book',ambulanceController.bookAmbulance);

module.exports = ambulanceRoutes;