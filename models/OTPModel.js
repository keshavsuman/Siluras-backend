const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
    otp:{
        type:Number
    },
    mobileNumber:{
        type:Number
    }
},{
    timestamps:true
});

module.exports = mongoose.model("otp", otpSchema);