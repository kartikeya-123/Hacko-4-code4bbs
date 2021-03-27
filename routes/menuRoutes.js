const express = require("express");
const authLogic = require("./../model/businessLogic/authLogic");
const menuController = require("./../controller/menuController");
const router = express.Router();

// router.post("/", menuController.createMenu);

router.use(authLogic.verifyJwtToken);

//Get Full Menu
router.get("/", menuController.getWeeklyMenu);

router.get("/menu/:id", menuController.getMenu);

//Update Menu on a Day
router.patch(
  "/menu/:id",
  authLogic.restrictTo("admin"),
  authLogic.loggedInUser,
  menuController.updateMenu
);

module.exports = router;
