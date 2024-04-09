const express = require("express");

const {
  registerUser,
  loginUser,
  currentUser,setUserInfo, setUserCareer
} = require("../Controller/userController");

const errorHandler = require("../Middleware/errorHandler");
const token = require("../Middleware/validateToken");



const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/currentUser/:_id", token, currentUser);

router.put("/updateInfo/:_id",token, setUserInfo)

router.put("/updateLookingFor/:_id",token, setUserCareer)


router.use(errorHandler);

module.exports = router;
