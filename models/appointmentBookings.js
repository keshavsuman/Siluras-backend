const mongoose = require('mongoose');

const appointmentBookingSchema = mongoose.Schema({
    bookingId:{
        type:Number,
    },
    date:{
        type:Date,
        required:true
    },
    timeSlot:{
        type:Date,
        required:true
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
        default:'ACTIVE',
        enum:['ACTIVE','CANCELLED','COMPLETED']
    }
},{
    timestamps:true
});

    module.exports =  mongoose.model('appointmentBookings',appointmentBookingSchema);