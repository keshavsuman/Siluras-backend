const DiagnosticsCenterModel = require('../../models/diagnostics/diagnosticsCenterModel');
const DiagnosticsTestsModel = require('../../models/diagnostics/diagnosticTests');

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