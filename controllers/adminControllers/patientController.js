const patientModel = require('../../models/patientModel');

module.exports.getPatients = async (req,res)=>{
    try {
        const {select,project,skip,limit} = req.body;
        const patients = await patientModel.find(select,project).skip(skip??0).limit(limit??20);
        res.status(200).json({
            status:200,
            message:"Patients fetched successfully",
            data:patients
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message
        });
    }
}

module.exports.addPatient = async (req,res)=>{
    try {
        const {first_name,last_name,email,age,sex} = req.body;
        const patient = await patientModel.findOne({email:email});
        if(patient){
            res.status(200).json({
                status:200,
                message:"User with this email already exits",
            });
        }else{
            const patient = await patientModel.create({
                first_name:first_name,
                last_name:last_name,
                email:email,
                age:age,
                sex:sex
            });
            res.status(201).json({
                status:201,
                message:"Patient added successfully",
                data:patient
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message
        });
    }
}

module.exports.updatePatient = async (req,res)=>{
    try {
        const {first_name,last_name,email,age,sex} = req.body;
        
        const patient = await patientModel.findByIdAndUpdate(req.params.id,{
            first_name:first_name,
            last_name:last_name,
            email:email,
            age:age,
            sex:sex
        },{
            new:true
        });
        patient.password = undefined;
        res.status(200).json({
            status:200,
            message:"Patient updated successfully",
            data:patient
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:error.message
        });
    }
}
