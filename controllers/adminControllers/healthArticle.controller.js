const AdminResponse = require("../../helpers/adminResponse");
const {HealthArticle} = require('../../models');

async function getHealthArticles(req,res){
    try {
        const {search,limit,skip} = req.query;
        const healtArticles = await HealthArticle.find({
            title:{
                $regex:search,
                $options:'i'
            }
        }).limit(limit).skip(skip);

        AdminResponse(res).status(200).json({
            message:"health articles fetched successfully",
            data:healtArticles,
        });
    } catch (error) {
        console.log(error);
        AdminResponse(res).error(error);
    }
}

async function createHealthArticle(req,res){
    try {
        const healthArticle = await HealthArticle.create(req.body);
        AdminResponse(res).status(201).json({
            message:"Health article createrd successfully",
            data:healthArticle
        });
    } catch (error) {
        console.log(error);
        AdminResponse(res).error(error);
    }
}

async function updateHealthArticlebyId(req,res){
    try {
        const healtArticle = await HealthArticle.findByIdAndUpdate(req.params.id,req.body,{new:true});
        AdminResponse(res).status(200).json({
            message:"HealthArticle updated successfully",
            data:healtArticle,
        })
    } catch (error) {
        console.log(error);
        AdminResponse(res).error(error);
    }
}

async function deleteHealthArticleById(req,res){
    try {
        const healtArticle = await HealthArticle.findByIdAndDelete(req.params.id);
        AdminResponse(res).status(200).json({
            message:"HealthArticle deleted successfully",
            data:healtArticle,
        })
    } catch (error) {
        console.log(error);
        AdminResponse(res).error(error);
    }
}

module.exports = {
    getHealthArticles,
    createHealthArticle,
    updateHealthArticlebyId,
    deleteHealthArticleById
}