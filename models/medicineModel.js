const mongoose = require('mongoose');

const medicineSchema = mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    quantity:{
        amount:{type:Number},
        type:{type:String}
    },
    price:{
        currency:{type:mongoose.Schema.Types.ObjectId},
        amount:{type:Number},
        discountedPrice:{type:Number}
    },
    image_url:{
        type:String
    },
    inStock:{
        type:Number
    },
    isAvailable:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});

module.exports = mongoose.model('medicine',medicineSchema);