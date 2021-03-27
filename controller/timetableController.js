const TimeTable = require("./../model/dbModel/timeTableModel");
const catchAsync = require("./../utils/catchAsync");

exports.createTimeTable = catchAsync(async (req, res, next) => {
  const newTimeTable = await TimeTable.create({ ...req.body.timetable });

  res.status(201).json({
    status: "sucesss",
    timetable: newTimeTable,
  });
});

exports.getTimeTable = catchAsync(async (req, res, next) => {
  const timeTable = await TimeTable.find({
    year: req.user.admissionYear,
    branch: req.user.branch,
  }).populate({
    path: "course",
    model: "Course",
  });

  res.status(201).json({
    status: "sucesss",
    timeTable,
  });
});
