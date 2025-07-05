const express = require("express");
const router = express.Router();

const timesController = require("../controllers/availableTimes.controller");
const { adminAuth } = require("../middleware/authMiddleware");


router.post("/addTimes", adminAuth , timesController.createTimesForTrainer);
