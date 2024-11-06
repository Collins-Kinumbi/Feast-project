import express from "express";
import {
  forgotPassword,
  login,
  resetPassword,
  signup,
} from "../../Controllers/Auth/authController.js";

const router = express.Router();

// Create an account
router.route("/signup").post(signup);
// Login
router.route("/login").post(login);
// Forgot password
router.route("/forgotPassword").post(forgotPassword);
// Reset password
router.route("/resetPassword/:token").patch(resetPassword);

export default router;
