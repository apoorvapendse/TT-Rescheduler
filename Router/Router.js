import express from "express";
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

