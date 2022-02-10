const express = require('express');
const router = express.Router();
const appointmentController  = require('../../controllers/doctorControllers/appointmentController');

router.post('/getAppointments',appointmentController.getAppointments);
router.post('/getMyAppointments',appointmentController.getMyAppointments);

module.exports = router;