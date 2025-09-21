const express = require("express");
const router = express.Router();

const sessionControler = require("../controllers/session.controller");
const { adminAuth, requireAuth } = require("../middleware/authMiddleware");

router.post("/booksession" ,  adminAuth , requireAuth, sessionControler.bookSession);
router.get("/allSessionsCount" , requireAuth, sessionControler.countAllSession);
router.get("/allSessionsCountThisMonth" , requireAuth, sessionControler.sessionThisMonth);
router.get("/allSessionsfor" , requireAuth, sessionControler.allSessionsThisMonthForTrainer);
router.get("/allSessionsfortrainer" , requireAuth, sessionControler.getSessionsForTrainer);
router.get("/all-done-sessions-for-trainer" , requireAuth , sessionControler.getDoneSessionsForTrainer);
router.get("/all-done-sessions-for-child" , requireAuth , sessionControler.getDoneSessionsForChild);
router.get("/all-sessions-for-child" , requireAuth , sessionControler.getAllSessionsForChild);
router.get("/sessions-for-pkg" , requireAuth , sessionControler.findSessionsForPkg);
router.patch("/add-inital-assment" , adminAuth , sessionControler.addInitialAssment);
// update appointment for session
router.patch("/update-session" , adminAuth , sessionControler.updateSession);
router.get("/view-inital-assement" , requireAuth , sessionControler.viewInitialassement);
// single payment
module.exports = router ; 