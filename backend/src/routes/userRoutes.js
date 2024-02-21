// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { requireAuth } = require('../utils/authMiddleware');
const Book = require('../models/Book');

// Browse Books Route
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add to Cart Route
router.post('/cart', requireAuth, async (req, res) => {
    // Implementation to add item to cart
});

// Purchase Route
router.post('/purchase', requireAuth, async (req, res) => {
    // Implementation to purchase books
});

// Add to Cart Route
router.post('/cart', requireAuth, async (req, res) => {
    try {
        const { itemId } = req.body;
        // Retrieve user document and update the cart
        const user = req.user; // Assuming user is authenticated
        // Logic to update user's cart
        // Example:
        user.cart.push(itemId); // Assuming cart is an array of item IDs
        await user.save();
        res.json({ message: 'Item added to cart successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Purchase Route
router.post('/purchase', requireAuth, async (req, res) => {
    try {
        // Retrieve user document and cart items
        const user = req.user; // Assuming user is authenticated
        const cartItems = user.cart; // Assuming cart is an array of item IDs

        // Logic to process the purchase
        // Example:
        // Update book availability and clear the cart
        await Promise.all(cartItems.map(async (itemId) => {
            const book = await Book.findById(itemId);
            if (book.availability > 0) {
                book.availability -= 1;
                await book.save();
            } else {
                throw new Error(`Book ${book.title} is out of stock`);
            }
        }));

        // Clear the cart after successful purchase
        user.cart = [];
        await user.save();

        res.json({ message: 'Purchase successful' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add Review Route
router.post('/books/:id/reviews', requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;
        // Logic to add review to book with ID 'id'
        res.json({ message: 'Review added successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Reviews Route
router.get('/books/:id/reviews', async (req, res) => {
    try {
        const { id } = req.params;
        // Logic to retrieve reviews for book with ID 'id'
        res.json(reviews); // Assuming 'reviews' is an array of review objects
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;
