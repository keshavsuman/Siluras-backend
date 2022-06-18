const appointmentBookingModel = require('../../models/appointmentBookings');

module.exports.getAppointments = async (req, res) => {
    try {
        const {page,limit} = req.query;
        const appointments = await appointmentBookingModel.find({
            doctorId:req.user._id,
            timeSlot:{
                $gte:new Date()
            }
        }).skip((page-1)*limit).limit(limit??10).populate('doctorId').populate('patientId');
        res.status(200).json({
            status:200,
            message: "Appointments fetched successfully",
            data: appointments
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
}

module.exports.getMyAppointments = async (req, res) => {
    try {
        const upcomingAppointments = await appointmentBookingModel.find({
            doctorId:req.user._id,
            date:{
                $gte:new Date()
            }
        }).populate('doctorId').populate('patientId');
        const pastAppointments = await appointmentBookingModel.find({
            doctorId:req.user._id,
            date:{
                $lte:new Date()
            }
        }).populate('doctorId').populate('patientId');
        res.status(200).json({
            status:200,
            message: "Appointments fetched successfully",
            data: {
                "upcoming":upcomingAppointments,
                "past":pastAppointments
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
}