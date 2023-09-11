import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Professors from "../models/Faculty.js";

const adminDashGet = (req, res) => {
  res.render("adminDash.ejs");
};

const createFacultyPost = async (req, res) => {
  console.log("Create faculty post called");
  const checkProf = await Professors.findOne({ email: req.body.email });
  if (checkProf) res.json("prof acc already exists");
  else {
    const newProf = new Professors({
      UID: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    });

    newProf
      .save()
      .then((result) => {
        console.log("prof created:", result);
        res.redirect(`/admin/dashboard/${result.UID}`);
      })
      .catch((err) => {
        console.log(err);
        req.json("could not create prof acc");
      });
  }
};

const editTimetabeGet = (req, res) => {
  // add the logic to fetch tt if present and check for conflicts
  res.status(200).render('faculty timetable.ejs')
}

export { adminDashGet, createFacultyPost, editTimetabeGet };
