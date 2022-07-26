const {Spotlight} = require('../models');

/**
 * @description creates a spotlight image
 * @param {String} imageURL
 * @author Keshav suman
 * 
 */
async function createSpotlight(imageURL) {
    const spotlight = await Spotlight.create({
        'image':imageURL
    });
    return spotlight;
}

/**
 * @description deletes the spotlight image
 * @param {ObjectId} id
 * @author Keshav suman
 * 
 */

async function deleteSpotlight(id) {
    const spotlight = await Spotlight.findByIdAndDelete(id);
    return spotlight;
}

module.exports = {
    createSpotlight,
    deleteSpotlight,
}