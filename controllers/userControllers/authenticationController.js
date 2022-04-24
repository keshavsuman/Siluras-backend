const jsonwebtoken = require('jsonwebtoken');
const {Doctor,Patient,OTP,Cart} = require('../../models');

const bcrypt = require('bcryptjs');
const axios = require("axios");
const otpGenerator = require("otp-generator");
const moment = require("moment");


module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const patient = await Patient.findOne({ email: email });
        if (patient) {
            if (bcrypt.compareSync(password, patient['password'])) {
                const token = jsonwebtoken.sign(patient.toObject(),
                    'Hello world',
                );
                res.status(200).json({
                    status: 200,
                    message: "Login Successful",
                    data: {
                        user: patient,
                        token: token
                    }
                });
            } else {
                res.status(401).json({
                    status: 401,
                    message: "Password incorrect",
                });
            }
        } else {
            res.status(401).json({
                status: 401,
                message: "User with this email doesn't exits",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
}

module.exports.signup = async (req, res) => {
    try {
        const { email, password, name, mobileNumber } = req.body;
        const patient = await Patient.findOne({ email: email });
        if (patient) {
            res.status(200).json({
                status: 200,
                message: "User with this email already exists",
            });
        } else {
            const names = name.split(' ');
            const firstName = names.shift();
            const lastName = names.join(' ');

            var salt = await bcrypt.genSalt();
            var encryptedPassword = await bcrypt.hash(password, salt);

            const newPatient = new Patient({
                email: email,
                password: encryptedPassword,
                first_name: firstName,
                last_name: lastName
            });
            await newPatient.save();
            await Cart.create({
                patientId: newPatient._id,
                products: [],
                totalPrice: 0
            })
            res.status(200).json({
                status: 200,
                message: "Signup Successful",
                // data:newPatient
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
}


module.exports.isUserExitWithMobileNumber = async (req, res) => {
    try {
        const { mobileNumber } = req.body;
        const patient = await Patient.findOne({ mobileNumber: mobileNumber });
        if (patient) {
            res.status(200).json({
                status: 200,
                message: "User with this mobile number already exists",
                data: true
            });
        } else {
            res.status(200).json({
                status: 200,
                message: "User with this mobile number doesn't exits",
                data: false
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
}

module.exports.userLoginUsingOTP = async (req, res) => {
    try {
        const { mobileNumber } = req.body;
        const patient = await Patient.findOne({ mobileNumber: mobileNumber });
        if (patient) {
            const token = jsonwebtoken.sign(patient.toObject(),
                'Hello world',
            );

            res.status(200).json({
                status: 200,
                message: "Login Successful",
                data: {
                    user: patient,
                    token: token
                }
            });
        } else {
            res.status(401).json({
                status: 401,
                message: "User with this mobile number doesn't exits",
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

module.exports.userSignupUsingOTP = async (req, res) => {
    try {
        const { mobileNumber, name, firebaseId } = req.body;
        const names = name.split(' ');
        const firstName = names.shift();
        const lastName = names.join(' ');
        const newPatient = await Patient.create({
            first_name: firstName,
            last_name: lastName,
            mobileNumber: mobileNumber,
            firebaseId: firebaseId
        });
        await Cart.create({
            patientId: newPatient._id,
            products: [],
            totalPrice: 0
        });
        const token = jsonwebtoken.sign(newPatient.toObject(),
            'Hello world',
            {
                expiresIn: 60 * 60 * 24
            });

        res.status(201).json({
            status: 201,
            message: "Signup Successful",
            data: {
                user: newPatient,
                token: token
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
}

module.exports.getOTP = async (req, res) => {
    try {
        var { mobileNumber } = req.body;
        var otps = await OTP.find({ mobileNumber: mobileNumber });
        if (otps.length != 0) {
            const diffrence = moment(moment.now()).diff(moment(otps[0].createdAt));
            const seconds = moment.duration(diffrence).asSeconds();
            if (seconds < 60 * process.env.OTP_EXPIRY_DURATION) {
                res.status(206).json({
                    status: 206,
                    message: "OTP already Sent",
                });
            } else {
                await OTP.findByIdAndDelete(otps[0]._id);
                sendOTP(mobileNumber,res);
            }
        } else {
            sendOTP(mobileNumber,res);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
}

module.exports.verifyOTP = async (req, res) => {
    try {
        const { otp, mobileNumber } = req.body;
        const data = await OTP.find({
            mobileNumber: mobileNumber
        });
        if (data.length > 0) {
            var savedOTP = data[0].otp;
            const diffrence = moment(moment.now()).diff(moment(data[0].createdAt));
            const seconds = moment.duration(diffrence).asSeconds();
            if(seconds > 60 * process.env.OTP_EXPIRY_DURATION)
            {
                await OTP.findByIdAndDelete(data[0]._id);
                res.status(206).json({
                    statu: 206,
                    message: "OTP expired",
                });
            }
            if (otp == savedOTP) {
                res.status(200).json({
                    statu: 200,
                    message: "OTP verified",
                });
            } else {
                res.status(403).json({
                    statu: 403,
                    message: "OTP doesn't match",
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
}

async function sendOTP(mobileNumber, res) {
    const OTP = otpGenerator.generate(process.env.OTPLENGTH, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false, digits: true });
    let messageBody = `Your One Time Password (OTP) for Siluras login is ${OTP} PERIPHERALS THE BRANDS PARK`;
    let url = `http://sms.messageindia.in/v2/sendSMS?username=siluras&message=${messageBody}&sendername=${process.env.SMS_SENDER_NAME}&smstype=TRANS&numbers=${mobileNumber}&apikey=${process.env.SMS_API_KEY}&peid=${process.env.SMS_ENTITY_ID}&templateid=${process.env.SMS_TEMPLATE_ID}`;
    const response = await axios.get(url);
    if (response.status == 200 && response.data[0].msg == "successfully submitted") {
        await OTP.create({
            otp: OTP,
            mobileNumber: mobileNumber
        });
        res.status(200).json({
            status: 200,
            data: true,
            message: "OTP generated",
        });
    } else {
        res.status(400).json({
            status: 400,
            data: false,
            message: "something went wrong"
        })
    }
    return response;
}

module.exports.googleLogin = async (req, res) => {
    try {
        const isExist = await Patient.findOne({ "email":req.body.email });
        if(isExist)
        {
            const token = jsonwebtoken.sign(isExist.toObject(),
                'Hello world',
            );
            res.status(200).json({
                status: 200,
                message: "Login Successful",
                data: {
                    user: isExist,
                    token: token
                }
            });
        }else{
            const names = req.body.name.split(' ');

            const newPatient = await Patient.create({
                first_name: names[0],
                last_name: names.splice(0,1).join(' '),
                email: req.body.email,
                firebaseId: req.body.firebaseId
            });
            await Cart.create({
                patientId: newPatient._id,
                products: [],
                totalPrice: 0
            });
            const token = jsonwebtoken.sign(newPatient.toObject(),
                'Hello world',
                {
                    expiresIn: 60 * 60 * 24
                });
            res.status(201).json({
                status: 201,
                message: "Signup Successful",
                data: {
                    user: newPatient,
                    token: token
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.stataus(500).json({
            status: 500,
            message: error.message,
            data:null
        });
    }
}

module.exports.facebookLogin = async (req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        res.stataus(500).json({
            status: 500,
            message: error.message,
        });
    }
}