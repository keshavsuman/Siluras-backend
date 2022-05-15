const UserResponse = require("../../helpers/userResponse");
const { AmbulanceBooking } = require("../../models")

const bookAmbulance = async (req,res)=>{
    try {
        const {name,email,mobileNumber,location,subject,type} = req.body;
        const ambulanceBooking = await AmbulanceBooking.create({
            name:name,
            email:email,
            subject:subject,
            type:type,
            mobileNumber:mobileNumber,
            location:{
                "type":"Point",
                "coordinates":location
            }
        });
        UserResponse(res).status(201).json({
            data:ambulanceBooking,
            message:"Ambulance booked Successfully"
        });
    } catch (error) {
        UserResponse(res).error();   
    }
}

module.exports = {
    bookAmbulance
}