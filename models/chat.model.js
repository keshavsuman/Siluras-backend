const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    lastMessage:{
        type:mongoose.Schema.Types.String
    },
    isArchived:{
        type:mongoose.Schema.Types.Boolean
    }
});

chatSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model("chat",chatSchema);