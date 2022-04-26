const mongoose = require('mongoose');

const healthArticleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
    },
    url:{
        type:String
    }
});

module.exports = mongoose.model('healthArticle',healthArticleSchema);