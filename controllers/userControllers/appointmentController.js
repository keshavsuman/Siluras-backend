const healthConcernModel = require('../../models/healthConcernModel');
const appointmentBookingModel = require('../../models/appointmentBookings');
const doctorModel = require('../../models/doctorModel');

module.exports.getMyAppointments = async (req,res)=>{
    try {
        console.log(req.user._id);
        const past = await appointmentBookingModel.find({
            date:{
                $lt: new Date()
            },
            patientId:req.user._id
        }).populate('doctorId').populate('healthConcernId').populate('patientId');

        const upcoming = await appointmentBookingModel.find({
            date:{
                $gte: new Date()
            },
            patientId:req.user._id
        }).populate('doctorId').populate('healthConcernId').populate('patientId');
        
        res.status(200).json({
            status:200,
            message:'Appointments fetched Successfully',
            data:{
                past,
                upcoming
            }
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
        const appointment = await appointmentBookingModel.create({
            patientId:req.user._id,
            date:req.body.date,
            timeSlot:req.body.timeSlot,
            healthConcernId:req.body.healthConcernId,
            doctorId:req.body.doctorId,
        });
        const newAppointment = await appointmentBookingModel.findById(appointment._id).populate('patientId').populate('doctorId').populate('healthConcernId');
        res.status(200).json({
            status:200,
            message:'Appointments Booked Successfully',
            data:newAppointment
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

module.exports.getDoctors = async (req,res)=>{
    try {
        const doctors = await doctorModel.find();
        res.status(200).json({
            status:200,
            message:'Doctors fetched Successfully',
            data:doctors
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message
        });
    }
}