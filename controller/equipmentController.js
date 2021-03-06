const EqType = require("./../model/dbModel/eqtypeModel");
const Equipment = require("./../model/dbModel/equipmentModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.createEqType = catchAsync(async (req, res, next) => {
  if (!req.body.eqType) {
    return next(new AppError("No eqType given", 503));
  }
  const name = req.body.eqType;
  const newEqtype = await EqType.create({ name });

  res.status(200).json({
    status: "sucesss",
    EquipmentType: newEqtype,
  });
});

exports.getAllEquimentTypes = catchAsync(async (req, res, next) => {
  const docs = await EqType.find().populate({
    path: "equipments",
    model: "Equipment",
  });

  res.status(200).json({
    status: "success",
    results: docs.length,
    data: {
      docs,
    },
  });
});

exports.getAllEquiments = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  const docs = await EqType.findById(id).populate({
    path: "equipments",
    model: "Equipment",
    populate: { path: "issuedTo", model: "User" },
  });

  if (!docs) {
    res.status(404).json({
      status: "fail",
      message: "No equipment type with the given id exists",
    });
  }
  let issuedEquipments = [];
  let availableEquipments = [];

  for (let equip of docs.equipments) {
    if (equip.status == "Available") {
      availableEquipments.push(equip);
    } else {
      issuedEquipments.push(equip);
    }
  }

  docs.totalEquipments = docs.equipments.length;
  docs.issued = issuedEquipments.length;

  await docs.save();

  res.status(200).json({
    status: "success",
    results: docs.length,
    issuedEquipments,
    availableEquipments,
  });
});

exports.getEquipment = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  const docs = await Equipment.findById(id).populate({
    path: "type",
    model: "Eqtype",
  });

  if (!docs) {
    res.status(404).json({
      status: "fail",
      message: "No equipment with the given id exists",
    });
  }

  res.status(200).json({
    status: "success",
    results: docs.length,
    data: {
      docs,
    },
  });
});

exports.createEquipment = catchAsync(async (req, res, next) => {
  const data = req.body;
  const newEquipment = await Equipment.create({ ...data });

  await EqType.findByIdAndUpdate(data.type, {
    $inc: { totalEquipments: 1 },
    $push: { equipments: newEquipment._id },
  });

  res.status(201).json({
    status: "sucesss",
    equipment: newEquipment,
  });
});

exports.userIssueStatus = catchAsync(async (req, res, next) => {
  const userIssuedEquipment = await Equipment.find({
    issuedTo: req.user._id,
  }).populate({
    path: "type",
    model: "Eqtype",
  });

  res.status(200).json({
    issued: userIssuedEquipment,
  });
});

exports.issueEquipment = catchAsync(async (req, res, next) => {
  // We will get id of the equipment that needs to be issued
  const equipment = await Equipment.findById(req.body.id);
  if (!equipment) {
    return next(new AppError("No equipment", 403));
  }

  const userIssuedEquipment = await Equipment.find({
    issuedTo: req.user._id,
  }).populate({
    path: "type",
    model: "Eqtype",
  });

  if (userIssuedEquipment.length != 0) {
    console.log(userIssuedEquipment);
    res.status(200).json({
      status: "Fail",
      userIssuedEquipment,
    });
  } else {
    const user = req.user;
    equipment.issuedTo = user._id;
    equipment.issuedDate = new Date().toLocaleString();
    equipment.status = "Issued";

    const equipmentType = await EqType.findByIdAndUpdate(equipment.type, {
      $inc: { issued: 1 },
    });

    await equipment.save();
    res.status(200).json({
      status: "success",
      data: equipment,
    });
  }
});

exports.returnEquipment = catchAsync(async (req, res, next) => {
  const user = req.user;

  const equipment = await Equipment.findById(req.body.id);
  console.log(JSON.stringify(equipment.issuedTo), JSON.stringify(user._id));

  if (JSON.stringify(equipment.issuedTo) !== JSON.stringify(user._id)) {
    return next(new AppError("Sorry you have not issued this equipment", 403));
  }

  equipment.status = "Available";
  equipment.issuedTo = null;
  equipment.issuedDate = null;

  const equipmentType = await EqType.findByIdAndUpdate(equipment.type, {
    $inc: { issued: -1 },
  });

  await equipment.save();

  res.status(200).json({
    status: "success",
    message: "sucessfully returned",
  });
});
