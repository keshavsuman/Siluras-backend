const mongoose = require('mongoose');

const appointmentBookingSchema = mongoose.Schema({
    appointmentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'appointment'
    },
    date:{
        type:Date,
    },
    timeSlot:{
        startTime:{type:String},
        endTime:{type:String}
    },
    patienId:{
        type:String,
        ref:'patient'
    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'doctor'
    }
},{
    timestamps:true
});

module.exports =  mongoose.model('appointmentBookings',appointmentBookingSchema);