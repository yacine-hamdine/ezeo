const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.registerUser = async (data) => {
  const { name, email, password, username, roles, position } = data;

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) throw new Error("Email or username already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name, email, username, password: hashedPassword, roles, position,
  });

  return { message: "User registered successfully" };
};

exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, roles: user.roles },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      username: user.username,
      position: user.position,
      profilePicture: user.profilePicture,
    }
  };
};

exports.getUserById = async (userId) => {
  const user = await User.findById(userId)
    .select("-password")
    .lean();
  if (!user) throw new Error("User not found");
  return user;
};

exports.updateUser = async (userId, data) => {
  const user = await User.findByIdAndUpdate(userId, data, { new: true });
  if (!user) throw new Error("User not found");
  return user;
};

exports.deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) throw new Error("User not found");
  return user;
};

exports.getAllUsers = async () => {
  const users = await User.find().select("-password").lean();
  return users;
};

exports.getUserByUsername = async (username) => {
  const user = await User.findOne({ username }).select("-password").lean();
  if (!user) throw new Error("User not found");
  return user;
}

exports.getUsersByRole = async (role) => {
  const users = await User.find({ roles: role }).select("-password").lean();
  if (users.length === 0) throw new Error("No users found with this role");
  return users;
}

exports.getUsersByPosition = async (position) => {
  const users = await User.find({ position }).select("-password").lean();
  if (users.length === 0) throw new Error("No users found with this position");
  return users;
}