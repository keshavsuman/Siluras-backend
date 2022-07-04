const {HealthConcern} = require('../models');

/**
 * @descritpion this function returns the health concerns
 * @param {String} page
 * @param {String} limit
 * @return {Promise<Array<HealthConcern>>}
 * @author Keshav suman
 */
module.exports.getHealthConcerns = async (page, limit) => {
    const project = {
        _id:0,
        id:"$_id",
        name:1,
        description:1,
        image:1
    };
    const healthConcerns = await HealthConcern.find({},project).skip((page-1)*limit).limit(limit);
    return healthConcerns;
}

/**
 * @description get Health concerns by id
 * @param {String} id
 * @return {Promise<HealthConcern>}
 * @author Keshav suman
 */
module.exports.getHealthConcernById = async (id) => {
    const healthConcern = await HealthConcern.findById(id);
    if(healthConcern){
        return healthConcern;
    }else{
        throw new Error('Health concern not found');
    }
}

/**
 * @description this function will create the health concern
 * @param {String} name
 * @param {String} description
 * @param {String} image
 * @return {Promise<HealthConcern>}
 * @author Keshav suman
 */
module.exports.createHealthConcern = async (name, description, image) => {
    const healthConcern = await HealthConcern.create({
        name,
        description,
        image
    });
    return healthConcern;
}

/**
 * @description this function will update the health concern
 * @param {String} id
 * @param {String} name
 * @param {String} description
 * @param {String} image
 * @return {Promise<HealthConcern>}
 * @author Keshav suman
 * 
 */
module.exports.updateHealthConcern = async (id, name, description, image) => {
    const healthConcern = await HealthConcern.findByIdAndUpdate(id, {
        name,
        description,
        image
    });
    if(healthConcern){
        return healthConcern;
    }else{
        throw new Error('Health concern not found');
    }
}

/**
 * @description this function will delete the health concern
 * @param {String} id
 * @return {Promise<HealthConcern>}
 * @author Keshav suman
 */
module.exports.deleteHealthConcern = async (id) => {
    const healthConcern = await HealthConcern.findByIdAndDelete(id);
    if(healthConcern){
        return healthConcern;
    }else{
        throw new Error('Health concern not found');
    }
}