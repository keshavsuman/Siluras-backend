const express = require('express');
const healthCareController = require('../../controllers/userControllers/healthCare.controller');
const homeCareRoutes = express.Router();

homeCareRoutes.get('/',appointmentController.getAppointmentConfig);
homeCareRoutes.post('/',appointmentController.getAppointmentConfig);
homeCareRoutes.delete('/',appointmentController.getAppointmentConfig);
homeCareRoutes.patch('/',appointmentController.getAppointmentConfig);

module.exports = homeCareRoutes;