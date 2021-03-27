const express = require("express");
const authLogic = require("./../model/businessLogic/authLogic");
const complaintController = require("./../controller/complaintController");
const router = express.Router();

router.use(authLogic.verifyJwtToken);

//Get All Complaints
router.get("/", complaintController.getAllComplaints);

//Get all Complaints by a particular Student
router.get(
  "/myComplaints",
  authLogic.loggedInUser,
  complaintController.getAllComplaintsByStudent
);

//Get a single Complaint
router.get("/:id", complaintController.getAComplaint);

//Create a Complaint
router.post("/", authLogic.loggedInUser, complaintController.createComplaint);

//resolve a complaint
router.patch(
  "/resolve/:id",
  authLogic.loggedInUser,
  complaintController.closeComplaint
);

//add Remark to Complaint
router.patch("/remark/:id", complaintController.addRemarkToComplaint);

router.delete(
  "/:id",
  authLogic.loggedInUser,
  complaintController.deleteComplaint
);

module.exports = router;
