const { User, Session , AvailabeTimes ,Packages, Child } = require("../models");
const { Op, where } = require("sequelize");
const session = require("../models/session");
const { database } = require("../config/config");

// create session

/*exports.bookSession = async (req, res) =>{
    try{
        const {iduser,idchildren, date , time , package_id , inital_assesment } = req.body ;
        if(!iduser || !date || !time){
            return res.status(400).json({message : " User ID , date and time are required "});
        }
        const d = new Date(date);
        const dayOfWeek =  d.getDay()
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
                available_times_user_iduser: iduser,
                children_idchild:idchildren
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
                packeges_idpackeges: null,
                available_times_idavailable: availableTime.idavailable,
                available_times_user_iduser: iduser
            })
            return res.status(200).json({
                message : "Session was booked successfully ",
                session : newSession
            })
        }
    }catch(error){
        console.error("Error booking session:", error);
        res.status(500).json({ message: "Server error" });
    }
}
*/
exports.bookSession = async (req, res) => {
    try {
        const { iduser, idchildren, date, time, package_id, session_type ,notes } = req.body;
        console.log(date)
        if (!iduser || !date || !time) {
            return res.status(400).json({ message: "User ID, date and time are required" });
        }

        const [day, month, year] = date.split("-");
        const d = new Date(`${year}-${month}-${day}`);
        const daysMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayOfWeek = daysMap[d.getDay()];
        console.log(dayOfWeek)
        // Check for trainer availability
        const availabetime = await AvailabeTimes.findOne({
            where: {
                user_iduser: iduser,
                day_of_week: dayOfWeek
            }
        });

        console.log(availabetime)
        if (!availabetime) {
            return res.status(400).json({
                message: `The Trainer is not available at "${date}" "${time}", Please choose another time`
            });
        }
        const isoDate = date.split("-").reverse().join("-");
        const sessionStart = new Date(`${date}T${time}`);
        const sessionEnd = new Date(sessionStart.getTime() + 45 * 60000);
        const sessionDateOnly = isoDate;
        console.log("session date",sessionStart)
        const formattedTime = time.length === 5 ? time + ':00' : time;
        console.log("formattedTime", formattedTime)
        // Check if session is already booked
        console.log('sessionDateOnly:', sessionDateOnly, typeof sessionDateOnly);
        console.log('time:', formattedTime, typeof formattedTime);
        console.log('available_times_idavailable:', availabetime.idavailable, typeof availabetime.idavailable);
        console.log('available_times_user_iduser:', iduser, typeof iduser);
        console.log('children_idchild:', idchildren, typeof idchildren);

        const excitedSession = await Session.findOne({
            where: {
                session_date: new Date(sessionDateOnly),
                session_time: formattedTime,
                [Op.or]: [
                {  available_times_user_iduser: Number(iduser) },
                {  children_idchild: Number(idchildren) }
        ]
            }
        });

        console.log("excitedSession is",excitedSession)
        if(excitedSession) {
            return res.status(400).json({ message: "This session is already booked!" });
        }

        let newSession;
        const child = await Child.findByPk(idchildren)
        if(!child){
            return res.status(400).json({
                message : "Error fetching child !"
            })
        }
        if (session_type =="2") {
            const packageForBooking = await Packages.findByPk(package_id);
            if(!packageForBooking){
                return res.status(400).json({
                    message :"No package was found!"
                })
            }
            const previousSessionCount = await Session.count({
                where: {
                    packeges_idpackeges: package_id,
                    available_times_user_iduser: Number(iduser),
                    children_idchild: Number(idchildren)
                }
            });
            if(previousSessionCount < 8){
            newSession = await Session.create({
                session_number: previousSessionCount+1,
                session_type : session_type,
                session_date: sessionDateOnly,  
                session_time: time,             
                is_booked: true,
                is_done: false,
                packeges_idpackeges: packageForBooking.idpackeges,
                available_times_idavailable: availabetime.idavailable,
                available_times_user_iduser: iduser,
                children_idchild: child.idchildren,
                notes:notes || null
            });
            return res.status(200).json({
                message: "Session was booked successfully",
                session: newSession,
                data : newSession
        });
        }else{
            return res.status(400).json({ message: "You have now finished allowed number of sessions for this package please choose another package !" });
        }
        } else if (session_type == "0" || session_type == "1") {
            newSession = await Session.create({
                session_number: 0,
                session_date: sessionDateOnly,  
                session_time: time,             
                is_booked: true,
                is_done: false,
                session_type : session_type,
                packeges_idpackeges: null,
                available_times_idavailable: availabetime.idavailable,
                available_times_user_iduser: iduser,
                children_idchild: child.idchildren,
                notes:notes || null
            });
            console.log("new sessios is :" , newSession)
            return res.status(200).json({
            message: "Session was booked successfully",
            session: newSession,
            data : newSession
        });

        }
        console.log("new sessios is :" , newSession)


    }catch (error) {
        console.error("Error booking session:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// count all sessions 
exports.countAllSession = async(req, res) =>{
    try{
        const numOfSessions = await Session.count()
        if(numOfSessions){
            return res.status(200).json({
                message : `you have ${numOfSessions}`,
                data : countAllSession
            })
        }
    }catch(error){
        console.error("Error fetching number of sessions", error.message);
        res.status(500).json({ message: "Server error" });
    }

}
// get all sessions this month 

exports.sessionThisMonth = async (req, res) => {
    try{
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const endOfMonth = new Date(startOfMonth);
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);

        const sessionsThisMonth = await Session.count({
            where: {
            session_date: {
                [Op.gte]: startOfMonth,
                [Op.lt]: endOfMonth
            }
        }})
        return res.status(200).json({
            message : `You have ${sessionsThisMonth} sessions this month`,
            data : sessionsThisMonth
        })
    }catch(error){
            console.error("Error fetching number of sessions", error.message);
            res.status(500).json({ message: "Server error" });
    }
}

// all sessions booked this month 

exports.allSessionsThisMonth = async (req, res) => {
    try{
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const endOfMonth = new Date(startOfMonth);
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);
        // add child and trainer
        const sessionsThisMonth = await Session.findAll({
            where: {
            session_date: {
                [Op.gte]: startOfMonth,
                [Op.lt]: endOfMonth
            }
        }})
        return res.status(200).json({
            message : `You have ${sessionsThisMonth} sessions this month`,
            data : sessionsThisMonth
        })
    }catch(error){
            console.error("Error fetching number of sessions", error.message);
            res.status(500).json({ message: "Server error" });
    }
}

// get all booked sessions this month for a trainer
exports.allSessionsThisMonthForTrainer = async (req, res) => {
    try{
        const{ iduser } = req.body;
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const endOfMonth = new Date(startOfMonth);
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);
        // find user
        const user = await User.findOne({
            where : {
                iduser : iduser
            }
        })
        if(!user){
            return res.status(400).json({
                message: "Incorect Id for trainer"
            })
        }
        const sessionsThisMonth = await Session.findAll({
            where: {
            session_date: {
                [Op.gte]: startOfMonth,
                [Op.lt]: endOfMonth
            },
            available_times_user_iduser : user.iduser
        }})
        return res.status(200).json({
            message : `${user.first_name} ${user.last_name} have ${sessionsThisMonth} sessions this month`,
            data : sessionsThisMonth
        })
    }catch(error){
            console.error("Error fetching number of sessions", error.message);
            res.status(500).json({ message: "Server error" });
    }
}

