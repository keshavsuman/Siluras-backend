const express = require('express');
const router = express.Router();
const appointmentController  = require('../../controllers/doctorControllers/appointment.controller');

router.post('/getAppointments',appointmentController.getAppointments);
router.post('/getMyAppointments',appointmentController.getMyAppointments);

module.exports = router;