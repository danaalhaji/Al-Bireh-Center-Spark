const { Child , Parent  } = require("../models");
const { all } = require("../routes/user.routes");

// create child and parent
exports.createChild =  async (req, res) => {
  try {
    const {
        parent_id,
        first_name_parent,
        last_name_parent,
        phone_number,
        email,
        notes,
        relationship,

        idchildren,
        first_name_child,
        last_name_child,
        birth_date_child,
        gender_child
    } = req.body;

    let parent = await Parent.findOne({ where: { parent_id } })

    if (!parent) {
        parent = await Parent.create({
        parent_id: parent_id,
        first_name: first_name_parent,
        last_name: last_name_parent,
        phone_number,
        email,
        notes,
        relationship
        });
    }


    const newChild = await Child.create({
        idchildren: idchildren,
        first_name: first_name_child,
        last_name: last_name_child,
        birth_date: birth_date_child,
        gender: gender_child,
        parents_idparents: parent.idparents 
    });

    return res.status(201).json({
        message: "Child added successfully",
        parent: parent,
        child: newChild
    });

  } catch (error) {
    console.error("Error adding child with parent:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
// count all children

exports.countAllChildren = async(req, res)=>{
    try{
        const allChildren = await Child.count()
        if(allChildren){
    return res.status(201).json({
        message: `Children count is ${allChildren}`,
        data : allChildren
    });
        }
    }catch(error){
        console.error("Error counting children", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// get child profile

exports.getChildProfile = async(req, res)=>{
    try{
        const {idchildren} = req.body ;
        const child = await Child.findOne({
            where : {idchildren : idchildren}
            ,include: [{
                    model: Parent,
                    as: 'parent',
                    attributes: ['first_name' , 'last_name' , 'phone_number']
                    }]
        })
        if(!child){
            return res.status(404).json({ message: "Child Not found" });
        }
        return res.status(200).json({
            message : ` Child "${child.first_name}"  found : `,
            data : child
        })

    }catch(error){
        console.error("Error fetching child with parent:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}



// get all children with name 
exports.getAllChildren = async (req,res)=>{
    try{
        const allChidlren = await Child.findAll({
            include: [{
                model: Parent,
                as: 'parent',
                attributes: ['first_name' , 'last_name' , 'phone_number']
                }]
        })
        return res.status(200).json({
            message : `All children are found `,
            data : allChidlren
        })
    }catch(error){
        console.error("Error fetching children :", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// update child profile
exports.updateChildProfile = async(req, res) =>{
    try{
        const {idchildren ,first_name , last_name , gender , birth_date } = req.body;
        const child = await Child.findByPk(idchildren)
        if(child){
            const updatedChild = await child.update({
                first_name,last_name,gender,birth_date,idchildren
            })
            return res.status(200).json({
                message : `Child ${first_name} ${last_name} was updated successfully`,
                data : updatedChild
            })
        }
    }catch(error){
        console.log("Faild to updated Child" , error.message)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

// delete child 

//Number of children added this month
