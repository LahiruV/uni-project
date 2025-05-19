const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");
const isAuthenticated = require("../middleware/auth");

router.post("/login", controller.login);
router.post("/register", controller.register);
router.post("/admin/login", controller.adminLogin);
router.post("/admin/register", controller.adminRegister);
router.get("/me", isAuthenticated, controller.getUserDetails);

module.exports = router