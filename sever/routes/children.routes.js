const express = require("express");
const router = express.Router();

const children = require("../controllers/children.controller");
const { adminAuth } = require("../middleware/authMiddleware");

router.post("/createNewChild" , adminAuth, children.createChild);
router.get("/countAllChildren" , children.countAllChildren);
router.get("/Childprofile" , children.getChildProfile);
router.get("/getAllChildrenprofile" , children.getAllChildren);
router.put("/updateChildprofile" ,adminAuth, children.updateChildProfile);


module.exports = router ; 