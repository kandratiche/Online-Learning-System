import mongoose from "mongoose";

const LessonProgressSchema = new mongoose.Schema({
  lesson_id: mongoose.Schema.Types.ObjectId,
  completed: { type: Boolean, default: false }
});

const UserCourseSchema = new mongoose.Schema({
  course_id: mongoose.Schema.Types.ObjectId,
  status: { type: String, enum: ["not_started", "in_progress", "completed"], default: "not_started" },
  progress: { type: Number, default: 0 },
  lessons: [LessonProgressSchema]
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required:true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  courses: [UserCourseSchema]
});

export default mongoose.model("User", UserSchema);
