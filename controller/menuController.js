const Menu = require("./../model/dbModel/menuModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getWeeklyMenu = catchAsync(async (req, res, next) => {
  const docs = await Menu.find().sort({ index: 1 });
  if (docs.length !== 7) {
    return next(new AppError("Some Error Ocurred while fetching Menu", 500));
  }
  res.status(200).json({
    status: "success",
    results: docs.length,
    data: {
      docs,
    },
  });
});

exports.getMenu = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const doc = await Menu.findOne({ index: id });

  res.status(200).json({
    status: "success",
    data: {
      doc,
    },
  });
});

exports.updateMenu = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const breakfast = req.body.breakfast.split(",");
  const lunch = req.body.lunch.split(",");
  const dinner = req.body.dinner.split(",");
  const snacks = req.body.snacks.split(",");

  const doc = await Menu.findOneAndUpdate(
    { index: id },
    {
      breakfast,
      lunch,
      snacks,
      dinner,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      doc,
    },
  });
});

// exports.createMenu = catchAsync(async (req, res, next) => {
//   const { index, day } = req.body;
//   const breakfast = req.body.breakfast.split(",");
//   const lunch = req.body.lunch.split(",");
//   const dinner = req.body.dinner.split(",");
//   const snacks = req.body.snacks.split(",");

//   const doc = await Menu.create({
//     index,
//     day,
//     breakfast,
//     lunch,
//     snacks,
//     dinner,
//   });

//   res.status(200).json({
//     status: "success",
//     data: {
//       doc,
//     },
//   });
// });
