import { log } from "console";
import mongoose from "mongoose";
import path from "path";
import bcrypt from "bcrypt";
import Professors from "../models/Faculty.js";
import Admins from "../models/Admin.js";
import jwt from "jsonwebtoken";

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
    if (await bcrypt.compare(req.body.password, prof.password)) {
      //setting or updating the cookie with jwt proftoken for future authorization whether the user is prof or not
      const proftoken = jwt.sign({ id: prof.id }, process.env.JWT_PASSWD);
      console.log("jwt proftoken for existing prof is:", proftoken);
      res.cookie("proftoken", proftoken, {
        httpOnly: false,
        expires: new Date(Date.now() + 30000000),
      });

      res.redirect("/prof/dashboard");
    } else res.json("password wrong");
  } else {
    res.json("professor not added to database");
  }
};

const profDashBoardGet = async (req, res) => {
  res.status(200).render("prof_dashboard.ejs");
};

const adminSignupGet = (req, res) => {
  res.status(200).render("adminsign.ejs");
};
const adminLoginGet = (req, res) => {
  res.status(200).render("adminlogin.ejs");
};

const adminSignupPost = async (req, res) => {
  console.log("admin signup post called");
  const checkAdmin = await Admins.findOne({ email: req.body.email });
  if (checkAdmin) {
    const admintoken = jwt.sign({ id: checkAdmin.id }, process.env.JWT_PASSWD);
    console.log("jwt admintoken is:", admintoken);
    res.cookie("admintoken", admintoken, {
      httpOnly: false,
      expires: new Date(Date.now() + 30000000),
    });
    res.status(200).redirect("/admin/dashboard");
    return;
  }

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
      //creating the jwt admintoken and setting it as cookie

      const admintoken = jwt.sign({ id: newAdmin.id }, process.env.JWT_PASSWD);
      console.log("jwt admintoken for newly created admin is:", admintoken);
      res.cookie("admintoken", admintoken, {
        httpOnly: false,
        expires: new Date(Date.now() + 30000000),
      });

      res.redirect("/admin/dashboard");
    })
    .catch((error) => {
      console.error("Error creating admin:", error);
    });
};

const adminLoginPost = async (req, res) => {
  console.log("admin login post called");
  const admin = await Admins.findOne({ email: req.body.email });
  if (admin) {
    if (await bcrypt.compare(req.body.password, admin.password)) {
      //setting or updating the cookie with jwtadmintoken for future authorization whether the user is admin or not
      const admintoken = jwt.sign({ id: admin.id }, process.env.JWT_PASSWD);
      console.log("jwt admintoken for existing created admin is:", admintoken);
      res.cookie("admintoken", admintoken, {
        httpOnly: false,
        expires: new Date(Date.now() + 30000000),
      });

      res.redirect("/admin/dashboard");
    } else res.json("password wrong");
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
  profDashBoardGet,
};
