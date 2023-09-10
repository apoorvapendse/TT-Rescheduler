import mongoose from "mongoose";

const LectureSchema = new mongoose.Schema({
  slotID: Number,
  roomID: Number,
  time: Number,
});

const timeTableSchema = new mongoose.Schema({
  UID: String,
  Day1: [LectureSchema],
  Day2: [LectureSchema],
  Day3: [LectureSchema],
  Day4: [LectureSchema],
  Day5: [LectureSchema],
});

export { LectureSchema, timeTableSchema }