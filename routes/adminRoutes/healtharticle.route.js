const express = require('express');
const {HealtArticleController} = require('../../controllers/adminControllers');

const healthArticleRoutes = express.Router();

healthArticleRoutes.route('/')
    .get(HealtArticleController.getHealthArticles)
    .post(HealtArticleController.createHealthArticle);

healthArticleRoutes.route('/:id')
    .patch(HealtArticleController.updateHealthArticlebyId)
    .delete(HealtArticleController.deleteHealthArticleById);

module.exports  = healthArticleRoutes;