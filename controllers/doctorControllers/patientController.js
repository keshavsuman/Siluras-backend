const patientModel = require("../../models/patientModel");
const appointmentBookingModel = require("../../models/appointmentBookings");
const mongoose = require('mongoose');

module.exports.getRecentPatients = async (req, res) => {
    try {
        const patients = await appointmentBookingModel.aggregate([
            [   
                {
                    $match:{
                        doctorId:mongoose.Types.ObjectId(req.user._id)
                    }
            },
                {
                  '$lookup': {
                    'from': 'patients', 
                    'localField': 'patientId', 
                    'foreignField': '_id', 
                    'as': 'patient'
                  }
                }, {
                  '$addFields': {
                    'patient': {
                      '$first': '$patient'
                    }
                  }
                }, {
                  '$project': {
                    '_id': 0, 
                    'doctorId': 1, 
                    'patient': 1
                  }
                }, {
                  '$group': {
                    '_id': 'doctorId', 
                    'patients': {
                      '$addToSet': '$patient'
                    }
                  }
                }, {
                  '$project': {
                    '_id': 0,
                    'patients':1
                  }
                }
              ]
        ]);
        res.status(200).json({
            status: 200,
            message: "Recent patients fetched successfully",
            data: patients[0].patients
        });        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
}

module.exports.prescribe = async (req,res) =>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message
        });
    }
}

module.exports.addTest = async (req,res) =>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message
        });
    }
}