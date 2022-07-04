const mongoose = require('mongoose');

const diagnosticsCenterSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String
    },
    mobile:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    location: {
        type: {
          type: String,
          enum: ['Point'],
          required:true
        },
        // GeoJSON Points
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
    },
    image_url:{
        type:String
    },
    permissions:{
        type:[{type:String}]
    }
},{
    timestamps:true
});

module.exports =  mongoose.model('diagnosticCenter',diagnosticsCenterSchema);