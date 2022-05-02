const mongoose = require('mongoose');

const healthCareRequestSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    city:{
        type:String
    },
    mobileNumber:{
        type:String
    },
    service:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"homeCareService"
    }
});

module.exports = mongoose.model('healthCareRequest',healthCareRequestSchema);