const express = require("express");
const router = express.Router();
const controller = require("../controllers/inquiryController");
const isAuthenticated = require("../middleware/auth");

router.get("/", isAuthenticated, controller.getInquiries);
router.get("/:id", isAuthenticated, controller.getInquiry);
router.post("/", isAuthenticated, controller.createInquiry);
router.put("/:id", isAuthenticated, controller.updateInquiry);
router.delete("/:id", isAuthenticated, controller.deleteInquiry);
router.put("/:id/complete", isAuthenticated, controller.completeInquiry);

module.exports = router;