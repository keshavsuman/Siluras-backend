const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient',
    },
    products:{
        type:[{type:Object}],
    },
    totalPrice:{
        type:Number,
        default:0
    },
},{timeStamps:true});

module.exports = mongoose.model('cart', cartSchema);