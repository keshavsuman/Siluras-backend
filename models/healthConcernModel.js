const mongoose = require('mongoose');

const healthConcernSchema = mongoose.Schema({
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

module.exports = mongoose.model('healthConcern',healthConcernSchema);