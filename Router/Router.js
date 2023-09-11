import express from "express";
<<<<<<< HEAD
import { home, loginPage, auth } from "../Controllers/home.js";
import { UserModel } from "../database/database.js";
const router = express.Router();

router.get("/", home);
router.get("/login", loginPage);
router.post("/login", auth);

//Adding new Route for login



//Adding new Route for Sign-up

router.post("/signup", async (req, res) => {
    try {
    const{ firstname, lastname, email, password } = req.body;

    const existingUser = await UserModel.findone({email});

    if(existingUser) {
        return res.status(400).json({message: "User Already Exists." });
    }

    const newUser = new UserModel({
        email,
        password,
        firstname,
        lastname,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully." });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

export default router

=======
import * as auth_control from "../Controllers/auth.js";
import * as admin_control from "../Controllers/admin.js";
import { checkAdmin } from "../Controllers/authMiddleware.js";
import * as prof_control from "../Controllers/faculty.js";
import * as api from "../Controllers/api.js"

const router = express.Router();

router.get("/", auth_control.home);

router.get("/login-prof", auth_control.profLoginGet);
router.post("/login-prof", auth_control.profLoginPost);

router.get("/signup-admin", auth_control.adminSignupGet);
router.post("/signup-admin", auth_control.adminSignupPost);

router.get("/login-admin", auth_control.adminLoginGet);
router.post("/login-admin", auth_control.adminLoginPost);

// should prob create different routes.js file 
// for /admin and /faculty
router.get("/admin/dashboard", checkAdmin, admin_control.adminDashGet);
router.post(
  "/admin/dashboard/createFaculty",
  checkAdmin,
  admin_control.createFacultyPost
);

router.get('/faculty/dashboard', prof_control.profDashGet)

router.get('/admin/dashboard/:id', admin_control.editTimetabeGet)

// api to get faculty objects
router.get("/api/get/faculty", api.getFaculty)


export default router;
>>>>>>> a24b102ef3c67456a20f70d4d755d7f04edebad8
