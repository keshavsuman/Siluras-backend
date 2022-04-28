const express = require('express');
const {HealtArticleController} = require('../../controllers/adminControllers');
const healthArticleRoutes = express.Router();

healthArticleRoutes.get('/',HealtArticleController.getHealthArticles);
healthArticleRoutes.post('/',HealtArticleController.createHealthArticle);
healthArticleRoutes.patch('/:id',HealtArticleController.updateHealthArticlebyId);
healthArticleRoutes.delete('/:id',HealtArticleController.deleteHealthArticleById);

module.exports  = healthArticleRoutes;