import User from "../models/User.js";
import Course from "../models/Course.js";

export const registerUser = async (req, res) => {
  try {
    const { username, name, surname, email, password } = req.body;

    if (!username || !name || !surname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (exists) {
      return res.status(400).json({ message: "User already exists" });
  }
    const user = new User({ username, name, surname, email, password });
    await user.save();

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    console.error("❌ Error in registerUser:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.status(404).json({ message: "User not found" });
  if (user.password !== password) return res.status(400).json({ message: "Invalid password" });

  res.json({ message: "Login successful", user });
};

export const enrollCourse = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const alreadyEnrolled = user.courses.find(
      (c) => c.course_id.toString() === courseId
    );
    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    user.courses.push({
      course_id: course._id,
      progress: 0,
      lessons: course.lessons.map(l => ({
        title: l.title,
        completed: false
      }))
    });

    await user.save();

    res.json({ message: "Course enrolled", user });
  } catch (err) {
    console.error("❌ Enroll error:", err);
    res.status(500).json({ message: err.message });
  }
};


export const updateProgress = async (req, res) => {
  const { userId, courseId, lessonIndex, completed } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const courseProgress = user.courses.find(
      (c) => c.course_id.toString() === courseId
    );

    if (!courseProgress) {
      return res.status(404).json({ message: "User not enrolled in this course" });
    }

    // Mark lesson completed by index
    if (courseProgress.lessons[lessonIndex]) {
      courseProgress.lessons[lessonIndex].completed = completed;
    }

    // Recalculate progress
    const completedCount = courseProgress.lessons.filter((l) => l.completed).length;
    courseProgress.progress = Math.round(
      (completedCount / courseProgress.lessons.length) * 100
    );

    if (courseProgress.progress === 100) courseProgress.status = "completed";

    await user.save();

    res.json({ message: "Progress updated", user });
  } catch (err) {
    console.error("❌ Progress update error:", err);
    res.status(500).json({ message: err.message });
  }
};

