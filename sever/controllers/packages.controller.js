const { where } = require('sequelize');
const {Packages,Child , Spec, Session, Payment} = require('../models');
const packeges = require('../models/packeges');


// create package 
exports.createPackage = async(req,res) =>{
    try{
        const {childId , notes ,spe_type } =req.body ;
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
            const count = await Packages.count({
                where : {
                    specializtion_idspecializtion : spec.idspecializtion ,
                    children_idchild : child.idchildren
                }
            })
            const package_name = count + 1 
            const newPackage = await Packages.create({
                children_idchild : child.idchildren,
                specializtion_idspecializtion : spec.idspecializtion,
                notes : notes || null,
                package_name : spe_type + "  " + package_name 
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
exports.numberOfDoneSessions = async (req,res)=>{
    try{
        const {childId} = req.body;
        // find child
        const child = await Child.findByPk(childId);
        if(!child){
            return res.status(400).json({
                message :"Child not found"
            })
        }
        const allPackages = await Packages.findAll({
            include :[{
                model : Child,
                as: 'child',
                where : {idchildren : child.idchildren},
                attributes: ['first_name' , 'last_name']
        },{
                model :Session,
                as: 'sessions' ,
                where : {is_done : true},
                attributes : ['session_number', 'session_date' , 'is_done' , 'notes']  
            }
    ]
        })
        if(!allPackages || allPackages.length == 0){
            return res.status(400).json({
                message :"This child has no packages yet!"
            })
        }
        // count of done session per package
        const result = allPackages.map(pkgs => ({
            idpackeges: pkgs.idpackeges,
            sessionsCount: pkgs.sessions ? pkgs.sessions.length : 0
        }));

        return res.status(200).json({
            message : "The follwing pac",
            data : result
        })
    }catch(error){
        console.log("Server Error" , error.message)
        return res.status(500).json({
            message : "Server Error"
        })
    }
}

// all packages for a child
exports.pkgByChild = async (req,res)=>{
    try{
        const{idchildren} = req.body;
        const child = await Child.findByPk(idchildren)
        if(!child){
            return res.status(400).json({
                message : "No Child was found"
            })
        }
        const pkgs = await Packages.findAll({
            where :{
                children_idchild : child.idchildren
            },include : [{
                model : Child,
                as : 'child',
                attributes : ['first_name' , 'last_name' ]
            }]
        })
        if(!pkgs || pkgs.length == 0){
            return res.status(400).json({
                message : "No pckages was found"
            })
        }
        return res.status(200).json({
            message : `Packages for ${child.first_name} ${child.last_name} are : `,
            pkgs
        })

    }catch(error){
        console.log("Server Error" , error.message);
        return res.status(500).json({
            message : "Server Error"
        })
    }
}


//add progress rate for package after session 8

exports.addProgressRate = async(req, res)=>{
    try{
        const{idpackeges ,progressRate} = req.body;
        const pkg = await Packages.findOne({
            where : { idpackeges : idpackeges},
            include : [{
                model :Session,
                as: 'sessions' ,
                where : {is_done : true},
                attributes : ['session_number', 'session_date' , 'is_done' , 'notes']  
            }]
        });

        if(!pkg || pkg.length == 0){
            return res.status(400).json({
                message : "No package was found od this package have less than 8 done sessions"
            })
        }
        console.log(pkg.sessions.length)
        if(pkg.sessions.length == 8){
            await pkg.update({
                progress_rate :  progressRate
            })
            console.log("Progress rate was added succefully " , pkg)
            return res.status(200).json({
            message : "Packgae rate was added successfully ",
            data :  pkg
        })
        }
            console.log("Cannot add rate for this package because the sessions are less than 8 " , pkg)
            return res.status(400).json({
            message : "Cannot add rate for this package because the sessions are less than 8",
            data :  pkg
        })
    }catch(error){
        console.log("Server Error" , error.message);
        return res.status(500).json({
            message : "Server Error"
        })
    }
}

// all trainers in package
exports.findTrainersPerPackage = async (req,res)=>{
    try{
        const{ pkgID} = req.body;
        const allTrainersInpkg = await Packages.findOne({
            where : {
                idpackeges : pkgID
            }, include : [{
                model : Session,
                as : 'sessions', 
                attributes : ['session_number' , 'session_date' , 'session_time' , 'is_done', '$']
            }]
        })
    }catch(error){
        console.log("Server Error" , error.message);
        return res.status(500).json({
            message : "Server Error"
        })
    }
}


// all packages for a child and date child created in
exports.allPKGandCratedDateChild = async (req,res)=>{
    try{
        const{childId} =  req.body;
        const child = await Child.findByPk(childId);
        if(!child){
            console.log("N child was found")
            return res.status(400).json(
                {message : "No child was found"}
            )
        }
        const Total_paymenst = []
        const pkgsAndChild = await Packages.findAll({
            where: {
                children_idchild : child.idchildren
            }, include : [{
                model : Child,
                as : 'child',
                attributes : ['first_name' , 'last_name', 'createAt' ]
            }]
        })
        if(!pkgsAndChild){
            console.log("N pkgs was found")
            return res.status(400).json(
                {message : "No pkgs was found"}
            )
        }
        return res.status(200).json({
            message : "Pkgs for child and date created in",
            data : pkgsAndChild
        })
    }catch(error){
        console.log("Server Error" , error.message);
        return res.status(500).json({
            message : "Server Error"
        })
    }
}