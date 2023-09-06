import express from "express";
import * as controllers from "../Controllers/home.js";
const router = express.Router();

router.get("/", controllers.home);

router.get("/login-prof", controllers.userLoginGet)
router.post("/login", controllers.userLoginPost)

router.get("/login-admin", controllers.adminLoginGet)
router.post("/login-admin", controllers.adminLoginPost)


export default router

