const { User, Session , AvailabeTimes ,Packages } = require("../models");

// create session

exports.bookSession = async (req, res) =>{
    try{
        const {iduser, date , time , package_id , inital_assesment } = req.body ;
        if(!iduser || !date || !time){
            return res.status(400).json({message : " User ID , date and time are required "});
        }
        const dayOfWeek = new Date.now(date).toLocalDateString('en-US' , {weekday : 'long'});
        // check for trainer availablity

        const availabetime = await AvailabeTimes.findOne({
            where :{
                user_iduser : iduser,
                day_of_week : dayOfWeek
            }
        });
        if(!availabetime){
            return res.status(400).json({message : `The Trainer is not available at "${date}" "${time}" , Please choose another time`});
        }

        const sessionStart = new Date(`${date}T${time}`);
        const sessionEnd = new Date(sessionStart.getTime + 45 * 60000);

        // check if this session is already booked 

        const excitedSession = await Session.findOne({
            where :{
                session_date : date ,
                session_time : sessionStart ,
                available_times_idavailable : availabetime.idavailable,
                available_times_user_iduser : iduser,
                is_booked : true
            }
        });
        if(excitedSession){
            return res.status(400).json({message  : "This session is already booked!"});
        }
        if(inital_assesment == false){
            // bring session number 
            const previousSessionCount = await Session.count({
                where :{
                    package_idpackages : package_id,
                    available_times_user_iduser : iduser
                }
            })
            const newSession = Session.create({
                session_number: previousSessionCount+1,
                session_date: date,
                session_time: sessionStart,
                is_booked: true,
                is_done: false,
                packeges_idpackeges: package_id || null,
                available_times_idavailable: availableTime.idavailable,
                available_times_user_iduser: iduser
            })
            return res.status(200).json({
                message : "Session was booked successfully ",
                session : newSession
            })
        }
        // save in initial assement
        if(inital_assesment == true){
            const newSession = Session.create({
                session_number: 0, 
                session_date: date,
                session_time: sessionStart,
                is_booked: true,
                is_done: false,
                packeges_idpackeges: package_id,
                available_times_idavailable: availableTime.idavailable,
                available_times_user_iduser: iduser
            })
            return res.status(200).json({
                message : "Session was booked successfully ",
                session : newSession
            })
        }
    }catch{
        console.error("Error booking session:", error.message);
        res.status(500).json({ message: "Server error" });
    }
}

// count all sessions 

// get all sessions from today's date
// get all booked session for a trainer
// get all done sessions for a trainer
// get all session for child 
// get all done sessions for a child
// update session
