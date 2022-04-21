const mongoose = require("mongoose");

const welcomeImageSchema = mongoose.Schema({
   image:{
       type:String,
       required:true
   }
},{
    timestamps:true
});

module.exports = mongoose.model("welcomeImage", welcomeImageSchema);