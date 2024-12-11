import express from "express";
import {
  deleteAccount,
  getAllUsers,
  getUser,
  updateDetails,
  updatePassword,
} from "../../Controllers/Users/usersController.js";
import { protect } from "../../Controllers/Auth/authController.js";

const router = express.Router();

// Get all users
router.route("/").get(getAllUsers);

// Get user by id
router.route('/:id').get(getUser)

// Update user details
router.route("/updateDetails").patch(protect, updateDetails);

// Update user password
router.route("/updatePassword").patch(protect, updatePassword);

// Delete account
router.route("/deleteAccount").delete(protect, deleteAccount);

export default router;
