const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Teacher = require("../models/teacherModel");
const Admin = require("../models/adminModel");
const Notification = require('../models/notificationModel')
require('dotenv').config();

const JWT_SECRET =  process.env.JWT_SECRET;

// Teacher Registration
const teacherRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: "Teacher already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newTeacher = new Teacher({
      name,
      email,
      password: hashedPassword,
    });

    await newTeacher.save();

    res.status(201).json({ message: "Teacher registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Teacher Login
const teacherLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(400).json({ message: "Teacher not found!" });
    }

    const isPasswordValid = await bcrypt.compare(password, teacher.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign({ id: teacher._id, email: teacher.email }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token: token, _id: teacher._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Admin Login
const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found!" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign({ id: admin._id, username: admin.username }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Teacher Data
const teacherData = async (req, res) => {
  try {
    const teachers = await Teacher.find()
      .select("_id name email")
      .exec();

    res.json(teachers);
  } catch (error) {
    console.error("Error fetching teacher data:", error);
    res.status(500).json({ error: "Failed to fetch teacher data" });
  }
};

// Get particular teacher data
const findTeacherById = async (req, res) => {
  const { teacherId } = req.params;
  try {
    const teacherData = await Teacher.findById(teacherId);
    
    if (teacherData) {
      const { routine } = teacherData;
      res.status(200).json({ routine });
    } else {
      res.status(404).json({ message: "Teacher not found" });
    }
  } catch (error) {
    console.error("Error finding teacher data:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


//get all notification
const getNotification = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdDate: -1 })
      .limit(5);
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};



module.exports = { teacherRegister, teacherLogin, adminLogin, teacherData,findTeacherById,getNotification };
