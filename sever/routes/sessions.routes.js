const express = require("express");
const router = express.Router();

const sessionControler = require("../controllers/session.controller");
const { adminAuth, requireAuth } = require("../middleware/authMiddleware");

router.post("/booksession" ,  requireAuth, sessionControler.bookSession);
router.get("/allSessionsCount" , sessionControler.countAllSession);
router.get("/allSessionsCountThisMonth" , sessionControler.sessionThisMonth);


module.exports = router ; 