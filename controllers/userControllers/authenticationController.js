const {Patient,OTP,Cart} = require('../../models');
const {PatientService} = require('../../services/patient');
const UserResponse = require('../../helpers/userResponse');

const axios = require("axios");
const otpGenerator = require("otp-generator");
const moment = require("moment");


module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const patient = await PatientService.getPatientUsingEmail(email);
        if (patient) {
            if (PatientService.verifyPassword(password, patient.password)) {
                const token = PatientService.generateToken(patient);
                UserResponse(res).status(200).json({
                    message: "Login Successful",
                    data: {
                        user: patient,
                        token: token
                    }
                });
            } else {
                UserResponse(res).status(401).json({
                    status: 401,
                    message: "Password incorrect",
                });
            }
        } else {
            UserResponse(res).status(401).json({
                status: 401,
                message: "User with this email doesn't exits",
            });
        }
    } catch (error) {
        console.log(error);
        UserResponse(res).error(error);
    }
}

module.exports.signup = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const patient = await PatientService.getPatientUsingEmail(email);
        if (patient) {
            res.status(200).json({
                status: 200,
                message: "User with this email already exists",
            });
        } else {
            const names = name.split(' ');
            const firstName = names.shift();
            const lastName = names.join(' ');

           const newPatient = await PatientService.createPatient({
               first_name:firstName,
               last_name:lastName,
               email:email,
               password:password
            });
            newPatient.password = undefined;
            UserResponse(res).status(201).json({
                message: "Signup Successful",
                data:{
                    patient:newPatient,
                    token:PatientService.generateToken(newPatient)
                }
            });
        }
    } catch (error) {
        console.log(error);
        UserResponse(res).error(error);
    }
}


module.exports.isUserExitWithMobileNumber = async (req, res) => {
    try {
        const { mobileNumber } = req.body;
        const patient = await PatientService.getPatientUsingNumber(mobileNumber);
        if (patient) {
            UserResponse(res).status(200).json({
                message: "User with this mobile number already exists",
                data: true
            });
        } else {
            UserResponse(res).status(200).json({
                message: "User with this mobile number doesn't exits",
                data: false
            });
        }
    } catch (error) {
        console.log(error);
        UserResponse(res).error(error);
    }
}

module.exports.userLoginUsingOTP = async (req, res) => {
    try {
        const { mobileNumber } = req.body;
        const patient = await PatientService.getPatientUsingNumber(mobileNumber);
        if (patient) {
            UserResponse(res).status(200).json({
                message: "Login Successful",
                data: {
                    user: patient,
                    token: PatientService.generateToken(patient)
                }
            });
        } else {
            UserResponse(res).status(401).json({
                message: "User with this mobile number doesn't exits",
            });
        }
    } catch (error) {
        console.log(error.message);
        UserResponse(res).error(error);
    }
}

module.exports.userSignupUsingOTP = async (req, res) => {
    try {
        const { mobileNumber, name } = req.body;
        const names = name.split(' ');
        const firstName = names.shift();
        const lastName = names.join(' ');
        
        const newPatient = await PatientService.createPatient({
            first_name:firstName,
            last_name:lastName,
            mobileNumber:mobileNumber
        });

        UserResponse(res).status(201).json({
            message: "Signup Successful",
            data: {
                user: newPatient,
                token: PatientService.generateToken(newPatient)
            }
        });
    } catch (error) {
        console.log(error.message);
        UserResponse(res).error(error);
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
        UserResponse(res).error(error);
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
        UserResponse(res).error(error);
    }
}

async function sendOTP(mobileNumber, res) {
    const otp = otpGenerator.generate(process.env.OTPLENGTH, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false, digits: true });
    let messageBody = `Your One Time Password (OTP) for Siluras login is ${otp} PERIPHERALS THE BRANDS PARK`;
    let url = `http://sms.messageindia.in/v2/sendSMS?username=siluras&message=${messageBody}&sendername=${process.env.SMS_SENDER_NAME}&smstype=TRANS&numbers=${mobileNumber}&apikey=${process.env.SMS_API_KEY}&peid=${process.env.SMS_ENTITY_ID}&templateid=${process.env.SMS_TEMPLATE_ID}`;
    const response = await axios.get(url);
    if (response.status == 200 && response.data[0].msg == "successfully submitted") {
        await OTP.create({
            otp: otp,
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
        const isExist = await PatientService.getPatientUsingEmail(req.body.email);
        if(isExist)
        {
            UserResponse(res).status(200).json({
                message: "Login Successful",
                data: {
                    user: isExist,
                    token: PatientService.generateToken(isExist)
                }
            });
        }else{
            const names = req.body.name.split(' ');
            const newPatient = await PatientService.createPatient({
                first_name:names.splice(0,1).pop(),
                last_name:names.join(' '),
                email:req.body.email,
                googleId:req.body.googleId,
                firebaseToken:req.body.firebaseToken
            });
            
            UserResponse(res).status(201).json({
                message: "Signup Successful",
                data: {
                    user: newPatient,
                    token: PatientService.generateToken(newPatient)
                }
            });
        }
    } catch (error) {
        console.log(error);
        UserResponse(res).error(error);
    }
}

module.exports.facebookLogin = async (req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        UserResponse(res).error(error);
    }
}