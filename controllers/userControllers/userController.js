const notificationModel = require('../../models/notificationModel');
const visitModel = require('../../models/visitsModel');
const patientModel = require('../../models/patientModel');
const prescriptionModel = require('../../models/prescriptionModel');
const testsModel = require('../../models/testsModel');

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
        const user = await patientModel.findById(req.user._id);
        const visits = await visitModel.find({patientId:req.user._id}).populate('doctorId');
        const prescriptions = await prescriptionModel.find({patientId:req.user._id});
        const tests = await testsModel.find({patientId:req.user._id});
        console.log(user);
        const data = {
            ...user,
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