const express = require('express');
const storeController = require('../../controllers/userControllers/storeController');
const storeRoutes = express.Router();

storeRoutes.post('/getMedicines',storeController.getMedicines);
storeRoutes.post('/getCategories',storeController.getCategories);
storeRoutes.post('/getAdvertisements',storeController.getAdvertisements);
storeRoutes.post('/addtoCart',storeController.addToCart);
storeRoutes.get('/getCart',storeController.getCart);
storeRoutes.post('/updateQuantity',storeController.updateQuantity);
storeRoutes.post('/removeFromCart',storeController.removeFromCart);
storeRoutes.post('/placeOrder',storeController.placeOrder);
storeRoutes.post('/getOrders',storeController.getOrders);
storeRoutes.post('/updateOrder',storeController.updateOrder);

module.exports = storeRoutes;