// get all sessions for a trainer

exports.getSessionsForTrainer = async (req, res) =>{
    try{
        const{idUser} = req.body;
        // check if user is available
        const trainer = await User.findByPk(idUser)
        if(!trainer){
            return res.status(400).json({
                message : "No trainer was found "
            })
        }
        const sessionsForTrainer = await Session.findAll({
        where: {
            available_times_user_iduser : trainer.iduser
        }
        })
        if(!sessionsForTrainer){
            return res.status(400).json({
                message : "This trainer does not have any sessions booked yet"
            })
        }
        return res.status(200).json({
            message : `Session for ${trainer.first_name} were found`,
            sessionsForTrainer
        })
    }catch(error){
        return res.status(500).json({
            message : "Server Error"
        })
    }
}

// get all done sessions for a trainer
exports.getDoneSessionsForTrainer = async (req, res) =>{
    try{
        const{idUser} = req.body;
        // check if user is available
        const trainer = await User.findByPk(idUser)
        if(!trainer){
            return res.status(400).json({
                message : "No trainer was found "
            })
        }
        const sessionsForTrainer = await Session.findAll({
        where: {
            available_times_user_iduser : trainer.iduser,
            is_done : true
        }
        })
        if(!sessionsForTrainer){
            return res.status(400).json({
                message : "This trainer does not has no sessions done yet"
            })
        }
        return res.status(200).json({
            message : `Session for ${trainer.first_name} were found`,
            sessionsForTrainer
        })
    }catch(error){
        return res.status(500).json({
            message : "Server Error"
        })
    }
}

