const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    patientId: {},
    products: {},
    totalPrice: {},
    status: {},
    paymentId: {},
    paymentStatus: {},
    paymentMethod: {},

},{
    timestamps: true,
});

module.exports = mongoose.model('order', orderSchema);