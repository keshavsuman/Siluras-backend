const express = require('express');
const storeController = require('../../controllers/adminControllers/storeController');
const storeRoutes = express.Router();

storeRoutes.post('/getAdvetisements',storeController.getAdvertisements);
storeRoutes.post('/createAdvertisement',storeController.createAdvertisement);
storeRoutes.post('/updateAdvertisement/:id',storeController.updateAdvertisement);
storeRoutes.delete('/deleteAdvertisement/:id',storeController.deleteAdvertisement);

module.exports = storeRoutes;