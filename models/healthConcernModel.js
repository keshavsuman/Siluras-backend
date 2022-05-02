const mongoose = require('mongoose');

const healthConcernSchema = mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    imagePath:{
        type:String
    }
});

module.exports = mongoose.model('healthConcern',healthConcernSchema);