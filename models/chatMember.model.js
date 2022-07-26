const mongoose = require('mongoose');

const chatMemberSchema = new mongoose.Schema({
    chatId:{
        type:mongoose.Schema.Types.ObjectId
    },
    memberId:{
        type:mongoose.Schema.Types.ObjectId
    },
    role:{
        type:String,
        enum:['doctor','patient','admin']
    }
},{
    timestamps:true
});

chatMemberSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model("chatMember",chatMemberSchema);