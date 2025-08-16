const { where } = require('sequelize');
const {Packages,Child , Spec, Session} = require('../models');


// create package 
exports.createPackage = async(req,res) =>{
    try{
        const {childId , notes, package_desc ,spe_type } =req.body ;
        console.log(req.body)
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
                notes : notes || null,
                package_desc : package_desc ,
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
exports.viewPackageForaChild = async(req, res) =>{
    try{
        const {childId , package_desc} = req.body;
        const child = await Child.findByPk(childId)
        const package_Child =  await Packages.findOne({
            where : {
                package_desc :package_desc,
                children_idchild : child.idchildren
            },include: [{
                model: Child,
                as: 'child',
                attributes: ['first_name' , 'last_name']
                },{
                model : Session,
                as : 'sessions',
                attributes : ['session_number', 'session_date' , 'is_done' , 'notes']    
                }
            ]
        })
        if(!package_Child){
            console.log("Package not found check child id or package describtion");
            return res.status(400).json({
                message : "Error fetching package"
            })
        }
        res.status(200).json({
            message : `Package ${package_desc} for ${child.first_name} ${child.last_name} was found as the following data:`,
            package_Child
        })

    }catch(error){
        console.log("Error fetchinf package" , error.message);
        return res.status(400).json({
            message : "Server Error"
        })
    }
}


// number of sessions done for a child per package

// all packages for a child

// count of done sessions per package

// progress rate for package after session 8

// all trainers in package
