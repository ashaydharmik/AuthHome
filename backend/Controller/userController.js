const asyncHandler = require("../Middleware/asyncHandler");
const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//user registration
const registerUser = asyncHandler(async (req, res) => {
  const { name,username, email, password ,checkbox} = req.body;

  if (!name || !email || !password || !username || !checkbox) {
    res.status(400).json({ message: "Please enter all the fields" });
    return;
  }

 

  const availableEmail = await User.findOne({ email});
  if (availableEmail) {
    res.status(400).json({ message: "Email has already been taken" });
    return;
  }

  const availableUsername = await User.findOne({username});
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
    checkbox:true
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
  const { email, password,   checkbox } = req.body;
  if (!email || !password || !checkbox) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.name,
        checkbox:true
      },
      process.env.ACCESS_KEY
    );
    res.status(201).json({
      message: "User Successfully logIn",
      id: user.id,
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
  try {
    console.log("Decoded Token:", req.user);
    const { name } = req.user;

    const user = await User.findOne({ name });

    if (!user) {
      console.error("User not found in the database.");
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      userName: user.name,
    }).message("User found");
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { registerUser, loginUser, currentUser };
