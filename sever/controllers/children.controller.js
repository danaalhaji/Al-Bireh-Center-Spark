const { Child , Parent  } = require("../models");

// create child and parent
exports.createChild = async (req, res)=>{
    try{
        const {
            idchildren , first_name_child, last_name_child , birth_date_child , gender_child,
                first_name_parent , last_name_parent , phone_number, email , notes ,
                relationship , parent_id
        } = req.body
        const child = await Child.findOne({
            where : {idchildren}
        })
        if(child == true){
            return res.status(400).json({
                message : "Child already exist"
            })
        }
        // check if parent is exist 
        const parent = await Parent.findOne({
            where : {parent_id : parent_id}
        })
        if(parent){
        const newChild = await Child.create({
            idchildren : idchildren,
            first_name : first_name_child,
            last_name : last_name_child ,
            birth_date : birth_date_child ,
            gender : gender_child,
        })
        parent.push(newChild)
        return res.status(200).json({
            message : " New child was created sucessfully"
        })

    }
    const newParent = await Parent.create({
        parent_id: parent_id,
        first_name : first_name_parent,
        last_name : last_name_parent,
        phone_number : phone_number,
        email : email,
        notes : notes,
        relationship:relationship
        })
        const newChild = await Child.create({
            idchildren : idchildren,
            first_name : first_name_child,
            last_name : last_name_child ,
            birth_date : birth_date_child ,
            gender : gender_child,
        })
        newParent.push(newChild)
        return res.status(200).json({
            message : " New child was created sucessfully"
        })
    }catch(error){
        console.error("Error adding new  child:", error.message);
        res.status(500).json({ message: "Server error" });
    }
}

// get child profile

// get all children 
