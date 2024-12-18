import express from "express";
import {
  deleteAccount,
  getAllUsers,
  getUser,
  updateAvatar,
  updateDetails,
  updatePassword,
} from "../../Controllers/Users/usersController.js";
import { protect } from "../../Controllers/Auth/authController.js";
import multer from "multer";
import { storage } from "../../Utils/cloudinary.js";

const router = express.Router();

// Get all users
router.route("/").get(getAllUsers);

// Get user by id
router.route("/:id").get(getUser);

// Update user details
router.route("/updateDetails").patch(protect, updateDetails);

// Update User Avatar
const upload = multer({ storage });
router
  .route("/updateAvatar")
  .patch(protect, upload.single("avatar"), updateAvatar);

// Update user password
router.route("/updatePassword").patch(protect, updatePassword);

// Delete account
router.route("/deleteAccount").delete(protect, deleteAccount);

export default router;
