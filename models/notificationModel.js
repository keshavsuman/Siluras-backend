const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
        enum:["reminder","appointment","tips","promotion"],
    },
},{
    timestamps:true
});

module.exports =  mongoose.model('notification',notificationSchema);