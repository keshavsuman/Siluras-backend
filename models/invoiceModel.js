const mongoose = require("mongoose");

const invoiceSchema = mongoose.Schema({
    
},{
    timestamps:true
});

module.exports = mongoose.model("invoice", invoiceSchema);