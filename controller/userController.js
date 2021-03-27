const User = require("./../model/dbModel/userModel");
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
  let user = await User.findOne({ _id: req.query.id }).lean();

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

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const docs = await User.find({ publishStatus: true })
    .select("name email image room")
    .sort({ name: 1 })
    .lean();

  res.status(200).json({
    status: "success",
    results: docs.length,
    data: {
      docs,
    },
  });
});

exports.updateProfile = catchAsync(async(req,res,next) => {
  if(req.body.email || req.body.name) {
    return next(
      new AppError("You are not allowed to change name and email")
    );
  }

  // console.log(req.user);
  const changes = {
    phoneNumber : req.body.phoneNumber,
    hostel : req.body.hostelName,
    room : req.body.roomNumber,
    rollNumber : req.body.rollNumber,
    admissionYear : '20' + req.body.rollNumber[0] + req.body.rollNumber[1],
  }

  const updatedUser = await User.findByIdAndUpdate(req.user._id, changes, {
    new : true,
    runValidators : true,
  })

  res.status(200).json({
    status : 'success',
    updatedUserData : {
      updatedUser
    }
  })
})