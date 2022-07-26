const mongoose = require('mongoose');

const appointmentBookingSchema = new mongoose.Schema({
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
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'patient'
    },
    doctor:{
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

appointmentBookingSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
}); 

module.exports =  mongoose.model('appointmentBookings',appointmentBookingSchema);