const express = require("express");
const router = express.Router();

const Payment = require("../controllers/payment.controller");
const { adminAuth } = require("../middleware/authMiddleware");

router.post("/recievePayment" , adminAuth , Payment.addPayment);


module.exports = router ; 