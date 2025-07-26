const User = require("../models/user.model");

const resolveUsernames = async (usernames) => {
  const users = await User.find({ username: { $in: usernames } });
  if (users.length !== usernames.length) {
    throw new Error("Some usernames could not be found.");
  }
  const map = {};
  users.forEach(user => map[user.username] = user._id);
  return map; // { "yacine": ObjectId(...) }
};

module.exports = resolveUsernames;
