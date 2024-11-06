import express from "express";
import { updatePassword } from "../../Controllers/Users/usersController.js";
import { protect } from "../../Controllers/Auth/authController.js";

const router = express.Router();

router.route("/updatePassword").patch(protect, updatePassword);

export default router;
