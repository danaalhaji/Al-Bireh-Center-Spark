const { User, AvailabeTimes } = require("../models");

// create working time for a trainer

exports.createTimesForTrainer = async (req , res) =>{

    try{
        const {iduser , availabeTimes } = req.body;
        const user = await User.findOne({
            where : {iduser}
        })
        if(!user){
            return res.status(400).json({
                message : "No User found"
            })
        }
        const createdTime =[];
        for(let time of availabeTimes){
            const {day_of_week , from_time , to_time} = time;
            if(!day_of_week || !from_time || !to_time) continue;
        }
        const newtime = await AvailabeTimes.create({
            day_of_week,
            from_time,
            to_time,
            user_iduser : user.iduser
        })
        createdTime.push(newtime)
        return res.status(200).json({
            message :`Created times for ${user.first_name + user.last_name} added successfully !`,
            data : createdTime
        })
    }catch(error){
    console.error("Error adding available times:", error.message);
    res.status(500).json({ message: "Server error" });
    }
}