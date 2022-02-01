const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    doctorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Doctor'
    },
    users:{
        type:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}]
    }
});

module.exports = chatSchema;