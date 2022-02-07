const express = require('express');
const appointmentController = require('../../controllers/userControllers/appointmentController');

const appointmentRoutes = express.Router();

appointmentRoutes.get('/appointments',appointmentController.getAppointments);
appointmentRoutes.get('/appointmentBookings',appointmentController.getAppointments);
appointmentRoutes.post('/bookAppointment',appointmentController.bookAppointment);
appointmentRoutes.post('/getHealthConcerns',appointmentController.getHealthConcerns);
appointmentRoutes.post('/getDoctors',appointmentController.getDoctors);

module.exports = appointmentRoutes;