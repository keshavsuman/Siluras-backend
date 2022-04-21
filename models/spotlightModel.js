const mongoose = require("mongoose");

const spotlightSchema = mongoose.Schema({
   image:{
       type:String,
       required:true
   }
},{
    timestamps:true
});

module.exports = mongoose.model("spotlight", spotlightSchema);