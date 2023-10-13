import jwtDecode from "jwt-decode";
import Professors from "../models/Faculty.js";

const profDashGet = (req, res) => {
  res.status(200).render("prof_dashboard.ejs");
};

const profDashPost = async (req, res) => {
  console.log(req.body);
  const profID = jwtDecode(req.cookies.proftoken).id;
  console.log(profID);

  try {
    const prof = await Professors.findOne({ _id: profID });
    prof.receivedRequests[req.body.index].approved = true;
    prof.save();
  } catch (err) {
    console.log(err);
  }

  res.status(200).json("bimbimbambam");
};

const postChangeTimeTable = async (req, res) => {
  console.log(req.body);
};

const profReadonlyTTGet = async (req, res) => {
  res.render("my-timetable");
};

export { profDashGet, profDashPost, postChangeTimeTable, profReadonlyTTGet };
