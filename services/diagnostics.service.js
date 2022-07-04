const {DiagnosticCenter,DiagnosticTest } = require('../models');

/**
 * @description Get Diagnostic Centers
 * @param {String} search
 * @param {Number} page
 * @param {Number} limit
 * @param {Number} latitude
 * @param {Number} longitude
 * @returns {Promise<Diagnostic[]>}
 * @author Keshav suman
 */

module.exports.getDiagnostics = async (search, page, limit, latitude, longitude) => {
    const diagnosticCenters = await DiagnosticCenter.aggregate([
        {
            $match: {
                $regex:{name:search,$options:'i'},
            },
            $skip:(page-1)*limit,
            $limit:limit,
            $project:{
                _id:1,
                name:1,
                address:1,
                mobile:1,
                email:1,
                image_url:1,
                id:"$_id"
            }
        }
    ]);
    return diagnosticCenters;
}

/**
 * @description This function returns the diagnostic center by id
 * @param {String} id 
 * @returns {Promise<DiagnosticCenter>}
 * @author Keshav suman
 */
module.exports.getDiagnosticCenterById = async (id) => {
    const diagnosticCenter = await DiagnosticCenter.findById(id);
    if(diagnosticCenter){
        return diagnosticCenter;
    }else{
        throw new Error('Diagnostic Center not found');
    }
}

/**
 * @description this function will return the diagnostic centers tests
 * @param {String} search 
 * @param {String} page 
 * @param {String} limit 
 * @param {String} latitude 
 * @param {String} longitude 
 * @returns {Promise<Array<DiagnosticTest>}
 * @author Keshav suman
 */
module.exports.getTests = async (search, page, limit, latitude, longitude) => {
    const project = {};
    const diagnosticTests = await DiagnosticTest.aggregate([

    ]);
    return diagnosticTests;
}

/**
 * @description this function create a diagnostic center
 * @param {String} name
 * @param {String} address
 * @param {String} city
 * @param {String} state
 * @param {String} pincode
 * @param {Number} latitude
 * @param {Number} longitude
 * @retuns {Promise<DiagnosticCenter>}
 * @author Keshav suman
 */
module.exports.createDiagnosticCenter = async (name, address, city, state, pincode, latitude, longitude) => {
    const diagnosticCenter = await DiagnosticCenter.create({
        name: name,
        address: address,
        city: city,
        state: state,
        pincode: pincode,
        latitude: latitude,
        longitude: longitude
    });
    return diagnosticCenter;
}

/**
 * @description this function updates the Diagnostic center by id
 * @param {String} id 
 * @param {Object} updateBody 
 * @returns {Promise<DiagnosticCenter>}
 * @author keshav suman
 */
module.exports.updateDiagnosticCenter = async (id, updateBody) =>{
    const diagnosticCenter = await DiagnosticCenter.findByIdAndUpdate(id, updateBody, {new: true});
    if(diagnosticCenter){
        return diagnosticCenter;
    }else{
        throw new Error('Diagnostic Center not found');
    }
}