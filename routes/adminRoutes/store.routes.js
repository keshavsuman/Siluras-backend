const express = require('express');
const {StoreController} = require('../../controllers/adminControllers');
const storeRoutes = express.Router();

storeRoutes.post('/getAdvetisements',StoreController.getAdvertisements);
storeRoutes.post('/createAdvertisement',StoreController.createAdvertisement);
storeRoutes.post('/updateAdvertisement/:id',StoreController.updateAdvertisement);
storeRoutes.delete('/deleteAdvertisement/:id',StoreController.deleteAdvertisement);

storeRoutes.get('/getCategories',StoreController.getCategories);
storeRoutes.post('/createCategory',StoreController.createCategory);
storeRoutes.patch('/updateCategory/:id',StoreController.updateCategory);
storeRoutes.delete('/deleteCategory/:id',StoreController.deleteCategory);

storeRoutes.get('/getSubCategories/:id',StoreController.getSubCategory);
storeRoutes.post('/createSubCategory',StoreController.createSubCategroy);
storeRoutes.patch('/updateSubCategory/:id',StoreController.updateSubCategory);
storeRoutes.delete('/deleteSubCategory/:id',StoreController.deleteSubCategory);

module.exports = storeRoutes;