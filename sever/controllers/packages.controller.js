const {Packages,Child , Spec} = require('../models');


// create package 
exports.createPackage = async(req,res) =>{
    try{
        const {childId , notes, spe_type } =req.body ;
        // check if child existes
        const child = await Child.findByPk(childId)
        //check if specillization exites
        const spec = await Spec.findOne({
            where:{
                spe_type:spe_type
            }
        })
        if(!child || !spec){
            return res.status(400).json({
                message : "Error in child or speclization !"
            })
            
        }else{
            console.log(`child ${child.first_name} , spec ${spec.spe_type}`)
            const newPackage = await Packages.create({
                children_idchild : child.idchildren,
                specializtion_idspecializtion : spec.idspecializtion,
                notes : notes || null
            });
            if(newPackage){
                return res.status(200).json({
                    message : `Adding ${spe_type} for ${child.first_name} was added successfully `,
                    newPackage
                })
            }
        }
        
    }catch(error){
        console.error("Error adding package ", error.message);
        return res.status(500).json({
            message : " Server error"
        })
    }

}

// view package details for a child

