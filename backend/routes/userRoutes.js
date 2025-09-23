import express from "express";
import { registerUser, getUser, updateProgress } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/:id", getUser);
router.put("/progress", updateProgress);

export default router;
