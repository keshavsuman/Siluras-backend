const mongoose = require('mongoose');

const diagnosticTestSchema = mongoose.Schema({
    diagnosticCenterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"diagnosticCenter",
        requried:true,
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    image_url:{
        type:String
    }
},{
    timestamps:true
});

module.exports =  mongoose.model('diagnosticTest',diagnosticTestSchema);