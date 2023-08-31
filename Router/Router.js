import express from "express";
import { home, login } from "../Controllers/home.js";
const router = express.Router();

router.get("/",home)

router.get("/login", login)

router.post("/login", (req, res) => {
    
})


export default router