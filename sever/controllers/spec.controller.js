const { where } = require("sequelize");
const { User, Spec } = require("../models"); 


// Create Spec
exports.addSpec = async (req ,res) =>{
    try{
        const { spe_type } = req.body;
        const excitedSpec =  await Spec.findOne({
            where : { spe_type }
        });
        if(excitedSpec){
            return res.status(400).json({ message: "Specialization is already added!" });
        }
        const newSpec = await Spec.create({
            spe_type : spe_type
        })
        return res.status(200).json({
            message : "Specialization added !",
            specialization : newSpec.spe_type
        })
    }catch(err){
        console.error("Adding new specialization failed where error:", err.message);
    }
}

// Disable spec
exports.deleteSpec = async (req ,res) => {
  try {
    const { spe_type } = req.body;

    const existingSpec = await Spec.findOne({ where: { spe_type } });

    if (!existingSpec) {
      return res.status(404).json({ message: "Specialization not found" });
    }

    await existingSpec.update({ is_enabled: false });

    return res.status(200).json({
      message: `Specialization "${existingSpec.spe_type}" is now disabled!`,
    });

  } catch (err) {
    console.error("Updating specialization failed. Error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
}

// enable spec

exports.enableSpec = async(req, res) =>{
    try{
        const {spe_type} = req.body;
        const existingSpec = await Spec.findOne({ where: { spe_type } });

    if (!existingSpec) {
      return res.status(404).json({ message: "Specialization not found" });
    }
    if(existingSpec.is_enabled == false){
        await existingSpec.update({ is_enabled: true });
        return res.status(200).json({
            message: `Specialization "${existingSpec.spe_type}" is now enabled!`,
    });
    }
    }catch(error){
        console.error("Updating specialization failed. Error:", err.message);
        return res.status(500).json({ message: "Server error" });
    }
}
// get all speciallization 
exports.allSpec = async(req, res) => {
    try{
        const specs = await Spec.findAll({
          where : {is_enabled :  true}
        });
        if(!specs){
            res.status(400).json({
                message : "No specializations were found"
            })
        }
        res.status(200).json({
            message: "Specializations",
            data: specs
        });
    }catch(error){
        console.error("Error fetching specs :", error.message);
        res.status(500).json({ message: "Server error" });
    }
}


// get all with trainers 

exports.allSpecWithTrainers = async (req, res) => {
  try {
    const specs = await Spec.findAll({
      where: { is_enabled: true },
      include: [{
        model: User,
        attributes: ['iduser','first_name' , 'last_name']
      }]
    });
    if(!specs){
            res.status(400).json({
                message : "No specializations were found"
            })
        }
    res.status(200).json({ message: "Specializations with trainers", data: specs });
  } catch (error) {
    console.error("Error fetching specs with trainers:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};



//count all spec
exports.countAllSpec = async (req, res) =>{
    try{
        const allSpec = await Spec.findAndCountAll({
            where :{
                is_enabled : true
            }
        })
        if(!allSpec){
            res.status(400).json({
                message : "No specializations were found"
            })
        }
        res.status(200).json({
            message : "All enabled specializations",
            data : allSpec
        })
    }catch(error){
        console.log("Error fetching specializations" , error.message);
        res.status(500).json({
            message : "Server error"
        })
    }
}

// get users by specllizaton 
exports.getAllTrainInSpec = async (req , res) =>{
    try{
        const {spe_type} = req.body;
        const specExisted = await Spec.findOne({
            where : {spe_type}
        })
        console.log(specExisted)
        if(!specExisted){
            return res.status(400).json({
                message : "No specialization were found"
            })
        }
    const allTrainerInSpec = await Spec.findAll({
      where: { spe_type },
      include: [{
        model: User,
        attributes: ['iduser','first_name' , 'last_name']
      }]
    });
        if(!allTrainerInSpec){
            return res.status(404).json({ message: "Not found" });
        }
        return res.status(200).json({
            message : ` All trainers related to "${specExisted.spe_type}"  found : `,
            data : allTrainerInSpec
        })
    }catch(error){
        console.log("Error fetching specializations" , error.message);
        res.status(500).json({
            message : "Server error"
        })
    }
}