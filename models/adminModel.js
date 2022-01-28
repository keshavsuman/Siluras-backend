const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    permissions:{
        type:[{type:String}]
    }
},{
    timestamps:true
});

module.exports =  mongoose.model('admin',adminSchema);