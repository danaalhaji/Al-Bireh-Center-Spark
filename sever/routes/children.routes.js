const express = require("express");
const router = express.Router();

const children = require("../controllers/children.controller");
const { adminAuth } = require("../middleware/authMiddleware");

router.post("/createNewChild" , adminAuth, children.createChild);

module.exports = router ; 