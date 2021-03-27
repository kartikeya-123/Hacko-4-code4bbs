const mongoose = require("mongoose");
const User = require("./userModel");
const EqType = require("./eqtypeModel");
const equipmentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Issued", "Available"],
    default: "Available",
  },
  issuedTo: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  issuedDate: {
    type: String,
  },
  type: {
    type: mongoose.Schema.ObjectId,
    ref: "Eqtype",
    req: [true, "Equipment must have a type"],
  },
  history: [
    {
      issuedDate: Date,
      issuedTo: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    },
  ],
});

const Equipment = mongoose.model("Equipment", equipmentSchema);
module.exports = Equipment;
