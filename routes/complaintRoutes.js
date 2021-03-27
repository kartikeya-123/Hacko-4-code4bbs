const express = require("express");
const authLogic = require("./../model/businessLogic/authLogic");
const complaintController = require("./../controller/complaintController");
const router = express.Router();

router.use(authLogic.verifyJwtToken);

//Get All Complaints
router.get("/", complaintController.getAllComplaints);

//Get a single Complaint
router.get("/:id", complaintController.getAComplaint);

//Create a Complaint
router.post("/", authLogic.loggedInUser, complaintController.createComplaint);

//resolve a complaint
router.patch("/resolve/:id", complaintController.closeComplaint);

//add Remark to Complaint
router.patch("/remark/:id", complaintController.addRemarkToComplaint);

router.delete("/:id", complaintController.deleteComplaint);

module.exports = router;
