const notificationModel = require('../../models/notificationModel');
const patientModel = require('../../models/patientModel');
const prescriptionModel = require('../../models/prescriptionModel');
const testsModel = require('../../models/testsModel');
const contactUsModel = require('../../models/contactUsModel');
const medicalRecordModel = require('../../models/medicalRecordModel');
const bookingModel = require('../../models/appointmentBookings');

module.exports.getNotifications = async (req,res) =>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        })
    }
}

module.exports.getVisits = async (req,res) =>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}
module.exports.getUser = async (req,res) =>{
    try{
        const user = await patientModel.findById(req.user._id,{password:0,__v:0});
        const visits = await bookingModel.find({patientId:req.user._id}).populate('doctorId').populate('patientId').populate('healthConcernId');
        const prescriptions = await prescriptionModel.find({patientId:req.user._id});
        const tests = await testsModel.find({patientId:req.user._id});
        const data = {
            ...user.toObject(),
            visits:visits,
            tests:tests,
            prescriptions:prescriptions,
        }
        res.status(200).json({
            status:200,
            message:"User fetched successfully",
            data:data
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}
module.exports.updateUser = async (req,res) =>{
    try {
        const user = await patientModel.findByIdAndUpdate(req.user._id,{
            first_name:req.body.firstName,
            last_name:req.body.lastName,
            email:req.body.email,
            profilePicture:req.body.profilePicture,
            gender:req.body.gender,
            dob:req.body.dob,
            height:req.body.height,
            weight:req.body.weight,
            bloodGroup:req.body.bloodGroup,
            maritalStatus:req.body.maritalStatus
        });
        res.status(201).json({
            status:200,
            message:"Contact us message sent successfully",
            data:user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}
module.exports.contactUs = async (req,res) =>{
    try {
        const contactUs = await contactUsModel.create({
            name:req.body.name,
            number:req.body.number,
            email:req.body.email,
            message:req.body.message,
        });
        res.status(201).json({
            status:201,
            message:"Contact us message sent successfully",
            data:contactUs
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}

module.exports.uploadMedicalRecord = async (req,res)=>{
    try {
        const medicalRecord = await medicalRecordModel.create({
            patientId:req.user._id,
            fileName:req.file.originalname,
            medicalRecordURL:req.file.location,
            fileType:req.file.contentType,
            fileSize:req.file.size
        });
        res.status(201).json({
            status:201,
            message:"Medical record uploaded successfully",
            data:medicalRecord
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}

module.exports.getMedialRecords = async (req,res)=>{
    try {
        const {select,project,skip,limit} = req.body;
        const medicalRecords = await medicalRecordModel.find({
            ...select,
            patientId:req.user._id
        },project).skip(skip??0).limit(limit??20);
        res.status(200).json({
            status:200,
            message:"Medical records fetched successfully",
            data:medicalRecords
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}