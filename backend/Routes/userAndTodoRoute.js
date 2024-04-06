const express = require("express");

const {
  registerUser,
  loginUser,
  currentUser,
} = require("../Controller/userController");

const errorHandler = require("../Middleware/errorHandler");
const token = require("../Middleware/validateToken");



const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/currentUser", token, currentUser);


router.use(errorHandler);

module.exports = router;
