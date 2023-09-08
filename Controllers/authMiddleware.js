import jwtDecode from "jwt-decode";
import Admins from "../models/Admin.js";

export const checkAdmin = async (req, res, next) => {
  console.log("hello from middleware");
  const token = req.cookies.token;

  const decodedCookie = jwtDecode(token);

  const objectID = decodedCookie.id;

  const admin = await Admins.findOne({ _id: objectID });
  console.log(admin);
  if (admin) {
    next();
  } else {
    res.redirect("login-admin");
  }
};
