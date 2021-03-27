const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: true,
    enum: [0, 1, 2, 3, 4, 5, 6],
    unique: true,
  },
  day: {
    type: String,
    required: true,
    enum: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    unique: true,
  },
  breakfast: [String],
  lunch: [String],
  snacks: [String],
  dinner: [String],
});

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
