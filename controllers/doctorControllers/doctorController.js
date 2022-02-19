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
        const {select,project,skip,limit} = req.body;
        const notifications = await notificationModel.find(
            {   
                ...select,
                user_id:req.user._id
            },
            project
            ).skip(0).limit(20);
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

module.exports.updateDoctor = async (req,res) => {
    try {
        const doctor = await doctorModel.findByIdAndUpdate(req.user._id,{
            first_name:req.body.first_name,
            last_name:req.body.last_name,                   
            email:req.body.email,
            mobileNumber:req.body.mobileNumber,
            gender:req.body.gender,
            about:req.body.bio,
            marital_status:req.body.marital_status,
            blood_group:req.body.blood_group,
            dob:req.body.dob,
            profilePicture:req.body.profilePicture
        },{new:true});
        console.log(doctor);
        res.status(200).json({
            status:200,
            message:"Doctor updated successfully",
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

module.exports.updateFirebaseToken = async (req,res) =>{
    try {
        const doctor = await doctorModel.findByIdAndUpdate(req.user._id,{
            firebase_token:req.body.firebase_token
        },{
            new:true
        });
        res.stastu(200).json({
            status:200,
            message:"Firebase Token updated successfully",
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