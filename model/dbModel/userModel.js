const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name of the user should be specified"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },

    role: {
      type: String,
      enum: ["user", "admin", "superAdmin"],
      default: "user",
    },
    image: {
      type: String,
      default: null,
    },

    hostel: {
      type: String,
      default: null,
    },
    room: {
      type: String,
      default: "Not Specified",
    },
    rollNumber: {
      type: String,
    },

    admissionYear: {
      type: Number,
      max: [new Date().getFullYear(), "Invalid year of admission"],
    },
    program: {
      type: String,
      default: "Not Specified",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.index({ name: "text", email: "text" });

const User = mongoose.model("User", userSchema);
module.exports = User;
