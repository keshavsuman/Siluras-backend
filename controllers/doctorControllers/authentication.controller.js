const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const doctorModel = require('../../models/doctorModel');
const {doctorService} = require('../../services');

module.exports.login = async (req,res)=>{
    try {
        const { email,password } = req.body;
        const admin = await doctorService.getDoctorByEmail(email);
        if(admin){
            if(bcrypt.compareSync(password, admin['password'])){
                admin.password = undefined;
                admin.updatedAt = undefined;
                admin.__v = undefined;
                const token = jsonwebtoken.sign(admin.toObject(),
                process.env.SECRET,
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
                res.status(400).json({
                    status:400,
                    message:"Password incorrect",
                });
            }
        }else{
            res.status(400).json({
                status:400,
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

            const newDoctor = new doctorModel({
                email:email,
                password:encryptedPassword,
                first_name:firstName,
                last_name:lastName
            });
            await newDoctor.save();
            
            res.status(200).json({
                status:200,
                message:"Doctor signup Successful",
                data:newDoctor
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

module.exports.forgetPassword = async (req,res)=>{}
module.exports.resetPassword = async (req,res)=>{}
