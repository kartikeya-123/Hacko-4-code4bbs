const mongoose = require("mongoose");

const timeTableSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      req: [true, "An year is required"],
    },
    branch: {
      type: String,
      enum: ["CSE", "ECE", "EE", "ME", "MM"],
      req: [true, "A branch is required"],
    },
    courseList: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Course",
      },
    ],
    mon: [
      {
        hour: Number,
        course: {
          type: mongoose.Schema.ObjectId,
          ref: "Course",
          req: [true, "Course ref is required"],
        },
      },
    ],
    tue: [
      {
        hour: Number,
        course: {
          type: mongoose.Schema.ObjectId,
          ref: "Course",
          req: [true, "Course ref is required"],
        },
      },
    ],
    wed: [
      {
        hour: Number,
        course: {
          type: mongoose.Schema.ObjectId,
          ref: "Course",
          req: [true, "Course ref is required"],
        },
      },
    ],
    thu: [
      {
        hour: Number,
        course: {
          type: mongoose.Schema.ObjectId,
          ref: "Course",
          req: [true, "Course ref is required"],
        },
      },
    ],
    fri: [
      {
        hour: Number,
        course: {
          type: mongoose.Schema.ObjectId,
          ref: "Course",
          req: [true, "Course ref is required"],
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const TimeTable = mongoose.model("Timetable", timeTableSchema);
module.exports = TimeTable;
