const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'patient'
    },
    docotrId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'doctor',
    },
    date:{
        type:Date
    },
    time:{
        type:String
    },

},{timestamps:true});

module.exports = mongoose.model('tests',testSchema);