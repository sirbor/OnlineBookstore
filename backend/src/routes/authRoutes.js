// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Sign Up Route
router.post('/signup', async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        next(err);
    }
});

// Log In Route
router.post('/login', passport.authenticate('local', { session: false }), async (req, res) => {
    const token = jwt.sign({ sub: req.user._id }, process.env.JWT_SECRET);
    res.json({ token });
});

module.exports = router;
