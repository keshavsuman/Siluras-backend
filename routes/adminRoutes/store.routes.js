const express = require('express');
const {StoreController} = require('../../controllers/adminControllers');
const storeRoutes = express.Router();

storeRoutes.post('/getAdvetisements',StoreController.getAdvertisements);
storeRoutes.post('/createAdvertisement',StoreController.createAdvertisement);
storeRoutes.post('/updateAdvertisement/:id',StoreController.updateAdvertisement);
storeRoutes.delete('/deleteAdvertisement/:id',StoreController.deleteAdvertisement);

storeRoutes.post('/getCategories',StoreController.getCategories);
storeRoutes.post('/createCategory',StoreController.createCategory);
storeRoutes.post('/updateCategory/:id',StoreController.updateCategory);
storeRoutes.delete('/deleteCategory/:id',StoreController.deleteCategory);

storeRoutes.post('/getSubCategories::id',StoreController.getSubCategory);
storeRoutes.post('/createSubCategory',StoreController.createSubCategroy);
storeRoutes.post('/updateSubCategory/:id',StoreController.updateSubCategory);
storeRoutes.delete('/deleteSubCategory/:id',StoreController.deleteSubCategory);

module.exports = storeRoutes;