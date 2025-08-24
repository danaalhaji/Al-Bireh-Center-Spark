const express = require("express");
const router = express.Router();

const Packages = require("../controllers/packages.controller");
const { adminAuth, requireAuth } = require("../middleware/authMiddleware");

router.post("/addPackage" , adminAuth , Packages.createPackage);
router.get("/view-package-details" , requireAuth , Packages.viewPackageForaChild);
router.get("/all-packgaes-for-child" , requireAuth , Packages.pkgByChild);
router.get("/number-of-done-sessions-per-package", requireAuth , Packages.numberOfDoneSessions);

module.exports = router ; 