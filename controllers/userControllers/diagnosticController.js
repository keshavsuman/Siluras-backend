const DiagnosticsCenterModel = require('../../models/diagnostics/diagnosticsCenterModel');
const DiagnosticsTestsModel = require('../../models/diagnostics/diagnosticTests');

module.exports.getNearByDiagnostics = async (req,res)=>{
    try {
        const {select,project,limit,skip} = req.body;
        const diagnosticsCenters = await DiagnosticsCenterModel.find(select,project).limit(limit??20).skip(skip??0);
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
        const {select,project,limit,skip} = req.body;
        const diagnosticsTests = await DiagnosticsTestsModel.find(select,project).limit(limit??20).skip(skip??0);
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