const express = require('express');
const {AppointmentController} = require('../../controllers/adminControllers');
const appointmentRoutes = express.Router();

appointmentRoutes.get('/getAppointments',AppointmentController.getAppointments);
appointmentRoutes.post('/getAppointmentBookings',AppointmentController.getAppointmentBookings);
appointmentRoutes.post('/bookAppointment',AppointmentController.bookAppointment);
// appointmentRoutes.put('/updateAppointment/:id',AppointmentController.updateAppointment);
// appointmentRoutes.put('/cancelAppointmentBooking/:id',AppointmentController.updateAppointment);
appointmentRoutes.post('/addAppointment',AppointmentController.addAppointment);
appointmentRoutes.post('/createHealthConcern',AppointmentController.createHealthConcern);
appointmentRoutes.post('/getHealthConcerns',AppointmentController.getHealthConcern);
appointmentRoutes.patch('/updateHealthConcern/:id',AppointmentController.updateHealthConcern);
module.exports  = appointmentRoutes;