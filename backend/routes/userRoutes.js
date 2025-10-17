import express from "express";
import User from "../models/User.js";
import {enrollCourse, registerUser, loginUser, getUser, changeUser } from "../controllers/userController.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/:id", getUser);
router.put("/:id", upload.single("avatar"), changeUser);
router.post("/register", registerUser);
router.post("/login", loginUser); 
router.post("/enroll", enrollCourse);
router.get("/:id/courses", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("courses");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user.courses);
    } catch (err) {
        console.error("Error fetching user courses:", err);
        res.status(500).json({ error: err.message });
    }
});


router.post("/progress", async (req, res) => {
  try {
    const { userId, courseId, lessonIndex } = req.body;


    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });


    const course = user.courses.find(
      c => c.course_id.toString() === courseId
    );
    if (!course) {
      console.error("❌ Course not found in user");
      return res.status(404).json({ message: "Course not found in user" });
    }


    if (!Array.isArray(course.lessons)) {
      console.error("❌ No lessons array inside course");
      return res.status(400).json({ message: "Lessons not initialized" });
    }

    if (lessonIndex < 0 || lessonIndex >= course.lessons.length) {
      console.error("❌ Invalid lessonIndex", lessonIndex);
      return res.status(400).json({ message: "Invalid lesson index" });
    }

    course.lessons[lessonIndex].completed = true;

    const completedCount = course.lessons.filter(l => l.completed).length;
    course.progress = Math.round(
      (completedCount / course.lessons.length) * 100
    );

    await user.save();

    console.log("✅ Lesson completed, progress:", course.progress);

    res.json({ message: "Lesson completed", user });
  } catch (err) {
    console.error("🔥 Error in /progress route:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


export default router;
