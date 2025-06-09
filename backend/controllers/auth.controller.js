const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const registerUser = async (req, res) => {
  try {
    const {name,email,password,profileImageUrl} = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl
      });
      const token = generateToken(newUser._id);
      res.status(201).json({user:{_id:newUser._id,name:newUser.name,email:newUser.email,profileImageUrl:newUser.profileImageUrl},token});
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const  {email,password} = req.body;
    const user = await User.findOne({ email });
    if(!user) {
      return res.status(400).json({ message: "Invalid emaill or password" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = generateToken(user._id);
    res.status(200).json({user:{ _id: user._id, name: user.name,
      email: user.email, profileImageUrl: user.profileImageUrl}, token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({user});
  } catch (error) {
    res.status(500).json({ message: "Error getting user profile" });
  }
};


module.exports = { registerUser, loginUser, getUserProfile };
