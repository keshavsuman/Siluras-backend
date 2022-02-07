const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
    },
    subCategoryName:{
        type:String,
    },
    image_url:{
        type:String,
    }
});

module.exports = mongoose.model("subCategory", subCategorySchema);