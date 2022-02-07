const doctorModel = require('../../models/doctorModel');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports.login = async (req,res)=>{
    try {
        const { email,password } = req.body;
        const admin = await doctorModel.findOne({email:email});
        if(admin){
            if(bcrypt.compareSync(password, admin['password'])){
                admin.password = undefined;
                admin.updatedAt = undefined;
                admin.__v = undefined;
                const token = jsonwebtoken.sign(admin.toObject(),
                'Hello world',
                {
                    expiresIn: 60 * 60 * 24
                });
                res.status(200).json({
                    status:200,
                    message:"Admin login Successful",
                    data:{
                        user:admin,
                        token:token
                    }
                });
            }else{
                res.status(200).json({
                    status:200,
                    message:"Password incorrect",
                });
            }
        }else{
            res.status(200).json({
                status:200,
                message:"Admin with this email doesn't exits",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
            data:null
        });
    }
}

module.exports.signup = async (req,res)=>{
    try {
        const {email,password,name} = req.body;
        const admin = await doctorModel.findOne({email:email});
        if(admin){
            res.status(200).json({
                status:200,
                message:"User with this email already exists",
            });
        }else{
            const names = name.split(' ');
            const firstName = names.shift();
            const lastName = names.join(' ');

            var salt = await bcrypt.genSalt();
            var encryptedPassword = await bcrypt.hash(password, salt);

            const newAdmin = new adminModel({
                email:email,
                password:encryptedPassword,
                first_name:firstName,
                last_name:lastName
            });
            await newAdmin.save();
            
            res.status(200).json({
                status:200,
                message:"Admin signup Successful",
                data:newAdmin
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message
        });
    }
}

module.exports.signupUsingMobileNumber = async (req,res)=>{
    try {
        const {mobileNumber,fullName} = req.body;
        const doctor = await doctorModel.findOne({mobile_number:mobileNumber});
        if(doctor){
            const names = fullName.split(' ');
            const firstName = names.shift();
            const lastName = names.join(' ');
            const newDoctor = await doctorModel.create({
                mobileNumber:mobileNumber,
                first_name:firstName,
                last_name:lastName
            });
            res.status(201).json({
                status:201,
                message:"Doctor signup Successful",
                data:newDoctor
            });
        }else{
            res.status(200).json({
                status:200,
                message:"Doctor with this mobile number already exists",
                data:null
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message
        });
    }
}

module.exports.loginUsingMobileNumber = async (req,res)=>{
    try {
        const doctor = await doctorModel.findOne({mobile_number:req.body.mobileNumber});
        if(doctor){
            doctor.password = undefined;
            doctor.updatedAt = undefined;
            doctor.__v = undefined;
            const token = jsonwebtoken.sign(doctor.toObject(),
            'Hello world',
            {
                expiresIn: 60 * 60 * 24
            });
            res.status(200).json({
                status:200,
                message:"Doctor login Successful",
                data:{
                    user:doctor,
                    token:token
                }
            });
        }else{
            res.status(200).json({
                status:200,
                message:"Doctor with this mobile number doesn't exists",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message
        });
    }
}