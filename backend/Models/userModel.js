const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    username:{
      type: String,
      required: [true, "Please enter your username"],
      unique: [true, "Username has already been taken"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: [true, "Email has already been taken"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    checkbox: {
      type: Boolean,
      default: false 
    },
    profilePicture: {
      type: String, 
    },
    location: {
      type: String,
    },
    lookingFor: {
      type: [{
        type: String,
        enum: ["work", "hire", "inspiration"]
      }],
      default: [],
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model("User", userSchema);
