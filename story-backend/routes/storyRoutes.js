const express = require("express");
const router = express.Router();
const storyController = require("../controllers/storyController");

router.get("/stories", storyController.getStories);
router.get("/stories/:id", storyController.getStory);

module.exports = router;
