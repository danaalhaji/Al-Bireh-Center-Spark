const { User, Spec } = require("../models"); 

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


// get all speciallization 
exports.allSpec = async(req, res) => {
    try{
    const specs = await Spec.findAll({
      where : {is_enabled :  true}
    });
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
        attributes: ['first_name' , 'last_name']
      }]
    });
    res.status(200).json({ message: "Specializations with trainers", data: specs });
  } catch (error) {
    console.error("Error fetching specs with trainers:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
