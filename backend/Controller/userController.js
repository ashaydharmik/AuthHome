const asyncHandler = require("../Middleware/asyncHandler");
const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//user registration
const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password, checkbox } = req.body;

  if (!name || !email || !password || !username || !checkbox) {
    res.status(400).json({ message: "Please enter all the fields" });
    return;
  }

  if (password.length < 6) {
    res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
    return;
  }

  const availableEmail = await User.findOne({ email });
  if (availableEmail) {
    res.status(400).json({ message: "Email has already been taken" });
    return;
  }

  const availableUsername = await User.findOne({ username });
  if (availableUsername) {
    res.status(400).json({ message: "Username has already been taken" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    username,
    email,
    password: hashedPassword,
    checkbox: true,
  });

  if (user) {
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.ACCESS_KEY
    );
    res.status(201).json({
      message: "User successfully created",
      _id: user.id,
      name: user.name,
      token,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

//user login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password, checkbox } = req.body;
  if (!email || !password || !checkbox) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        password: user.password,
        name: user.name,
        checkbox: true,
      },
      process.env.ACCESS_KEY
    );
    res.status(201).json({
      message: "User Successfully logIn",
      _id: user._id,
      userName: user.name,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email and password");
  }
});

//fetching current user
const currentUser = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  const user = await User.findById(_id);

  if (!user) {
    res.status(404).json({ success: false, message: "User not found" });
    return;
  }

  res.status(200).json({ success: true, user });
});

const setUserInfo = asyncHandler(async (req, res) => {
  const { profilePicture, location } = req.body;
  const { _id } = req.params;

  if (!profilePicture && !location) {
    res
      .status(400)
      .json({
        message: "Please provide profile picture or location to update",
      });
    return;
  }

  let user = await User.findById(_id);

  if (!user) {
    console.error("User not found in the database.");
    res.status(404).json({ message: "User not found" });
    return;
  }

  if (profilePicture) {
    user.profilePicture = profilePicture;
  }
  if (location) {
    user.location = location;
  }

  await user.save();

  res.json({ message: "Profile updated successfully", user: user });
});

const setUserCareer = asyncHandler(async (req, res) => {
  const { lookingFor } = req.body;
  const { _id } = req.params;

  if (!lookingFor) {
    res.status(400).json({ message: "Please select what you are looking for" });
    return;
  }

  let user = await User.findById(_id);

  if (!user) {
    console.error("User not found in the database.");
    res.status(404).json({ message: "User not found" });
    return;
  }

  if (lookingFor) {
    user.lookingFor = lookingFor;
  }

  await user.save();

  res.json({ message: "Profile updated successfully", user: user });
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  setUserInfo,
  setUserCareer,
};
