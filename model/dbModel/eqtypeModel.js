const mongoose = require("mongoose");
const Equiment = require("./equipmentModel");
const eqtypeSchema = new mongoose.Schema({
  equipments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Equipment",
    },
  ],
  name: {
    type: String,
    unique: true,
    req: [true, "Equipment Type must have a name"],
  },
  status: {
    type: String,
    enum: ["Available", "Not Available"],
  },
  totalEquipments: {
    type: Number,
    default: 0,
  },
  issued: {
    type: Number,
    default: 0,
  },
});

const Eqtype = mongoose.model("Eqtype", eqtypeSchema);
module.exports = Eqtype;
