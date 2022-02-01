const mongoose =  require('mongoose');
const advertisementSchema = new mongoose.Schema({
    name:{
        type:String
    },
    image_url:{
        type:String
    }
});

module.exports = mongoose.model('Advertisement', advertisementSchema);