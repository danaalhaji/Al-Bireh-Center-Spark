const express = require("express");
const router = express.Router();

const Packages = require("../controllers/packages.controller");
const { adminAuth } = require("../middleware/authMiddleware");

router.post("/addPackage" , adminAuth , Packages.createPackage);


module.exports = router ; 