// get all sessions for child
exports.getAllSessionsForChild = async (req, res) =>{
    try{
        const{idChild} = req.body;
        // check if user is available
        const child = await Child.findByPk(idChild)
        if(!child){
            return res.status(400).json({
                message : "No child was found "
            })
        }
        const sessionsForchild = await Session.findAll({
        where: {
            children_idchild : child.idchildren
        }
        })
        if(!sessionsForchild){
            return res.status(400).json({
                message : "This child does not has no sessions done yet"
            })
        }
        return res.status(200).json({
            message : `Session for ${child.first_name} were found`,
            sessionsForchild
        })
    }catch(error){
        return res.status(500).json({
            message : "Server Error"
        })
    }
}

// get all done sessions for a child
exports.getDoneSessionsForChild = async (req, res) =>{
    try{
        const{idChild} = req.body;
        // check if user is available
        const child = await Child.findByPk(idChild)
        if(!child){
            return res.status(400).json({
                message : "No child was found "
            })
        }
        const sessionsForchild = await Session.findAll({
        where: {
            children_idchild : child.idchildren,
            is_done :  true
        }
        })
        if(!sessionsForchild){
            return res.status(400).json({
                message : "This child does not has no sessions done yet"
            })
        }
        return res.status(200).json({
            message : `Session for ${child.first_name} were found`,
            sessionsForchild
        })
    }catch(error){
        console.log("Server Error" , error.message);
        return res.status(500).json({
            message : "Server Error"
        })
    }
}

// get sessions dates for package and if they are done or not
exports.findSessionsForPkg = async (req, res)=>{
    try{
        const{package_id} = req.body;
        const sessions = await Session.findAll({
            where : {
                packeges_idpackeges : package_id
            },
            include:[{
                model: Child,
                as: 'children',
                attributes : ['first_name' , 'last_name' ]
            },
            {
                model : AvailabeTimes,
                as : 'user_iduser',
                attributes : ['first_name' , 'last_name']
            }
        ]
        })
        if(!sessions){
            return res.status(400).json({
                message : "Sessions for the requested package did not found"
            })
        }
        return res.status(200).json({
            message : "Sessions were found",
            sessions
        });
    }catch(error){
        console.log("Server Error" , error.message);
        return res.status(500).json({
            message : "Server Error"
        });
    }
}

/****************************************** */
//*******update appointment for session*****//
/****************************************** */
exports.updateSession = async (req,res)=>{
    try{
        const {sessionID, date, time, package_id, session_type ,notes,idUser,idChild } = req.body;
        const sessionAvailable = await Session.findByPk(sessionID);
        if(!sessionAvailable){
            return res.status(400).json({
                message : "Session not found"
            })
        }
        // check if child is exist
        const child = await Child.findByPk(idChild);
        if(!child){
            return res.status(400).json({
                message : "Child not found"
            })
        }
        // check trainer
        const trainer = await User.findByPk(idUser);
        if(!trainer){
            return res.status(400).json({
                message : "Trainer not found"
            })
        }
        
    }catch(error){

    }
}

// add initial assemnt recommendation 
exports.addInitialAssment = async (req,res) =>{
    try{
        const{chidID, notes} = req.body;
        const child = await Child.findOne({
            where : {
                idchildren : chidID,
            },
            include : [{
                model : Session,
                as: "sessions",
                where : {
                session_type: "0",
                is_done: true
                },
                attributes : ["idsession"]
            }]
        });
        if(!child || child.length == 0){
            console.log("No Child Was found or this child did not book any initial assesment yet")
        }
        const initalSession = await Session.findByPk(child.sessions[0].idsession)
        await initalSession.update({
            notes:notes
        })
        console.log(initalSession)
        return res.status(200).json({
            message : "Initial Assment was added",
            initalSession
        })
    }catch(error){
        console.log("Server Error" , error.message);
        return res.status(500).json({
            message : "Server Error"
        });
    }
}


// veiw inital assement
exports.viewInitialassement  = async (req, res) =>{
    try{
        const {childID} = req.body;
        // checif child id is correct 
        const child = await Child.findByPk(childID);
        if(!child){
            console.log("No child was found ")
            return res.status(400).json({
                message : `No child with ${childID} ID was found`
            })
        }
        const inital_assesment = await Session.findAll({
            where : {   
                session_type : "0",
                children_idchild : childID,
                
            },
            attributes : ["session_date", "session_time" , "notes" , "available_times_user_iduser"]
        })
        if(!inital_assesment){
            console.log("No inital assement was done for this child")
            return res.status(400).json({
                message : "No inital assesment was found",
            })
        }
        return res.status(200).json({
            message : "inital assment done along with the following data:",
            data : inital_assesment
        })
    }catch(error){
        console.log("Server Error" , error.message);
        return res.status(500).json({
            message : "Server Error"
        });
    }
}
// single payment// لازم يضيف عن اي جلسة ؟؟ حسب الفرونت !
// after the third delay the session considered done