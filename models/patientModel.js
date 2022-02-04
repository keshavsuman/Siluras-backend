const mongoose = require("mongoose");

const PatientSchema = mongoose.Schema({
    first_name: {
        type:String,
        required:true
    },
    last_name: {
        type:String,
        required:true
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
    firebase_token:{
        type:String
    },
    gender:{
        type:String
    },
    age:{
        type:Number
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
    }
},{
    timestamps:true
});

module.exports = mongoose.model("Patient", PatientSchema);