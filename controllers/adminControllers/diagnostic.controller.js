const AdminResponse = require('../../helpers/adminResponse');
const DiagnosticsCenterModel = require('../../models/diagnostics/diagnosticsCenterModel');
const DiagnosticsTestsModel = require('../../models/diagnostics/diagnosticTests');
const {DiagnosticService} = require('../../services');

module.exports.createDiagnosticCenter = async (req,res)=>{
    try {
        const diagnosticCenter = await DiagnosticsCenterModel.create({
            name:req.body.name,
            address:req.body.address,
            image_url:req.body.image_url,
            mobile:req.body.mobileNumber,
            email:req.body.email,
        });
        res.status(201).json({
            status:201,
            message:'Diagnostic center Created Successfully',
            data:diagnosticCenter
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message
        });
    }
}

module.exports.createTest = async (req,res)=>{
    try {
        const diagnosticTest = await DiagnosticsTestsModel.create({
            diagnosticCenterId:req.params.id,
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            image_url:req.body.image_url
        });
        res.status(201).json({
            status:201,
            message:'Diagnostic Test Created Successfully',
            data:diagnosticTest
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message
        });
    }
}

module.exports.getDiagnosticCenters = async (req,res)=>{
    try{
        const {page,limit,search,latitude,longitude} = req.query;
        const diagnosticCenters = await DiagnosticService.getDiagnostics(search,page,limit,latitude,longitude);
        AdminResponse(res).status(200).json({
            message:"Diagnostic centers retrived successfully",
            data:diagnosticCenters
        });

    }catch(error){
        console.log(error);
        AdminResponse(res).error(error.message);
    }
}

module.exports.getDiagnosticCenter = async (req,res)=>{
    try{
        const diagnosticCenter = await DiagnosticService.getDiagnosticCenterById(req.params.id);
        AdminResponse(res).status(200).json({
            message:"Diagnostic center retrived successfully",
            data:diagnosticCenter
        });
    }catch(error){
        console.log(error);
        AdminResponse(res).error(error.message);
    }
}