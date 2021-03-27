const express = require("express");
const router = express.Router();

const userController = require("./../controller/userController.js");
const authLogic = require("./../model/businessLogic/authLogic");

router.get(
  "/",
  authLogic.verifyJwtToken,
  authLogic.loggedInUser,
  userController.getAllUsers
);
router.patch(
  "/updateProfile",
  authLogic.verifyJwtToken,
  authLogic.loggedInUser,
  userController.updateProfile
);
module.exports = router;
