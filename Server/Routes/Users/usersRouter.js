import express from "express";
import {
  updateDetails,
  updatePassword,
} from "../../Controllers/Users/usersController.js";
import { protect } from "../../Controllers/Auth/authController.js";

const router = express.Router();

// Update user details
router.route("/updateDetails").patch(protect, updateDetails);

// Update user password
router.route("/updatePassword").patch(protect, updatePassword);

export default router;
