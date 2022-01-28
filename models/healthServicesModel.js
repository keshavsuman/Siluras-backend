const mongoose = require('mongoose');

const healthServicesSchema = mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    image:{
        type:String
    }
});

module.exports = mongoose.model('healthServices',healthServicesSchema);