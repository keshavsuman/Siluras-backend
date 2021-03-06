const mongoose = require("mongoose");

const PatientSchema = mongoose.Schema({
    first_name: {
        type:String,
        required:true
    },
    last_name: {
        type:String,
    },
    email:{
        type:String,
    },  
    password:{
        type:String
    },
    profilePicture:{
        type:String
    },
    firebaseId:{
        type:String
    },
    googleId:{
        type:String,
    },
    refresh_token:{
        type:String
    },
    access_token:{
        type:String
    },
    firebase_token:{
        type:String
    },
    gender:{
        type:String
    },
    dob:{
        type:Date
    },
    type:{
        type:String
    },
    height:{
        type:Number
    },
    weight:{
        type:Number
    },
    birthDate:{
        type:String
    },
    bloodGroup:{
        type:String
    },
    mobileNumber:{
        type:String
    },
    maritalStatus:{
        type:String
    },
    isProfileComplete:{
        type:Boolean,
        required:true,
        default:false
    }
},{
    timestamps:true
});

module.exports = mongoose.model("patient", PatientSchema);