const AdminResponse = require("../../helpers/adminResponse")
const {HealthCareService,HealthCareRequest} = require('../../models');

module.exports.createService = async (req,res)=>{
    try {
        const healthCareService = await HealthCareService.create({
            title:req.body.title,
            icon:req.body.icon
        });
        AdminResponse(res).status(201).json({
            message:"Health care service created successfully",
            data:healthCareService
        });
    } catch (error) {
        AdminResponse(res).error(error);
    }
}

module.exports.getServices = async (req,res)=>{
    try {
        const healthCareService = await HealthCareService.find({});
        AdminResponse(res).status(200).json({
            message:"Healthcare service fetched successfully",
            data:healthCareService
        });
    } catch (error) {
        AdminResponse(res).error(error);
    }
}

module.exports.updateService = async (req,res)=>{
    try {
        const healthCareService = await HealthCareService.findByIdAndUpdate(req.params.id,{
            title:req.body.title,
            icon:req.body.icon
        });
        AdminResponse(res).status(200).json({
            message:"Healthcare service updated successfully",
            data:healthCareService
        });
    } catch (error) {
        AdminResponse(res).error(error);
    }
}

module.exports.deleteService = async (req,res)=>{
    try {
        const healthCareService = await HealthCareService.findByIdAndDelete(req.params.id);
        AdminResponse(res).status(200).json({
            message:"Healthcare service deleted successfully",
            data:healthCareService
        });
    } catch (error) {
        console.log(error);
        AdminResponse(res).error(error);
    }
}


// Request functions
module.exports.getHealthCareRequest = async (req,res)=>{
  try {
      const healthCareRequests = await HealthCareRequest.find({});
      AdminResponse(res).status(200).json({
          data:healthCareRequests,
          message:"HealtCare requests fetched successfully"
      });
  } catch (error) {
      console.log(error);
      AdminResponse(error);
  }  
}

module.exports.createHealthCareRequest = async (req,res)=>{
    try {
        const {name,email,mobileNumber,city,service} = req.body;
        const healthCareRequest = await HealthCareRequest.create({
            name:name,
            city:city,
            service:service,
            email:email,
            mobileNumber:mobileNumber
        });
        AdminResponse(res).status(200).json({
            data:healthCareRequest,
            message:"Healthcare request created successully"
        });
    } catch (error) {
        console.log(error);
        AdminResponse(error);
    }  
  }

module.exports.deleteHealthCareRequests = async (req,res)=>{
    try {
        const healthCareRequests = await HealthCareRequest.findByIdAndDelete(req.params.id);
        AdminResponse(res).status(200).json({
            data:healthCareRequests,
            message:"Healtcare requests deleted successfully"
        });
    } catch (error) {
        console.log(error);
        AdminResponse(error);
    }  
}

module.exports.updateHealthCareRequest = async (req,res)=>{
    try {
        const {name,email,mobileNumber,city,service} = req.body;
        const healthCareRequests = await HealthCareRequest.findByIdAndUpdate(req.params.id,{
            name:name,
            city:city,
            service:service,
            email:email,
            mobileNumber:mobileNumber
        });
        AdminResponse(res).json(200).json({
            data:healthCareRequests,
            message:"Healthcare requests updated successfully"
        });
    } catch (error) {
        console.log(error);
        AdminResponse(error);
    }  
}