const advertisementModel = require('../../models/advertisementModel'); 
const categoryModel = require('../../models/store/categoryModel'); 
const subCategoryModel = require('../../models/store/subCategoryModel');

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

module.exports.getCategories = async (req,res) => {
    try {
        const {select,project,skip,limit} = req.body;
        const categories = await categoryModel.find(select,project).skip(skip).limit(limit);
        res.status(200).json({
            status:200,
            message:"Categories fetched successfully",
            data:categories,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}

module.exports.createCategory = async (req,res) => {
    try {
        const category = await categoryModel.create({
            categoryName:req.body.categoryName,
            image_url:req.body.image_url,
        });
        res.status(201).json({
            status:201,
            message:"Category created successfully",
            data:category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        })
    }
}

module.exports.updateCategory = async (req,res) => {
    try {
        const category = await categoryModel.findByIdAndUpdate(req.params.id,{
            categoryName:req.body.categoryName,
            image_url:req.body.image_url,
        });
        res.status(200).json({
            status:200,
            message:"Category updated successfully",
            data:category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        })
    }
}

module.exports.deleteCategory = async (req,res) => {
    try {
        const category = await categoryModel.findByIdAndDelete(req.params.id);
        await subCategoryModel.deleteMany({categoryId:req.params.id});

        res.status(200).json({
            status:200,
            message:"Category deleted successfully",
            data:category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        })
    }
}

module.exports.getSubCategory = async (req,res) => {
    try {
        const subCategory = await subCategoryModel.find({categoryId:req.params.id});
        res.status(200).json({
            status:200,
            message:"SubCategory fetched successfully",
            data:subCategory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}
module.exports.createSubCategroy = async (req,res) => {
    try {
        const subCategory = await subCategoryModel.create({
            categoryId:req.body.categoryId,
            subCategoryName:req.body.subCategoryName,
            image_url:req.body.image_url,
        });
        res.status(201).json({
            status:201,
            message:"SubCategory created successfully",
            data:subCategory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}

module.exports.updateSubCategory = async (req,res) => {
    try {
        const subCategory = await subCategoryModel.findOneAndUpdate({_id:req.body._id},{
            categoryId:req.body.categoryId,
            subCategoryName:req.body.subCategoryName,
            image_url:req.body.image_url,
        });
        res.status(201).json({
            status:201,
            message:"SubCategory updated successfully",
            data:subCategory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}

module.exports.deleteSubCategory = async (req,res) => {
    try {
        const subCategory = await subCategoryModel.findOneAndDelete({_id:req.body._id});
        res.status(200).json({
            status:200,
            message:"SubCategory deleted successfully",
            data:subCategory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}