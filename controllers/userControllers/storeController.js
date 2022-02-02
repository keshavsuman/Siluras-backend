const medicineModel = require('../../models/medicineModel');
const advertisementModel = require('../../models/advertisementModel');
const storeCategoryModel = require('../../models/storeCategoryModel');
const cartModel = require('../../models/cartModel');

module.exports.getCategories = async (req,res) => {
    try {
        const {select,project,skip,limit} = req.body;
        const categories = await storeCategoryModel.find(select,project).skip(skip).limit(limit);
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

module.exports.getAdvertisements = async (req,res) => {
    try {
        const {select,project,skip,limit} = req.body;
        const advertisements = await advertisementModel.find(select,project).skip(skip).limit(limit);
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
        });
    }
}

module.exports.getMedicines = async (req,res) => {
    try {
        const {select,project,skip,limit} = req.body;
        const medicines = await medicineModel.find(select,project).skip(skip).limit(limit);
        res.status(200).json({
            status:200,
            message:"Medicines fetched successfully",
            data:medicines,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}

module.exports.addToCart = async (req,res) => {
    try {
        console.log(req.body);
        const cart = await cartModel.findOneAndUpdate({patientId:req.user._id},{
            $push:{
                products:req.body
            }
        });

        res.status(200).json({
            status:200,
            message:"added to cart",
            data:cart,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}

module.exports.updateQuantity = async (req,res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}

module.exports.removeFromCart = async (req,res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}

module.exports.getCart = async (req,res)=>{
    try {
        const cart = await cartModel.findOne({patientId:req.user._id});
        res.status(200).json({
            status:200,
            message:"Cart fetched successfully",
            data:cart,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}