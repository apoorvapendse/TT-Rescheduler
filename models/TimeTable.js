import mongoose from "mongoose";
import { LectureSchema, timeTableSchema } from "./schema.js";


const timeTables = mongoose.model("TimeTables", timeTableSchema);

export default timeTables;
