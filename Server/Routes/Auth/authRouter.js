import express from "express";
import { login, signup } from "../../Controllers/Auth/authController.js";

const router = express.Router();

// Create an account
router.route("/signup").post(signup);
// Login
router.route("/login").post(login);

export default router;
