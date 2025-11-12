const Story = require("../models/storyModel");

exports.getStories = (req, res) => {
  Story.getAllStories((err, results) => {
    if (err) res.status(500).json(err);
    else res.json(results);
  });
};

exports.getStory = (req, res) => {
  const id = req.params.id;
  Story.getStoryById(id, (err, results) => {
    if (err) res.status(500).json(err);
    else res.json(results[0]);
  });
};
