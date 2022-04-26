const doctorModel = require('../../models/doctorModel');
const bcrypt = require('bcryptjs');

module.exports.getDoctors = async (req,res)=>{
    try {
        const {select,project,limit,skip} = req.body;
        const doctors = await doctorModel.find(select,project).skip(skip??0).limit(limit??20);
        res.status(200).json({
            status:200,
            message:"Dotors fetched successfully",
            data:doctors
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}

module.exports.addDoctor = async (req,res)=>{
    try {
        const {first_name,last_name,email,password,about,speciality,profilePicture} = req.body;
        const doctor = await doctorModel.findOne({email:email});
        if(doctor){
            res.status(200).json({
                status:200,
                message:"Doctor with this mail already exits"
            });
        }else{

            // var salt = await bcrypt.genSalt();
            // var encryptedPassword = await bcrypt.hash(password, salt);
            
            const doctor = await doctorModel.create({
                first_name:first_name,
                last_name:last_name,
                email:email,
                // password:encryptedPassword,
                mobileNumber:req.body.mobileNumber,
                about:about,
                speciality:speciality,
                profilePicture:profilePicture
            });
            res.status(201).json({
                status:201,
                message:"Doctor added successfully",
                data:doctor
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}

module.exports.updateDoctor = async (req,res)=>{
    try {
        const {first_name,last_name,email,about,speciality,profilePicture} = req.body;
        

        const doctor = await doctorModel.findByIdAndUpdate(req.params.id,{
            first_name:first_name,
            last_name:last_name,
            email:email,
            about:about,
            speciality:speciality,
            profilePicture:profilePicture
        },{new:true});
        res.status(200).json({
            status:200,
            message:"Doctor added successfully",
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
