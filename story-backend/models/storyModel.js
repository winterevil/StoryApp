const db = require("../config/db");

exports.getAllStories = (callback) => {
  db.query("SELECT * FROM stories", callback);
};

exports.getStoryById = (id, callback) => {
  db.query("SELECT * FROM stories WHERE id = ?", [id], callback);
};
