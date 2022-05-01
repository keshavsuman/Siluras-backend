const UserResponse = require('../../helpers/UserResponse');
const {HealthCareServie,HealthCareRequest} = require('../../models');

module.exports.createHealthCare = async (req,res) => {
    const {name,email,city, service,mobileNumber} = req.body;
    const healthCare = await HealthCareRequest.create({
        name:name,
        email:email,
        city:city,
        service:service,
        mobileNumber:mobileNumber
    });
    UserResponse(res).status(200).json({
        message:"HealthCare created successfully",
        data:healthCare
    });
}

module.exports.fetchServices = async (req,res) => {
    try{
        const services = await HealthCareServie.find({});
        UserResponse(res).status(200).json({
            message:"services fetched successfully",
            data:services
        });
    }catch(error){
        console.log(error);
        UserResponse(res).error(error);
    }
}