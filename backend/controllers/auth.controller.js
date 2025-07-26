const authService = require("../services/auth.service");

exports.register = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await authService.getUserById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.getUserById = async (req, res) => {
  try {
    // Only allow self or admin
    if (req.user.id !== req.params.id && !req.user.roles.includes("admin")) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const user = await authService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

exports.updateUser = async (req, res) => {
  try {
    // Only allow self or admin
    if (req.user.id !== req.params.id && !req.user.roles.includes("admin")) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const updatedUser = await authService.updateUser(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    await authService.deleteUser(req.user.id);
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await authService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.getUserByUsername = async (req, res) => {
  try {
    const user = await authService.getUserByUsername(req.params.username);
    if (!user) return res.status(404).json({ error: "User not found" });
    // Only return public fields
    const { name, username, profilePicture } = user;
    res.status(200).json({ name, username, profilePicture });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

exports.getUsersByRole = async (req, res) => {
  try {
    const users = await authService.getUsersByRole(req.params.roles);
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

exports.getUsersByPosition = async (req, res) => {
  try {
    const users = await authService.getUsersByPosition(req.params.position);
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}