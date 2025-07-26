const express = require("express");
const router = express.Router();
const { register, login, getUser, updateUser, deleteUser, getUserById, getAllUsers, getUserByUsername } = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);
const verifyToken = require("../middleware/auth.middleware");
const permitRoles = require("../middleware/rbac.middleware");

router.get("/user", verifyToken, permitRoles("admin", "member"), getUser);
router.patch("/user", verifyToken, permitRoles("admin", "member"), updateUser);
router.delete("/user", verifyToken, permitRoles("admin", "member"), deleteUser);
router.get("/user/:id", verifyToken, permitRoles("admin", "member"), getUserById);
router.get("/users", verifyToken, permitRoles("admin", "member"), getAllUsers);
router.get("/profile/:username", getUserByUsername);

module.exports = router;
