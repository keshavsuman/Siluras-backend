const express = require('express');
const patientController = require('../../controllers/adminControllers/patientController');
const patientRoutes = express.Router();

patientRoutes.post('/getPatients',patientController.getPatients);
patientRoutes.post('/addPatient',patientController.addPatient);
patientRoutes.put('/updatePatient/:id',patientController.updatePatient);

module.exports  = patientRoutes;