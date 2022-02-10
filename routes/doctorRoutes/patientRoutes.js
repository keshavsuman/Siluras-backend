const express = require('express');
const router = express.Router();
const patientController = require('../../controllers/doctorControllers/patientController');

router.post('/getRecentPatients',patientController.getRecentPatients);

module.exports = router;