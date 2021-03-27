const express = require('express');
const router = express.Router();

const userController = require("./../controller/userController.js");
const authLogic = require("./../model/businessLogic/authLogic");

router.patch("/updateProfile",authLogic.verifyJwtToken,authLogic.loggedInUser,userController.updateProfile);
router.get("/getUserWithEmail/:email",userController.getDetailsWithEmail);
module.exports = router;