const AdminResponse = require('../../helpers/adminResponse');
const {WelcomeImage} = require('../../models');

const getWelcomeImage = async  (req,res)=>{
    try {
        const welcomeImage = await WelcomeImage.findOne();
        AdminResponse(res).status(200).json({
            data:welcomeImage,
            message:"Welcome image fetched successfully"
        });        
    } catch (error) {
        AdminResponse(res).error(error);
    }
}

const createWelcomeImage  = async (req,res)=>{
    try {
        const welcomeImage = await WelcomeImage.create({
            image:req.body.imageURL
        });
        AdminResponse(res).status(201).json({
            data:welcomeImage,
            message:"Welcome image created successfully"
        });        
    } catch (error) {
        AdminResponse(res).error(error);
    }
}

const deleteWelcomeImage = async (req,res)=>{
    try {
        await WelcomeImage.deleteMany({});
    } catch (error) {
        AdminResponse(res).error(error); 
    }
}
module.exports ={
    getWelcomeImage,
    createWelcomeImage,
    deleteWelcomeImage
}