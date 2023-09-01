const mongoose = require("mongoose");
const generateToken = require("../helpers/generateToken");
const hashPassword = require("../helpers/hashPassword");
const { User } = require("../models/User.model");

const signUp = async (req, res) => {
  const { username, email, role, password, phone} = req.body;
  const emailLC = email.toLowerCase();
  const regexP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!regexP.test(password)) {
    return res.status(401).json({
      message:
        "Password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter",
    });
  }
  const hashedPassword = hashPassword(password);
  try {
    const user = new User({
      username,
      email: emailLC,
      password: hashedPassword,
      phone,
      role,
    });
    const response = await user.save();
    const token = generateToken(response);
    return res.status(201).json({
      message: `User created`,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      detail: err,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const emailLowerCase = email.toLowerCase();
  const passwordHash = hashPassword(password);
  try {
    const userValidated = await User.findOne({ email: emailLowerCase });
    if (!userValidated) {
      return res.status(401).json({
        message: "Usuario no registrado",
      });
    }
    if (userValidated.password === passwordHash) {
      const token = generateToken(userValidated);
      return res.status(200).json({
        message: "User logged in successfully",
        userid: userValidated._id,
        token,
      });
    } else {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteUserById = async (req, res) => {
  const { _id } = req.params;
  try {
    const resp = await User.findByIdAndDelete(_id);
    if (resp) {
      return res.status(200).json({
        messege: "User deleted",
        detail: resp,
      });
    }
    return res.status(404).json({
      message: "User not found",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

const updateUserById = async (req, res) => {
  const { _id } = req.params;
  const { userUpdated } = req.body;
  try {
    const resp = await User.findByIdAndUpdate(
      _id,
      { ...userUpdated },
      { new: true }
    );
    if (resp) {
      return res.status(200).json({
        message: "User updated",
        detail: resp,
      });
    }
    return res.status(404).json({
      message: "User not found",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const resp = await User.find();
    return res.status(200).json({
      message: "ok",
      detail: resp,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      detail: err,
    });
  }
};

module.exports = {
  signUp,
  login,
  deleteUserById,
  updateUserById,
  getUsers,
};
