const { Packages, Child, Payment } = require('../models');

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

// total unpaid amount for non zero balance pkg

// Total Payment for a child

// amount paid per package per month

// left amount to be paid for a package

//return payment dates for child

// payment for sessions 