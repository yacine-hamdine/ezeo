const mongoose = require("mongoose");

const actionSchema = new mongoose.Schema({
  title: String,
  description: String,
  done: { type: Boolean, default: false },
  requiresProof: { type: Boolean, default: false },
  proofLink: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { _id: false });

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  deadline: Date,
  need: String,
  responsible: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  actions: [actionSchema],
}, { _id: false });

const activitySchema = new mongoose.Schema({
  title: String,
  description: String,
  startTime: Date,
  endTime: Date,
  tasks: [taskSchema]
}, { _id: false });

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  banner: { type: String, default: "default_event.jpg" },
  startDate: Date,
  endDate: Date,
  state: { type: String, enum: ["pre", "live", "post"], default: "pre" },
  type: { type: String, enum: ["Ceremony", "Conference", "Workshop", "Hackathon", "Other"], default: "Other" },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  committeeLead: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  committee: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  pre: {
    program: [activitySchema] // Activities grouped by phase in UI
  }

}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
