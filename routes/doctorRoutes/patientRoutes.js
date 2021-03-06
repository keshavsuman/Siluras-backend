const express = require('express');
const router = express.Router();
const patientController = require('../../controllers/doctorControllers/patient.controller');

router.get('/getRecentPatients',patientController.getRecentPatients);
router.post('/prescribe/:id',patientController.prescribe);
router.post('/test/:id',patientController.addTest);
module.exports = router;