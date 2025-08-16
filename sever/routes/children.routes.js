const express = require("express");
const router = express.Router();

const children = require("../controllers/children.controller");
const { adminAuth, requireAuth } = require("../middleware/authMiddleware");

router.post("/createNewChild" , adminAuth, children.createChild);
router.get("/countAllChildren" ,requireAuth , children.countAllChildren);
router.get("/Childprofile" , requireAuth ,children.getChildProfile);
router.get("/getAllChildrenprofile" , requireAuth , children.getAllChildren);
router.put("/updateChildprofile" ,adminAuth, children.updateChildProfile);
router.get("/children-added-this-month" , requireAuth , children.countOfChildrenThisMonth);
router.get("/get-child-by" , requireAuth , children.findChild)
// delete child



module.exports = router ; 