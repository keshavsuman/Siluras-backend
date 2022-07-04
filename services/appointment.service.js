const {Appointment} = require('../models');

/**
 * @description this function returns the appointments
 * @param {String} page
 * @param {String} limit
 * @return {Promise<Array<Appointment>>}
 * @author Keshav suman
 */
module.exports.getAppointments = async (page, limit) => {
    const project = {
        _id:0,
        id:"$_id",
    };
    const appointments = await Appointment.find({},project).skip((page-1)*limit).limit(limit);
    return appointments;
}

/**
 * @description this function returns the appointment by id
 * @param {String} id
 * @return {Promise<Appointment>}
 * @author Keshav suman
 */
module.exports.getAppointmentById = async (id) => {
    const appointment = await Appointment.findById(id);
    if(appointment){
        return appointment;
    }else{
        throw new Error('Appointment not found');
    }
}

/**
 * @description this function will create the appointment
 * @param {String} patientId
 * @param {String} doctorId
 * @param {String} date
 * @param {String} time
 * @return {Promise<Appointment>}
 * @author Keshav suman
 * @throws {Error}
 * 
 */
module.exports.createAppointment = async (patientId, doctorId, date, time,healthConcernId) => {
    const appointment = await Appointment.create({
        patientId,
        doctorId,
        date,
        time,
        healthConcernId
    });
    return appointment;
}

/**
 * @description this function will update the appointment
 * @param {String} id
 * @param {String} patientId
 * @param {String} doctorId
 * @param {String} date
 * @param {String} time
 * @return {Promise<Appointment>}
 * @author Keshav suman
 * @throws {Error}
 */
module.exports.updateAppointment = async (id, patientId, doctorId, date, time,healthConcernId) => {
    const appointment = await Appointment.findByIdAndUpdate(id, {
        patientId,
        doctorId,
        date,
        time,
        healthConcernId
    });
    if(appointment){
        return appointment;
    }else{
        throw new Error('Appointment not found');
    }
}
