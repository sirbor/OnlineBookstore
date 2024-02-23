// src/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { adminMiddleware } = require('../utils/adminMiddleware');
const User = require('../models/User');
const Invoice = require('../models/Invoice');

// Add Book Route
router.post('/books', adminMiddleware, async (req, res) => {
    try {
        const { title, description, price, availability } = req.body;
        const newBook = new Book({ title, description, price, availability });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update Book Route
router.put('/books/:id', adminMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price, availability } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(id, { title, description, price, availability }, { new: true });
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete Book Route
router.delete('/books/:id', adminMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        await Book.findByIdAndDelete(id);
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// View Cart Contents Route
router.get('/cart/:userId', adminMiddleware, async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('cart', 'title price');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get All Invoices Route
router.get('/invoices', adminMiddleware, async (req, res) => {
    try {
        const invoices = await Invoice.find().populate('user', 'username').populate('items', 'title price');
        res.json(invoices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Invoice by ID Route
router.get('/invoices/:id', adminMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findById(id).populate('user', 'username').populate('items', 'title price');
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.json(invoice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
