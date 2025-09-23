import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  order: { type: Number, required: true }
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  bio: { type: String, required: true },
  language: { type: String, required: true },
  lessons: [LessonSchema],
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model("Course", CourseSchema);
