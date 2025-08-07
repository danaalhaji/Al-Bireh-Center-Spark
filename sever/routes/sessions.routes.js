const express = require("express");
const router = express.Router();

const sessionControler = require("../controllers/session.controller");
const { adminAuth, requireAuth } = require("../middleware/authMiddleware");

router.post("/booksession" ,  adminAuth , requireAuth, sessionControler.bookSession);
router.get("/allSessionsCount" , requireAuth, sessionControler.countAllSession);
router.get("/allSessionsCountThisMonth" , requireAuth, sessionControler.sessionThisMonth);
router.get("/allSessionsfor" , requireAuth, sessionControler.allSessionsThisMonthForTrainer);

module.exports = router ; 