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

adminSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports =  mongoose.model('admin',adminSchema);