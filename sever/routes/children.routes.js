const express = require("express");
const router = express.Router();

const children = require("../controllers/children.controller");
const { adminAuth, requireAuth } = require("../middleware/authMiddleware");

router.post("/createNewChild" , adminAuth, children.createChild);
router.get("/countAllChildren" ,requireAuth , children.countAllChildren);
router.get("/Childprofile" , requireAuth ,children.getChildProfile);
router.get("/getAllChildrenprofile" , requireAuth , children.getAllChildren);
router.put("/updateChildprofile" ,adminAuth, children.updateChildProfile);


module.exports = router ; 