const AdminResponse = require('../../helpers/adminResponse');
const {SpotlightService} = require('../../services');

module.exports.createSpotlight = async (req,res) =>{
    const {imageURL} = req.body;
    const spotlight = await SpotlightService.createSpotlight(imageURL);
    AdminResponse(res).status(200).json({
        message:"Spotlight created successfully",
        data:spotlight
    });
}

module.exports.deleteSpotlight = async (req,res) =>{
    const {id} = req.params;
    const spotlight = await SpotlightService.deleteSpotlight(id);
    AdminResponse(res).status(200).json({
        message:"Spotlight deleted successfully",
        data:spotlight
    });
}