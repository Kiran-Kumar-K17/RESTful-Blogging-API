import User from "../models/user.js";
import jwt from "jsonwebtoken";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

async function registerUser(req, res) {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = signToken(newUser._id);

    // 2. Hide password from output
    newUser.password = undefined;

    res.status(201).json({
      success: true,
      token,
      message: "User created successfully!",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
}
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // 1. Check if email and password were provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    // 2. Find user & explicitly ask for the password (since we hid it in the Schema)
    const user = await User.findOne({ email }).select("+password");

    // 3. Check if user exists && password is correct
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    // 4. If everything is OK, send a fresh token
    const token = signToken(user._id);

    res.status(200).json({
      success: true,
      token,
      message: "Logged in successfully!",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
export { registerUser, loginUser };
