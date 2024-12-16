const express = require("express");
const { teacherRegister, teacherLogin, adminLogin, teacherData,findTeacherById,getNotification } = require("../controllers/authController");

const router = express.Router();

// Route to register teacher
router.route("/teacher").post(teacherRegister);

// Route to login teacher
router.route("/login/teacher").post(teacherLogin);

// Route to login admin
router.route("/login/admin").post(adminLogin);

// Route to get all teacher 
router.route("/GetTeacherData").get(teacherData);

// Route to get particular teacher details
router.route("/GetTeacherData/:teacherId").get(findTeacherById);

// Route to get notifications
router.route("/notification").get(getNotification);

module.exports = router;
