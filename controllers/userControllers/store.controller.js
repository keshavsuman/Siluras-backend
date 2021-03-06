const advertisementModel = require('../../models/advertisementModel');
const {Category,Subcategory,Cart,Order,Medicine} = require('../../models');

module.exports.getCategories = async (req,res) => {
    try {
        const {select,project,skip,limit} = req.body;
        const categories = await Category.find();
        // const categories = await Category.aggregate([
        //     {
        //       '$group': {
        //         '_id': '$categoryId', 
        //         'subCategories': {
        //           '$push': '$$ROOT'
        //         }
        //       }
        //     }, {
        //       '$lookup': {
        //         'from': 'categories', 
        //         'localField': '_id', 
        //         'foreignField': '_id', 
        //         'as': 'category'
        //       }
        //     }, {
        //       '$addFields': {
        //         '_id': {
        //           '$first': '$category._id'
        //         }, 
        //         'categoryName': {
        //           '$first': '$category.categoryName'
        //         }, 
        //         'image_url': {
        //           '$first': '$category.image_url'
        //         }
        //       }
        //     },{
        //         "$project":{
        //             "category":0
        //         }
        //     }
        //   ]);
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
        const medicines = await Medicine.find(select,project).skip(skip).limit(limit);
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
        const cart = await Cart.findOneAndUpdate({patientId:req.user._id},{
            $addToSet:{
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
        const data = await Cart.findOneAndUpdate({patientId:req.user._id,'products.medicineId':req.body.medicineId},{
            $set:{ [`products.$.quantity`]:req.body.quantity }
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
        const data = await Cart.findOneAndUpdate({patientId:req.user._id},{
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
        const cart = await Cart.findOne({patientId:req.user._id}).populate('products.medicineId');
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


module.exports.placeOrder = async (req,res)=>{
    try {
        const order  = await Order.create({
            patientId:req.user._id,
            medicineId:req.body.medicineId,
            totalPrice:req.body.totalPrice,
            paymentStatus:'pending',
        });
        await Cart.findOneAndUpdate({patientId:req.user._id},{
            products:[],
            totalPrice:0
        });
          res.status(201).json({
              status:201,
              message:"Order created successfully",
              data:order,
          })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}


module.exports.getOrders = async (req,res)=>{
    try {
        const {select,project,skip,limit} = req.body;
        const order = await Order.find({
            patientId:req.user._id,
            ...select
        },project).skip(skip??0).limit(limit??20);
        res.status(200).json({
            status:200,
            message:"Orders fetched Successfully",
            data:order
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message,
        });
    }
}

module.exports.updateOrder = async (req,res)=>{
    try {
        const order = await Order.findByIdAndUpdate(req.body._id,{
            paymentId:req.body.paymentId,
            orderId:req.body.orderId,
            paymentStatus:req.body.paymentStatus,
            status:req.body.status
        },{new:true});
        res.status(200).json({
            status:200,
            message:"Oder Updated Successfully",
            data:order
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message
        });
    }
}

module.exports.searchProducts = async (req,res)=>{
    try {
        const products = await Medicine.find(
            {
                $match:{
                    name:{
                        $regex:req.body.search,
                        $options:'i'
                    }
                }
            }
        );
        res.status(200).json({
            status:200,
            message:"products searched Successfully",
            data:products
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message
        });
    }
}