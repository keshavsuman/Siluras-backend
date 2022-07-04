const mongoose = require('mongoose');

const multimediaSchema = new mongoose.Schema({
    mimeType:{
        type:String
    },
    multimediaURL:{
        type:String
    },
    size:{
        type:Number
    }
},{
    _id:false
});

const messageSchema = new mongoose.Schema({
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    text:{
        type:String
    },
    type:{
        type:String,
        enum:['text','multimedia']
    },
    multimedia:{
        type:multimediaSchema,
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    isSeen:{
        type:Boolean
    },
    isDelivered:{
        type:Boolean
    }
});

module.exports = mongoose.model('messages',messageSchema);