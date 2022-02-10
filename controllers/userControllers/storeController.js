const medicineModel = require('../../models/store/medicineModel');
const advertisementModel = require('../../models/advertisementModel');
const categoryModel = require('../../models/store/categoryModel');
const subCategoryModel = require('../../models/store/subCategoryModel');
const cartModel = require('../../models/store/cartModel');
const razorpay = require('razorpay');

module.exports.getCategories = async (req,res) => {
    try {
        const {select,project,skip,limit} = req.body;
        const categories = await subCategoryModel.aggregate([
            {
              '$group': {
                '_id': '$categoryId', 
                'subCategories': {
                  '$push': '$$ROOT'
                }
              }
            }, {
              '$lookup': {
                'from': 'categories', 
                'localField': '_id', 
                'foreignField': '_id', 
                'as': 'category'
              }
            }, {
              '$addFields': {
                '_id': {
                  '$first': '$category._id'
                }, 
                'categoryName': {
                  '$first': '$category.categoryName'
                }, 
                'image_url': {
                  '$first': '$category.image_url'
                }
              }
            },{
                "$project":{
                    "category":0
                }
            }
          ]);
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
        const cart = await cartModel.findOneAndUpdate({patientId:req.user._id},{
            $push:{
                products:{
                    medicineId:req.body.id,
                    quantity:req.body.quantity,
                }
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
        const data = await cartModel.findOneAndUpdate({patientId:req.user._id},{

        });
        res.status(200).json({
            status:200,
            message:"Cart updated successfully",
            data:data,
        });
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
        const data = await cartModel.findOneAndUpdate({patientId:req.user._id},{
            $pull:{
                products:{
                    medicineId:req.body.medicineId,
                }
            }
        });
        res.status(200).json({
            status:200,
            message:"Remove from Cart successfully",
            data:data,
        });
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
        const cart = await cartModel.findOne({patientId:req.user._id}).populate('products.medicineId');
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
const instance = new razorpay({
    key_id: 'rzp_test_1DPqQZxX8XzX8x',
    key_secret: 'YOUR_KEY_SECRET',
});


module.exports.createOrder = async (req,res)=>{
    try {
        instance.orders.create({
            amount: req.body.amount,
            currency: "INR",
            receipt: "receipt#1",
            notes: {
              key1: "value3",
              key2: "value2"
            }
          })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}