import jwtDecode from "jwt-decode";
import Admins from "../models/Admin.js";
import Professors from "../models/Faculty.js";

export const checkAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.admintoken;
    if (token) {
      try {
        const decodedCookie = jwtDecode(token);
        const objectID = decodedCookie.id;
        const admin = await Admins.findOne({ _id: objectID });

        if (admin) {
          next();
        }
      } catch (error) {
        console.log("invalid token");
        res.redirect("/login-admin");
      }
    } else {
      console.log("token doesn't exist");
      res.redirect("/login-admin");
    }
  } catch (error) {
    console.log(error);
  }
};
export const checkProf = async (req, res, next) => {
  try {
    const token = req.cookies.proftoken;
    if (token) {
      try {
        const decodedCookie = jwtDecode(token);
        const objectID = decodedCookie.id;
        const prof = await Professors.findOne({ _id: objectID });

        if (prof) {
          next();
        }
      } catch (error) {
        console.log("invalid token");
        res.redirect("/login-prof");
      }
    } else {
      console.log("token doesn't exist");
      res.redirect("/login-prof");
    }
  } catch (error) {
    console.log(error);
  }
};
