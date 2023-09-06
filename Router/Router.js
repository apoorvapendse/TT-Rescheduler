import express from "express";
import { home, loginPage, userLoginPost } from "../Controllers/home.js";
const router = express.Router();

router.get("/", home);

router.get("/login", loginPage)

router.post("/login", userLoginPost)


export default router

