const express = require('express');
const appointmentController = require('../../controllers/adminControllers/appointmentController');
const appointmentRoutes = express.Router();

appointmentRoutes.post('/getAppointments',appointmentController.getAppointments);
appointmentRoutes.post('/getAppointmentBookings',appointmentController.getAppointmentBookings);
appointmentRoutes.post('/bookAppointment',appointmentController.bookAppointment);
appointmentRoutes.put('/updateAppointment/:id',appointmentController.updateAppointment);
appointmentRoutes.put('/cancelAppointmentBooking/:id',appointmentController.updateAppointment);

module.exports  = appointmentRoutes;