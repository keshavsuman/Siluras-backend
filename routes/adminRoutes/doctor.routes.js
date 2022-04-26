const express = require('express');
const {DoctorController} = require('../../controllers/adminControllers');
const doctorRoutes = express.Router();

doctorRoutes.post('/getDoctors',DoctorController.getDoctors);
doctorRoutes.post('/addDoctor',DoctorController.addDoctor);
doctorRoutes.put('/updateDoctor/:id',DoctorController.updateDoctor);

module.exports  = doctorRoutes;