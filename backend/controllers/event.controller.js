const eventService = require("../services/event.service");

exports.createEvent = async (req, res) => {
  try {
    const creatorId = req.user.id;
    const result = await eventService.createEvent(creatorId, req.body);
    res.status(201).json({ message: "Event created successfully", event: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const event = await eventService.getEventById(req.params.id);
    res.status(200).json(event);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.updateTaskOrAction = async (req, res) => {
  try {
    const result = await eventService.updateTaskOrAction(
      req.params.id,
      req.user.id,
      req.body
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};
