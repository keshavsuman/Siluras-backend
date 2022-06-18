const {Doctor} =require('../models');

/**
 * @Description Get the doctor by doctor id
 * @param {String} id - doctor id
 * @returns {Doctor} doctor object
 * @author Keshav suman
 */
module.exports.getDoctorById = async (id)=>{
    return await Doctor.findById(id,{
        first_name:1,
        last_name:1,
        email:1,
        mobile_number:1,
        gender:1,
        blood_group:1,
        marital_status:1,
        password:1,
        about:1,
        dob:1,
        speciality:1,
        id:'$_id',
        _id:0
    });
}

/**
 * @Description Get the doctor by doctor email address
 * @param {String} id - email address
 * @returns {Object} doctor object
 * @author Keshav suman
 */
 module.exports.getDoctorByEmail = async (email)=>{
    return await Doctor.findOne({email},{
        first_name:1,
        last_name:1,
        email:1,
        mobile_number:1,
        gender:1,
        blood_group:1,
        marital_status:1,
        password:1,
        about:1,
        dob:1,
        speciality:1,
        id:'$_id',
        _id:0
    });
}