const express = require('express');
const appointmentController = require('../../controllers/userControllers/appointment.controller');

const appointmentRoutes = express.Router();

appointmentRoutes.get('/appointmentConfig',appointmentController.getAppointmentConfig);
appointmentRoutes.get('/getMyAppointments',appointmentController.getMyAppointments);
appointmentRoutes.post('/bookAppointment',appointmentController.bookAppointment);
appointmentRoutes.get('/getHealthConcerns',appointmentController.getHealthConcerns);
appointmentRoutes.get('/getdoctors',appointmentController.getDoctors);

module.exports = appointmentRoutes;