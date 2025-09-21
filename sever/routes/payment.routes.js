const express = require("express");
const router = express.Router();

const Payment = require("../controllers/payment.controller");
const { adminAuth, requireAuth } = require("../middleware/authMiddleware");

router.post("/recievePayment" , adminAuth , Payment.addPayment);
router.get("/total-paid-this-month" , adminAuth , Payment.totalPaidThisMonth);
router.get("/payment-paid-by-child", adminAuth , Payment.totalPaidByChild);
router.get("/left-to-be-paid" , adminAuth , Payment.leftToBePaidByPkg);
router.get("/payments-dates" , adminAuth , Payment.paymentsDates);


module.exports = router ; 