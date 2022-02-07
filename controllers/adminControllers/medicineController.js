const medicineModel = require('../../models/store/medicineModel');

module.exports.getMedicines = async (req,res)=>{
    try {
        const {select,project,skip,limit} = req.body;
        const medicines = await medicineModel.find(select,project).skip(skip??0).limit(limit??20);
        res.status(200).json({
            status:200,
            message:"Medicines fetched Successfully",
            data:medicines
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message
        });
    }
}

module.exports.addMedicines = async (req,res)=>{
    try {
        const medicine = await medicineModel.create({
            name:req.body.name,
            description:req.body.description,
            quantity:req.body.quantity,
            price:req.body.price,
            inStock:req.body.inStock,
            image_url:req.body.image_url,
        });
        res.status(200).json({
            status:200,
            message:"Medicines added successfully",
            data:medicine
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message
        });
    }
}

module.exports.updateMedicines = async (req,res)=>{
    try {
        const medicine = await medicineModel.findByIdAndUpdate(req.params.id,{
            name:req.body.name,
            description:req.body.description,
            quantity:req.body.quantity,
            price:req.body.price,
            inStock:req.body.inStock,
            isAvailable:req.body.isAvailable
        },{
            new:true
        });
        res.status(200).json({
            status:200,
            message:"Medicine updated successfully",
            data:medicine
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message
        });
    }
}
