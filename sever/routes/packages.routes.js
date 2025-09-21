const express = require("express");
const router = express.Router();

const Packages = require("../controllers/packages.controller");
const { adminAuth, requireAuth } = require("../middleware/authMiddleware");

router.post("/addPackage" , adminAuth , Packages.createPackage);
router.get("/view-package-details" , requireAuth , Packages.viewPackageForaChild);
router.get("/all-packgaes-for-child" , requireAuth , Packages.pkgByChild);
router.get("/number-of-done-sessions-per-package", requireAuth , Packages.numberOfDoneSessions);
router.get("/package-by-child" , requireAuth , Packages.pkgByChild);
router.put("/add-progress-rate" , adminAuth , Packages.addProgressRate)
router.get("/child-In-created-date", adminAuth, Packages.allPKGandCratedDateChild);
router.get("/trainers-in-pkg" , adminAuth, Packages.findTrainersPerPackage)
module.exports = router ; 