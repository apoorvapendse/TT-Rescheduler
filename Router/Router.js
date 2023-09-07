import express from "express";
import * as auth_control from "../Controllers/auth.js";
import * as admin_control from "../Controllers/admin.js"
const router = express.Router();

router.get("/", auth_control.home);

router.get("/login-prof", auth_control.profLoginGet);
router.post("/login-prof", auth_control.profLoginPost);

router.get("/signup-admin", auth_control.adminSignupGet);
router.post("/signup-admin", auth_control.adminSignupPost);

router.get("/login-admin", auth_control.adminLoginGet);
router.post("/login-admin", auth_control.adminLoginPost);

router.get('/admin/dashboard', admin_control.adminDashGet);
router.post('/admin/dashboard/createFaculty', admin_control.createFacultyPost);

export default router;
