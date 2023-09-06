import { log } from "console";
import mongoose from "mongoose";
import path from "path";
import bcrypt from "bcrypt";
import Professors from "../models/Faculty.js";
import Admins from "../models/Admin.js";

const home = (req, res) => {
  console.log(req.body);
  res.status(200).render("index.ejs");
};

// to render loginpage in browser
const profLoginGet = (req, res) => {
  res.status(200).render("proflogin.ejs");
};

// to handle post req from login page
const profLoginPost = async (req, res) => {
  console.log("prof login post called");

  const prof = await Professors.findOne({ email: req.body.email });
  if (prof) {
    if (await bcrypt.compare(req.body.password, prof.password))
      res.json("login success");
    else res.json("password wrong");
  } else {
    res.json("Professor does not exist in the database, ask admin to add");
  }
};

const adminSignupGet = (req, res) => {
  res.status(200).render("adminsign.ejs");
};
const adminLoginGet = (req, res) => {
  res.status(200).render("adminlogin.ejs");
};

const adminSignupPost = async (req, res) => {
  console.log("admin signup post called");
  console.log(req.body);

  const newAdmin = new Admins({
    UID: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    profs: [], // Example values for profs
    password: await bcrypt.hash(req.body.password, 10),
  });

  newAdmin
    .save()
    .then((result) => {
      console.log("New admin created:", result);
      res.json("Admin created Successfully");
    })
    .catch((error) => {
      console.error("Error creating admin:", error);
    });
};

const adminLoginPost = async (req, res) => {
  console.log("admin login post called");
  const admin = await Admins.findOne({ email: req.body.email });
  if (admin) {
    if (await bcrypt.compare(req.body.password, admin.password))
      res.json("login success");
    else res.json("password wrong");
  } else {
    res.json("admin does not exists");
  }
};

export {
  home,
  profLoginGet,
  profLoginPost,
  adminLoginGet,
  adminLoginPost,
  adminSignupGet,
  adminSignupPost,
};
