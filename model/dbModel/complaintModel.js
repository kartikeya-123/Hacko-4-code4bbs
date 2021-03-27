const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Complaint must have a user"],
  },
  hostel: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  subject: {
    type: String,
    required: [true, "A Complaint should have a subject"],
  },
  description: {
    type: String,
    required: [true, "A Complaint should have a description"],
  },
  category: {
    type: String,
    required: [true, "A Complaint should be of some category"],
    enum: ["civil", "mess", "electrical"],
  },
  status: {
    type: String,
    required: [true, "A complaint should have a status"],
    default: "pending",
    enum: ["pending", "solved"],
  },
  remark: {
    type: String,
  },
});

const Complaint = mongoose.model("Complaint", complaintSchema);
module.exports = Complaint;
