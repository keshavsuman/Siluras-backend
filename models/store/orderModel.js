const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    medicineId: {
        type: [{
            type:mongoose.Schema.Types.Map
        }]
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    paymentId: {
        type: String,
    },
    paymentStatus: {
        type: String,
        required: true,
        default:'pending'
    },
    status:{
        type:String,
        required:true,
        default:'pending'
    }
},{
    timestamps: true,
});

module.exports = mongoose.model('order', orderSchema);