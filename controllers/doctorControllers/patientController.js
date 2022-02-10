const patientModel = require("../../models/patientModel");
const appointmentBookingModel = require("../../models/appointmentBookings");

module.exports.getRecentPatients = async (req, res) => {
    try {
        const patients = await appointmentBookingModel.aggregate([
            {
                $match:{
                    doctorId:req.user._id
                }
            },
            {
                $lookup: {
                    from: "patients",
                    localField: "patientId",
                    foreignField: "_id",
                    as: "patient"
                }
            },{
                $project:{
                    patient:{
                        _id:1,
                    }
                }
            }
        ]);
        res.status(200).json({
            status: 200,
            message: "Recent patients fetched successfully",
            data: patients
        });        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
}