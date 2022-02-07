const doctorModel  = require("../../models/doctorModel");
const notificationModel = require("../../models/notificationModel");
module.exports.getDoctor = async (req,res)=>{
    try {
        const doctor = await doctorModel.findById(req.user._id);
        res.status(200).json({
            status:200,
            message:"Doctor fetched successfully",
            data:doctor
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}

module.exports.getNotifications = async (req,res)=>{
    try {
        const notifications = await notificationModel.find({user_id:req.user._id});
        res.status(200).json({
            status:200,
            message:"Notifications fetched successfully",
            data:notifications
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}