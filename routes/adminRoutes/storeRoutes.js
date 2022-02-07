const express = require('express');
const storeController = require('../../controllers/adminControllers/storeController');
const storeRoutes = express.Router();

storeRoutes.post('/getAdvetisements',storeController.getAdvertisements);
storeRoutes.post('/createAdvertisement',storeController.createAdvertisement);
storeRoutes.post('/updateAdvertisement/:id',storeController.updateAdvertisement);
storeRoutes.delete('/deleteAdvertisement/:id',storeController.deleteAdvertisement);

storeRoutes.post('/getCategories',storeController.getCategories);
storeRoutes.post('/createCategory',storeController.createCategory);
storeRoutes.post('/updateCategory/:id',storeController.updateCategory);
storeRoutes.delete('/deleteCategory/:id',storeController.deleteCategory);

storeRoutes.post('/getSubCategories::id',storeController.getSubCategory);
storeRoutes.post('/createSubCategory',storeController.createSubCategroy);
storeRoutes.post('/updateSubCategory/:id',storeController.updateSubCategory);
storeRoutes.delete('/deleteSubCategory/:id',storeController.deleteSubCategory);

module.exports = storeRoutes;