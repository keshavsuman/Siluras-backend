const mongoose = require('mongoose');

const orderMedicineSchema = new mongoose.Schema({
    medicineId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'medicine',
        unique:true,
    },
    quantity:{
        type:Number,
        required:false
    }
},{_id:false});


const cartSchema = mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient',
    },
    products:{
        type:[orderMedicineSchema],
    },
    totalPrice:{
        type:Number,
        default:0
    },
},{timeStamps:true});

module.exports = mongoose.model('cart', cartSchema);