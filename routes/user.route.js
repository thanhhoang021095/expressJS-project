const express = require("express");
const multer = require("multer");
const router = express.Router();
const userController = require("../controllers/user.controller");
const validUser = require("../validation/validation");
const upload = multer({dest: "./public/images/"})

router.get("/", userController.showUsers);

router.get("/search", userController.searchUser);

router.get("/create", userController.createUserForm);

router.get("/:uid", userController.viewUserInfo);

router.post("/create",
    upload.single('avatar'), 
    validUser.validUser, 
    userController.createUserRequest
)
module.exports = router;