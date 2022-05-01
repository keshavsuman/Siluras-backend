const express = require('express');
const healthCareController = require('../../controllers/userControllers/healthCare.controller');
const homeCareRoutes = express.Router();

homeCareRoutes.post('/',healthCareController.createHealthCare);
homeCareRoutes.get('/getServices',healthCareController.fetchServices);

module.exports = homeCareRoutes;