const express = require("express");
const router = express.Router();

const equipmentController = require("./../controller/equipmentController");
const authLogic = require("./../model/businessLogic/authLogic");

router.get("/eqtype", equipmentController.getAllEquimentTypes);
router.get("/eqtype/:id", equipmentController.getAllEquiments);
router.post("/eqtype", equipmentController.createEqType);

router.get("/eq/:id", equipmentController.getEquipment);
router.post("/eq/", equipmentController.createEquipment);
router.patch(
  "/issue",
  authLogic.verifyJwtToken,
  authLogic.loggedInUser,
  equipmentController.issueEquipment
);

module.exports = router;
