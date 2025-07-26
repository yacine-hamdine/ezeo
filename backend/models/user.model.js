const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  username: { type: String, unique: true },
  roles: { type: [String], enum: ["admin", "host", "lead", "member"], default: "member" },
  position: { type: String, enum: ["Club", "Professor", "Staff", "Unknown"], default: "Unknown" },
  profilePicture: { type: String, default: "default.jpg" },
  joinedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
