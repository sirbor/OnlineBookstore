// src/routes/profile.js
const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/profile', requireAuth, (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;
