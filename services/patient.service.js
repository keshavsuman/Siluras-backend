const {Patient, Cart}  = require('../models');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');


/**
 * @description Create a patient
 * @param {any} param0 
 * @returns {Promise<Patient>}
 * @author keshav suman
 */
async function createPatient({
    first_name,
    last_name,
    email,
    password=process.env.SECRET,
    mobileNumber,
    profilePicture,
    firebaseId,
    firebase_token,
    }){
    const patient = await Patient.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: await hashPassword(password),
        profilePicture: profilePicture,
        mobileNumber:mobileNumber,
        firebaseId: firebaseId,
        firebase_token: firebase_token,
    });
    await initializePatient(patient);
    return patient;
}

/**
 * @description get the patient by email address
 * @param {String} email 
 * @returns {Promise<Patient>}
 * @author keshav suman
 */
async function getPatientUsingEmail(email){
    return await Patient.findOne({email:email});
}

/**
 * @description get the patient using mobile Number
 * @param {String} mobileNumber 
 * @returns {Promise<Patient>}
 * @author keshav suman
 */
async function getPatientUsingNumber(mobileNumber){
    return await Patient.findOne({'mobileNumber':mobileNumber});
}

/**
 * @description get the patient using the Id
 * @param {String} id 
 * @returns {Promise<String>}
 * @author keshav suman
 */
async function getPatientUsingId(id){
    return await Patient.findById(id);
}
/**
 * @description initialize the patient with the default cart
 * @param {Patient} patient 
 * @returns {Promise<Cart>}
 * @author keshav suman
 */
async function initializePatient(patient){
    await Cart.create({
        patientId: patient._id,
        products: [],
        totalPrice: 0
    });
}

/**
 * @description Generates the token for the given patient
 * @param {*} patient 
 * @returns 
 * @author keshav suman
 */
function generateToken(patient){
    return jsonwebtoken.sign(patient.toObject(),
        process.env.SECRET,
        {
            expiresIn: 60 * 60 * 24 * 30 * 365
    });
}

/**
 * @description Generate the hash for the given password
 * @param {*} password 
 * @returns 
 * @author keshav suman
 */
async function hashPassword(password){
    var salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}

/**
 * @description Compare the given password with the hash
 * @param {*} password 
 * @param {*} passwordToVerify 
 * @returns {Boolean}
 * @author keshav suman
 */
function verifyPassword(password,passwordToVerify){
    return bcrypt.compareSync(password, passwordToVerify);
}

module.exports = {
    initializePatient,
    generateToken,
    getPatientUsingEmail,
    getPatientUsingNumber,
    getPatientUsingId,
    verifyPassword,
    createPatient
}