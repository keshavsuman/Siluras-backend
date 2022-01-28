const express = require('express');
const doctorController = require('../../controllers/adminControllers/doctorController');
const doctorRoutes = express.Router();

doctorRoutes.post('/getDoctors',doctorController.getDoctors);
doctorRoutes.post('/addDoctor',doctorController.addDoctor);
doctorRoutes.put('/updateDoctor/:id',doctorController.updateDoctor);

module.exports  = doctorRoutes;