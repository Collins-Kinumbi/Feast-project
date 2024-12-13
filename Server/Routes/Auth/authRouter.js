import express from "express";
import {
  checkAuth,
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
} from "../../Controllers/Auth/authController.js";

const router = express.Router();

// Create an account
router.route("/signup").post(signup);
// Login
router.route("/login").post(login);
// Check if user is logged in
router.route("/checkAuth").get(checkAuth);
// Forgot password
router.route("/forgotPassword").post(forgotPassword);
// Reset password
router.route("/resetPassword/:token").patch(resetPassword);
router.route("/logout").get(logout);

export default router;
