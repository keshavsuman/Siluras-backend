const mongoose = require('mongoose');

const healthCareServiceSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    icon:{
        type:String
    }
});

module.exports = mongoose.model('healthCareService',healthCareServiceSchema);