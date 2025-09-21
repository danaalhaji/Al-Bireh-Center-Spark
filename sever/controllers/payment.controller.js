const { where , Op} = require('sequelize');
const { Packages, Child, Payment, Session } = require('../models');

// Add payment to package 
exports.addPayment = async (req , res )=>{

    try{
// add payment to package 
        const {amount , packageId} = req.body;
        // find package
        const pkg = await Packages.findOne({
            where: {
                idpackeges : packageId},      
                include: [{
                    model: Child,
                    as: 'child',
                    attributes: ['idchildren','first_name' , 'last_name']
                    }]
        })
        if(!pkg){
            return res.status(404).json({ message: "Package not found" });
        }
        if (!pkg.child) {
            return res.status(400).json({ message: "No child linked to this package" });
            }
        if(pkg.balance >= 0){
            return res.status(400).json({
                message : `No need for Payment ${pkg.balance} from ${pkg.child.first_name} for ${pkg.idpackeges} balance is ${pkg.balance}`})
        }    
        const newPayment = await Payment.create({
                amount : Number(amount),
                packeges_idpackeges : pkg.idpackeges
            })    
        // update package balance
        if(newPayment){
            const newBalance = Number(pkg.balance) + Number(newPayment.amount)
            await pkg.update({
                balance : newBalance
            })
            return res.status(200).json({
                message : `Payment ${newPayment.amount} from ${pkg.child.first_name} for ${pkg.idpackeges}`
            })
        }
    }catch(error){
        console.error("Error recieving payment", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }}


// total amount paid this month
exports.totalPaidThisMonth = async(req,res)=>{
    try{
        let sum =0 ; 
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const endOfMonth = new Date(startOfMonth);
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);
        const payments = await Payment.findAll({
            where : {
                craetedAt: {
                    [Op.gte]: startOfMonth,
                    [Op.lt]: endOfMonth
                    }
            }
        })
        if(!payments || payments.length == 0){
            return res.status(400).json({
                message : "No payments for this month",
                data : sum
            })
        }

        for (let i = 0 ; i< payments.lentgh ; i++){
            sum+=payments.amount
        }
        return res.status(200).json({
            message : `total amount paid is ${sum})`,
            data : sum
        })
    }catch(error){
        console.log("server error", error.message);
        return res.status(500).json({
            message : "Server Error"
        })
    }
}
// Total Payment for a child
/* **************ADD Single Payment *****************
*/
exports.totalPaidByChild = async (req,res)=>{
    try{
        const{childID , thisMonth} = req.body;
        const payments = await Payment.findAll({
            include : [{
                model : Packages,
                as : "packeges_idpackeges_packege",
                where: {
                    children_idchild : childID
                }
            }]
        })
        if(!payments || payments.length == 0){
            return res.status(400).json({
                message : "Error fetching payments"
            })
        }
        return res.status(200).json({
            message :"Payemnts for child are:",
            payments
        })
    }catch(error){
        console.log("server error", error.message);
        return res.status(500).json({
            message : "Server Error"
        })
    }
}


// total unpaid amount for non zero balance pkg

// left amount to be paid for a package
exports.leftToBePaidByPkg = async (req,res)=>{
    try{
        const {pkgId} = req.body;
        const pkg = await Packages.findByPk(pkgId)
        if(!pkg){
            console.log("No pkg was found!")
            return res.status(400).json({
                message : "No Package was found"
            })
        }
        const leftToBePaid = pkg.balance * -1;
        return res.status(200).json({
            message : `Amount to be Paid ${leftToBePaid}`,
            data: leftToBePaid
        })
    }catch(error){
        return res.status(500).json({
            message : "Server Error"
        })
    }
}

//return payment dates for child
exports.paymentsDates = async (req,res)=>{
    try{
    const{childId} = req.body;
    const child = await Child.findByPk(childId);
    if(!child){
        console.log("No child was found");
        return res.statu(400).json({
            message : "No Child was found"
        })
    }
    const sessions = await Session.findAll({
        where : {
            session_type : ["1" , "0"],
            single_payment :{
                [Op.gte] : 0
            }
        },
        attributes : ["createdAt" , "single_payment" , "session_type" ] 
    })
/*
    const pksByChild = await Packages.findAll({
        where : {
            children_idchild : child.idchildren

        }
    })
*/
    const paymentsByChildPkgs = await Payment.findAll({
  include: [
    {
      model: Packages,
      as: "packeges_idpackeges_packege",
      required: true,
      attributes : ["idpackeges" , "package_name"],
      include: [
        {
          model: Child,
          as: "child",
          where: { idchildren: child.idchildren },
          attributes : []
        },
      ],
    },

],    attributes: ["createdAt"]
    })
    console.log(paymentsByChildPkgs)
    if(!paymentsByChildPkgs){
        return res.status(400).json({
            message : "No pkg for child "
        })
    }
    return res.status(200).json({
        message : "Pyaments were found ",
        data : paymentsByChildPkgs
    })
}catch(error){
    console.log(error.message)
    return res.status(500).json({
    message : "Server Error"
        })
}
}