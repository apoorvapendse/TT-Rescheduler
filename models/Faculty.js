import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  UID: String,
  name: String,
  password: String,
});

const Professors = mongoose.model("Professors", facultySchema);
//JSYK
// A model in Mongoose is a constructor function that is used
//to create documents based on a schema.
//It represents a specific collection in your MongoDB database.
export default Professors;
