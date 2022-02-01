const appointmentModel = require('../../models/appointmentModel');
const healthConcernModel = require('../../models/healthConcernModel');
const appointmentBookingModel = require('../../models/appointmentBookings');

module.exports.getAppointments = async (req,res)=>{
    try {
        const {select,project,limit,skip} = req.body;
        const appointments = appointmentModel.find(select,project).limit(limit??20).skip(skip??0);
        res.status(200).json({
            status:200,
            message:'Appointments fetched Successfully',
            data:appointments
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message
        });
    }
}

module.exports.getAppointmentBookings = async (req,res)=>{
    try {
        const {select,project,limit,skip} = req.body;
        const appointments = appointmentModel.find({patientId:req.user._id,...select},project).limit(limit??20).skip(skip??0);
        res.status(200).json({
            status:200,
            message:'Appointments fetched Successfully',
            data:appointments
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message
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
        res.status(200).json({
            status:200,
            message:'Appointments Booked Successfully',
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

module.exports.getHealthConcerns = async (req,res)=>{
    try{
        const {select,project,skip,limit} = req.body; 
        const concerns = await healthConcernModel.find(select,project).limit(limit??20).skip(skip??0);
        res.status(200).json({
            status:200,
            message:'Health Service fetched Successfully',
            data:concerns
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message
        });
    }
}

module.exports.createHealthConcern = async (req,res)=>{
    try{
        const concerns = await healthConcernModel.create({
            name:req.body.name,
            imagePath:req.body.imagePath,
        });
        res.status(200).json({
            status:200,
            message:'Health Service fetched Successfully',
            data:concerns
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message
        });
    }
}