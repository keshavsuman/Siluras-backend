const express = require('express');
const {HealtArticleController} = require('../../controllers/adminControllers');
const healthArticleRoutes = express.Router();

// healthArticleRoutes.get('/',HealtArticleController.getDoctors);
// healthArticleRoutes.post('/',HealtArticleController.getDoctors);
// healthArticleRoutes.patch('/:id',HealtArticleController.getDoctors);
// healthArticleRoutes.delete('/:id',HealtArticleController.getDoctors);

module.exports  = healthArticleRoutes;