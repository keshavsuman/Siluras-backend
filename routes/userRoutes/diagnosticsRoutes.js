const express = require('express');
const diagnosticController = require('../../controllers/userControllers/diagnosticController');

const diagnosticRoutes = express.Router();

diagnosticRoutes.post('/getNearByDiagnostics',diagnosticController.getNearByDiagnostics);
diagnosticRoutes.post('/:id/getTests',diagnosticController.getTests);

module.exports = diagnosticRoutes;