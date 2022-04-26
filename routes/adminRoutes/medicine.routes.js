const express = require('express');
const {MedicineController} = require('../../controllers/adminControllers');
const medicineRoutes = express.Router();

medicineRoutes.post('/getMedicines',MedicineController.getMedicines);
medicineRoutes.post('/addMedicine',MedicineController.addMedicines);
medicineRoutes.put('/updateMedicine/:id',MedicineController.updateMedicines);

module.exports  = medicineRoutes;