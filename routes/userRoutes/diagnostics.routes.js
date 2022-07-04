const express = require('express');
const diagnosticController = require('../../controllers/userControllers/diagnostic.controller');

const diagnosticRoutes = express.Router();

diagnosticRoutes.get('/getNearByDiagnostics',diagnosticController.getNearByDiagnostics);
diagnosticRoutes.get('/:id/getTests',diagnosticController.getTests);

module.exports = diagnosticRoutes;