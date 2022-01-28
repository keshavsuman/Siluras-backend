const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    duration:{
        type:Number
    },
    price:{
        currency:{type:mongoose.Schema.Types.ObjectId,ref:'currencies'},
        amount:{type:Number}
    }
},{
    timestamps:true
});

module.exports =  mongoose.model('appointment',appointmentSchema);