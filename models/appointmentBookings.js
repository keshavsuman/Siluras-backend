const mongoose = require('mongoose');

const appointmentBookingSchema = mongoose.Schema({
    appointmentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'appointment'
    },
    bookingId:{
        type:Number,
    },
    date:{
        type:Date,
    },
    timeSlot:{
        type:Date,
    },
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'patient'
    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'doctor'
    },
    healthConcernId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'healthConcern'
    },
    status:{
        type:String,
        default:'ACTIVE'
    }
},{
    timestamps:true
});

module.exports =  mongoose.model('appointmentBookings',appointmentBookingSchema);