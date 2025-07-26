const express = require("express");
const router = express.Router();
const { createEvent, getEvent, updateTaskOrAction } = require("../controllers/event.controller");
const verifyToken = require("../middleware/auth.middleware");
const permitRoles = require("../middleware/rbac.middleware");

router.post("/", verifyToken, permitRoles("admin", "lead"), createEvent);
router.get("/:id", verifyToken, getEvent);
router.patch("/:id/task", verifyToken, updateTaskOrAction);

module.exports = router;
