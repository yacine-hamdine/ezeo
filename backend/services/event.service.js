const Event = require("../models/event.model");
const resolveUsernames = require("../helpers/resolveUsernames");

exports.createEvent = async (creatorId, payload) => {
  const {
    title, description, location, banner,
    startDate, endDate, type,
    committeeUsernames,
    program // raw structure with usernames
  } = payload;

  

  const usernameMap = await resolveUsernames(committeeUsernames);

  const committeeIds = Object.values(usernameMap);

  // Map usernames in tasks/actions to ObjectIds
  const enrichProgram = program.map(activity => ({
    ...activity,
    tasks: activity.tasks.map(task => ({
      ...task,
      responsible: usernameMap[task.responsibleUsername],
      actions: task.actions.map(action => ({
        ...action,
        assignedTo: usernameMap[action.assignedToUsername],
      }))
    }))
  }));

  const newEvent = await Event.create({
    title, description, location, banner, type,
    startDate, endDate,
    createdBy: creatorId,
    committee: committeeIds,
    committeeLead: creatorId,
    pre: { program: enrichProgram }
  });

  return newEvent;
};

exports.getEventById = async (eventId) => {
  const event = await Event.findById(eventId)
    .populate("committee", "name username profilePicture")
    .lean();

  if (!event) throw new Error("Event not found");

  // Deep populate task responsible & action assignedTo
  for (const activity of event.pre?.program || []) {
    for (const task of activity.tasks || []) {
      const responsibleUser = await User.findById(task.responsible).select("name username profilePicture");
      task.responsible = responsibleUser;

      for (const action of task.actions || []) {
        const actionUser = await User.findById(action.assignedTo).select("name username profilePicture");
        action.assignedTo = actionUser;
      }
    }
  }

  return event;
};

exports.updateTaskOrAction = async (eventId, userId, body) => {
  const { activityIndex, taskIndex, actionIndex, updates } = body;

  const event = await Event.findById(eventId);
  if (!event) throw new Error("Event not found");

  const activity = event.pre.program[activityIndex];
  if (!activity) throw new Error("Activity not found");

  const task = activity.tasks[taskIndex];
  if (!task) throw new Error("Task not found");

  const isLead = event.committeeLead.toString() === userId;
  const isTaskOwner = task.responsible.toString() === userId;

  if (!isLead && !isTaskOwner) {
    throw new Error("Not authorized to edit this task or action");
  }

  if (typeof actionIndex === "number") {
    const action = task.actions[actionIndex];
    if (!action) throw new Error("Action not found");

    const isActionOwner = action.assignedTo.toString() === userId;
    if (!isLead && !isActionOwner) {
      throw new Error("Not authorized to edit this action");
    }

    Object.assign(action, updates);
  } else {
    Object.assign(task, updates);
  }

  await event.save();
  return { message: "Update successful" };
};

