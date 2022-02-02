const advertisementModel = require('../../models/advertisementModel'); 
const categoryModel = require('../../models/storeCategoryModel'); 

module.exports.getAdvertisements = async (req,res) => {
    try {
        const advertisements = advertisementModel.find(select,project).skip(skip).limit(limit);
        res.status(200).json({
            status:200,
            message:"Advertisements fetched successfully",
            data:advertisements,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        })
    }
}
module.exports.createAdvertisement = async (req,res) => {
    try {
        const advertisement = await advertisementModel.create({
            image_url:req.body.image_url,
        });
        res.status(201).json({
            status:201,
            message:"Advertisement created successfully",
            data:advertisement,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        })
    }
}


module.exports.updateAdvertisement = async (req,res) => {
    try {
        const advertisement = await advertisementModel.findByIdAndUpdate(req.params.advertisementId,{
            imagePath:req.body.imagePath,
        });
        res.status(200).json({
            status:200,
            message:"Advertisement updated successfully",
            data:advertisement,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        })
    }
}

module.exports.deleteAdvertisement = async (req,res) => {
    try {
        const advertisement = await advertisementModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status:200,
            message:"Advertisement deleted successfully",
            data:advertisement,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        })
    }
}