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
    const project = {};
    const diagnosticCenters = await DiagnosticCenter.aggregate([
        {
            $match: {
                $regex:{name:search,$options:'i'},
            }
        }
    ]);
}