const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Route to get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add more routes for CRUD operations as needed

module.exports = router;
