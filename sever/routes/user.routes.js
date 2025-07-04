const express = require("express");
const router = express.Router();
const authController = require("../controllers/user.controller");
const { adminAuth } = require("../middleware/authMiddleware");


router.post("/signup", adminAuth,authController.signup);
//router.put("/update", adminAuth ,authController.update);
router.get("/login", authController.login);

module.exports = router;
