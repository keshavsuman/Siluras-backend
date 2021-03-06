const adminModel = require('../../models/adminModel');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


module.exports.login = async (req,res)=>{
    try {
        const { email,password } = req.body;
        const admin = await adminModel.findOne({email:email});
        if(admin){
            if(bcrypt.compareSync(password, admin['password'])){
                admin.password = undefined;
                admin.updatedAt = undefined;
                admin.__v = undefined;
                const token = jsonwebtoken.sign(admin.toObject(),
                process.env.SECRET,
                );
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
        const admin = await adminModel.findOne({email:email});
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
