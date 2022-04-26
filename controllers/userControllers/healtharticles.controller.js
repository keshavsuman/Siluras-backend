const UserResponse = require("../../helpers/userResponse");
const { HealthArticle } = require("../../models");

async function getHealthArticles(req,res){
    try {
        const healthArticles = await HealthArticle.find({});
        UserResponse(res).status(200).json({
            message:"Health article fetched successfully",
            data:healthArticles
        })
    } catch (error) {
        console.log(error);
        UserResponse(res).error(error);
    }
}

module.exports ={
    getHealthArticles
}