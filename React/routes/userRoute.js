const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require("../middlewares/authMiddleware");
const Doctor = require("../models/doctorModel");
require('dotenv').config(); // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Use environment variable

// Register route
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Ensure all fields are provided
        if (!name || !email || !password) {
            return res.status(400).send({ message: "All fields are required", success: false });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(200).send({ message: "User already exists", success: false });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10); // Generate a salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

        const newUser = new User({
            name,
            email,
            password: hashedPassword, // Store the hashed password
        });
        await newUser.save();
        res.status(200).send({ message: "User created successfully", success: true });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send({ message: "Error creating user", success: false, error: error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Ensure email and password are provided
        if (!email || !password) {
            return res.status(400).send({ message: "Email and password are required", success: false });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ message: "User not found", success: false });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: "Invalid credentials", success: false });
        }

        // Create and sign the JWT token
        const token = jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin, isDoctor: user.isDoctor },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).send({
            message: "Login successful",
            success: true,
            token,
            userId: user._id,
            name: user.name,
            isAdmin: user.isAdmin,
            isDoctor: user.isDoctor
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send({ message: "Error logging in", success: false, error: error.message });
    }
});

// Apply for doctor account route (protected)
router.post('/apply-doctor-account', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        if (!user) {
            return res.status(404).send({ message: "User does not exist", success: false });
        }

        // Create a new doctor entry
        const newDoctor = new Doctor({ ...req.body, status: "pending" });
        await newDoctor.save();

        // Notify admin
        const adminUser = await User.findOne({ isAdmin: true });
        const unseenNotification = adminUser.unseenNotification || [];
        unseenNotification.push({
            type: "new-doctor-request",
            message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastName,
            },
            onClickPath: "/admin/doctors",
        });

        await User.findByIdAndUpdate(adminUser._id, { unseenNotification });

        res.status(200).send({ message: "Doctor account application submitted successfully", success: true });
    } catch (error) {
        console.error("Error applying for doctor account:", error);
        res.status(500).send({ message: "Error applying for doctor account", success: false, error: error.message });
    }
});

module.exports = router;
