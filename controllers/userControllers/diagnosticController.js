const DiagnosticsCenterModel = require('../../models/diagnostics/diagnosticsCenterModel');
const DiagnosticsTestsModel = require('../../models/diagnostics/diagnosticTests');

module.exports.getNearByDiagnostics = async (req,res)=>{
    try {
        const {longitude,latitude,limit,skip} = req.query;
        const project = {
            _id:0,
            'id':'$_id',
            'name':1,
            'address':1,
            'longitude':1,
            'mobile':1,
            'email':1,
            'image_url':1,
        }
        const diagnosticsCenters = await DiagnosticsCenterModel.find({},project).limit(limit??20).skip(skip??0);
        console.log("Fetching consoles");
        res.status(200).json({
            status:200,
            message:'NearByDiagnostics fetched Successfully',
            data:diagnosticsCenters
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message
        });
    }
}

module.exports.getTests = async (req,res)=>{
    try {
        const {id:diagnosticId} = req.params;
        const {limit,skip} = req.query;
        const project = {
            _id:0,
            'id':'$_id',
             'name':1,   
        }
        const diagnosticsTests = await DiagnosticsTestsModel.find({
            'diagnosticCenterId':diagnosticId
        },project).limit(limit??20).skip(skip??0);
        res.status(200).json({
            status:200,
            message:'Diagnostics tests fetched Successfully',
            data:diagnosticsTests
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message
        });
    }
}