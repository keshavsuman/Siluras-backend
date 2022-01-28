const mongoose = require("mongoose");

const prescriptionSchema = mongoose.Schema({
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'patient'
    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'doctor'
    },
    medicines:{
        type:[{
            medicine:{type:mongoose.Schema.Types.ObjectId,ref:'medicine'},
            daysOfTreat:{
                type:Number
            },
            remarks:{
                type:String
            }
        }]
    },
    tests:{
        type:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"test"
        }]
    }
},{
    timestamps:true
});

module.exports = mongoose.model("prescription", prescriptionSchema);