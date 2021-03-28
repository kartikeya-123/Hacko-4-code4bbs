const express = require("express");
const router = express.Router();

const courseController = require("./../controller/courseController");
const authLogic = require("./../model/businessLogic/authLogic");

router.get(
  "/",
  authLogic.verifyJwtToken,
  // authLogic.restrictTo("admin"),
  authLogic.loggedInUser,
  courseController.getAllCourses
);

router.post(
  "/",
  authLogic.verifyJwtToken,
  authLogic.restrictTo("admin"),
  authLogic.loggedInUser,
  courseController.createCourse
);

router.post(
  "/paper/:id",
  authLogic.verifyJwtToken,
  authLogic.loggedInUser,
  courseController.addPapers
);

module.exports = router;
