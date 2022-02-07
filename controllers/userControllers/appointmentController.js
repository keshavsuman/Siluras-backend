const healthConcernModel = require('../../models/healthConcernModel');
const appointmentBookingModel = require('../../models/appointmentBookings');
const doctorModel = require('../../models/doctorModel');

module.exports.getAppointments = async (req,res)=>{
    try {
        const {select,project,limit,skip} = req.body;
        const appointments = await appointmentBookingModel.find({
            ...select,
            patientId:req.user._id
        },project).limit(limit??20).skip(skip??0);
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
        const appointment = await appointmentBookingModel.create({
            patientId:req.user._id,
            date:req.body.date,
            timeSlot:{
                startTime:req.body.startTime,
                endTime:req.body.endTime,
            },
            healthConcern:req.body.healthConcern,
            doctorId:req.body.doctorId,
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