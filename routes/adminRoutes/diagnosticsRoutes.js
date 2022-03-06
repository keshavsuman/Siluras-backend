const express = require('express');
const diagnosticController = require('../../controllers/adminControllers/diagnosticController');

const diagnosticRoutes = express.Router();

diagnosticRoutes.post('/createDiagnosticCenter',diagnosticController.createDiagnosticCenter);
diagnosticRoutes.post('/updateDiagnosticCenter/:id',diagnosticController.createDiagnosticCenter);

diagnosticRoutes.post('/:id/createTest',diagnosticController.createTest);

module.exports = diagnosticRoutes;