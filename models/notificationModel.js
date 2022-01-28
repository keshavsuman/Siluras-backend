const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({

},{
    timestamps:true
});

module.exports =  mongoose.model('notification',notificationSchema);