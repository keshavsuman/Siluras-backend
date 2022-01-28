const appointmentModel = require('../../models/appointmentModel');
const appointmentBookings = require('../../models/appointmentBookings');

module.exports.getAppointments = async (req,res)=>{
    try {
        const {select,project,limit,skip} = req.body;
        const appointments = await appointmentModel.find(select,project).limit(limit??20).skip(skip??0);
        res.status(200).json({
            status:200,
            message:'Appointments fetched Successfully',
            data:appointments
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}

module.exports.getAppointmentBookings = async (req,res)=>{
    try {
        const {select,project,limit,skip} = req.body;
        const appointments = appointmentBookings.find(select,project).limit(limit??20).skip(skip??0);
        res.status(200).json({
            status:200,
            message:'Appointments fetched Successfully',
            data:appointments
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}

module.exports.bookAppointment = async (req,res)=>{
    try {
        const appointment = appointmentBookingModel.create({
            patientId:req.user._id,
            date:req.body.date,
            timeSlot:req.body.timeSlot,
        });
        res.status(201).json({
            status:201,
            message:"Appointment Booked Successfully",
            data:appointment
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}

module.exports.updateAppointment = async (req,res)=>{
    try {
        const appointment = await appointmentModel.findById(req.params.id,{

        },{new:true});
        res.status(200).json({
            status:200,
            message:"Appointment updated successfullu",
            data:appointment
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}
module.exports.addAppointment = async (req,res)=>{
    try {
        const appointment = await appointmentModel.create({
            
        });
        res.status(201).json({
            status:201,
            message:"Appointment added successfully",
            data:appointment
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message
        });
    }
}