const express = require("express");
const router = express.Router();

const sessionControler = require("../controllers/session.controller");
const { adminAuth } = require("../middleware/authMiddleware");

router.post("/booksession", adminAuth , sessionControler.bookSession);

module.exports = router ; 