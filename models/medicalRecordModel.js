const mongoose = require('mongoose');
const medicalRecordSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    fileName:{
        type:String
    },
    fileType:{
        type:String
    },
    medicalRecordURL:{
        type:String
    },
    medicalRecordType:{
        type:String
    },
    fileSize:{
        type:Number
    }
});

module.exports = mongoose.model('medicalRecord',medicalRecordSchema);