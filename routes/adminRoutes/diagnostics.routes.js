const express = require('express');
const {DiagnosticController} = require('../../controllers/adminControllers');

const diagnosticRoutes = express.Router();

diagnosticRoutes.post('/createDiagnosticCenter',DiagnosticController.createDiagnosticCenter);
diagnosticRoutes.post('/updateDiagnosticCenter/:id',DiagnosticController.createDiagnosticCenter);
diagnosticRoutes.post('/:id/createTest',DiagnosticController.createTest);
diagnosticRoutes.get('/',DiagnosticController.getDiagnosticCenters);
diagnosticRoutes.get('/:id',DiagnosticController.getDiagnosticCenter);

module.exports = diagnosticRoutes;