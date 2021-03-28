const Complaint = require("./../model/dbModel/complaintModel");

const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const { sendEmail } = require("../utils/sendEmail");

exports.getAllComplaints = catchAsync(async (req, res, next) => {
  const docs = await Complaint.find({ status: "pending" })
    .populate({ path: "student", select: "name room", model: "User" })
    .sort({ time: 1 });

  res.status(200).json({
    status: "success",
    results: docs.length,
    data: {
      docs,
    },
  });
});

exports.getAllComplaintsByStudent = catchAsync(async (req, res, next) => {
  const docs = await Complaint.find({
    status: "pending",
    student: req.user._id,
  })
    .populate({ path: "student", select: "name room", model: "User" })
    .sort({ time: 1 });

  res.status(200).json({
    status: "success",
    results: docs.length,
    data: {
      docs,
    },
  });
});

exports.getAComplaint = catchAsync(async (req, res, next) => {
  const doc = await Complaint.findById(req.params.id);

  if (!doc) {
    return next(
      new AppError("Complaint with the given id does not exist", 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: { doc },
  });
});

exports.createComplaint = catchAsync(async (req, res, next) => {
  const {
    subject,
    description,
    category,
    hostel,
    phone,
    availableTime,
  } = req.body;
  const student = req.user;
  const createdAt = Date.now();

  const newComplaint = await Complaint.create({
    student,
    createdAt,
    subject,
    description,
    category,
    hostel,
    phone,
    availableTime,
  });

  res.status(201).json({
    status: "success",
    message: "Complaint Logged in successfully",
    data: newComplaint,
  });
});

exports.addRemarkToComplaint = catchAsync(async (req, res, next) => {
  const { remark } = req.body;

  const complaint = await Complaint.findByIdAndUpdate(req.params.id, {
    remark,
  });

  if (!complaint) {
    return next(
      new AppError("Complaint with the given id does not exist", 404)
    );
  }

  res.status(200).json({
    status: "success",
    message: "Remark Added successfully",
  });
});

exports.closeComplaint = catchAsync(async (req, res, next) => {
  const closedComplaint = await Complaint.findByIdAndUpdate(req.params.id, {
    status: "solved",
  }).populate({ path: "student", select: "name email", model: "User" });

  if (!closedComplaint) {
    return next(
      new AppError("Complaint with the given id does not exist", 404)
    );
  }

  await sendEmail({
    email: closedComplaint.student.email,
    subject: `Complaint has been marked as solved.`,
    message: `Hey ${closedComplaint.student.name}, Your complaint oh the Hostel Portal having subject ${closedComplaint.subject} has been marked as solved by the admin.\n If you are having issues with this, you can contact the hostel office.\n Thank You !`,
    attachments: [],
  });

  res.status(200).json({
    status: "success",
    message: "Complaint Closed Successfully and Mail Sent to the Student",
    data: closedComplaint,
  });
});

exports.deleteComplaint = catchAsync(async (req, res, next) => {
  const complaint = await Complaint.findById(req.params.id).populate({
    path: "student",
    select: "name email",
    model: "User",
  });

  if (!complaint) {
    return next(
      new AppError("Complaint with the given id does not exist", 404)
    );
  }

  if (String(req.user._id) !== String(complaint.student._id)) {
    return next(
      new AppError(
        "Only the student who has lodged complaint can delete it",
        401
      )
    );
  }

  await Complaint.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    message: "Complaint has been deleted successfully",
  });
});

exports.upvoteAComplaint = catchAsync(async (req, res, next) => {
  const complaint = await Complaint.findById(req.params.id);

  if (!complaint) {
    return next(new AppError("No post with this id", 404));
  }
  const user_id = req.user.id;
  if (String(user_id) === String(complaint.student._id))
    return next(new AppError("You cannot upvote your complaint", 400));

  //Check if this user has already upvoted  if (yes) remove the upvote  if (no) down vote
  const checkUserUpvote = complaint.upvotedBy.indexOf(user_id);
  if (checkUserUpvote === -1) {
    complaint.upvotedBy.push(user_id);
    complaint.upvotes++;
  } else {
    complaint.upvotedBy.splice(checkUserUpvote, 1);
    complaint.upvotes--;
  }

  await complaint.save();
  res.status(200).json({
    status: "success",
    data: complaint,
  });
});
