const express = require('express');
const medicineController = require('../../controllers/adminControllers/medicineController');
const medicineRoutes = express.Router();

medicineRoutes.post('/getMedicines',medicineController.getMedicines);
medicineRoutes.post('/addMedicine',medicineController.addMedicines);
medicineRoutes.put('/updateMedicine/:id',medicineController.updateMedicines);

module.exports  = medicineRoutes;