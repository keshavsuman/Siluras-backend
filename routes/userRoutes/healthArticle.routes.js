const express = require('express');
const healthArticleController = require('../../controllers/userControllers/healtharticles.controller');
const healthArticleRoutes = express.Router();

healthArticleRoutes.get('/',healthArticleController.getHealthArticles);

module.exports = healthArticleRoutes;