import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  UID: String,
  name: String,
  email: String,
  profs: [Number],
  password: String,
});
//profs is the array of UIDs mapped to each faculty

const Admins = mongoose.model("Admins", adminSchema);

export default Admins;
