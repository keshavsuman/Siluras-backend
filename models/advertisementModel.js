const mongoose =  require('mongoose');

const advertisementSchema = new mongoose.Schema({
    name:{
        type:String
    },
    image_url:{
        type:String
    }
});

advertisementSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('Advertisement', advertisementSchema);