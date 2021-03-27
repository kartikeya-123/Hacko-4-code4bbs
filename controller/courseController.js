const Course = require("./../model/dbModel/courseModel");
const catchAsync = require("./../utils/catchAsync");

exports.createCourse = catchAsync(async (req, res, next) => {
  const newCourse = await Course.create({ ...req.body.course });

  res.status(201).json({
    status: "sucesss",
    course: newCourse,
  });
});

exports.getAllCourses = catchAsync(async (req, res, next) => {
  const courses = await Course.find();

  res.status(201).json({
    status: "sucesss",
    courses,
  });
});
