import jwtDecode from "jwt-decode";
import Admins from "../models/Admin.js";

export const checkAdmin = async (req, res, next) => {
  console.log("hello from middleware");
  try {
    const token = req.cookies.token;
    if (token) {
      try {
        const decodedCookie = jwtDecode(token);
        const objectID = decodedCookie.id;
        const admin = await Admins.findOne({ _id: objectID });
        console.log(admin);

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
