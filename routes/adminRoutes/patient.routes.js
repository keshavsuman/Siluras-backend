const express = require('express');
const {PatientController} = require('../../controllers/adminControllers');
const patientRoutes = express.Router();

patientRoutes.post('/getPatients',PatientController.getPatients);
patientRoutes.post('/addPatient',PatientController.addPatient);
patientRoutes.put('/updatePatient/:id',PatientController.updatePatient);

module.exports  = patientRoutes;