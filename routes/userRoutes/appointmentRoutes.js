const express = require('express');
const appointmentController = require('../../controllers/userControllers/appointmentController');

const appointmentRoutes = express.Router();

appointmentRoutes.get('/appointments',appointmentController.getAppointments);
appointmentRoutes.get('/appointmentBookings',appointmentController.getAppointments);
appointmentRoutes.post('/bookAppointment/:id',appointmentController.getAppointments);
appointmentRoutes.post('/getHealthConcerns',appointmentController.getHealthConcerns);
appointmentRoutes.post('/createHealthConcern',appointmentController.createHealthConcern);

module.exports = appointmentRoutes;