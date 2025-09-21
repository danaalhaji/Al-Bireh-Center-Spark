const { User, AvailabeTimes ,Session  } = require("../models");
const available_times = require("../models/available_times");


// create working time for a trainer

exports.createTimesForTrainer = async (req , res) =>{
    try{
        const {iduser , availabeTimes } = req.body;
        const user = await User.findOne({
            where : {iduser}
        })
        if(!user || user.is_active == false){
            return res.status(400).json({
                message : "No User found"
            })
        }
        const createdTime =[];
        for(let time of availabeTimes){
            const {day_of_week , from_time , to_time} = time;
            if(!day_of_week || !from_time || !to_time) continue;
        
        const newtime = await AvailabeTimes.create({
            day_of_week : time.day_of_week,
            from_time : time.from_time,
            to_time : time.to_time ,
            user_iduser : user.iduser
        })
        createdTime.push(newtime)
    }
        return res.status(200).json({
            message :`Created times for ${user.first_name + user.last_name} added successfully !`,
            data : createdTime
        })
    }catch(error){
    console.error("Error adding available times:", error.message);
    res.status(500).json({ message: "Server error" });
    }
}

// get all available times for user 

exports.getTimesForTrainer = async (req , res) =>{

    try{
        const { iduser } = req.body;
        const user = await User.findOne({
            where : {iduser}
        })
        if(!user || user.is_active == false){
            return res.status(400).json({
                message : "No User found"
            })
        }
        const allTimes = await AvailabeTimes.findAll({
            where: { user_iduser : user.iduser }
        })


        return res.status(200).json({
            message :`All times for ${user.first_name + user.last_name} : `,
            data : allTimes
        })
    }catch(error){
    console.error("Error fetching available times:", error.message);
    res.status(500).json({ message: "Server error" });
    }
}

// update times
exports.updateTimes = async (req,res)=>{
    try{
        const{trainerID,availabeTimes} = req.body;
        const user = await User.findOne({
            where : {trainerID}
        })
        if(!user || user.is_active == false){
            return res.status(400).json({
                message : "No User found"
            })
        }
        const createdTime =[];
        for(let time of availabeTimes){
            const {day_of_week , from_time , to_time} = time;
            if(!day_of_week || !from_time || !to_time) continue;
            const newtime = await AvailabeTimes.update({
            day_of_week : time.day_of_week,
            from_time : time.from_time,
            to_time : time.to_time ,
            user_iduser : user.iduser
        })
        createdTime.push(newtime)
    }
    return res.status(200).json({
            message :`Created times for ${user.first_name + user.last_name} added successfully !`,
            data : createdTime
        })
    }catch(error){
    console.error("Error updating available times:", error.message);
    res.status(500).json({ message: "Server error" });
    }
}