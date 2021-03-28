const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "A Course Id must be specified"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "A Course must have a name"],
      unique: "true",
    },
    papers: [
      {
        name: String,
        year: String,
        link: String,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
