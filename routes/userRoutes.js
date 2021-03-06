const express = require("express");
const router = express.Router();

const userController = require("./../controller/userController.js");
const authLogic = require("./../model/businessLogic/authLogic");

router.patch(
  "/updateProfile",
  authLogic.verifyJwtToken,
  authLogic.loggedInUser,
  userController.updateProfile
);
router.get("/getUserWithEmail/:email", userController.getDetailsWithEmail);

router.get(
  "/",
  authLogic.verifyJwtToken,
  authLogic.loggedInUser,
  userController.getAllUsers
);
router.patch(
  "/profile",
  authLogic.verifyJwtToken,
  authLogic.loggedInUser,
  userController.updateProfile
);

router.post(
  "/tag",
  authLogic.verifyJwtToken,
  authLogic.loggedInUser,
  userController.createTag
);
router.get("/tag", userController.getAllTags);
router.get(
  "/profile",
  authLogic.verifyJwtToken,
  authLogic.loggedInUser,
  userController.aboutMe
);
router.get("/other", userController.getProfile);
router.patch(
  "/endorse/:id",
  authLogic.verifyJwtToken,
  authLogic.loggedInUser,
  userController.endorseUser
);

router.patch(
  "/clearEndorses",
  authLogic.verifyJwtToken,
  authLogic.loggedInUser,
  authLogic.restrictTo("admin"),
  userController.clearReports
);

module.exports = router;
