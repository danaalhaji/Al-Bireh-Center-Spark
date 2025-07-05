const express = require("express");
const router = express.Router();

const specController = require("../controllers/spec.controller");
const { adminAuth } = require("../middleware/authMiddleware");


router.post("/addSpec"  ,adminAuth ,specController.addSpec );
router.put("/deleteSpec" , adminAuth , specController.deleteSpec);
router.put("/enableSpec" , adminAuth , specController.enableSpec);
router.get("/allSpec" , adminAuth , specController.allSpec);
router.get("/allSpecwithTR" , adminAuth , specController.allSpecWithTrainers);
router.get("/countAllSpecwith" , adminAuth , specController.countAllSpec);
router.get("/AllTrainInSpec" , adminAuth , specController.getAllTrainInSpec);

module.exports = router;