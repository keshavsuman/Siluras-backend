const express = require('express');
const {HealthCareController} = require('../../controllers/adminControllers');
const healthcareRoutes = express.Router();

// Service
healthcareRoutes.get('/getServices',HealthCareController.getServices);
healthcareRoutes.post('/createService',HealthCareController.createService);
healthcareRoutes.patch('/updateService/:id',HealthCareController.updateService);
healthcareRoutes.delete('/deleteService/:id',HealthCareController.deleteService);

healthcareRoutes.get('/',HealthCareController.getHealthCareRequest);
healthcareRoutes.post('/',HealthCareController.getHealthCareRequest);
healthcareRoutes.patch('/:id',HealthCareController.getHealthCareRequest);
healthcareRoutes.delete('/:id',HealthCareController.getHealthCareRequest);

module.exports  = healthcareRoutes;