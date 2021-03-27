const User = require("./../model/dbModel/userModel");
const Tag = require("./../model/dbModel/tagModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.aboutMe = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError("This user is not present", 401));
  }

  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
});

exports.getProfile = catchAsync(async (req, res, next) => {
  let user = await User.findOne({ _id: req.query.id }).populate({
    path: "tags",
    model: "Tag",
    select: "name group",
  });

  if (!user) {
    return next(new AppError("This user is not present", 400));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.getDetailsWithEmail = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.params.email });
  res.status(200).json({
    status: "success",
    user,
  });
  next();
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const docs = await User.find().sort({ name: 1 }).lean();

  res.status(200).json({
    status: "success",
    results: docs.length,
    data: {
      docs,
    },
  });
});

exports.updateProfile = catchAsync(async (req, res, next) => {
  if (req.body.email || req.body.name) {
    return next(new AppError("You are not allowed to change name and email"));
  }

  // // console.log(req.user);
  // const changes = {
  //   phoneNumber: req.body.phoneNumber,
  //   hostel: req.body.hostelName,
  //   room: req.body.roomNumber,
  //   rollNumber: req.body.rollNumber,
  //   admissionYear: "20" + req.body.rollNumber[0] + req.body.rollNumber[1],
  //   tags: req.body.tags,
  // };

  const updateUser = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  }).populate({
    path: "tags",
    model: "Tag",
    select: "name group",
  });

  // console.log(updatedUser);
  res.status(200).json({
    status: "success",
    data: {
      user: updateUser,
    },
  });
});

exports.createTag = catchAsync(async (req, res, next) => {
  const tagName = req.body.name;
  const tagGroup = req.body.group;

  if (!tagName || !tagGroup) {
    return next(new AppError("Either name or group of tag is missing", 400));
  }
  const newTag = await Tag.create({
    name: tagName,
    group: tagGroup,
  });
  if (!newTag) {
    return next(new AppError("A problem occurred while creating the tag", 500));
  }
  res.status(200).json({
    status: "success",
    tag: newTag,
  });
});

exports.getAllTags = catchAsync(async (req, res, next) => {
  const docs = await Tag.find({}).lean();

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: docs.length,
    data: {
      docs,
    },
  });
});
