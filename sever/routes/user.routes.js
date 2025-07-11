const express = require("express");
const router = express.Router();
const authController = require("../controllers/user.controller");
const { adminAuth } = require("../middleware/authMiddleware");


router.get("/login", authController.login);
router.post("/register", adminAuth,authController.signup);
router.put("/update", adminAuth ,authController.updateTrainer);
router.get("/delete", adminAuth ,authController.deleteUser);
router.get("/getAllTrainers", adminAuth ,authController.getAllTrainers);
router.get("/getTrainer", adminAuth ,authController.findTrainByNatId);

module.exports = router;
