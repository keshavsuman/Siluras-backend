const mongoose = require('mongoose');

const ambulanceBookingSchema = new mongoose.Schema({
    name:{
        type:String
    },
    number:{
        type:String
    },
    email:{
        type:String
    },
    subject:{
        type:String
    },
    type:{
        type:String,
        enum:["air","road"]
    },
    location:{
         type: {type:String},
         coordinates: [Number],
    }
});

ambulanceBookingSchema.index({location: '2dsphere'});

module.exports = mongoose.model('ambulanceBooking',ambulanceBookingSchema);