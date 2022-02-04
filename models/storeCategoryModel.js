const mongoose = require('mongoose');

const storeCategorySchema = mongoose.Schema({
    categoryName:{
        type:String,
        required:true,
    },
    image_url:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model('storeCategory', storeCategorySchema);