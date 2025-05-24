const express = require("express");
const airlineController = require("../controllers/airlineController");
const { verify, verifyAdmin } = require("../auth");

const router = express.Router();

router.post("/", verify, verifyAdmin, airlineController.addAirline);
router.put("/:airlineId", verify, verifyAdmin, airlineController.updateAirline);
router.get("/:airlineId", airlineController.getAirlineDetails);

module.exports = router;
