import express from "express";
import { home, login } from "../Controllers/home.js";
const router = express.Router();

router.get("/",home)

router.get("/login", loginPage)

router.post("/login", auth)


export default router