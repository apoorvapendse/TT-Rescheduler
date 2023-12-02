import express from "express";
import * as auth_control from "../Controllers/auth.js";
import * as admin_control from "../Controllers/admin.js";
import { checkAdmin, checkProf } from "../Controllers/authMiddleware.js";
import * as prof_control from "../Controllers/faculty.js";
import * as api from "../Controllers/api.js";
import { getRequestSlot, postRequestSlot } from "../Controllers/slot.js";
import { mailProfessor } from "../Controllers/request-status-mail.js";

const router = express.Router();

router.get("/", auth_control.home);

router.get("/login-prof", auth_control.profLoginGet);
router.post("/login-prof", auth_control.profLoginPost);

router.get("/signup-admin", auth_control.adminSignupGet);
router.post("/signup-admin", auth_control.adminSignupPost);

router.get("/login-admin", auth_control.adminLoginGet);
router.post("/login-admin", auth_control.adminLoginPost);

router.get("/admin/dashboard", checkAdmin, admin_control.adminDashGet);
router.get("/prof/dashboard", checkProf, prof_control.profDashGet);
router.post("/prof/dashboard", prof_control.profDashPost);
router.post(
  "/admin/dashboard/createFaculty",
  checkAdmin,
  admin_control.createFacultyPost
);

router.get("/faculty/dashboard", prof_control.profDashGet);

router.get("/admin/dashboard/:id", checkAdmin, admin_control.editTimetabeGet);
router.post("/admin/dashboard/:id", admin_control.saveTimetablePost);

router.post(
  "/api/post/faculty/change-time-table",
  checkProf,
  prof_control.postChangeTimeTable
);
// api to get faculty objects
router.get("/api/get/faculty", checkAdmin, api.getFaculty);

// api to get timetable
router.get("/api/get/:facultyId", api.getTT);

// api to get faculty object
router.get("/api/get/faculty/:id", api.getFacultyById);

router.get("/faculty/request-slot", checkProf, getRequestSlot);
router.post("/faculty/request-slot", checkProf, postRequestSlot);

// api to send mail on timetable change request resolution
router.post("/faculty/send-request-status-mail", checkProf, mailProfessor);
router.get("/my-timetable", prof_control.profReadonlyTTGet);

export default router;
