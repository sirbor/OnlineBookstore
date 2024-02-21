// src/routes/invoiceRoutes.js
const express = require('express');
const router = express.Router();
const { adminMiddleware } = require('../utils/adminMiddleware');
const Invoice = require('../models/Invoice');

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
