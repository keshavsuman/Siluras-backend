const doctorModel = require('../../models/doctorModel');
const patientModel = require('../../models/patientModel');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cartModel = require('../../models/cartModel');

module.exports.login = async (req,res)=>{
    try {
        const { email,password } = req.body;
        const patient = await patientModel.findOne({email:email});
        if(patient){
            if(bcrypt.compareSync(password, patient['password'])){
                const token = jsonwebtoken.sign(patient.toObject(),
                'Hello world',
                {
                    expiresIn: 60 * 60 * 24
                });

                res.status(200).json({
                    status:200,
                    message:"Login Successful",
                    data:{
                        user:patient,
                        token:token
                    }
                });
            }else{
                res.status(401).json({
                    status:401,
                    message:"Password incorrect",
                });
            }
        }else{
            res.status(401).json({
                status:401,
                message:"User with this email doesn't exits",
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
        const {email,password,name,mobileNumber} = req.body;
        const patient = await patientModel.findOne({email:email});
        if(patient){
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

            const newPatient = new patientModel({
                email:email,
                password:encryptedPassword,
                first_name:firstName,
                last_name:lastName
            });
            await newPatient.save();
            await cartModel.create({
                patientId:newPatient._id,
                products:[],
                totalPrice:0
            })
            res.status(200).json({
                status:200,
                message:"Signup Successful",
                // data:newPatient
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