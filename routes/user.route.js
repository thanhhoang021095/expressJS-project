const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller")

router.get("/", userController.showUsers);

router.get("/search", userController.searchUser);

router.get("/create", userController.createUserForm);

router.post("/create", userController.createUserRequest);

router.get("/:uid", userController.viewUserInfo);

module.exports = router;