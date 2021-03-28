const express = require("express");
const router = express.Router();

const timeTableController = require("./../controller/timetableController");
const authLogic = require("./../model/businessLogic/authLogic");

router.get(
  "/",
  authLogic.verifyJwtToken,
  authLogic.loggedInUser,
  timeTableController.getTimeTable
);

router.post(
  "/",
  authLogic.verifyJwtToken,
  authLogic.restrictTo("admin"),
  authLogic.loggedInUser,
  timeTableController.createTimeTable
);

module.exports = router;
