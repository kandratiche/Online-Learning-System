import User from "../models/User.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const user = new User({ name, email, password });
  await user.save();
  res.status(201).json({ message: "User created", user });
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const updateProgress = async (req, res) => {
  const { userId, courseId, lessonId, completed } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  let courseProgress = user.courses.find(c => c.course_id.toString() === courseId);

  if (!courseProgress) {
    courseProgress = { course_id: courseId, status: "in_progress", lessons: [] };
    user.courses.push(courseProgress);
  }

  const lessonProgress = courseProgress.lessons.find(l => l.lesson_id.toString() === lessonId);

  if (lessonProgress) {
    lessonProgress.completed = completed;
  } else {
    courseProgress.lessons.push({ lesson_id: lessonId, completed });
  }

  courseProgress.progress =
    (courseProgress.lessons.filter(l => l.completed).length / courseProgress.lessons.length) * 100;

  if (courseProgress.progress === 100) courseProgress.status = "completed";

  await user.save();
  res.json(user);
};
