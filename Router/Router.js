import express from "express";
import * as controllers from "../Controllers/home.js";
const router = express.Router();

router.get("/", controllers.home);

router.get("/login-prof", controllers.profLoginGet);
router.post("/login-prof", controllers.profLoginPost);

router.get("/signup-admin", controllers.adminSignupGet);
router.post("/signup-admin", controllers.adminSignupPost);

router.get("/login-admin", controllers.adminLoginGet);
router.post("/login-admin", controllers.adminLoginPost);

export default router;
