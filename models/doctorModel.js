const mongoose = require("mongoose");

const DoctorSchema = mongoose.Schema({
    first_name: {
        type:String
    },
    last_name: {
        type:String
    },
    email:{
        type:String
    },
    gender:{
        type:String
    },
    blood_group:{
        type:String
    },
    marital_status:{
        type:String
    },
    password:{
        type:String
    },
    about:{
        type:String
    },
    mobileNumber:{
        type:String
    },
    firebaseId:{
        type:String
    },
    firebase_token:{
        type:String
    },
    dob:{
        type:Date,
    },
    speciality:{
        type:String
    },
    profilePicture:{
            type:String
    },
    isAvailable:{
        type:String
    },
    healthservices:{
        type:[{type:mongoose.Schema.Types.ObjectId,ref:'healthServices'}]
    }
},{
    timestamps:true
});

module.exports = mongoose.model("doctor", DoctorSchema);