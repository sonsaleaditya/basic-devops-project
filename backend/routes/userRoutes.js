const express = require("express");
const {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController.js");

const router = express.Router();

router.route("/").get(getUsers).post(addUser);
router.route("/:id").put(updateUser).delete(deleteUser);

module.exports = router;
