const express = require("express");
const router = express.Router();
const controller = require("../controllers/feedbackController");
const isAuthenticated = require("../middleware/auth");

router.get("/", isAuthenticated, controller.getFeedbacks);
router.post("/", isAuthenticated, controller.createFeedback);
router.put("/:id", isAuthenticated, controller.updateFeedback);
router.delete("/:id", isAuthenticated, controller.deleteFeedback);

module.exports = router;