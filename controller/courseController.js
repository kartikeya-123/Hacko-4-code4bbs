const AppError = require("../utils/appError");
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

exports.addPapers = catchAsync(async (req, res, next) => {
  if (!req.body.name || !req.body.link) {
    return next(new AppError("Either name or link is missing", 403));
  }

  const newPaper = {
    name: req.body.name,
    link: req.body.link,
    year: req.body.year,
  };
  const course = await Course.findById(req.params.id);

  course.papers.push(newPaper);
  await course.save();

  res.status(201).json({
    status: "success",
    course,
  });
});
